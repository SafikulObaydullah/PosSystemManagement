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
    public interface IProductTablesRepository : IBaseRepository<ProductTable>
    {
    
      void Update(ProductTable entity);
      List<VehicleVM> GetDropdownVehicleNameList();
      List<ProductVM> GetProductListByVehicleId(int Id);
      SaveVM SaveSubCategory(SubCategory obj); 
    }
    public class ProductTablesRepository : BaseRepository<ProductTable>, IProductTablesRepository
    {
        private StockModel _context;
        private object data;

        public ProductTablesRepository(StockModel context) : base(context)
        {
            _context = context;
        }

        public List<VehicleVM> GetDropdownVehicleNameList()
        {
            throw new NotImplementedException();
        }

        public List<ProductVM> GetProductListByVehicleId(int Id)
        {
            throw new NotImplementedException();
        }

        public SaveVM SaveSubCategory(SubCategory obj)
        {
            throw new NotImplementedException();
        }

        public void Update(ProductTable entity)
        {
            _context.ProductTables.Update(entity);
        } 
    }
}
