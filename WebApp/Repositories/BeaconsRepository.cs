using Microsoft.EntityFrameworkCore;
using WebApp.Common;
using WebApp.Dtos;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class BeaconsRepository : BaseRepository<DataBaseContext, BeaconDto>, IBeaconsRepository
    {
        public BeaconsRepository(DataBaseContext DbContext) : base(DbContext)
        {
        }

        public async Task<IEnumerable<BeaconDto>> GetByPlanIdAsync(int planId)
        {
            try
            {
                return await DbContext.GetEntities<BeaconDto, DataBaseContext>().Where(i => i.PlanId == planId).ToListAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
