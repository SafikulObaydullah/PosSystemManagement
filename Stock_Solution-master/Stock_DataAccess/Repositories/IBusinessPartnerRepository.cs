using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
namespace Stock_DataAccess.Repositories
{
    public interface IBusinessPartnerRepository : IBaseRepository<BusinessPartner>
    {
        List<BusinessPartnerVM> GetBusinessPartner();
        void Update(BusinessPartner entity);
    } 
    public class BusinessPartnerRepository : BaseRepository<BusinessPartner>, IBusinessPartnerRepository
    {
         private StockModel _context;
         public BusinessPartnerRepository(StockModel context) : base(context)
         {
            _context = context;
         }
         public List<BusinessPartnerVM> GetBusinessPartner()
         {
            var data = _context.Purchasemasters.ToList();
            List<BusinessPartnerVM> result = (from s in _context.BusinessPartners 
                                             join institute in _context.Institutes on s.insId equals institute.Id
                                             join branch in _context.InsBranches on s.inBranchsId equals branch.Id    
                                             select new BusinessPartnerVM
                                             {
                                                Id = s.Id,  
                                                Name = s.Name,  
                                                Address = s.Address,
                                                ContactDate = s.ContactDate,
                                                ContactNo = s.ContactNo,
                                                ContactPerson = s.ContactPerson,
                                                EntryBy = s.EntryBy, 
                                                EntryDate = s.EntryDate,
                                                Mobile = s.Mobile,
                                                SubDistrictID = s.SubDistrictID,
                                                insId = s.insId,  
                                                InsttituteName = institute.InstituteName,
                                                inBranchsId = s.inBranchsId,
                                                InstituteBranchName = branch.BranchName 
                                             }).ToList();
                     return result;
         }  
         public void Update(BusinessPartner entity)
         {
            _context.BusinessPartners.Update(entity);
         } 
   }
}
