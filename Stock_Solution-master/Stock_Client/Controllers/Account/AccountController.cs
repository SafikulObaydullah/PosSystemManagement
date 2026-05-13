using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stock_DataAccess.Models;

namespace Stock_Client.Controllers.Account
{
    public class AccountController : Controller
    {
        IHttpContextAccessor _Accessor;
        IConfiguration _configurations;

        //private readonly IAccountFacade _accountFacade;
        public AccountController(IHttpContextAccessor Accessor, IConfiguration configurations)
        {
            _Accessor = Accessor;
            _configurations = configurations;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        
        //public async Task<IActionResult> Login(LoginViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        //var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

        //        if (result.Succeeded)
        //        {
        //            // Handle successful login
        //            return RedirectToAction(nameof(HomeController.Index), "Home");
        //        }
        //        if (result.RequiresTwoFactor)
        //        {
        //            // Handle two-factor authentication case
        //        }
        //        if (result.IsLockedOut)
        //        {
        //            // Handle lockout scenario
        //        }
        //        else
        //        {
        //            // Handle failure
        //            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
        //            return View(model);
        //        }
        //    }

        //    // If we got this far, something failed, redisplay form
        //    return View(model);
        //}
    }
}
