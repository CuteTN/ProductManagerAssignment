using System.ComponentModel.DataAnnotations;

namespace ProductManager.Dtos
{
  public class RefreshTokenRequestDto
  {
    [Required]
    public string refreshToken { get; set; }
  }
}