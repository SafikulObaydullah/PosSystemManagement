using System.ComponentModel.DataAnnotations;

namespace Stock_API.ViewModels
{
    //public interface IFacadeRegistration
    //{
    //    void AddInfrastucture(IServiceCollection service, string conStr);
    //}
    //public static class Services
    //{
    //    public static IFacadeRegistration Service { get; set; } 

    //    public static void RegisterDependencies(IServiceCollection services, string conStr)
    //    {
    //        Service.AddInfrastucture(services, conStr);
    //    }
    //}
    public class InstituteDTO
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(120)]
        public string InstituteName { get; set; }
        [Required]
        [StringLength(8)]
        public string ShortName { get; set; }
        [Required]
        [StringLength(120)]
        public string ContactNumber { get; set; }
        public string AdminEmail { get; set; }
        public string AdminEmailPassword { get; set; }
        public string Address { get; set; }
        //public string LogoPath { get; set; }
        public string? LogoPath { get; set; }

        public string BannerPath { get; set; }
    }

    public class RegisterVM
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        //public string RolesName { get; set; }

        public string Password { get; set; }
    }
    public class LoginVM
    {
        public string? UserName { get; set; }
        //public string RolesName { get; set; }
        public string? Password { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

    }
}
