using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApp.Helpers
{
    public static class Helper
    {
        public static string? CreateJwtToken(IConfiguration configuration, int userId, int userRole)
        {
            var identity = GetIdentity(userId, userRole);
            if (identity == null)
            {
                return null;
            }

            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var tokenKey = Encoding.UTF8.GetBytes(configuration["JWT:Key"]);
            var lifetime = int.Parse(configuration["JWT:Lifetime"]);

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
            notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(lifetime)),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        private static ClaimsIdentity? GetIdentity(int userId, int userRole)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userId.ToString()),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, userRole.ToString()),
                };
            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
