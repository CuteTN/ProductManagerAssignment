using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProductManager.Infrastructure.DbContext;
using ProductManager.Domain.Infrastructure.Repositories;

namespace ProductManager.Infrastructure.Repositories
{
  public class GenericRepository<TEntity> : IGenericRepository<TEntity>
    where TEntity : class
  {
    private readonly AppDbContext _context;
    private DbSet<TEntity> dbSet;

    public GenericRepository(AppDbContext context)
    {
      _context = context;
      dbSet = _context.Set<TEntity>();
    }

    public virtual IQueryable<TEntity> GetAll()
    {
      return dbSet.AsQueryable();
    }

    public virtual TEntity GetById(int id)
    {
      return dbSet.Find(id);
    }

    public virtual void Add(TEntity entity)
    {
      dbSet.Add(entity);
    }

    public virtual void DeleteById(object id)
    {
      TEntity entityToDelete = dbSet.Find(id);
      Delete(entityToDelete);
    }

    public virtual void Delete(TEntity entityToDelete)
    {
      if (_context.Entry(entityToDelete).State == EntityState.Detached)
      {
        dbSet.Attach(entityToDelete);
      }
      dbSet.Remove(entityToDelete);
    }

    public virtual void Update(TEntity entityToUpdate)
    {
      dbSet.Attach(entityToUpdate);
      _context.Entry(entityToUpdate).State = EntityState.Modified;
    }
  }
}