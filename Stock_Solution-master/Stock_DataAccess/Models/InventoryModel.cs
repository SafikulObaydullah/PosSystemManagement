using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Stock_DataAccess.Repositories;
using System.Numerics;

namespace Stock_DataAccess.Models
{
    #region inventory

    public class Movie : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        //public string CinemaName { get; set; } 
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public MovieCategory MovieCategory { get; set; } 
        public List<Actor_Movie> Actors_Movies { get; set; } 
        public int CinemaId { get; set; }
        [ForeignKey("CinemaId")]
        public Cinema Cinema { get; set; } 
        public int ProducerId { get; set; }
        [ForeignKey("ProducerId")]
        public Producer Producer { get; set; }
    }
    public class Cinema : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Cinema Logo")]
        [Required(ErrorMessage = "Cinema logo is required")]
        public string Logo { get; set; }

        [Display(Name = "Cinema Name")]
        [Required(ErrorMessage = "Cinema name is required")]
        public string Name { get; set; }

        [Display(Name = "Description")]
        [Required(ErrorMessage = "Cinema description is required")]
        public string Description { get; set; }

        //Relationships
        public List<Movie> Movies { get; set; }
    }
    public class Producer : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Profile Picture")]
        [Required(ErrorMessage = "Profile Picture is required")]
        public string ProfilePictureURL { get; set; }

        [Display(Name = "Full Name")]
        [Required(ErrorMessage = "Full Name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Full Name must be between 3 and 50 chars")]
        public string FullName { get; set; }

        [Display(Name = "Biography")]
        [Required(ErrorMessage = "Biography is required")]
        public string Bio { get; set; }

        //Relationships
        public List<Movie> Movies { get; set; }
    }
    public class Actor_Movie
    {
        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        public int ActorId { get; set; }
        public Actor Actor { get; set; }
    }
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public string Email { get; set; }

        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        public List<OrderItem> OrderItems { get; set; }
    }
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        public int Amount { get; set; }
        public double Price { get; set; }

        public int MovieId { get; set; }
        [ForeignKey("MovieId")]
        public Movie Movie { get; set; }

        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
    }
    public class ShoppingCartItem
    {
        [Key]
        public int Id { get; set; }
        public Movie Movie { get; set; }
        public int Amount { get; set; }
        public string ShoppingCartId { get; set; }
    }
    public class DocumentUpload : BaseDTO
    {
        public int Id { get; set;}
        public string ImageUrl { get; set; }
        public string Title { get; set; }
    }
    public class Actor : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Profile Picture")]
        [Required(ErrorMessage = "Profile Picture is required")]
        public string ProfilePictureURL { get; set; }

        [Display(Name = "Full Name")]
        [Required(ErrorMessage = "Full Name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Full Name must be between 3 and 50 chars")]
        public string FullName { get; set; }

        [Display(Name = "Biography")]
        [Required(ErrorMessage = "Biography is required")]
        public string Bio { get; set; }

        //Relationships
        public List<Actor_Movie> Actors_Movies { get; set; }
    }
    public class PayMethod : BaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }
        [ForeignKey("Institute")]
        public int InsId { get; set; }
        [ForeignKey("InsBranch")]
        public int InBranchsId { get; set; }

        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }

    }
    //public class Customer : BaseDTO
    //{
    //    public int Id { get; set; } 
    //    public string FirstName { get; set; }
    //    public string LastName { get; set; }
    //    public string Phone { get; set; }
    //    public string Email { get; set; }
    //    public string Address { get; set; }
    //    public string City { get; set; }  
    //    public string State { get; set; } 
    //    public string ZipCode { get; set; } 
    //    public string Country { get; set; }
    //    public string CustomerType { get; set; }
    //    public decimal CreditLimit { get; set; }
    //    public decimal CurrentBalance { get; set; }
    //    public string Notes { get; set; }
    //    //public bool IsActive { get; set; }
    //}
    public class Customer : BaseDTO
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }     // ✅ add ?
        public string? LastName { get; set; }      // ✅ add ?
        public string? Phone { get; set; }         // ✅ add ?
        public string? Email { get; set; }         // ✅ add ?
        public string? Address { get; set; }       // ✅ add ?
        public string? City { get; set; }          // ✅ add ?
        public string? State { get; set; }         // ✅ add ?
        public string? ZipCode { get; set; }       // ✅ add ?
        public string? Country { get; set; }       // ✅ add ?
        public string? CustomerType { get; set; }  // ✅ add ?
        public decimal CreditLimit { get; set; }
        public decimal CurrentBalance { get; set; }
        public string? Notes { get; set; }         // ✅ add ?
                                                   // ⚠️ Remove IsActive here — it already exists in BaseDTO!
    }
    public partial class GlobalFileUrl
    {
        public Int64 ID { get; set; }
        public string? ReferrenceNo { get; set; }
        public string? FileServerId { get; set; }
        public string? ReferenceDescription { get; set; }
        public Int64? DocumentTypeId { get; set; }
        public string? DocumentName { get; set; }
        public decimal? NumFileSize { get; set; }
        public string? FileExtension { get; set; }
        public string? ServerLocation { get; set; }
        public Boolean? IsActive { get; set; } = true;
        public Int64 Creator { get; set; }
        public DateTime? CreationDate { get; set; }
        public Int64? Modifier { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
    public class AssignPayMode : BaseDTO
    {
        public int Id { get; set; }
        public int PaymodeId { get; set; }
        [ForeignKey("Institute")]
        public int InsId { get; set; }
        [ForeignKey("InsBranch")]
        public int InBranchsId { get; set; }

        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }

    }
    //public class ApplicationUser : IdentityUser
    //{
    //    public bool IsActive { get; set; } = true;
    //    public int InsId { get; set; } = 1;
    //    public int InsBranchId { get; set; } = 1;
    //    public string? DomainName { get; set; }
    //    public string? IP { get; set; }
    //}
    //public class ApplicationRole : IdentityRole
    //{
    //}
    public class District : BaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [ForeignKey("Division")]
        public int DivisionId { get; set; }
        public Division Division { get; set; }

    }
    public class SubDistrict : BaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [ForeignKey("District")]
        public int DistrictId { get; set; }
        public District? District { get; set; }
    }
    public class Division : BaseDTO
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [ForeignKey("Country")]
        public int CountryID { get; set; }
        public Country? Country { get; set; }
    }
    public class Country : BaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class PurchaseDetails : BaseDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int MasterId { get; set; }
        public int Bonus { get; set; }
        public decimal Discountrate { get; set; }
        public decimal Vatrate { get; set; }
        public decimal Discountamount { get; set; }
        public decimal Vatamount { get; set; }
        public decimal NetAmount { get; set; }
        public int UnitQty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        [ForeignKey("Unit")]
        public int UnitId { get; set; }
        public Unit? Unit { get; set; } 
        public Product? Product { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; } 
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
        public virtual Purchasemaster? Purchasemaster { get; private set; } 
    }
    public enum BusinessPartnerType
    {
        Customer = 1, Supplier, Both
    }
    public class Login
    {
        public Int64 ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class LoginUser
    {
        public Int64 ID { get; set; }
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Designation { get; set; }
        public string? Password { get; set; }
        public Int64 UserTypeAttributeID { get; set; } = 1;
        public string? UserTypeAttributeName { get; set; }
        public Int64 UserSectionID { get; set; } = 1;
        public string? UserSectionName { get; set; }
        public bool? IsActive { get; set; }
        public Int64 Creator { get; set; } = 1;
        public DateTime? CreationDate { get; set; }
        public Int64? Modifier { get; set; }
        public DateTime? ModificationDate { get; set; }

    }
    public class authenticuserdata
    {
        public Int64 id { get; set; }
        public string name { get; set; }
        public Int64 usertype { get; set; }
        public string token { get; set; }
        public int statuscode { get; set; }
        public string statusmessage { get; set; }
    }

    public class BusinessPartner : BaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; } = "Dhaka";
        public string ContactNo { get; set; }
        [DataType(DataType.Date)]
        public DateTime ContactDate { get; set; } = DateTime.Now;
        public string ContactPerson { get; set; } = "p";
        public int EntryBy { get; set; } = 1;
        public DateTime EntryDate { get; set; } = DateTime.Now;
        public string Mobile { get; set; } = "";
        //public bool IsActive { get; set; } = true;
        [ForeignKey("SubDistrict")]
        public int SubDistrictID { get; set; }
        public SubDistrict? SubDistrict { get; set; }
        public BusinessPartnerType BusinessPartnerType { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; }

        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    public class Unit : BaseDTO
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string Shortname { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; } 
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    public class Category : BaseDTO
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string Description { get; set; }
        public string Name { get; set; } 
    }
    public class AssignCategory : BaseDTO
    {
        public int Id { get; set; }
        public int CatID { get; set; }
     
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; }
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    public class Purchasemaster : BaseDTO
    {
        public Purchasemaster()
        {
            PurchaseDetails = new List<PurchaseDetails>();
        }
        public int ID { get; set; }
        [Display(Name = "Purchase Date")]
        [DataType(DataType.Date)]
        public DateTime PurchaseDate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        [Display(Name = "Total Quantity")]
        public decimal TotalQuantity { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalPrice { get; set; }

        [Display(Name = "Bonus Amount")]
        public int BonusAmount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal NetAmount { get; set; }
        public string VoucherNo { get; set; }
        public int TranNo { get; set; }
        public string InvoiceNo { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TDiscountrate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TVatrate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TDiscountamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TVatamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Paidamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Due { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal Convence { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Packing { get; set; }
        public string EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public string Note { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal LaborCost { get; set; }

        [Column(TypeName = "decimal(18,4)"), Display(Name = "Total Cost")]
        public decimal TotalCost { get; set; }
        [Column(TypeName = "decimal(18,4)"), Display(Name = "Total Cost")]
        [NotMapped]
        public decimal UnitCostonTotal { get; set; }
        [Column(TypeName = "decimal(18,4)"), Display(Name = "Total Cost")]
        public decimal UnitCost { get; set; }
        [ForeignKey("BusinessPartner")]
        [Display(Name = "Supplier")]
        public int SupplierID { get; set; }
        [ForeignKey("PayMode"), Display(Name = "Payment Mode")]
        public int PaymodeID { get; set; }
        [ForeignKey("VoucherType"), Display(Name = "Vouche rType ")]
        public int VoucherTypeID { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; }

        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
        public virtual VoucherTypes? VoucherType { get; set; }
        public virtual PayMethod? PayMode { get; set; }
        public virtual BusinessPartner? BusinessPartner { get; set; }
        public List<PurchaseDetails>? PurchaseDetails { get; set; } = new List<PurchaseDetails>();

    }
    public class SalesMaster : BaseDTO
    {
        public SalesMaster()
        {
            SalesDetails = new List<SalesDetails>();
        }
        public int ID { get; set; } 
        public DateTime SalesDate { get; set; }
        public int TotalQuantity { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalPrice { get; set; } 
        public string VoucherNo { get; set; }
        public string BillNo { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TDiscountrate { get; set; }
        public int TVatrate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TDiscountamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TVatamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Paidamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Due { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal Convence { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Packing { get; set; }
        public int EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public string Note { get; set; }
        //Cash,NonCash
        public string PaymentMode { get; set; }
        [ForeignKey("BusinessPartner")]
        public int CustomerID { get; set; }
        public virtual BusinessPartner? BusinessPartner { get; set; }
        public List<SalesDetails>? SalesDetails { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; }
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    //[Index(nameof(Code), IsUnique = true)]
    public class Product : BaseDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = "";
        public string Name { get; set; } = "";
        public string EntryBy { get; set; } = "";
        public DateTime EntryDate { get; set; } = DateTime.Now;
        // public int Reorderlevel { get; set; } = 5;
        // public string UnitName { get; set; } = "PC";
        // public decimal Boxqty { get; set; } = 1;
        // public int UnitId { get; set; } = 1;

        // [ForeignKey("Category")]
        // public int CatId { get; set; } = 1;

        // public decimal SalesPrice { get; set; } = 1;
        // public decimal PurchasePrice { get; set; } = 1;
        // public decimal Discountrate { get; set; } = 0;
        // public decimal Vatrate { get; set; } = 0;
        // public decimal Discountamount { get; set; } = 0;
        // public decimal Vatamount { get; set; } = 0;

        // public string Description { get; set; } = "";
        // public int StockQty { get; set; } = 0;

        // // ✅ Optional fields
        // public string? VehicleName { get; set; }
        // public string? ChasisNo { get; set; }
        // public string? EngineNo { get; set; }
        // public string? FuelType { get; set; }
        // public string? Color { get; set; }
        // public string? ModelNo { get; set; }
        // public string? Sku { get; set; }

        // public int Mileage { get; set; }
        // public int Status { get; set; }
        // public int MimumQuantity { get; set; }
        // public int BrandId { get; set; }

        // public virtual Category? Category { get; set; }

        // [ForeignKey("Institute")]
        // public int insId { get; set; }
        // [ForeignKey("InsBranch")]
        // public int inBranchsId { get; set; }

        // public virtual Institute? Institute { get; set; }
        // public virtual InsBranch? InsBranch { get; set; }

        // // ✅ Optional navigation collections
        // public virtual ICollection<SalesDetails>? SalesDetails { get; set; }
        // public virtual ICollection<PurchaseDetails>? PurchaseDetails { get; set; }
    }

   // public class Customer
   // {
   //   public int Id { get; set; }
   //   public string Name { get; set; }
   //   public string Address { get; set; }
   //   public string ContactNo { get; set; }
   //   public string ContactPerson { get; set; }
   //   public int EntryBy { get; set; }
   //   public DateTime EntryDate { get; set; }
   //   public string Mobile { get; set; }
   //   public int CityId { get; set; }
   //   public int CountryId { get; set; }    
   //   public string Email { get; set; }
   //}
   public class Invoice
   {
      public int Id { get; set; }
      public string InvoiceId { get; set; }
      public double BanlanceDue { get; set; }
      public string PaymentType { get; set; }
      public string VehicleName { get; set; }
      public string ChasisNo { get; set; }
      public string EngineNo { get; set; }
      public string FuelType { get; set; }
      public string Color { get; set; }
      public string ModelNo { get; set; }
      public int Mileage { get; set; }
      public double Amount { get; set; }
      public double Tax { get; set; }
      public double Discount { get; set; }
      public double TotalAmount { get; set; }
   }
   public class SalesDetails : BaseDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        [ForeignKey("SalesMaster")]
        public int MasterId { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Discountrate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Vatrate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Discountamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Vatamount { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal NetAmount { get; set; }
        public int UnitQty { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal UnitPrice { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalPrice { get; set; } 
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public SalesMaster SalesMaster { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; } 
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
        public virtual Product? Product { get; set; }

    }
    public class Stock : BaseDTO
    {
        public int Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public DateTime StockDate { get; set; }
        public int StockInQty { get; set; }
        public int StockOutQty { get; set; }

        public int StockQty
        {
            get
            {
                return StockInQty - StockOutQty;
            }
        }
        public Product Product { get; set; }

        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; } 
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    public class VoucherTypes : BaseDTO
    {
        public int Id { get; set; }
        public string? VoucharName { get; set; }
        public string? PrefixCode { get; set; } 
        public string? VoucharNameB { get; set; }  
    }
    #endregion Inventory
}
