using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService) { 
            this.usersService = usersService;
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create(CreateUserRequest request)
        {
            var rees = usersService.AddAsync(new Models.User { 
                FirstName = request.FirstName,
                LastName = request.LastName,
                Company = request.Company,
                Email = request.Email,
                Login = request.Login,
                Password = request.Password,
                Type = 1//,
                //Id = 1
            }).GetAwaiter().GetResult();

            var count = usersService.GetAllAsync().GetAwaiter().GetResult().Count();


            return Ok($"count: {count}");
        }
    }
}
