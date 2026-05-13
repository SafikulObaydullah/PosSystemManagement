
var InstituteList = [];
var InsBranchList = [];
var CustomerList = [];
var UnitList = []; 
$(document).ready(function () {

    var SalesDate = new Pikaday({
        field: document.getElementById('dteSalesDate'),
        format: 'YYYY-MM-DD',
        position: 'bottom left'
    });
    $("#MyModal").modal('hide')

   $("#btnUpdate").hide(); 
   $("#btnSave").show();
   var IsEdit = false;
   //$("#MyModal").modal({
   //   backdrop: 'static',
   //   keyboard: false 
   //});
   load();
   LoadInitalData(); 
   //$(function () {
   //   // Calculate the minimum date (today + 15 days)
   //   var minDate = new Date();
   //   minDate.setDate(minDate.getDate() + 15); 
   //   $("#dteSalesDate").datepicker({
   //      dateFormat: "yy-mm-dd",
   //      minDate: minDate,
   //      showButtonPanel: true
   //   });
   //});
})
function Save() {
    var inputDate = $("#dteSalesDate").val(); 
    var dateComponents = inputDate.split('/'); 
    var formattedDate = dateComponents[2] + '/' + dateComponents[0] + '/' + dateComponents[1]; 
     

    var obj = new Object(); 
        obj.id = $("#txtId").val() == "" ? 0 : $("#txtId").val();
        obj.customerID = $("#ddlCustomer").val();
        obj.salesDate = $("#dteSalesDate").val();
        obj.totalQuantity = $("#TotalQuantity").val();
        obj.totalPrice = $("#txtTotalPrice").val();
        obj.voucherNo = $("#txtVoucherNo").val();
        obj.billNo = $("#txtBillNo").val();
        obj.tDiscountrate = $("#txtTDiscountrate").val();
        obj.tVatrate = $("#txtTVatrate").val();
        obj.tDiscountamount = $("#txtTDiscountamount").val();
        obj.tVatamount = $("#txtTVatamount").val();
        obj.paidamount = $("#txtPaidamount").val();
        obj.due = $("#txtDue").val();
        obj.convence = $("#txtConvence").val();
        obj.packing = $("#txtPacking").val();
        obj.entryBy=  0;
        obj.entryDate=  "2024-01-19T14:55:37.476Z";
        obj.note = $("#txtNote").val();
        obj.paymentMode=  "string";
        obj.insId = $("#ddlInstitute").val();
        obj.inBranchsId = $("#ddlInsBranch").val();
        obj.createdBy=  "string";
        obj.updatedBy = "string"; 
      
   $.ajax({
       url: "https://localhost:7065/api/SalesMaster/SaveSalesMaster",
      type: "JSON",
      method: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (result) {
         toastr.success(result.message, 'Save Successfully');
         $("#MyModal").modal('hide')
         load();
         clearALl();
      },
      error: function (er) {
         console.log(er)
      }
   })
}
function clearALl() {
      $("#txtName").val(''),
      $("#txtReorderlevel").val(''),
      $("#ddlInstitute").val(''),
      $("#ddlInsBranch").val(''),
      $("#txtId").val('')
}
function Close() {
   $("#MyModal").modal('hide');
}
function load() {
   $.ajax({
      url: "https://localhost:7065/api/SalesMaster/GetSalesMaster",
      type: "JSON",
      method: "GET",
      success: function (result) {
         console.log("Get All = ", result)
         $("#SalesMasterList tbody").empty();
         $.each(result, function (i, v) {
            console.log("Data value = ", v)
            var html = "<tr><td>"+v.CustomerName + "</td>" +
                        "<td>" + v.SalesDate + "</td>" +
                        "<td>" + v.TotalQuantity + "</td>" +
                        "<td>" + v.TotalPrice + "</td>" +
                        "<td>" + v.VoucherNo+ "</td>" +
                        "<td>" + v.BillNo+ "</td>" +
                        "<td>" + v.TDiscountrate+ "</td>" +
                        "<td>" + v.TVatrate+ "</td>" +
                        "<td>" + v.TDiscountamount+ "</td>" +
                        "<td>" + v.TVatamount+ "</td>" +
                        "<td>" + v.Paidamount+ "</td>" +
                        "<td>" + v.Due+ "</td>" +
                        "<td>" + v.Convence+ "</td>" +
                        "<td>" + v.Packing+ "</td>" + 
                        "<td>" + v.BillNo+ "</td>" + 
                        " <td> <button onClick='Edit(" + v.ID + ")'><span class='k-icon k-i-edit'></span></button></td>" +
                        " <td> <button onClick='Delete(" + v.ID + ")'><span class='k-icon k-i-delete'></span></button></td></tr>";
            $("#SalesMasterList tbody").append(html)
         })
      },
      error: function (er) {
         console.log(er)
      }
   })
} 
function Edit(id) {
   $("#btnUpdate").show();
   $("#btnSave").hide();
   $.ajax({
      url: "https://localhost:7065/api/SalesMaster/GetByID?Id=" + id,
      type: "JSON",
      method: "GET",
      //data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (result) { 
         console.log("Get by ID ", result);
         $("#exampleModalLabel").html("Update Unit Information");
         IsEdit = true; 
          $("#txtId").val(result[0].ID);
            $("#ddlCustomer").val(result[0].CustomerID);
            $("#dteSalesDate").val(result[0].SalesDate);
            $("#TotalQuantity").val(result[0].TotalQuantity);
            $("#txtTotalPrice").val(result[0].TotalPrice);
            $("#txtVoucherNo").val(result[0].VoucherNo);
            $("#txtBillNo").val(result[0].BillNo);
            $("#txtTDiscountrate").val(result[0].TDiscountrate);
            $("#txtTVatrate").val(result[0].TVatrate);
            $("#txtTDiscountamount").val(result[0].TDiscountamount);
            $("#txtTVatamount").val(result[0].TVatamount);
            $("#txtPaidamount").val(result[0].Paidamount);
            $("#txtDue").val(result[0].Due);
            $("#txtConvence").val(result[0].Convence);
            $("#txtPacking").val(result[0].Packing);
            $("#txtPaymentMode").val(result[0].PaymentMode); 
            $("#txtNote").val(result[0].Note); 
            $("#ddlInstitute").val(result[0].insId);
            $("#ddlInsBranch").val(result[0].inBranchsId); 
            $("#MyModal").modal('show')
      },
      error: function (er) {
         console.log(er)
      }
   })
}
function Update() {
    var url = "https://localhost:7065/api/SalesMaster/UpdateSalesMaster"
   var updateData = new Object() 
      updateData.ID = $("#txtId").val(); 
      updateData.insId = $("#ddlInstitute").val();
      updateData.inBranchsId = $("#ddlInsBranch").val();
      updateData.CustomerId = $("#ddlCustomer").val(); 
      updateData.SalesDate = $("#dteSalesDate").val();
      updateData.TotalQuantity = $("#TotalQuantity").val();
      updateData.TotalPrice = $("#txtTotalPrice").val();
      updateData.VoucherNo = $("#txtVoucherNo").val();
      updateData.TDiscountrate = $("#txtTDiscountrate").val();
      updateData.TDiscountamount = $("#txtTDiscountamount").val();
      updateData.TVatamount = $("#txtTVatamount").val();
      updateData.Paidamount = $("#txtPaidamount").val();
      updateData.Due = $("#txtDue").val();
      updateData.Convence = $("#txtConvence").val();
      updateData.Packing = $("#txtPacking").val();
      updateData.PaymentMode = $("#txtPaymentMode").val();
      updateData.BillNo = $("#txtBillNo").val();
      updateData.Note = $("#txtNote").val();  
      updateData.isActive = $('#isActive').is(':checked') ? true : false;
   $.ajax({
      url: url,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "Put",
      data: JSON.stringify(updateData),
      success: function (result) {
         toastr.success(result.message, 'Update Successfully');
         $("#MyModal").modal('hide');
         load();
         clearALl();
         $("#btnUpdate").hide();
         $("#btnSave").show();
         $("#btnSave").text("Save");
      },
      error: function (er) {
         console.log(er.responseText);
      }
   })
}
function Delete(id) {
   var url = "https://localhost:7065/api/SalesMaster/Delete?id=" + id;
   $.ajax({
      url: url,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "Delete",
      success: function (result) {
         clearALl();
         load();
      },
      error: function (msg) {
         alert(msg);
      }
   });
}
function LoadInitalData() {
   $.ajax({
      url: "https://localhost:7065/api/SalesMaster/GetInitialSalesMasterData",
      method: "GET",
      dataType: "json",
      success: function (data) {
         InstituteList = data.institute;
         InsBranchList = data.branches;
         CustomerList = data.customer; 
         var s = '<option selected disabled hidden value="">Select Institute</option>';
         for (var i = 0; i < InstituteList.length; i++) {
            console.log(data[i])
            s += '<option value="' + InstituteList[i].id + '">' + InstituteList[i].instituteName + '</option>';
         }
         $("#ddlInstitute").html(s);

         var s = '<option selected disabled hidden value="">Select Institute Branch</option>';
         for (var i = 0; i < InsBranchList.length; i++) { 
            s += '<option value="' + InsBranchList[i].id + '">' + InsBranchList[i].branchName + '</option>';
         }
         $("#ddlInsBranch").html(s);

         var s = '<option selected disabled hidden value="">Select Customer</option>';
         for (var i = 0; i < CustomerList.length; i++) {
            s += '<option value="' + CustomerList[i].id + '">' + CustomerList[i].name + '</option>';
         }
         $("#ddlCustomer").html(s); 
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });
}
function AddNew() {
   $('#staticBackdropLabel').text('Create New Institute');
   $('#btnSave').removeClass('btn btn-ghost-info active w-10');
   $('#spanParentID').html(0);
   $('#txtName').val('');
   $('#txtReorderlevel').val('');
   $('#ddlInstitute').val('');
   $('#ddlInsBranch').val('');
   $('#MyModal').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}