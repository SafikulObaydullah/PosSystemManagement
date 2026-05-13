//var CounterReportList = {
//    CurrentPage: 1,
//    picker: null,
//    picker2: null,
//    LoaderAjax: null,
//    TotalCount: -1,
//    DownloadCounterReportList: function () {
//        var FromDateTime = $("#ReviewFilterStartDate").val();
//        var ToDateTime = $("#ReviewFilterEndDate").val();
//        var SearchText = $("#SearchText").val();
//        var CounterNum = $("#SalesCounter").val();
//        var parm = '?StartDate=' + FromDateTime
//            + '&EndDate=' + ToDateTime
//            + '&SearchText=' + SearchText
//            + '&CounterNum=' + CounterNum;
//        window.location.href = "/report/counter-download-excel" + parm;
//    },
//    SearchCounterReportList: function () {
//        CounterReportList.CurrentPage = 1;
//        CounterReportList.TotalCount = -1;
//        CounterReportList.LoadCounterReportList();
//    },
//    LoadCounterReportList: function () {
//        if (CounterReportList.LoaderAjax && CounterReportList.LoaderAjax.readyState != 4) {
//            return;
//        }
//        if (CounterReportList.TotalCount == $("tr.data").length) {
//            return;
//        }
//        var SearchText = $("#SearchText").val();
//        var FromDateTime = $("#ReviewFilterStartDate").val();
//        var ToDateTime = $("#ReviewFilterEndDate").val();
//        var CounterNum = $("#SalesCounter").val();
//        var parm = {
//            PageNo: CounterReportList.CurrentPage,
//            SearchText: SearchText,
//            StartDate: FromDateTime,
//            EndDate: ToDateTime,
//            CounterNum: CounterNum,
//        }
//        CounterReportList.LoaderAjax = $.ajax({
//            url: '/report/counter-report-partial',
//            data: parm,
//            cache: false,
//            success: function (data) {

//                if (CounterReportList.CurrentPage == 1) {
//                    $("#load_sales_report_list").html('')
//                    $("#load_sales_report_list").append(data);
//                    CounterReportList.TotalCount = totalcountmerpay;
//                    $("#total_count").text(totalcountmerpay)
//                }
//                else {
//                    $("#load_sales_report_list").append(data);
//                }
//                CounterReportList.CurrentPage++;
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                console.log(errorThrown);
//                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
//            }
//        });


//    }
//}
//$(document).ready(function () {
//    $(".counter_report_height").height(window.innerHeight - 205);
//    CounterReportList.LoadCounterReportList();
//    $("#SearchText").keyup(function () {
//        CounterReportList.SearchCounterReportList();
//    })
//    $("#Search").click(function () {
//        CounterReportList.CurrentPage = 1;
//        CounterReportList.TotalCount = -1;
//        CounterReportList.SearchCounterReportList();
//    });
//    $("#DateRangeRev").change(function () {
//        CounterReportList.SearchCounterReportList();
//    })
//    $("#SalesCounter").change(function () {
//        CounterReportList.SearchCounterReportList();
//    })
//    $("#SearchTextBtn").click(function () {
//        CounterReportList.Reset();
//        CounterReportList.LoadCounterReportList();
//    });
//    $("#SearchText").keyup(function (e) {
//        if (e.keyCode == 13) {
//            CounterReportList.Reset();
//            CounterReportList.LoadCounterReportList();
//        }
//    });

//    $("#reset").click(function () {
//        $("#ReviewFilterStartDate").val("");
//        $("#ReviewFilterEndDate").val("");
//        $("#SearchOrder").val("");
//        $("#SalesCounter").val("-1");
//        $('select').val('-1').change()
//        CounterReportList.Reset();
//        RackStockGrid.LoadCounterReportList();
//    });

