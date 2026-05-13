
var InstituteList = [];
var InsBranchList = [];
$(document).ready(function () {

    //var StartDate = new Pikaday({
    //    field: document.getElementById('dteStartDate'),
    //    format: 'MM/DD/YYYY',
    //});

    //$("#dteStartDate").kendoDatePicker();
    //$("#dteEndDate").kendoDatePicker();
    
        $(function () {
            $("#dteStartDate").datepicker({
                dateFormat:'dd/MM/yy'
            });
        }); 
    $(function () {
        $("#dteEndDate").datepicker();
        
    }); 
    //var EndDate = new Pikaday({
    //    field: document.getElementById('dteEndDate'),
    //    format: 'MM/DD/YYYY',
    //});

   $("#btnUpdate").hide(); 
   $("#btnSave").show();
   var IsEdit = false;
   $("#MyModal").modal({
      backdrop: 'static',
      keyboard: false 
   });
   load();
    
   $("#btnModal").click(function () {
      $("#MyModal").modal('show')
   })
})
function Save() {
   var obj = new Object();  
      obj.id = 0,
          obj.StartDate = $("#dteStartDate").val(),
          obj.EndDate = $("#dteEndDate").val() 
      
   $.ajax({
       url: "https://localhost:7065/api/DateDemo/Savedatetimeformat",
      type: "JSON",
      method: "POST",
       /*data: JSON.stringify(obj),*/
       data: obj,
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
    $("#dteStartDate").val(''),
        $("#dteEndDate").val(''), 
      $("#txtId").val('')
}
function Close() {
   $("#MyModal").modal('hide');
}
function load() {
   $.ajax({
       url: "https://localhost:7065/api/DateDemo/GetDateFormat",
      type: "JSON",
      method: "GET",
      success: function (result) {
         console.log("Get All = ", result)
         $("#tble tbody").empty();
         $.each(result, function (i, v) {
            console.log("Data value = ", v)
            var html = "<tr><td>" + v.StartDate + "</td>" +
               " <td>" + v.EndDate + "</td>" + 
               " <td> <button onClick='Edit(" + v.Id + ")'>Edit </button></td>" +
               " <td> <button onClick='Delete(" + v.Id + ")'>Delete </button></td></tr>";
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
       url: "https://localhost:7065/api/DateDemo/GetByID?Id=" + id,
      type: "JSON",
      method: "GET", 
      contentType: "application/json",
      success: function (result) {
         alert("hi");
         console.log("Get by ID ", result);
         $("#exampleModalLabel").html("Update Unit Information");
         IsEdit = true; 
          $("#dteStartDate").val(result[0].startDate),
              $("#dteEndDate").val(result[0].endDate), 
            $("#txtId").val(result[0].Id),
              $("#exampleModalLabel").modal('show')
      },
      error: function (er) {
         console.log(er)
      }
   })
}
function Update() {
    var url = "https://localhost:7065/api/DateDemo/UpdateDateFormat"
  var updateData = new Object() 
      updateData.id = $("#txtId").val(),
          updateData.startDate = $("#dteStartDate").val(),
          updateData.endDate = $("#dteEndDate").val() 
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
    var url = "https://localhost:7065/api/DateDemo/Delete?Id=" + id;
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
    $('#exampleModalLabel').text('Create New date');
   $('#btnSave').removeClass('btn btn-ghost-info active w-10');
   $('#spanParentID').html(0);
    $('#dteStartDate').val('');
    $('#dteEndDate').val(''); 
    $('#MyModal').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}