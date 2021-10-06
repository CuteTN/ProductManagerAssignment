using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProductManager.Dtos;
using ProductManager.Models;
using ProductManager.Services;

namespace ProductManager.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthenticationController : ControllerBase
  {
    private UserManager<AppUser> _userManager = null;
    private SignInManager<AppUser> _signInManager = null;
    private readonly IConfiguration _configuration;

    private IMapper _mapper = null;

    public AuthenticationController(
      UserManager<AppUser> userManager,
      SignInManager<AppUser> signInManager,
      IConfiguration configuration,
      IMapper mapper
    )
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _mapper = mapper;
      _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDto registerDto)
    {
      var newUser = _mapper.Map<AppUser>(registerDto);
      var identityResult = await _userManager.CreateAsync(newUser, registerDto.Password);
      var result = new RegisterResponseDto
      {
        Succeeded = identityResult.Succeeded,
        Errors = identityResult.Errors
      };

      if (result.Succeeded)
        return Ok(result);
      else
        return StatusCode(StatusCodes.Status500InternalServerError, result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
    {
      var user = await _userManager.FindByNameAsync(loginRequestDto.UserName);

      if (user == null)
        return Unauthorized(new { message = $"There is no user whose name is {loginRequestDto.UserName}" });

      if (!await _userManager.CheckPasswordAsync(user, loginRequestDto.Password))
        return Unauthorized(new { message = $"The provided password is incorrect" });

      var userRoles = await _userManager.GetRolesAsync(user);
      var accessToken = TokenFactory.Generate(
        user.UserName, 
        userRoles, 
        new DateTime().AddMinutes(10), 
        _configuration
      );
      var refreshToken = TokenFactory.Generate(
        user.UserName, 
        userRoles, 
        new DateTime().AddDays(1), 
        _configuration
      );

      return Ok(new LoginResponseDto
      {
        UserId = user.Id,
        UserName = user.UserName,
        AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
        Expiration = accessToken.ValidTo,
        RefreshToken = new JwtSecurityTokenHandler().WriteToken(refreshToken)
      }
      );
    }
  }
}