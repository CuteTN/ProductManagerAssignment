using System;
using System.Collections.Generic;
using System.Linq;
using ProductManager.Controllers;
using ProductManager.Models;

namespace ProductManager.Services
{
  /// All functions in this class must be immutable functions
  static public class ProductFilter
  {
    public static List<Product> Filter(List<Product> products, ProductsFilterParams filterParams)
    {
      var result = FilterByCriteria(products, filterParams);

      if (filterParams.SortRules != null && filterParams.SortRules.Count() > 0)
        result = Sort(result, filterParams.SortRules);

      if (filterParams.Page != null && filterParams.Limit != null)
        result = Paginate(result, filterParams.Limit ?? 0, filterParams.Page ?? 0);

      return result;
    }


    // searching //////////////////////////////////////////////////////////////////////////////////
    private static bool isSatisfyingProduct(Product product, ProductsFilterParams filterParams)
    {
      return
        Utils.HelperFuncs.CheckNameContainAllWords(product.Name, filterParams.HasName) &&
        Utils.HelperFuncs.CheckValueInBetween<int?>(product.Id, (a, b) => a <= b, filterParams.MinId, filterParams.MaxId) &&
        Utils.HelperFuncs.CheckValueInBetween<double?>(product.Price, (a, b) => a <= b, filterParams.MinPrice, filterParams.MaxPrice) &&
        Utils.HelperFuncs.CheckValueInBetween<Int16?>(product.Rating, (a, b) => a <= b, filterParams.MinRating, filterParams.MaxRating) &&
        Utils.HelperFuncs.CheckValueInBetween<DateTime?>(product.ReleaseDate, (a, b) => a <= b, filterParams.MinReleaseDate, filterParams.MaxReleaseDate) &&
        (filterParams.CategoryIds == null ||
          filterParams.CategoryIds.Any(catId =>
            product.Categories.Any(cat => cat.Id == catId)
          )
        ) &&
        (filterParams.SupplierId == null ||
          product.SupplierId == filterParams.SupplierId
        );
    }

    private static List<Product> FilterByCriteria(List<Product> products, ProductsFilterParams filterParams)
    {
      return products.Where(product => isSatisfyingProduct(product, filterParams)).ToList();
    }

    // sorting ////////////////////////////////////////////////////////////////////////////////////
    private static Comparison<Product> GetCompareFunc(string sortRule)
    {
      var opts = sortRule.ToLower().Split(':', StringSplitOptions.RemoveEmptyEntries);

      Func<Product, IComparable> extractFieldFunc = (product) => 1;
      bool isDesc = opts[1].ToLower().StartsWith("des");

      switch (opts[0])
      {
        case "id": extractFieldFunc = product => product.Id; break;
        case "name": extractFieldFunc = product => product.Name; break;
        case "releasedate": extractFieldFunc = product => product.ReleaseDate; break;
        case "discontinueddate": extractFieldFunc = product => product.DiscontinuedDate; break;
        case "rating": extractFieldFunc = product => product.Rating; break;
        case "price": extractFieldFunc = product => product.Price; break;
        case "supplierid": extractFieldFunc = product => product.SupplierId; break;
      }

      return (product1, product2) =>
        extractFieldFunc(product1).CompareTo(extractFieldFunc(product2)) * (isDesc ? -1 : 1);
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