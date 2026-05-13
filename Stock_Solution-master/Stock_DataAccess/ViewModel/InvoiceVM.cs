using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_DataAccess.ViewModel
{
   public class InvoiceVM
   {
      public int Id { get; set; }
      public string InvoiceId { get; set; }
      public double BanlanceDue { get; set; }
      public string PaymentType { get; set; }
      public string VehicleName { get; set; }
      public string ChasisNo { get; set; }
      public string EngineNo { get; set; }
      public string FuelType { get; set; }
      public string Color { get; set; }
      public string ModelNo { get; set; }
      public int Mileage { get; set; }
      public double Amount { get; set; }
      public double Tax { get; set; }
      public double Discount { get; set; }
      public double TotalAmount { get; set; }
   }
}
