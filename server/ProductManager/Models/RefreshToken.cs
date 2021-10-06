using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Models
{
  public class RefreshToken
  { 
    [Key]
    public int Id { get; set; }
    public string UserId { get; set; } // Linked to the AspNet Identity User Id
    public string Token { get; set; }
    public string JwtId { get; set; } // Map the token with jwtId
    public bool Invalidated { get; set; } // if its used we dont want generate a new Jwt token with the same refresh token
    public DateTime AddedDate { get; set; }
    public DateTime ExpiryDate { get; set; } // Refresh token is long lived it could last for months.

    [ForeignKey(nameof(UserId))]
    virtual public AppUser User {get;set;}
  }
}