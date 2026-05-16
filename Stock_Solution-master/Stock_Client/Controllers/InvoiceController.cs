using Microsoft.AspNetCore.Mvc;

namespace Stock_Client.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly ILogger<InvoiceController> _logger;

        public InvoiceController(ILogger<InvoiceController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Autocomplete()
        {
            return View();
        }
    }
}
