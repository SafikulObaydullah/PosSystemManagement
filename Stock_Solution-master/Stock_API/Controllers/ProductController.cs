using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stock_API.Utility; 
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System.Dynamic; 
using System.Net.Mail; 


namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Powersoft")]
    public class ProductController : ControllerBase
    {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        public ProductController(IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
        } 
        [HttpGet] 
        public IEnumerable<ProductVM> GetAll()
        {
            List<ProductVM> all = new List<ProductVM>();
            try
            {
               all = this.unitofWork.ProductRepository.GetProduct().ToList();
            }
            catch (Exception ex)
            {
                all = new List<ProductVM>();
            } 
            return all;
        }
        [HttpGet("ProblemDetails")]
        public IEnumerable<Product> ProblemDetails()
        {
            List<Product> all = new List<Product>();
            try
            {
                all = this.unitofWork.ProductDetailRepository.GetProductDetail().ToList();
            }
            catch (Exception ex)
            {
                all = new List<Product>();
            }
            return all;
        }
        [HttpGet("GetByID")]
        public IEnumerable<Product> GetByID(int Id)
        {
            List<Product> all = new List<Product>();
            try
            {
               all = this.unitofWork.ProductRepository.GetByID(t => t.Id.Equals(Id)).ToList();
            }
            catch (Exception ex)
            {
               all = new List<Product>();
            }
            return all;
        }
      
         //[HttpPost]
      //private string CreatePassword(int length)
      //{
      //    const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      //    StringBuilder res = new StringBuilder();
      //    Random rnd = new Random();
      //    while (0 < length--)
      //    {
      //        res.Append(valid[rnd.Next(valid.Length)]);
      //    }
      //    return res.ToString();
      //}
      //[HttpPost, DisableRequestSizeLimit] 
      //[Route("Upload")]
      //public IActionResult Upload()
      //{
      //    try
      //    {
      //        var file = Request.Form.Files[0];
      //        var banner = Request.Form.Files[1];
      //        var id = Request.Form["Id"];
      //        var name = Request.Form["InstituteName"];
      //        var contact = Request.Form["ContactNumber"];
      //        var email = Request.Form["AdminEmail"];
      //        var ShortName = Request.Form["ShortName"];
      //        //  Request.Form[  "AdminEmailPassword",this.instForm.get("Id")?.value)
      //        var add = Request.Form["Address"];
      //        var type = Request.Form["InstituteTypeId"];
      //        var domain = Request.Form["DomainName"];
      //        var ip = Request.Form["IP"];
      //        var isactive = Request.Form["IsActive"];
      //        //  public async Task<IActionResult> Upload()
      //        //{
      //        //    try
      //        //    {
      //        //        var formCollection = await Request.ReadFormAsync();
      //        //        var file = formCollection.Files.First();
      //        var folderName = Path.Combine("Resources", "InstituteLogo");
      //        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
      //        if (file.Length > 0 && banner.Length > 0)
      //        {
      //            //logo
      //            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
      //            var ext = Path.GetExtension(fileName);
      //            var fullPath = Path.Combine(pathToSave, name + ext);
      //            var dbPath = Path.Combine(folderName, name + ext);
      //            using (var stream = new FileStream(fullPath, FileMode.Create))
      //            {
      //                file.CopyTo(stream);
      //            }
      //            //banner
      //            var bannerfolderName = Path.Combine("Resources", "InstituteBanner");
      //            var bannerToSave = Path.Combine(Directory.GetCurrentDirectory(), bannerfolderName);
      //            var bannerfileName = ContentDispositionHeaderValue.Parse(banner.ContentDisposition).FileName.Trim('"');
      //            var bext = Path.GetExtension(bannerfileName);
      //            var bannerfullPath = Path.Combine(bannerToSave, name + bext);
      //            var bannerPath = Path.Combine(bannerfolderName, name + bext);
      //            using (var stream = new FileStream(bannerPath, FileMode.Create))
      //            {
      //                banner.CopyTo(stream);
      //            }
      //            string p = CreatePassword(8);
      //            var instoInsert = new Institute
      //            {
      //                Address = add,
      //                ContactNumber = contact,
      //                AdminEmail = email,
      //                InstituteName = name,
      //                BannerPath = bannerPath,
      //                LogoPath = dbPath,

      //                ShortName = ShortName,

      //                AdminEmailPassword = p
      //            };
      //            //using(Transaction transaction =this.unitofWork.Db ) { }
      //            this.unitofWork.InstituteRepository.Add(instoInsert);

      //            var m = this.unitofWork.Save();
      //            if (m.IsSuccess)
      //            {
      //                RegisterVM registerVM = new RegisterVM
      //                {
      //                    Email = email,
      //                    UserName = $"{ShortName}-Admin",
      //                    Password = p,

      //                };
      //                var result = this.Register(registerVM);
      //                return Ok(new { Data = instoInsert, result = m });
      //            }
      //            else
      //            {
      //                return Problem(m.Message);
      //            }
      //        }
      //        else
      //        {
      //            return BadRequest();
      //        }
      //    }
      //    catch (Exception ex)
      //    {
      //        return StatusCode(500, $"Internal server error: {ex}");
      //    }
      //}
      //[HttpPost]
      //[Route("Register")]
      //public async Task<IActionResult> Register([Microsoft.AspNetCore.Mvc.FromBody] RegisterVM model)
      //{
      //    var isExist = await _userManager.FindByEmailAsync(model.Email);
      //    if (isExist != null)
      //    {
      //        return StatusCode(StatusCodes.Status500InternalServerError, new ModelsMessage { EntityModel = null, Message = "user already exists" });
      //    }
      //    var user = new ApplicationUser
      //    {
      //        UserName = model.UserName,
      //        Email = model.Email,
      //        SecurityStamp = Guid.NewGuid().ToString()
      //    };
      //    var result = await _userManager.CreateAsync(user, model.Password);
      //    if (result.Succeeded)
      //    {
      //        return Ok(new ModelsMessage { EntityModel = user, Message = "User created successfully" });
      //    }
      //    else if (result.Errors.Count() > 0)
      //    {
      //        var m = new ModelsMessage();
      //        foreach (var item in result.Errors)
      //        {
      //            m.Message += item.Code + "-" + item.Description + ",";

      //        }
      //        m.Message = m.Message.Substring(0, m.Message.Length - 1);
      //        return StatusCode(StatusCodes.Status500InternalServerError, m);
      //    }
      //    else
      //    {
      //        return StatusCode(StatusCodes.Status500InternalServerError, new ModelsMessage { EntityModel = null, Message = "User creation failed" });
      //    }
      //}
        [HttpPost("SaveProduct")]
        public IActionResult SaveProduct(ProductVM product)
        {
            ProductTable obj = new ProductTable()
            { 
               Code = product.Code,
               Name = product.Name,
               EntryBy = product.EntryBy,
               Reorderlevel = product.Reorderlevel, 
               Boxqty = product.Boxqty,
               UnitId = product.UnitId,
               CatId = product.CatId,  
               SalesPrice = product.SalesPrice, 
               PurchasePrice = product.PurchasePrice, 
               Discountrate = product.Discountrate,   
               Vatrate = product.Vatrate, 
               //Discountamount = product.Discountamount,
               Vatamount = product.Vatamount,
               Description = product.Description,
               //IsActive = product.IsActive,
               StockQty = product.StockQty, 
               insId = product.insId,
               inBranchsId = product.inBranchsId,  
            };
            try
            { 
                this.unitofWork.ProductTablesRepository.Add(obj);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = product, result = m });
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

        [HttpPost("SaveNewProduct")]
        public IActionResult SaveNewProduct([FromForm] ProductTable model, IFormFile? ProductImage)
        {
            try
            {
                Product obj = new Product()
                {
                    Name = model.Name,
                    CatId = model.CatId,
                    BrandId = model.BrandId,
                    UnitId = model.UnitId,
                    MimumQuantity = model.MinimumQuantity,
                    StockQty = model.Quantity,
                    Description = model.Description,
                    Sku = model.SKU,
                    SalesPrice = (decimal)model.Price,
                    Status = model.Status,

                    // Extra fields from Product (set defaults or handle later)
                    EntryBy = "System", // or HttpContext.User.Identity.Name
                    EntryDate = DateTime.Now,
                    Reorderlevel = 5,
                    Boxqty = 1,
                    PurchasePrice = 0,
                    Discountrate = 0,
                    Vatrate = 0,
                    Discountamount = 0,
                    Vatamount = 0,
                    VehicleName = string.Empty,
                    ChasisNo = string.Empty,
                    EngineNo = string.Empty,
                    FuelType = string.Empty,
                    Color = string.Empty,
                    ModelNo = string.Empty,
                    Mileage = 0,
                    insId = 2,       // must come from context/session
                    inBranchsId = 4  // must come from context/session
                };
                this.unitofWork.ProductRepository.Add(obj);
                //this.unitofWork.ProductDetailRepository.Add(obj);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = model, result = m });
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
        [HttpPost("SaveSubCategory")]
        public IActionResult SaveSubCategory([FromForm] SubCategory model)
        {
            try
            {
                var data = this.unitofWork.ProductRepository.SaveSubCategory(model);
                var m = this.unitofWork.Save();
                if (data.IsSuccess)
                {
                    return Ok(new { Data = model, result = data });
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
        [HttpPost("SaveBrand")]
        public IActionResult SaveBrand([FromForm] Brand model)
        {
            try
            {
                var data = this.unitofWork.ProductRepository.SaveBrand(model);
                //var m = this.unitofWork.Save();
                if (data.IsSuccess)
                {
                    return Ok(new { Data = model, result = data });
                }
                else
                {
                    return Problem(data.Message);
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [HttpDelete]
        [Route("DeleteRange")]
        public void DeleteRangs(IEnumerable<Product> entities)
        {
            this.unitofWork.ProductRepository.DeleteRange(entities);
            this.unitofWork.Save(); 
        }
        [HttpPut("UpdateProduct")]
         public IActionResult Update(ProductVM product)
         {
            var data = unitofWork.ProductRepository.GetByID(t => t.Id.Equals(product.Id)).FirstOrDefault();
            if (data == null)
            {
               throw new Exception("Data Not Found");
            };
            data.Code = product.Code;
            data.Name = product.Name;
            data.EntryBy = product.EntryBy;
            data.Reorderlevel = product.Reorderlevel; 
            data.Boxqty = product.Boxqty;
            data.UnitId = product.UnitId;
            data.CatId = product.CatId;  
            data.SalesPrice = product.SalesPrice; 
            data.PurchasePrice = product.PurchasePrice; 
            data.Discountrate = product.Discountrate;   
            data.Vatrate = product.Vatrate; 
            data.Discountamount = product.Discountamount;
            data.Vatamount = product.Vatamount;
            data.Description = product.Description;
            data.IsActive = product.IsActive;
            data.StockQty = product.StockQty;
            data.insId = product.insId;
            data.inBranchsId = product.inBranchsId;  
            try
            {
               this.unitofWork.ProductRepository.Update(data);
               var m = this.unitofWork.Save();
               if (m.IsSuccess)
               {
                  return Ok(new { Data = data, result = m });
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
         [Route("DeleteProduct")]
         public IActionResult DeleteProduct(int id)
         {
            try
            {
               this.unitofWork.ProductRepository.DeletebyID(t => t.Id.Equals(id));
               var m = this.unitofWork.Save();
               if (m.IsSuccess)
               {
                  return Ok(new { result = m });
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
         [HttpGet("GetInitialProductData")]
         public JsonResult GetInitialProductData()
         {
            dynamic result = new ExpandoObject();
            try
            {
               result.institute = this.unitofWork.InstituteRepository.GetAll(null, null).ToList();
               result.branches = this.unitofWork.InstituteBranchRepository.GetAll(null, null).ToList();
               result.categories = this.unitofWork.CategoryRepository.GetCategory().ToList();
               result.subCategory = this.unitofWork.SubCateogyRepository.GetSubCategory().ToList();
               result.brand = this.unitofWork.BrandRepository.GetBrand().ToList();
               result.units = this.unitofWork.UnitRepository.GetUnit().ToList(); 
         }
         catch (Exception ex)
            {
               ModelState.AddModelError("Failed", ex.Message);
            }
            return Json(result);
         }
         [NonAction]
         public virtual JsonResult Json(object? data)
         {
            return new JsonResult(data);
         }
        [HttpGet("GetAllMovies")]
        public IEnumerable<Movie> GetAllMovies()
        {
            List<Movie> all = new List<Movie>();
            try
            {
                all = this.unitofWork.ProductRepository.GetMovies().ToList();
            }
            catch (Exception ex)
            {
                all = new List<Movie>();
            }
            return all;
        }
        protected void btnSendMail_Click(object sender, EventArgs e)
        {
            SmtpClient smtpClient = new SmtpClient();
            MailAddress fromAddress = new MailAddress("mahedee_hasan@leads-bd.com"); //Sender email address
            MailMessage _mail = new MailMessage();

            _mail.Attachments.Add(new Attachment(@"C:/Users/User/Desktop/Translator%20File/Bengali_Translated.pdf")); //Add dirctory of attachment

            //bool IsSuccess = false;
            try
            {
                _mail.From = fromAddress;
                _mail.To.Add("obaydullah599@gmail.com"); //Receiver email address
                _mail.CC.Add("mahedee.hasan@yahoo.com"); //Email address for cc
                _mail.Bcc.Add("mahedee.hasan@hotmail.com"); //Email address for bcc

                _mail.Subject = "Test Message"; //Email subject
                _mail.Body = "Dear concern, This is the test message from Mahedee"; //Email body
                _mail.IsBodyHtml = true; //Email body is in html format

                smtpClient.Host = "182.268.30.50"; //Name or IP address of the host used for SMTP transaction
                smtpClient.EnableSsl = false;
                //smtpClient.Port = 25; //25 is default port for smtp. You have to change port no if it is not used defualt         port
                smtpClient.Send(_mail); //Send mail
                                        //IsSuccess = true;
            }
            catch (Exception ex)
            {
                //IsSuccess = false;
            }
            finally
            {
                //
            }
        }

        [HttpGet("StageSendMail")]
        public async Task<IActionResult> StageSendMail(long stageId, long applicationId)
        {
            try
            {
                var obj =  this.unitofWork.ProductRepository.GetSubCategoryById(stageId);
                foreach (var item in obj) {
                    SendMail mail = new()
                    {
                        SendTo = item.CategoryCode,
                        MailSubject = item.CategoryName,
                        MailBody = item.Description,
                        IsHtmlFormat = true
                    };
                }


                bool sentResult = true; //await _emailService.SendMail(mail);

                return sentResult == true ? StatusCode(200, obj) : StatusCode(417, "sent failed");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

}
