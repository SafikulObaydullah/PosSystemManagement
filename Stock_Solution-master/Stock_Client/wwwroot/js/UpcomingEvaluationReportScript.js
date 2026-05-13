var UpcomingEvaluationReportList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteUpcomingEvaluationReportList: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Employee/DeleteUpcomingEvaluationReportList",
                data: { id: id },
                success: function (data) {
                    UpcomingEvaluationReportList.SearchUpcomingEvaluationReportList();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    SearchUpcomingEvaluationReportList: function () {
        UpcomingEvaluationReportList.CurrentPage = 1;
        UpcomingEvaluationReportList.TotalCount = -1;
        UpcomingEvaluationReportList.LoadUpcomingEvaluationReportList();
    },
    LoadUpcomingEvaluationReportList: function () {
        console.log('LoadUpcomingAnniversaryReportList');
        if (UpcomingEvaluationReportList.LoaderAjax && UpcomingEvaluationReportList.LoaderAjax.readyState != 4) {
            return;
        }
        if (UpcomingEvaluationReportList.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var active = $("#active_status").val();
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: UpcomingEvaluationReportList.CurrentPage,
            SearchText: SearchText,
            active: active,
            datakey: 'anniversary'

        };
        UpcomingEvaluationReportList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Report/EmployeeEvaluationReport',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                UpcomingEvaluationReportList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#EVTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (UpcomingEvaluationReportList.CurrentPage == 1) {
                    if (UpcomingEvaluationReportList.TotalCount == 0) {
                        $(".load_evaluationlist").html('<tr><td colspan="4">No Data</td></tr>');
                    } else {
                        $(".load_evaluationlist").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_evaluationlist").append(sourceHtml(dataa));
                }
                $(".load_evaluationlist").show();
                UpcomingEvaluationReportList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadUpcomingEvaluationReportList: function () {
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
    UpcomingEvaluationReportList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: DateFormat,
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 7
    });
    UpcomingEvaluationReportList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: DateFormat,
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 7
    });
    UpcomingEvaluationReportList.LoadUpcomingEvaluationReportList()
    $('#SearchDocBtn').click(function () {
        UpcomingEvaluationReportList.SearchUpcomingEvaluationReportList()
    })
    $('#ApplyDoc').click(function () {
        UpcomingEvaluationReportList.SearchUpcomingEvaluationReportList()
    })
    $("#active_status").change(function () {
        UpcomingEvaluationReportList.CurrentPage = 1;
        UpcomingEvaluationReportList.TotalCount = -1;
        UpcomingEvaluationReportList.SearchUpcomingEvaluationReportList();
    });
    $("#SearchAssetBtn").click(function () {
        UpcomingEvaluationReportList.CurrentPage = 1;
        UpcomingEvaluationReportList.TotalCount = -1;
        UpcomingEvaluationReportList.SearchUpcomingEvaluationReportList();
    });
    $("#SearchText").keyup(function () {
        UpcomingEvaluationReportList.CurrentPage = 1;
        UpcomingEvaluationReportList.TotalCount = -1;
        UpcomingEvaluationReportList.SearchUpcomingEvaluationReportList();
    });
})
$('#emp_lon_height').scroll(function () {
    UpcomingEvaluationReportList.LoadUpcomingEvaluationReportList()
})
