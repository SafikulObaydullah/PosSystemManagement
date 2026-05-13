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
   public class BusinessPartnerVM
   {
      public int Id { get; set; }
      public string? Name { get; set; }
      public string? Address { get; set; } = "Dhaka";
      public string? ContactNo { get; set; }
      [DataType(DataType.Date)]
      public DateTime ContactDate { get; set; } = DateTime.Now;
      public string? ContactPerson { get; set; } = "p";
      public int EntryBy { get; set; } = 1;
      public DateTime EntryDate { get; set; } = DateTime.Now;
      public string Mobile { get; set; } = "";
      public int SubDistrictID { get; set; } = 2;
      public int insId { get; set; } = 2;
      public string InsttituteName { get; set; }
      public int inBranchsId { get; set; } = 3;
      public string InstituteBranchName { get; set; }
   }
    public class ExpenseVM
    { 
        public int Id { get; set; }
        public DateTime ExpenceDate { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public string Payment { get; set; }
        public string Notes { get; set; }
    }
    public class StudentViewModel
    {
        public List<Student> students = new List<Student>();
    }
}
