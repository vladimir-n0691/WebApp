using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlansController : BaseController<IPlansService, Plan>
    {
        public PlansController( IPlansService plansService) : base(plansService) { }

        [HttpGet("getByUserId/{id}")]
        public IActionResult GetByUserId(int id)
        {
            try
            {
                var entity = ((PlansService)Service).GetByUserIdAsync(id).GetAwaiter().GetResult();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
