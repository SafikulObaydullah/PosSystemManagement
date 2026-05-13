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
    public interface IUnitRepository : IBaseRepository<Unit>
    {
        List<UnitVM> GetUnit();
        void Update(Unit entity);
    }
    public class UnitRepository : BaseRepository<Unit>, IUnitRepository
    {
        private StockModel _context;
        public UnitRepository(StockModel context) : base(context)
        {
            _context = context;
        }
      public List<UnitVM> GetUnit()
      {
         var data = _context.Units.ToList();
         List<UnitVM> result = _context.Units.Select(s =>
                       new UnitVM
                       {
                          Id = s.Id,
                          Name = s.Name,
                          Shortname = s.Name,
                          InstituteName = s.Institute.InstituteName,
                          InstituteBranchName = s.InsBranch.BranchName
                       }).ToList();
         return result;
      }
      public void Update(Unit entity)
        {
            _context.Units.Update(entity);
        } 
    }
}
