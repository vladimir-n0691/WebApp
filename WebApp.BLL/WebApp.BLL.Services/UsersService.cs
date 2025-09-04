using AutoMapper;
using WebApp.BLL.Contracts;
using WebApp.BLL.Models;
using WebApp.DAL.Contracts;
using WebApp.DAL.Entities;

namespace WebApp.BLL.Services
{
    public class UsersService : BaseService<IUsersRepository, User, UserDto>, IUsersService
    {
        public UsersService(IUsersRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
