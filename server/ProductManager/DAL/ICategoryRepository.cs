using System.Collections.Generic;
using ProductManager.Models;

namespace ProductManager.DAL
{
  public interface ICategoryRepository
  {
    int SaveChanges();

    IEnumerable<Category> GetAllCategories();
    Category GetCategoryById(int id);
  }
}