using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        public FileUploadController(IWebHostEnvironment webHostEnvironment)
        {
            this._environment = webHostEnvironment;
        }
        [HttpPost("FileUpload")]
        public JsonResult FileUpload()
        {
             

            return new JsonResult(new { msg = "fail" });
        }

        private string UploadFileToDev(IFormFile file, string foldername)
        {
            string path = "";
            string folder = foldername;
            try
            {
                if (file == null)
                {
                    return "";
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
                    file.CopyTo(stream)
        ;
                }
                paths.Add(path);
                pathids.Add(uniqueid);
                path = "Files/" + folder + "/" + fileName;
                //HomeGallary hgallery = new HomeGallary();
                //hgallery.CompanyId = Guid.NewGuid();
                //hgallery.CreatedBy = Guid.NewGuid();
                //hgallery.CreatedDate = DateTime.Now.UTCCurrentTime();
                //hgallery.IsDefault = false;

                //HomeGallary homegallry = _UserLoginFacade.GetDisplayOderByMaxId();
                //if (homegallry == null)
                //{
                //    homegallry = new HomeGallary();
                //    homegallry.DisplayOrder = 0;
                //}

                //hgallery.DisplayOrder = homegallry.DisplayOrder + 1;
                //hgallery.IsActive = true;
                //hgallery.LastUpdatedDate = DateTime.Now.UTCCurrentTime();
                //hgallery.LastUpdatedBy = Guid.NewGuid();
                //_UserLoginFacade.InsertHomeGallery(hgallery);
                return path;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
