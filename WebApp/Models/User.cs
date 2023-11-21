using WebApp.Common;

namespace WebApp.Models
{
    public enum UserType
    {
        Client, Manager, Admin
    }

    public class User : BaseModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public UserType Type { get; set; }


        public string GetRole() => Type.ToString();
    }
}
