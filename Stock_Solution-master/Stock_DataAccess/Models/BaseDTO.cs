using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Models
{
   
    public abstract class BaseDTO
    { 
        public DateTime CreatedDate { get; set; } = DateTime.Now.Date;
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; } = DateTime.Now.Date;
        public string? UpdatedBy
        {
            get; set;
        }
        public bool IsActive { get; set; } = true;
    }
}
