using System.Collections.Generic;
using System.Linq;
using ProductManager.Models;

namespace ProductManager.Services
{
  public static class CategoryProduct
  {
    static public void AddCategoryProduct(Product product, Category category)
    {
      if (product.Categories.All(c => c.Id != category.Id))
      {
        product.Categories.Add(category);
      }
      if(category.Products.All(p => p.Id != product.Id))
      {
        category.Products.Add(product);
      }
    }

    static public void RemoveCategoryProduct(Product product, Category category)
    {
      if (product.Categories.FirstOrDefault(c => c.Id == category.Id) != null)
      {
        product.Categories.Remove(category);
      }
      if (category.Products.FirstOrDefault(p => p.Id == product.Id) != null)
      {
        category.Products.Remove(product);
      }
    }

    static public Product SetCategoriesOfProduct(Product product, ICollection<Category> categories)
    {
      var oldCategories = product.Categories.ToList();
      foreach (var c in oldCategories)
        RemoveCategoryProduct(product, c);

      foreach (var c in categories)
        AddCategoryProduct(product, c);

      return product;
    }
  }
}