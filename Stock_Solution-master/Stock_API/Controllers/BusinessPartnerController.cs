using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stock_API.Utility;
using Stock_API.ViewModels;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System.Dynamic;
 


namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Powersoft")]
    public class PaymentMethodController : ControllerBase
    {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public PaymentMethodController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
        } 
        [HttpGet] 
        public IEnumerable<PaymentMethodVM> GetAll()
        {
            List<PaymentMethodVM> all = new List<PaymentMethodVM>();
            try
            {
               all = this.unitofWork.PaymentMethodRepository.GetPaymentMethod().ToList();
            }
            catch (Exception ex)
            {
                all = new List<PaymentMethodVM>();
            } 
            return all;
        }
       
      [HttpGet("GetByID")]
      public IEnumerable<PayMethod> GetByID(int Id)
      {
         List<PayMethod> all = new List<PayMethod>();
         try
         {
            all = this.unitofWork.PaymentMethodRepository.GetByID(t => t.Id.Equals(Id)).ToList();
         }
         catch (Exception ex)
         {
            all = new List<PayMethod>();
         }
         return all;
      }

  
      [HttpPost("SavePaymentMethod")]
        public IActionResult SavePaymentMethod(PaymentMethodVM entity)
        {
            PayMethod obj = new PayMethod()
            {
               Name = entity.Name,
               AccountNumber = entity.AccountNumber,
               Description = entity.Description,
               InsId = entity.InsId,   
               InBranchsId = entity.InBranchsId,   
            };
            try
            {
                this.unitofWork.PaymentMethodRepository.Add(obj);
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
            catch(Exception ex)
            {
                return Problem(ex.Message);
            }
        } 
        [HttpDelete]
        [Route("DeleteRange")]
        public void DeleteRangs(IEnumerable<PayMethod> entities)
        {
            this.unitofWork.PaymentMethodRepository.DeleteRange(entities);
            this.unitofWork.Save(); 
        }
        [HttpPut("UpdatePaymentMethod")]
         public IActionResult Update(PaymentMethodVM paymentMethod)
         {
            var data = unitofWork.PaymentMethodRepository.GetByID(t => t.Id.Equals(paymentMethod.Id)).FirstOrDefault();
            if (data == null)
            {
               throw new Exception("Data Not Found");
            };
            data.Name = paymentMethod.Name;
            data.AccountNumber = paymentMethod.AccountNumber;
            try
            {
               this.unitofWork.PaymentMethodRepository.Update(data);
               var m = this.unitofWork.Save();
               if (m.IsSuccess)
               {
                  return Ok(new { Data = data, result = m });
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
         [Route("DeletePaymentMethod")]
         public IActionResult DeletePaymentMethod(int id)
         {
            try
            {
               this.unitofWork.PaymentMethodRepository.DeletebyID(t => t.Id.Equals(id));
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
         [HttpGet("GetInitialPaymentMethodData")]
         public JsonResult GetInitialPaymentMethodData()
         {
            dynamic result = new ExpandoObject();
            try
            {
               result.institute = this.unitofWork.InstituteRepository.GetAll(null, null).ToList();
               result.branches = this.unitofWork.InstituteBranchRepository.GetAll(null, null).ToList();
               result.categories = this.unitofWork.CategoryRepository.GetCategory().ToList();
               result.units = this.unitofWork.UnitRepository.GetUnit().ToList(); 
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
