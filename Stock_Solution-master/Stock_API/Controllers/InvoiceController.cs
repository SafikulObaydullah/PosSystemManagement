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
using System.Xml.Linq;


namespace Stock_API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   [EnableCors("Powersoft")]
   public class InvoiceController : ControllerBase
   {
      private IUnitofWork unitofWork;
      ModelsMessage modelsMessage;
      private readonly UserManager<ApplicationUser> _userManager;
      public InvoiceController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
      {
         this.unitofWork = unitofWork;
         modelsMessage = new ModelsMessage();
         _userManager = userManager;
      } 
      [HttpGet("GetInvoice")]
      public IEnumerable<InvoiceVM> GetAll(string? VehicleName)
      {
         List<InvoiceVM> all = new List<InvoiceVM>();
         try
         { 
            all = this.unitofWork.InvoiceRepository.GetInvoice(VehicleName).ToList();
         }
         catch (Exception ex)
         {
            all = new List<InvoiceVM>();
         }
         return all;
      }
      [HttpGet("GetByID")]
      public IEnumerable<Invoice> GetByID(int Id)
      {
         List<Invoice> all = new List<Invoice>();
         try
         {
           all = this.unitofWork.InvoiceRepository.GetByID(t => t.Id.Equals(Id)).ToList();
         }
         catch (Exception ex)
         {
            all = new List<Invoice>();
         }
         return all;
      } 
      [HttpPost("GetVehicleNameList")]
      public JsonResult GetVehicleNameList(string prefix)
      {
         dynamic result = new ExpandoObject();
         try 
         {
            result.dataList = this.unitofWork.ProductRepository.GetVehicleNameList(prefix); 
         }
         catch (Exception ex)
         {
            ModelState.AddModelError("Failed", ex.Message);
         }
         return Json(result);
      }
      [HttpPost("GetProductListByVehicleId")]
      public JsonResult GetProductListByVehicleId(int Id)
      {
         dynamic result = new ExpandoObject();
         try
         {
            result.produtList = this.unitofWork.ProductRepository.GetProductListByVehicleId(Id);
         }
         catch (Exception ex)
         {
            ModelState.AddModelError("Failed", ex.Message);
         }
         return Json(result);
      }
        [HttpPost("GetProductListById")]
        public JsonResult GetProductListById(long Id)
        {
            dynamic result = new ExpandoObject();
            try
            {
                result.produtList = this.unitofWork.ProductRepository.GetProductById(Id);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Failed", ex.Message);
            }
            return Json(result);
        }
        
        [HttpPost("SaveInvoice")]
      public IActionResult Save(Invoice invoice)
      {
         try
         {
            this.unitofWork.InvoiceRepository.Add(invoice);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = invoice, result = m });
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
      [HttpPut("UpdateInvoice")]
      public IActionResult Update(Invoice invoice)
      {
         try
         { 
            this.unitofWork.InvoiceRepository.Update(invoice);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = invoice, result = m });
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
      public void DeleteRangs(IEnumerable<Invoice> entities)
      {
         this.unitofWork.InvoiceRepository.DeleteRange(entities);
         this.unitofWork.Save();
      }
      [HttpDelete]
      [Route("Delete")] 
      public IActionResult Delete(int id)
      {
         try
         {
            this.unitofWork.UnitRepository.DeletebyID(t => t.Id.Equals(id));
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
            result.VehicletList = this.unitofWork.ProductRepository.GetDropdownVehicleNameList().ToList(); 
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
