using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel;
using System.Text;
using WebApp.Dtos;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Services;

namespace WebApp
{
    public class Program
    {
        private static IMapper ConfigureMapper() => new Mapper(new MapperConfiguration(cfg =>
        {
            cfg.AllowNullCollections = true;

            cfg.CreateMap<UserDto, User>().ReverseMap();
            cfg.CreateMap<PlanDto, Plan>().ReverseMap();
            cfg.CreateMap<BeaconDto, Beacon>().ReverseMap();

        }));

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var mapper = ConfigureMapper();
            builder.Services.AddSingleton(mapper);

            builder.Services.AddDbContext<DataBaseContext>();

            builder.Services.AddScoped<IUsersRepository, UsersRepository>();
            builder.Services.AddScoped<IUsersService, UsersService>();

            builder.Services.AddScoped<IPlansRepository, PlansRepository>();
            builder.Services.AddScoped<IPlansService, PlansService>();

            builder.Services.AddScoped<IBeaconsRepository, BeaconsRepository>();
            builder.Services.AddScoped<IBeaconsService, BeaconsService>();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                    
                    ValidateIssuer = true,
                    //ValidateAudience = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
            });

            builder.Services.AddControllers();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.MapControllerRoute(
                name: "default",
                pattern: "api/{controller}/{action=Index}/{id?}");
            app.MapFallbackToFile("index.html");

            app.UseAuthentication(); // This need to be added	
            app.UseAuthorization();

            app.Run();
        }
    }
}