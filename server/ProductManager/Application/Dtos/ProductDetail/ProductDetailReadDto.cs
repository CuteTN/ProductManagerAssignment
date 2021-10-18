using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Application.Dtos
{
  public class ProductDetailReadDto
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)] // turn off auto increment id
    [ForeignKey("Product")]
    public int ProductId { get; set; }

    public String Details { get; set; }

    // Navigation Properties ///////////////////////////////////////
    public virtual ProductMinReadDto Product { get; set; }
  }
}