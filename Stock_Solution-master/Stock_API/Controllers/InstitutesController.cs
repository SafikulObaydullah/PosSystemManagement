using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stock_API.Utility;
using Stock_API.ViewModels;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using System.Net.Http.Headers;
using System.Text;


namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Powersoft")]
    public class InstitutesController : ControllerBase
    {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public InstitutesController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
        }
       
        [HttpGet("GetInstitute")]
        public IEnumerable<Institute> GetAll()
        {
            List<Institute> all = new List<Institute>();
            try
            {
                    all = this.unitofWork.InstituteRepository.GetAll(null, null).ToList();
            }
            catch (Exception ex)
            {
                all = new List<Institute>();
            }
            // return this.unitofWork.InstituteRepository.GetAll(null, null);
            return all;
        }
        [HttpPost]
        private string CreatePassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }
        [HttpPost, DisableRequestSizeLimit]

        [Route("Upload")]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var banner = Request.Form.Files[1];
                var id = Request.Form["Id"];
                var name = Request.Form["InstituteName"];
                var contact = Request.Form["ContactNumber"];
                var email = Request.Form["AdminEmail"];
                var ShortName = Request.Form["ShortName"];
                //  Request.Form[  "AdminEmailPassword",this.instForm.get("Id")?.value)
                var add = Request.Form["Address"];
                var type = Request.Form["InstituteTypeId"];
                var domain = Request.Form["DomainName"];
                var ip = Request.Form["IP"];
                var isactive = Request.Form["IsActive"];
                //  public async Task<IActionResult> Upload()
                //{
                //    try
                //    {
                //        var formCollection = await Request.ReadFormAsync();
                //        var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "InstituteLogo");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0 && banner.Length > 0)
                {
                    //logo
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var ext = Path.GetExtension(fileName);
                    var fullPath = Path.Combine(pathToSave, name + ext);
                    var dbPath = Path.Combine(folderName, name + ext);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    //banner
                    var bannerfolderName = Path.Combine("Resources", "InstituteBanner");
                    var bannerToSave = Path.Combine(Directory.GetCurrentDirectory(), bannerfolderName);
                    var bannerfileName = ContentDispositionHeaderValue.Parse(banner.ContentDisposition).FileName.Trim('"');
                    var bext = Path.GetExtension(bannerfileName);
                    var bannerfullPath = Path.Combine(bannerToSave, name + bext);
                    var bannerPath = Path.Combine(bannerfolderName, name + bext);
                    using (var stream = new FileStream(bannerPath, FileMode.Create))
                    {
                        banner.CopyTo(stream);
                    }
                    string p = CreatePassword(8);
                    var instoInsert = new Institute
                    {
                        Address = add,
                        ContactNumber = contact,
                        AdminEmail = email,
                        InstituteName = name,
                        BannerPath = bannerPath,
                        LogoPath = dbPath,
                       
                        ShortName = ShortName,
                       
                        AdminEmailPassword = p
                    };
                    //using(Transaction transaction =this.unitofWork.Db ) { }
                    this.unitofWork.InstituteRepository.Add(instoInsert);

                    var m = this.unitofWork.Save();
                    if (m.IsSuccess)
                    {
                        RegisterVM registerVM = new RegisterVM
                        {
                            Email = email,
                            UserName = $"{ShortName}-Admin",
                            Password = p,

                        };
                        var result = this.Register(registerVM);
                        return Ok(new { Data = instoInsert, result = m });
                    }
                    else
                    {
                        return Problem(m.Message);
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([Microsoft.AspNetCore.Mvc.FromBody] RegisterVM model)
        {
            var isExist = await _userManager.FindByEmailAsync(model.Email);
            if (isExist != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ModelsMessage { EntityModel = null, Message = "user already exists" });
            }
            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok(new ModelsMessage { EntityModel = user, Message = "User created successfully" });
            }
            else if (result.Errors.Count() > 0)
            {
                var m = new ModelsMessage();
                foreach (var item in result.Errors)
                {
                    m.Message += item.Code + "-" + item.Description + ",";

                }
                m.Message = m.Message.Substring(0, m.Message.Length - 1);
                return StatusCode(StatusCodes.Status500InternalServerError, m);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ModelsMessage { EntityModel = null, Message = "User creation failed" });
            }
        }
        [HttpPost("SaveInstitute")]
        public IActionResult Save(Institute institute)
        {
            try
            {
                this.unitofWork.InstituteRepository.Add(institute);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = institute, result = m });
                }
                else
                {
                    return Problem(m.Message);
                }
            }
            catch(Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [HttpPut("UpdateInstitute")]
        public IActionResult Update(Institute institute)
      {
         try
         {
            this.unitofWork.InstituteRepository.Update(institute);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = institute, result = m });
            }
            else
            {
               return Problem(m.Message);
            }
         }
         catch (Exception ex)
         {
            return Problem(ex.Message);
         }
      }
        [HttpDelete]
        [Route("DeleteRange")]
        public void DeleteRangs(IEnumerable<Institute> entities)
        {
            this.unitofWork.InstituteRepository.DeleteRange(entities);
            this.unitofWork.Save();

        }
    }
}
