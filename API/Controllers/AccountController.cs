using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

  [HttpPost("register")]
  public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) 
  {
    if(await UserExists(registerDto.Username)) return BadRequest("Username is taken.");

    using var hmac = new HMACSHA512();

    var user = new AppUser
    {
      UserName = registerDto.Username.ToLower(),
      PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
      PasswordSalt = hmac.Key
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return new UserDto{
      Username = user.UserName,
      Token = _tokenService.CreateToken(user)
    };
  }

  [HttpPost("login")]
  public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
  {
    var user = await _context.Users.SingleOrDefaultAsync(user => user.UserName == loginDto.Username);

    if (user == null) return Unauthorized("Invalid username!");

    using var hmac = new HMACSHA512(user.PasswordSalt);

    var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

    for(int i =0; i < computedHash.Length; i++) {
      if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password!");
    }

    return new UserDto{
      Username = user.UserName,
      Token = _tokenService.CreateToken(user)
    };
  }

  [Authorize]
  [HttpGet("me")]
  public async Task<ActionResult<UserDto>> Me() {
    var authHeader = Request.Headers["Authorization"].ToString();

    if(authHeader == null && authHeader.StartsWith("Bearer ")) return Unauthorized("No token provided!");

    ClaimsPrincipal decodedToken = _tokenService.ValidateToken(authHeader.Split(' ')[1]);
    
    var nameIdClaim = decodedToken.FindFirst("name");

    if(nameIdClaim == null) return Unauthorized("You are not authorized!");

    var nameId = nameIdClaim.Value;
    var user = await _context.Users.Where(u => u.UserName == nameId).SingleOrDefaultAsync();

    return new UserDto{
      Username = user.UserName,
      Token = authHeader
    };
  }

  private async Task<bool> UserExists(string username) 
  {
    return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
  }
}
