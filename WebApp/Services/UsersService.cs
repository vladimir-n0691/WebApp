using AutoMapper;
using WebApp.Entities;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Services
{
    public class UsersService : BaseService<IUsersRepository, UserEntity, User>, IUsersService
    {
        public UsersService(IUsersRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
