using Microsoft.EntityFrameworkCore;
using onboarding2.Models;

namespace onboarding2.Data
{
    public class onboardingContext : DbContext
    {
        public onboardingContext(DbContextOptions<onboardingContext> options) : base(options)
        {
        }

        public DbSet<Sales> Sales { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var someconnectionstring = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Onboarding;Integrated Security=true";
            optionsBuilder.UseSqlServer(someconnectionstring);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sales>().ToTable("Sales");
            modelBuilder.Entity<Store>().ToTable("Store");
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Product>().ToTable("Product");
        }
    }
}
