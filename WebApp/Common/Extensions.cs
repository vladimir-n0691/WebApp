using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Entities;

namespace WebApp.Common
{
    public static class Extensions
    {
        public static DbSet<TEntity> GetEntities<TEntity, TContext>(this TContext dbContext) where TEntity : BaseEntity where TContext : DbContext =>
            dbContext.GetPropertyValue<TContext, DbSet<TEntity>>(((TableAttribute)Attribute.GetCustomAttribute(typeof(TEntity), typeof(TableAttribute))).Name);
    }
}
