using AutoMapper;
using WebApp.Dtos;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Services
{
    public class UsersService : BaseService<IUsersRepository, UserDto, User>, IUsersService
    {
        public UsersService(IUsersRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
