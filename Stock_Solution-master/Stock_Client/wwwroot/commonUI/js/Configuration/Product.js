
var InstituteList = [];
var InsBranchList = [];
var CategoryList = [];
var UnitList = []; 
var SubCategoryList = []; 
var BrandList = []; 
$(document).ready(function () {
    //$("#btnUpdate").hide(); 
    //$("#btnSave").show();
    //var IsEdit = false;
    //$("#MyModal").modal({
    //   backdrop: 'static',
    //   keyboard: false 
    //});
    //load();
    LoadInitalData();
    //$("#btnModal").click(function () {
    //   $("#MyModal").modal('show')
    //})
});
//obj.purchasePrice = $("#txtpurchasePrice").val(),
      //obj.discountrate = $("#txtdiscountrate").val(),
      //obj.discountamount = $("#txtdiscountamount").val(),
      //obj.vatrate = $("#txtvatrate").val(),
      //obj.vatamount = $("#txtvatamount").val(),
      //obj.description = $("#txtdescription").val(),
      //obj.stockQty = $("#txtstockQty").val(),
      //obj.vehicleName = $("#txtVehicleName").val(),
      //obj.chasisNo = $("#txtChasisNo").val(),
      //obj.engineNo = $("#txtEngineNo").val(),
      //obj.color = $("#txtColor").val(),
      //obj.fuelType = $("#txtFuelType").val(),
      //obj.modelNo = $("#txtModelNo").val(),
      //obj.mileage = $("#txtMileage").val(),
      //obj.purchasePrice = $("#txtpurchasePrice").val(),
      //obj.discountrate = $("#txtdiscountrate").val(),
      //obj.discountamount = $("#txtdiscountamount").val(),
      //obj.vatrate = $("#txtvatrate").val(),
      //obj.vatamount = $("#txtvatamount").val(),
      //obj.description = $("#txtdescription").val(),
      //obj.stockQty = $("#txtstockQty").val(),
      //obj.vehicleName = $("#txtVehicleName").val(),
      //obj.chasisNo = $("#txtChasisNo").val(),
      //obj.engineNo = $("#txtEngineNo").val(),
      //obj.color = $("#txtColor").val(),
      //obj.fuelType = $("#txtFuelType").val(),
      //obj.modelNo = $("#txtModelNo").val(),
      //obj.mileage = $("#txtMileage").val(),
