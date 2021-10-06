using System;
using System.ComponentModel.DataAnnotations;

namespace ProductManager.Dtos
{
  public class LoginResponseDto
  {
    public string UserId { get; set; }
    public string UserName { get; set; }

    public string AccessToken { get; set; }
    public DateTime Expiration { get; set; }
   
    public string RefreshToken { get; set; }
  }
}