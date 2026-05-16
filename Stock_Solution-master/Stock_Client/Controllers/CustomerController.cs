using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stock_DataAccess.ViewModel;
using System.Text;
using System.Text.Json;

namespace POS_Client.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ILogger<CustomerController> _logger;
        IConfiguration _configuration;
        string SiteUrl = string.Empty; 
        private readonly string baseUri;
        private readonly string customerEndpoint;
        public CustomerController(ILogger<CustomerController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            baseUri = _configuration.GetValue<string>("Stock_Client:applicationapi")
                      ?? "https://localhost:7065/api";

            customerEndpoint = $"{baseUri}/Customer"; 
        }
        private List<CustomerVM> GetAllCustomers()
        {
            List<CustomerVM> list = new();
            try
            {
                using var client = new HttpClient();
                var result = client.GetAsync(customerEndpoint).Result;
                //var result = client.GetAsync(baseUri).Result;
                if (result.IsSuccessStatusCode)
                {
                    list = result.Content.ReadFromJsonAsync<List<CustomerVM>>().Result
                           ?? new List<CustomerVM>();
                }
                else
                {
                    ModelState.AddModelError("", "Failed to retrieve customers from API.");
                    _logger.LogWarning("API returned {StatusCode} when fetching customers.", result.StatusCode);
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                _logger.LogError(ex, "Error fetching customers from API.");
            }
            return list;
        }
        public List<CustomerVM> GetCustomers()
        {
            return GetAllCustomers()
                   .OrderBy(c => c.FirstName)
                   .ToList();
        }
        public IActionResult Index()
        {
            return View(GetCustomers());
        }

        [HttpGet]
        public IActionResult AddCustomer()
        { 
            var model = new CustomerVM
            {
                IsActive = true,
                CreatedDate = DateTime.Now,
                CustomerType = "Retail",
                Country = "Bangladesh"
            };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddCustomer(CustomerVM customer)
        {
            if (!ModelState.IsValid)
                return View(customer);

            try
            {
                using var client = new HttpClient();
                var json = JsonSerializer.Serialize(customer);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var result = client.PostAsync($"{baseUri}/SaveCustomer", content).Result;
                if (result.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Customer saved successfully!";
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("", "Save failed. Please try again.");
                    _logger.LogWarning("API returned {StatusCode} when saving customer.", result.StatusCode);
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                _logger.LogError(ex, "Error saving customer.");
            }

            return View(customer);
        }

        // ─────────────────────────────────────────────
        //  EDIT / UPDATE
        // ─────────────────────────────────────────────

        [HttpGet]
        public IActionResult EditCustomer(int id)
        {
            try
            {
                using var client = new HttpClient();
                var result = client.GetAsync($"{baseUri}/GetByID?Id={id}").Result;
                if (result.IsSuccessStatusCode)
                {
                    var list = result.Content.ReadFromJsonAsync<List<CustomerVM>>().Result;
                    var customer = list?.FirstOrDefault();
                    if (customer != null)
                        return View("AddCustomer", customer);
                }
                ModelState.AddModelError("", "Customer not found.");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                _logger.LogError(ex, "Error fetching customer by ID.");
            }
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditCustomer(CustomerVM customer)
        {
            if (!ModelState.IsValid)
                return View("AddCustomer", customer);

            try
            {
                using var client = new HttpClient();
                var json = JsonSerializer.Serialize(customer);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var result = client.PutAsync($"{baseUri}/UpdateCustomer", content).Result;
                if (result.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Customer updated successfully!";
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("", "Update failed. Please try again.");
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                _logger.LogError(ex, "Error updating customer.");
            }

            return View("AddCustomer", customer);
        }

        // ─────────────────────────────────────────────
        //  DELETE
        // ─────────────────────────────────────────────

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteCustomer(int id)
        {
            try
            {
                using var client = new HttpClient();
                // ✅ CORRECT
                var result = client.DeleteAsync($"{customerEndpoint}/DeleteCustomer?id={id}").Result;
                // Calls: https://localhost:7065/api/Customer/DeleteCustomer?id=1
                if (result.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Customer deleted successfully!";
                }
                else
                {
                    TempData["Error"] = "Delete failed. Please try again.";
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                _logger.LogError(ex, "Error deleting customer.");
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
