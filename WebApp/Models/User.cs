using WebApp.Common;

namespace WebApp.Models
{
    public class User : BaseModel
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
