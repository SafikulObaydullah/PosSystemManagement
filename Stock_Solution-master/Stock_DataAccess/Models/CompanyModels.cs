using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Security;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using Microsoft.Win32;

namespace Stock_DataAccess.Models
{
    #region CompanyBasic

    public class Student
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string SchoolName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public bool Status { get; set; }

        public static List<Student> getStudent()
        {
            List<Student> student = new List<Student>()
            {
                new Student() { ID =1, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =2, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = false },
                new Student() { ID =3, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =4, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = false },
                new Student() { ID =5, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =6, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = false },
                new Student() { ID =7, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =8, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = false },
                new Student() { ID =9, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =10, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = false },
                new Student() { ID =11, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =12, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =13, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = false },
                new Student() { ID =14, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = true },
                new Student() { ID =15, Name="Abc", SchoolName="Engg",  Address="Pune", City="Pune" , State="Maharashtra", Status = false }
            };
            return student;
        }
    } 
    public class calendar_event_master
    {
      [Key]
      public int event_id { get; set; }
      public string event_name {get;set;}
      public DateTime event_start_date{get;set;}
      public DateTime event_end_date  {get;set;}
    }
    public class CashInOut
    {
        [Key]
        public int Id { get; set; }
        public Guid TransactionId { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public double Amount { get; set; }
        public double Balance { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set;}
        public Guid CreatedByUid { get; set;}
        public Guid UpdatedByUid { get;set; }
    }
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        public DateTime ExpenceDate { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public string Payment { get; set; }
        public string Notes { get; set; }
    }
    public class Laptop
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Description { get; set; }
        public string Path { get; set; }
        [NotMapped]
        [Display(Name = "Choose Image")]
        public IFormFile ImagePath { get; set; }
    }
    public class Institute
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(120)]
        public string InstituteName { get; set; }
        [Required]
        [StringLength(8)]
        public string ShortName { get; set; }
        [Required]
        [StringLength(120)]
        public string ContactNumber { get; set; }
        public string AdminEmail { get; set; }
        public string AdminEmailPassword { get; set; }
        public string Address { get; set; } 
        public string? LogoPath { get; set; }
        //[ValidateNever]
        public string? BannerPath { get; set; }
      
       // public virtual ICollection<InsBranch>? InsBranches { get; set; }
    }
    public class InsBranch
    {
        public int Id { get; set; }
        public string BranchName { get; set; }
        public string BranchShortName { get; set; }
        public string ConatcNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool IsMainbranch { get; set; }
        [ForeignKey("Institute")]
        public int InsId { get; set; }

        public Institute? Institute { get; set; }
    }
    public class FinancialYear
    {
        public int Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
    public class FixedCostParticulars
    {
        public int Id { get; set; }
        public string ParticularsName { get; set; }
        public string Description { get; set; }
        // public decimal CostAmount { get; set; }
    }
    public class CompanysFixedCost
    {
        public int Id { get; set; }
        public int FixedCostParticulars { get; set; }
        [ForeignKey("Institute")]
        public int InstituteId { get; set; }
        [ForeignKey("InsBranch")]
        public int InsBranchId { get; set; }
        public decimal CostAmount { get; set; }
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
   #endregion company

   public partial class EmailDetail
   {
      //public EmailParser EmailParser { get; set; }
      public IConfiguration configuration { get; set; }
      public List<int> To { get; set; }
      public List<string> ToEmail { get; set; }
      public List<string> EmailCC { get; set; }
      public List<string> EmailBCC { get; set; }
      public List<int> Cc { get; set; }
      public List<int> Bcc { get; set; }
      public List<int> Attachments { get; set; }
      public string MessageLink { get; set; }
      public string CompanyLogo { get; set; }
      public string Uploader { get; set; }
      public string RoleName { get; set; }
      public string Subject { get; set; }
      public string Logo { get; set; }
      public string CompanyName { get; set; }
      public string EmailToSingle { get; set; }
      public string BaseUrl { get; set; }
      public string BaseUrlCustom { get; set; }
      public string Message { get; set; }
      public string OtherToEmail { get; set; }
      public string OtherCC { get; set; }
      public string OtherBCC { get; set; }
      public string Name { get; set; }
      public string TicketNo { get; set; }
      public string CaseID { get; set; }
      public List<string> OtherCCEmail { get; set; }
      public List<string> OtherBCCEmail { get; set; }
   }
   public partial class ErrorMessage
   {
      public string Message { get; set; }
      public bool Success { get; set; }

   }
   public partial class EmployeeOfferleter
   {
      public string EmployeeName { get; set; }
      public string CompanyName { get; set; }
      public string CompanyAddress { get; set; }
      public string Department { get; set; }
      public string EmployeeType { get; set; }
      public string JobTitle { get; set; }
      public string BranchName { get; set; }
      public string SupervisorName { get; set; }
      public string LineMngName { get; set; }
      public string EmployeeHRName { get; set; }
      public string EmployeeHRDetails { get; set; }
      public string EmployeeHRContact { get; set; }
      public string Designation { get; set; }
      public double GrossSalary { get; set; }
      public DateTime JoningDate { get; set; }

   }
   public partial class SalaryVM
   {
      //GrossSalary,BasicSalary,HouseRent,TransportAllowance,MedicalAllowance,FoodAllowance,BonusAllowance,OthersAllowance
      public int Id { get; set; }
      public double BasicSalary { get; set; }
      public double GrossSalary { get; set; }
      public double HouseRent { get; set; }
      public double TransportAllowance { get; set; }
      public double MedicalAllowance { get; set; }
      public double FoodAllowance { get; set; }
      public double BonusAllowance { get; set; }
      public double OthersAllowance { get; set; }
   }
   public partial class Employee
   {
      public DateTime Birthday { get; set; }
      public DateTime AnniversaryDate { get; set; }
      public string Department { get; set; }
      public string EmployeeType { get; set; }
      public bool InAMeeting { get; set; }
      public string UserName { get; set; }
      public string Password { get; set; }
      public string ProjectDomainId { get; set; }
      public int PermissionGroupId { get; set; }
      public Guid ManagerId { get; set; }
      public Guid LineManagerId { get; set; }
      public bool IfPermissionChecked { get; set; }
      public bool HasStopTimerPermission { get; set; }
      public bool IsAssigned { get; set; }
      //public List<Permission> Permission { get; set; }
      public string BranchName { get; set; }
      public string LineManagerName { get; set; }
      public string SupervisorName { get; set; }
      //public List<EmergencyContact> EmergencyContactList { get; set; }
      public string ProvidentFundStatus { get; set; }
      public string GratuityFundStatus { get; set; }
      public string WorkersParticipationFundStatus { get; set; }
      public string WorkersWelfareFundStatus { get; set; }
      public string LifeInsuranceStatus { get; set; }
      public string GroupInsuranceStatus { get; set; }
      public string SalesBonusStatus { get; set; }
      public string PerformanceBonusStatus { get; set; }
      public string TransportStatus { get; set; }
      public string CanteenStatus { get; set; }
      public string WeekendCompensationStatus { get; set; }
      public string CompensationLeaveStatus { get; set; }
      public string OvertimeStatus { get; set; }
      public string LaptopStatus { get; set; }
      public string RFID { get; set; }
      public string BirthCertificateNo { get; set; }
      public int Age { get; set; }
      //public string DisabilityStatus { get; set; }
      public int Tax { get; set; }
      public string Designation { get; set; }
      public string Shift { get; set; }
      public string EmploymentStatus { get; set; }
      //For new Dropdown
      //public List<EmployeeHR> EmployeeHR { get; set; }
   }
   public class LeaveDetailCustom
   {
      public List<LeaveDetail> LeaveDetail { get; set; }
      //public List<LeaveDatas> LeaveDatas { get; set; }
      //public List<LeaveLog> LeaveLog { get; set; }
      //public List<LeaveApplicant> LeaveApplicant { get; set; }
      public string FullName { get; set; }
      public string LeaveStatus { get; set; }
      public Guid LeaveId { get; set; }
   }
   public class LeaveDetail
   {
      public Guid UserId { get; set; }
      public int ApprovedLeave { get; set; }
      public string Type { get; set; }
      public string LeaveType { get; set; }
      public string Limit { get; set; }
   }
   //public class EmployeeHR
   //{
   //    public DateTime Birthday { get; set; }
   //    public DateTime AnniversaryDate { get; set; }
   //    public string Department { get; set; }
   //    public string EmployeeType { get; set; }
   //}
   public partial class Image
   {
     // public IFormFile file { get; set; }
      public string directory { get; set; }

   }
   public partial class AllEmployeeData
   {
      public Guid EmployeeId { get; set; }
      public string FullName { get; set; }
      public string Designation { get; set; }
      public string RegNo { get; set; }
      public DateTime DateOfBirth { get; set; }
      public DateTime JoiningDate { get; set; }
      public string Sex { get; set; }
      public string PhoneNumber { get; set; }
      public string Email { get; set; }
      public string ProfilePicture { get; set; }
   }
   public partial class ActiveEmployeeData
   {
      public Guid UserId { get; set; }
      public string Name { get; set; }
      public string RegNo { get; set; }
      public Int32 Clockin { get; set; }
      public Int32 Clockout { get; set; }
      public string OfficeStatus { get; set; }
      public string HasTicket { get; set; }
      public string TicketId { get; set; }
      public DateTime ClockInTime { get; set; }
   }
   public class EmployeeCheckCustom
   {
      public string UserName { get; set; }
      public string FirstName { get; set; }
      public int WorkHour { get; set; }
      public List<EmployeeCheckInOut> employeeCheckInOuts { get; set; }

   }
   public class EmployeeCheckInOut
   {
      public int Id { get; set; }
      public string UserId { get; set; }
      public string BasePlace { get; set; }
      public string EmployeeClockId { get; set; }
      public string ClockInImage { get; set; }
      public string ProfilePicture { get; set; }
      public Guid LocationPointId { get; set; }
      public string ClockInLat { get; set; }
      public string ClockInLng { get; set; }
      public string LocationLat { get; set; }
      public string LocationLng { get; set; }
      public DateTime Attendance { get; set; }
      public string ClockType { get; set; }
      public DateTime ClockInTime { get; set; }
      public string UserName { get; set; }
      public string UserNameAbsent { get; set; }
      public string FirstNameAbsent { get; set; }
      public string ClockDate { get; set; }
      public string ClockTime { get; set; }
      public string FirstName { get; set; }
      public string BaseInTime { get; set; }
      public double TotalWorkTime { get; set; }
      public List<EmployeeAttCustom> employeeAttCustoms { get; set; }
   }
   public class EmployeeBonusReportModel
   {
      public string UsedIdNo { get; set; }
      public string FullName { get; set; }
      public string FirstName { get; set; }
      public string Designation { get; set; }
      public string Department { get; set; }
      public string DateFormat { set; get; }
      public string StartDate { get; set; }
      public string EndDate { get; set; }
      public DateTime JoiningDate { get; set; }
      public double BasicSalary { get; set; }
      public double GrossSalary { get; set; }
      public double BonusAmount { get; set; }
      public int PageSize { get; set; }
      public int PageNo { get; set; }
      public Guid UserId { get; set; }
      public int CurrentLogginPermissionGroupId { set; get; }
   }
   public class EmployeeCheckInOutHistory
   {
      public string UserId { get; set; }
      public int RegNo { get; set; }
      public string FirstName { get; set; }
      public string EmployeeClockId { get; set; }
      public string ClockType { get; set; }
      public string ClockDate { get; set; }
      public string ClockTime { get; set; }
      public double TotalWorkTime { get; set; }
      public string BasePlace { get; set; }
   }
   public partial class AllEmployeeDetailWorkDuration
   {
      public Guid UserId { get; set; }
      public int EmployeeId { get; set; }
      public string FirstName { get; set; }
      public List<DetailWorkDuration> DetailWorkDuration { get; set; }
   }
   public partial class DetailWorkDuration
   {
      // public Guid UserId { get; set; }
      public string Date { get; set; }
      public double WorkDuration { get; set; }
      public List<InOutTime> InOutTimeList { get; set; }
   }
   public partial class InOutTime
   {
      public string TimeIn { get; set; }
      public string TimeOut { get; set; }
      public double Duration { get; set; }
   }

   public class EmployeeAttCustom
   {
      public string UserName { get; set; }
      public string WorkDay { get; set; }
      public int TotalHour { get; set; }
   }
   public class EmployeeAttendance
   {
      public Guid EmployeeId { get; set; }
      public string RegNo { get; set; }
      public string ClockType { get; set; }
      public string ClockInLat { get; set; }
      public string ClockInLng { get; set; }
      public string ClockInImage { get; set; }
      public DateTime ClockInTime { get; set; }
   }
   public class SearchList
   {
      public string id { get; set; }
      public string text { get; set; }
   }
   public class Paging
   {
      public int PageCount { get; set; }
      public int CurrentNumber { get; set; }
      public int PageNumber { get; set; }
      public int OutOfNumber { get; set; }
      public string CallingFunctionName { get; set; }
   }
   public class EmployeePdf
   {
      public Employee employee { get; set; }
      //public EmployeeHR employeeHR { get; set; }
      //public UserPermission userPermission { get; set; }
      //public Company company { get; set; }
      public string CompanyLogo { get; set; }
      public string CompanyName { get; set; }
      public string CompanyAddress { get; set; }
      public string CompanyEmail { get; set; }
      public string CompanyPhone { get; set; }
   }
    public class ProductTable  
    {
        public int Id { get; set; }
        public string Code { get; set; } = "";
        public string Name { get; set; } = "";
        public string EntryBy { get; set; } = "";
        public DateTime EntryDate { get; set; } = DateTime.Now;
        public int Reorderlevel { get; set; }
        public string UnitName { get; set; } = "PC";
        public decimal Boxqty { get; set; }
        public int UnitId { get; set; }
        public int CatId { get; set; }
        //public string SKU { get; set; }
        public decimal SalesPrice { get; set; } 
        public decimal PurchasePrice { get; set; } 
        public decimal Discountrate { get; set; }
        public decimal Vatrate { get; set; } 
        public decimal Vatamount { get; set; }  
        public string Description { get; set; } 
        public int StockQty { get; set; }  
        public string? VehicleName { get; set; }
        public string? ChasisNo { get; set; }
        public string? EngineNo { get; set; }
        public string? FuelType { get; set; }
        public string? Color { get; set; }
        public string? ModelNo { get; set; }  
        public int Mileage { get; set; }
        public int Status { get; set; }
        public int MimumQuantity { get; set; }
        public int BrandId { get; set; } 
        public int insId { get; set; } 
        public int inBranchsId { get; set; }
        public int MinimumQuantity { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string SKU { get; set; }
        public string? ProductImageUrl { get; set; }
        public int Tax { get; set; } 
        public string DiscountType { get; set; } 
        public int SubCategoryId { get; set; }
    }

    public class SubCategory
    {
        public int Id { get; set; }
        public int ParentCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryCode { get; set; }
        public string Description { get; set; }
    }
    public class Brand
    {
        public int Id { get; set; }
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ProductImageUrl { get; set; }
    }
    public class Sales
    {
        public int Id { get; set; } 
        public int CustomerId { get; set; }
        public DateTime SalesDate { get; set; }
        public int SupplierId { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy
        {
            get; set;
        }
    }
    public class POSInfo
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int CustomerId { get; set; }
        public string ScanBarcode { get; set; }
        public int SubTotal { get; set; }
        public int Tax { get; set; }  
        public int Total { get; set; }
    }
    public class SalesReturn
    {
        public int Id { get; set; }
        public DateTime QuotationDate { get; set; }
        public string ReferenceNo { get; set; }
        public int ProductId { get; set; }   
        public int OrderTax { get; set; }
        public int Discount { get; set; }
        public string Shipping { get; set; } = string.Empty;
        public int GrandTotal { get; set; }
        public string Status { get; set; }
    }
    public class Supplier
    {
        public int Id { get; set; }
        public string SupplierName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; } 
        public string Address { get; set; }
        public string Description { get; set; } 
    }
    public class FooterContent
    {
        public int Id { get; set; }
        public string SectionKey { get; set; }
        public string Title { get; set; }
        public string HtmlContent { get; set; }
        public int SortOrder { get; set; }
        public bool IsVisible { get; set; }
    }

    public class Store 
    {
        public int Id { get; set; }
        public string StoreName { get; set; }   
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string StoreImage { get; set; }
    }
    public class UserDetail
    {
        public int Id { get; set; } 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Role { get; set; }   
        public string UserImageUrl { get; set; }
    }
 }
