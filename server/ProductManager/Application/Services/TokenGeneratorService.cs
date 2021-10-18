using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace ProductManager.Application.Services
{
  public class TokenGeneratorService
  {
    public JwtSecurityToken Generate(string userName, IList<string> userRoles, DateTime tokenLifeTime, string tokenType, IConfiguration configuration)
    {
      var authClaims = new List<Claim>
        {
          new Claim("type", tokenType),
          new Claim("username", userName),
          new Claim(ClaimTypes.Name, userName),
          new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

      foreach (var userRole in userRoles)
      {
        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
      }

      var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

      return new JwtSecurityToken(
        issuer: configuration["JWT:ValidIssuer"],
        audience: configuration["JWT:ValidAudience"],
        expires: new DateTime(DateTime.Now.Ticks + tokenLifeTime.Ticks),
        claims: authClaims,
        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
      );
    }
  }
}