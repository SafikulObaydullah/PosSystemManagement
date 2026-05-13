using Microsoft.AspNetCore.Mvc;
using Stock_DataAccess.Models;

namespace Stock_Client.Controllers
{
    public class FileUploadController : Controller
    {
        private readonly IWebHostEnvironment _environment;
        public FileUploadController(IWebHostEnvironment webHostEnvironment)
        {
                this._environment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult AddLaptop()
        {
            return View();
        }
        public IActionResult ImageUpload()
        {
            return View();
        }
        [HttpPost]
        [Route("UploadImage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<JsonResult> UploadImage(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return Json(new { error = "No image file uploaded." });
            }

            try
            { 
                string filename = DateTime.Now.Ticks.ToString() + Path.GetExtension(imageFile.FileName);

                // Define the directory where the image will be stored
                var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload\\Images");

                // Create the directory if it doesn't exist
                if (!Directory.Exists(uploadDirectory))
                {
                    Directory.CreateDirectory(uploadDirectory);
                }

                // Construct the full path to save the image
                var filePath = Path.Combine(uploadDirectory, filename);

                // Copy the uploaded image to the server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                 
                return Json(new { filename });
            }
            catch (Exception ex)
            {
                return Json(new { error = $"Failed to upload image: {ex.Message}" });
            }
        }

        [HttpGet]
        [Route("GetUploadedFiles")]
        public IActionResult GetUploadedFiles()
        {
            var filesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload\\Images");
            var files = Directory.GetFiles(filesDirectory).Select(Path.GetFileName);
            return Ok(files);
        }

        [HttpPost]
        [Route("DeleteFile")]
        public IActionResult DeleteFile(string fileName)
        {
            try
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload\\Images", fileName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    return Ok("File deleted successfully.");
                }
                else
                {
                    return NotFound("File not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to delete file: {ex.Message}");
            }
        }
        // You can implement update functionality similarly
        // [HttpPost]
        // [Route("UpdateFile")]
        // public IActionResult UpdateFile(string fileName, string newFileName)
        // {
        //     try
        //     {
        //         // Implement your update logic here
        //         return Ok("File updated successfully.");
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest($"Failed to update file: {ex.Message}");
        //     }
        // } 
        public ActionResult Index2()
        {
            return View();
        }

        //[HttpPost]
        //public ActionResult SubmitAction(FormCollection collection)
        //{
        //    // create a new pdf document
        //    PdfDocument doc = new PdfDocument();

        //    // add a new page to the document
        //    PdfPage page = doc.AddPage();

        //    // get image path 
        //    // the image will be used to display the digital signature over it
        //    string imgFile = Server.MapPath("~/files/logo.png");

        //    // get certificate path
        //    string certFile = Server.MapPath("~/files/selectpdf.pfx");

        //    // define a rendering result object
        //    PdfRenderingResult result;

        //    // create image element from file path 
        //    PdfImageElement img = new PdfImageElement(0, 0, imgFile);
        //    result = page.Add(img);

        //    // get the #PKCS12 certificate from file
        //    PdfDigitalCertificatesCollection certificates =
        //        PdfDigitalCertificatesStore.GetCertificates(certFile, "selectpdf");
        //    PdfDigitalCertificate certificate = certificates[0];

        //    // create the digital signature object
        //    PdfDigitalSignatureElement signature =
        //        new PdfDigitalSignatureElement(result.PdfPageLastRectangle, certificate);
        //    signature.Reason = "SelectPdf";
        //    signature.ContactInfo = "SelectPdf";
        //    signature.Location = "SelectPdf";
        //    page.Add(signature);

        //    // save pdf document
        //    byte[] pdf = doc.Save();

        //    // close pdf document
        //    doc.Close();

        //    // return resulted pdf document
        //    FileResult fileResult = new FileContentResult(pdf, "application/pdf");
        //    fileResult.FileDownloadName = "Document.pdf";
        //    return fileResult;
        //}
    }
}
