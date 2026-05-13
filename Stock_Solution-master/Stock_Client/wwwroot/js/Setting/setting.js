var GetPermissionByPermissionGroup = function (id, cid, eid) {
    POSModal.Show();
    $.ajax({
        url: '/Settings/GetPermissionIdsByPermissionGroup?PermissionGroupId=' + id + '&CompanyId=' + cid + '&EmployeeId=' + eid,
        type: 'post',
        success: function (data) {
            console.log(data)
            if (data != null && data.result.length > 0) {
                $('.permissionid').prop('checked', false);
                for (var i = 0; i < data.result.length; i++) {
                    $('#permission-check-' + data.result[i].permissionId).prop('checked', data.result[i].isActive);
                }
            } else {
                $('.permissionid').prop('checked', false);
            }
            POSModal.Hide();
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined')
                console.log(exr.statusText);
        }
    });
}
var SavePermissionFromSetting = function (permid) {
    POSModal.Show();
    var isactive = false;
    if ($('#permission-check-' + permid).is(':checked')) {
        isactive = true;
    }
    if ($("#PermissionGroupId").val() == "-1") {
        OpenErrorMessageNew('Error!', 'No group selected!');
    }
    else if ($("#CompanyId").val() == "-1") {
        OpenErrorMessageNew('Error!', 'No company selected!');
    }
    else {
        var requestInfo = {
            PermissionGroupId: $("#PermissionGroupId").val(),
            CompanyId: $("#CompanyId").val(),
            UserId: $("#EmpId").val(),
            PermissionId: permid,
            IsActive: isactive
        }
        $.ajax({
            url: '/Settings/SavePermission',
            type: 'post',
            data: requestInfo,
            success: function (data) {
                if (data.result) {
                    ShowSuccessMessage('Permission saved!')
                } else {
                    OpenErrorMessageNew('Error!', data.message)
                }
                POSModal.Hide();
            },
            error: function (exr) {
                if (typeof exr.statusText != 'undefined')
                    console.log(exr.statusText);
                POSModal.Hide();
            }
        });
    }
}
var SearchPermission = function () {
    var textvalue = $("#srch-permission").val();
    if ($("#PermissionGroupId").val() == "-1") {
        OpenErrorMessageNew("Warning!", "Please select user group!");
    } else if ($("#CompanyId").val() == "-1") {
        OpenErrorMessageNew("Warning!", "Please select company!");
    } else {
        POSModal.Show();
        $(".permission1").load("/settings/search-permission?searchtext=" + textvalue, function () {
            GetPermissionByPermissionGroup($("#PermissionGroupId").val(), $("#CompanyId").val(), $("#EmpId").val())
        });
    }
}
$(document).ready(function () {
    $(".setting_div").height(window.innerHeight - 333)
    $("#PermissionGroupId").change(function () {
        if ($("#PermissionGroupId").val() != "-1") {
            var pid = $("#PermissionGroupId").val();
            var cid = $("#CompanyId").val();
            var eid = $("#EmpId").val();
            GetPermissionByPermissionGroup(pid, cid, eid)
        }
    })
    $("#btn-srch-permission").click(function () {
        SearchPermission()
    })
    $("#srch-permission").keyup(function (e) {
        if (e.keyCode == 13) {
            SearchPermission()
        }
    })
     
})







