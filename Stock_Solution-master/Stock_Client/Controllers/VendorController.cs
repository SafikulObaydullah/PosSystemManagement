using Microsoft.AspNetCore.Mvc;

namespace Stock_Client.Controllers
{
    public class VendorController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
