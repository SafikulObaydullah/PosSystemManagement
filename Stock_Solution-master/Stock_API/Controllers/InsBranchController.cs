using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stock_API.Utility;
using Stock_API.ViewModels;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using System.Net.Http.Headers;
using System.Text;


namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Powersoft")]
    public class InsBranchController : ControllerBase
    {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public InsBranchController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
        }
       
        [HttpGet("GetInstituteBrach")]
        public IEnumerable<InsBranch> GetAll()
        {
            List<InsBranch> all = new List<InsBranch>();
            try
            {
               all = this.unitofWork.InstituteBranchRepository.GetAll(null, null).ToList();
            }
            catch (Exception ex)
            {
                all = new List<InsBranch>();
            } 
            return all;
        }
        [HttpPost("SaveInstituteBranch")]
        public IActionResult SaveInstituteBranch(InsBranch institutebranch)
        {
            try
            {
                this.unitofWork.InstituteBranchRepository.Add(institutebranch);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = institutebranch, result = m });
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
        [HttpPut("UpdateInstituteBranch")]
        public IActionResult UpdateInstituteBranch(InsBranch institutebranch)
        {
            try
            {
               this.unitofWork.InstituteBranchRepository.Update(institutebranch);
               var m = this.unitofWork.Save();
               if (m.IsSuccess)
               {
                  return Ok(new { Data = institutebranch, result = m });
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
        public void DeleteRangs(IEnumerable<InsBranch> entities)
        {
            this.unitofWork.InstituteBranchRepository.DeleteRange(entities);
            this.unitofWork.Save(); 
        }
    }
}
