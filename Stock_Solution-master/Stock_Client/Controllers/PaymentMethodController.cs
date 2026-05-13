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
    public class PaymentMethodController : Controller
    {
         private readonly ILogger<HomeController> _logger;  
         public PaymentMethodController(ILogger<HomeController> logger)
         {
            _logger = logger;  
         }
         public PaymentMethodController()
         {
         }

         string baseUri = "https://localhost:7065/api/PaymentMethod";
         private List<PaymentMethodVM> GetallPaymentMethod()
         {
            List<PaymentMethodVM> list = new List<PaymentMethodVM>();
            using (var client = new HttpClient())
            {
               try
               {
                  var result = client.GetAsync(baseUri).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     list = result.Content.ReadFromJsonAsync<List<PaymentMethodVM>>().Result;

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
         // GET: HomeWorks
         public ActionResult Index()
         {

            return View(GetallPaymentMethod());
         }
         public List<PaymentMethodVM> GetPaymentMethod()
         {
            List<PaymentMethodVM> list = new List<PaymentMethodVM>();
            list = GetallPaymentMethod();
            list = list.OrderBy(e => e.Name).ToList();
            return list;
         }

   }
}