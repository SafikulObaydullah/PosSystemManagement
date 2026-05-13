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
    public class VoucherTypeController : Controller
    {
         private readonly ILogger<HomeController> _logger;   
         public VoucherTypeController(ILogger<HomeController> logger )
         {
            _logger = logger;  
         }

      public VoucherTypeController()
      {
      }

      string baseUri = "https://localhost:7065/api/VoucherType/GetVoucherType";
         private List<VoucherTypes> GetallBusinessPartner()
         {
            List<VoucherTypes> list = new List<VoucherTypes>();
            using (var client = new HttpClient())
            {
               try
               {
                  var result = client.GetAsync(baseUri).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     list = result.Content.ReadFromJsonAsync<List<VoucherTypes>>().Result;

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
         public ActionResult Index()
         {

            return View(GetallBusinessPartner());
         }
         public List<VoucherTypes> GetVoucherType()
         {
            List<VoucherTypes> list = new List<VoucherTypes>();
            list = GetallBusinessPartner();
            list = list.OrderBy(e => e.VoucharName).ToList();
            return list;
         }
   }
}