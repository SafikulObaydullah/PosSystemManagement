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
    public interface IPurcahseMasterRepository : IBaseRepository<Purchasemaster>
    {
        List<PurchaseMasterVM> GetPurchaseMaster();
        void Update(PurchaseMasterVM entity);
    }
    public class PurcahseMasterRepository : BaseRepository<Purchasemaster>, IPurcahseMasterRepository
    {
      private StockModel _context;
      public PurcahseMasterRepository(StockModel context) : base(context)
      {
         _context = context;
      }
      public List<PurchaseMasterVM> GetPurchaseMaster()
      {
         //var data = _context.Purchasemasters.ToList();
         List<PurchaseMasterVM> result = (from s in _context.Purchasemasters
                                          join supplier in _context.BusinessPartners on s.SupplierID equals supplier.Id
                                          join institute in _context.Institutes on s.insId equals institute.Id
                                          join branch in _context.InsBranches on s.inBranchsId equals branch.Id   
                                          join paymentmethod in _context.PayMethods on s.PaymodeID equals paymentmethod.Id 
                                          join voucherType in _context.VoucherTypes on s.VoucherTypeID equals voucherType.Id
                                          select new PurchaseMasterVM
                                          {
                                             ID = s.ID,
                                             PurchaseDate = s.PurchaseDate, 
                                             TotalQuantity = s.TotalQuantity,  
                                             TotalPrice = s.TotalPrice,  
                                             BonusAmount = s.BonusAmount,   
                                             NetAmount = s.NetAmount, 
                                             VoucherNo = s.VoucherNo,
                                             TranNo = s.TranNo,
                                             InvoiceNo = s.InvoiceNo,
                                             TDiscountrate = s.TDiscountrate, 
                                             TVatrate = s.TVatrate,
                                             TDiscountamount = s.TDiscountamount,
                                             TVatamount = s.TVatamount,
                                             Paidamount = s.Paidamount,
                                             Due = s.Due,
                                             Convence = s.Convence,   
                                             Packing = s.Packing,  
                                             EntryBy = s.EntryBy,
                                             EntryDate = s.EntryDate,
                                             Note = s.Note,  
                                             LaborCost = s.LaborCost, 
                                             TotalCost = s.TotalCost, 
                                             UnitCostonTotal = s.UnitCostonTotal, 
                                             UnitCost = s.UnitCost, 
                                             SupplierID = s.SupplierID, 
                                             SupplierName = supplier.Name,
                                             PaymodeID = s.PaymodeID,   
                                             PaymentMethodName = paymentmethod.Name,
                                             VoucherTypeID = s.VoucherTypeID, 
                                             VoucharName = voucherType.VoucharName,
                                             insId = s.insId,
                                             InsttituteName = institute.InstituteName,
                                             inBranchsId = s.inBranchsId,  
                                             BranchName = branch.BranchName,
                                          }).ToList();
                  return result;
      }
      public void Update(PurchaseMasterVM entity)
      {
         var data = _context.Purchasemasters.Where(t => t.ID.Equals(entity.ID)).FirstOrDefault();
         if (data == null)
         {
            throw new Exception("Data Not Found");
         };

         data.PurchaseDate = entity.PurchaseDate;
         data.TotalQuantity = entity.TotalQuantity;
         data.TotalPrice = entity.TotalPrice;
         data.NetAmount = entity.NetAmount;
         data.VoucherNo = entity.VoucherNo;  
         data.TranNo = entity.TranNo;
         data.InvoiceNo = entity.InvoiceNo;  
         data.TDiscountamount = entity.TDiscountamount;  
         data.TVatamount = entity.TVatamount;   
         data.Paidamount = entity.Paidamount;
         data.Due = entity.Due;  
         data.Convence = entity.Convence; 
         data.Packing = entity.Packing;   
         data.UpdatedBy = entity.EntryBy; 
         data.UpdatedDate = entity.EntryDate;
         data.Note = entity.Note;
         data.LaborCost = entity.LaborCost;
         data.TotalCost = entity.TotalCost;  
         data.UnitCostonTotal = entity.UnitCostonTotal;  
         data.UnitCost = entity.UnitCost;
         data.SupplierID = entity.SupplierID;   
         data.VoucherTypeID = entity.VoucherTypeID;   
         data.insId = entity.insId; 
         data.inBranchsId = entity.inBranchsId; 
         _context.Purchasemasters.Update(data);
      } 
    }
}
