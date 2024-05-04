using AutoMapper;
using WebApp.Dtos;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Services
{
    public class PlansService : BaseService<IPlansRepository, PlanDto, Plan>, IPlansService
    {
        public PlansService(IPlansRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<Plan>> GetByUserIdAsync(int userId)
        {
            try
            {
                return Mapper.Map<IEnumerable<Plan>>(await Repository.GetByUserIdAsync(userId));
            }
            catch
            {
                throw;
            }
        }
    }
}