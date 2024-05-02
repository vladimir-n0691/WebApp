using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Plan : BaseModel
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }
    }
}
