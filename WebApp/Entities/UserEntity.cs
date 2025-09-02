using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Common;

namespace WebApp.Entities
{
    [Table("users")]
    public class UserEntity : BaseEntity
    {
        [Column("user_role")]
        public UserRole UserRole { get; set; }

        [Column("first_name")]
        public required string FirstName { get; set; }

        [Column("last_name")]
        public required string LastName { get; set; }

        [Column("company")]
        public string? Company { get; set; }

        [Column("email")]
        public required string Email { get; set; }

        [Column("login")]
        public required string Login { get; set; }

        [Column("password")]
        public required string Password { get; set; }
    }
}
