// source:
// - Basic authen: https://www.c-sharpcorner.com/article/authentication-and-authorization-in-asp-net-core-web-api-with-json-web-tokens/?fbclid=IwAR2ab4-K8_2paAmqYnBGJ8c7EsHmQEVrDwLPJQRGAEqTk_JtwApJb6jNPIA
// - Refresh token: https://dev.to/moe23/refresh-jwt-with-refresh-tokens-in-asp-net-core-5-rest-api-step-by-step-3en5

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProductManager.DAL;
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
    private TokenValidationParameters _tokenValidationParameters;
    private readonly UnitOfWork _unitOfWork;
    private readonly GenericRepository<RefreshToken> _refreshTokenRepo;


    public AuthenticationController(
      UserManager<AppUser> userManager,
      SignInManager<AppUser> signInManager,
      IConfiguration configuration,
      TokenValidationParameters tokenValidationParameters,
      IMapper mapper,
      UnitOfWork unitOfWork
    )
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _mapper = mapper;
      _configuration = configuration;
      _tokenValidationParameters = tokenValidationParameters;
      _unitOfWork = unitOfWork;
      _refreshTokenRepo = unitOfWork.Repository<RefreshToken>();
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

      return Ok(await GenerateAndSaveUserJwtToken(user));
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto refreshTokenRequestDto)
    {
      var token = VerifyRefreshToken(refreshTokenRequestDto.refreshToken);
      if (token == null)
        return BadRequest("Invalid refresh token.");

      var user = await _userManager.FindByIdAsync(token.UserId);

      if (user == null)
        return NotFound("Cannot find the user of the token");

      InvalidateRefreshToken(token);

      return Ok(await GenerateAndSaveUserJwtToken(user));
    }

    private async Task<LoginResponseDto> GenerateAndSaveUserJwtToken(AppUser user)
    {
      var userRoles = await _userManager.GetRolesAsync(user);
      var accessToken = TokenFactory.Generate(
        user.UserName,
        userRoles,
        new DateTime().AddMinutes(1),
        "access",
        _configuration
      );
      var refreshToken = TokenFactory.Generate(
        user.UserName,
        userRoles,
        new DateTime().AddDays(10),
        "refresh",
        _configuration
      );

      var jwtTokenHandler = new JwtSecurityTokenHandler();

      _refreshTokenRepo.Add(new RefreshToken
      {
        Invalidated = false,
        JwtId = accessToken.Id,
        UserId = user.Id,
        AddedDate = refreshToken.ValidFrom,
        ExpiryDate = accessToken.ValidTo,
        Token = jwtTokenHandler.WriteToken(refreshToken),
      }
      );
      _unitOfWork.SaveChanges();

      return new LoginResponseDto
      {
        UserId = user.Id,
        UserName = user.UserName,
        AccessToken = jwtTokenHandler.WriteToken(accessToken),
        Expiration = accessToken.ValidTo,
        RefreshToken = jwtTokenHandler.WriteToken(refreshToken)
      };
    }

    private RefreshToken VerifyRefreshToken(string token)
    {
      var jwtTokenHandler = new JwtSecurityTokenHandler();

      // First, just check if this token is valid
      try { jwtTokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken); }
      catch { return null; }

      // Check if the refresh token is still available
      RefreshToken existedToken = _refreshTokenRepo.GetAll().FirstOrDefault(rt => rt.Token == token && !rt.Invalidated);
      if (existedToken == null)
        return null;

      return existedToken;
    }

    [HttpDelete("invalidate")]
    public IActionResult InvalidateRefreshToken(InvalidateRefreshTokenRequestDto invalidateRefreshTokenRequestDto)
    {
      var token = _refreshTokenRepo.GetAll().FirstOrDefault(token => token.Token == invalidateRefreshTokenRequestDto.refreshToken);
      InvalidateRefreshToken(token);
      return Ok();
    }

    public void InvalidateRefreshToken(RefreshToken token)
    {
      if (token != null)
      {
        _refreshTokenRepo.DeleteById(token.Id);
        _unitOfWork.SaveChanges();
      }
    }
  }
}