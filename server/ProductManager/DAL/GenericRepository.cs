using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ProductManager.DAL
{
  public class GenericRepository<TEntity> where TEntity : class
  {
    private readonly Context _context;
    private DbSet<TEntity> dbSet;

    public GenericRepository(Context context)
    {
      _context = context;
      dbSet = _context.Set<TEntity>();
    }

    public virtual IEnumerable<TEntity> GetAll()
    {
      return dbSet.ToList();
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