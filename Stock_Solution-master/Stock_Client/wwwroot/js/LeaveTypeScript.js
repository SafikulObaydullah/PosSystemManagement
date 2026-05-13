
var LeaveTypeList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteLeaveType: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Mgmt/DeleteLeaveType",
                data: { id: id },
                success: function (data) {
                    LeaveTypeList.SearchLoan();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetEarById: function (id) {
        OpenRightToLeftModal('/Mgmt/AddLeaveType?id=' + id)
    },
    SearchLoan: function () {
        LeaveTypeList.CurrentPage = 1;
        LeaveTypeList.TotalCount = -1;
        LeaveTypeList.LoadLonList();
    },
    LoadLonList: function () {
        if (LeaveTypeList.LoaderAjax && LeaveTypeList.LoaderAjax.readyState != 4) {
            return;
        }
        if (LeaveTypeList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var PayrollId = $("#PayrollId").val();
        var paramlite = {
            PageNo: LeaveTypeList.CurrentPage,
            SearchText: SearchText,
            PayrollId: PayrollId,
            UserGuid: $('#EmployeeId').val(),
        };
        LeaveTypeList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Mgmt/GetLeaveTypeList',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                LeaveTypeList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#LeaveTypeTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (LeaveTypeList.CurrentPage == 1) {
                    if (LeaveTypeList.TotalCount == 0) {
                        $(".load_LeaveTypeTemplate").html('<tr><td colspan="4">No Data</td></tr>');
                    } else {
                        $(".load_LeaveTypeTemplate").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_LeaveTypeTemplate").append(sourceHtml(dataa));
                }
                $(".load_LeaveTypeTemplate").show();
                LeaveTypeList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadLonList: function () {
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
$(document).ready(function () {
    LeaveTypeList.LoadLonList()
    $('#SearchDocBtn').click(function () {
        LeaveTypeList.SearchLoan()
    })
    $('#ApplyDoc').click(function () {
        LeaveTypeList.SearchLoan()
    })
    $("#SearchLoanBtn").click(function () {
        LeaveTypeList.CurrentPage = 1;
        LeaveTypeList.TotalCount = -1;
        LeaveTypeList.SearchLoan();
    });
    $("#SearchText").keyup(function () {
        LeaveTypeList.CurrentPage = 1;
        LeaveTypeList.TotalCount = -1;
        LeaveTypeList.SearchLoan();
    });
})
$('#emp_lon_height').scroll(function () {
    LeaveTypeList.LoadLonList()
})