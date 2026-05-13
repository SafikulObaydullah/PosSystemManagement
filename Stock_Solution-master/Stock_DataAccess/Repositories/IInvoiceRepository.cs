using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IInvoiceRepository : IBaseRepository<Invoice>
    {
        List<InvoiceVM> GetInvoice(string VehicleName);
        void Update(Invoice entity);
    }
   public class InvoiceRepository : BaseRepository<Invoice>, IInvoiceRepository
   {
      private StockModel _context;
      public InvoiceRepository(StockModel context) : base(context)
      {
         _context = context;
      }
      public List<InvoiceVM> GetInvoice(string? VehicleName)
      {
         //List<InvoiceVM> result = _context.Invoices.Where(x=>x.VehicleName.ToLower() == VehicleName.ToLower() || x.VehicleName == VehicleName==null).Select(s =>
         List<InvoiceVM> result = (from s in _context.Invoices
                                   where (string.IsNullOrEmpty(VehicleName) || (s.VehicleName.ToLower().Contains(VehicleName.ToLower())))
                                   select new InvoiceVM
                                   {
                                      Id = s.Id,
                                      VehicleName = s.VehicleName,
                                      ChasisNo = s.ChasisNo,
                                      EngineNo = s.EngineNo,
                                      ModelNo = s.ModelNo,
                                      FuelType = s.FuelType,   
                                      Color = s.Color,   
                                      Mileage = s.Mileage,
                                      Amount = s.Amount,
                                      TotalAmount = s.TotalAmount,   
                                      BanlanceDue = s.BanlanceDue,   
                                      Discount = s.Discount,   
                                      InvoiceId = s.InvoiceId, 
                                      PaymentType = s.PaymentType,
                                      Tax = s.Tax,
                                   }).ToList();
         return result;
      }
      public void Update(Invoice entity)
        {
            _context.Invoices.Update(entity);
        } 
    }
}
