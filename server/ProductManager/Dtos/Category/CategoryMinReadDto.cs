using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Dtos
{
  public class CategoryMinReadDto
  {
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(250)]
    public string Name { get; set; }

    // Navigation Properties ///////////////////////////////////////
    public virtual ICollection<int> ProductIds { get; set; }
  }
}