using EntityFrameworkCore.RawSQLExtensions.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Stock_DataAccess.Repositories.CategoryRepository;

namespace Stock_DataAccess.Repositories
{
    public interface IDocumentUpload : IBaseRepository<DocumentUpload>
    { 
        List<DocumentUpload> GetDocument(); 
    }
    public class DocumentUploadRepository : BaseRepository<DocumentUpload>, IDocumentUpload
    {
        private StockModel _contexts;
        public DocumentUploadRepository(StockModel context) : base(context)
        {
            _contexts = context;
        }

        public List<DocumentUpload> GetDocument()
        {
            var data = _contexts.DocumentUploads.ToList();
            return data;
        }
    }
    public interface ICategoryRepository : IBaseRepository<Category>
    {
      List<CategoryVM> GetCategory();  
      void Update(Category entity);
        SaveVM GlobalFileUrl(GlobalFileUrl obj);
    }
    public interface IBrandRepository : IBaseRepository<Brand>
    { 
        List<Brand> GetBrand(); 
    }
    public interface ISubCateogyRepository : IBaseRepository<SubCategory>
    {
        List<SubCategory> GetSubCategory();
    }
    public class SubCategoryRepository : BaseRepository<SubCategory>, ISubCateogyRepository
    {
        private StockModel _context;
        public SubCategoryRepository(StockModel context) : base(context)
        {
            _context = context;
        }
        public List<SubCategory> GetSubCategory()
        { 
            List<SubCategory> result = _context.SubCategories.Select(s =>
                          new SubCategory
                          {
                              Id = s.Id,
                              CategoryName = s.CategoryName,
                              CategoryCode = s.CategoryCode,
                              Description = s.Description,  
                              ParentCategoryId = s.ParentCategoryId,    

                          }).ToList();
            return result;
        }

    }
    public class BrandRepository : BaseRepository<Brand>, IBrandRepository
    {
        private StockModel _context;
        public BrandRepository(StockModel context) : base(context)
        {
            _context = context;
        }
        public List<Brand> GetBrand()
        {
            var data = _context.Brands.ToList();
            List<Brand> result = _context.Brands.Select(s =>
                          new Brand
                          {
                              Id = s.Id,
                              BrandName = s.BrandName,
                              Description = s.Description,
                              ProductImageUrl = s.ProductImageUrl

                          }).ToList();
            return result;
        }

    }
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        private StockModel _context;
        public CategoryRepository(StockModel context) : base(context)
        {
            _context = context;
        }
      public List<CategoryVM> GetCategory()
      {

         var data = _context.Categories.ToList();
         List<CategoryVM> result = _context.Categories.Select(s =>
                       new CategoryVM
                       {
                          Id = s.Id,
                          Name = s.Name,
                          Description = s.Description,
                          ParentName = (from c in _context.Categories
                                        join p in _context.Categories on c.ParentId
                                           equals p.Id
                                        where s.ParentId.Equals(p.Id)
                                        select p.Name
                                             ).FirstOrDefault() ?? "parent",
                          ParentId = s.ParentId
                       }).ToList();
         return result;
      }
      public void Update(Category entity)
      {
         _context.Categories.Update(entity);
      }
      public SaveVM GlobalFileUrl(GlobalFileUrl obj)
        {
            try
            {
                var ID = new SqlParameter { ParameterName = "ID", Value = obj.ID };
                var ReferrenceNo = new SqlParameter
                {
                    ParameterName = "ReferrenceNo",
                    Value = obj.ReferrenceNo == null ? DBNull.Value : obj.ReferrenceNo
                };
                var FileServerId = new SqlParameter
                {
                    ParameterName = "FileServerId",
                    Value = obj.FileServerId == null ? DBNull.Value : obj.FileServerId
                };
                var ReferenceDescription = new SqlParameter
                {
                    ParameterName = "ReferenceDescription",
                    Value = obj.ReferenceDescription == null ? DBNull.Value : obj.ReferenceDescription
                };
                var DocumentTypeId = new SqlParameter
                {
                    ParameterName = "DocumentTypeId",
                    Value = obj.DocumentTypeId == null ? DBNull.Value : obj.DocumentTypeId
                };
                var DocumentName = new SqlParameter
                {
                    ParameterName = "DocumentName",
                    Value = obj.DocumentName == null ? DBNull.Value : obj.DocumentName
                };
                var NumFileSize = new SqlParameter
                {
                    ParameterName = "NumFileSize",
                    Value = obj.NumFileSize == null ? DBNull.Value : obj.NumFileSize
                };
                var FileExtension = new SqlParameter
                {
                    ParameterName = "FileExtension",
                    Value = obj.FileExtension == null ? DBNull.Value : obj.FileExtension
                };
                var ServerLocation = new SqlParameter
                {
                    ParameterName = "ServerLocation",
                    Value = obj.ServerLocation == null ? DBNull.Value : obj.ServerLocation
                };
                var isActive = new SqlParameter { ParameterName = "isActive", Value = true };
                var Creator = new SqlParameter { ParameterName = "Creator", Value = obj.Creator };
                //var result = _context.Database.SqlQuery<SaveVM>("InsertUpdateGlobalFileUrl_SP  @ID,@ReferrenceNo,@FileServerId,@ReferenceDescription,@DocumentTypeId,@DocumentName,@NumFileSize,@FileExtension,@ServerLocation,@IsActive,@Creator",
                //    ID, ReferrenceNo, FileServerId, ReferenceDescription, DocumentTypeId, DocumentName, NumFileSize, FileExtension, ServerLocation, isActive, Creator).FirstOrDefault();
                //var result = _context.Database.SqlQuery<LoginUser>(SP).ToList();
                var result = _context.Database.SqlQuery<SaveVM>("InsertUpdateGlobalFileUrl_SP  @ID,@ReferrenceNo,@FileServerId,@ReferenceDescription,@DocumentTypeId,@DocumentName,@NumFileSize,@FileExtension,@ServerLocation,@IsActive,@Creator",
                    ID, ReferrenceNo, FileServerId, ReferenceDescription, DocumentTypeId, DocumentName, NumFileSize, FileExtension, ServerLocation, isActive, Creator).FirstOrDefault();
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
                    ID = obj.ID,
                    Code = (int)ProjectCodes.Error,
                    Message = ex.Message,
                    IsSuccess = false
                };
                return result;
            }
        } 
      
    }
}
