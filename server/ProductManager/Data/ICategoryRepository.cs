using System.Collections.Generic;
using ProductManager.Models;

namespace ProductManager.Data
{
  public interface ICategoryRepository
  {
    int SaveChanges();

    IEnumerable<Category> GetAllCategories();
    Category GetCategoryById(int id);
  }
}