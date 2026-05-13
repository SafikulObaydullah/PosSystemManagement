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

namespace POS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("POS")]
    public class CustomerController : ControllerBase
    {
        private IUnitofWork _unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public CustomerController(IUnitofWork unitofWork)
        {
            _unitofWork = unitofWork;
        }

        // GET: api/Customer
        [HttpGet]
        public IEnumerable<CustomerVM> GetAll()
        {
            List<CustomerVM> all = new List<CustomerVM>();
            try
            {
                all = _unitofWork.CustomerReposity.GetCustomer().ToList();
            }
            catch (Exception)
            {
                all = new List<CustomerVM>();
            }
            return all;
        } 
        [HttpGet("GetByID")]
        public IEnumerable<Customer> GetByID(int Id)
        {
            List<Customer> all = new List<Customer>();
            try
            {
                all = _unitofWork.CustomerReposity.GetByID(t => t.Id.Equals(Id)).ToList();
            }
            catch (Exception)
            {
                all = new List<Customer>();
            }
            return all;
        }
         
        [HttpGet("Search")]
        public IActionResult Search(string term)
        {
            var customers = _unitofWork.CustomerReposity.GetCustomer();

            if (!string.IsNullOrWhiteSpace(term))
            {
                term = term.ToLower();

                customers = customers.Where(c =>
                    (!string.IsNullOrEmpty(c.FirstName) && c.FirstName.ToLower().Contains(term)) ||
                    (!string.IsNullOrEmpty(c.LastName) && c.LastName.ToLower().Contains(term)) ||
                    (!string.IsNullOrEmpty(c.Phone) && c.Phone.ToLower().Contains(term)) ||
                    (!string.IsNullOrEmpty(c.Email) && c.Email.ToLower().Contains(term)) ||
                    (!string.IsNullOrEmpty(c.Address) && c.Address.ToLower().Contains(term)) ||
                    (!string.IsNullOrEmpty(c.City) && c.City.ToLower().Contains(term)) ||
                    (!string.IsNullOrEmpty(c.CustomerType) && c.CustomerType.ToLower().Contains(term)) ||
                    (!string.IsNullOrEmpty(c.Notes) && c.Notes.ToLower().Contains(term))
                ).ToList();
            }

            return Ok(customers);
        }

        // POST: api/Customer/SaveCustomer
        [HttpPost("SaveCustomer")]
        public IActionResult SaveCustomer(CustomerVM entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Customer obj = new Customer()
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Phone = entity.Phone,
                Email = entity.Email,
                Address = entity.Address,
                City = entity.City, 
                State = entity.State,
                ZipCode = entity.ZipCode,
                Country = entity.Country,
                CreditLimit = entity.CreditLimit,
                CurrentBalance = entity.CurrentBalance,
                CustomerType = entity.CustomerType,
                Notes = entity.Notes,
                IsActive = entity.IsActive,
                CreatedDate = DateTime.UtcNow, 
                UpdatedBy = "Admin",
                CreatedBy = "Admin"
            };

            try
            {
                _unitofWork.CustomerReposity.Add(obj);
                var m = _unitofWork.Save();
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

        // PUT: api/Customer/UpdateCustomer
        [HttpPut("UpdateCustomer")]
        public IActionResult UpdateCustomer(CustomerVM customerVM)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var data = _unitofWork.CustomerReposity
                .GetByID(t => t.Id.Equals(customerVM.Id))
                .FirstOrDefault();

            if (data == null)
                return NotFound(new { Message = "Customer not found" });

            data.FirstName = customerVM.FirstName;
            data.LastName = customerVM.LastName;
            data.Phone = customerVM.Phone;
            data.Email = customerVM.Email;
            data.Address = customerVM.Address;
            data.City = customerVM.City; 
            data.CreditLimit = customerVM.CreditLimit;
            data.CustomerType = customerVM.CustomerType;
            data.Notes = customerVM.Notes;
            data.IsActive = customerVM.IsActive;
            data.UpdatedDate = DateTime.UtcNow;

            try
            {
                _unitofWork.CustomerReposity.Update(data);
                var m = _unitofWork.Save();
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

        // DELETE: api/Customer/DeleteCustomer?id=1
        [HttpDelete("DeleteCustomer")]
        public IActionResult DeleteCustomer(int id)
        {
            try
            {
                _unitofWork.CustomerReposity.DeletebyID(t => t.Id.Equals(id));
                var m = _unitofWork.Save();
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

        // DELETE: api/Customer/DeleteRange
        [HttpDelete]
        [Route("DeleteRange")]
        public void DeleteRange(IEnumerable<Customer> entities)
        {
            _unitofWork.CustomerReposity.DeleteRange(entities);
            _unitofWork.Save();
        }

        // GET: api/Customer/GetInitialCustomerData
        [HttpGet("GetInitialCustomerData")]
        public JsonResult GetInitialCustomerData()
        {
            dynamic result = new ExpandoObject();
            try
            {
                result.institute = _unitofWork.InstituteRepository.GetAll(null, null).ToList();
                result.branches = _unitofWork.InstituteBranchRepository.GetAll(null, null).ToList();
                result.customerTypes = new List<string> { "Retail", "Wholesale", "VIP", "Corporate" };
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
