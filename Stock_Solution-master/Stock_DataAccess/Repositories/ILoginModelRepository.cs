using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface ILoginModelRepository:IBaseRepository<LoginModel>
    {
        void Update(LoginModel Entity);
    }
    public class LoginModelRepository : BaseRepository<LoginModel>, ILoginModelRepository
    {
        private StockModel _context;
        public LoginModelRepository(StockModel context) : base(context)
        {
            _context = context;
        }

        public void Update(LoginModel entity)
        {
            _context.LoginModels.Update(entity);
        }



    }
}
