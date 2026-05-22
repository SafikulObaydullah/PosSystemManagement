using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc; 
using System.Xml.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using EntityFrameworkCore.RawSQLExtensions.Extensions;

namespace Stock_DataAccess.Repositories
{
    public interface IProductRepository : IBaseRepository<Product>
    {
      List<Movie> GetMovies();  
      List<ProductVM> GetProduct();
      IEnumerable<ProductVM> GetProductById(long Id);
      List<VehicleVM> GetVehicleNameList(string Prefix);
      void Update(Product entity);
      List<VehicleVM> GetDropdownVehicleNameList();
      List<ProductVM> GetProductListByVehicleId(int Id);
      SaveVM SaveSubCategory(SubCategory obj);
      SaveVM SaveBrand(Brand obj);
      IEnumerable<SubCategory> GetSubCategoryList();
      IEnumerable<SubCategory> GetSubCategoryById(long Id);
    }
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        private StockModel _context;
        private object data;

        public ProductRepository(StockModel context) : base(context)
        {
            _context = context;
        } 
        public void Update(Product entity)
        {
            _context.Products.Update(entity);
        }
        public List<ProductVM> GetProduct()
        { 
         List<ProductVM> result = (from prd in _context.Products
                                 join catg in _context.Categories on prd.CatId equals catg.Id 
                                 select new ProductVM
                                 { 
                                   Id = prd.Id,
                                   Code = prd.Code,
                                   Name = prd.Name,
                                   CatId = prd.CatId, 
                                   CategoryName = catg.Name,
                                   Description = prd.Description,
                                   SalesPrice = prd.SalesPrice,   
                                   //Discountamount = prd.Discountamount,
                                   ////UnitId = prd.UnitId,    
                                   //Boxqty = prd.Boxqty,  
                                   ////insId = prd.insId, 
                                   ////inBranchsId = prd.inBranchsId, 
                                   //Vatamount = prd.Vatamount,
                                   //Vatrate = prd.Vatrate,
                                   //StockQty = prd.StockQty, 
                                   //Reorderlevel = prd.Reorderlevel,
                                   //Discountrate = prd.Discountrate,
                                   EntryDate = prd.EntryDate,
                                   EntryBy = prd.EntryBy,
                                   IsActive = prd.IsActive,
                                   //VehicleName = prd.VehicleName, 
                                   //ChasisNo = prd.ChasisNo, 
                                   //EngineNo = prd.EngineNo, 
                                   //ModelNo = prd.ModelNo,   
                                   //Color = prd.Color, 
                                   //FuelType = prd.FuelType, 
                                   //Mileage = prd.Mileage, 
                                 }).ToList();
         return result;
      }
        public List<VehicleVM> GetVehicleNameList(string term)
        {
            List<VehicleVM> result = (from prd in _context.Products
                                    select new VehicleVM
                                    {
                                    Id = prd.Id,
                                    //VehicleName = prd.VehicleName,
                                    }).ToList();
            //List<Vehicle> data = (from N in result
            //               where N.VehicleName.StartsWith(Prefix)
            //               select new { N.VehicleName }).ToList();
            //var data = result.Where(x=>x.VehicleName.StartsWith(Prefix)).FirstOrDefault();
            if (!string.IsNullOrEmpty(term))
            {
                result = result.Where(c => c.VehicleName.ToLower().Contains(term.ToLower())).ToList();
            }

            return result;
        }
        public List<ProductVM> GetProductListByVehicleId(int Id)
        {
            List<ProductVM> result = (from prd in _context.Products
                                    where prd.Id == Id 
                                    select new ProductVM
                                    {
                                        Id = prd.Id, 
                                        //Boxqty = prd.Boxqty, 
                                        //VehicleName = prd.VehicleName,
                                        //ChasisNo = prd.ChasisNo, 
                                        //EngineNo = prd.EngineNo,
                                        //Color = prd.Color,
                                        //FuelType = prd.FuelType,
                                        //ModelNo = prd.ModelNo,
                                        //Mileage = prd.Mileage,
                                        //Discountamount = prd.Discountamount, 
                                        //Discountrate = prd.Discountrate,
                                        Description = prd.Description, 
                                        EntryDate = prd.EntryDate,
                                        //CategoryName = prd.Category.Name,
                                        CatId = prd.CatId, 
                                        Code = prd.Code,   
                                        //inBranchsId = prd.inBranchsId, 
                                    }).ToList();  
            return result;
        }
        public List<VehicleVM> GetDropdownVehicleNameList()
        {
            List<VehicleVM> result = (from prd in _context.Products
                                    select new VehicleVM
                                    {
                                        Id = prd.Id,
                                        //VehicleName = prd.VehicleName,
                                    }).ToList();    
            return result;
        }
        public List<Movie> GetMovies()
        {
            var datas = _context.Movies
                .Include(x => x.Cinema)
                .Include(y => y.Producer)
                .Include(k => k.Actors_Movies)
                .Select(m => new Movie
                {
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    StartDate = m.StartDate,
                    EndDate = m.EndDate,
                    ImageURL = m.ImageURL,
                    CinemaId = m.CinemaId,
                    MovieCategory = m.MovieCategory,
                    Cinema = m.Cinema,
                    Producer = m.Producer,
                    Actors_Movies = m.Actors_Movies,
                    Price = m.Price,
                    ProducerId = m.ProducerId,
                })
                .ToList();

            return datas;
        }
        public IEnumerable<ProductVM> GetProductById(long Id)
        {
            var parms = new SqlParameter("@Id", Id);
            var result = _context.Database.SqlQuery<ProductVM>("GetProduct_SP @Id", parms).ToList();
            return result;
        }
        public IEnumerable<SubCategory> GetSubCategoryList()
        { 
            var result = _context.Database.SqlQuery<SubCategory>("GetSubCategory_SP").ToList();
            return result;
        }
        public IEnumerable<SubCategory> GetSubCategoryById(long Id)
        {
            var parms = new SqlParameter("@Id", Id);
            var result = _context.Database.SqlQuery<SubCategory>("GetSubCategoryByID_SP @Id", parms).ToList();
            return result;
        }
        public SaveVM SaveSubCategory(SubCategory obj)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "Id", Value = obj.Id }; 
                var ParentCategoryId = new SqlParameter { ParameterName = "ParentCategoryId", Value = obj.ParentCategoryId }; 
                var CategoryName = new SqlParameter
                {
                    ParameterName = "CategoryName",
                    Value = obj.CategoryName == null ? DBNull.Value : obj.CategoryName
                };
                var CategoryCode = new SqlParameter
                {
                    ParameterName = "CategoryCode",
                    Value = obj.CategoryCode == null ? DBNull.Value : obj.CategoryCode
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = obj.Description == null ? DBNull.Value : obj.Description
                };
                 
                var result = _context.Database.SqlQuery<SaveVM>("InsertUpdateSubCategory_SP  @Id,@ParentCategoryId,@CategoryName,@CategoryCode,@Description",
                    ID, ParentCategoryId,CategoryName, CategoryCode, Description).FirstOrDefault();
                if (result.IsSuccess == false)
                {
                    result.Code = (int)ProjectCodes.Error;
                }
                else
                {
                    result.Code = (int)ProjectCodes.Success;
                }
                var resultFinal = new SaveVM
                {
                    ID = result.ID,
                    IsSuccess = result.IsSuccess,
                    Code = result.Code,
                    Message = result.Message,
                };

                return resultFinal;
            }
            catch (Exception ex)
            {
                var result = new SaveVM
                {
                    ID = obj.Id,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
        public SaveVM SaveBrand(Brand obj)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "Id", Value = obj.Id }; 
                var BrandName = new SqlParameter
                {
                    ParameterName = "BrandName",
                    Value = obj.BrandName == null ? DBNull.Value : obj.BrandName
                };
                var Description = new SqlParameter
                {
                    ParameterName = "Description",
                    Value = obj.Description == null ? DBNull.Value : obj.Description
                };
                var ProductImageUrl = new SqlParameter
                {
                    ParameterName = "ProductImageUrl",
                    Value = obj.ProductImageUrl == null ? DBNull.Value : obj.ProductImageUrl
                };

                var result = _context.Database.SqlQuery<SaveVM>("InsertUpdateBrand_SP  @Id,@BrandName,@Description,@ProductImageUrl",
                    ID,BrandName,Description,ProductImageUrl).FirstOrDefault();
                if (result.IsSuccess == false)
                {
                    result.Code = (int)ProjectCodes.Error;
                }
                else
                {
                    result.Code = (int)ProjectCodes.Success;
                }
                var resultFinal = new SaveVM
                {
                    ID = result.ID,
                    IsSuccess = result.IsSuccess,
                    Code = result.Code,
                    Message = result.Message,
                };

                return resultFinal;
            }
            catch (Exception ex)
            {
                var result = new SaveVM
                {
                    ID = obj.Id,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        }
         
    }
}
