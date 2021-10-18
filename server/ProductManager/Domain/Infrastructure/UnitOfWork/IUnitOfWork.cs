using ProductManager.Domain.Infrastructure.Repositories;

namespace ProductManager.Domain.Infrastructure.UnitOfWork
{
  public interface IUnitOfWork
  {
    void SaveChanges();
    IGenericRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
  }
}