var path = "";
function uploadFileToDev() {
    var fileInput = $('#txtfile')[0].files[0];
    var folderName = "Product"; //$('#txtfileUpload').val();
    var formData = new FormData();
    formData.append('file', fileInput);
    formData.append('foldername', folderName);

    // AJAX request
    $.ajax({
        url: 'https://localhost:7065/api/Category/UploadFileToDev?foldername=' + encodeURIComponent(folderName),
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) { 
            path = response.path;
            $('#imagepreview').css('display', 'block');
            $('#dragId').css('display', 'none');
            $('#previewImage').attr('src',"https://localhost:7065/"+path);
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error(xhr.responseText);
        }
    });
}
function Save() {
    var fileInput = $('#txtfile')[0];

    var formData = new FormData();
    formData.append("Id", 0);
    formData.append("Name", $('#txtProductName').val());
    formData.append("CatId", parseInt($('#ddlCategory').val()) || 0);
    formData.append("SubCategoryId", parseInt($('#ddlSubCategory').val()) || 0);
    formData.append("BrandId", parseInt($('#ddlBrand').val()) || 0);
    formData.append("UnitId", parseInt($('#ddlUnit').val()) || 0);
    formData.append("SKU", $('#txtsku').val());
    formData.append("MinimumQuantity", parseInt($('#txtMinimumQty').val()) || 0);
    formData.append("Quantity", parseInt($('#txtQuantity').val()) || 0);
    formData.append("Description", $('#txtDescription').val());
    formData.append("Tax", parseInt($('#txtTax').val()) || 0);
    formData.append("DiscountType", $('#txtDiscountType').val());
    formData.append("Price", parseFloat($('#txtPrice').val()) || 0);
    formData.append("Status", parseInt($('#ddlStatus').val()) || 0);

    if (fileInput && fileInput.files.length > 0) {
        formData.append("ProductImage", fileInput.files[0]); // match IFormFile name
    } else {
        formData.append("ProductImageUrl", path); // send path if no file
    }

    $.ajax({
        url: "https://localhost:7065/api/Product/SaveNewProduct",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            alert('Product saved successfully!');
            console.log(response);
        },
        error: function (xhr) {
            console.error("Error:", xhr.status, xhr.responseText);
            alert('Failed to save product. Please try again.');
        }
    });
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
      url: "https://localhost:7065/api/Product",
      type: "JSON",
      method: "GET",
      success: function (result) {
         console.log("Get All = ", result)
         $("#tble tbody").empty();
         $.each(result, function (i, v) {
            console.log("Data value = ", v)
            var html = "<tr><td>" + v.Name + "</td>" +
               " <td>" + v.Reorderlevel + "</td>" +
               "<td>" + v.Code + "</td>" +
               "<td>" + v.CategoryName + "</td>" +
               "<td>" + v.StockQty+ "</td>" +
               " <td> <button onClick='Edit(" + v.Id + ")'><span class='k-icon k-i-edit'></span></button></td>" +
               " <td> <button onClick='Delete(" + v.Id + ")'><span class='k-icon k-i-delete'></span></button></td></tr>";
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
      url: "https://localhost:7065/api/Product/GetByID?Id=" + id,
      type: "JSON",
      method: "GET",
      //data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (result) { 
         console.log("Get by ID ", result);
         $("#exampleModalLabel").html("Update Unit Information");
         IsEdit = true; 
            $("#txtId").val(result[0].Id),
            $("#ddlInstitute").val(result[0].insId),
            $("#ddlInsBranch").val(result[0].inBranchsId),
            $("#ddlCategory").val(result[0].catId),
            $("#ddlUnit").val(result[0].unitId), 
            $("#txtName").val(result[0].Name),
            $("#txtReorderlevel").val(result[0].Reorderlevel), 
            $("#txtSalesPrice").val(result[0].salesPrice),
            $("#txtPurchasePrice").val(result[0].purchasePrice),
            $("#txtDiscountrate").val(result[0].discountrate),
            $("#txtDiscountamount").val(result[0].discountamount),
            $("#txtVatrate").val(result[0].vatrate),
            $("#txtVatamount").val(result[0].vatamount),
            $("#txtDescription").val(result[0].description),
            $("#txtStockQty").val(result[0].stockQty), 
            $("#MyModal").modal('show')
      },
      error: function (er) {
         console.log(er)
      }
   })
}
function Update() {
   var url = "https://localhost:7065/api/Product/UpdateProduct"
  var updateData = new Object() 
      updateData.id = $("#txtId").val(),
      updateData.name = $("#txtName").val(),
      updateData.reorderlevel = $("#txtReorderlevel").val(),
      updateData.insId = $("#ddlInstitute").val(),
      updateData.inBranchsId = $("#ddlInsBranch").val(),
      updateData.catId = $("#ddlCategory").val(),
      updateData.unitId = $("#ddlUnit").val(),
      updateData.salesPrice = $("#txtSalesPrice").val(),
      updateData.purchasePrice = $("#txtPurchasePrice").val(),
      updateData.discountrate = $("#txtDiscountrate").val(),
      updateData.discountamount = $("#txtDiscountamount").val(),
      updateData.vatrate = $("#txtVatrate").val(),
      updateData.vatamount = $("#txtVatamount").val(),
      updateData.description = $("#txtDescription").val(),
      updateData.stockQty = $("#txtStockQty").val(), 

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
   var url = "https://localhost:7065/api/Product/DeleteProduct?id=" + id;
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
      url: "https://localhost:7065/api/Product/GetInitialProductData",
      method: "GET",
      dataType: "json",
      success: function (data) {
         InstituteList = data.institute;
         InsBranchList = data.branches;
         CategoryList = data.categories;
         UnitList = data.units;
          SubCategoryList = data.subCategory;
          BrandList = data.brand;
          console.log("Sub = ", SubCategoryList);
          console.log("Branch List ", BrandList);
         console.log("Category  List ", CategoryList);
         console.log("Unit List ", UnitList);
         

         var category = '<option selected disabled hidden value="">Select Product Category</option>';
         for (var i = 0; i < CategoryList.length; i++) {
             category += '<option value="' + CategoryList[i].id + '">' + CategoryList[i].name + '</option>';
         }
          $("#ddlCategory").html(category);

         var unit = '<option selected disabled hidden value="">Select Unit</option>';
         for (var i = 0; i < UnitList.length; i++) {
             unit += '<option value="' + UnitList[i].id + '">' + UnitList[i].name + '</option>';
         } 
          $("#ddlUnit").html(unit);

          var subcategory = '<option selected disabled hidden value="">Select SubCategory</option>';
          for (var i = 0; i < SubCategoryList.length; i++) {
              subcategory += '<option value="' + SubCategoryList[i].id + '">' + SubCategoryList[i].categoryName + '</option>';
          }
          $("#ddlSubCategory").html(subcategory);
          var brand = '<option selected disabled hidden value="">Select Brand</option>';
          for (var i = 0; i < BrandList.length; i++) {
              brand += '<option value="' + BrandList[i].id + '">' + BrandList[i].brandName + '</option>';
          }
          $("#ddlBrand").html(brand);

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