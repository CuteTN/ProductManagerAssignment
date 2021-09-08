using System.Collections.Generic;
using ProductManager.Models;

namespace ProductManager.Data
{
  public interface IProductRepository
  {
    int SaveChanges();

    IEnumerable<Product> GetAllProducts();
    Product GetProductById(int id);
    Product CreateProduct(Product product);
    Product UpdateProduct(Product product);
    Product DeleteProduct(Product product);
    Product SetProductCategories(Product product, ICollection<Category> categories);
    Product AddProductCategory(Product product, Category category);
    Product RemoveProductCategory(Product product, Category category);
  }
}