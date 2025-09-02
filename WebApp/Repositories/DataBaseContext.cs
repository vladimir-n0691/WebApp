using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApp.Entities;

namespace WebApp.Repositories
{
    /// <summary>
    /// Context for working with the database
    /// </summary>
    public class DataBaseContext : DbContext
    {
        private readonly IConfiguration config;

        public DataBaseContext(IConfiguration config) => this.config = config;

        /// <summary>
        /// List of users
        /// </summary>
        public DbSet<UserEntity> users { get; private set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = config.GetValue<string>("POSTGRES_CONNECTION_STRING");
            if(!string.IsNullOrEmpty(connectionString) )
            {
                optionsBuilder.UseNpgsql(connectionString);
            }
        }
    }
}
