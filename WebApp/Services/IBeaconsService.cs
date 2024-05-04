using WebApp.Models;

namespace WebApp.Services
{
    public interface IBeaconsService : IBaseService<Beacon>
    {
        Task<IEnumerable<Beacon>> GetByPlanIdAsync(int planId);
    }
}
