var SalaryList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    searchrider: function () {
        SalaryList.CurrentPage = 1;
        SalaryList.TotalCount = -1;
        SalaryList.LoadSalaryList();
    },
    LoadSalaryList: function () {
        console.log('PaySlipScript');
        if (SalaryList.LoaderAjax && SalaryList.LoaderAjax.readyState != 4) {
            return;
        }
        if (SalaryList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var UserId = $("#EmployeeId").val();
        var paramlite = {
            PageNo: SalaryList.CurrentPage,
            SearchText: SearchText,
            UserId: UserId,
        };
        SalaryList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Mgmt/SalaryLiteList',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                SalaryList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (SalaryList.CurrentPage == 1) {
                    $(".load_SalaryList").html(sourceHtml(dataa));
                } else {
                    $(".load_SalaryList").append(sourceHtml(dataa));
                }
                $(".load_SalaryList").show();
                $("#revdatefilter").addClass('display_nn');
                SalaryList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },

    DownloadSalaryList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchTxt;
        window.location.href = "/sales/expense-download-excel" + parm;
    },
}
var Updatesalaryemp = function (id) {
    var url = "/employee-HR";
    $(".grid-list-exc-page").hide();
    OpenTopToBottomModal("/employee-HR?id=" + id);
}
//var DownloadPaySlipSingle = function (idd) {
//        OpenConfirmationMessageNew('Warning!', 'Are you sure?', function () {
//            var parm = '?isall=false' + '&payslipid=' + idd + '&uid=' + $('#EmployeeId').val();
//            window.location.href = '/Mgmt/PrintPaySlip' + parm;
//        })
//    }
$(document).ready(function () {
    console.log('SalaryList')
    $(".dropdown-filter").css('right', '139px')
    $("#apply").click(function () {
        SalaryList.CurrentPage = 1;
        SalaryList.TotalCount = -1;
        SalaryList.LoadSalaryList();
    });

    $("#Search").click(function () {
        SalaryList.CurrentPage = 1;
        SalaryList.TotalCount = -1;
        SalaryList.searchrider();
    });
    $("#SearchText").keyup(function () {
        SalaryList.CurrentPage = 1;
        SalaryList.TotalCount = -1;
        SalaryList.searchrider();
    });

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change();
        SalaryList.CurrentPage = 1;
        SalaryList.TotalCount = -1;
        SalaryList.LoadSalaryList();

    });

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });
    $("#DateRangeRev").change(function () {
        SalaryList.searchrider();
    });

    SalaryList.LoadSalaryList();
});
$(window).resize(function () {
    $(".product_unit_height").height(window.innerHeight - 205);
});
$(".product_unit_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_unit_height").scrollTop() > $("tr.data:last").position().top) {
        SalaryList.LoadSalaryList();
    }
});