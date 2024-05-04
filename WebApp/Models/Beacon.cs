using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Dtos;

namespace WebApp.Models
{
    public class Beacon : BaseModel
    {
        public int PlanId { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string Uuid { get; set; }

        public int Major { get; set; }

        public int Minor { get; set; }

        public double? X { get; set; }

        public double? Y { get; set; }

        public string? Z { get; set; }

        public double? Lattitude { get; set; }

        public double? Longitude { get; set; }
    }
}
