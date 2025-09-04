using WebApp.Core.Enums;

namespace WebApp.BLL.Models
{
    public class UserDto : BaseModel
    {
        public UserRole UserRole { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Company { get; set; }

        public required string Email { get; set; }

        public required string Login { get; set; }

        public required string Password { get; set; }
    }
}
