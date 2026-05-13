var EmployeeTransferList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteEmployeeTransferList: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Employee/DeleteEmployeeTransferList",
                data: { id: id },
                success: function (data) {
                    EmployeeTransferList.SearchEmployeeTransferList();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetEmployeeTransferById: function (id) {
        OpenRightToLeftModal('/Employee/AddEmployeeTransfer?id=' + id)
    },
    SearchEmployeeTransferList: function () {
        EmployeeTransferList.CurrentPage = 1;
        EmployeeTransferList.TotalCount = -1;
        EmployeeTransferList.LoadEmployeeTransferList();
    },
    LoadEmployeeTransferList: function () {
        if (EmployeeTransferList.LoaderAjax && EmployeeTransferList.LoaderAjax.readyState != 4) {
            return;
        }
        if (EmployeeTransferList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var paramlite = {
            PageNo: EmployeeTransferList.CurrentPage,
            SearchText: SearchText,
        };
        EmployeeTransferList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Employee/EmployeeTransferListLite',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
               debugger;
               console.log("Transfer Data ",data);
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                EmployeeTransferList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#AsTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (EmployeeTransferList.CurrentPage == 1) {
                    if (EmployeeTransferList.TotalCount == 0) {
                        $(".load_Transferlist").html('<tr><td colspan="5">No Data</td></tr>');
                    } else {
                        $(".load_Transferlist").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_Transferlist").append(sourceHtml(dataa));
                }
                $(".load_Transferlist").show();
                EmployeeTransferList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadEmployeeTransferList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var active = $("#active_status").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchText
            + '&active=' + active;
        //window.location.href = "/Employee/employee-download-excel" + parm;
    },
};

//var UpdateTransfer = function (id) {
//    var url = "/Employee/AddEmployeeTransfer";
//    $(".grid-list-exc-page").hide();
//    OpenRightToLeftModal('/Employee/AddEmployeeTransfer?id=' + id);
//}

$(document).ready(function () {
    EmployeeTransferList.LoadEmployeeTransferList()
    $('#SearchDocBtn').click(function () {
        EmployeeTransferList.SearchEmployeeTransferList()
    })
    $('#ApplyDoc').click(function () {
        EmployeeTransferList.SearchEmployeeTransferList()
    })
    $("#SearchAssetBtn").click(function () {
        EmployeeTransferList.CurrentPage = 1;
        EmployeeTransferList.TotalCount = -1;
        EmployeeTransferList.SearchEmployeeTransferList();
    });
    $("#SearchText").keyup(function () {
        EmployeeTransferList.CurrentPage = 1;
        EmployeeTransferList.TotalCount = -1;
        EmployeeTransferList.SearchEmployeeTransferList();
    });
})
$('#emp_lon_height').scroll(function () {
    EmployeeTransferList.LoadEmployeeTransferList()
})
