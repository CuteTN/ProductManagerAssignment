using System.ComponentModel.DataAnnotations;

namespace ProductManager.Dtos
{
  public class InvalidateRefreshTokenRequestDto
  {
    [Required]
    public string refreshToken { get; set; }
  }
}