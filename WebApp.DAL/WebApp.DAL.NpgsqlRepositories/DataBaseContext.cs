using Microsoft.EntityFrameworkCore;
using WebApp.DAL.Entities;

namespace WebApp.DAL.NpgsqlRepositories
{
    /// <summary>
    /// Context for working with the database
    /// </summary>
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions options)
        : base(options)
        {
            Database.EnsureCreated();
        }

        /// <summary>
        /// List of users
        /// </summary>
        public DbSet<User> users { get; private set; }
    }
}
