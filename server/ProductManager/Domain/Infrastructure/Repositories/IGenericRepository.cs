using System.Linq;

namespace ProductManager.Domain.Infrastructure.Repositories
{
  public interface IGenericRepository<TEntity> where TEntity : class
  {
    IQueryable<TEntity> GetAll();
    TEntity GetById(int id);
    void Add(TEntity entity);
    void DeleteById(object id);
    void Delete(TEntity entityToDelete);
    void Update(TEntity entityToUpdate);
  }
}