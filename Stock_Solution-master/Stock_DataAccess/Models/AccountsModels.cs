using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.Models
{
    #region Accounts
    


    public class LedgerGroup : BaseDTO
    {
        public int ID { get; set; }
        public string LedgerGroupName { get; set; }
        public string Description { get; set; }
        [Required(AllowEmptyStrings = true)]
        public int ParentID { get; set; }
        public int GroupCode { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; }
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    public class ChartsofAccount : BaseDTO
    {
        public int ID { get; set; }
        public string AccName { get; set; }
        public string AccShortName { get; set; }
        public string Description { get; set; }
        [DataType("decimal(16,2)")]
        public decimal OpeningBalance { get; set; }
        public int GroupID { get; set; }
        public int AccCode { get; set; }
        public int CompanyID { get; set; }
        public bool IsSubledger { get; set; }
        public bool IsInventory { get; set; }
        public int AccType { get; set; }
        [ForeignKey("Institute")]
        public int insId { get; set; }
        [ForeignKey("InsBranch")]
        public int inBranchsId { get; set; }
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    public class TransMaster : BaseDTO
    {
        public int ID { get; set; }
        public int? TransNO { get; set; }
        public string? InvoiceNO { get; set; }//come from  sales& purchase table
        public DateTime? vdate { get; set; }
        public string? vtype { get; set; }
        public string? vno { get; set; }
        public decimal? CRate { get; set; }
        public int? AccID { get; set; }
        public decimal? Amount { get; set; }
        //-1/+1
        public int? AmountType { get; set; } = 1;
        public int? RefAccID { get; set; }
        public int? SubID { get; set; }
        public string? UserID { get; set; }
        public int? isPosted { get; set; }
        public int? TaxID { get; set; }
        public int? VoucherTypeId { get; set; }
        public int? MoneyReceiptId { get; set; }
        public int? BillModeID { get; set; }
        public decimal? BillAmount { get; set; }
        public int? IsNormalVoucher { get; set; }
        public string? RefNo { get; set; }
        public string? Narration { get; set; }
        [ForeignKey("Institute")]
        public int? InsId { get; set; }
        [ForeignKey("InsBranch")]
        public int? InBranchsId { get; set; } 
        public virtual Institute? Institute { get; set; }
        public virtual InsBranch? InsBranch { get; set; }
    }
    //public class TransDetails
    //{

    //}

    #endregion
}
