using Microsoft.EntityFrameworkCore;
using PulseAPI.Models;

namespace PulseAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }

        public DbSet<PostLikeInfo> PostLikeInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PostLikeInfo>()
                .HasIndex(pl => new { pl.UserId, pl.PostId })
                .IsUnique();

            modelBuilder.Entity<PostLikeInfo>()
                .HasOne(pl => pl.User)
                .WithMany()
                .HasForeignKey(pl => pl.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<PostLikeInfo>()
                .HasOne(pl => pl.Post)
                .WithMany()
                .HasForeignKey(pl => pl.PostId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
