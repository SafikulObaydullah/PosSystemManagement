using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IAccountFacade
    {
        IEnumerable<LoginUser> GetAuthenticUserData(Login o);
        IEnumerable<SaveVM> SaveUser(LoginUser o);
    }
}
