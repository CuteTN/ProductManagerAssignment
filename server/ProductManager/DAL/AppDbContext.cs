using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductManager.Models;

namespace ProductManager.DAL
{
  public class AppDbContext : IdentityDbContext<AppUser>
  {
    public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductDetail> ProductDetails { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    // public DbSet<CategoryProduct> CategoryProduct { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { 
      base.OnModelCreating(modelBuilder);
    }
  }
}