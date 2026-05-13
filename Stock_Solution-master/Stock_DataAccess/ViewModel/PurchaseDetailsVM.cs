using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class PurchaseDetailsVM
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
      public int ProductId { get; set; } 
      public int insId { get; set; } 
      public int inBranchsId { get; set; }
      //public Unit Unit { get; set; }
      //public Product Product { get; set; }   
   }
}
