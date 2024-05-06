namespace WebApp.Models
{
    public class Plan : BaseModel
    {
        public int UserId { get; set; }

        public required string Name { get; set; }

        public string? Description { get; set; }

        public required string Url { get; set; }

        public string? ApiToken { get; set; }

        public double ScaleX { get; set; }

        public double ScaleY { get; set; }
    }
}