//    CounterReportList.picker = new Pikaday({
//        field: document.getElementById('ReviewFilterStartDate'),
//        format: 'MM/DD/YYYY',
//        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
//    });
//    CounterReportList.picker2 = new Pikaday({
//        field: document.getElementById('ReviewFilterEndDate'),
//        format: 'MM/DD/YYYY',
//        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
//    });
//})
//$(window).resize(function () {
//    $(".counter_report_height").height(window.innerHeight - 205);
//});
//$(".counter_report_height").scroll(function () {
//    if (window.innerHeight - 205 + $(".counter_report_height").scrollTop() > $("div.data:last").position().top + 100) {
//        CounterReportList.LoadCounterReportList();
//    }
//});

var CounterReportCustom = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    //InitDate: function () {
    //    $('#DateRangeRev').val(30).change()
    //},
    Initiate: function () {
        CounterReportCustom.CurrentPage = 1;
        CounterReportCustom.TotalCount = -1;
        $(".report_container_tbody").hide()
        $(".report_container_tbody").html('');
        CounterReportCustom.LoadList();
    },
    Print: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var CounterNum = $("#SalesCounter").val();
        var parm = '?StartDate=' + FromDateTime + '&EndDate=' + ToDateTime + '&Searchtext=' + SearchTxt + '&CounterNum=' + CounterNum;
        window.location.href = '/Report/DownloadCounterReport' + parm;
    },
    SearchCounterReportGrid: function () {
        CounterReportCustom.CurrentPage = 1;
        CounterReportCustom.TotalCount = -1;
        $(".report_container_tbody").hide()
        $(".report_container_tbody").html('');
        CounterReportCustom.LoadList();
    },
    LoadList: function () {
        if (CounterReportCustom.LoaderAjax && CounterReportCustom.LoaderAjax.readyState != 4) {
            return;
        }
        if (CounterReportCustom.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var CounterNum = $("#SalesCounter").val();
        console.log("akl");
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: CounterReportCustom.CurrentPage,
            Searchtext: SearchTxt,
            CounterNum: CounterNum
        };
        CounterReportCustom.LoaderAjax = $.ajax({
            type: "post",
            url: '/Report/FilterCounterReport',
            data: paramlite,
            cache: false,
            success: function (data) {
                if (CounterReportCustom.CurrentPage == 1) {
                    $(".report_container_tbody").html(data);
                    CounterReportCustom.TotalCount = totalcountmerpay;
                    $("#total_count").text(totalcountmerpay);
                }
                else {
                    $(".report_container_tbody").append(data);
                }

                $(".report_container_tbody").show();
                $("#revdatefilter").addClass('display_nn');
                CounterReportCustom.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }

        });
    }

}


CounterReportCustom.picker = new Pikaday({
    field: document.getElementById('ReviewFilterStartDate'),
    format: dateformat,
    trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
});
CounterReportCustom.picker2 = new Pikaday({
    field: document.getElementById('ReviewFilterEndDate'),
    format: dateformat,
    trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
});

$(document).ready(function () {
    $(".profit_loss_height").height(window.innerHeight - 205);
    $('#ProductSearchId').select2({
        ajax: {
            url: '/Report/SearchProductFromCompany',
            dataType: 'json',
            // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
            data: function (params) {
                var query = {
                    companyid: params.term,
                    searchtext: params.term,
                    page: params.page || 1
                }
                // Query parameters will be ?search=[term]&type=public
                return query;
            },
            processResults: function (data, params) {
                // Transforms the top-level key of the response object from 'items' to 'results'
                params.page = params.page || 1;
                var daata = JSON.parse(data.data)
                return {
                    results: daata.List,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            delay: 250,
            cache: false,
            placeholder: 'Search for a product',
            minimumInputLength: 1,
            templateResult: formatRepo,
            templateSelection: formatRepoSelection
        }
    });


    CounterReportCustom.SearchCounterReportGrid();

    $("#DateRangeRev").change(function () {
        CounterReportCustom.Initiate();
    });

    $("#SearchText").keydown(function () {
        delay(function () {
            CounterReportCustom.Initiate();
        }, 500);
    });



    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $("#ProductSearchId").val("");
        $('select').val('-1').change();
        CounterReportCustom.Reset();
        CounterReportCustom.LoadList();
    });
    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });
});
$(window).resize(function () {
    $(".profit_loss_height").height(window.innerHeight - 205);
});