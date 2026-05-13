using EntityFrameworkCore.RawSQLExtensions.Extensions;
using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IAccountRepo : IBaseRepository<LoginUser>
    {
        IEnumerable<LoginUser> GetAuthenticUserData(Login o);
        IEnumerable<LoginUser> GetAllUserData(long id);
        IEnumerable<SaveVM> SaveUser(LoginUser o);
    }
    public class AccountRepository : BaseRepository<LoginUser>, IAccountRepo
    {
        private StockModel _context;
        public AccountRepository(StockModel context) : base(context)
        {
            _context = context;
        }
        public IEnumerable<LoginUser> GetAuthenticUserData(Login o)
        {
            string SP = "AuthenticateUserData_SP'" + o.Username + "','" + o.Password + "'";
            var result = _context.Database.SqlQuery<LoginUser>(SP).ToList();
            return result;
        }
        public IEnumerable<LoginUser> GetAllUserData(long id)
        {
            string SP = "GetAllUserData_SP " + id;
            var result = _context.Database.SqlQuery<LoginUser>(SP).ToList();
            return result;
        }
        public IEnumerable<SaveVM> SaveUser(LoginUser o)
        {
            string SP = "InsertUpdateUserInfo_SP '" + o.ID + "','" + o.Name + "','" + o.UserName + "','" + o.Password + "'," + o.Email + ",'" + o.Designation + "'," + o.UserTypeAttributeID + "," + o.UserSectionID + "," + o.IsActive + "," + o.Creator + "";
            var result = _context.Database.SqlQuery<SaveVM>(SP).ToList();
            return result;
        }
    }
}
