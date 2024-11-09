using Microsoft.AspNetCore.Mvc;
using WebApp.Common;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    public abstract class BaseController<TService, TModel> : ControllerBase where TService : IBaseService<TModel>
                                                                            where TModel : IIdentifiable
    {
        private readonly TService service;

        public TService Service { get => service; }

        public BaseController(TService service)
        {
            this.service = service;
        }

        [HttpGet("getAll")]
        public virtual IActionResult GetAll(int id)
        {
            try
            {
                var entities = service.GetAllAsync().GetAwaiter().GetResult();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public virtual IActionResult GetById(int id)
        {
            try
            {
                var entity = service.GetByIdAsync(id).GetAwaiter().GetResult();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPost()]
        public virtual IActionResult Create(TModel entity)
        {
            try
            {
                entity.Id = 0;
                var newEntity = service.AddAsync(entity).GetAwaiter().GetResult();
                return Ok(newEntity);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPatch()]
        public virtual IActionResult Update(TModel entity)
        {
            try
            {
                var newEntity = service.UpdateAsync(entity).GetAwaiter().GetResult();
                return Ok(newEntity);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            try
            {
                var entity = service.RemoveByIdAsync(id).GetAwaiter().GetResult();
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
