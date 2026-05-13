using Microsoft.AspNetCore.Mvc;

namespace Stock_Client.Controllers
{
    public class PosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Add more actions as needed, e.g., Checkout, ProductSearch, etc.
    }
}