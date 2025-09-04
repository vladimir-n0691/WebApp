namespace WebApp.Core.Contracts
{
    /// <summary>
    /// Identifiable object interface
    /// </summary>
    public interface IIdentifiable
    {
        /// <summary>
        /// Object identifier
        /// </summary>
        int Id { get; set; }
    }
}
