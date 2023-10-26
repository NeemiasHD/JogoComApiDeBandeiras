using Microsoft.EntityFrameworkCore;

namespace QuePaisEesseJogo.Models
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options):base(options) {
        
        }

        public DbSet<Player> Player { get; set; }
    }
}
