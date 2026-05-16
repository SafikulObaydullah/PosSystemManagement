using Microsoft.AspNetCore.Mvc;
using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System.Text;
using System.Text.Json;

namespace Stock_Client.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly ILogger<InvoiceController> _logger;
        private readonly IConfiguration _configuration;
        private readonly string baseUri;
        private readonly string invoiceEndpoint;

        public InvoiceController(ILogger<InvoiceController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            baseUri = _configuration.GetValue<string>("Stock_Client:applicationapi")
                      ?? "https://localhost:7065/api";
            invoiceEndpoint = $"{baseUri}/Invoice";
        }

        private List<InvoiceVM> GetAllInvoices()
        {
            List<InvoiceVM> list = new();
            try
            {
                using var client = new HttpClient();
                var result = client.GetAsync($"{invoiceEndpoint}/GetInvoice").Result;
                if (result.IsSuccessStatusCode)
                {
                    list = result.Content.ReadFromJsonAsync<List<InvoiceVM>>().Result
                           ?? new List<InvoiceVM>();
                }
                else
                {
                    ModelState.AddModelError("", "Failed to retrieve invoices from API.");
                    _logger.LogWarning("API returned {StatusCode} when fetching invoices.", result.StatusCode);
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                _logger.LogError(ex, "Error fetching invoices from API.");
            }

            return list;
        }

        public List<InvoiceVM> GetInvoices()
        {
            return GetAllInvoices()
                   .OrderByDescending(i => i.Id)
                   .ToList();
        }

        public IActionResult Index()
        {
            return View(GetInvoices());
        }

        public IActionResult Autocomplete()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAllInvoice()
        {
            return JsonPascal(GetInvoices());
        }

        [HttpGet]
        public IActionResult GetBySearch(string? term)
        {
            try
            {
                using var client = new HttpClient();
                var result = client.GetAsync($"{invoiceEndpoint}/Search?term={Uri.EscapeDataString(term ?? string.Empty)}").Result;
                if (result.IsSuccessStatusCode)
                {
                    var invoices = result.Content.ReadFromJsonAsync<List<InvoiceVM>>().Result
                                   ?? new List<InvoiceVM>();
                    return JsonPascal(invoices);
                }

                _logger.LogWarning("API returned {StatusCode} when searching invoices.", result.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching invoices.");
            }

            return JsonPascal(new List<InvoiceVM>());
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                using var client = new HttpClient();
                var result = client.GetAsync($"{invoiceEndpoint}/GetByID?Id={id}").Result;
                if (result.IsSuccessStatusCode)
                {
                    var invoices = result.Content.ReadFromJsonAsync<List<Invoice>>().Result
                                   ?? new List<Invoice>();
                    return JsonPascal(invoices);
                }

                _logger.LogWarning("API returned {StatusCode} when fetching invoice by ID.", result.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching invoice by ID.");
            }

            return JsonPascal(new List<Invoice>());
        }

        [HttpGet]
        public IActionResult GetInitialData()
        {
            return ProxyGet($"{invoiceEndpoint}/GetInitialData");
        }

        [HttpPost]
        public IActionResult GetProductListByVehicleId(int id)
        {
            return ProxyPost($"{invoiceEndpoint}/GetProductListByVehicleId?Id={id}", null);
        }

        [HttpPost]
        public IActionResult SaveInvoice([FromBody] Invoice invoice)
        {
            try
            {
                using var client = new HttpClient();
                var json = JsonSerializer.Serialize(invoice);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var result = client.PostAsync($"{invoiceEndpoint}/SaveInvoice", content).Result;
                if (result.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Invoice saved successfully!";
                }
                else
                {
                    TempData["Error"] = "Invoice save failed. Please try again.";
                    _logger.LogWarning("API returned {StatusCode} when saving invoice.", result.StatusCode);
                }

                return BuildProxyResponse(result);
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                _logger.LogError(ex, "Error saving invoice.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateInvoice([FromBody] Invoice invoice)
        {
            try
            {
                using var client = new HttpClient();
                var json = JsonSerializer.Serialize(invoice);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var result = client.PutAsync($"{invoiceEndpoint}/UpdateInvoice", content).Result;
                if (result.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Invoice updated successfully!";
                }
                else
                {
                    TempData["Error"] = "Invoice update failed. Please try again.";
                    _logger.LogWarning("API returned {StatusCode} when updating invoice.", result.StatusCode);
                }

                return BuildProxyResponse(result);
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                _logger.LogError(ex, "Error updating invoice.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteInvoice(int id)
        {
            try
            {
                using var client = new HttpClient();
                var result = client.DeleteAsync($"{invoiceEndpoint}/DeleteInvoice?id={id}").Result;
                if (result.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Invoice deleted successfully!";
                }
                else
                {
                    TempData["Error"] = "Invoice delete failed. Please try again.";
                    _logger.LogWarning("API returned {StatusCode} when deleting invoice.", result.StatusCode);
                }

                return BuildProxyResponse(result);
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                _logger.LogError(ex, "Error deleting invoice.");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private IActionResult ProxyGet(string url)
        {
            try
            {
                using var client = new HttpClient();
                var response = client.GetAsync(url).Result;
                return BuildProxyResponse(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Invoice API GET failed for {Url}", url);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private IActionResult ProxyPost(string url, object? data)
        {
            try
            {
                using var client = new HttpClient();
                var content = data == null
                    ? new StringContent(string.Empty)
                    : new StringContent(JsonSerializer.Serialize(data), Encoding.UTF8, "application/json");
                var response = client.PostAsync(url, content).Result;
                return BuildProxyResponse(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Invoice API POST failed for {Url}", url);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private IActionResult BuildProxyResponse(HttpResponseMessage response)
        {
            var content = response.Content.ReadAsStringAsync().Result;
            if (response.IsSuccessStatusCode)
            {
                return Content(content, "application/json");
            }

            return StatusCode((int)response.StatusCode, content);
        }

        private IActionResult JsonPascal(object data)
        {
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                PropertyNamingPolicy = null
            });
            return Content(json, "application/json");
        }
    }
}
