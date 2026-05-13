using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface ICustomerReposity : IBaseRepository<Customer>
    {
        List<CustomerVM> GetCustomer();
        void Update(Customer entity);
    }
    public class CustomerReposityRepository : BaseRepository<Customer>, ICustomerReposity
    {
         private StockModel _context;
         public CustomerReposityRepository(StockModel context) : base(context)
         {
            _context = context;
         }
        public List<CustomerVM> GetCustomer()
        {
            List<CustomerVM> result = (from s in _context.Customers
                                       select new CustomerVM
                                       {
                                           Id = s.Id,
                                           FirstName = s.FirstName,
                                           LastName = s.LastName,
                                           Phone = s.Phone,
                                           Email = s.Email,
                                           Address = s.Address,
                                           City = s.City,
                                           CustomerType = s.CustomerType,
                                           CreditLimit = s.CreditLimit,
                                           CurrentBalance = s.CurrentBalance,
                                           Notes = s.Notes,
                                           IsActive = s.IsActive,
                                       }).ToList();
            return result;
        }
        public void Update(Customer entity)
         {
            _context.Customers.Update(entity);
         } 
    }
}
