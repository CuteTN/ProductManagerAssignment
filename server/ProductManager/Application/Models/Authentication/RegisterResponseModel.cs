using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ProductManager.Application.Models
{
  public class RegisterResponseModel
  {
    [Required]
    public bool Succeeded;

    // NOTE: Using IEnumerable to easily fit with ASP.NET Identity
    public IEnumerable<IdentityError> Errors { get; set; }
  }
}