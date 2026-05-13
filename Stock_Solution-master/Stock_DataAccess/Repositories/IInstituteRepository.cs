using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IInstituteRepository : IBaseRepository<Institute>
    {
        void Update(Institute entity);
    }
    public class InstituteRepository : BaseRepository<Institute>, IInstituteRepository
    {
        private StockModel _context;
        public InstituteRepository(StockModel context) : base(context)
        {
            _context = context;
        }

        public void Update(Institute entity)
        {
            _context.Institutes.Update(entity);
        } 
    }
}
