using System;
using System.Collections.Generic;

using ProductManager.Domain.Infrastructure.Repositories;
using ProductManager.Domain.Infrastructure.UnitOfWork;

using ProductManager.Infrastructure.DbContext;
using ProductManager.Infrastructure.Repositories;

namespace ProductManager.Infrastructure.UnitOfWork
{
  public class UnitOfWork : IDisposable, IUnitOfWork
  {
    private AppDbContext _context;
    private readonly Dictionary<Type, object> _reposotories = new Dictionary<Type, object>();

    public UnitOfWork(AppDbContext context)
    {
      _context = context;
    }

    public void SaveChanges()
    {
      _context.SaveChanges();
    }

    public IGenericRepository<TEntity> GetRepository<TEntity>()
    where TEntity : class
    {
      Type type = typeof(TEntity);
      if (!_reposotories.TryGetValue(type, out object value))
      {
        var genericRepos = CreateRepository<TEntity>();
        _reposotories.Add(type, genericRepos);
        return genericRepos;
      }
      return value as GenericRepository<TEntity>;
    }


    private IGenericRepository<TEntity> CreateRepository<TEntity>() where TEntity : class
    {
      return new GenericRepository<TEntity>(_context);
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