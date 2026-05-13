using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class StockVM
   {
      public int Id { get; set; } 
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
      public int insId { get; set; } 
      public int inBranchsId { get; set; }
   }
}
