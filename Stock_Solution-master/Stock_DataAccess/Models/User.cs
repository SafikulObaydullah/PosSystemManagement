using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Models
{
    public class ApplicationUser : IdentityUser
    {
        public bool IsActive { get; set; } = true;
        public int InsId { get; set; } = 1;
        public int InsBranchId { get; set; } = 1;
        public string Fullname { get; set; }

    }
    public class Role : IdentityRole
    {
    }

    public class LoginModel : BaseDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        //public DateTime CreatedDate { get; set; } = DateTime.Now.Date;
        //public string? CreatedBy { get; set; }
        //public DateTime UpdatedDate { get; set; }
        //public string? UpdatedBy
        //{
        //    get; set;
        //}
        //public string? DomainName { get; set; }
        //public string? IP { get; set; }
        //public bool IsActive { get; set; } = true;
    }
    public class TokenApiModel
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }

}
