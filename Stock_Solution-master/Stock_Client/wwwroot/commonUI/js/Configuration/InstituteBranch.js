var InstituteBranchList = []
var InstituteList = []
$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
$(document).ready(function () {
   InstituteBranchLoad();
   InstituteLoad();
   $("#ddlInstitute").kendoComboBox({
      dataTextField: "InstituteName",
      dataValueField: "Id",
      dataSource: [],
      filter: "contains",
      suggest: true,
      placeholder: 'Select Institute Branch Name'
   });
   var comboBox = $("#ddlInstitute").data("kendoComboBox");

   // Set the position of the dropdown list
   comboBox.popup.open({ position: "top" }); 
   $(function () {
      $("[data-role=combobox]").each(function () {
         var widget = $(this).getKendoComboBox();
         widget.input.on("focus", function () {
            widget.open();
         });
      });
   });
});
function InstituteLoad(){
   $.ajax({
      url: "https://localhost:7065/api/Institutes/GetInstitute",
      method: "GET",
      dataType: "json",
      success: function (data) {
         InstituteList = data;
         console.log("List", InstituteList);
            $("#ddlInstitute").data('kendoComboBox').dataSource.data([]);
         $('#ddlInstitute').data('kendoComboBox').dataSource.data(InstituteList);
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });

}

function InstituteBranchLoad() {
   $.ajax({
      url: "https://localhost:7065/api/InsBranch/GetInstituteBrach",
      method: "GET",
      dataType: "json",
      success: function (data) {
         console.log("DDDD data");
         console.log(data);
         InstituteBranchList = data;
         $("#ddlInstitute").data('kendoComboBox').dataSource.data([]);
         $('#ddlInstitute').data('kendoComboBox').dataSource.data(InstituteBranchList);
         InstituteBranchDataBind(InstituteBranchList);
         /*InstituteLoad(); */
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });

}

function InstituteBranchDataBind(data) {
   var i = 1;
   _.map(InstituteBranchList, function (o) {
      o.sl = i;
      i++;
   });
   $("#gridTable").kendoGrid({
      dataSource: data,
      sortable: true,
      toolbar: ["search"],
      search: {
         fields: ["InstituteBranchName"]
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
            title: "Ins. Branch Name",
            field: "BranchName", width: 50,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "BranchShortName",
            field: "BranchShortName", width: 30,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Contact Number",
            field: "ConatcNumber", width: 40,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Email",
            field: "Email", width: 50,
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
      o.Id = $('#spanParentID').html();
      o.BranchName = $('#txtInstituteBranchName').val();
      o.BranchShortName = $('#txtBranchShortName').val();
      o.ConatcNumber = $('#txtContactNumber').val();
      o.Email = $('#txtEmail').val();
      o.Address = $('#txtAddress').val();
      o.InsId = $("#ddlInstitute").data('kendoComboBox').value();
      o.IsMainbranch = $('#isActive').is(':checked') ? true : false;
      o.IsActive = $('#isActive').is(':checked') ? true : false;
      console.log("Data ");
      console.log(o);
      if (o.Id == 0) {
         $.ajax({
            url: "https://localhost:7065/api/InsBranch/SaveInstituteBranch",
            type: "JSON",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) {
               /*if (data.code == 200) {*/
               toastr.success(data.message, 'Saved Successfully');
               $("#gridTable").data('kendoGrid').dataSource.data([]);
               InstituteBranchLoad();
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
            url: "https://localhost:7065/api/InsBranch/UpdateInstituteBranch",
            type: "JSON",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) {
               /*if (data.code == 200) {*/
               toastr.success(data.message, 'Update Successfully');
               $("#gridTable").data('kendoGrid').dataSource.data([]);
               InstituteBranchLoad();
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
   var FilterData = _.filter(InstituteBranchList, function (item) { return item.Id == Id });
   $('#txtInstituteBranchName').val(FilterData[0].BranchName);
   $('#txtBranchShortName').val(FilterData[0].BranchShortName);
   $('#txtContactNumber').val(FilterData[0].ConatcNumber);
   $('#txtEmail').val(FilterData[0].Email);
   $('#txtEmailPassword').val(FilterData[0].AdminEmailPassword);
   $('#txtAddress').val(FilterData[0].Address);
   $('#ddlInstitute').data('kendoComboBox').value(FilterData[0].InsId); 
   FilterData[0].IsMainbranch == false ? $('#isMainBranch').prop('checked', false) : $('#isMainBranch').prop('checked', true)
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
   $('#txtInstituteBranchName').val('');
   $('#txtBranchShortName').val('');
   $('#txtContactNumber').val('');
   $('#txtEmail').val('');
   $('#txtAddress').val('');
   $("#ddlInstitute").data('kendoComboBox').value('');
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}

function Validate() {
   if ($('#txtInstituteBranchName').val() == "") {
      $('#txtInstituteBranchName').focus();
      toastr.warning('Please input Institute name', "Warning");
      return false;
   }
   if ($('#txtBranchShortName').val() == "") {
      $('#txtBranchShortName').focus();
      toastr.warning('Please input Institute Branch ShortName', "Warning");
      return false;
   }
   if ($('#txtContactNumber').val() == "") {
      $('#txtContactNumber').focus();
      toastr.warning('Please input Contact', "Warning");
      return false;
   }
   if ($('#txtEmail').val() == "") {
      $('#txtEmail').focus();
      toastr.warning('Please input Email', "Warning");
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
   if ($("#ddlInstitute").data('kendoComboBox').value() == "" || $("#ddlInstitute").data('kendoComboBox').selectedIndex == -1) {
      $("#ddlInstitute").data('kendoComboBox').focus();
      $("#ddlInstitute").data('kendoComboBox').open();
      toastr.warning('Please input Institute Name', "Warning");
      return false;
   }
   return true;
}
function checkEmptyInput(inputElement) {
   if (inputElement.value.trim() === "") {
      inputElement.style.border = "1px solid red";
   } else {
      inputElement.style.border = "1px solid #ced4da";
   }
}

