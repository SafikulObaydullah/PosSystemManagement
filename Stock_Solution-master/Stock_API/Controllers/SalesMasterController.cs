using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
   public class SalesMasterController : ControllerBase
   {
      private IUnitofWork unitofWork;
      ModelsMessage modelsMessage;
      private readonly UserManager<ApplicationUser> _userManager;
      public SalesMasterController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
      {
         this.unitofWork = unitofWork;
         modelsMessage = new ModelsMessage();
         _userManager = userManager;
      }
      [HttpGet("GetSalesMaster")]
      public IEnumerable<SalesMasterVM> GetSalesMaster()
      {
         List<SalesMasterVM> all = new List<SalesMasterVM>();
         try
         {
            all = this.unitofWork.SalesMasterRepository.GetSalesMaster().ToList();
         }
         catch (Exception ex)
         {
            all = new List<SalesMasterVM>();
         }
         return all;
      }
      [HttpGet("GetAll")]
      public IEnumerable<SalesMaster> GetAll()
      {
         List<SalesMaster> all = new List<SalesMaster>();
         try
         {
            all = this.unitofWork.SalesMasterRepository.GetAll(null, null).ToList();
         }
         catch (Exception ex)
         {
            all = new List<SalesMaster>();
         }
         return all;
      }
      [HttpGet("GetByID")]
      public IEnumerable<SalesMaster> GetByID(int Id)
      {
         List<SalesMaster> all = new List<SalesMaster>();
         try
         {
           all = this.unitofWork.SalesMasterRepository.GetByID(t => t.ID.Equals(Id)).ToList();
         }
         catch (Exception ex)
         {
            all = new List<SalesMaster>();
         }
         return all;
      }
      [HttpPost("SaveSalesMaster")]
      public IActionResult Save(SalesMasterVM entity)
      {
         SalesMaster obj = new SalesMaster()
         {
            SalesDate = entity.SalesDate,  
            BillNo = entity.BillNo,  
            Convence = entity.Convence,
            CreatedBy = entity.CreatedBy,  
            CreatedDate = DateTime.Now,
            CustomerID = entity.CustomerID,  
            Due = entity.Due,
            EntryBy = entity.EntryBy,  
            EntryDate = entity.EntryDate, 
            PaymentMode = entity.PaymentMode,
            Note = entity.Note,  
            Packing = entity.Packing,  
            Paidamount = entity.Paidamount,
            VoucherNo = entity.VoucherNo,
            TVatamount = entity.TVatamount,  
            TVatrate = entity.TVatrate,
            TDiscountamount = entity.TDiscountamount,  
            TDiscountrate = entity.TDiscountrate,
            TotalPrice = entity.TotalPrice,
            TotalQuantity = entity.TotalQuantity,
            inBranchsId = entity.inBranchsId,   
            insId = entity.insId,
            IsActive = true, 
         };
         try
         {
            this.unitofWork.SalesMasterRepository.Add(obj);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = entity, result = m });
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
      [HttpPost("SaveSales")]
      public IActionResult SaveSales(Sales entity)
    {
        //Sales obj = new Sales()
        //{
        //    SalesDate = entity.SalesDate,
        //    CreatedBy = entity.CreatedBy,
        //    CustomerId = entity.CustomerId, 
        //    SupplierId = entity.SupplierId,
        //    UpdatedBy = entity.UpdatedBy,
        //};
        try
        {
            this.unitofWork.SalesRepository.Add(entity);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
                return Ok(new { Data = entity, result = m });
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
      [HttpPut("UpdateSalesMaster")]
      public IActionResult Update(SalesMaster entity)
      {
         var data = unitofWork.SalesMasterRepository.GetByID(t => t.ID.Equals(entity.ID)).ToList();
         if (data == null)
         {
            throw new Exception("Data Not Found");
         };
         SalesMaster obj = new SalesMaster()
         {
            SalesDate = entity.SalesDate,
            TDiscountamount = entity.TDiscountamount,
            BillNo = entity.BillNo,
            Convence = entity.Convence,
            CreatedDate = DateTime.Now,
            CustomerID = entity.CustomerID,
            CreatedBy = entity.CreatedBy,
            Due = entity.Due,
            UpdatedDate = DateTime.Now,
            EntryDate = entity.EntryDate, 
            TDiscountrate = entity.TDiscountrate,
            EntryBy = entity.EntryBy,
            inBranchsId = entity.inBranchsId,
            insId = entity.insId,
            IsActive = true,
            Packing = entity.Packing,
            Note = entity.Note,
            TotalPrice = entity.TotalPrice,
            TotalQuantity = entity.TotalQuantity,
            TVatamount = entity.TVatamount,
            VoucherNo = entity.VoucherNo,
            TVatrate = entity.TVatrate,
            Paidamount = entity.Paidamount,
            PaymentMode = entity.PaymentMode,
            UpdatedBy = entity.UpdatedBy
         };
         try
         { 
            this.unitofWork.SalesMasterRepository.Update(obj);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = entity, result = m });
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
      [HttpDelete]
      [Route("DeleteRange")]
      public void DeleteRangs(IEnumerable<SalesMaster> entities)
      {
         this.unitofWork.SalesMasterRepository.DeleteRange(entities);
         this.unitofWork.Save();
      }
      [HttpDelete]
      [Route("Delete")] 
      public IActionResult Delete(int id)
      {
         try
         {
            this.unitofWork.SalesMasterRepository.DeletebyID(t => t.ID.Equals(id));
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
      [HttpGet("GetInitialSalesMasterData")]
      public JsonResult GetInitialProductData()
      {
         dynamic result = new ExpandoObject();
         try
         {
            result.institute = this.unitofWork.InstituteRepository.GetAll(null, null).ToList();
            result.branches = this.unitofWork.InstituteBranchRepository.GetAll(null, null).ToList();
            result.customer = this.unitofWork.BusinessPartnerRepository.GetBusinessPartner().ToList();
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
