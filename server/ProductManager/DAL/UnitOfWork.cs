using System;
using System.Collections.Generic;

namespace ProductManager.DAL
{
  public class UnitOfWork : IDisposable
  {
    private AppDbContext _context;
    private readonly Dictionary<Type, object> reposotories = new Dictionary<Type, object>();

    public UnitOfWork(AppDbContext context)
    {
      _context = context;
    }

    public void SaveChanges()
    {
      _context.SaveChanges();
    }

    public GenericRepository<T> Repository<T>()
        where T : class
    {
      Type type = typeof(T);
      if (!reposotories.TryGetValue(type, out object value))
      {
        var genericRepos = new GenericRepository<T>(_context);
        reposotories.Add(type, genericRepos);
        return genericRepos;
      }
      return value as GenericRepository<T>;
    }


    private bool disposed = false;

    protected virtual void Dispose(bool disposing)
    {
      if (!this.disposed)
      {
        if (disposing)
        {
          _context.Dispose();
        }
      }
      this.disposed = true;
    }

    public void Dispose()
    {
      Dispose(true);
      GC.SuppressFinalize(this);
    }
  }
}