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
using System.Net.Http.Headers;
using System.Text;
using System.Xml.Linq;


namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Powersoft")]
    public class BusinessPartnerController : ControllerBase
    {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public BusinessPartnerController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
        } 
        [HttpGet] 
        public IEnumerable<BusinessPartnerVM> GetAll()
        {
            List<BusinessPartnerVM> all = new List<BusinessPartnerVM>();
            try
            {
               all = this.unitofWork.BusinessPartnerRepository.GetBusinessPartner().ToList();
            }
            catch (Exception ex)
            {
                all = new List<BusinessPartnerVM>();
            } 
            return all;
        }

      //[HttpGet("GetByID")]
      //public IEnumerable<BusinessPartnerVM> GetByID(int Id)
      //{
      //    List<BusinessPartnerVM> all = new List<BusinessPartnerVM>();
      //    try
      //    {
      //       all = this.unitofWork.BusinessPartnerRepository.GetByID(t => t.ID.Equals(Id)).ToList();
      //    }
      //    catch (Exception ex)
      //    {
      //       all = new List<BusinessPartnerVM>();
      //    }
      //    return all;
      //}
      [HttpGet("GetByID")]
      public IEnumerable<BusinessPartner> GetByID(int Id)
      {
         List<BusinessPartner> all = new List<BusinessPartner>();
         try
         {
            all = this.unitofWork.BusinessPartnerRepository.GetByID(t => t.Id.Equals(Id)).ToList();
         }
         catch (Exception ex)
         {
            all = new List<BusinessPartner>();
         }
         return all;
      }

  
      [HttpPost("SaveBusinessPartner")]
        public IActionResult SaveBusinessPartner(BusinessPartnerVM entity)
        {
            BusinessPartner obj = new BusinessPartner()
            { 
               Name = entity.Name, 
               Address = entity.Address,
               ContactNo = entity.ContactNo,
               ContactDate = entity.ContactDate,
               ContactPerson = entity.ContactPerson,
               EntryBy = entity.EntryBy,
               EntryDate = entity.EntryDate,
               Mobile = entity.Mobile, 
               SubDistrictID = entity.SubDistrictID,  
               insId = entity.insId,
               inBranchsId = entity.inBranchsId,   
            };
            try
            {
                this.unitofWork.BusinessPartnerRepository.Add(obj);
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
        public void DeleteRangs(IEnumerable<BusinessPartner> entities)
        {
            this.unitofWork.BusinessPartnerRepository.DeleteRange(entities);
            this.unitofWork.Save(); 
        }
        [HttpPut("UpdateBusinessPartner")]
         public IActionResult Update(BusinessPartnerVM businessPartner)
         {
            var data = unitofWork.BusinessPartnerRepository.GetByID(t => t.Id.Equals(businessPartner.Id)).FirstOrDefault();
            if (data == null)
            {
               throw new Exception("Data Not Found");
            };
         data.Name = businessPartner.Name;
         data.Address = businessPartner.Address;
         data.ContactNo = businessPartner.ContactNo;
         data.ContactDate = businessPartner.ContactDate;
         data.ContactPerson = businessPartner.ContactPerson;
         data.Mobile = businessPartner.Mobile; 
            try
            {
               this.unitofWork.BusinessPartnerRepository.Update(data);
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
         [Route("DeleteBusinessPartner")]
         public IActionResult DeleteBusinessPartner(int id)
         {
            try
            {
               this.unitofWork.BusinessPartnerRepository.DeletebyID(t => t.Id.Equals(id));
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
         [HttpGet("GetInitialBusinessPartnerData")]
         public JsonResult GetInitialBusinessPartnerData()
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
