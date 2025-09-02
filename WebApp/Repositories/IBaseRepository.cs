using WebApp.Common;

namespace WebApp.Repositories
{
    /// <summary>
    /// Base repository contract
    /// </summary>
    /// <typeparam name="TEntity">Stored data type</typeparam>
    public interface IBaseRepository<TEntity> where TEntity : IIdentifiable
    {
        /// <summary>
        /// Returns all objects
        /// </summary>
        /// <returns>List of objects</returns>
        Task<IEnumerable<TEntity>> GetAllAsync();

        /// <summary>
        /// Returns an object by its id
        /// </summary>
        /// <param name="id">Object identifier</param>
        /// <returns>Object</returns>
        Task<TEntity> GetByIdAsync(int id);

        /// <summary>
        /// Adds an object
        /// </summary>
        /// <param name="item">Object</param>
        /// <returns>Object</returns>
        Task<TEntity> AddAsync(TEntity item);

        /// <summary>
        /// Updates the object
        /// </summary>
        /// <param name="item">Object</param>
        /// <returns>Object</returns>
        Task<TEntity> UpdateAsync(TEntity item);

        /// <summary>
        /// Removes an object
        /// </summary>
        /// <param name="id">Object identifier</param>
        /// <returns>Object</returns>
        Task<TEntity> RemoveByIdAsync(int id);

        /// <summary>
        /// Removes an object
        /// </summary>
        /// <param name="item">Object</param>
        /// <returns>Object</returns>
        Task<TEntity> RemoveAsync(TEntity item);
    }
}
