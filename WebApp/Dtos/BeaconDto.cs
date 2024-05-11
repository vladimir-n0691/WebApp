using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Dtos
{
    [Table("beacons")]
    public class BeaconDto : BaseDto
    {
        [Column("plan_id")]
        public int PlanId { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("uuid")]
        public string Uuid { get; set; }

        [Column("major")]
        public int Major { get; set; }

        [Column("minor")]
        public int Minor { get; set; }

        [Column("x")]
        public double? X { get; set; }

        [Column("y")]
        public double? Y { get; set; }

        [Column("height")]
        public double? Height { get; set; }

        [Column("level")]
        public string? Level { get; set; }

        [Column("latitude")]
        public double? Latitude { get; set; }

        [Column("longitude")]
        public double? Longitude { get; set; }
    }
}
