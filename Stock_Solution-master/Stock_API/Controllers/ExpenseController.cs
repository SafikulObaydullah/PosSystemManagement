using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stock_API.Utility;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;

namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public ExpenseController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
        }

        [HttpGet("GetExpense")]
        public IEnumerable<Expense> GetExpense()
        {
            List<Expense> all = new List<Expense>();
            try
            {
                all = this.unitofWork.ExpensesRepository.GetAll(null, null).ToList();
            }
            catch (Exception ex)
            {
                all = new List<Expense>();
            }
            return all;
        }
        [HttpPost("Saveexpense")]
        public IActionResult Saveexpense(Expense expense)
        {
            try
            {
                this.unitofWork.ExpensesRepository.Add(expense);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = expense, result = m });
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
        [HttpPut("Updateexpense")]
        public IActionResult Updateexpense(Expense expense)
        {
            try
            {
                this.unitofWork.ExpensesRepository.Update(expense);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = expense, result = m });
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
        public void DeleteRangs(IEnumerable<Expense> entities)
        {
            this.unitofWork.ExpensesRepository.DeleteRange(entities);
            this.unitofWork.Save();
        }

    }
}
