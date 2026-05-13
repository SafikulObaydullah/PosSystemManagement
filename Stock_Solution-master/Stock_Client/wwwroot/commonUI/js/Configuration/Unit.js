
var InstituteList = [];
var InsBranchList = [];
$(document).ready(function () {
   $("#btnUpdate").hide(); 
   $("#btnSave").show();
   var IsEdit = false;
   $("#MyModal").modal({
      backdrop: 'static',
      keyboard: false 
   });
   load();
   LoadInitalData();
   $("#btnModal").click(function () {
      $("#MyModal").modal('show')
   })
})
function Save() {
   var obj = new Object();  
      obj.id = 0,
      obj.name = $("#txtName").val(),
      obj.shortname = $("#txtShortName").val(),
      obj.insId = $("#ddlInstitute").val(),
      obj.inBranchsId = $("#ddlInsBranch").val(),
      
   $.ajax({
      url: "https://localhost:7065/api/Unit/SaveUnit",
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
   $.ajax({
      url: "https://localhost:7065/api/Unit/GetUnit",
      type: "JSON",
      method: "GET",
      success: function (result) {
         console.log("Get All = ", result)
         $("#tble tbody").empty();
         $.each(result, function (i, v) {
            console.log("Data value = ", v)
            var html = "<tr><td>" + v.Name + "</td>" +
               " <td>" + v.Shortname + "</td>" +
               "<td>" + v.InstituteName + "</td>" +
               "<td>" + v.InstituteBranchName + "</td>" +
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
      url: "https://localhost:7065/api/Unit/GetByID?Id=" + id,
      type: "JSON",
      method: "GET",
      //data: JSON.stringify(obj),
      contentType: "application/json",
      success: function (result) {
         alert("hi");
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
   var url = "https://localhost:7065/api/Unit/UpdateUnit"
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
function LoadInitalData() {
   $.ajax({
      url: "https://localhost:7065/api/Unit/GetInitialData",
      method: "GET",
      dataType: "json",
      success: function (data) {
         InstituteList = data.institute;
         InsBranchList = data.insBranch;
         console.log("Institute = ", InstituteList);
         console.log("Branch List ", InsBranchList);
         var s = '<option value="-1">Select Institute</option>';
         for (var i = 0; i < InstituteList.length; i++) {
            console.log(data[i])
            s += '<option value="' + InstituteList[i].id + '">' + InstituteList[i].instituteName + '</option>';
         }
         $("#ddlInstitute").html(s);

         var s = '<option value="-1">Select Institute Branch</option>';
         for (var i = 0; i < InsBranchList.length; i++) { 
            s += '<option value="' + InsBranchList[i].id + '">' + InsBranchList[i].branchName + '</option>';
         }
         $("#ddlInsBranch").html(s);
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
   $('#txtShortName').val('');
   $('#ddlInstitute').val('');
   $('#ddlInsBranch').val('');
   $('#MyModal').modal('toggle');
   $('#btnSave').text('Save');
   $('#btnSave').addClass('btn btn-ghost-primary active w-10');
}