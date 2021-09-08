using System.Collections.Generic;
using System.Linq;
using ProductManager.Models;

namespace ProductManager.Data
{
  public class SqlProductRepository : IProductRepository
  {
    private readonly Context _context;

    public SqlProductRepository(Context context)
    {
      _context = context;
    }

    public Product GetProductById(int id)
    {
      var result = _context.Products.FirstOrDefault(p => p.Id == id);
      return result;
    }

    public IEnumerable<Product> GetAllProducts()
    {
      return _context.Products.ToList();
    }

    public Product CreateProduct(Product product)
    {
      if (product is null)
        throw new System.ArgumentNullException(nameof(product));

      if (product is not Product)
        throw new System.ArgumentException("Invalid format for product type.", nameof(product));

      _context.Add(product);
      return product;
    }

    public Product UpdateProduct(Product product)
    {
      if (product is null)
        throw new System.ArgumentNullException(nameof(product));

      if (product is not Product)
        throw new System.ArgumentException("Invalid format for product type.", nameof(product));

      _context.Update(product);
      return product;
    }

    public Product DeleteProduct(Product product)
    {
      _context.Remove(product);
      return product;
    }

    public Product AddProductCategory(Product product, Category category)
    {
      if (product.Categories.All(c => c.Id != category.Id))
      {
        product.Categories.Add(category);
        _context.Update(product);
      }
      return product;
    }

    public Product RemoveProductCategory(Product product, Category category)
    {
      if (product.Categories.FirstOrDefault(c => c.Id == category.Id) != null)
      {
        product.Categories.Remove(category);
        _context.Update(product);
      }
      return product;
    }

    public Product SetProductCategories(Product product, ICollection<Category> categories)
    {
      var oldCategories = product.Categories.ToList();
      foreach (var c in oldCategories)
        RemoveProductCategory(product, c);

      foreach (var c in categories)
        AddProductCategory(product, c);

      return product;
    }

    public int SaveChanges()
    {
      return _context.SaveChanges();
    }


  }
}