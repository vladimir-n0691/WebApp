using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IUsersService usersService;

        public UsersController(IConfiguration configuration, IUsersService usersService)
        {
            this.configuration = configuration;
            this.usersService = usersService;
        }

        [HttpPost("create")]
        public IActionResult Create(CreateUserRequest request)
        {
            try
            {
                var newUser = usersService.AddAsync(new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Company = request.Company,
                    Email = request.Email,
                    Login = request.Login,
                    Password = request.Password,
                    Type = 1
                }).GetAwaiter().GetResult();
                return Ok(newUser.Id);
            }
            catch(Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPatch("update")]
        public IActionResult Update(User user)
        {
            try
            {
                var newUser = usersService.UpdateAsync(user).GetAwaiter().GetResult();
                return Ok(newUser.Id);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var user = usersService.GetByIdAsync(id).GetAwaiter().GetResult();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("login")]
        public IActionResult Login(string login, string password)
        {
            var users = usersService.GetAllAsync().GetAwaiter().GetResult();
            User? user = users.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (user == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var identity = GetIdentity(user);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
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

            var response = new
            {
                access_token = encodedJwt,
                user_name = identity.Name,
                user_id = user.Id
            };

            return Ok(response);

        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            return Ok("TEST_DATA");
        }

        private ClaimsIdentity? GetIdentity(User user)
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
    }
}
