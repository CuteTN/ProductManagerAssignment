using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Dtos
{
  public class ProductUpdateDto
  {
    [Required]
    [MaxLength(250)]
    public string Name { get; set; }

    [MaxLength(250)]
    public string Description { get; set; }

    public DateTime? ReleaseDate { get; set; }

    public DateTime? DiscontinuedDate { get; set; }

    public Int16? Rating { get; set; }
    public Double? Price { get; set; }

    [ForeignKey("Supplier")]
    public int? SupplierId { get; set; }
  }
}