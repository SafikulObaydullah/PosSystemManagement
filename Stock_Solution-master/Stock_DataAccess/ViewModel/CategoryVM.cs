using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class CategoryVM
   {
      public int Id { get; set; }
      public int ParentId { get; set; }
      public string Description { get; set; }
      public string Name { get; set; }
      public string ParentName { get; set; }
   }
    public class DateTimeFormatVM
    {
        public int Id { get; set; } 
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
