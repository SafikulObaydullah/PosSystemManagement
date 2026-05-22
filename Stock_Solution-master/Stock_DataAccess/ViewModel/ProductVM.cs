using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class Vehicle
   {
      public int Id { get; set; }
      public string VehicleName { get; set; }
   }
   public class VehicleVM
   {
      public int Id { get; set; }
      public string VehicleName { get; set; }
   }
    public class ProductDetailModel
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public int BrandId { get; set; }
        public int UnitId { get; set; }
        public string SKU { get; set; }
        public int MinimumQuantity { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public int Tax { get; set; }
        public string DiscountType { get; set; }
        public decimal Price { get; set; }
        public int Status { get; set; }
        public string ProductImageUrl { get; set; }
    }
    public class SubCategoryVM
    {
        public int Id { get; set; }
        public int ParentCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ParentCategoryName { get; set; }
        public string CategoryCode { get; set; }
        public string Description { get; set; }
    }

    public class ProductVM
   {
      public int Id { get; set; }
      public string Code { get; set; } = "";
      public string Name { get; set; } = ""; 
      public int Reorderlevel { get; set; } = 5; 
      public decimal Boxqty { get; set; } = 1;
      public int UnitId { get; set; } = 1;
      public int CatId { get; set; } = 1;
      public decimal SalesPrice { get; set; } = 1;
      public decimal PurchasePrice { get; set; } = 1;
      public decimal Discountrate { get; set; } = 0;
      public decimal Vatrate { get; set; } = 0;
      public decimal Discountamount { get; set; } = 0;
      public decimal Vatamount { get; set; } = 0;
      public string Description { get; set; } = "";
      public int Status { get; set; }
      public int MimumQuantity { get; set; }
      public int BrandId { get; set; }
      public string Sku { get; set; }
      public string VehicleName { get; set; }
      public string ChasisNo { get; set; }
      public string EngineNo { get; set; }
      public string FuelType { get; set; }
      public string Color { get; set; }
      public string ModelNo { get; set; }
      public int Mileage { get; set; }
        public int StockQty { get; set; } = 0;
      public int insId { get; set; }
      public int inBranchsId { get; set; }
      public string? CategoryName { get; set; }
      public bool IsActive { get; set; } = true;
      public string EntryBy { get; set; } = "";
      public DateTime EntryDate { get; set; } = DateTime.Now;

   }
}
