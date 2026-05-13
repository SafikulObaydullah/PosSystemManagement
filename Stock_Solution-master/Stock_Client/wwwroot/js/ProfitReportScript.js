//var ProfitReportList = {
//    CurrentPage: 1,
//    picker: null,
//    picker2: null,
//    LoaderAjax: null,
//    TotalCount: -1,
//    DeleteMerchantAccount: function (id) {
//        OpenConfirmationMessageNew("", "Are you sure?", function () {
//            confirmdeleteMerchantAccount(id);
//        });
//    },
//    DownloadProfitReportList: function () {
//        var FromDateTime = $("#ReviewFilterStartDate").val();
//        var ToDateTime = $("#ReviewFilterEndDate").val();
//        var SearchText = $("#SearchText").val();
//        var parm = '?StartDate=' + FromDateTime
//            + '&EndDate=' + ToDateTime
//            + '&SearchText=' + SearchText;
//        window.location.href = "/report/profit-download-excel" + parm;
//    },
//    SearchProfitReportList: function () {
//        ProfitReportList.CurrentPage = 1;
//        ProfitReportList.TotalCount = -1;
//        ProfitReportList.LoadProfitReportList();
//    },
//    LoadProfitReportList: function () {
//        if (ProfitReportList.LoaderAjax && ProfitReportList.LoaderAjax.readyState != 4) {
//            return;
//        }
//        if (ProfitReportList.TotalCount == $("div.data").length) {
//            return;
//        }
//        var SearchText = $("#SearchText").val();
//        var FromDateTime = $("#ReviewFilterStartDate").val();
//        var ToDateTime = $("#ReviewFilterEndDate").val();
//        var parm = {
//            PageNo: ProfitReportList.CurrentPage,
//            SearchText: SearchText,
//            StartDate: FromDateTime,
//            EndDate: ToDateTime,
//        }
//        ProfitReportList.LoaderAjax = $.ajax({
//            url: '/report/profit-report',
//            data: parm,
//            cache: false,
//            success: function (data) {

//                if (ProfitReportList.CurrentPage == 1) {
//                    $("#load_profit_report_list").html('')
//                    $("#load_profit_report_list").append(data);
//                    ProfitReportList.TotalCount = totalcountmerpay;
//                    $("#total_count").text(totalcountmerpay)
//                }
//                else {
//                    $("#load_profit_report_list").append(data);
//                }
//                $("#revdatefilter").addClass('display_nn');
//                ProfitReportList.CurrentPage++;
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                console.log(errorThrown);
//                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
//            }
//        });
//    }
//}
//$(document).ready(function () {
//    $(".profit_report_height").height(window.innerHeight - 205);
//    ProfitReportList.LoadProfitReportList();
//    $("#SearchText").keyup(function () {
//        ProfitReportList.SearchProfitReportList();
//    })
//    $("#Search").click(function () {
//        ProfitReportList.CurrentPage = 1;
//        ProfitReportList.TotalCount = -1;
//        ProfitReportList.SearchProfitReportList();
//    });
//    $("#DateRangeRev").change(function () {
//        ProfitReportList.SearchProfitReportList();
//    })
//    $("#SearchTextBtn").click(function () {
//        ProfitReportList.Reset();
//        ProfitReportList.LoadProfitReportList();
//    });
//    $("#SearchText").keyup(function (e) {
//        if (e.keyCode == 13) {
//            ProfitReportList.Reset();
//            ProfitReportList.LoadProfitReportList();
//        }
//    });

//    $("#reset").click(function () {
//        $("#ReviewFilterStartDate").val("");
//        $("#ReviewFilterEndDate").val("");
//        $("#SearchText").val("");
//        $('select').val('-1').change()
//        ProfitReportList.Reset();
//        ProfitReportList.LoadProfitReportList();
//    });
//    ProfitReportList.picker = new Pikaday({
//        field: document.getElementById('ReviewFilterStartDate'),

