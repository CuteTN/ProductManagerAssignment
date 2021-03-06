using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Application.Dtos
{
  public class ProductReadDto
  {
    public int Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public Int16? Rating { get; set; }
    public Double? Price { get; set; }

    public DateTime? ReleaseDate { get; set; }
    public DateTime? DiscontinuedDate { get; set; }

    public virtual ICollection<CategoryMinReadDto> Categories { get; set; }

    [ForeignKey("Supplier")]
    public int? SupplierId { get; set; }
    public virtual SupplierMinReadDto Supplier { get; set; }

    public virtual ProductDetailMinReadDto ProductDetail { get; set; }
  }
}