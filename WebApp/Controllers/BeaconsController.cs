using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeaconsController : BaseController<IBeaconsService, Beacon>
    {
        private readonly IPlansService plansService;

        public BeaconsController(IPlansService plansService, IBeaconsService beaconsService) : base(beaconsService) 
        { 
            this.plansService = plansService;
        }

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

        [HttpGet("getConfigByPlanId/{id}")]
        public IActionResult GetConfigByPlanId(int id)
        {
            try
            {
                var plan = plansService.GetByIdAsync(id).GetAwaiter().GetResult();  
                var beacons = Service.GetByPlanIdAsync(id).GetAwaiter().GetResult();
                var config = new Configuration
                {
                    Beacons = beacons.ToArray(),
                    ScaleX = plan.ScaleX,
                    ScaleY = plan.ScaleY,
                    ScaleZ = plan.ScaleZ,
                };

                return Ok(config);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
