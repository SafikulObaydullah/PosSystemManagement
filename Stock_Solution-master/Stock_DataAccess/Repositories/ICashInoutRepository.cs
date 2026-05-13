using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
   // public interface ICashInoutRepository : IBaseRepository<CashInOutTransaction>
   // {
   //     List<CashInOutTransaction> GetExpense();
   //     void Update(CashInOutTransaction entity);
   // }
   // public class CashInoutRepository : BaseRepository<CashInOutTransaction>, ICashInoutRepository
   // {
   //      private StockModel _context;
   //      public CashInoutRepository(StockModel context) : base(context)
   //      {
   //         _context = context;
   //      }
   //      //public List<CashInOutTransaction> GetExpense()
   //      //{
   //      //   List<CashInOutTransaction> data = _context.CashInOutTransactions.ToList();
   //      //   return data;
   //      //}  
   //      //public void Update(CashInOutTransaction entity)
   //      //{
   //      //   _context.CashInOutTransactions.Update(entity);
   //      //} 
   //}
}
