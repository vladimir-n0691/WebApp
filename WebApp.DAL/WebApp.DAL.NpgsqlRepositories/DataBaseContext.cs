using Microsoft.EntityFrameworkCore;
using WebApp.DAL.Entities;

namespace WebApp.DAL.NpgsqlRepositories
{
    /// <summary>
    /// Context for working with the database
    /// </summary>
    public class DataBaseContext : DbContext
    {
        //private readonly string connectionString;

        //public DataBaseContext(string connectionString) => this.connectionString = connectionString;

        public DataBaseContext(DbContextOptions options)
        : base(options)
        {
            //Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

        /// <summary>
        /// List of users
        /// </summary>
        public DbSet<User> users { get; private set; }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!string.IsNullOrEmpty(connectionString) )
            {
                
            }
        }*/
    }
}
