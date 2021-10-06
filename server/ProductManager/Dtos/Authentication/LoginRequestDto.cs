using System.ComponentModel.DataAnnotations;

namespace ProductManager.Dtos
{
  public class LoginRequestDto
  {
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Password { get; set; }
  }
}