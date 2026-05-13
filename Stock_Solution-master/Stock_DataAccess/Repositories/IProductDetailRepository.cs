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

namespace Stock_DataAccess.Repositories
{
    public interface IProductDetailRepository : IBaseRepository<Product>
    {
        List<Product> GetProductDetail();
      void Update(Product entity); 
      List<ProductVM> GeProductDetailById(int Id);
    }
    public class ProductDetailRepository : BaseRepository<Product>, IProductDetailRepository
    {
        private StockModel _context;
        private object data;

        public ProductDetailRepository(StockModel context) : base(context)
        {
            _context = context;
        } 
        public void Update(ProductTable entity)
        {
            _context.ProductTables.Update(entity);
        }
        public List<Product> GetProductDetail()
        { 
         List<Product> result = (from prd in _context.Products
                                      join catg in _context.Categories on prd.CatId equals catg.Id 
                                 select new Product
                                 { 
                                   Id = prd.Id,
                                   BrandId = prd.BrandId,
                                   CatId = catg.Id,
                                   //SubCategoryId = prd.SubCategoryId,
                                   //Description = prd.Description,
                                   //DiscountType = prd.DiscountType,
                                   //MinimumQuantity = prd.MinimumQuantity,   
                                   //Quantity = prd.Quantity,
                                   //Price = prd.Price,
                                   //SKU = prd.SKU,
                                   //ProductImageUrl = prd.ProductImageUrl,
                                   //Tax = prd.Tax,
                                   Status = prd.Status,
                                   UnitId = prd.UnitId 
                                 }).ToList();
         return result;
      }
       

        public void Update(Product entity)
        {
            throw new NotImplementedException();
        }

        public List<ProductVM> GeProductDetailById(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
