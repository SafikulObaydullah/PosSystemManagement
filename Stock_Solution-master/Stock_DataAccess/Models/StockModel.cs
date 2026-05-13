using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Models
{
    public class StockModel:IdentityDbContext<ApplicationUser>
    {  
      public StockModel(DbContextOptions<StockModel> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Actor_Movie>().HasKey(am => new
            {
                am.ActorId,
                am.MovieId
            });

            modelBuilder.Entity<Actor_Movie>().HasOne(m => m.Movie).WithMany(am => am.Actors_Movies).HasForeignKey(m => m.MovieId);
            modelBuilder.Entity<Actor_Movie>().HasOne(m => m.Actor).WithMany(am => am.Actors_Movies).HasForeignKey(m => m.ActorId);
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<DocumentUpload> DocumentUploads { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor_Movie> Actors_Movies { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Producer> Producers { get; set; }   
        //Orders related tables
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }


        public DbSet<BusinessPartner> BusinessPartners { get; set; }
        public DbSet<Category> Categories { get; set; }
        //public DbSet<AssignCategory> AssignCategories { get; set; }
        public DbSet<SalesMaster> SalesMasters { get; set; }
        public DbSet<SalesDetails> SalesDetails { get; set; }
        public DbSet<PurchaseDetails> PurchaseDetails { get; set; }
        public DbSet<Purchasemaster> Purchasemasters { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Division> Division { get; set; } 
        public DbSet<District> District { get; set; }
        public DbSet<SubDistrict> SubDistrict { get; set; }
        public DbSet<VoucherTypes> VoucherTypes { get; set; }
        public DbSet<PayMethod> PayMethods { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<LedgerGroup> LedgerGroups { get; set; } 
        //public DbSet<ChartsofAccount> ChartsofAccounts { get; set; }
        public DbSet<TransMaster> TransMasters { get; set; }
        public DbSet<Institute> Institutes { get; set; }
        public DbSet<InsBranch> InsBranches { get; set; }
        public DbSet<FixedCostParticulars> FixedCostsParticulars { get; set; }
        public DbSet<FinancialYear> FinancialYears { get; set; }
        public DbSet<CompanysFixedCost> CompanysFixedCosts { get; set; }
        public DbSet<DateTimeFormat> DateTimeFormats { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<LoginUser> LoginUsers { get; set; }
        public DbSet<GlobalFileUrl> GlobalFileUrls { get; set; }
        public DbSet<Laptop> Laptops { get; set; }  
        public DbSet<calendar_event_master> calendar_event_master { get; set; }  
        public DbSet<Expense> Expenses { get; set; } 
        public DbSet<CashInOut> CashInOut { get; set; }  
        public DbSet<ProductTable> ProductTables { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Brand> Brands { get; set; }    
        public DbSet<Sales> Sales { get; set; } 
        public DbSet<POSInfo> POSInfo { get; set; } 
        public DbSet<SalesReturn> SalesReturn { get; set; } 
        public DbSet<Supplier> Suppliers { get; set; }  
        public DbSet<UserDetail> UserDetails { get; set; }  
        public DbSet<Store> Stores { get; set; }
        public DbSet<FooterContent> FooterContents { get; set; }
        #region security 
        public DbSet<LoginModel> LoginModels { get; set; }
        #endregion
    }
    public class StockModelFactory : IDesignTimeDbContextFactory<StockModel>
    {
        public StockModel CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<StockModel>();
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-HJ8UUA1\\SQLEXPRESS01;database=PosSystemDB; User id=sa;password=123;MultipleActiveResultSets=True;");

            return new StockModel(optionsBuilder.Options);
        }// Trusted_Connection=True
    }
}
