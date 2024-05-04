using AutoMapper;
using WebApp.Dtos;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Services
{
    public class BeaconsService : BaseService<IBeaconsRepository, BeaconDto, Beacon>, IBeaconsService
    {
        public BeaconsService(IBeaconsRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<IEnumerable<Beacon>> GetByPlanIdAsync(int planId)
        {
            try
            {
                return Mapper.Map<IEnumerable<Beacon>>(await Repository.GetByPlanIdAsync(planId));
            }
            catch
            {
                throw;
            }
        }
    }
}
