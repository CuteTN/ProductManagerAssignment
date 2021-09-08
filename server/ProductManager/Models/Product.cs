using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Models
{
  public class Product
  {
    [Key] // CuteTN Note: not necessary for an Id, but let's just put it there for fun :)
    public int Id { get; set; }

    [Required]
    [MaxLength(250)]
    public string Name { get; set; }

    [MaxLength(250)]
    public string Description { get; set; }

    public DateTime? ReleaseDate { get; set; }

    public DateTime? DiscontinuedDate { get; set; }

    public Int16? Rating { get; set; }

    public Double? Price { get; set; }

    // Navigation Properties ///////////////////////////////////////
    public virtual ICollection<Category> Categories { get; set; }

    [ForeignKey("Supplier")]
    public int? SupplierId { get; set; }
    public virtual Supplier Supplier { get; set; }

    public virtual ProductDetail ProductDetail { get; set; }
  }
}