using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface ITransactionMaster : IBaseRepository<TransMaster>
    {
      List<TransactionMasterVM> GetTransactionMaster();
      void Update(TransMaster entity); 
    }
    public class TransactionMaster : BaseRepository<TransMaster>, ITransactionMaster
    {
        private StockModel _context;
        public TransactionMaster(StockModel context) : base(context)
        {
            _context = context;
        }
      public List<TransactionMasterVM> GetTransactionMaster()
      { 
         List<TransactionMasterVM> result = _context.TransMasters.Select(s =>
                       new TransactionMasterVM
                       {
                          ID = s.ID,   
                          SubID = s.SubID,
                          AccID = s.AccID,
                          RefAccID = s.RefAccID,   
                          BillModeID = s.BillModeID,
                          TaxID = s.TaxID,   
                          Amount = s.Amount,
                          AmountType = s.AmountType,  
                          BillAmount = s.BillAmount,  
                          UserID = s.UserID, 
                          CRate = s.CRate,
                          InvoiceNO = s.InvoiceNO, 
                          MoneyReceiptId = s.MoneyReceiptId,
                          InsId = s.InsId,   
                          InBranchsId = s.InBranchsId,   
                          IsNormalVoucher = s.IsNormalVoucher,
                          isPosted = s.isPosted,
                          Narration = s.Narration,
                          RefNo = s.RefNo,
                          TransNO = s.TransNO,  
                          vdate = s.vdate,
                          vno = s.vno, 
                          VoucherTypeId = s.VoucherTypeId,  
                          vtype = s.vtype,   
                       }).ToList();
         return result;
      }
      public void Update(TransMaster entity)
      {
         _context.TransMasters.Update(entity);
      } 
   }
}
