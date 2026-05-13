using Microsoft.AspNetCore.Mvc;
using Stock_Client.Models;
using System.Diagnostics;

namespace Stock_Client.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        public IActionResult Dashboard()
        {
            return View();
        }
        public IActionResult DashboardDetail()
        {
            return View();
        }
        public IActionResult HomeIndex()
        {
            return View();
        }
        public IActionResult HomePage()
        {
            return View();
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Editable()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult ProductDetails()
        {
            return View();
        }
    }
}