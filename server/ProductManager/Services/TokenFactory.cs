using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace ProductManager.Services
{
  static public class TokenFactory
  {

    static public JwtSecurityToken Generate(string name, IList<string> userRoles, DateTime tokenLifeTime, IConfiguration configuration)
    {
      var authClaims = new List<Claim>
        {
          new Claim(ClaimTypes.Name, name),
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