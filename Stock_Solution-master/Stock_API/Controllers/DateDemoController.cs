using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using Stock_API.Utility;
using Stock_API.ViewModels;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System;
using System.Data;
using System.Data.OleDb;
using System.Globalization;
using System.Net.Http.Headers;
using System.Runtime.Serialization;
using System.Text;
using System.Web.Http.Results;


namespace Stock_API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   [EnableCors("Powersoft")]
   public class DateDemoController : ControllerBase
   {
        private IUnitofWork unitofWork;
        ModelsMessage modelsMessage;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        public DateDemoController(IConfiguration configuration, IWebHostEnvironment environment,
            IUnitofWork unitofWork, UserManager<ApplicationUser> userManager)
        {
                this.configuration = configuration;
                this.unitofWork = unitofWork;
                modelsMessage = new ModelsMessage();
                _userManager = userManager;
                this.environment = environment;
        }
        [HttpGet]
        public int GetDaysDifference(string fromDate, string toDate)
        {
            DateTime startDate = DateTime.ParseExact(fromDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);
            DateTime endDate = DateTime.ParseExact(toDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);
            TimeSpan difference = endDate - startDate; 
            int daysDifference = (int)difference.TotalDays;

            return daysDifference;
        }
        [HttpGet("DateDiff")]
        public JsonResult DateDiff() {
            var dateFrom = DateTime.ParseExact("02/10/2016", "dd/mm/yyyy", CultureInfo.InvariantCulture);
            var dateTo = DateTime.ParseExact("16/10/2016", "dd/mm/yyyy", CultureInfo.InvariantCulture);
            var result = (dateTo - dateFrom).TotalDays;

            return new JsonResult(new
            {
                model = (int)result,
            });
        }
        [HttpPost("Savedatetimeformat")]
        public IActionResult Save(DateTimeFormatVM dateTimeFormat)
        {
            try
            {
                this.unitofWork.DateTimeFormatRepository.Add(dateTimeFormat);
                var m = this.unitofWork.Save();
                if (m.IsSuccess)
                {
                    return Ok(new { Data = dateTimeFormat, result = m });
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
        [HttpPost("ImportExcelFile")]
        public JsonResult ImportExcelFile(IFormFile formFile)
        {
            string successmsg = "";
            try
            {
                var mainPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadExcelFile");
                if (!Directory.Exists(mainPath))
                {
                    Directory.CreateDirectory(mainPath);
                }
                var filePath = Path.Combine(mainPath, formFile.FileName);
                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    formFile.CopyTo(stream);
                }
                var fileName = formFile.FileName;
                string extension = Path.GetExtension(fileName);
                string conString = string.Empty;
                switch (extension)
                {
                    case ".xls":
                        conString = "Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" + filePath + ";Extended Properties='Excel 8.0; HDR=YES'";
                        break;
                    case ".xlsx":
                        conString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + filePath + ";Extended Properties='Excel 8.0;HDR=YES'";
                        break;
                }
                DataTable dt = new DataTable();
                conString = String.Format(conString, filePath);
                using (OleDbConnection conExcel = new OleDbConnection(conString))
                {
                    using (OleDbCommand cmdExcel = new OleDbCommand())
                    {
                        using (OleDbDataAdapter odaExcel = new OleDbDataAdapter())
                        {
                            cmdExcel.Connection = conExcel;
                            conExcel.Open();
                            DataTable dtExcelSchema = conExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                            string sheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
                            cmdExcel.CommandText = "SELECT * FROM [" + sheetName + "]";
                            odaExcel.SelectCommand = cmdExcel;
                            odaExcel.Fill(dt);
                            conExcel.Close();
                        }
                    }
                }

                conString = configuration.GetConnectionString("DbStockModel");
                using (SqlConnection con = new SqlConnection(conString))
                {
                    using (SqlBulkCopy sqlBulkCopy = new SqlBulkCopy(con))
                    {
                        sqlBulkCopy.DestinationTableName = "Customers";
                        sqlBulkCopy.ColumnMappings.Add("CustomerCode", "CustomerCode");
                        sqlBulkCopy.ColumnMappings.Add("FirstName", "FirstName");
                        sqlBulkCopy.ColumnMappings.Add("LastName", "LastName");
                        sqlBulkCopy.ColumnMappings.Add("Gender", "Gender");
                        sqlBulkCopy.ColumnMappings.Add("Country", "Country");
                        sqlBulkCopy.ColumnMappings.Add("Age", "Age");
                        con.Open();
                        sqlBulkCopy.WriteToServer(dt);
                        con.Close();
                    }
                }
                successmsg = "File Imported Successfully, Data Saved into Database.";
                 
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
            }
            return new JsonResult(new
            {
                data = successmsg

            });
        }
        [HttpGet]
        [Route("GetUploadedFiles")]
        public IActionResult GetUploadedFiles()
        {
            var filesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload\\Files");
            var files = Directory.GetFiles(filesDirectory).Select(Path.GetFileName);
            return Ok(files);
        } 
        [HttpPost]
        [Route("UploadFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationtoken)
        {
            var result = await WriteFile(file);
            return Ok(result);
        }

        private async Task<string> WriteFile(IFormFile file)
        {
            string filename = "";
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                filename = DateTime.Now.Ticks.ToString() + extension;

                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload\\Files");

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload\\Files", filename);
                using (var stream = new FileStream(exactpath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
            }
            return filename;
        }


        




















        //[HttpPost("AddLaptop")]
        //public JsonResult AddLaptop(Laptop model, IFormFile ImagePath)
        //{
        //    string successmsg = "";
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            string uniqueFileName = UploadImage(model);
        //            var data = new Laptop()
        //            {
        //                Brand = model.Brand,
        //                Description = model.Description,
        //                Path = uniqueFileName
        //            }; 
        //            this.unitofWork.LaptopRepository.Add(data);
        //            var m = this.unitofWork.Save();

        //            successmsg = "Record Successfully saved!";
        //            return new JsonResult(new
        //            {
        //                data = successmsg,
        //            });
        //        }
        //        ModelState.AddModelError(string.Empty, "Model property is not valid, please check");
        //    }
        //    catch (Exception ex)
        //    {
        //        ModelState.AddModelError(string.Empty, ex.Message);
        //    }
        //    return new JsonResult(new
        //    {
        //        data = successmsg,
        //    });
        //}

        //private string UploadImage(Laptop model)
        //{
        //    string uniqueFileName = string.Empty;
        //    if (model.ImagePath != null)
        //    {
        //        string uploadFolder = Path.Combine(environment.WebRootPath, "Content/Laptop/");
        //        uniqueFileName = Guid.NewGuid().ToString() + "_" + model.ImagePath.FileName;
        //        string filePath = Path.Combine(uploadFolder, uniqueFileName);
        //        using (var fileStream = new FileStream(filePath, FileMode.Create))
        //        {
        //            model.ImagePath.CopyTo(fileStream);
        //        }
        //    }
        //    return uniqueFileName;
        //}
    }
}
