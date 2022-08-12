using Microsoft.EntityFrameworkCore;

using UpSkill_API.Models;

namespace UpSkill_API.Contexts
{
    public class StudentsContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public StudentsContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connectionString = Configuration.GetConnectionString("Upskill");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }

        public DbSet<StudentsModel> Students { get; set; }
    }
}
