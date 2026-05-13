using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IExpensesRepository : IBaseRepository<Expense>
    {
        List<Expense> GetExpense();
        void Update(Expense entity);
    }
    public class ExpenseRepository : BaseRepository<Expense>,IExpensesRepository
{
         private StockModel _context;
         public ExpenseRepository(StockModel context) : base(context)
         {
            _context = context;
         }
         public List<Expense> GetExpense()
         {
            List<Expense> data = _context.Expenses.ToList();
            return data;
         }  
         public void Update(Expense entity)
         {
            _context.Expenses.Update(entity);
         } 
   }
}
