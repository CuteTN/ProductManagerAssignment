using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductManager.Domain.Entities
{
  public class Category
  {
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(250)]
    public string Name { get; set; }

    // Navigation Properties ///////////////////////////////////////
    public virtual ICollection<Product> Products { get; set; }
  }
}