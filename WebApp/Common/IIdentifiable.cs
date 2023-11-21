namespace WebApp.Common
{
    /// <summary>
    /// Identifiable object interface
    /// </summary>
    public interface IIdentifiable
    {
        /// <summary>
        /// Object identifier
        /// </summary>
        Guid Id { get; set; }
    }
}
