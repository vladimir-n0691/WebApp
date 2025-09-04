using Microsoft.AspNetCore.Mvc;
using WebApp.BLL.Contracts;
using WebApp.BLL.Models;
using WebApp.Core.Enums;
using WebApp.Helpers;
using WebApp.Models;

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

        [HttpGet("login")]
        public IActionResult Login(string login, string password)
        {
            var users = usersService.GetAllAsync().GetAwaiter().GetResult();
            UserDto? user = users.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (user == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var encodedJwt = Helper.CreateJwtToken(configuration, user.Id, (int)UserRole.Client);
            if (encodedJwt == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var response = new
            {
                access_token = encodedJwt,
                user_id = user.Id
            };

            return Ok(response);

        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            return Ok("TEST_DATA");
        }
    }
}
