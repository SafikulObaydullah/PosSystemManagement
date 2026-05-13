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
    public class CashInoutTransactionController : Controller
    {
         private readonly ILogger<HomeController> _logger;   
         string baseUri = "https://localhost:7065/api/Category";
         public CashInoutTransactionController(ILogger<HomeController> logger)
           {
               _logger = logger;  
           } 

         
         public IActionResult Index()
         {
            return View();
         }
         public IActionResult Category()
         {
            return View();
         }
   }
}