var SavePermission = function () {
    var url = "/Settings/SaveNewPermission";
    var param = {
        Id: $("#Id").val().replace(/\s+/g, ""),
        ParentId: $("#ParentId").val().replace(/\s+/g, ""),
        Name: $("#Name").val().replace(/\s+/g, ""),
        DisplayText: $("#DisplayText").val().replace(/\s+/g, ""),
        IsActive: $("#activeis:checked").val()
    };
    $.ajax({
        type: 'post',
        url: url,
        data: param,
         success: function (data) {
             if (data.result>0) {
                 OpenSuccessMessageNew("Success!", "New Permission Saved Successfully!")
                 $('#settingsmenu').click()
            }
        },
        error: function (request, error) {
            console.log("Server Error")
        }
    });
}

$(document).ready(function () {
    $("#savenewpermission").click(function () {
        SavePermission();
    });
})