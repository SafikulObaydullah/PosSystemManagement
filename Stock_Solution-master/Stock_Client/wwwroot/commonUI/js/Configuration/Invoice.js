var InvoiceVehicleList = [];
var vehicleListArray = [];
var selectedInvoiceId = 0;

$(document).ready(function () {
   $(document).on("click", function (e) {
      if (!$(e.target).closest("#suggestion-box").length &&
         !$(e.target).closest("#txtVehicleName").length) {
         $("#suggestion-box").hide();
      }
   });

   $("#btnUpdate").hide();
   $("#btnSave").show();
   $("#modalToggle").modal({
      backdrop: 'static',
      keyboard: false
   });

   load();
   LoadInitalData();
});

function LoadInitalData() {
   $.ajax({
      url: "https://localhost:7065/api/Invoice/GetInitialData",
      method: "GET",
      dataType: "json",
      success: function (data) {
         InvoiceVehicleList = data.VehicletList;
         var options = '<option value="-1">Select Vehicle</option>';
         for (var i = 0; i < InvoiceVehicleList.length; i++) {
            options += '<option value="' + InvoiceVehicleList[i].Id + '">' + InvoiceVehicleList[i].VehicleName + '</option>';
         }
         $("#ddlVehicleName").html(options);
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });
}

function VehicleMethod() {
   var vehicleId = $("#ddlVehicleName").val();
   var vehicleName = $("#ddlVehicleName option:selected").text();
   $("#txtVehicleName").val(vehicleId === "-1" ? "" : vehicleName);

   if (vehicleId === "-1") {
      return;
   }

   $.ajax({
      url: "https://localhost:7065/api/Invoice/GetProductListByVehicleId?Id=" + vehicleId,
      type: "POST",
      dataType: "json",
      success: function (data) {
         vehicleListArray = data.produtList;
         if (!vehicleListArray || vehicleListArray.length === 0) {
            return;
         }

         $("#txtChasisNo").val(vehicleListArray[0].ChasisNo);
         $("#txtEngineNo").val(vehicleListArray[0].EngineNo);
         $("#txtFuelType").val(vehicleListArray[0].FuelType);
         $("#txtColor").val(vehicleListArray[0].Color);
         $("#txtModelNo").val(vehicleListArray[0].ModelNo);
         $("#txtMileage").val(vehicleListArray[0].Mileage);
      }
   });
}

function getInvoiceFormData(id) {
   return {
      id: id,
      invoiceId: $("#txtInvoiceId").val(),
      banlanceDue: $("#txtBanlanceDue").val(),
      paymentType: $("#txtPaymentType").val(),
      vehicleName: $("#txtVehicleName").val(),
      chasisNo: $("#txtChasisNo").val(),
      engineNo: $("#txtEngineNo").val(),
      fuelType: $("#txtFuelType").val(),
      color: $("#txtColor").val(),
      modelNo: $("#txtModelNo").val(),
      mileage: $("#txtMileage").val(),
      amount: $("#txtAmount").val(),
      tax: $("#txtTax").val(),
      discount: $("#txtDiscount").val(),
      totalAmount: $("#txtTotalAmount").val()
   };
}

function Save() {
   $.ajax({
      url: "https://localhost:7065/api/Invoice/SaveInvoice",
      method: "POST",
      data: JSON.stringify(getInvoiceFormData(0)),
      contentType: "application/json",
      success: function (result) {
         toastr.success(result.message, 'Save Successfully');
         $("#modalToggle").modal('hide');
         load();
         clearALl();
      },
      error: function (er) {
         console.log(er);
      }
   });
}

function clearALl() {
   selectedInvoiceId = 0;
   $("#txtInvoiceId").val('');
   $("#txtBanlanceDue").val('');
   $("#txtPaymentType").val('');
   $("#txtVehicleName").val('');
   $("#ddlVehicleName").val('-1');
   $("#txtChasisNo").val('');
   $("#txtEngineNo").val('');
   $("#txtFuelType").val('');
   $("#txtColor").val('');
   $("#txtModelNo").val('');
   $("#txtMileage").val('');
   $("#txtAmount").val('');
   $("#txtTax").val('');
   $("#txtDiscount").val('');
   $("#txtTotalAmount").val('');
}

function Close() {
   $("#modalToggle").modal('hide');
}

function load() {
   var search = $("#VehicleName").val() || "";
   $.ajax({
      url: "https://localhost:7065/api/Invoice/GetInvoice?VehicleName=" + search,
      method: "GET",
      success: function (result) {
         $("#tble tbody").empty();
         $.each(result, function (i, v) {
            var html = "<tr><td>" + v.InvoiceId + "</td>" +
               "<td>" + v.BanlanceDue + "</td>" +
               "<td>" + v.PaymentType + "</td>" +
               "<td>" + v.VehicleName + "</td>" +
               "<td>" + v.ChasisNo + "</td>" +
               "<td>" + v.EngineNo + "</td>" +
               "<td>" + v.FuelType + "</td>" +
               "<td>" + v.Color + "</td>" +
               "<td>" + v.ModelNo + "</td>" +
               "<td>" + v.Mileage + "</td>" +
               "<td>" + v.Amount + "</td>" +
               "<td>" + v.Tax + "</td>" +
               "<td>" + v.Discount + "</td>" +
               "<td>" + v.TotalAmount + "</td>" +
               "<td><button onClick='Edit(" + v.Id + ")'>Edit</button></td>" +
               "<td><button onClick='Delete(" + v.Id + ")'>Delete</button></td></tr>";
            $("#tble tbody").append(html);
         });
      },
      error: function (er) {
         console.log(er);
      }
   });
}

function Edit(id) {
   $("#btnUpdate").show();
   $("#btnSave").hide();
   $.ajax({
      url: "https://localhost:7065/api/Invoice/GetByID?Id=" + id,
      method: "GET",
      contentType: "application/json",
      success: function (result) {
         if (!result || result.length === 0) {
            return;
         }

         var invoice = result[0];
         $("#staticBackdropLabel").html("Update Invoice Information");
         selectedInvoiceId = invoice.Id;
         $("#txtInvoiceId").val(invoice.InvoiceId);
         $("#txtBanlanceDue").val(invoice.BanlanceDue);
         $("#txtPaymentType").val(invoice.PaymentType);
         $("#txtVehicleName").val(invoice.VehicleName);
         $("#txtChasisNo").val(invoice.ChasisNo);
         $("#txtEngineNo").val(invoice.EngineNo);
         $("#txtFuelType").val(invoice.FuelType);
         $("#txtColor").val(invoice.Color);
         $("#txtModelNo").val(invoice.ModelNo);
         $("#txtMileage").val(invoice.Mileage);
         $("#txtAmount").val(invoice.Amount);
         $("#txtTax").val(invoice.Tax);
         $("#txtDiscount").val(invoice.Discount);
         $("#txtTotalAmount").val(invoice.TotalAmount);
         $("#modalToggle").modal('show');
      },
      error: function (er) {
         console.log(er);
      }
   });
}

function Update() {
   $.ajax({
      url: "https://localhost:7065/api/Invoice/UpdateInvoice",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "PUT",
      data: JSON.stringify(getInvoiceFormData(selectedInvoiceId)),
      success: function (result) {
         toastr.success(result.message, 'Update Successfully');
         $("#modalToggle").modal('hide');
         load();
         clearALl();
         $("#btnUpdate").hide();
         $("#btnSave").show();
      },
      error: function (er) {
         console.log(er.responseText);
      }
   });
}

function Delete(id) {
   $.ajax({
      url: "https://localhost:7065/api/Invoice/Delete?Id=" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "DELETE",
      success: function () {
         clearALl();
         load();
      },
      error: function (msg) {
         alert(msg);
      }
   });
}

function AddNew() {
   $('#staticBackdropLabel').text('Create New Invoice');
   clearALl();
   $("#btnUpdate").hide();
   $("#btnSave").show();
   $('#modalToggle').modal('toggle');
}
