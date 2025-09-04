using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel;
using System.Net;
using System.Text;
using WebApp.BLL.Contracts;
using WebApp.BLL.Models;
using WebApp.BLL.Services;
using WebApp.DAL.Contracts;
using WebApp.DAL.Entities;
using WebApp.DAL.NpgsqlRepositories;

namespace WebApp
{
    public class Program
    {
        private static IMapper ConfigureMapper(ILoggerFactory loggerFactory) => new Mapper(new MapperConfiguration(cfg =>
        {
            cfg.AllowNullCollections = true;

            cfg.CreateMap<User, UserDto>().ReverseMap();

        }, loggerFactory));

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.WebHost.UseUrls("http://*:" + Environment.GetEnvironmentVariable("PORT"));

            var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
            var mapper = ConfigureMapper(loggerFactory);
            builder.Services.AddSingleton(mapper);

            string connectionString = builder.Configuration.GetValue<string>("POSTGRES_CONNECTION_STRING");
            builder.Services.AddDbContext<DataBaseContext>(options => options.UseNpgsql(connectionString));

            builder.Services.AddScoped<IUsersRepository, UsersRepository>();
            builder.Services.AddScoped<IUsersService, UsersService>();

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
            // Add CORS services with a policy that allows all origins, methods, and headers
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()    // Allows all origins
                               .AllowAnyMethod()    // Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
                               .AllowAnyHeader();   // Allows all headers
                    });
            });


            var app = builder.Build();

            // Use the CORS policy globally
            app.UseCors("AllowAll");

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.MapControllerRoute(
                name: "default",
                pattern: "api/{controller}/{action=Index}/{id?}");
            app.MapFallbackToFile("index.html");

            app.UseAuthentication(); // This need to be added	
            app.UseAuthorization();

            app.UseCors();

            app.Run();
        }
    }
}