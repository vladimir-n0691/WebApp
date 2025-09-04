using WebApp.Core.Contracts;

namespace WebApp.BLL.Contracts
{
    /// <summary>
    /// Base service contract
    /// </summary>
    /// <typeparam name="TData">Input/output data type</typeparam>
    public interface IBaseService<TData> where TData : IIdentifiable
    {
        /// <summary>
        /// Returns all objects
        /// </summary>
        /// <returns>List of objects</returns>
        Task<IEnumerable<TData>> GetAllAsync();

        /// <summary>
        /// Returns an object by its id
        /// </summary>
        /// <param name="id">Object identifier</param>
        /// <returns>Object</returns>
        Task<TData> GetByIdAsync(int id);

        /// <summary>
        /// Adds an object
        /// </summary>
        /// <param name="item">Object</param>
        /// <returns>Object</returns>
        Task<TData> AddAsync(TData item);

        /// <summary>
        /// Updates the object
        /// </summary>
        /// <param name="item">Object</param>
        /// <returns>Object</returns>
        Task<TData> UpdateAsync(TData item);

        /// <summary>
        /// Removes an object
        /// </summary>
        /// <param name="id">Object identifier</param>
        /// <returns>Object</returns>
        Task<TData> RemoveByIdAsync(int id);

        /// <summary>
        /// Removes an object
        /// </summary>
        /// <param name="item">Object</param>
        /// <returns>Object</returns>
        Task<TData> RemoveAsync(TData item);
    }
}
