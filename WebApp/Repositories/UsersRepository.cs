using WebApp.Entities;

namespace WebApp.Repositories
{
    public class UsersRepository : BaseRepository<DataBaseContext, UserEntity>, IUsersRepository
    {
        public UsersRepository(DataBaseContext DbContext) : base(DbContext)
        {
        }
    }
}
