$(document).ready(function () { 

   var minDate = new Date();
   $("#sdate").datepicker({
      showAnim: "drop",
      dateFormat: "mm-dd-yy",
      numberOfMonth: 1,
      minDate: minDate,
      onClose: function (selectedDate) {
         $("#edate").datepicker("option", "minDate", selectedDate)
      },
      changeYear: true,
      showOn: "both",
      buttonText: "<i class='fa fa-calendar'> </i>"
      //changeMonth: true,
      //changeYear: true,

   })
   var minDate = "-10d";
   $("#datepicker").datepicker({ 
      dateFormat: 'MM-dd-yyyy',
      maxDate: "today",
      minDate: minDate,
      'showTimepicker': false,
      showAnim: "drop", 
      numberOfMonth: 1, 
      onClose: function (selectedDate) { 
         $("#datepicker").datepicker("option", "minDate", selectedDate)
      },
      changeYear: true,
     // /*showOn: "both",*/
     ///* buttonText: "<i class='fa fa-calendar'> </i>"*/

   });
   $("#datepicker").datepicker("setDate", "1");
})

function SavePurchaseInvoice() {
   var requestObj = new Object();
   var validate = true;
   validate = Validate();
   if (validate == true) {
      requestObj.ID = $("#txtId").val() == "" ? 0 : $("#txtId").val();
      requestObj.PurchaseDate = $("#dtePurchaseDate").val();
      requestObj.TotalQuantity = $("#txtTotalQuantity").val();
      requestObj.TotalPrice = $("#txtTotalPrice").val();
      requestObj.BonusAmount = $('#txtBonusAmount').val(); // == "" ? "" : moment($('#txtEffectiveTo').val()).format('YYYY-MM-DD');
      requestObj.NetAmount = $("#txtNetAmount").val();
      requestObj.VoucherNo = $("#txtVoucherNo").val();
      requestObj.TranNo = $("#txtTranNo").val();
      requestObj.InvoiceNo = $('#txtInvoiceNo').val(); // == "" ? "" : moment($('#txtEffectiveTo').val()).format('YYYY-MM-DD');
      requestObj.TDiscountrate = $("#txtTDiscountrate").val();
      requestObj.TVatrate = $("#txtTVatrate").val();
      requestObj.TDiscountamount = $("#txtTDiscountamount").val();
      requestObj.TVatamount = $('#txtTVatamount').val(); // == "" ? "" : moment($('#txtEffectiveTo').val()).format('YYYY-MM-DD');
      requestObj.Paidamount = $("#txtPaidamount").val();
      requestObj.Due = $("#txtDue").val();
      requestObj.Convence = $("#txtConvence").val();
      requestObj.Packing = $('#txtPacking').val(); // == "" ? "" : moment($('#txtEffectiveTo').val()).format('YYYY-MM-DD');
      requestObj.EntryBy = $("#txtEntryBy").val();
      requestObj.EntryDate = $("#dteEntryDate").val();
      requestObj.Note = $("#txtNote").val();
      requestObj.LaborCost = $('#txtLaborCost').val(); // == "" ? "" : moment($('#txtEffectiveTo').val()).format('YYYY-MM-DD');
      requestObj.TotalCost = $("#txtTotalCost").val();
      requestObj.UnitCostonTotal = $("#txtUnitCostonTotal").val();
      requestObj.UnitCost = $("#txtUnitCost").val();
      requestObj.isActive = true;
      requestObj.PurchaseDetails = PurchaseInvoiceList;
      $.ajax({
         url: "/https://localhost:7065/api/PurchaseInvoice/SavePurchaseMaster",
         type: "POST",
         dataType: "json",
         data: requestObj,
         success: function (data) {
            //if (data.statusCode == 200) {
            toastr.success(data.message, 'Success');
            //LoadPriceAgreementSearchData();
            //PriceAgreementDetailsList = data.data;
            //PriceAgreementDataBind(PriceAgreementDetailsList);

            //} else {
            //   toastr.warning(data.message, "Waring");
            //}
         },
         error: function (xhr, textStatus, errorThrown) {
            toastr.error('Error Saving', 'Error');
         }
      });
   }
}
function Calculate(input) {
   let rowIndex = input.closest('tr').rowIndex;
   console.log(rowIndex)
   let v = $("#PurchaseDetails_" + (rowIndex - 1) + "__UnitPrice").val()
   let q = $("#PurchaseDetails_" + (rowIndex - 1) + "__UnitQty").val();
   let t = v * q;
   console.log(q)
   console.log(t);
   $("#PurchaseDetails_" + (rowIndex - 1) + "__TotalPrice").val(t)
   let vatr = $("#PurchaseDetails_" + (rowIndex - 1) + "__Vatrate").val();
   let disr = $("#PurchaseDetails_" + (rowIndex - 1) + "__Discountrate").val();
   let vatAmt = (t * vatr) / 100;
   var disAmt = (t * disr) / 100;
   let net = (t + vatAmt) - disAmt
   console.log("v " + vatr + "D " + disr)
   $("#PurchaseDetails_" + (rowIndex - 1) + "__Vatamount").val(vatAmt)
   $("#PurchaseDetails_" + (rowIndex - 1) + "__Discountamount").val(disAmt);
   $("#PurchaseDetails_" + (rowIndex - 1) + "__NetAmount").val(net)
   updateAmount();

}
function updateAmount() {
   var prices = $(this).find('.TotalPrice').val();
   console.log(prices);
   let tp = 0.0;
   let tq = 0.0;
   let tvrate = 0.0;
   let tvatAmt = 0.0;
   let tdrate = 0.0;
   let tdisAmt = 0.0;
   let tnetAmt = 0.0;
   $("#ExpTable tbody tr").each(function (index) {
      var price = $(this).find('.TotalPrice').val();
      var qty = $(this).find('.UnitQty').val();
      var vr = $(this).find('.Vatrate').val();
      var dr = $(this).find('.Discountrate').val();
      var vamt = $(this).find('.Vatamount').val();
      var damt = $(this).find('.Discountamount').val();
      var netAmt = $(this).find('.NetAmount').val();

      console.log("N:" + netAmt)
      tp += isNaN(price) ? 0 : parseFloat(price)
      tq += isNaN(qty) ? 0 : parseFloat(qty)
      tvrate += isNaN(vr) ? 0 : parseFloat(vr)
      tvatAmt += isNaN(vamt) ? 0 : parseFloat(vamt)
      tdrate += isNaN(dr) ? 0 : parseFloat(dr)
      tdisAmt += isNaN(damt) ? 0 : parseFloat(damt)
      tnetAmt += isNaN(netAmt) ? 0 : parseFloat(netAmt)
   })

   $("#TotalPrice").val(tp)
   $("#TotalQuantity").val(tq);
   $("#TVatrate").val(tvrate);
   $("#TDiscountrate").val(tdrate);
   $("#TVatamount").val(tvatAmt);
   $("#TDiscountamount").val(tdisAmt)
   $("#NetAmount").val(tnetAmt)
   let pamt = $("#Paidamount").val()

   let damt = (isNaN(tnetAmt) ? 0 : parseFloat(tnetAmt)) - (isNaN(pamt) ? 0 : parseFloat(pamt))

   console.log(tq)

   //  $("#Due").val(damt)
   calculateExpense();
}
function calculateExpense() {
   //alert("cal")
   let packing = isNaN($("#Packing").val()) ? 0 : parseFloat($("#Packing").val())
   let convence = isNaN($("#Convence").val()) ? 0 : parseFloat($("#Convence").val())
   let lcost = isNaN($("#LaborCost").val()) ? 0 : parseFloat($("#LaborCost").val())
   let tnetAmt = $("#NetAmount").val();
   let paid = isNaN($("#Paidamount").val()) ? 0 : parseFloat($("#Paidamount").val())
   let totalcost = ((isNaN(tnetAmt) ? 0 : parseFloat(tnetAmt)) + convence + packing + lcost)
   let due = ((isNaN(tnetAmt) ? 0 : parseFloat(tnetAmt)) + convence + packing + lcost) - paid;

   $("#Due").val(due)
   $("#Dueamt").val(due)
   $("#TotalCost").val(totalcost)
   let tqty = $("#TotalQuantity").val();
   let ucost = number(totalcost) / Number(tqty);
   console.log(ucost)
   $("#UnitCostonTotal").val(ucost)
   let missCost = convence + packing + lcost;
   let u = parseFloat(missCost) / tqty
   $("#UnitCost").val(u)
   console.log("packing " + packing)
   console.log("convence " + convence)
   console.log(tnetAmt)
   console.log("due :" + due)
}
function ChangeProductInfo(drp) {

   //  alert(drp.options[drp.selectedIndex].value);

   $.ajax({
      type: "Get",
      url: "/https://localhost:7065/api/Product/GetByID?Id=" + drp.options[drp.selectedIndex].value,  //remember change the controller to your owns.
      success: function (data) {
         console.log(data)
         console.log("Row index is: " + drp.closest('tr').rowIndex)
         //$("#ExpTable tbody tr").each(function (index) {
         console.log(data.data.result)
         //console.log($("#PurchaseDetails_[" + index + "]__UnitPrice").val())
         var rowIndex = drp.closest('tr').rowIndex;
         console.log(rowIndex)
         $("#lblunit-" + (rowIndex - 1)).text(data.data.result.unitName)
         var q = $("#PurchaseDetails_" + (rowIndex - 1) + "__UnitQty").val()
         var p = $("#PurchaseDetails_" + (rowIndex - 1) + "__UnitPrice").val()
         $("#PurchaseDetails_" + (rowIndex - 1) + "__UnitPrice").val(data.data.result.salesPrice)
         $("#PurchaseDetails_" + (rowIndex - 1) + "__ProductId").val(data.data.result.id)
         $("#PurchaseDetails_" + (rowIndex - 1) + "__Code").val(data.data.result.code)
         //var q = $("#PurchaseDetails[" + (rowIndex - 1) + "].UnitQty");
         $("#PurchaseDetails_" + (rowIndex - 1) + "__TotalPrice").val(p * q)
         $("#PurchaseDetails_" + (rowIndex - 1) + "__Discountrate").val(data.data.result.discountrate)
         $("#PurchaseDetails_" + (rowIndex - 1) + "__Discountamount").val(data.data.result.discountamount)
         $("#PurchaseDetails_" + (rowIndex - 1) + "__Vatrate").val(data.data.result.vatrate)
         $("#PurchaseDetails_" + (rowIndex - 1) + "__Vatamount").val(data.data.result.vatamount)
         $("#PurchaseDetails_" + (rowIndex - 1) + "__NetAmount").val()
         //})

      },
      error: function (response) {
         console.log(response.responseText);
      }
   });
}
function DeleteItem(btn) {

   console.log(btn)
   $(btn).closest('tr').remove();
}
function AddItem(btn) {
   var table = document.getElementById('ExpTable');
   var rows = table.getElementsByTagName('tr');

   var rowOuterHtml = rows[rows.length - 1].outerHTML;

   var lastrowIdx = document.getElementById('hdnLastIndex').value;

   var nextrowIdx = eval(lastrowIdx) + 1;

   document.getElementById('hdnLastIndex').value = nextrowIdx;

   rowOuterHtml = rowOuterHtml.replaceAll('_' + lastrowIdx + '_', '_' + nextrowIdx + '_');
   rowOuterHtml = rowOuterHtml.replaceAll('[' + lastrowIdx + ']', '[' + nextrowIdx + ']');
   rowOuterHtml = rowOuterHtml.replaceAll('-' + lastrowIdx, '-' + nextrowIdx);


   var newRow = table.insertRow();
   newRow.innerHTML = rowOuterHtml;



   var btnAddID = btn.id;
   var btnDeleteid = btnAddID.replaceAll('btnAdd', 'btndel');

   var delbtn = document.getElementById(btnDeleteid);
   delbtn.classList.add("visible");
   delbtn.classList.remove("invisible");


   var addbtn = document.getElementById(btnAddID);
   addbtn.classList.remove("visible");
   addbtn.classList.add("invisible");

}
