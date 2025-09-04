using WebApp.Core.Contracts;
using WebApp.DAL.Contracts;
using WebApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApp.DAL.NpgsqlRepositories
{
    /// <summary>
    /// Base repository
    /// </summary>
    /// <typeparam name="TContext">Database context type</typeparam>
    /// <typeparam name="TEntity">Stored data type</typeparam>
    public abstract class BaseRepository<TContext, TEntity> : IBaseRepository<TEntity> where TContext : DbContext
                                                                                 where TEntity : BaseEntity
    {
        /// <summary>
        /// Database context
        /// </summary>
        protected TContext DbContext { get; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="dbContext">Database context</param>
        /// </summary>
        public BaseRepository(TContext dbContext)
        {
            DbContext = dbContext;
        }

        /// <summary>
        /// <see cref="IBaseRepository.GetAllAsync"/>
        /// </summary>
        public virtual async Task<IEnumerable<TEntity>> GetAllAsync() =>
            await DbContext.GetEntities<TEntity, TContext>().ToListAsync();


        /// <summary>
        /// <see cref="IBaseRepository.GetByIdAsync(int)"/>
        /// </summary>
        public virtual async Task<TEntity> GetByIdAsync(int id) => 
            await DbContext.GetEntities<TEntity, TContext>().FirstOrDefaultAsync(i => i.Id == id);


        /// <summary>
        /// <see cref="IBaseRepository.AddAsync(TEntity)"/>
        /// </summary>
        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            var result = DbContext.GetEntities<TEntity, TContext>().Add(entity).Entity;
            await DbContext.SaveChangesAsync();
            return result;
        }


        /// <summary>
        /// <see cref="IBaseRepository.UpdateAsync(TEntity)"/>
        /// </summary>
        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            var entityId = entity.GetPropertyValue<TEntity, int>(nameof(IIdentifiable.Id));

            var result = await DbContext.GetEntities<TEntity, TContext>().FirstOrDefaultAsync(i => i.Id == entityId);
            result.UpdateAllProperties(entity);
            await DbContext.SaveChangesAsync();


            return result;
        }

        /// <summary>
        /// <see cref="IBaseRepository.RemoveByIdAsync(int)"/>
        /// </summary>
        public virtual async Task<TEntity> RemoveByIdAsync(int id)
        {
            var result = await DbContext.GetEntities<TEntity, TContext>().FirstOrDefaultAsync(p => p.Id == id);
            DbContext.GetEntities<TEntity, TContext>().Remove(result);
            await DbContext.SaveChangesAsync();

            return result;
        }

        /// <summary>
        /// <see cref="IBaseRepository.RemoveAsync(TEntity)"/>
        /// </summary>
        public virtual async Task<TEntity> RemoveAsync(TEntity entity) => entity != null ? await RemoveByIdAsync(entity.Id) : null;
    }
}
