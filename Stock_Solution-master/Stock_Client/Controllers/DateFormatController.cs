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
    public class DateFormatController : Controller
    {
         private readonly ILogger<HomeController> _logger;   
         string baseUri = "https://localhost:7065/api/DateTimeFormat";
         public DateFormatController(ILogger<HomeController> logger)
           {
               _logger = logger;  
           } 

         private List<DateTimeFormatVM> GetallCategory()
         {
            List<DateTimeFormatVM> list = new List<DateTimeFormatVM>();
            using (var client = new HttpClient())
            {
               try
               {
                  var result = client.GetAsync(baseUri).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     list = result.Content.ReadFromJsonAsync<List<DateTimeFormatVM>>().Result;
                  }
                  else
                  {
                     ModelState.AddModelError("", "Retrieve failed");
                  }
               }
               catch (Exception ex)
               {
                  ModelState.AddModelError("", ex.Message);
               }
               finally
               {

               }
            }
            return list;

         }
         public IActionResult Index()
         {
            return View();
         }
        public IActionResult JqueryDemo()
        {
            return View();
        }
        public IActionResult Category()
         {
            return View();
         }
        public IActionResult EditableRow()
        {
            return View();
        }
        public IActionResult CreateSlider() 
        {
            return View();
        } 
    }
}