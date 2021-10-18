using System;
using System.Collections.Generic;
using System.Linq;

using ProductManager.Application.Models;
using ProductManager.Domain.Entities;

namespace ProductManager.Application.Services
{
  /// All functions in this class must be immutable functions
  static public class ProductFilter
  {
    public static List<Product> Filter(IQueryable<Product> products, ProductsFilterModel filterParams)
    {
      var result = FilterByCriteria(products, filterParams).ToList();

      if (filterParams.SortRules != null && filterParams.SortRules.Count() > 0)
        result = Sort(result, filterParams.SortRules);

      if (filterParams.Page != null && filterParams.Limit != null)
        result = Paginate(result, filterParams.Limit ?? 0, filterParams.Page ?? 0);

      return result;
    }


    // searching //////////////////////////////////////////////////////////////////////////////////
    private static bool isSatisfyingProduct(Product product, ProductsFilterModel filterParams)
    {
      return
        Shared.Utils.HelperFuncs.CheckNameContainAllWords(product.Name, filterParams.HasName) &&
        Shared.Utils.HelperFuncs.CheckValueInBetween<int?>(product.Id, (a, b) => a <= b, filterParams.MinId, filterParams.MaxId) &&
        Shared.Utils.HelperFuncs.CheckValueInBetween<double?>(product.Price, (a, b) => a <= b, filterParams.MinPrice, filterParams.MaxPrice) &&
        Shared.Utils.HelperFuncs.CheckValueInBetween<Int16?>(product.Rating, (a, b) => a <= b, filterParams.MinRating, filterParams.MaxRating) &&
        Shared.Utils.HelperFuncs.CheckValueInBetween<DateTime?>(product.ReleaseDate, (a, b) => a <= b, filterParams.MinReleaseDate, filterParams.MaxReleaseDate) &&
        (filterParams.CategoryIds == null ||
          filterParams.CategoryIds.Any(catId =>
            product.Categories.Any(cat => cat.Id == catId)
          )
        ) &&
        (filterParams.SupplierId == null ||
          product.SupplierId == filterParams.SupplierId
        );
    }

    private static IQueryable<Product> FilterByCriteria(IQueryable<Product> products, ProductsFilterModel filterParams)
    {
      // NOTE: 
      // Dirty code here, we want to actually use IQuerable to leverage its benefits in querying data
      // But at this moment, the predicate is not in-line, thus cannot be translated by LINQ
      // The only thing needs maintained here is the interface, JUST the interface
      return products.ToList().Where(product => isSatisfyingProduct(product, filterParams)).AsQueryable();
    }

    // sorting ////////////////////////////////////////////////////////////////////////////////////
    private static Comparison<Product> GetCompareFunc(string sortRule)
    {
      var opts = sortRule.ToLower().Split(':', StringSplitOptions.RemoveEmptyEntries);

      Func<Product, IComparable> selector = (product) => 1;
      bool isDesc = opts.Length >= 2 && opts[1].ToLower().StartsWith("des");

      switch (opts[0])
      {
        case "id": selector = product => product.Id; break;
        case "name": selector = product => product.Name ?? ""; break;
        case "releasedate": selector = product => product.ReleaseDate; break;
        case "discontinueddate": selector = product => product.DiscontinuedDate; break;
        case "rating": selector = product => product.Rating; break;
        case "price": selector = product => product.Price; break;
        case "suppliername": selector = product => product.Supplier?.Name ?? ""; break;
      }

      return (product1, product2) =>
        selector(product1).CompareTo(selector(product2)) * (isDesc ? -1 : 1);
    }

    private static Comparison<Product> GetCompareFunc(List<string> sortRules)
    {
      return (product1, product2) =>
      {
        for (int i = 0; i < sortRules.Count(); i++)
        {
          var currentCmp = GetCompareFunc(sortRules[i])(product1, product2);
          if (currentCmp != 0)
            return currentCmp;
        }

        return 0;
      };
    }

    private static List<Product> Sort(List<Product> products, List<string> sortRules)
    {
      var cloneProducts = new List<Product>();
      cloneProducts.AddRange(products);

      cloneProducts.Sort(GetCompareFunc(sortRules));
      return cloneProducts;
    }

    // pagination /////////////////////////////////////////////////////////////////////////////////

    /// Always remember that, counting starts from zero.
    private static List<Product> Paginate(List<Product> products, int limit, int page)
    {
      // INCLUSIVE in BOTH ENDS
      var firstIndex = page * limit;
      var lastIndex = Math.Min(products.Count(), firstIndex + limit - 1);

      if (firstIndex >= products.Count())
        return new List<Product>();

      return products
        .Where((products, index) => firstIndex <= index && index <= lastIndex)
        .ToList();
    }
  }
}