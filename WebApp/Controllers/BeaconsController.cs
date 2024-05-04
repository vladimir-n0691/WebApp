using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeaconsController : BaseController<IBeaconsService, Beacon>
    {
        public BeaconsController(IBeaconsService beaconsService) : base(beaconsService) { }

        [HttpGet("getByPlanId/{id}")]
        public IActionResult GetByPlanId(int id)
        {
            try
            {
                var entity = Service.GetByPlanIdAsync(id).GetAwaiter().GetResult();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
