using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Dtos
{
    [Table("plans")]
    public class PlanDto : BaseDto
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("name")]
        public required string Name { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("url")]
        public required string Url { get; set; }

        [Column("api_token")]
        public string? ApiToken { get; set; }
    }
}
