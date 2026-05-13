//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Stock_API.Utility;
//using Stock_DataAccess.Models;
//using Stock_DataAccess.Repositories;

//namespace Stock_API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CashInoutController : ControllerBase
//    {
//        private IUnitofWork unitofWork;
//        ModelsMessage modelsMessage;
//        private readonly UserManager<ApplicationUser> _userManager;
//        public CashInoutController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
//        {
//            this.unitofWork = unitofWork;
//            modelsMessage = new ModelsMessage();
//            _userManager = userManager;
//        }

//        [HttpGet("CashInOutTransaction")]
//        public IEnumerable<CashInOutTransaction> CashInOutTransaction()
//        {
//            List<CashInOutTransaction> all = new List<CashInOutTransaction>();
//            try
//            {
//                all = this.unitofWork.CashInoutRepository.GetAll(null, null).ToList();
//            }
//            catch (Exception ex)
//            {
//                all = new List<CashInOutTransaction>();
//            }
//            return all;
//        }
//        [HttpPost("SaveCashInOutTransaction")]
//        public IActionResult SaveCashInOutTransaction(CashInOutTransaction CashInOutTransaction)
//        {
//            try
//            {
//                this.unitofWork.CashInoutRepository.Add(CashInOutTransaction);
//                var m = this.unitofWork.Save();
//                if (m.IsSuccess)
//                {
//                    return Ok(new { Data = CashInOutTransaction, result = m });
//                }
//                else
//                {
//                    return Problem(m.Message);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Problem(ex.Message);
//            }
//        }
//        [HttpPut("UpdateCashInOutTransaction")]
//        public IActionResult UpdateCashInOutTransaction(CashInOutTransaction CashInOutTransaction)
//        {
//            try
//            {
//                this.unitofWork.CashInoutRepository.Update(CashInOutTransaction);
//                var m = this.unitofWork.Save();
//                if (m.IsSuccess)
//                {
//                    return Ok(new { Data = CashInOutTransaction, result = m });
//                }
//                else
//                {
//                    return Problem(m.Message);
//                }
//            }
//            catch (Exception ex)
//            {
//                return Problem(ex.Message);
//            }
//        }
//        [HttpDelete]
//        [Route("DeleteRange")]
//        public void DeleteRangs(IEnumerable<CashInOutTransaction> entities)
//        {
//            this.unitofWork.CashInoutRepository.DeleteRange(entities);
//            this.unitofWork.Save();
//        }

//    }
//}
