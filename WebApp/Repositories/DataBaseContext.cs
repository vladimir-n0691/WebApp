using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApp.Dtos;

namespace WebApp.Repositories
{
    /// <summary>
    /// Context for working with the database
    /// </summary>
    public class DataBaseContext : DbContext
    {
        /// <summary>
        /// List of users
        /// </summary>
        public DbSet<UserDto> Users { get; private set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=LocalDataBase.db");
        }
    }
}
