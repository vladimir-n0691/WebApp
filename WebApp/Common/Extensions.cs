using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Dtos;

namespace WebApp.Common
{
    public static class Extensions
    {
        public static DbSet<TDto> GetEntities<TDto, TContext>(this TContext dbContext) where TDto : BaseDto where TContext : DbContext =>
            dbContext.GetPropertyValue<TContext, DbSet<TDto>>(((TableAttribute)Attribute.GetCustomAttribute(typeof(TDto), typeof(TableAttribute))).Name);
    }
}
