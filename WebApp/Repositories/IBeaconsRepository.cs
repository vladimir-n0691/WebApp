using WebApp.Dtos;

namespace WebApp.Repositories
{
    public interface IBeaconsRepository : IBaseRepository<BeaconDto>
    {
        Task<IEnumerable<BeaconDto>> GetByPlanIdAsync(int planId);
    }
}
