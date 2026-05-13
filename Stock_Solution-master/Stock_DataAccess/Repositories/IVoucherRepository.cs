using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IVoucherRepository : IBaseRepository<VoucherTypes>
    {
        void Update(VoucherTypes entity);
    }
    public class VoucherRepository : BaseRepository<VoucherTypes>, IVoucherRepository
   {
        private StockModel _context;
        public VoucherRepository(StockModel context) : base(context)
        {
            _context = context;
        } 
        public void Update(VoucherTypes entity)
        {
            _context.VoucherTypes.Update(entity);
        }

    }
}
