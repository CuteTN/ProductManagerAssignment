using System.ComponentModel.DataAnnotations;

namespace ProductManager.Application.Dtos
{
  public class UserCreateDto
  {
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Password { get; set; }
  }
}