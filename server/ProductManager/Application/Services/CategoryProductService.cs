using System.Collections.Generic;
using System.Linq;
using ProductManager.Domain.Entities;

namespace ProductManager.Application.Services
{
  public class CategoryProductService
  {
    public void AddCategoryProduct(Product product, Category category)
    {
      if (product.Categories == null)
        product.Categories = new List<Category>();
      if (product.Categories.All(c => c.Id != category.Id))
        product.Categories.Add(category);

      if (category.Products == null)
        category.Products = new List<Product>();
      if (category.Products.All(p => p.Id != product.Id))
        category.Products.Add(product);
    }

    void RemoveCategoryProduct(Product product, Category category)
    {
      if (product?.Categories?.FirstOrDefault(c => c.Id == category.Id) != null)
        product.Categories.Remove(category);

      if (category?.Products?.FirstOrDefault(p => p.Id == product.Id) != null)
        category.Products.Remove(product);
    }

    public Product SetCategoriesOfProduct(Product product, ICollection<Category> categories)
    {
      var oldCategories = product?.Categories?.ToList();
      if (oldCategories != null)
        foreach (var c in oldCategories)
          RemoveCategoryProduct(product, c);

      if (categories != null)
        foreach (var c in categories)
          AddCategoryProduct(product, c);

      return product;
    }
  }
}