var VoucherTypeList = []
var VoucherTypeParentList = []
$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
$(document).ready(function () {
   VoucherTypeLoad(); 
   $(function () {
      $("[data-role=combobox]").each(function () {
         var widget = $(this).getKendoComboBox();
         widget.input.on("focus", function () {
            widget.open();
         });
      });
   });
});
  
function VoucherTypeLoad() { 
   $.ajax({
      url: "https://localhost:7065/api/VoucherType/GetVoucherType",
      method: "GET",
      dataType: "json",
      success: function (data) { 
            VoucherTypeList = data; 
            VoucherTypeDataBind(VoucherTypeList);  
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });
}

function VoucherTypeDataBind(data) { 
   var i = 1;
   _.map(VoucherTypeList, function (o) {
      o.sl = i;
      i++;
   });
   $("#gridTable").kendoGrid({
      dataSource: data,
      sortable: true,
      toolbar: ["search"],
      search: {
         fields: ["VoucharName"]
      },
      pageable: {
         pageSize: 15,
         pageSizes: [15, 30, 50, "all"],
         numeric: false
      },
      columns: [
         {
            field: "sl",
            title: "SL No",
            width: 15,
            headerAttributes: {
               style: "text-align: center;font-weight: bold;background-color:#C2DFFF"
            },
            attributes: { style: "text-align: center;" }
         },  
         {
            title: "VoucherType Name",
            field: "VoucharName", width: 90,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "PrefixCode",
            field: "PrefixCode", width: 90,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Vouchar Name Bangla",
            field: "VoucharNameB", width: 90,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Action",
            template: "<button class='btn btn-ghost-info active w-10'  title='Edit' onclick='Edit(#:Id#)'><span class='k-icon k-i-edit'></span></button>",
            field: "", width: 20,
            headerAttributes: {
               style: "text-align: center;font-weight: bold;background-color:#C2DFFF"
            },
            attributes: {
               style: "text-align: center;"
            }
         },
      ]
   });
}

function Save() {
   var o = new Object();
   var validate = true;
   validate = Validate();
   if (validate == true) {
      o.Id = $('#spanParentID').html();
      o.VoucharName = $('#txtVoucherName').val();
      o.PrefixCode = $('#txtprefixCode').val();
      o.VoucharNameB = $('#txtVoucharNameB').val();
      o.IsActive = $('#isActive').is(':checked') ? true : false;
      if (o.Id == 0) {
         $.ajax({
            url: "https://localhost:7065/api/VoucherType/SaveVoucherType",
            type: "JSON",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) { 
               /*if (data.code == 200) {*/
               toastr.success(data.message, 'Saved Successfully');
               $("#gridTable").data('kendoGrid').dataSource.data([]);
               VoucherTypeLoad();
               $('#modalToggle').modal('hide')
               //} else {
               //   toastr.warning(data.message, "Waring");
               //}
            },
            error: function (xhr, textStatus, errorThrown) {
               toastr.error('Error Saving', 'Error');
            }
         });
      }
      else {
         $.ajax({
            url: "https://localhost:7065/api/VoucherType/UpdateVoucherType", 
            type: "json",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) {
               console.log(data);
               /*if (data.code == 200) {*/
               toastr.success(data.message, 'Update Successfully');
               $("#gridTable").data('kendoGrid').dataSource.data([]);
               VoucherTypeLoad();
               $('#modalToggle').modal('hide')
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
}
function Edit(Id) { 
   $('#spanParentID').html(Id);
   var FilterData = _.filter(VoucherTypeList, function (item) { return item.Id == Id });
   $('#txtVoucherName').val(FilterData[0].VoucharName);
   $('#txtprefixCode').val(FilterData[0].PrefixCode); 
   $('#txtVoucharNameB').val(FilterData[0].VoucharNameB); 
   FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Update');
   $('#staticBackdropLabel').text('Edit VoucherType Information');
   $('#btnSave').addClass('btn btn-ghost-info active w-10');
}
function AddNew() {
   $('#staticBackdropLabel').text('Create New VoucherType');
   $('#btnSave').removeClass('btn btn-ghost-info active w-10');
   $('#spanParentID').html(0);
   $('#txtVoucherName').val('');
   $('#txtprefixCode').val(''); 
   $('#txtVoucharNameB').val(''); 
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}

function Validate() { 
   if ($('#txtVoucherName').val() == "") {
      $('#txtVoucherName').focus();
      toastr.warning('Please input VoucherType name',"Warning");
      return false;
   } 
   if ($('#txtprefixCode').val() == "") {
      $('#txtprefixCode').focus();
      toastr.warning('Please input PrefixCode name', "Warning");
      return false;
   } 
   if ($('#txtVoucharNameB').val() == "") {
      $('#txtVoucharNameB').focus();
      toastr.warning('Please input VoucharName Bangla', "Warning");
      return false;
   } 
   return true;
}
function checkEmptyInput(inputElement) {
    if (inputElement.value.trim() === "") {
        inputElement.style.border = "1px solid red";
    } else {
        inputElement.style.border = "1px solid #ced4da"; // Reset border to default
    }
}

