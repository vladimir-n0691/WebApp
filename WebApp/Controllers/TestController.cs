using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using WebApp.Repositories;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IUsersRepository usersRepository;

        public TestController(IUsersRepository usersRepository) {
            this.usersRepository = usersRepository;
        }

        [HttpGet]
        [Route("GetTestData")]
        public IActionResult GetTestData()
        {
            var count = usersRepository.GetAllAsync().GetAwaiter().GetResult().Count();
            return Ok($"count={count}");
        }

        [HttpGet]
        [Authorize]
        [Route("GetAuthTestData")]
        public IActionResult GetAuthTestData()
        {
            return Ok("AUTH_TEST_DATA");
        }
    }
}
