using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApp.BLL.Contracts;
using WebApp.BLL.Models;
using WebApp.Core.Enums;


namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : BaseController<IUsersService, UserDto>
    {
        public UsersController(IUsersService usersService) : base(usersService) { }

        [HttpPost()]
        public override IActionResult Create(UserDto entity)
        {
            entity.Id = 0;
            entity.UserRole = UserRole.Client;
            return base.Create(entity);
        }

        [HttpPatch()]
        public override IActionResult Update(UserDto entity)
        {
            entity.UserRole = UserRole.Client;
            return base.Update(entity);
        }}
}
