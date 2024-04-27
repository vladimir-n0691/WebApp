using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using WebApp.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using WebApp.Helpers;
using System.Text;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IUsersService usersService;

        public AuthController(IConfiguration configuration, IUsersService usersService)
        {
            this.configuration = configuration;
            this.usersService = usersService;
        }

        [HttpGet]
        [Route("login")]
        public IActionResult Login(string user, string password)
        {
            var identity = GetIdentity(user, password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var issuer = configuration["Jwt:Issuer"];
            var audience = configuration["Jwt:Audience"];
            var tokenKey = Encoding.UTF8.GetBytes(configuration["JWT:Key"]);
            var lifetime = int.Parse(configuration["JWT:Lifetime"]);

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(lifetime)),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            return Ok(response);

        }

        [HttpGet]
        [Route("logout")]
        public IActionResult Logout()
        {
            return Ok("TEST_DATA");
        }

        private ClaimsIdentity? GetIdentity(string username, string password)
        {
            var users = usersService.GetAllAsync().GetAwaiter().GetResult();
            User? user = users.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                    //new Claim(ClaimsIdentity.DefaultRoleClaimType, user.GetRole())
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
