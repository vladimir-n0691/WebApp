using WebApp.Common;
using WebApp.Repositories;
using AutoMapper;
using WebApp.Entities;

namespace WebApp.Services
{
    /// <summary>
    /// Base service contract
    /// </summary>
    /// <typeparam name="TData">Input/output data type</typeparam>
    /// <typeparam name="TEntity">Stored data type</typeparam>
    /// <typeparam name="TRepo">Repository data type</typeparam>
    public class BaseService<TRepo, TEntity, TData> : IBaseService<TData> where TData : IIdentifiable
                                                                       where TEntity : BaseEntity
                                                                       where TRepo : IBaseRepository<TEntity>
    {
        /// <summary>
        /// Repository
        /// </summary>
        protected TRepo Repository { get; }

        /// <summary>
        /// Mapper
        /// </summary>
        protected IMapper Mapper { get; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repository">Repository</param>
        /// <param name="mapper">Mapper</param>
        /// </summary>
        public BaseService(TRepo repository, IMapper mapper)
        {
            Repository = repository;
            Mapper = mapper;
        }

        /// <summary>
        /// <see cref="IBaseService.GetAllAsync"/>
        /// </summary>
        public virtual async Task<IEnumerable<TData>> GetAllAsync()
        {
            try
            {
                return Mapper.Map<IEnumerable<TData>>(await Repository.GetAllAsync());
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.GetByIdAsync(int)"/>
        /// </summary> 
        public virtual async Task<TData> GetByIdAsync(int id)
        {
            try
            {
                return Mapper.Map<TData>(await Repository.GetByIdAsync(id));
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.AddAsync(TData)"/>
        /// </summary>
        public virtual async Task<TData> AddAsync(TData item)
        {
            try
            {
                return Mapper.Map<TData>(await Repository.AddAsync(Mapper.Map<TEntity>(item)));
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.AddRangeAsync(IEnumerable{TData})"/>
        /// </summary>
        public virtual async Task<IEnumerable<TData>> AddRangeAsync(IEnumerable<TData> items)
        {
            try
            {
                return Mapper.Map<IEnumerable<TData>>(await Repository.AddRangeAsync(Mapper.Map<IEnumerable<TEntity>>(items)));
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.UpdateAsync(TData)"/>
        /// </summary>
        public virtual async Task<TData> UpdateAsync(TData item)
        {
            try
            {
                return Mapper.Map<TData>(await Repository.UpdateAsync(Mapper.Map<TEntity>(item)));
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.UpdateRangeAsync(IEnumerable{TData})"/>
        /// </summary>
        public virtual async Task<IEnumerable<TData>> UpdateRangeAsync(IEnumerable<TData> items)
        {
            try
            {
                return Mapper.Map<IEnumerable<TData>>(await Repository.UpdateRangeAsync(Mapper.Map<IEnumerable<TEntity>>(items)));
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.RemoveByIdAsync(int)"/>
        /// </summary>
        public virtual async Task<TData> RemoveByIdAsync(int id)
        {
            try
            {
                return Mapper.Map<TData>(await Repository.RemoveByIdAsync(id));
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.RemoveAsync(TData)"/>
        /// </summary>
        public virtual async Task<TData> RemoveAsync(TData item)
        {
            try
            {
                return Mapper.Map<TData>(await Repository.RemoveAsync(Mapper.Map<TEntity>(item)));
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// <see cref="IBaseService.RemoveRangeAsync(IEnumerable{TData})"/>
        /// </summary>
        public virtual async Task<IEnumerable<TData>> RemoveRangeAsync(IEnumerable<TData> items)
        {
            try
            {
                return Mapper.Map<IEnumerable<TData>>(await Repository.RemoveRangeAsync(Mapper.Map<IEnumerable<TEntity>>(items)));
            }
            catch
            {
                throw;
            }
        }
    }
}
