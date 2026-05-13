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
    public class BusinessPartnerController : Controller
    {
         private readonly ILogger<HomeController> _logger;  
         public BusinessPartnerController(ILogger<HomeController> logger)
         {
            _logger = logger;  
         } 
         public BusinessPartnerController()
         {

         }

         string baseUri = "https://localhost:7065/api/BusinessPartner";
         private List<BusinessPartnerVM> GetallBusinessPartner()
         {
            List<BusinessPartnerVM> list = new List<BusinessPartnerVM>();
            using (var client = new HttpClient())
            {
               try
               {
                  var result = client.GetAsync(baseUri).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     list = result.Content.ReadFromJsonAsync<List<BusinessPartnerVM>>().Result;

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
         public List<BusinessPartnerVM> GetBusinessPartner()
         {
            List<BusinessPartnerVM> list = new List<BusinessPartnerVM>();
            list = GetallBusinessPartner();
            list = list.OrderBy(e => e.Name).ToList();
            return list;
         } 
         //public List<BusinessPartnerVM> GetBusinessPartner()
         //{
         //   List<BusinessPartnerVM> list = new List<BusinessPartnerVM>();
         //   list = GetallBusinessPartner();
         //   list = list.OrderBy(e => e.Name).ToList();
         //   return list;
         //} 
    }
}