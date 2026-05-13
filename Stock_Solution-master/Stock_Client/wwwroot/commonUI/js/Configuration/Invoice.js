
var InvoiceList = [];
var InvoiceVehicleList = [];
var vehicleListArray = []
$(document).ready(function () {
   /*VehicleMethod(); */
   $(document).on("click", function (e) {
      if (!$(e.target).closest("#suggestion-box").length &&
         !$(e.target).closest("#txtVehicleName").length) {
         $("#suggestion-box").hide();
      }
   });
   $("#btnUpdate").hide();
   $("#btnSave").show();
   var IsEdit = false;
   $("#MyModal").modal({
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
         console.log("VehicletList ", InvoiceVehicleList); 
         var s = '<option value="-1">Select Vehicle </option>';
         for (var i = 0; i < InvoiceVehicleList.length; i++) {
            s += '<option value="' + InvoiceVehicleList[i].id + '">' + InvoiceVehicleList[i].vehicleName + '</option>';
         }
         $("#ddlVehicleName").html(s);
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });
} 
function VehicleMethod(item) {
   var id = 0;
   $("#ddlVehicleName").on('change', function () {
       id = $(this).find('option:selected').attr('id')
   }); 
   var vehicleId = $("#ddlVehicleName").val(); 
   var inputText = $(item).val();  
   /*if (vehicleId.length > 0) {*/
      $.ajax({
         url: "https://localhost:7065/api/Invoice/GetProductListByVehicleId?Id=" + vehicleId,
         type: "POST",
         dataType: "json",
         //data: {
         //   term: request.term
         //},
         success: function (data) {
            vehicleListArray = data.produtList;
            console.log(data);
            $("#txtChasisNo").val(vehicleListArray[0].chasisNo),
               $("#txtEngineNo").val(vehicleListArray[0].engineNo),
               $("#txtFuelType").val(vehicleListArray[0].fuelType),
               $("#txtColor").val(vehicleListArray[0].color),
               $("#txtModelNo").val(vehicleListArray[0].modelNo)
               $("#txtMileage").val(vehicleListArray[0].mileage)

            //$.each(data, function (i, v) {
            //   $("#suggestions").append("<li>" + v.vehicleName + "</li>");
            //})
         }
      })
   //}
}   
function displaySuggestions(suggestions) {
   var suggestionBox = $("#suggestion-box");
   suggestionBox.empty();

   //if (suggestions.length > 0) {
      var list = $("<ul>");
      suggestions.each(function (suggestion) {
         var listItem = $("<li>").text(suggestion);
         listItem.on("click", function () {
            $("#txtVehicleName").val(suggestion);
            suggestionBox.hide();
         });
         list.append(listItem);
      });
      suggestionBox.append(list);
      suggestionBox.show(); 
}
function Save() {
   var obj = new Object();  
      obj.id = 0,
         obj.invoiceId = $("#txtInvoiceId").val(),
         obj.banlanceDue = $("#txtBanlanceDue").val(), 
         obj.paymentType = $("#txtPaymentType").val(),
         obj.vehicleName = $("#txtVehicleName").val(),
         obj.chasisNo = $("#txtChasisNo").val(),
         obj.engineNo = $("#txtEngineNo").val(),
         obj.fuelType = $("#txtFuelType").val(),
         obj.color = $("#txtColor").val(),
         obj.modelNo = $("#txtModelNo").val(),
         obj.mileage = $("#txtMileage").val(),
         obj.amount = $("#txtAmount").val(),
         obj.tax = $("#txtTax").val(),
         obj.discount = $("#txtDiscount").val(),
         obj.totalAmount = $("#txtTotalAmount").val() 
   $.ajax({
      url: "https://localhost:7065/api/Invoice/SaveInvoice",
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
      $("#txtShortName").val(''),
      $("#ddlInstitute").val(''),
      $("#ddlInsBranch").val(''),
      $("#txtId").val('')
}
function Close() {
   $("#MyModal").modal('hide');
}
function load() {
   var search = $("#VehicleName").val();
   $.ajax({
      url: "https://localhost:7065/api/Invoice/GetIvoice?VehicleName=" + search,
      type: "JSON",
      method: "GET",
      success: function (result) {
         console.log("Get All = ", result)
         $("#tble tbody").empty();
         $.each(result, function (i, v) {
            console.log("Data value = ", v)
            var html = "<tr><td>" + v.VehicleName + "</td>" +
               " <td>" + v.ChasisNo + "</td>" +
               "<td>" + v.EngineNo + "</td>" +
               "<td>" + v.FuelType + "</td>" +
               "<td>" + v.Color + "</td>" +
               "<td>" + v.ModelNo + "</td>" +
               "<td>" + v.Mileage + "</td>" +
               "<td>" + v.Amount + "</td>" +
               "<td>" + v.Tax + "</td>" +
               "<td>" + v.Discount + "</td>" +
               "<td>" + v.TotalAmount + "</td>" +
               "<td> <button onClick='Edit(" + v.Id + ")'>Edit </button></td>" +
               "<td> <button onClick='Delete(" + v.Id + ")'>Delete </button></td></tr>";
            $("#tble tbody").append(html)
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
      url: "https://localhost:7065/api/Invoice/GetByID?Id=" + id,
      type: "JSON",
      method: "GET",
      //data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (result) { 
         console.log("Get by ID ", result);
         $("#exampleModalLabel").html("Update Unit Information");
         IsEdit = true; 
             $("#txtName").val(result[0].Name),
            $("#txtShortName").val(result[0].Shortname),
            $("#ddlInstitute").val(result[0].insId),
            $("#ddlInsBranch").val(result[0].inBranchsId),
            $("#txtId").val(result[0].Id),
            $("#MyModal").modal('show')
      },
      error: function (er) {
         console.log(er)
      }
   })
}
function Update() {
   var url = "https://localhost:7065/api/Invoice/UpdateInvoice"
  var updateData = new Object() 
      updateData.id = $("#txtId").val(),
      updateData.name = $("#txtName").val(),
      updateData.shortname = $("#txtShortName").val(),
      updateData.insId = $("#ddlInstitute").val(),
      updateData.inBranchsId = $("#ddlInsBranch").val()
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
   var url = "https://localhost:7065/api/Unit/Delete?Id=" + id;
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
function AddNew() {
   $('#staticBackdropLabel').text('Create New Institute');
   $('#btnSave').removeClass('btn btn-ghost-info active w-10');
   $('#spanParentID').html(0);
   $('#txtName').val('');
   $('#txtShortName').val('');
   $('#ddlInstitute').val('');
   $('#ddlInsBranch').val('');
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}