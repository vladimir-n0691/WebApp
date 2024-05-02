using AutoMapper;
using WebApp.Dtos;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Services
{
    public class PlansService : BaseService<Plan, PlanDto>, IPlansService
    {
        public PlansService(IPlansRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<Plan>> GetByUserIdAsync(int userId)
        {
            try
            {
                return Mapper.Map<IEnumerable<Plan>>(await ((IPlansRepository)Repository).GetByUserIdAsync(userId));
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}