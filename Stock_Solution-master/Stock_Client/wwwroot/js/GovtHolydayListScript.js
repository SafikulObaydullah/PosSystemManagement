var GovtHolydayList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteGovtType: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Mgmt/DeleteGovtHolyday",
                data: { id: id },
                success: function (data) {
                    GovtHolydayList.SearchLoan();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetEarById: function (id) {
        OpenRightToLeftModal('/Mgmt/AddGovtHolyday?id=' + id)
    },
    SearchLoan: function () {
        GovtHolydayList.CurrentPage = 1;
        GovtHolydayList.TotalCount = -1;
        GovtHolydayList.LoadLonList();
    },
    LoadLonList: function () {
        if (GovtHolydayList.LoaderAjax && GovtHolydayList.LoaderAjax.readyState != 4) {
            return;
        }
        if (GovtHolydayList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var Year = $("#Year").val();
        var PayrollId = $("#PayrollId").val();
        var paramlite = {
            PageNo: GovtHolydayList.CurrentPage,
            SearchText: SearchText,
            PayrollId: PayrollId,
            Year: Year,
            UserGuid: $('#EmployeeId').val(),
        };
        GovtHolydayList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Mgmt/GetGovtHolydayList',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                GovtHolydayList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#GovtYearTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (GovtHolydayList.CurrentPage == 1) {
                    if (GovtHolydayList.TotalCount == 0) {
                        $(".load_GovtTemplate").html('<tr><td colspan="5">No Data</td></tr>');
                    } else {
                        $(".load_GovtTemplate").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_GovtTemplate").append(sourceHtml(dataa));
                }
                $(".load_GovtTemplate").show();
                GovtHolydayList.CurrentPage++;
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
    GovtHolydayList.LoadLonList()
    $('#SearchDocBtn').click(function () {
        GovtHolydayList.SearchLoan()
    })
    $('#ApplyDoc').click(function () {
        GovtHolydayList.SearchLoan()
    })
    $("#SearchLoanBtn").click(function () {
        GovtHolydayList.CurrentPage = 1;
        GovtHolydayList.TotalCount = -1;
        GovtHolydayList.SearchLoan();
    });
    $("#Year").change(function () {
        GovtHolydayList.CurrentPage = 1;
        GovtHolydayList.TotalCount = -1;
        GovtHolydayList.SearchLoan();
    });
    $("#SearchText").keyup(function () {
        GovtHolydayList.CurrentPage = 1;
        GovtHolydayList.TotalCount = -1;
        GovtHolydayList.SearchLoan();
    });
})
$('#emp_lon_height').scroll(function () {
    GovtHolydayList.LoadLonList()
})