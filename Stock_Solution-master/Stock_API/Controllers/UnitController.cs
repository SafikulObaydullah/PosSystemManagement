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
   public class UnitController : ControllerBase
   {
      private IUnitofWork unitofWork;
      ModelsMessage modelsMessage;
      private readonly UserManager<ApplicationUser> _userManager;
      public UnitController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
      {
         this.unitofWork = unitofWork;
         modelsMessage = new ModelsMessage();
         _userManager = userManager;
      } 
      [HttpGet("GetUnit")]
      public IEnumerable<UnitVM> GetAll()
      {
         List<UnitVM> all = new List<UnitVM>();
         try
         {
            //all = this.unitofWork.UnitRepository.GetAll(null, null).ToList();
            all = this.unitofWork.UnitRepository.GetUnit().ToList();
         }
         catch (Exception ex)
         {
            all = new List<UnitVM>();
         }
         return all;
      }
      [HttpGet("GetByID")]
      public IEnumerable<Unit> GetByID(int Id)
      {
         List<Unit> all = new List<Unit>();
         try
         {
           all = this.unitofWork.UnitRepository.GetByID(t => t.Id.Equals(Id)).ToList();
         }
         catch (Exception ex)
         {
            all = new List<Unit>();
         }
         return all;
      }
      [HttpPost("SaveUnit")]
      public IActionResult Save(Unit Unit)
      {
         try
         {
            this.unitofWork.UnitRepository.Add(Unit);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = Unit, result = m });
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
      [HttpPut("UpdateUnit")]
      public IActionResult Update(Unit Unit)
      {
         try
         { 
            this.unitofWork.UnitRepository.Update(Unit);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = Unit, result = m });
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
      public void DeleteRangs(IEnumerable<Unit> entities)
      {
         this.unitofWork.UnitRepository.DeleteRange(entities);
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
            //result.institute = this.unitofWork.UnitRepository.GetUnit().ToList();
            result.institute = this.unitofWork.InstituteRepository.GetAll(null,null).ToList();
            result.insBranch = this.unitofWork.InstituteBranchRepository.GetAll(null, null).ToList();
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
