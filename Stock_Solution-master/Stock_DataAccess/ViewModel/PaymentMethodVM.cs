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
   public class PaymentMethodVM
   {
      public int Id { get; set; }
      public string? Name { get; set; }
      public string? AccountNumber { get; set; }
      public string? Description { get; set; } 
      public int InsId { get; set; } 
      public string? InstituteName { get; set; } 
      public int InBranchsId { get; set; }
      public string? InBranchName { get; set;}
   }
}
