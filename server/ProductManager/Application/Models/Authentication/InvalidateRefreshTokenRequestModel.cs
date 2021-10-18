using System.ComponentModel.DataAnnotations;

namespace ProductManager.Application.Models
{
  public class InvalidateRefreshTokenRequestModel
  {
    [Required]
    public string refreshToken { get; set; }
  }
}