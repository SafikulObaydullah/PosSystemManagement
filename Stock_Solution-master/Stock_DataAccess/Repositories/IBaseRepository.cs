using Microsoft.EntityFrameworkCore;
using Stock_DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        //IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(Expression<Func<T, bool>>? predicate, string? includeProperties);
        IEnumerable<T> GetAllbyParent(Expression<Func<T, bool>> predicate);
      //IEnumerable<T> GetT(Expression<Func<T, bool>> predicate);
        IEnumerable<T> GetByID(Expression<Func<T, bool>> predicate);
        T? GetByIntId(int id);
        void Delete(T entity);
        void DeletebyID(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Add(List<T> entity);
        void DeleteRange(IEnumerable<T> entitylist);
        int GetMaxId();
    }

    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {

        private readonly StockModel _context;
        private DbSet<T> _dbset;
        public BaseRepository(StockModel context)
        {
            _context = context;
            _dbset = _context.Set<T>();
        }

        public void Add(T entity)
        {
            _dbset.Add(entity);
        }
        public void Add(List<T> entity)
        {
            _dbset.AddRange(entity);
        }
        public void Delete(T entity)
        {
            _dbset.Remove(entity);
        }
        public int GetMaxId()
        {
            var entityType = _context.Model.FindEntityType(typeof(T));
            var primaryKey = entityType.FindPrimaryKey();
            var propertyName = primaryKey.Properties.Select(x => x.Name).Single();

            var maxId = _context.Set<T>().Max(entity => EF.Property<int>(entity, propertyName));
            return maxId;
        }

        public void DeletebyID(Expression<Func<T, bool>> predicate)
        {
            var entity = _dbset.Where(predicate).FirstOrDefault();
            _dbset.Remove(entity);
        }
        public void DeleteRange(IEnumerable<T> entitylist)
        {
            _dbset.RemoveRange(entitylist);
        } 
        public IEnumerable<T> GetByID(Expression<Func<T, bool>> predicate)
        {
            try
            {
                return _dbset.Where(predicate).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public T? GetByIntId(int id)
        {
            return _context.Set<T>().Find(id);
        }

        //public IEnumerable<T> GetAll()
        //{
        //    try
        //    {
        //        var data = _dbset.ToList();
        //        return data;
        //    }
        //    catch(Exception ex)
        //    {
        //        return new List<T>();

        //    }

        //}
        //public IEnumerable<T> GetAll(Expression<Func<T,bool>>? predicate,string? includeProperties)
        public IEnumerable<T> GetAll(Expression<Func<T, bool>>? predicate, string? includeProperties)
        {
            IQueryable<T> query = _dbset;
            try
            {
                if (predicate != null)
                {
                    query = query.Where(predicate);
                }
                if (includeProperties != null)
                {
                    foreach (var item in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                    {
                        query = query.Include(item);
                    }
                }
                return query.ToList();
            }
            catch (Exception ex)
            {
                return query.ToList();
            } 
        } 
        public IEnumerable<T> GetAllbyParent(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = _dbset;
            try
            {
                if (predicate != null)
                {
                    query = query.Where(predicate);
                } 
                return query.ToList();
            }
            catch (Exception ex)
            {
                return query.ToList(); 
            } 
        }
       
   }
}
