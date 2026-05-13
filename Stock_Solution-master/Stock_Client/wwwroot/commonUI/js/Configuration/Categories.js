$(document).ready(function () {
   GetParentCategory();
   $("#btnUpdate").hide();
   //$("#MyModal").modal('hide');
   $("#btnSave").show();
   var IsEdit = false;
   //$("#MyModal").modal({
   //    backdrop: 'static',
   //    keyboard: false
   //    /*show: true*/
   //});
   load()
   //$('#MyModal').modal({
   //        backdrop: 'static',
   //    keyboard: true,
   //    show: false
   //    });
   $("#btnModal").click(function () {
      $("#MyModal").modal('show')
      //$('#MyModal').modal({
      //    backdrop: 'static',
      //    keyboard: true,
      //    show: true
      //});

   })
   $("#btnSave").click(function () {
      var obj = {
         Name: $("#txtName").val(),
         ParentId: $("#ParentId :selected").val(),
         Description: $("#txtDescription").val()
      }

      console.log($("#ParentId :selected").val())
      $.ajax({
         url: "https://localhost:7065/api/Category",
         type: "JSON",
         method: "POST",
         data: JSON.stringify(obj),
         contentType: "application/json",
         success: function (result) {
            console.log(result)

            $("#MyModal").modal('hide')
            clearALl(); load();
         },
         error: function (er) {
            console.log(er)
         }
      })
   })
   //$("#btnUpdate").click(function () {

   //}

})
function GetParentCategory() {
   $.ajax({
      url: "https://localhost:7065/api/Category",
      method: "GET",
      dataType: "json",
      success: function (data) {
         console.log(data);
         data.forEach(element => {
            $('#ParentId').append('<option value=' + element.Id + '>' + element.Name + '</option>')
         })
         //CategoryList = data;
         //console.log(CategoryList);
         //BindTestStandardPriceTable(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log("Error:", textStatus, errorThrown);
      }
   });
}
function clearALl() {
   $("#txtName").val(''),
      $("#ParentId").val(''),
      $("#txtDescription").val('')
   $("#txtId").empty()
}
function Close() {
   //alert(IsEdit);
   //if (IsEdit == false) {
   $("#MyModal").modal('hide')

   clearALl();
   // }
}
function load() {
   $.ajax({
      url: "https://localhost:7065/api/Category",
      type: "JSON",
      method: "GET",
      success: function (result) {
         console.log(result)
         $("#tble tbody").empty();
         $.each(result, function (i, v) {
            console.log(v)
            var html = "<tr><td>" + v.Name + "</td>" +
               "<td>" + v.ParentId + "</td>" +
               " <td>" + v.Description + "</td>" +
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
   //alert(id)
   //$("#btnUpdate").show();
   //$("#btnSave").hide(); 
   var url = "https://localhost:7065/api/Category/GetByID?Id=" + id;
 
   $.ajax({
      url: url,
      type: "JSON",
      method: "GET",
      success: function (result) {
         $("#exampleModalLabel").html("Update Department Information");
         console.log(result)
         IsEdit = true; 
         $("#txtName").val(result.Name),
            $("#ParentId").val(result.ParentId),
            $("#txtDescription").val(result.Description)
         $("#txtId").val(result.Id)
         $("#MyModal").modal('show')
      },
      error: function (er) {
         console.log(er)
      }
   })

}
function Update() {
   alert($("#txtId").val());
   var url = "https://localhost:7065/api/Category/Update" + $("#txtId").val(); 
   var object = {
      Name: $("#txtName").val(),
      ParentId: $("#ParentId").val(),
      Description: $("#txtDescription").val(),
      Id: $("#txtId").val()
   }
   $.ajax({
      url: url,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "Put",

      data: JSON.stringify(object),
      success: function (result) {
         //getProductData();
         //clear();
         $("#MyModal").modal('hide');
         load();
         clearALl();
         console.log("....")
         console.log(result)
         //if (result > 0 ) {
         //    load();
         //    clearALl();

         //}
         $("#btnUpdate").hide();
         $("#btnSave").show();
      },
      error: function (er) {
         console.log(er.responseText);
      }
   })
}
function Delete(id) {
   var url = "https://localhost:7065/api/Category/Delete?id=" + id;
   /*alert(id)*/
   $.ajax({
      url: url,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "Delete",
      success: function () {
         clearALl();
         load();
         // console.log(result);

      },
      error: function (msg) {
         console.log(msg);
      }
   });
}