//        format: 'MM/DD/YYYY',
//        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
//    });
//    ProfitReportList.picker2 = new Pikaday({
//        field: document.getElementById('ReviewFilterEndDate'),
//        format: 'MM/DD/YYYY',
//        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
//    });
//})
//$(window).resize(function () {
//   $(".profit_report_height").height(window.innerHeight - 205);
//});

//$(".profit_report_height").scroll(function () {
//    if (window.innerHeight - 205 + $(".profit_report_height").scrollTop() > $("div.data:last").position().top + 100) {
//        ProfitReportList.LoadProfitReportList();
//    }
//});






var ProfitReportCustom = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    //InitDate: function () {
    //    $('#DateRangeRev').val(30).change()
    //},
    Initiate: function () {
        ProfitReportCustom.CurrentPage = 1;
        ProfitReportCustom.TotalCount = -1;
        $(".report_container_tbody").hide()
        $(".report_container_tbody").html('');
        ProfitReportCustom.LoadList();
    },
    Print: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var Products = $("#ProductSearchId").val();
        var parm = '?StartDate=' + FromDateTime + '&EndDate=' + ToDateTime + '&Searchtext=' + SearchTxt + '&Products=' + Products;
        window.location.href = '/Report/DownloadProfitReport' + parm;
    },
    SearchProfitReportGrid: function () {
        ProfitReportCustom.CurrentPage = 1;
        ProfitReportCustom.TotalCount = -1;
        $(".report_container_tbody").hide()
        $(".report_container_tbody").html('');
        ProfitReportCustom.LoadList();
    },
    LoadList: function () {
        if (ProfitReportCustom.LoaderAjax && ProfitReportCustom.LoaderAjax.readyState != 4) {
            return;
        }
        if (ProfitReportCustom.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var Products = $("#ProductSearchId").val();
        console.log("akl");
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: ProfitReportCustom.CurrentPage,
            Searchtext: SearchTxt,
            ProductName: Products
        };
        ProfitReportCustom.LoaderAjax = $.ajax({
            type: "post",
            url: '/Report/FilterProfitReport',
            data: paramlite,
            cache: false,
            success: function (data) {
                if (ProfitReportCustom.CurrentPage == 1) {
                    $(".report_container_tbody").html(data);
                    ProfitReportCustom.TotalCount = totalcountmerpay;
                    $("#total_count").text(totalcountmerpay);
                }
                else {
                    $(".report_container_tbody").append(data);
                }

                $(".report_container_tbody").show();
                $("#revdatefilter").addClass('display_nn');
                ProfitReportCustom.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }

        });
    }

}


ProfitReportCustom.picker = new Pikaday({
    field: document.getElementById('ReviewFilterStartDate'),
    format: dateformat,
    trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
});
ProfitReportCustom.picker2 = new Pikaday({
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


    ProfitReportCustom.SearchProfitReportGrid();

    $("#DateRangeRev").change(function () {
        ProfitReportCustom.Initiate();
    });

    $("#SearchText").keydown(function () {
        delay(function () {
            ProfitReportCustom.Initiate();
        }, 500);
    });

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $("#ProductSearchId").val("");
        $('select').val('-1').change()
        ProfitReportCustom.Reset();
        ProfitReportCustom.LoadList();
    });
    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });

    //$("#reset").click(function () {
    //    $("#ReviewFilterStartDate").val("");
    //    $("#ReviewFilterEndDate").val("");
    //    $("#SearchText").val("");
    //    $("#ProductSearchId").val("");
    //    $('select').val('-1');
    //    ProfitReportCustom.Reset();
    //    ProfitReportCustom.LoadList();
    //});
    //$("#reset-date").click(function () {
    //    $('#datepicker').val("").datepicker("update");
    //});
});
$(window).resize(function () {
    $(".profit_loss_height").height(window.innerHeight - 205);
});