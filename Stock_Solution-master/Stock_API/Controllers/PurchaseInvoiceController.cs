using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Stock_API.Utility;
using Stock_API.ViewModels;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System.Dynamic;
using System.Net.Http.Headers;
using System.Text;


namespace Stock_API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   [EnableCors("Powersoft")]
   public class PurchaseInvoiceController : ControllerBase
   {
      private IUnitofWork unitofWork;
      ModelsMessage modelsMessage;
      private readonly UserManager<ApplicationUser> _userManager;
      public PurchaseInvoiceController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
      {
         this.unitofWork = unitofWork;
         modelsMessage = new ModelsMessage();
         _userManager = userManager;
      } 
      [HttpGet("GetPurchaseMaster")]
      public IEnumerable<PurchaseMasterVM> GetAll()
      {
         List<PurchaseMasterVM> all = new List<PurchaseMasterVM>();
         try
         {
            //all = this.unitofWork.UnitRepository.GetAll(null, null).ToList();
            all = this.unitofWork.PurchaseMasterRepository.GetPurchaseMaster().ToList();
         }
         catch (Exception ex)
         {
            all = new List<PurchaseMasterVM>();
         }
         return all;
      }
      [HttpGet("GetByID")]
      public IEnumerable<Purchasemaster> GetByID(int Id)
      {
         List<Purchasemaster> all = new List<Purchasemaster>();
         try
         {
           all = this.unitofWork.PurchaseMasterRepository.GetByID(t => t.ID.Equals(Id)).ToList();
         }
         catch (Exception ex)
         {
            all = new List<Purchasemaster>();
         }
         return all;
      }
      //[HttpPost("SavePurchaseMaster")]
      //public IActionResult SavePurchaseMaster(PurchaseMasterVM obj)
      //{
      //   Purchasemaster model = new Purchasemaster()
      //   {
      //      PurchaseDate = obj.PurchaseDate,
      //      TotalQuantity = obj.TotalQuantity,
      //      TotalPrice = obj.TotalPrice,
      //      BonusAmount = obj.BonusAmount,
      //      NetAmount = obj.NetAmount,
      //      VoucherNo = obj.VoucherNo,
      //      TranNo = obj.TranNo,
      //      InvoiceNo = obj.InvoiceNo,
      //      TDiscountamount = obj.TDiscountamount,
      //      TVatrate = obj.TVatrate,
      //      TDiscountrate = obj.TDiscountrate,
      //      TVatamount = obj.TVatamount,  
      //      Paidamount = obj.Paidamount,
      //      Due = obj.Due,
      //      Convence = obj.Convence,
      //      Packing = obj.Packing,  
      //      EntryBy = obj.EntryBy,
      //      EntryDate = obj.EntryDate, 
      //      Note = obj.Note,  
      //      LaborCost = obj.LaborCost, 
      //      TotalCost = obj.TotalCost, 
      //      UnitCostonTotal = obj.UnitCostonTotal,
      //      UnitCost = obj.UnitCost,   
      //      SupplierID = obj.SupplierID,  
      //      PaymodeID = obj.PaymodeID, 
      //      VoucherTypeID = obj.VoucherTypeID,  
      //      insId = obj.insId,   
      //      inBranchsId = obj.inBranchsId,   
      //   };
      //   try
      //   { 
      //      this.unitofWork.PurchaseMasterRepository.Add(model);
      //      var m = this.unitofWork.Save();
      //      if (m.IsSuccess)
      //      {
      //         return Ok(new { Data = model, result = m });
      //      }
      //      else
      //      {
      //         return Problem(m.Message);
      //      }
      //   }
      //   catch (Exception ex)
      //   {
      //      return Problem(ex.Message);
      //   }
      //}
      //[HttpPost("SavePurchaseMaster")]
      //public IActionResult SavePurchaseMaster(PurchaseMasterVM purchasemaster)
      //{ 
      //   try
      //   {
      //          int MaxId = unitofWork.CashInoutRepository.GetMaxId();
      //          CashInOutTransaction balance = unitofWork.CashInoutRepository.GetByIntId(MaxId);
      //          if(balance != null)
      //          {
      //              balance.Balance = (double)balance.Balance - (double)purchasemaster.TotalCost;
      //          } 
      //          CashInOutTransaction transaction = new CashInOutTransaction()
      //          {
      //              Amount = (double)purchasemaster.TotalCost,
      //              Balance = balance.Balance,
      //              TransactionType = "out",
      //              TransactionDate = DateTime.Now,
      //              TransactionId = Guid.NewGuid(),
      //              CreatedByUid = Guid.NewGuid(),
      //              CreatedDate = DateTime.Now,
      //              CustomerId = Guid.NewGuid(),
      //              UpdatedByUid = Guid.NewGuid(),
      //              UpdatedDate = DateTime.Now, 
      //          };
      //          unitofWork.CashInoutRepository.Add(transaction);
               
                

      //          Purchasemaster model = new Purchasemaster()
      //         {
      //         PurchaseDate = purchasemaster.PurchaseDate,
      //         TotalQuantity = purchasemaster.TotalQuantity,
      //         TotalPrice = purchasemaster.TotalPrice,
      //         BonusAmount = purchasemaster.BonusAmount,
      //         NetAmount = purchasemaster.NetAmount,
      //         VoucherNo = purchasemaster.VoucherNo, 
      //         InvoiceNo = purchasemaster.InvoiceNo,
      //         TDiscountamount = purchasemaster.TDiscountamount,
      //         TVatrate = purchasemaster.TVatrate,
      //         TDiscountrate = purchasemaster.TDiscountrate,
      //         TVatamount = purchasemaster.TVatamount,
      //         Paidamount = purchasemaster.Paidamount,
      //         Due = purchasemaster.Due,
      //         Convence = purchasemaster.Convence,
      //         Packing = purchasemaster.Packing,
      //         EntryBy = purchasemaster.EntryBy,
      //         EntryDate = purchasemaster.EntryDate,
      //         Note = purchasemaster.Note,
      //         LaborCost = purchasemaster.LaborCost,
      //         TotalCost = purchasemaster.TotalCost,
      //         UnitCostonTotal = purchasemaster.UnitCostonTotal,
      //         UnitCost = purchasemaster.UnitCost,
      //         SupplierID = purchasemaster.SupplierID,
      //         PaymodeID = purchasemaster.PaymodeID,
      //         VoucherTypeID = purchasemaster.VoucherTypeID,
      //         insId = purchasemaster.insId,
      //         inBranchsId = purchasemaster.inBranchsId,
      //      };
      //      // _context.Purchasemasters.Add(purchasemaster);

      //      #region stock
      //      List<Stock> stockItems = new List<Stock>();
      //      var prdstock = this.unitofWork.StockRepository.GetAll(null, null).ToList(); //_context.Stock.ToList();
      //      if (prdstock != null)
      //      {
      //         stockItems = prdstock as List<Stock>;
      //      }
      //      foreach (var item in purchasemaster.PurchaseDetails)
      //      {
      //         if (stockItems.Count > 0)
      //         {
      //            item.insId = purchasemaster.insId;
      //            item.inBranchsId = purchasemaster.inBranchsId;
      //            var prd = this.unitofWork.StockRepository.GetByID(p => p.ProductId == item.ProductId).FirstOrDefault();
      //            if (prd != null)
      //            {
      //               prd.StockInQty = prd.StockInQty + item.UnitQty;
      //               this.unitofWork.StockRepository.Update(prd);
      //            }
      //            else
      //            {
      //               Stock stock = new Stock();
      //               stock.StockInQty = item.UnitQty;
      //               stock.StockDate = DateTime.Now;
      //               stock.ProductId = item.ProductId;
      //               stock.Product = this.unitofWork.ProductRepository.GetByID(p => p.Id == item.ProductId).FirstOrDefault();
      //               stock.insId = purchasemaster.insId;
      //               stock.inBranchsId = purchasemaster.inBranchsId;
      //               stockItems.Add(stock);
      //               this.unitofWork.StockRepository.Add(stock);
      //            }
      //         }
      //         else
      //         {
      //            Stock stock = new Stock();
      //            stock.StockInQty = item.UnitQty;
      //            stock.StockDate = DateTime.Now;
      //            stock.ProductId = item.ProductId;
      //            stock.Product = this.unitofWork.ProductRepository.GetByID(p => p.Id == item.ProductId).FirstOrDefault();
      //            stock.insId = purchasemaster.insId;
      //            stock.inBranchsId = purchasemaster.inBranchsId;
      //            stockItems.Add(stock);
      //            this.unitofWork.StockRepository.Add(stock);
      //         }
      //      }
      //      #endregion stock
      //      #region transaction

      //      int maxTranNo = Convert.ToInt32(this.unitofWork.TransactionMasterRepository.GetByID(t => t.InsId == purchasemaster.insId && t.InBranchsId == purchasemaster.inBranchsId).Max(t => t.TransNO)) + 1;
      //      string da = (purchasemaster.PurchaseDate.Year + purchasemaster.PurchaseDate.Month).ToString();
      //      List<TransMaster> addTran = new List<TransMaster>();

      //      TransMaster customertransMaster = new TransMaster();
      //      customertransMaster.UserID = User.Identity.Name;
      //      customertransMaster.AmountType = -1;
      //      customertransMaster.Amount = purchasemaster.TotalPrice;
      //      customertransMaster.AccID = purchasemaster.SupplierID;
      //      customertransMaster.vdate = purchasemaster.PurchaseDate;
      //      customertransMaster.TransNO = maxTranNo;
      //      customertransMaster.vno = $"PU-{da}-{maxTranNo}";
      //      customertransMaster.BillAmount = purchasemaster.TotalPrice;
      //      customertransMaster.InvoiceNO = purchasemaster.InvoiceNo;
      //      customertransMaster.InBranchsId = purchasemaster.inBranchsId;
      //      customertransMaster.InsId = purchasemaster.insId;
      //      //2[]
      //      TransMaster transMaster = new TransMaster();
      //      transMaster.UserID = User.Identity.Name;
      //      transMaster.AmountType = 1;
      //      transMaster.Amount = purchasemaster.TotalPrice;
      //      transMaster.AccID = 6;
      //      transMaster.TransNO = customertransMaster.TransNO;
      //      transMaster.vdate = purchasemaster.PurchaseDate;
      //      transMaster.vno = $"PU-{da}-{transMaster.TransNO}";
      //      transMaster.BillAmount = purchasemaster.TotalPrice;
      //      transMaster.InvoiceNO = purchasemaster.InvoiceNo;
      //      transMaster.InBranchsId = purchasemaster.inBranchsId;
      //      transMaster.InsId = purchasemaster.insId;
      //      //3[Transport]
      //      TransMaster transportTran = new TransMaster();
      //      transportTran.UserID = User.Identity.Name;
      //      transportTran.AmountType = 1;
      //      transportTran.Amount = purchasemaster.Convence;
      //      transportTran.AccID = 11;
      //      transportTran.TransNO = customertransMaster.TransNO;
      //      transportTran.vdate = purchasemaster.PurchaseDate;
      //      transportTran.vno = $"PU-{da}-{transMaster.TransNO}";
      //      transportTran.BillAmount = purchasemaster.TotalPrice;
      //      transportTran.InvoiceNO = purchasemaster.InvoiceNo;
      //      transportTran.InBranchsId = purchasemaster.inBranchsId;
      //      transportTran.InsId = purchasemaster.insId;
      //      //3[Transport]

      //      addTran.Add(customertransMaster);
      //      addTran.Add(transMaster);
      //      addTran.Add(transportTran);
      //      unitofWork.TransactionMasterRepository.Add(addTran);
      //      #endregion transaction
      //      //purchasemaster.TranNo = maxTranNo;
      //      //model.TranNo = maxTranNo; 
      //      //_context.Purchasemasters.Add(purchasemaster);
      //      model.TranNo = maxTranNo;
      //      unitofWork.PurchaseMasterRepository.Add(model);
      //      var m = this.unitofWork.Save();
      //      if (m.IsSuccess)
      //      {
      //         return Ok(new { Data = model, result = m });
      //      }
      //      else
      //      {
      //         return Problem(m.Message);
      //      }
      //   }
      //   catch (Exception ex)
      //   {
      //      return Problem(ex.Message);
      //   } 
      //}
      [HttpPut("UpdatePurchaseMaster")]
      public IActionResult UpdatePurchaseMaster(PurchaseMasterVM PurchaseMaster)
      {
         try
         { 
            this.unitofWork.PurchaseMasterRepository.Update(PurchaseMaster);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = PurchaseMaster, result = m });
            }
            else
            {
               return Problem(m.Message);
            }
         }
         catch (Exception ex)
         {
            return Problem(ex.Message);
         }
      }
      //[HttpDelete]
      //[Route("DeleteRange")]
      //public void DeleteRange(IEnumerable<PurchaseMasterVM> entities)
      //{
      //   this.unitofWork.PurchaseMasterRepository.DeleteRange(entities);
      //   this.unitofWork.Save();
      //}
      [HttpDelete]
      [Route("Delete")] 
      public IActionResult Delete(int id)
      {
         try
         {
            this.unitofWork.PurchaseMasterRepository.DeletebyID(t => t.ID.Equals(id));
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { result = m });
            }
            else
            {
               return Problem(m.Message);
            }
         }
         catch (Exception ex)
         {
            return Problem(ex.Message);
         }
      }
      [HttpGet("GetInitialData")]
      public JsonResult GetInitialData()
      {
         dynamic result = new ExpandoObject();
         try
         {
            result.institute = this.unitofWork.InstituteRepository.GetAll(null, null).ToList();
            result.insBranch = this.unitofWork.InstituteBranchRepository.GetAll(null, null).ToList();
            result.product = this.unitofWork.ProductRepository.GetProduct().ToList();
            result.supplier = this.unitofWork.BusinessPartnerRepository.GetBusinessPartner().ToList();
            result.paymentMethod = this.unitofWork.PaymentMethodRepository.GetPaymentMethod().ToList();   
            result.vouchertype = this.unitofWork.VoucherRepository.GetAll(null, null).ToList();    
         }
         catch (Exception ex)
         {
            ModelState.AddModelError("Failed", ex.Message);
         }
         return Json(result);
      }
      [NonAction]
      public virtual JsonResult Json(object? data)
      {
         return new JsonResult(data);
      }

   }
}
