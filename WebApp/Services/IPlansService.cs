using WebApp.Dtos;
using WebApp.Models;

namespace WebApp.Services
{
    public interface IPlansService : IBaseService<Plan>
    {
        Task<IEnumerable<Plan>> GetByUserIdAsync(int userId);
    }
}
