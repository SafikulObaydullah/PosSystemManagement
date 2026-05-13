using Microsoft.EntityFrameworkCore;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;

namespace Stock_API.Auth.Interface
{
    public interface IAuthService
    {
        Task<string> EnCoding(string password);

        Task<string> DeCoding(string password);

        Task<string> GetOTP();

        Task<string> RequestURL();

        #region U S E R 

        #endregion Others
    }
    public interface IFacadeRegistration
    {
        void AddInfrastucture(IServiceCollection service, string conStr);
    }
    public interface IRepositoryRegistration
    {
        void AddInfrastucture(IServiceCollection services, string conStr);

    }
    public class FacadeRegistration : IFacadeRegistration
    {
        public static IRepositoryRegistration Registration { get; set; } = new RepositoryRegistration();

        public void AddInfrastucture(IServiceCollection services, string conStr)
        {
            Registration.AddInfrastucture(services, conStr);  
        }
    }
    public class RepositoryRegistration : IRepositoryRegistration
    {
        public void AddInfrastucture(IServiceCollection services, string conStr)
        {
            services.AddDbContext<StockModel>(options =>
            {
                options.UseSqlServer(conStr);
            });  
        } 
    }
    public static class Services
    {
        public static IFacadeRegistration Service { get; set; } = new FacadeRegistration();

        public static void RegisterDependencies(IServiceCollection services, string conStr)
        {
            Service.AddInfrastucture(services, conStr);
        }
    }
}
