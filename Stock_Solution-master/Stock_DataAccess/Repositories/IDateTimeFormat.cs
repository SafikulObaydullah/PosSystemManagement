using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IDateTimeFormatRepository : IBaseRepository<DateTimeFormatVM>
    {
        List<DateTimeFormatVM> GetDateTimeFormat();
        void Update(DateTimeFormat entity);
    }
    public class DateTimeFormatRepository : BaseRepository<DateTimeFormatVM>, IDateTimeFormatRepository
    {
        private StockModel _context;
        public DateTimeFormatRepository(StockModel context) : base(context)
        {
            _context = context;
        }
        public List<DateTimeFormatVM> GetDateTimeFormat()
        {
            var data = _context.DateTimeFormats.ToList();
            List<DateTimeFormatVM> result = _context.DateTimeFormats.Select(s =>
                       new DateTimeFormatVM
                       {
                            StartDate = s.StartDate.ToString(),
                            EndDate = s.EndDate.ToString(),
                       }).ToList();
            return result;
        }
        public void Update(DateTimeFormat entity)
        {
            _context.DateTimeFormats.Update(entity);
        }
    }
}
