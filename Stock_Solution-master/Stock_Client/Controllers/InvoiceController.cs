using Microsoft.AspNetCore.Mvc;
using Stock_DataAccess.Models;
using System.Text;
using System.Text.Json;

namespace Stock_Client.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly ILogger<InvoiceController> _logger;
        private readonly string _invoiceEndpoint;

        public InvoiceController(ILogger<InvoiceController> logger, IConfiguration configuration)
        {
            _logger = logger;
            var baseUri = configuration.GetValue<string>("Stock_Client:applicationapi")
                          ?? "https://localhost:7065/api";
            _invoiceEndpoint = $"{baseUri}/Invoice";
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Autocomplete()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAllInvoice()
        {
            return ProxyGet($"{_invoiceEndpoint}/GetInvoice");
        }

        [HttpGet]
        public IActionResult GetBySearch(string? term)
        {
            return ProxyGet($"{_invoiceEndpoint}/Search?term={Uri.EscapeDataString(term ?? string.Empty)}");
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            return ProxyGet($"{_invoiceEndpoint}/GetByID?Id={id}");
        }

        [HttpGet]
        public IActionResult GetInitialData()
        {
            return ProxyGet($"{_invoiceEndpoint}/GetInitialData");
        }

        [HttpPost]
        public IActionResult GetProductListByVehicleId(int id)
        {
            return ProxyPost($"{_invoiceEndpoint}/GetProductListByVehicleId?Id={id}", null);
        }

        [HttpPost]
        public IActionResult SaveInvoice([FromBody] Invoice invoice)
        {
            return ProxyPost($"{_invoiceEndpoint}/SaveInvoice", invoice);
        }

        [HttpPut]
        public IActionResult UpdateInvoice([FromBody] Invoice invoice)
        {
            return ProxyPut($"{_invoiceEndpoint}/UpdateInvoice", invoice);
        }

        [HttpDelete]
        public IActionResult DeleteInvoice(int id)
        {
            return ProxyDelete($"{_invoiceEndpoint}/DeleteInvoice?id={id}");
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

        private IActionResult ProxyPut(string url, object data)
        {
            try
            {
                using var client = new HttpClient();
                var content = new StringContent(JsonSerializer.Serialize(data), Encoding.UTF8, "application/json");
                var response = client.PutAsync(url, content).Result;
                return BuildProxyResponse(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Invoice API PUT failed for {Url}", url);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private IActionResult ProxyDelete(string url)
        {
            try
            {
                using var client = new HttpClient();
                var response = client.DeleteAsync(url).Result;
                return BuildProxyResponse(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Invoice API DELETE failed for {Url}", url);
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
    }
}
