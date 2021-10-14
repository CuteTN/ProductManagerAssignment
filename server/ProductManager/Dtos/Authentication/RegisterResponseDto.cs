using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ProductManager.Dtos
{
  public class RegisterResponseDto
  {
    [Required]
    public bool Succeeded;

    // NOTE: Using IEnumerable to easily fit with ASP.NET Identity
    public IEnumerable<IdentityError> Errors { get; set; }
  }
}