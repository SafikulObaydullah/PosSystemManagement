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
    public class InstituteBranchController : Controller
    {
         private readonly ILogger<HomeController> _logger;  
         public InstituteBranchController(ILogger<HomeController> logger)
         {
            _logger = logger;  
         }  
         public IActionResult Index()
         {
            return View();
         } 
   }
}