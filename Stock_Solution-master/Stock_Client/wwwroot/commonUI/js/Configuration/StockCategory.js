var CategoryList = []
var CategoryParentList = []
/*$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);*/
$(document).ready(function () {
   CategoryLoad();
   /*CategoryParentLoad();*/
   $("#ddlCategoryParent").kendoComboBox({
      dataTextField: "ParentName",
      dataValueField: "ParentId",
      dataSource: [],
      filter: "contains",
      suggest: true,
      placeholder: 'Select Category'
   });
   $(function () {
      $("[data-role=combobox]").each(function () {
         var widget = $(this).getKendoComboBox();
         widget.input.on("focus", function () {
            widget.open();
         });
      });
   });
});
//function CategoryParentLoad() {
//   $.ajax({
//      url: "https://localhost:7065/api/Category/GetCategory",
//      method: "GET",
//      dataType: "json",
//      success: function (data) {
//         CategoryList = data;
//         console.log("List", CategoryList);
//            $("#ddlCategoryParent").data('kendoComboBox').dataSource.data([]);
//            $('#ddlCategoryParent').data('kendoComboBox').dataSource.data(CategoryList);
//      },
//      error: function (jqXHR, textStatus, errorThrown) {
//         console.log("Error:", textStatus, errorThrown);
//      }
//   });

//}

function CategoryLoad() { 
   $.ajax({
      url: "https://localhost:7065/api/Category/GetCategory",
      method: "GET",
      dataType: "json",
       success: function (data) { 
         console.log(data);
            CategoryList = data;
            $("#ddlCategoryParent").data('kendoComboBox').dataSource.data([]);
            $('#ddlCategoryParent').data('kendoComboBox').dataSource.data(CategoryList);
            CategoryDataBind(CategoryList);
            /*CategoryParentLoad(); */
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });

}

function CategoryDataBind(data) {  
    //var grid = $("#gridTable").data("kendoGrid"); 
    //grid.dataSource.data([]); 
    //grid.refresh();

   var i = 1;
    _.map(CategoryList, function (o) {
      o.sl = i;
      i++;
   });
    $("#gridTable").kendoGrid({
      dataSource: data,
      sortable: true,
      toolbar: ["search"],
      search: {
         fields: ["Name"]
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
            title: "Cateogy Parent Name",
            field: "ParentName", width: 90,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Category Name",
            field: "Name", width: 90,
            attributes: {
               style: "text-align: left;"
            },
            headerAttributes: {
               style: "text-align: left;font-weight: bold;background-color:#C2DFFF"
            }
         },
         {
            title: "Description",
            field: "Description", width: 90,
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
        o.Name = $('#name').val();
        o.Description = $('#txtDescription').val();
        o.ParentID = $('#ddlCategoryParent').val() == "" || $('#ddlCategoryParent').val() == null || $('#ddlCategoryParent').val() == undefined  ? 0 : $('#ddlCategoryParent').val();
        o.isActive = $('#isActive').is(':checked') ? true : false;
      if (o.Id == 0) {
         $.ajax({
            url: "https://localhost:7065/api/Category/SaveCategory",
            type: "JSON",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) {
               /*if (data.code == 200) {*/
                toastr.success(data.message, 'Saved Successfully');
                $("#gridTable").data('kendoGrid').dataSource.data([]);
                CategoryLoad(); 
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
            url: "https://localhost:7065/api/Category/UpdateCategory", 
            type: "json",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(o),
            success: function (data) {
               console.log(data);
               /*if (data.code == 200) {*/
               toastr.success(data.message, 'Update Successfully');
               $("#gridTable").data('kendoGrid').dataSource.data([]);
               CategoryLoad();
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
   var FilterData = _.filter(CategoryList, function (item) { return item.Id == Id });
   $('#name').val(FilterData[0].Name);
   $('#txtDescription').val(FilterData[0].Description);
   $('#ddlCategoryParent').data('kendoComboBox').value(FilterData[0].ParentId);
   FilterData[0].isActive == false ? $('#isActive').prop('checked', false) : $('#isActive').prop('checked', true)
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Update');
   $('#staticBackdropLabel').text('Edit Category Information');
   $('#btnSave').addClass('btn btn-ghost-info active w-10');
}
function AddNew() {
   $('#staticBackdropLabel').text('Create New Category');
   $('#btnSave').removeClass('btn btn-ghost-info active w-10');
   $('#spanParentID').html(0);
   $('#name').val('');
   $('#txtDescription').val('');
   $('#ddlCategoryParent').data('kendoComboBox').value('');
   $('#modalToggle').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}

function Validate() {
   if ($("#ddlCategoryParent").data('kendoComboBox').value() == "" || $("#ddlCategoryParent").data('kendoComboBox').selectedIndex == -1) {
      $("#ddlCategoryParent").data('kendoComboBox').focus();
      $("#ddlCategoryParent").data('kendoComboBox').open();
      toastr.warning('Please input Category Parent Name', "Warning");
      return false;
   }
   if ($('#name').val() == "") {
      $('#name').focus();
      toastr.warning('Please input Category name',"Warning");
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

