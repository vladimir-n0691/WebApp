using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Dtos
{
    [Table("users")]
    public class UserDto : BaseDto
    {
        [Column("type")]
        public int Type { get;set; }

        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        [Column("company")]
        public string Company { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("login")]
        public string Login { get; set; }

        [Column("password")]
        public string Password { get; set; }
    }
}
