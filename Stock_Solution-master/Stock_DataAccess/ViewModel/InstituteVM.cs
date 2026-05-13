using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class InstituteVM
   {
      public int Id { get; set; } 
      public string InstituteName { get; set; } 
      public string ShortName { get; set; } 
      public string ContactNumber { get; set; }
      public string AdminEmail { get; set; }
      public string AdminEmailPassword { get; set; }
      public string Address { get; set; }
      public string? LogoPath { get; set; } 
      public string? BannerPath { get; set; }
   }
}
