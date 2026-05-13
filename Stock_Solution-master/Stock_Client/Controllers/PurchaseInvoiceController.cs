using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Stock_Client.Models;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
//using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.NetworkInformation;

namespace Stock_Client.Controllers
{
    public class PurchaseInvoiceController : Controller
    {
         private readonly ILogger<HomeController> _logger;
         private readonly IUnitofWork _unitofWork;
         private readonly StockModel _context;
         public PurchaseInvoiceController(ILogger<HomeController> logger)
         {
            _logger = logger;   
         }
         string baseUri = "https://localhost:7065/api/PurchaseInvoice/GetInitialData";

        public object PdfGenerator { get; private set; }

        private List<BusinessPartnerVM> GetAllPurchaseInfo()
         {
            List<BusinessPartnerVM> list = new List<BusinessPartnerVM>();
            using (var client = new HttpClient())
            {
               try
               {
                  var result = client.GetAsync(baseUri).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     //list = result.Content.ReadAsAsync<List<BusinessPartnerVM>>().Result;
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
            return View(GetAllPurchaseInfo());
         }
         public List<BusinessPartnerVM> GetBusinessPartner()
         {
            List<BusinessPartnerVM> list = new List<BusinessPartnerVM>();
            list = GetAllPurchaseInfo();
            list = list.OrderBy(e => e.Name).ToList();
            return list;
         }
         public IActionResult SampleInfo()
         {

            PurchaseMasterVM purchasemaster = new PurchaseMasterVM();
            purchasemaster.PurchaseDetails.Add(
                new PurchaseDetailsVM
                {
                   Id = 1,
                   UnitQty = 1,
                   UnitPrice = 22,

                });
            //List <BusinessPartnerVM> data = unitofWork.BusinessPartnerRepository.GetBusinessPartner();
            List<BusinessPartnerVM> Business = new List<BusinessPartnerVM>();
            BusinessPartnerVM obj = new BusinessPartnerVM
            {
               Id = 2,
               Name = "Test",
               inBranchsId = 3,
               insId = 2,
            };
            Business.Add(obj);
            List<ProductVM> prdlist = new List<ProductVM>();
            ProductVM product = new ProductVM
            {
               Id = 2,
               Name = "Test",
               inBranchsId = 3,
               insId = 2,
            };
            prdlist.Add(product);
            List<PaymentMethodVM> Payment = new List<PaymentMethodVM>();
            PaymentMethodVM paymentMethod = new PaymentMethodVM
            {
               Id = 2,
               Name = "Bcash",
            };
            Payment.Add(paymentMethod);
            List<VoucherTypeVM> VoucherType = new List<VoucherTypeVM>();
            VoucherTypeVM VoucherTypeobj = new VoucherTypeVM
            {
               Id = 2,
               VoucharName = "Test"
            };
            VoucherType.Add(VoucherTypeobj);
            ViewBag.SupplierID = new SelectList(Business, "Id", "Name");
            ViewBag.ProductId = new SelectList(prdlist, "Id", "Name");
            ViewBag.PaymodeID = new SelectList(Payment, "Id", "Name");
            ViewBag.VoucherTypeID = new SelectList(VoucherType, "Id", "VoucharName");
            return View(purchasemaster);
         }
         public IActionResult PurchaseInvoiceInfo()
         {
         PurchaseMasterVM purchasemaster = new PurchaseMasterVM();
            purchasemaster.PurchaseDetails.Add(
                new PurchaseDetailsVM
                {
                   Id = 1,
                   UnitQty = 1,
                   UnitPrice = 22,

                });
         ViewBag.SupplierID = new SelectList(new BusinessPartnerController().GetBusinessPartner(), "Id", "Name");
         ViewBag.PaymodeID = new SelectList(new PaymentMethodController().GetPaymentMethod(), "Id", "Name");
         //ViewBag.ProductId = new SelectList(new ProductController().GetProduct(),"Id", "Name");
         ViewBag.VoucherTypeID = new SelectList(new VoucherTypeController().GetVoucherType(), "Id", "VoucharName");
          
            return View(purchasemaster);
         }
         [HttpPost]
         public ActionResult PurchaseInvoiceInfo(PurchaseMasterVM purchasemaster)
         {
            using (var client = new HttpClient())
            {
               try
               {
                  string baseUri = "https://localhost:7065/api/PurchaseInvoice/SavePurchaseMaster";
                  var result = client.PostAsJsonAsync(baseUri, purchasemaster).Result;
                  if (result.IsSuccessStatusCode)
                  {
                     return RedirectToAction("Index");
                  }
                  else
                  {
                     return RedirectToAction("Save fail");
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
            ViewBag.SupplierID = new SelectList(new BusinessPartnerController().GetBusinessPartner(), "Id", "Name");
            ViewBag.PaymodeID = new SelectList(new PaymentMethodController().GetPaymentMethod(), "Id", "Name");
            //ViewBag.ProductId = new SelectList(new ProductController().GetProduct(), "Id", "Name");
            ViewBag.VoucherTypeID = new SelectList(new VoucherTypeController().GetVoucherType(), "Id", "VoucharName");
            return View(purchasemaster);
         }

         public IActionResult ProductPurchase()
         {
            return View();
         } 
    }
}