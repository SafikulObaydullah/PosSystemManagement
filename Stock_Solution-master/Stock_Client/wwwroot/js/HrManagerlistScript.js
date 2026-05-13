var HrManagerList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteManager: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Employee/DeleteManager",
                data: { id: id },
                success: function (data) {
                    HrManagerList.SearchLoan();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetEarById: function (id) {
        OpenRightToLeftModal('/Employee/AddHrManager?id=' + id)
    },
    SearchLoan: function () {
        HrManagerList.CurrentPage = 1;
        HrManagerList.TotalCount = -1;
        HrManagerList.LoadLonList();
    },
    LoadLonList: function () {
        if (HrManagerList.LoaderAjax && HrManagerList.LoaderAjax.readyState != 4) {
            return;
        }
        if (HrManagerList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var PayrollId = $("#PayrollId").val();
        var paramlite = {
            PageNo: HrManagerList.CurrentPage,
            SearchText: SearchText,
            PayrollId: PayrollId,
            UserGuid: $('#EmployeeId').val(),
        };
        HrManagerList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Employee/GetHrMangerList',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                HrManagerList.TotalCount = TotalCount[0].TotalCount;
                var hrtemplate = $("#HRTemplate").html();
                var sourceHtml = Handlebars.compile(hrtemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (HrManagerList.CurrentPage == 1) {
                    if (HrManagerList.TotalCount == 0) {
                        $(".load_Managerlist").html('<tr><td colspan="3">No Data</td></tr>');
                    } else {
                        $(".load_Managerlist").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_Managerlist").append(sourceHtml(dataa));
                }
                $(".load_Managerlist").show();
                HrManagerList.CurrentPage++;
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
    HrManagerList.LoadLonList()
    $('#SearchDocBtn').click(function () {
        HrManagerList.SearchLoan()
    })
    $('#ApplyDoc').click(function () {
        HrManagerList.SearchLoan()
    })
    $("#SearchLoanBtn").click(function () {
        HrManagerList.CurrentPage = 1;
        HrManagerList.TotalCount = -1;
        HrManagerList.SearchLoan();
    });
    $("#SearchText").keyup(function () {
        HrManagerList.CurrentPage = 1;
        HrManagerList.TotalCount = -1;
        HrManagerList.SearchLoan();
    });
})
$('#emp_lon_height').scroll(function () {
    HrManagerList.LoadLonList()
})