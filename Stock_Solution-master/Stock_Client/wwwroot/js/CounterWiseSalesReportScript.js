var CounterWiseSalesReportList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteMerchantAccount: function (id) {
        OpenConfirmationMessageNew("", "Are you sure?", function () {
            confirmdeleteMerchantAccount(id);
        });
    },
    DownloadCounterWiseSalesReportList: function () {
        window.location.href = "/report/sales-download-excel";
    },
    SearchCounterWiseSalesReportList: function () {
        CounterWiseSalesReportList.CurrentPage = 1;
        CounterWiseSalesReportList.TotalCount = -1;
        CounterWiseSalesReportList.LoadCounterWiseSalesReportList();
    },
    LoadCounterWiseSalesReportList: function () {
        if (CounterWiseSalesReportList.LoaderAjax && CounterWiseSalesReportList.LoaderAjax.readyState != 4) {
            return;
        }
        if (CounterWiseSalesReportList.TotalCount == $("div.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var parm = {
            PageNo: CounterWiseSalesReportList.CurrentPage,
            SearchText: SearchText,
            StartDate: FromDateTime,
            EndDate: ToDateTime,
        }
        CounterWiseSalesReportList.LoaderAjax = $.ajax({
            url: '/report/counterwisesales-report',
            data: parm,
            cache: false,
            success: function (data) {

                if (CounterWiseSalesReportList.CurrentPage == 1) {
                    $("#load_counterwisesales_report_list").html('')
                    $("#load_counterwisesales_report_list").append(data);
                    CounterWiseSalesReportList.TotalCount = totalcountmerpay;
                    $("#total_count").text(totalcountmerpay)
                }
                else {
                    $("#load_counterwisesales_report_list").append(data);
                }
                CounterWiseSalesReportList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });


    }
}
$(document).ready(function () {
    CounterWiseSalesReportList.LoadCounterWiseSalesReportList();
    $("#SearchText").keyup(function () {
        CounterWiseSalesReportList.SearchCounterWiseSalesReportList();
    })
    $("#Search").click(function () {
        CounterWiseSalesReportList.CurrentPage = 1;
        CounterWiseSalesReportList.TotalCount = -1;
        CounterWiseSalesReportList.SearchCounterWiseSalesReportList();
    });
    $("#DateRangeRev").change(function () {
        CounterWiseSalesReportList.SearchCounterWiseSalesReportList();
    })
    $("#SearchTextBtn").click(function () {
        CounterWiseSalesReportList.Reset();
        CounterWiseSalesReportList.LoadCounterWiseSalesReportList();
    });
    $("#SearchText").keyup(function (e) {
        if (e.keyCode == 13) {
            CounterWiseSalesReportList.Reset();
            CounterWiseSalesReportList.LoadCounterWiseSalesReportList();
        }
    });

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change()
        CounterWiseSalesReportList.Reset();
        CounterWiseSalesReportList.LoadCounterWiseSalesReportList();
    });

    CounterWiseSalesReportList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),

        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    CounterWiseSalesReportList.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });
})
$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("div.data:last").position().top + 100) {
        CounterWiseSalesReportList.LoadCounterWiseSalesReportList();
    }
});