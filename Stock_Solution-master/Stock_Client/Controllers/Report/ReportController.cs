using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stock_DataAccess.Models;
using System.Data;
using System.Security.Claims;

namespace Stock_Client.Controllers.Report
{
	public class ReportController : Controller
	{
        public  IActionResult Index()
		{
            FooterContent model = new FooterContent();


            return View(model);
        }
        public IActionResult AngularDemo()
        {
            return View();
        }
        public IActionResult BonusReport()
		{
			return View();
		}

      [Route("report/FilterBonusReport")]
      public PartialViewResult FilterBonusReport()
      {

         
         return PartialView();
      }
	  public IActionResult SalesPayrollReport()
	  {
	  	  return View();
	  }
      public IActionResult SalesPayrollLoadReport()
      {
        return View();
      }
    }
}
