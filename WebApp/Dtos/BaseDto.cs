using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Common;

namespace WebApp.Dtos
{
    /// <summary>
    /// Object for storage in the database
    /// </summary>
    public abstract class BaseDto : IIdentifiable
    {
        /// <summary>
        /// Object identifier
        /// </summary>
        [Key, Column("id", TypeName = "bigserial")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}
