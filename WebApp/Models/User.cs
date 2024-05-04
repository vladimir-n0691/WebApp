namespace WebApp.Models
{
    public enum UserRole
    {
        Client = 0, Manager = 1, Admin = 2, SDK = 3
    }

    public class User : BaseModel
    {
        public int Type { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Company { get; set; }

        public required string Email { get; set; }

        public required string Login { get; set; }

        public required string Password { get; set; }
    }
}
