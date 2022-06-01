using Microsoft.EntityFrameworkCore;
using onboarding2.Entities;

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

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    var someconnectionstring = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Onboarding;Integrated Security=true";
        //    optionsBuilder.UseSqlServer(someconnectionstring);
        //    base.OnConfiguring(optionsBuilder);
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Store>().ToTable("Store");
            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Sales>().ToTable("Sales");
            modelBuilder.Entity<Sales>()
                .HasOne(s => s.Customer)
                .WithMany(c => c.ProductSold)
                .HasForeignKey(s => s.CustomerId);
            modelBuilder.Entity<Sales>()
                .HasOne(s => s.Product)
                .WithMany(p => p.ProductSold)
                .HasForeignKey(s => s.StoreId);
            modelBuilder.Entity<Sales>()
                .HasOne(s => s.Store)
                .WithMany(s => s.ProductSold)
                .HasForeignKey(s => s.StoreId);
            modelBuilder.Entity<Sales>()
                .Ignore(s => s.DateSold);
        }
    }
}
