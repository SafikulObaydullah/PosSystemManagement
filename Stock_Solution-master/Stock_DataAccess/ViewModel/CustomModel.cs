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
    public class CustomerVM : Customer
    {
        public string FullName => $"{FirstName} {LastName}";
    }
}
