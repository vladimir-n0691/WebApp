using WebApp.Dtos;

namespace WebApp.Repositories
{
    public interface IPlansRepository : IBaseRepository<PlanDto>
    {
        Task<IEnumerable<PlanDto>> GetByUserIdAsync(int userId);
    }
}
