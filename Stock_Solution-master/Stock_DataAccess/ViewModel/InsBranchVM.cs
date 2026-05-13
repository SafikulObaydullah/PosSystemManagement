using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class InsBranchVM
   {
      public int Id { get; set; }
      public string BranchName { get; set; }
      public string? BranchShortName { get; set; }
      public string? ConatcNumber { get; set; }
      public string? Email { get; set; }
      public string? Address { get; set; }
      public bool IsMainbranch { get; set; }
      public int InsId { get; set; }
      public Institute? Institute { get; set; }
   }
}
