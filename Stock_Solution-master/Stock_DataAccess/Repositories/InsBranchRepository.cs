using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IInsBranchRepository : IBaseRepository<InsBranch>
    {
        void Update(InsBranch entity);
    }
    public class InsBranchRepository : BaseRepository<InsBranch>, IInsBranchRepository
    {
        private StockModel _context;
        public InsBranchRepository(StockModel context) : base(context)
        {
            _context = context;
        }
        public void Update(InsBranch entity)
        { 
            _context.InsBranches.Update(entity);
        }

    }
}
