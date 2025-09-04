using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Core.Contracts;

namespace WebApp.DAL.Entities
{
    /// <summary>
    /// Object for storage in the database
    /// </summary>
    public abstract class BaseEntity : IIdentifiable
    {
        /// <summary>
        /// Object identifier
        /// </summary>
        [Key, Column("id", TypeName = "bigserial")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}
