using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class UnitVM
   {
      public int Id { get; set; }
      public string? Name { get; set; }
      public string? Shortname { get; set; }
      public string? InstituteName { get; set; }
      public string? InstituteBranchName { get; set; }
      public int insId { get; set; }
      public int inBranchsId { get; set; }
   }
    public class CreateMailBodyVM
    {
        public long IntJobMasterId { get; set; }
        public long AccountId { get; set; }
        public string StrCompanyName { get; set; }
        public string StrFirstName { get; set; }
        public string StrLastName { get; set; }
        public string StrPosition { get; set; }
        public string StrMailBody { get; set; }
        public string StrMailSubject { get; set; }
        public string StrsentTo { get; set; }

    }
    public class SendMail
    {
        public string SendTo { get; set; }
        public string SendBy { get; set; }
        public string MailSubject { get; set; }
        public string MailBody { get; set; }
        public bool? IsHtmlFormat { get; set; }
    }
    public class SaveVM
    {
        public Int64 ID { get; set; }
        public string GID { get; set; }
        public int Code { get; set; }
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
    }
    public enum ProjectCodes
    {
        None = 0,
        Success = 200,
        BadRequest = 400,
        Unauthorized = 401,
        NotFound = 404,
        Error = 500
    }
}
