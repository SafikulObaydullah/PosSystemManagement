using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stock_API.Auth.Interface;
using Stock_API.Utility;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.Security;
using System.Security.Claims;
//using System.Web.Mvc;
using Stock_DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUnitofWork _unitofWork;
        IHttpContextAccessor _Accessor;
        IConfiguration _configurations;
        private readonly IAuthService _authService;
        private readonly IAccountRepo _accService;
        public AuthController(IHttpContextAccessor Accessor, IUnitofWork unitofWork, IAccountRepo accService, IAuthService authService, IConfiguration configurations)
        {
            this._authService = authService; 
            this._Accessor = Accessor;
            this._accService = accService;
            this._unitofWork = unitofWork;
        }

        [Route("DeCode")]
        [HttpGet]
        public IActionResult DeCoding(string password)
        {
            var data = _authService.DeCoding(password);
            return Ok();
        }

        [Route("EnCode")]
        [HttpGet]
        public async Task<IActionResult> EnCoding(string password)
        {
            return Ok();
        }
        [Route("Login")]
        [HttpPost]
        public JsonResult Login(Login o)
        {
            try
            {
                //o.Password = TextEncryptionDecryption.Encrypt(o.Password, _configurations["EncryptionKeys:Key2"].ToString());
                var user = _unitofWork.accountRepo.GetAuthenticUserData(o).FirstOrDefault();
                if (user != null)
                {
                    var claims = new[] {
                    new Claim("name", user.Name),
                    new Claim("userid", user.ID.ToString()),
                    new Claim("Designation", user.Designation),
                    new Claim("UserTypeID", user.UserTypeAttributeID.ToString()),
                    new Claim("UserSectionID", user.UserSectionID.ToString())
                };
                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
                    return new JsonResult(new
                    {
                        msg = "Login Success"
                    });
                }
                else
                {
                    return new JsonResult(new
                    {
                        msg = "Invalid User Name or Password"
                    });
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    msg = "Fail to login, please try again."
                });
            }
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { message = "Successfully logged out" });
        }
        [HttpPost("ApiLogout")]
        public async Task<IActionResult> ApiLogout()
        {
            //await signInManager.SignOutAsync();
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { message = "Successfully logged out" }); return Ok(new { message = "Successfully logged out" });
            //return RedirectToAction("index", "home");
        }
    }
}
