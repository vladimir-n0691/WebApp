using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Dtos
{
    [Table("Users")]
    public class UserDto : BaseDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public int Type { get; set; }
        public string Email { get; set; }
    }
}
