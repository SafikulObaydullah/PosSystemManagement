using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class SalesMasterVM
   {
      public int ID { get; set; }
      public int CustomerID { get; set; }
      public string? CustomerName { get; set; } 
      public DateTime SalesDate { get; set; }
      public int TotalQuantity { get; set; }
      [Column(TypeName = "decimal(18,4)")]
      public decimal TotalPrice { get; set; } 
      public string VoucherNo { get; set; }
      public string BillNo { get; set; }
      [Column(TypeName = "decimal(18,4)")]
      public decimal TDiscountrate { get;set;}
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
      public string PaymentMode { get; set; }  
      //public List<SalesDetails>? SalesDetails { get; set; } 
      public int insId { get; set; } 
      public int inBranchsId { get; set; }
      public string? CreatedBy { get; set; }
      public string? UpdatedBy
      {
         get; set;
      }
      public string SupplierName { get; set; }
      public int SupplierId { get; set; }
   }
}
