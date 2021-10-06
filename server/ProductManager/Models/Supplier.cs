using System;
using System.ComponentModel.DataAnnotations;

namespace ProductManager.Models
{
  public class Supplier
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