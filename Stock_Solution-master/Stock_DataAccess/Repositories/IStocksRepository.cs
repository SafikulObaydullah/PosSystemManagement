using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IStockRepository : IBaseRepository<Stock>
    {
      List<StockVM> GetStock();
      void Update(Stock entity);
   }
    public class StockRepository : BaseRepository<Stock>, IStockRepository
   {
        private StockModel _context;
        public StockRepository(StockModel context) : base(context)
        {
            _context = context;
        }
      public List<StockVM> GetStock()
      { 
         List<StockVM> result = _context.Stock.Select(s =>
                       new StockVM
                       {
                          Id = s.Id,
                          StockDate = s.StockDate, 
                          StockInQty = s.StockInQty,  
                          StockOutQty = s.StockOutQty,   
                          insId = s.insId,
                          inBranchsId = s.inBranchsId,
                          ProductId = s.ProductId,
                       }).ToList();
         return result;
      } 
      public void Update(Stock entity)
      {
         var data = _context.Stock.Where(t => t.Id.Equals(entity.Id)).FirstOrDefault();
         if (data == null)
         {
            throw new Exception("Data Not Found");
         };

         data.StockOutQty = entity.StockOutQty; 
         data.StockDate = entity.StockDate; 
         _context.Stock.Update(data);
      }
   }
}
