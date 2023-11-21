using System.ComponentModel.DataAnnotations;
using WebApp.Common;

namespace WebApp.Models
{
    /// <summary>
    /// Object for services
    /// </summary>
    public abstract class BaseModel : IIdentifiable
    {
        /// <summary>
        /// Object identifier
        /// </summary>
        public Guid Id { get; set; }
    }
}
