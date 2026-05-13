using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IInstituteBranchRepository : IBaseRepository<InsBranch>
    {
        void Update(InsBranch Entity);
    }
    public class InstituteBranchRepository : BaseRepository<InsBranch>, IInstituteBranchRepository
    {
        private StockModel _context;
        public InstituteBranchRepository(StockModel context) : base(context)
        {
            _context = context;
        }

        public void Update(InsBranch entity)
        {
            _context.InsBranches.Update(entity);
        }

    }
}
