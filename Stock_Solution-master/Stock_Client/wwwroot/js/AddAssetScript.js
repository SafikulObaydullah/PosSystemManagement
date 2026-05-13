var SaveAsset = function () {
    if (CommonUiValidation()) {
        var url = "/Employee/SaveAsset";
        var param = {
            ID: $('#empassetintid').val(),
            UserID: $('#EmployeeId').val(),
            AssetName: $('#AssetName').val(),
            Note: $('#Note').val(),
            Price: $('#Price').val(),
            Quantity: $('#Quantity').val(),
            Category: $('#Categoryass').val(),
            AssetImage: $('#employeepicture').val(),
            CreatedDate: $('#CreatedDate').val(),
            IsReturnable: $("#IsReturnable").is(':checked'),
            LastUpdatedBy: $('#LastUpdatedBy').val(),
            IsReturnable: $('#IsReturnable_Value:checked').val(),
        };
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data) {
                    CloseRightToLeftModal()
                    OpenSuccessMessageNew("Success!", "Asset added successfully!")
                    if ($("#ID").val() > 0) {
                        window.location.reload()
                    } else {
                        $('#UserAssetsLi').click()
                    }
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }
}
$(".profile_pic_close").click(function () {
    var id = $(this).attr('data-id');
    $(".profile_pic").attr("src", '');
    $("#productpicture").val('')
    $.ajax({
        url: '/Employee/DeleteAssetPicFile?Id=' + id,
        type: 'post',
        success: function (data) {
            if (data.success) {

            }
        }
    })
    /*})*/
})
var SaveAssetFile = function (fd) {
    POSModal.Show();
    var url = "";
    url = '/Mgmt/UpdateDoc';
    $.ajax({
        url: url,
        type: 'post',
        data: fd,
        headers: { FolderName: "EmployeeAsset" },
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            POSModal.Hide();
            if (data.success === true) {
                $("#employeepicture").val(data.result)
                $(".profile_pic").attr("src", data.result);

            }
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });
}

//var SaveAddCustomerValidation = function () {
//    var result = true;
//    if ($("#FirstName").val() == "") {
//        $("#FirstName").attr("style", "border-color:red;");
//        result = false;
//    }
//    //if ($("#PhoneNumber").val() == "") {
//    //    $("#PhoneNumber").attr("style", "border-color:red;");
//    //    result = false;
//    //}
//    if ($("#PrimaryPhone").val() == "" || $("#PrimaryPhone").val() == undefined || $("#PrimaryPhone").val() == null) {
//        $("#PrimaryPhone").attr("style", "border-color:red;");
//        result = false;
//    }
//    //else {
//    //    var pattern = "^(?:\\+88|88)?(01[3-9]\\d{8})$";
//    //    /* var pattern = "^(?:\\+67|67)?(5[0-9]\\d{10})$";*/ //for PNG
//    //    var StrMobile = $("#PrimaryPhone").val();
//    //    if (StrMobile.match(pattern)) {
//    //        $("#PrimaryPhone").attr("style", "border-color:none;");
//    //    }
//    //    else {
//    //        $("#PrimaryPhone").attr("style", "border-color:red;");
//    //        result = false;
//    //    }
//    //}
//    return result;
//}


$(document).ready(function () {
    $('#uploadprofilelogo').change(function (event) {
        var fd = new FormData();
        const files = event.target.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                fd.append('File', files[i]);
                event.target.value = "";
            }
            SaveAssetFile(fd)
        }
    });
    $("#add_pro_logo").click(function () {
        $("#uploadprofilelogo").click()
    })
    $("#saveasset").click(function () {

        SaveAsset();
    })
    $(".load_look_list").height(window.innerHeight - 285)
});




