using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ProductManager.Dtos
{
  public class RegisterResponseDto
  {
    [Required]
    public bool Succeeded;
    public IEnumerable<IdentityError> Errors { get; set; }
  }
}