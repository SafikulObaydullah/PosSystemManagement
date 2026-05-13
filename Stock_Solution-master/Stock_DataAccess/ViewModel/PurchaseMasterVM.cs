using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class PurchaseMasterVM
   { 
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
      public decimal UnitCost { get; set; } 
      public int SupplierID { get; set; } 
      public string SupplierName { get; set; }   
      public int PaymodeID { get; set; } 
      public string PaymentMethodName { get; set; }
      public int VoucherTypeID { get; set; } 
      public string VoucharName { get; set; }   
      public int insId { get; set; } 
      public string InsttituteName { get; set; }   
      public int inBranchsId { get; set; } 
      public string BranchName { get; set; }
      public List<PurchaseDetailsVM>? PurchaseDetails { get; set; } = new List<PurchaseDetailsVM>();
      //public virtual Institute? Institute { get; set; }
      //public virtual InsBranch? InsBranch { get; set; }
      //public virtual VoucherTypes? VoucherType { get; set; }
      //public virtual PayMethod? PayMode { get; set; }
      //public virtual BusinessPartner? BusinessPartner { get; set; }
      //public List<PurchaseDetails>? PurchaseDetails { get; set; } = new List<PurchaseDetails>();
   }
}
