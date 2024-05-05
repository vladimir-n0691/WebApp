using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp.Helpers;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlansController : BaseController<IPlansService, Plan>
    {
        private readonly IConfiguration configuration;
        private readonly IUsersService usersService;


        public PlansController( IPlansService plansService, IConfiguration configuration, IUsersService usersService) : base(plansService) 
        {
            this.configuration = configuration;
            this.usersService = usersService;
        }

        [Authorize]
        [HttpPost()]
        public override IActionResult Create(Plan entity)
        {
            if (User?.Identity?.Name != entity.UserId.ToString())
            {
                return BadRequest("Plan.userId != User.id");
            }

            entity.Id = 0;
            entity.ApiToken = Helper.CreateJwtToken(configuration, entity.UserId, (int)UserRole.SDK);
            entity.ScaleX = 1;
            entity.ScaleY = 1;
            entity.ScaleZ = 1;

            return base.Create(entity);
        }

        [HttpGet("getByUserId/{id}")]
        public IActionResult GetByUserId(int id)
        {
            try
            {
                var entity = Service.GetByUserIdAsync(id).GetAwaiter().GetResult();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }



    }
}
