using System.ComponentModel.DataAnnotations;

namespace ProductManager.Dtos
{
  public class RegisterRequestDto
  {
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Password { get; set; }
  }
}