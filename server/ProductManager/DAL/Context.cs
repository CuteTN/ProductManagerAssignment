using Microsoft.EntityFrameworkCore;
using ProductManager.Models;

namespace ProductManager.DAL
{
  public class Context : DbContext
  {
    public Context(DbContextOptions<Context> opt) : base(opt)
    { }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductDetail> ProductDetails { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    // public DbSet<CategoryProduct> CategoryProduct { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { }
  }
}