using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Stock_API.Utility;
using Stock_API.ViewModels;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System.Dynamic;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http.Filters;
using System.Web.Http.Results;


namespace Stock_API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   [EnableCors("Powersoft")]
   public class CategoryController : ControllerBase
   {
      private IUnitofWork unitofWork;
      ModelsMessage modelsMessage;
      private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _environment;
        public CategoryController(IUnitofWork unitofWork, IWebHostEnvironment webHost, UserManager<ApplicationUser> userManager)
        {
            this.unitofWork = unitofWork;
            modelsMessage = new ModelsMessage();
            _userManager = userManager;
            _environment = webHost;
        }
        
        [HttpGet("GetDemo")]
        public IEnumerable<CategoryVM> GetDemo()
        {
            List<CategoryVM> all = new List<CategoryVM>();
            try
            {
                all = this.unitofWork.CategoryRepository.GetCategory().ToList();
            }
            catch (Exception ex)
            {
                all = new List<CategoryVM>();
            }
            return all;
        }
        [HttpGet("GetCategory")]
      public IEnumerable<CategoryVM> GetCategory()
      {
         List<CategoryVM> all = new List<CategoryVM>();
         try
         {
            all = this.unitofWork.CategoryRepository.GetCategory().ToList();
         }
         catch (Exception ex)
         {
            all = new List<CategoryVM>();
         }
         return all;
      }
        [HttpGet("GetDocument")]
        public IEnumerable<DocumentUpload> GetDocument()
        {
            List<DocumentUpload> list = new List<DocumentUpload>();
            try
            {
                list = this.unitofWork.DocumentUploadRepository.GetDocument().ToList();   
            }
            catch(Exception ex)
            {
               list = new List<DocumentUpload>();   
            }
            return list;
        }

      [HttpGet]
      public IEnumerable<Category> GetAll()
      {
         List<Category> all = new List<Category>();
         try
         {
            all = this.unitofWork.CategoryRepository.GetAll(null, null).ToList();
         }
         catch (Exception ex)
         {
            all = new List<Category>();
         }
         return all;
      }
      [HttpGet("GetByID")]
      public IEnumerable<Category> GetByID(int Id)
      {
         List<Category> all = new List<Category>();
         try
         {
           all = this.unitofWork.CategoryRepository.GetByID(t => t.Id.Equals(Id)).ToList();
         }
         catch (Exception ex)
         {
            all = new List<Category>();
         }
         return all;
      }

      [HttpPost("SaveCategory")]
      public IActionResult Save(Category category)
      {
         try
         {
            this.unitofWork.CategoryRepository.Add(category);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = category, result = m });
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
        public IActionResult SaveSubCategory(SubCategory category)
        {
            try
            {
                this.unitofWork.SubCateogyRepository.Add(category);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = category, result = m });
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
      public IActionResult SaveBrand(Brand brand)
        {
            try
            {
                this.unitofWork.BrandRepository.Add(brand);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = brand, result = m });
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
      [HttpPut("UpdateCategory")]
      public IActionResult Update(Category category)
      {
         try
         { 
            this.unitofWork.CategoryRepository.Update(category);
            var m = this.unitofWork.Save();
            if (m.IsSuccess)
            {
               return Ok(new { Data = category, result = m });
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
      public void DeleteRangs(IEnumerable<Category> entities)
      {
         this.unitofWork.CategoryRepository.DeleteRange(entities);
         this.unitofWork.Save();
      }
       [HttpDelete]
       [Route("Delete")] 
       public IActionResult Delete(int id)
      {
         try
         {
            this.unitofWork.CategoryRepository.DeletebyID(t => t.Id.Equals(id));
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
       [HttpPost]
       [Route("UploadFilesAjax")]
       public JsonResult UploadFilesAjax(GlobalFileUrl model)
        {
            long size = 0;
            var files = Request.Form.Files;
            foreach (var file in files)
            {
                var filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
                filename = _environment.WebRootPath + "/Images" + $@"\{filename}";
                size += file.Length;
                using (FileStream fs = System.IO.File.Create(filename))
                {
                    GlobalFileUrl obj = new GlobalFileUrl
                    {
                        ReferrenceNo = model.ReferrenceNo,
                        ReferenceDescription = "Dcoument file for " + model.ReferrenceNo,
                        DocumentTypeId = model.DocumentTypeId,
                        FileServerId = model.FileServerId,
                        DocumentName = file.FileName,
                        NumFileSize = Convert.ToDecimal(file.Length),
                        FileExtension = Path.GetExtension(file.FileName),
                        ServerLocation = "Azure File Server",
                        Creator = 1,
                        CreationDate = DateTime.Now,
                    };
                    this.unitofWork.CategoryRepository.GlobalFileUrl(obj);

                    file.CopyTo(fs);
                    fs.Flush();
                }
            }
            string message = $"{files.Count} file(s) /{size}bytes uploaded successfully!";
            return new JsonResult(message);
        }
       [HttpGet]
       [Route("getStudent")]
       public JsonResult getStudent(int lastStudent)
         {
            List<Student> student = Student.getStudent().Where(x => x.ID == lastStudent).Cast<Student>().ToList();
            return new JsonResult(student);
        }
        [HttpGet("GetSubCategoryList")]
        public JsonResult GetSubCategoryList()
        {
            dynamic result = new ExpandoObject();
            try
            {
                result.subCategoryList = this.unitofWork.ProductRepository.GetSubCategoryList();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Failed", ex.Message);
            }
            return Json(result);
        }
        [HttpGet("GetSubCategoryById")]
        public JsonResult GetSubCategoryById(long Id)
        {
            dynamic result = new ExpandoObject();
            try
            {
                result.subCategorybyId = this.unitofWork.ProductRepository.GetSubCategoryById(Id);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Failed", ex.Message);
            }
            return Json(result);
        }
        [HttpPost("UploadFileToDev")]
        public JsonResult UploadFileToDev(IFormFile file, string foldername)
        {
            string path = "";
            string folder = foldername;
            try
            {
                if (file == null)
                {
                    return new JsonResult(new { msg = "fail" });
                }
                //var date = String.Format(DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Day);
                if (string.IsNullOrWhiteSpace(_environment.WebRootPath))
                {
                    _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                    path = _environment.WebRootPath + "\\Files\\" + "\\" + folder + "\\";
                }
                else
                {
                    path = _environment.WebRootPath + "\\Files\\" + "\\" + folder + "\\";
                }
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                List<string> paths = new List<string>();
                List<string> pathids = new List<string>();
                string uniqueid = Guid.NewGuid().ToString().Replace("-", string.Empty);
                var fileName = Path.GetFileNameWithoutExtension(file.FileName) + uniqueid + Path.GetExtension(file.FileName);
                path = $"wwwroot\\Files\\{folder}\\{fileName}";
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                paths.Add(path);
                pathids.Add(uniqueid);
                path = "Files/" + folder + "/" + fileName;

                DocumentUpload document = new DocumentUpload();
                document.ImageUrl = path;
                document.Title = "title";
                this.unitofWork.DocumentUploadRepository.Add(document);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    new JsonResult(new { data = document });
                }
                else
                {
                    new JsonResult(new { msg = "fail" });
                }



                return new JsonResult(new { path = path });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { msg = "fail" });
            }
        }
        [NonAction]
        public virtual JsonResult Json(object? data)
        {
            return new JsonResult(data);
        }
    }
}
