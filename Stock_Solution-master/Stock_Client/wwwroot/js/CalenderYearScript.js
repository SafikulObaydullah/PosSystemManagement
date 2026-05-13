var CalenderYearList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteCalendarType: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Mgmt/DeleteCalendarType",
                data: { id: id },
                success: function (data) {
                    CalenderYearList.SearchLoan();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetEarById: function (id) {
        OpenRightToLeftModal('/Mgmt/AddCalendarYear?id=' + id)
    },
    SearchLoan: function () {
        CalenderYearList.CurrentPage = 1;
        CalenderYearList.TotalCount = -1;
        CalenderYearList.LoadLonList();
    },
    LoadLonList: function () {
        if (CalenderYearList.LoaderAjax && CalenderYearList.LoaderAjax.readyState != 4) {
            return;
        }
        if (CalenderYearList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var PayrollId = $("#PayrollId").val();
        var paramlite = {
            PageNo: CalenderYearList.CurrentPage,
            SearchText: SearchText,
            PayrollId: PayrollId,
            UserGuid: $('#EmployeeId').val(),
        };
        CalenderYearList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Mgmt/GetCalenderYearList',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                CalenderYearList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#CalenderYearTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (CalenderYearList.CurrentPage == 1) {
                    if (CalenderYearList.TotalCount == 0) {
                        $(".load_CalenderYearTemplate").html('<tr><td colspan="2">No Data</td></tr>');
                    } else {
                        $(".load_CalenderYearTemplate").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_CalenderYearTemplate").append(sourceHtml(dataa));
                }
                $(".load_CalenderYearTemplate").show();
                CalenderYearList.CurrentPage++;
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
    CalenderYearList.LoadLonList()
    $('#SearchDocBtn').click(function () {
        CalenderYearList.SearchLoan()
    })
    $('#ApplyDoc').click(function () {
        CalenderYearList.SearchLoan()
    })
    $("#SearchLoanBtn").click(function () {
        CalenderYearList.CurrentPage = 1;
        CalenderYearList.TotalCount = -1;
        CalenderYearList.SearchLoan();
    });
    $("#SearchText").keyup(function () {
        CalenderYearList.CurrentPage = 1;
        CalenderYearList.TotalCount = -1;
        CalenderYearList.SearchLoan();
    });
})
$('#emp_lon_height').scroll(function () {
    CalenderYearList.LoadLonList()
})