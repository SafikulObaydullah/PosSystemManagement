using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface ILaptopRepository : IBaseRepository<Laptop>
    {
        List<Laptop> GetLaptop();
        void Update(Laptop entity);
    }
    public class LaptopRepository : BaseRepository<Laptop>, ILaptopRepository
    {
         private StockModel _context;
         public LaptopRepository(StockModel context) : base(context)
         {
            _context = context;
         }
         public List<Laptop> GetLaptop()
         { 
            List<Laptop> result = (from s in _context.Laptops  
                                         select new Laptop
                                         {
                                             Id = s.Id,
                                             Brand = s.Brand,
                                             ImagePath = s.ImagePath,   
                                             Description = s.Description,
                                             Path = s.Path, 
                                         }).ToList();
            return result;
         }
         public void Update(Laptop entity)
         {
            _context.Laptops.Update(entity);
         }
   }
}
