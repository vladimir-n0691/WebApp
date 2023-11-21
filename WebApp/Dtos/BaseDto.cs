using System.ComponentModel.DataAnnotations;
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
        [Key]
        public Guid Id { get; set; }
    }
}
