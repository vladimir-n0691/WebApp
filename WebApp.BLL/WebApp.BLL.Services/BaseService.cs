using AutoMapper;
using WebApp.BLL.Contracts;
using WebApp.Core.Contracts;
using WebApp.DAL.Contracts;
using WebApp.DAL.Entities;

namespace WebApp.BLL.Services
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
        public virtual async Task<IEnumerable<TData>> GetAllAsync() =>
            Mapper.Map<IEnumerable<TData>>(await Repository.GetAllAsync());


        /// <summary>
        /// <see cref="IBaseService.GetByIdAsync(int)"/>
        /// </summary> 
        public virtual async Task<TData> GetByIdAsync(int id) =>
            Mapper.Map<TData>(await Repository.GetByIdAsync(id));


        /// <summary>
        /// <see cref="IBaseService.AddAsync(TData)"/>
        /// </summary>
        public virtual async Task<TData> AddAsync(TData item) =>
            Mapper.Map<TData>(await Repository.AddAsync(Mapper.Map<TEntity>(item)));


        /// <summary>
        /// <see cref="IBaseService.UpdateAsync(TData)"/>
        /// </summary>
        public virtual async Task<TData> UpdateAsync(TData item) =>
             Mapper.Map<TData>(await Repository.UpdateAsync(Mapper.Map<TEntity>(item)));


        /// <summary>
        /// <see cref="IBaseService.RemoveByIdAsync(int)"/>
        /// </summary>
        public virtual async Task<TData> RemoveByIdAsync(int id) =>
            Mapper.Map<TData>(await Repository.RemoveByIdAsync(id));


        /// <summary>
        /// <see cref="IBaseService.RemoveAsync(TData)"/>
        /// </summary>
        public virtual async Task<TData> RemoveAsync(TData item) =>
            Mapper.Map<TData>(await Repository.RemoveAsync(Mapper.Map<TEntity>(item)));
    }
}
