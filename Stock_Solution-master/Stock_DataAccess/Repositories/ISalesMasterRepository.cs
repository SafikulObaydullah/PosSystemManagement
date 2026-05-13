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
    public interface ISalesMasterRepository : IBaseRepository<SalesMaster>
    {
        List<SalesMasterVM> GetSalesMaster();
        void Update(SalesMaster entity);
    }
    public interface ISalesRepository : IBaseRepository<Sales>
    {
        List<SalesMasterVM> GetSales(); 
    }
    public interface ISalesReturnRepository : IBaseRepository<SalesReturn>
    {
        List<SalesReturn> GetSalesReturn();
    }
    public class SalesReturnRepository : BaseRepository<SalesReturn>, ISalesReturnRepository
    {
        private StockModel _context;
        public SalesReturnRepository(StockModel context) : base(context)
        {
            _context = context;
        }

        public List<SalesReturn> GetSalesReturn()
        {
            List<SalesReturn> result = (from s in _context.SalesReturn 
                                          select new SalesReturn
                                          {
                                              Id = s.Id,
                                              Discount = s.Discount,
                                              QuotationDate = s.QuotationDate,
                                              Shipping = s.Shipping,
                                              GrandTotal = s.GrandTotal,    
                                              OrderTax = s.OrderTax,
                                              ProductId = s.ProductId,
                                              ReferenceNo = s.ReferenceNo,  
                                              Status = s.Status,    
                                          }).ToList();
            return result;
        }
    }
    public class SalesRepository : BaseRepository<Sales>, ISalesRepository
    {
        private StockModel _context;
        public SalesRepository(StockModel context) : base(context)
        {
            _context = context;
        }

        public List<SalesMasterVM> GetSales()
        {
            List<SalesMasterVM> result = (from s in _context.Sales
                                          join cust in _context.BusinessPartners on s.CustomerId equals cust.Id
                                          join supp in _context.Suppliers on s.SupplierId equals supp.Id
                                          select new SalesMasterVM
                                          {
                                              ID = s.Id,
                                              SalesDate = s.SalesDate,
                                              CustomerID = s.CustomerId,
                                              CustomerName = cust.Name,
                                              SupplierName = supp.SupplierName,
                                              SupplierId = s.SupplierId,     
                                          }).ToList();
            return result;

        }
    }
    public class SalesMasterRepository : BaseRepository<SalesMaster>, ISalesMasterRepository
    {
         private StockModel _context;
         public SalesMasterRepository(StockModel context) : base(context)
         {
            _context = context;
         }
         public List<SalesMasterVM> GetSalesMaster()
         {
            var data = _context.SalesMasters.ToList();
            List<SalesMasterVM> result = (from s in _context.SalesMasters 
                                         join cust in  _context.BusinessPartners on s.CustomerID equals cust.Id
                                         select new SalesMasterVM
                                         {
                                             ID = s.ID,
                                             SalesDate = s.SalesDate,
                                             EntryBy = s.EntryBy,
                                             EntryDate = s.EntryDate, 
                                             BillNo = s.BillNo, 
                                             Due = s.Due,
                                             CustomerID = s.CustomerID,   
                                             TDiscountamount = s.TDiscountamount,
                                             TDiscountrate = s.TDiscountrate,
                                             Convence = s.Convence,
                                             inBranchsId = s.inBranchsId,
                                             insId = s.insId,
                                             Note = s.Note,  
                                             VoucherNo = s.VoucherNo, 
                                             Packing = s.Packing,
                                             Paidamount = s.Paidamount,
                                             PaymentMode = s.PaymentMode,
                                             TotalPrice = s.TotalPrice,
                                             TotalQuantity = s.TotalQuantity,  
                                             TVatamount = s.TVatamount,  
                                             TVatrate = s.TVatrate,   
                                             CustomerName = cust.Name
                                         }).ToList();
            return result;
         }
         public void Update(SalesMaster entity)
         {
            _context.SalesMasters.Update(entity);
         }
   }
}
