using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Plan : BaseModel
    {
        public int UserId { get; set; }

        public required string Name { get; set; }

        public string? Description { get; set; }

        public required string Url { get; set; }

        public string? ApiToken { get; set; }
    }
}
