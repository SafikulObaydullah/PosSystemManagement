
$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
var InstituteList = []
$(document).ready(function () {
    InstituteList = []
   InstituteLoad(); 
   $(function () {
      $("[data-role=combobox]").each(function () {
         var widget = $(this).getKendoComboBox();
         widget.input.on("focus", function () {
            widget.open();
         });
      });
   });
});
  
function InstituteLoad() {
    InstituteList = []; 
   $.ajax({
      url: "https://localhost:7065/api/Institutes/GetInstitute",
      method: "GET",
      dataType: "json",
       success: function (data) {
           
           InstituteList = data; 
           /*InstituteList = [];*/
          InstituteDataBind(InstituteList);  
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });

}

function InstituteDataBind(data) {
   var i = 1;
   _.map(InstituteList, function (o) {
      o.sl = i;
      i++;
   });
   $("#gridTable").kendoGrid({
      dataSource: data,
      sortable: true,
      toolbar: ["search"],
      search: {
         fields: ["InstituteName"]
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
            title: "Institute Name",
            field: "InstituteName", width: 50,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "ShortName",
            field: "ShortName", width: 30,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Contact Number",
            field: "ContactNumber", width: 40,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Admin Email",
            field: "AdminEmail", width: 50,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Address",
            field: "Address", width: 90,
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
            field: "", width: 30,
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
      o.id = $('#spanParentID').html();
      o.instituteName = $('#txtInstituteName').val();
      o.shortName = $('#txtShortName').val(); 
      o.contactNumber = $('#txtContactNumber').val();
      o.adminEmail = $('#txtAdminEmail').val(); 
      o.adminEmailPassword = $('#txtAdminEmailPassword').val();
      o.address = $('#txtAddress').val(); 
      o.logoPath = $('#txtLogoPath').val(); 
      o.bannerPath = $('#txtBannerPath').val(); 
      o.isActive = $('#isActive').is(':checked') ? true : false;
      if (o.id == 0) {
         $.ajax({ 
            url: "https://localhost:7065/api/Institutes/SaveInstitute",
            type: "JSON",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) {
               /*if (data.code == 200) {*/
                toastr.success(data.message, 'Saved Successfully'); 
               $("#gridTable").data('kendoGrid').dataSource.data([]);
                InstituteLoad();
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
            url: "https://localhost:7065/api/Institutes/UpdateInstitute", 
            type: "JSON",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) {
               /*if (data.code == 200) {*/
               toastr.success(data.message, 'Update Successfully');
               $("#gridTable").data('kendoGrid').dataSource.data([]);
               InstituteLoad();
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
   var FilterData = _.filter(InstituteList, function (item) { return item.Id == Id });
   $('#txtInstituteName').val(FilterData[0].InstituteName);
   $('#txtShortName').val(FilterData[0].ShortName); 
   $('#txtContactNumber').val(FilterData[0].ContactNumber);
   $('#txtAdminEmail').val(FilterData[0].AdminEmail); 
   $('#txtAdminEmailPassword').val(FilterData[0].AdminEmailPassword); 
   $('#txtAddress').val(FilterData[0].Address); 
   FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Update');
   $('#staticBackdropLabel').text('Edit Institute Information');
   $('#btnSave').addClass('btn btn-ghost-info active w-10');
}
function AddNew() {
   $('#staticBackdropLabel').text('Create New Institute');
   $('#btnSave').removeClass('btn btn-ghost-info active w-10');
   $('#spanParentID').html(0);
   $('#txtInstituteName').val('');
   $('#txtShortName').val('');
   $('#txtContactNumber').val('');
   $('#txtAdminEmail').val('');
   $('#txtAdminEmailPassword').val('');
   $('#txtAddress').val('');
   $('#txtLogoPath').val('');
   $('#txtBannerPath').val('');
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}

function Validate() { 
   if ($('#txtInstituteName').val() == "") {
      $('#txtInstituteName').focus();
      toastr.warning('Please input Institute name',"Warning");
      return false;
   } 
   if ($('#txtShortName').val() == "") {
      $('#txtShortName').focus();
      toastr.warning('Please input Institute  ShortName', "Warning");
      return false;
   }
   if ($('#txtContactNumber').val() == "") {
      $('#txtContactNumber').focus();
      toastr.warning('Please input Contact', "Warning");
      return false;
   }
   if ($('#txtAdminEmail').val() == "") {
      $('#txtAdminEmail').focus();
      toastr.warning('Please input Admin Email', "Warning");
      return false;
   }
   if ($('#txtAdminEmailPassword').val() == "") {
      $('#txtAdminEmailPassword').focus();
      toastr.warning('Please input Password', "Warning");
      return false;
   }
   if ($('#txtAddress').val() == "") {
      $('#txtAddress').focus();
      toastr.warning('Please input Address', "Warning");
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

