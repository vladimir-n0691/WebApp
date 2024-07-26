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
    public class UsersController : BaseController<IUsersService, User>
    {
        public UsersController(IUsersService usersService) : base(usersService) { }

        [HttpPost()]
        public override IActionResult Create(User entity)
        {
            entity.Id = 0;
            entity.UserRole = Common.UserRole.Client;
            return base.Create(entity);
        }

        [HttpPatch()]
        public override IActionResult Update(User entity)
        {
            entity.UserRole = Common.UserRole.Client;
            return base.Update(entity);
        }}
}
