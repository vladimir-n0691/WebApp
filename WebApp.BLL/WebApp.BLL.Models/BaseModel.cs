using WebApp.Core.Contracts;

namespace WebApp.BLL.Models
{
    /// <summary>
    /// Object for services
    /// </summary>
    public abstract class BaseModel : IIdentifiable
    {
        /// <summary>
        /// Object identifier
        /// </summary>
        public int Id { get; set; }
    }
}
