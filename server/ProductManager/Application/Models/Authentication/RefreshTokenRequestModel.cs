using System.ComponentModel.DataAnnotations;

namespace ProductManager.Application.Models
{
  public class RefreshTokenRequestModel
  {
    [Required]
    public string refreshToken { get; set; }
  }
}