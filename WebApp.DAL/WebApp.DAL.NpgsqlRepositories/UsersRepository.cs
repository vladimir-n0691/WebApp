using WebApp.DAL.Contracts;
using WebApp.DAL.Entities;

namespace WebApp.DAL.NpgsqlRepositories
{
    public class UsersRepository : BaseRepository<DataBaseContext, User>, IUsersRepository
    {
        public UsersRepository(DataBaseContext DbContext) : base(DbContext)
        {
        }
    }
}
