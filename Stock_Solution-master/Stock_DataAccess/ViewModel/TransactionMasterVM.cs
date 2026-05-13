using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class TransactionMasterVM
   {
      public int ID { get; set; }
      public int? TransNO { get; set; }
      public string? InvoiceNO { get; set; } 
      public DateTime? vdate { get; set; }
      public string? vtype { get; set; }
      public string? vno { get; set; }
      public decimal? CRate { get; set; }
      public int? AccID { get; set; }
      public decimal? Amount { get; set; } 
      public int? AmountType { get; set; } = 1;
      public int? RefAccID { get; set; }
      public int? SubID { get; set; }
      public string? UserID { get; set; }
      public int? isPosted { get; set; }
      public int? TaxID { get; set; }
      public int? VoucherTypeId { get; set; }
      public int? MoneyReceiptId { get; set; }
      public int? BillModeID { get; set; }
      public decimal? BillAmount { get; set; }
      public int? IsNormalVoucher { get; set; }
      public string? RefNo { get; set; }
      public string? Narration { get; set; } 
      public int? InsId { get; set; } 
      public int? InBranchsId { get; set; } 
   }
}
