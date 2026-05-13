var ProductList = []
var SupplierList = []
var PaymentMethodList = [] 
var VoucherList = [] 
var InstituteList = []
var InsBranchList = []
var PurchaseInvoiceList = []
var PriceAgreementSearchList = []
var PriceAgreementParentAndChildList = []
var PriceAgreementDetailsList = []

var currentDate = new Date();
var year = currentDate.getFullYear();
var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
var day = currentDate.getDate().toString().padStart(2, '0');
var formattedDate = month + "-" + day + "-" + year;


$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
$(document).ready(function (){
   LoadInitalData();
   LoadPriceAgreementSearchData();
   AddPurchaseDetails(input);
   BindPurchaseDetailsInfo(PurchaseInvoiceList);
});
function LoadPriceAgreementSearchData() {
   //$.ajax({
   //   url: "/PriceAgreement/GetSearchData",
   //   method: "GET",
   //   dataType: "json",
   //   success: function (data) {
   //      if (data.statusCode = "200") {
   //         PriceAgreementDetailsList = data.searchList;
   //         BindPriceAgreementList(PriceAgreementDetailsList);
   //      }
   //      else {

   //      }
   //   },
   //   error: function (jqXHR, textStatus, errorThrown) {
   //      console.log("Error:", textStatus, errorThrown);
   //   }
   //});
}
function LoadInitalData() {
   $.ajax({
      url: "https://localhost:7065/api/PurchaseInvoice/GetInitialData",
      method: "GET",
      dataType: "json",
      success: function (data) {
         ProductList = data.product; 
         SupplierList = data.supplier;
         PaymentMethodList = data.paymentMethod;
         VoucherList = data.vouchertype;
         InstituteBranchList = data.insBranch;
         InstituteList = data.institute;
         console.log("ProductList = ", ProductList);
         console.log("SupplierList ", SupplierList);
         console.log("PaymentMethodList = ", PaymentMethodList); 
         console.log("Institute = ", InstituteList);
         console.log("Branch List ", InstituteBranchList);
         console.log("VoucherList ", VoucherList);
         var institute = '<option selected  value="2">Select Institute</option>';
         for (var i = 0; i < InstituteList.length; i++) {
            institute += '<option value="' + InstituteList[i].id + '">' + InstituteList[i].instituteName + '</option>';
         }
         $("#ddlInstitute").html(institute);

         var Branch = '<option selected disabled hidden value="3">Select Institute Branch</option>';
         for (var i = 0; i < InstituteBranchList.length; i++) {
            Branch += '<option value="' + InstituteBranchList[i].id + '">' + InstituteBranchList[i].branchName + '</option>';
         }
         $("#ddlInsBranch").html(Branch);
         var Product = '<option>Select Product</option>';
         for (var i = 0; i < ProductList.length; i++) { 
            Product += '<option selected value="' + ProductList[i].id + '">' + ProductList[i].name + '</option>';
         }
         $("#ddlProduct").html(Product);

         var Supplier = '<option selected disabled hidden value="19">Select Supplier</option>';
         for (var i = 0; i < SupplierList.length; i++) { 
            Supplier += '<option value="' + SupplierList[i].id + '">' + SupplierList[i].name + '</option>';
         }
         $("#ddlSupplier").html(Supplier);

         var PaymentMethod = '<option selected disabled hidden value="1">Select PaymentMethod</option>';
         for (var i = 0; i < PaymentMethodList.length; i++) { 
            PaymentMethod += '<option value="' + PaymentMethodList[i].id + '">' + PaymentMethodList[i].name + '</option>';
         }
         $("#ddlPaymentMethod").html(PaymentMethod);

         var vouchertype = '<option selected disabled hidden value="1">Select Voucher</option>';
         for (var i = 0; i < VoucherList.length; i++) {
            vouchertype += '<option value="' + VoucherList[i].id + '">' + VoucherList[i].voucharName + '</option>';
         }
         $("#ddlVoucherType").html(vouchertype); 
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });
}
var rowIndex = 0;
function AddPurchaseDetails(input) {
  //var   rowIndexVale = input.closest('tr').rowIndex;
   var o = new Object();
   var validate = true;
   validate = PurchaseDetailsValidate();
   if (validate == true) {
      /*o.ParentID = $("#txtId").val() == "" ? 0 : $("#txtId").val();*/
      o.ProductID = $('#ddlProduct').val() == undefined ? 0 : $('#ddlProduct' ).val();
      /*o.UnitID = $('#ddlUnit').val() == undefined ? 0 : $('#ddlProductID').val();*/
      o.name = $("#ddlProduct :selected" ).text();
      /*o.Unit = $('#txtUnit').val() == undefined ? 0 : $('#txtUnit').val(); */
      o.Qty = $('#txtQty').val() == undefined ? 0 : $('#txtQty' ).val();
      o.UnitPrice = $('#txtUnitPrice').val() == undefined ? 0 : $('#txtUnitPrice' ).val();
      o.TotalPrice = $('#txtTotalPrice').val() == undefined ? 0 : $('#txtTotalPrice' ).val();
      o.VatRate = $('#txtVatRate').val() == undefined ? 0 : $('#txtVatRate' ).val();
      o.VatAmount = $('#txtVatAmount' ).val() == undefined ? 0 : $('#txtVatAmount' ).val();
      o.DiscountRate = $('#txtDiscountRate').val() == undefined ? 0 : $('#txtDiscountRate' ).val();
      o.DiscountAmount = $('#txtDiscountAmount' ).val() == undefined ? 0 : $('#txtDiscountAmount' ).val();
      o.Bonus = $('#txtBonus').val() == undefined ? 0 : $('#txtBonus' ).val();
      o.NetAmount = $('#txtNetAmount' ).val() == undefined ? 0 : $('#txtNetAmount' ).val();
      var FilterData = _.filter(PurchaseInvoiceList, function (item) {
         return item.ProductID == o.ProductID 
      });
      //if (FilterData.length > 0) {
      //   toastr.warning("Already Added", "Waring");
      //}
      //else {
         PurchaseInvoiceList.push(o);
         BindPurchaseDetailsInfo(PurchaseInvoiceList);
      //}
   }
}
function PurchaseDetailsValidate(){
   if ($("#ddlProduct :selected").text() == "" /*|| $("#ddlProduct").selectedIndex == -1*/) {
      $("#ddlProduct").focus();
      $("#ddlProduct").open();
      toastr.warning('Please input Product', "Warning");
      return false;
   }
   //if ($("#ddlTestStandard").data('kendoComboBox').value() == "" || $("#ddlTestStandard").data('kendoComboBox').selectedIndex == -1) {
   //   $("#ddlTestStandard").data('kendoComboBox').focus();
   //   $("#ddlTestStandard").data('kendoComboBox').open();
   //   toastr.warning('Please input TestStandard Name', "Warning");
   //   return false;
   //}
   return true;
}

function BindPurchaseDetailsInfo(data) {
   console.log("Data Value = ",data);
   $("#ExpTable").html('');
   var sl = 1;
   var html = '<table class="table table-vcenter card-table">' +
      ' <tr><th>SL</th><th>Product</th><th>Qty</th><th>Unit</br>Price</th><th>Total</br>Price</th><th>Vat</br>Rate</th><th>Vat</br>Amount</th><th>Discount</br>Rate</th><th>Discount</br>Amount</th><th>Bonus</th><th>Net</br> Amount</th><th>Action</th>' +
      '</tr>';
   for (var i = 0; i < data.length; i++) {
      html += "<tr><td id='slNo' style='width:0%;text-align:center;'>" + sl + "</td>" +
         "<td style='width:10%;text-align:left;'>" + data[i].name + "</td>" +
         /*"<td style='width:10%;text-align:left;'>" + data[i].Unit + "</td>" + */
         "<td style='width:10%;text-align:left;' ><input type='number' class='form-control' style='width: 70px;' id='txtQty_" + i + "' onblur = 'PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' onchange='Calculate(this)' value = " + data[i].Qty + "></td>" +
         " <td style='width:10%;text-align:left;'><input type='number' class='form-control' style='width: 70px;' id='txtUnitPrice_" + i + "' onblur='PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' value=" + data[i].UnitPrice + "></td>" +
         "<td style='width:10%;text-align:left;' ><input type='number' class='form-control' style='width: 70px;' id='txtTotalPrice_" + i + "' onblur = 'PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' value = " + data[i].TotalPrice + "></td>" +
         " <td style='width:10%;text-align:left;'><input type='number' class='form-control' style='width: 70px;' id='txtVatRate_" + i + "' onblur='PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' onchange='Calculate(this)' value=" + data[i].VatRate + "></td>" +
         "<td style='width:10%;text-align:left;' ><input type='number' class='form-control' style='width: 70px;' id='txtVatAmount_" + i + "' onblur = 'PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' onchange='Calculate(this)' value = " + data[i].VatAmount + " ></td>"+
         " <td style='width:10%;text-align:left;'><input type='number' class='form-control' style='width: 70px;' id='txtDiscountRate_" + i + "' onblur='PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' onchange='Calculate(this)' value=" + data[i].DiscountRate + "></td>"+
         "<td style='width:10%;text-align:left;' ><input type='number' class='form-control' style='width: 70px;' id='txtDiscountAmount_" + i + "' onblur = 'PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' value = " + data[i].DiscountAmount + "></td>" +
         " <td style='width:10%;text-align:left;'><input type='number' class='form-control' style='width: 70px;' id='txtBonus_" + i + "' onblur='PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' value=" + data[i].Bonus + "></td>" +
         "<td style='width:10%;text-align:left;' ><input type='number' class='form-control' style='width: 80px;' id='txtNetAmount_" + i + "' onblur = 'PurchaseDetailsUpdate(" + i + "," + data[i].ProductID + ")' value = " + data[i].NetAmount + "></td>" +
         /*" <td style='width:10%;text-align:left;'><button  class='btn btn-success ' onclick='AddPurchaseDetails()'>Add</button></td>" +*/
         " <td style='width:10%;text-align:left;'><button  class='btn btn-success ' onclick='DeletePurchaseDetails(" + data[i].ProductID + ")'>Delete</button></td>" +
         "</tr>";
      sl = sl + 1;
   }
   html += '</table>'
   $("#ExpTable").html(html);
}

function Calculate(input) {
   rowIndex = input.closest('tr').rowIndex;
   console.log("Row Index ", rowIndex)
   //let v = $("#PurchaseDetails_" + (rowIndex - 1) + "__UnitPrice").val()
   let q = $("#txtQty_" + (rowIndex - 1)).val();
   let v = $("#txtUnitPrice_" + (rowIndex - 1)).val()
   
   let t = v * q;
   console.log(q)
   console.log(t);
   $("#txtTotalPrice_" + (rowIndex - 1)).val(t)
   let vatr = $("#txtVatRate_" + (rowIndex - 1)).val();
   let disr = $("#txtDiscountRate_" + (rowIndex - 1)).val();
   let vatAmt = (t * vatr) / 100;
   var disAmt = (t * disr) / 100;
   let net = (t + vatAmt) - disAmt;
   console.log("v " + vatr + "D " + disr)
   $("#txtVatAmount_" + (rowIndex - 1)).val(vatAmt)
   $("#txtDiscountAmount_" + (rowIndex - 1)).val(disAmt);
   $("#txtNetAmount_" + (rowIndex - 1)).val(net)



   //updateAmount(); 
}
//function updateAmount() {
//   var prices = $('#txtTotalPrice_' + (rowIndex - 1)).val();
//   let tp = 0.0;
//   let tq = 0.0;
//   let tvrate = 0.0;
//   let tvatAmt = 0.0;
//   let tdrate = 0.0;
//   let tdisAmt = 0.0;
//   let tnetAmt = 0.0;
//   $("#ExpTable tbody tr").each(function (index) {
//   var price = $(this).find('txtTotalPrice_').val();
//   var qty = $(this).find('.UnitQty').val();
//   var vr = $(this).find('.Vatrate').val();
//   var dr = $(this).find('.Discountrate').val();
//   var vamt = $(this).find('.Vatamount').val();
//   var damt = $(this).find('.Discountamount').val();
//   var netAmt = $(this).find('.NetAmount').val();
//   console.log("N:" + netAmt)
//   tp += isNaN(price) ? 0 : parseFloat(price)
//   tq += isNaN(qty) ? 0 : parseFloat(qty)
//   tvrate += isNaN(vr) ? 0 : parseFloat(vr)
//   tvatAmt += isNaN(vamt) ? 0 : parseFloat(vamt)
//   tdrate += isNaN(dr) ? 0 : parseFloat(dr)
//   tdisAmt += isNaN(damt) ? 0 : parseFloat(damt)
//   tnetAmt += isNaN(netAmt) ? 0 : parseFloat(netAmt)
//   })

//   $("#TotalPrice").val(tp)
//   $("#TotalQuantity").val(tq);
//   $("#TVatrate").val(tvrate);
//   $("#TDiscountrate").val(tdrate);
//   $("#TVatamount").val(tvatAmt);
//   $("#TDiscountamount").val(tdisAmt)
//   $("#NetAmount").val(tnetAmt)
//   let pamt = $("#Paidamount").val()
//   //let damt = (isNaN(tnetAmt) ? 0 : parseFloat(tnetAmt)) - (isNaN(pamt) ? 0 : parseFloat(pamt))
//   damt = (isNaN(tnetAmt) ? 0 : parseFloat(tnetAmt)) - (isNaN(pamt) ? 0 : parseFloat(pamt))
//   console.log(tq)
//   //  $("#Due").val(damt)
//   calculateExpense();
//}
var Qty = 0;
var UnitPrice = 0;
var TotalPrice = 0;
var VatRate = 0;
var VatAmount = 0;
var DiscountRate = 0;
var DiscountAmount = 0;
var Bonus = 0;
var NetAmount = 0;  
let tp = 0.0;
let tq = 0.0;
let tvrate = 0.0;
let tvatAmt = 0.0;
let tdrate = 0.0;
let tdisAmt = 0.0;
let tnetAmt = 0.0;
function PurchaseDetailsUpdate(pos, Val) {
   Qty = "#txtQty_" + pos;
   UnitPrice = "#txtUnitPrice_" + pos;
   TotalPrice = "#txtTotalPrice_" + pos;
   VatRate = "#txtVatRate_" + pos;
   VatAmount = "#txtVatAmount_" + pos;
   DiscountRate = "#txtDiscountRate_" + pos;
   DiscountAmount = "#txtDiscountAmount_" + pos;
   Bonus = "#txtBonus_" + pos;
   NetAmount = "#txtNetAmount_" + pos; 
   var num1 = parseInt($(Qty).val());
   for (var i = 0; i < PurchaseInvoiceList.length; i++) {
      if (PurchaseInvoiceList[i].ProductID == Val) {
            PurchaseInvoiceList[i].Qty = num1; 
            PurchaseInvoiceList[i].UnitPrice = $(UnitPrice).val();
            PurchaseInvoiceList[i].TotalPrice = $(TotalPrice).val();
            PurchaseInvoiceList[i].VatRate = $(VatRate).val();
            PurchaseInvoiceList[i].VatAmount = $(VatAmount).val();
            PurchaseInvoiceList[i].DiscountRate = $(DiscountRate).val();
            PurchaseInvoiceList[i].DiscountAmount = $(DiscountAmount).val();
            PurchaseInvoiceList[i].Bonus = $(Bonus).val();
            PurchaseInvoiceList[i].NetAmount = $(NetAmount).val(); 

         $("#TotalQuantity").val(PurchaseInvoiceList[i].Qty);
      }
      console.log("N:" + netAmt)
      tp += isNaN(PurchaseInvoiceList[i].UnitPrice) ? 0 : parseFloat(PurchaseInvoiceList[i].UnitPrice)
      tq += isNaN(PurchaseInvoiceList[i].Qty) ? 0 : parseFloat(PurchaseInvoiceList[i].Qty)
      tvrate += isNaN(PurchaseInvoiceList[i].VatRate) ? 0 : parseFloat(PurchaseInvoiceList[i].VatRate)
      tvatAmt += isNaN(PurchaseInvoiceList[i].VatAmount) ? 0 : parseFloat(PurchaseInvoiceList[i].VatAmount)
      tdrate += isNaN(PurchaseInvoiceList[i].DiscountRate) ? 0 : parseFloat(PurchaseInvoiceList[i].DiscountRate)
      tdisAmt += isNaN(PurchaseInvoiceList[i].DiscountAmount) ? 0 : parseFloat(PurchaseInvoiceList[i].DiscountAmount)
      tnetAmt += isNaN(PurchaseInvoiceList[i].NetAmount) ? 0 : parseFloat(PurchaseInvoiceList[i].NetAmount)
   }
   $("#TotalPrice").val(tp)
   $("#TotalQuantity").val(tq);
   $("#TVatrate").val(tvrate);
   $("#TVatamount").val(tvatAmt);
   $("#TDiscountrate").val(tdrate); 
   $("#TDiscountamount").val(tdisAmt)
   $("#NetAmount").val(tnetAmt)
   let pamt = $("#Paidamount").val();
   let damt = (isNaN(NetAmount) ? 0 : parseFloat(NetAmount)) - (isNaN(pamt) ? 0 : parseFloat(pamt))
    

   $("#Dueamt").val(damt)
   calculateExpense();
}
function DeletePurchaseDetails(id) {
   var indexToDelete = PurchaseInvoiceList.findIndex(function (obj) {
      return obj.ProductID == id;
   });
   if (indexToDelete !== -1) {
      PurchaseInvoiceList.splice(indexToDelete, 1);
   }
   BindPurchaseDetailsInfo(PurchaseInvoiceList); 
}
function LoadPriceAgreementParentAndChildDetails(id) { 
   //$.ajax({
   //   url: "/PriceAgreementSearch/GetPriceAgreementParentAndChildDetails?id=" + id,
   //   type: "POST",
   //   dataType: "json",
   //   data: {},
   //   success: function (data) {
   //      PriceAgreementParentAndChildList = data;
   //      PriceAgreementDataBind(PriceAgreementParentAndChildList);

   //   }
   //});
}
function SearchValidate() {
   //if ($("#ddlSearchCustomer").data('kendoComboBox').value() == "" || $("#ddlSearchCustomer").data('kendoComboBox').selectedIndex == -1) {
   //   $("#ddlSearchCustomer").data('kendoComboBox').focus();
   //   $("#ddlSearchCustomer").data('kendoComboBox').open();
   //   toastr.warning('Please input Customer Name', "Warning");
   //   return false;
   //}
   //else if ($('#txtSearchAgreementFromDate').val() == "") {
   //   $('#txtSearchAgreementFromDate').focus();
   //   toastr.warning('Please input Agreement From Date', "Warning");
   //   return false;
   //}

   //else if ($('#txtSearchAgreementToDate').val() == "") {
   //   $('#txtSearchAgreementToDate').focus();
   //   toastr.warning('Please input Agreement To Date', "Warning");
   //   return false;
   //}
   //else if ($('#txtSearchEffectiveFromDate').val() == "") {
   //   $('#txtSearchEffectiveFromDate').focus();
   //   toastr.warning('Please input Effective From Date', "Warning");
   //   return false;
   //}
   //else if ($('#txtSearchEffectiveToDate').val() == "") {
   //   $('#txtSearchEffectiveToDate').focus();
   //   toastr.warning('Please input Effective To Date', "Warning");
   //   return false;
   //}
   //return true;
}
function GetPriceAgreementBySearchList() {
   //var o = new Object();
   //o.customerID = $("#ddlSearchCustomer").data('kendoComboBox').value();
   //o.agreementDate = $("#txtSearchAgreementFromDate").val();
   //o.AgreementToDate = $("#txtSearchAgreementToDate").val();
   //o.effectiveDateFrom = $("#txtSearchEffectiveFromDate").val();
   //o.effectiveDateTo = $("#txtSearchEffectiveToDate").val();
   //$.ajax({
   //   url: "/PriceAgreementSearch/PriceAgreementBySearch",
   //   method: "GET",
   //   dataType: "json",
   //   data: o,
   //   success: function (data) {
   //      PriceAgreementSearchList = data;
   //      BindPriceAgreementList(PriceAgreementSearchList);
   //   }
   //});
}

function BindPriceAgreementList(data) {
   //var i = 1;
   //_.map(data, function (obj) {
   //   obj.sl = i;
   //   i++;
   //   console.log("obj.sl = ", obj.sl);
   //});
   //$("#gridSearch").kendoGrid({
   //   dataSource: {
   //      data: data
   //   },
   //   height: 550,
   //   sortable: true,
   //   pageable: {
   //      pageSize: 15,
   //      pageSizes: [15, 30, 50, "all"],
   //      numeric: false
   //   },
   //   columns: [
   //      {
   //         field: "sl", width: 30,
   //         title: "SL",
   //         attributes: {
   //            style: "text-align:center;"
   //         },
   //         headerAttributes: { style: "text-align:center;font-weight: bold;background-color:#00bcd4" },
   //      },
   //      {
   //         field: "id", width: 40,
   //         title: "Ref. No",
   //         attributes: {
   //            style: "text-align:left;"
   //         },
   //         headerAttributes: { style: "text-align:left;font-weight: bold;background-color:#00bcd4" }
   //      },
   //      {
   //         field: "customerName", width: 50,
   //         title: "Customer Name",
   //         attributes: {
   //            style: "text-align:left;"
   //         },
   //         headerAttributes: { style: "text-align:left;font-weight: bold;background-color:#00bcd4" }
   //      },
   //      {
   //         field: "agreementDate", width: 50,
   //         title: "Agreement From Date",
   //         template: "#= new Date(agreementDate?.toString()).getFullYear() == 1 ? '':moment(agreementDate).format('MMM Do YYYY') #",
   //         attributes: {
   //            style: "text-align:left;"
   //         },
   //         headerAttributes: { style: "text-align:left;font-weight: bold;background-color:#00bcd4" }
   //      },
   //      {
   //         field: "agreementDate", width: 50,
   //         title: "Agreement To Date",
   //         template: "#= new Date(agreementDate?.toString()).getFullYear() == 1 ? '' :  moment(agreementDate).format('MMM Do YYYY') #",
   //         attributes: {
   //            style: "text-align:left;"
   //         },
   //         headerAttributes: { style: "text-align:left;font-weight: bold;background-color:#00bcd4" }
   //      },
   //      {
   //         title: "Effective From Date",
   //         field: "effectiveDateFrom", width: 50,
   //         template: "#= new Date(effectiveDateFrom?.toString()).getFullYear() == 1 ? '' :  moment(effectiveDateFrom).format('MMM Do YYYY') #",
   //         attributes: {
   //            style: "text-align:left;"
   //         },
   //         headerAttributes: { style: "text-align:left;font-weight: bold;background-color:#00bcd4" }
   //      },
   //      {
   //         title: "Effective To Date",
   //         field: "effectiveDateTo",
   //         template: "#= new Date(effectiveDateTo?.toString()).getFullYear() == 1 ? '' :  moment(effectiveDateTo).format('MMM Do YYYY') #",
   //         width: 50,
   //         attributes: { style: "text-align: left;" }, headerAttributes: { style: "text-align: left;font-weight: bold;background-color:#00bcd4" }
   //      },
   //      {
   //         template: function (x) {
   //            if (x.testtr == null || x.testtr == "") {
   //               return "Pending"
   //            }
   //            else {
   //               return "Done"
   //            }
   //         },
   //         width: 40,
   //         title: "Sample Status",
   //         attributes: {
   //            style: "text-align:left;"
   //         },
   //         headerAttributes: { style: "text-align:left;font-weight: bold;background-color:#00bcd4" }
   //      },
   //      {
   //         title: "Action",
   //         template: function (x) {
   //            return "<button class='btn btn-ghost-info active w-10'  title='Edit' onclick='LoadPriceAgreementParentAndChildDetails(" + x.id + ")'><span class='k-icon k-i-edit'></span></button>"
   //         },
   //         field: "", width: 40,
   //         attributes: { style: "text-align: center;" }, headerAttributes: { style: "text-align: center;font-weight: bold;background-color:#00bcd4" }
   //      }

   //   ]
   //});
}

function PriceAgreementDataBind(PriceAgreementParentAndChildList) {
   //var FilterData = PriceAgreementParentAndChildList[0];
   //$('#ddlCustomer').data('kendoComboBox').value(FilterData.customerID);
   //$('#ddlTestStandard').data('kendoComboBox').value(FilterData.testStandardID);
   //$('#ddlCurrency').data('kendoComboBox').value(FilterData.currencyID);
   //$('#txtDateOfAgreement').val(moment(FilterData.agreementDate).format('MM/DD/YYYY'));
   //$('#txtEffectiveFrom').val(moment(FilterData.effectiveDateFrom).format('MM/DD/YYYY'));
   //$('#txtEffectiveTo').val(moment(FilterData.effectiveDateTo).format('MM/DD/YYYY'));
   //$('#txtId').val(FilterData.id);
   //$('#txtChildId').val(FilterData.childID);
   //PurchaseInvoiceList = [];
   //for (var i = 0; i < PriceAgreementParentAndChildList.length; i++) {
   //   var o = new Object();
   //   o.ChildID = PriceAgreementParentAndChildList[i].childID;
   //   o.ParentID = PriceAgreementParentAndChildList[i].parentID;
   //   o.TestStandardID = PriceAgreementParentAndChildList[i].testStandardID;
   //   o.TestStandardName = PriceAgreementParentAndChildList[i].testStandardName;
   //   o.CurrencyName = PriceAgreementParentAndChildList[i].currencyName;
   //   o.CurrencyID = PriceAgreementParentAndChildList[i].currencyID;
   //   o.RegularPrice = PriceAgreementParentAndChildList[i].regularPrice;
   //   o.ExpressPrice = PriceAgreementParentAndChildList[i].expressPrice;
   //   /*o.SampleTypeID = PriceAgreementParentAndChildList[i].sampleTypeID;*/
   //   o.SampleTypeID = 1;

   //   PurchaseInvoiceList.push(o);
   //}

   //BindPurchaseDetailsInfo(PurchaseInvoiceList);
   /*$('#btnSave').text("Update");*/
}

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
         url: "/PurchaseInvoice/Save",
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
function Validate() {
   //if ($("#ddlCustomer").data('kendoComboBox').value() == "" || $("#ddlCustomer").data('kendoComboBox').selectedIndex == -1) {
   //   $("#ddlCustomer").data('kendoComboBox').focus();
   //   $("#ddlCustomer").data('kendoComboBox').open();
   //   toastr.warning('Please input Customer Name', "Warning");
   //   return false;
   //}
   //else if ($('#txtDateOfAgreement').val() == "") {
   //   $('#txtDateOfAgreement').focus();
   //   toastr.warning('Please input Date Of Agreement', "Warning");
   //   return false;
   //}

   //else if (($('#txtEffectiveFrom').val() == "" || $('#txtEffectiveFrom').val() == "1/1/0001 12:00:00 AM")) {
   //   $('#txtEffectiveFrom').focus();
   //   toastr.warning('Please input Effective From', "Warning");
   //   return false;
   //}
   //else if ($('#txtEffectiveTo').val() == "") {
   //   $('#txtEffectiveTo').focus();
   //   toastr.warning('Please input Effective To', "Warning");
   //   return false;
   //}
   //else if ($("#ddlCurrency").data('kendoComboBox').value() == "" || $("#ddlCurrency").data('kendoComboBox').selectedIndex == -1) {
   //   $("#ddlCurrency").data('kendoComboBox').focus();
   //   $("#ddlCurrency").data('kendoComboBox').open();
   //   toastr.warning('Please input Currency', "Warning");
   //   return false;
   //}
   //else if ($("#ddlTestStandard").data('kendoComboBox').value() == "" || $("#ddlTestStandard").data('kendoComboBox').selectedIndex == -1) {
   //   $("#ddlTestStandard").data('kendoComboBox').focus();
   //   $("#ddlTestStandard").data('kendoComboBox').open();
   //   toastr.warning('Please input TestStandard Name', "Warning");
   //   return false;
   //}
   //else if (PurchaseInvoiceList.length == 0) {
   //   toastr.warning('Please Add Atleast one TestStandardPrice List', "Warning");
   //   return false;
   //}
   //else if ($('#txtregular_').val() == "") {
   //   $('#txtregular_').focus();
   //   toastr.warning('Please input Regular Price', "Warning");
   //   return false;
   //}
   //var regularPriceValue = $(regularId).val() == undefined ? 0 : $(regularId).val();
   //var expressPriceValue = $(expressId).val() == undefined ? 0 : $(expressId).val();
   //var numberPattern = /^[0-9]+$/;

   //if (!numberPattern.test(regularPriceValue)) {
   //   $('#txtregular_').focus();
   //   toastr.warning('Invalid input. Please enter a valid Regular Price', "Warning");
   //   return false;
   //}

   //if ($('#txtexpressPrice_').val() == "") {
   //   $('#txtexpressPrice_').focus();
   //   toastr.warning('Please input Express Price', "Warning");
   //   return false;
   //}
   //var expressinputValue = $('#txtexpressPrice_').val();

   //if (!numberPattern.test(expressPriceValue)) {
   //   $('#txtregular_').focus();
   //   toastr.warning('Invalid input. Please enter a valid Express Price', "Warning");
   //   return false;
   //}
   return true;
}
function SetMinimumDateForEffectiveToDate() {
   //var fromDate = $('#txtEffectiveFrom').val();
   //if (fromDate == '') {
   //   $("#txtEffectiveTo").kendoDatePicker({
   //      min: new Date()
   //   });
   //} else {
   //   $("#txtEffectiveTo").kendoDatePicker({
   //      min: kendo.parseDate(fromDate)
   //   });
   //}
}
function ClearAll() {
   //$('#ddlSearchCustomer').data('kendoComboBox').value('');
   //$('#txtSearchAgreementFromDate').data('kendoDatePicker').value('');
   //$('#txtSearchAgreementToDate').data('kendoDatePicker').value('');
   //$('#txtSearchEffectiveFromDate').data('kendoDatePicker').value('');
   //$('#txtSearchEffectiveToDate').data('kendoDatePicker').value('');
}
function ClearAgreement() {
   //$("#txtId").val('');
   //$("#ddlCustomer").data('kendoComboBox').value('');
   //$('#txtDateOfAgreement').data('kendoDatePicker').value('');
   //$("#txtDateOfAgreement").data('kendoDatePicker').value('');
   //$("#txtEffectiveFrom").data('kendoDatePicker').value('');
   //$('#txtEffectiveTo').data('kendoDatePicker').value('');
   //$("#txtRemarks").val('');
   //$("#txtSigneeID").val('');
   //$("#ddlCurrency").data('kendoComboBox').value('');
   //$("#ddlTestStandard").data('kendoComboBox').value('');
   //TestStandardList = []
   //BindPurchaseDetailsInfo(TestStandardList);
}