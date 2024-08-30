
using System.Security.Claims;
using API.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
        ClaimsPrincipal ValidateToken(string token);
    }
}