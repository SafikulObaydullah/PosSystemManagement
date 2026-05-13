var UpcomingBirthdayReportList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteUpcomingBirthdayReportList: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Employee/DeleteUpcomingBirthdayReportList",
                data: { id: id },
                success: function (data) {
                    UpcomingBirthdayReportList.SearchUpcomingBirthdayReportList();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    SearchUpcomingBirthdayReportList: function () {
        UpcomingBirthdayReportList.CurrentPage = 1;
        UpcomingBirthdayReportList.TotalCount = -1;
        UpcomingBirthdayReportList.LoadUpcomingBirthdayReportList();
    },
    LoadUpcomingBirthdayReportList: function () {

        console.log('LoadUpcomingBirthdayReportList');
        if (UpcomingBirthdayReportList.LoaderAjax && UpcomingBirthdayReportList.LoaderAjax.readyState != 4) {
            return;
        }
        if (UpcomingBirthdayReportList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var active = $("#active_status").val();
        var paramlite = {
            PageNo: UpcomingBirthdayReportList.CurrentPage,
            SearchText: SearchText,
            active: active,
            datakey: 'birthday'

        };
        UpcomingBirthdayReportList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Report/UpcomingBirthdayReport',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                UpcomingBirthdayReportList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#BrTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (UpcomingBirthdayReportList.CurrentPage == 1) {
                    if (UpcomingBirthdayReportList.TotalCount == 0) {
                        $(".load_birthdaylist").html('<tr><td colspan="3">No Data</td></tr>');
                    } else {
                        $(".load_birthdaylist").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_birthdaylist").append(sourceHtml(dataa));
                }
                $(".load_birthdaylist").show();
                UpcomingBirthdayReportList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadUpcomingBirthdayReportList: function () {
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
    UpcomingBirthdayReportList.LoadUpcomingBirthdayReportList()
    $('#SearchDocBtn').click(function () {
        UpcomingBirthdayReportList.SearchUpcomingBirthdayReportList()
    })
    $('#ApplyDoc').click(function () {
        UpcomingBirthdayReportList.SearchUpcomingBirthdayReportList()
    })
    $("#active_status").change(function () {
        UpcomingBirthdayReportList.CurrentPage = 1;
        UpcomingBirthdayReportList.TotalCount = -1;
        UpcomingBirthdayReportList.SearchUpcomingBirthdayReportList();
    });
    $("#SearchAssetBtn").click(function () {
        UpcomingBirthdayReportList.CurrentPage = 1;
        UpcomingBirthdayReportList.TotalCount = -1;
        UpcomingBirthdayReportList.SearchUpcomingBirthdayReportList();
    });
    $("#SearchText").keyup(function () {
        UpcomingBirthdayReportList.CurrentPage = 1;
        UpcomingBirthdayReportList.TotalCount = -1;
        UpcomingBirthdayReportList.SearchUpcomingBirthdayReportList();
    });
})
$('#emp_lon_height').scroll(function () {
    UpcomingBirthdayReportList.LoadUpcomingBirthdayReportList()
})
