using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Dtos
{
  public class SupplierReadDto
  {
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(250)]
    public string Name { get; set; }

    [Required]
    [MaxLength(250)]
    public String Address { get; set; }
  }
}