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
    public interface IPaymentMethodRepository : IBaseRepository<PayMethod>
    {
        List<PaymentMethodVM> GetPaymentMethod();
        void Update(PayMethod entity);
    }
    public class PaymentMethodRepository : BaseRepository<PayMethod>, IPaymentMethodRepository
    {
         private StockModel _context;
         public PaymentMethodRepository(StockModel context) : base(context)
         {
            _context = context;
         } 
         public List<PaymentMethodVM> GetPaymentMethod()
         { 
            List<PaymentMethodVM> result = (from s in _context.PayMethods 
                                             join institute in _context.Institutes on s.InsId equals institute.Id
                                             join branch in _context.InsBranches on s.InBranchsId equals branch.Id    
                                             select new PaymentMethodVM
                                             {
                                                Id = s.Id,  
                                                Name = s.Name,  
                                                AccountNumber = s.AccountNumber,
                                                Description = s.Description,
                                                InsId = s.InsId,  
                                                InstituteName = institute.InstituteName,
                                                InBranchsId = s.InBranchsId,  
                                                InBranchName = branch.BranchName,
                                             }).ToList();
             return result;
         }  
         public void Update(PayMethod entity)
         {
            _context.PayMethods.Update(entity);
         } 
    }
}
