using Microsoft.EntityFrameworkCore;
using WebApp.Common;
using WebApp.Dtos;

namespace WebApp.Repositories
{
    public class PlansRepository : BaseRepository<DataBaseContext, PlanDto>, IPlansRepository
    {
        public PlansRepository(DataBaseContext DbContext) : base(DbContext)
        {
        }

        public async Task<IEnumerable<PlanDto>> GetByUserIdAsync(int userId)
        {
            try
            {
                return await DbContext.GetEntities<PlanDto, DataBaseContext>().Where(i => i.UserId == userId).ToListAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
