using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Stock_Client.Models;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
//using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System.Diagnostics;

namespace Stock_Client.Controllers
{
    public class SalesMasterController : Controller
    {
         private readonly ILogger<HomeController> _logger;  
         public SalesMasterController(ILogger<HomeController> logger)
         {
            _logger = logger;  
         }  
         public IActionResult Index()
         {
            return View();
         } 
         public IActionResult SalesDetails()
         {
            return View();
         }
        public IActionResult SalesList()
        {
            return View();
        }
        public IActionResult PosDetail()
        {
            return View();
        }
        public IActionResult SalesReturnList()
        {
            return View();
        }
        public IActionResult CreateSalesReturn()
        {
            return View();
        }
        public IActionResult AddSales()
        {
            return View();
        }
    }
}