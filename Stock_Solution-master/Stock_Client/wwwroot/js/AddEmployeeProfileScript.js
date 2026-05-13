
var updateUserName = function () {
    console.log('ss');
    if ($("#JoiningDate").val() !== '' && $("#BranchId").val() !== '-1') { 
        var url = "/Employee/GetIDFormat";
       
        var param = { 
            BranchId: $("#BranchId").val(),
            JoiningDate: $("#JoiningDate").val()
        };
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data.result) {
                    console.log('alpha');
                    if (data.auto === true)
                        $("#EmployeeIdCardNo").val(data.userId);
                    else { 
                        $("#EmployeeIdCardNo").attr("readonly", false);
                        
                    }

                } 
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
        var param2 = {
            BranchId: $("#BranchId").val(),
        }
        var url1 = "/Employee/GetCountry";
        };
        $.ajax({
            type: 'post',
            url: url1,
            data: param2,
            success: function (data) {
                if (data.success) {
                    console.log(data.result);
                    $("#CountryOfPosting").val(data.result.country);
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }

var SaveNewEmployeeProfile = function () {
    if (CommonUiValidation()) {
        var url = "/Employee/SaveNewEmployeeProfile";
        var param = {
            Id: $("#Id").val(),
            FirstName: $("#EmployeeName").val(),
            Designation: $("#Designation").val(),
            EmployeeName: $("#EmployeeName").val(),
            AssignedCounter: $("#AssignedCounter").val(),
            EmployeeIdCardNo: $("#EmployeeIdCardNo").val(),
            BranchId: $("#BranchId").val(),
            CountryOfPosting: $("#CountryOfPosting").val(),
            JoiningDate: $("#JoiningDate").val(),
            Password: $("#Password").val(),
            PermissionGroupId: $("#PermissionGroupId").val(),
            ProfilePicture: $("#employeepicture").val(),
            Sale: $("#SaleTransactionType").val(),
            HasStopTimerPermission: $("#HasStopTimerPermission").is(':checked'),
            HrCompanyId : $('#HrCompanyId').length > 0 ? $('#HrCompanyId').val() : 0
        };
        console.log(param);
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data.success) {
                    CloseRightToLeftModal()
                    OpenSuccessMessageNew("Success!", "Saved Successfully!")
                    $('#employee').click()
                } else {
                    OpenErrorMessageNew("Failed!", data.message)
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }
}


var CanApproveLeave = function (id) {
    
    var ischeck = $("#CanApproveLeave").is(':checked');
    if (ischeck == true) {
        $.ajax({
            type: 'POST',
            url: '/Employee/ApproveLeavePermission',
            data: { id: id },
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message)
            }
        })
    }
    if (ischeck==false) {
        $.ajax({
            type: 'POST',
            url: '/Employee/DeleteApproveLeavePermission',
            data: { id: id },
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message)
            }
        })
    }
    
}

var DeleteProductUnit = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Product/DeleteProductUnit",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message, "");
                MerchantAccountList.CurrentPage = 1;
                MerchantAccountList.TotalCount = -1;
                MerchantAccountList.LoadMerchantAccountList();
            }
        });
    });
}
var DownloadProductUnitList = function () {
    window.location.href = "/inventory/unit-download-excel";
};
/*start input box autofill*/
$("input").each(function () {
    if ($(this).attr("readonly") != "readonly") {
        $(this).attr("readonly", "readonly");
        $(this).addClass("cls_autofill");
    }
})
$("input").on("focus", function () {
    if ($(this).hasClass("cls_autofill")) {
        if (this.hasAttribute('readonly')) {
            this.removeAttribute('readonly');
            this.blur();
            this.focus();
        }
    }
})
        /*end input box autofill*/
var SaveProfilePicture = function (fd, isadd) {
    var url = "";
    url = '/Employee/UpdateImage';
    $.ajax({
        url: url,
        type: 'post',
        data: fd,
        headers: { ID: "", FolderName:"Employee" },
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.success == true) {
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
$(document).ready(function () {
  
    $('#uploadprofilelogo').change(function (event) {
        var fd = new FormData();
        const files = event.target.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                fd.append('File', files[i]);
                event.target.value = "";
            }
            OpenConfirmationMessageNew("Warning", "Are you sure?", function () {
                SaveProfilePicture(fd)
            })
        }
    });
    $("#add_pro_logo").click(function () {
        $("#uploadprofilelogo").click()
    })
    $("#savenewprofileforemp").click(function () {
        SaveNewEmployeeProfile();
    })
    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            SaveNewProductUnit();
        }
    });
    if ($('#JoiningDate').val() == '' || $('#JoiningDate').val() == '1/1/0001 12:00:00 AM') {
        dateseteneed = true;
    }
    JoiningDate = new Pikaday({
        field: document.getElementById('JoiningDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#JoiningDate')[0],
        firstDay: 1
    });
    if (dateseteneed == true) {
        JoiningDate.setDate(new Date());
    }
    dateseteneed = false;
    //JoiningDate = new Pikaday({
    //    field: document.getElementById('JoiningDate'),
    //    format: 'MM-DD-YYYY',
    //    trigger: $('#JoiningDate')[0], firstDay: 1
    //});
    $('#PermissionGroupId').change(function () {
        if ($('#PermissionGroupId').val() != '-1')
        {
            $("#Designation").val($('#PermissionGroupId option:selected').text())
        }
    })
    $(".load_look_list").height(window.innerHeight - 285)
});




