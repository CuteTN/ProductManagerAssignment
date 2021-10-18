using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Application.Dtos
{
  public class ProductMinReadDto
  {
    public int Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public Int16? Rating { get; set; }
    public Double? Price { get; set; }

    public DateTime? ReleaseDate { get; set; }
    public DateTime? DiscontinuedDate { get; set; }

    public virtual ICollection<int> CategoryIds { get; set; }

    [ForeignKey("Supplier")]
    public int? SupplierId { get; set; }
  }
}