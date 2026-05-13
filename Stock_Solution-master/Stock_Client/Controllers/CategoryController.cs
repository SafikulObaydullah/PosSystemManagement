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
    public class CategoryController : Controller
    {
         private readonly ILogger<HomeController> _logger;   
         string baseUri = "https://localhost:7065/api/Category";
         public CategoryController(ILogger<HomeController> logger)
           {
               _logger = logger;  
           } 

         private List<CategoryVM> GetallCategory()
         {
            List<CategoryVM> list = new List<CategoryVM>();
            using (var client = new HttpClient())
            {
               try
               {
                  var result = client.GetAsync(baseUri).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     //list = result.Content.ReadAsAsync<List<CategoryVM>>().Result;
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
         public IActionResult GetDocument()
         {
            return View();
         }
         public IActionResult Category()
         {
            return View();
         }
        public IActionResult CategoryList()
        {
            return View();
        }
        public IActionResult AddCategory()
        {
            return View();
        }
        public IActionResult SubCategoryList()
        {
            List<SubCategoryVM> list = new List<SubCategoryVM>();
            using (var client = new HttpClient())
            {
                try
                {
                    var result = client.GetAsync(baseUri + "/GetSubCategoryList").Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var responseObject = result.Content.ReadFromJsonAsync<ResponseObject>().Result;
                        if (responseObject != null)
                        {
                            list = responseObject.SubCategoryList;
                        }
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
                    // Any cleanup code
                }
            }
            return View(list);
        }

        public class ResponseObject
        {
            public List<SubCategoryVM> SubCategoryList { get; set; }
        }
        public IActionResult AddSubCategory()
        {
            return View();
        }
        public IActionResult BrandList()
        {
            return View();
        }
        public IActionResult AddBrand()
        {
            return View();
        }
    }
}