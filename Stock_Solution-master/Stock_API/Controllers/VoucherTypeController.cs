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
    public class VoucherTypeController : ControllerBase
    {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public VoucherTypeController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
        } 
        [HttpGet("GetVoucherType")] 
        public IEnumerable<VoucherTypes> GetAll()
        {
            List<VoucherTypes> all = new List<VoucherTypes>();
            try
            {
                    all = this.unitofWork.VoucherRepository.GetAll(null, null).ToList();
            }
            catch (Exception ex)
            {
                all = new List<VoucherTypes>();
            } 
            return all;
        } 
        [HttpPost("SaveVoucherType")]
        public IActionResult SaveVoucherType(VoucherTypes voucher)
        { 
            try
            {
                this.unitofWork.VoucherRepository.Add(voucher);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = voucher, result = m });
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
        [HttpPut("UpdateVoucherType")]
        public IActionResult Update(VoucherTypes voucherType)
      {
         try
         {
            this.unitofWork.VoucherRepository.Update(voucherType);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = voucherType, result = m });
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
        public void DeleteRangs(IEnumerable<VoucherTypes> entities)
        {
            this.unitofWork.VoucherRepository.DeleteRange(entities);
            this.unitofWork.Save(); 
        }
    }
}
