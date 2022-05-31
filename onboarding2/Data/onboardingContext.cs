using Microsoft.EntityFrameworkCore;

namespace onboarding2.Data
{
    public class onboardingContext : DbContext
    {
        public DbSet<Sales> Sales { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(someconnectionstring);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
