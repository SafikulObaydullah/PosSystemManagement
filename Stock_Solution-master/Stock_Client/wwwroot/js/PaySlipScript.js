var amount = 0;


Handlebars.registerHelper("amount", function (dateString) {
    if (dateString == null) {
        return "";
    }
    amount = amount + dateString;
    return dateString == null ? "" : "Tk" + dateString.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
});



var PaySlipList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    searchrider: function () {
        PaySlipList.CurrentPage = 1;
        PaySlipList.TotalCount = -1;
        PaySlipList.LoadPaySlipList();
    },
    LoadPaySlipList: function () {
        console.log('PaySlipScript');
        if (PaySlipList.LoaderAjax && PaySlipList.LoaderAjax.readyState != 4) {
            return;
        }
        if (PaySlipList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var UserId = $("#EmployeeId").val();
        var paramlite = {
            PageNo: PaySlipList.CurrentPage,
            SearchText: SearchText,
            UserId: UserId,
        };
        PaySlipList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Mgmt/PaySlipLiteList',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                amount = 0;
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                PaySlipList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (PaySlipList.CurrentPage == 1) {
                    $(".load_PaySliplist").html(sourceHtml(dataa));
                } else {
                    $(".load_PaySliplist").append(sourceHtml(dataa));
                }
                setTimeout(function () {
                    $(".amount").text(amount == null ? "" : "Tk" + amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                }, 300);
                $(".load_PaySliplist").show();
                $("#revdatefilter").addClass('display_nn');
                PaySlipList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
   
    DownloadPaySlipList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchTxt;
        window.location.href = "/sales/expense-download-excel" + parm;
    },
}

$(document).ready(function () {
    console.log('PaySlipList')
    $(".dropdown-filter").css('right', '139px')
    $("#apply").click(function () {
        PaySlipList.CurrentPage = 1;
        PaySlipList.TotalCount = -1;
        PaySlipList.LoadPaySlipList();
    });

    $("#Search").click(function () {
        PaySlipList.CurrentPage = 1;
        PaySlipList.TotalCount = -1;
        PaySlipList.searchrider();
    });
    $("#SearchText").keyup(function () {
        PaySlipList.CurrentPage = 1;
        PaySlipList.TotalCount = -1;
        PaySlipList.searchrider();
    });

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change();
        PaySlipList.CurrentPage = 1;
        PaySlipList.TotalCount = -1;
        PaySlipList.LoadPaySlipList();

    });

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });
    $("#DateRangeRev").change(function () {
        PaySlipList.searchrider();
    });

    PaySlipList.LoadPaySlipList();
});
$(window).resize(function () {
    $(".product_unit_height").height(window.innerHeight - 205);
});
$(".product_unit_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_unit_height").scrollTop() > $("tr.data:last").position().top) {
        PaySlipList.LoadPaySlipList();
    }
});