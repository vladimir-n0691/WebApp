using WebApp.Dtos;

namespace WebApp.Repositories
{
    public class UsersRepository : BaseRepository<DataBaseContext, UserDto>, IUsersRepository
    {
        public UsersRepository(DataBaseContext DbContext) : base(DbContext)
        {
        }
    }
}
