using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Stock_Client.Models;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
//using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System.Diagnostics;
using System.Net.Http;

namespace Stock_Client.Controllers
{
    public class ProductController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<HomeController> _logger;  
         public ProductController(ILogger<HomeController> logger)
         {
            _logger = logger; 
        }

        //public ProductController()
        //{
        //}test ccccc
         string baseUri = "https://localhost:7065/api/Product";
         private List<ProductVM> GetallProduct()
         {
            List<ProductVM> list = new List<ProductVM>();
            using (var client = new HttpClient())
            {
               try
               {
                  var result = client.GetAsync(baseUri).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     list = result.Content.ReadFromJsonAsync<List<ProductVM>>().Result;

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

            return View(GetallProduct());
         }
         public List<ProductVM> GetProduct()
         {
            List<ProductVM> list = new List<ProductVM>();
            list = GetallProduct();
            list = list.OrderBy(e => e.Name).ToList();
            return list;
         }
        //public IActionResult ProductList()
        //{
        //    //var allMovies = await _service.GetAllAsync(n => n.Cinema);
        //    //return View(allMovies);
        //    return View();
        //} 
        public IActionResult ProductList()
        {
            List<Movie> list = new List<Movie>();
            using (var client = new HttpClient())
            {
                try
                {
                    var result = client.GetAsync(baseUri + "/GetAllMovies").Result;
                    if (result.IsSuccessStatusCode)
                    {
                        list = result.Content.ReadFromJsonAsync<List<Movie>>().Result;

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
            //return list;
            return View(list);

        }
        public IActionResult ListCardProducts()
        {
            return View();
        } 
        public IActionResult AddProduct()
        {
            
            return View(); 
        }
        public async Task<IActionResult> ProductDetailList()
        {  
            List<ProductDetailModel> list = new List<ProductDetailModel>();
            using (var client = new HttpClient())
            {
                try
                {
                    var result = client.GetAsync(baseUri + "/ProblemDetails").Result;
                    if (result.IsSuccessStatusCode)
                    {
                        list = result.Content.ReadFromJsonAsync<List<ProductDetailModel>>().Result;

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
            return View(list);
        }
        public IActionResult ImportProduct()
        {
            return View();
        }
        public IActionResult Barcode()
        {
            return View();
        }
    }
}