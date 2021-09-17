using System.Collections.Generic;
using System.Linq;
using ProductManager.Models;

namespace ProductManager.DAL
{
  class SqlCategoryRepository : ICategoryRepository
  {
    private readonly Context _context;

    public SqlCategoryRepository(Context context)
    {
      _context = context;
    }

    public IEnumerable<Category> GetAllCategories()
    {
      return _context.Categories.ToList();
    }

    public Category GetCategoryById(int id)
    {
      var result = _context.Categories.FirstOrDefault(p => p.Id == id);
      return result;
    }

    public int SaveChanges()
    {
      throw new System.NotImplementedException();
    }
  }
}