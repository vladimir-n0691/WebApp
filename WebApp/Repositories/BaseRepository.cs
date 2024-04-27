using Microsoft.EntityFrameworkCore;
using WebApp.Common;
using WebApp.Dtos;

namespace WebApp.Repositories
{
    /// <summary>
    /// Base repository
    /// </summary>
    /// <typeparam name="TContext">Database context type</typeparam>
    /// <typeparam name="TDto">Stored data type</typeparam>
    public abstract class BaseRepository<TContext, TDto> : IBaseRepository<TDto> where TContext : DbContext
                                                                                 where TDto : BaseDto
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
        public virtual async Task<IEnumerable<TDto>> GetAllAsync()
        {
            try
            {
                return await DbContext.GetEntities<TDto, TContext>().ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseRepository.GetByIdAsync(int)"/>
        /// </summary>
        public virtual async Task<TDto> GetByIdAsync(int id)
        {
            try
            {
                return await DbContext.GetEntities<TDto, TContext>().FirstOrDefaultAsync(i => i.Id == id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseRepository.AddAsync(TDto)"/>
        /// </summary>
        public virtual async Task<TDto> AddAsync(TDto entity)
        {
            TDto result;
            try
            {
                result = DbContext.GetEntities<TDto, TContext>().Add(entity).Entity;
                await DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        /// <summary>
        /// <see cref="IBaseRepository.AddRangeAsync(IEnumerable{TDto})"/>
        /// </summary>
        public virtual async Task<IEnumerable<TDto>> AddRangeAsync(IEnumerable<TDto> entities)
        {
            IEnumerable<TDto> result = new List<TDto>();

            try
            {
                DbContext.GetEntities<TDto, TContext>().AddRange(entities);
                await DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        /// <summary>
        /// <see cref="IBaseRepository.UpdateAsync(TDto)"/>
        /// </summary>
        public virtual async Task<TDto> UpdateAsync(TDto entity)
        {
            TDto result = null;
            try
            {
                var entityId = entity.GetPropertyValue<TDto, int>(nameof(IIdentifiable.Id));

                result = await DbContext.GetEntities<TDto, TContext>().FirstOrDefaultAsync(i => i.Id == entityId);
                result.UpdateAllProperties(entity);
                await DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            return result;
        }

        /// <summary>
        /// <see cref="IBaseRepository.UpdateRangeAsync(IEnumerable{TDto})"/>
        /// </summary>
        public virtual async Task<IEnumerable<TDto>> UpdateRangeAsync(IEnumerable<TDto> entities)
        {
            var result = new List<TDto>();

            TDto currentItem = null;
            int entityId;

            foreach (var entity in entities)
            {
                try
                {
                    entityId = entity.GetPropertyValue<TDto, int>(nameof(IIdentifiable.Id));
                    currentItem = await DbContext.GetEntities<TDto, TContext>().FirstOrDefaultAsync(i => i.Id == entityId);
                    currentItem.UpdateAllProperties(entity);
                    result.Add(currentItem);
                }
                catch (Exception ex)
                {
                    throw;
                }
            }

            try
            {
                await DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }


            return result;
        }

        /// <summary>
        /// <see cref="IBaseRepository.RemoveByIdAsync(int)"/>
        /// </summary>
        public virtual async Task<TDto> RemoveByIdAsync(int id)
        {
            TDto result;
            try
            {
                result = await DbContext.GetEntities<TDto, TContext>().FirstOrDefaultAsync(p => p.Id == id);
                DbContext.GetEntities<TDto, TContext>().Remove(result);
                await DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        /// <summary>
        /// <see cref="IBaseRepository.RemoveAsync(TDto)"/>
        /// </summary>
        public virtual async Task<TDto> RemoveAsync(TDto entity) => entity != null ? await RemoveByIdAsync(entity.Id) : null;

        /// <summary>
        /// <see cref="IBaseRepository.RemoveRangeAsync(IEnumerable{TDto})"/>
        /// </summary>
        public virtual async Task<IEnumerable<TDto>> RemoveRangeAsync(IEnumerable<TDto> entities)
        {
            try
            {
                IEnumerable<TDto> removeItems;
                var ids = entities.Select(x => x.Id).ToList();

                removeItems = await DbContext.GetEntities<TDto, TContext>().Where(p => ids.Contains(p.Id)).ToListAsync();
                DbContext.GetEntities<TDto, TContext>().RemoveRange(removeItems);
                await DbContext.SaveChangesAsync();

                return removeItems;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
