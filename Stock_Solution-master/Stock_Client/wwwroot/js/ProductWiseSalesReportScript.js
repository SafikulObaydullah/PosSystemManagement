var ProductWiseSalesReportList = {
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
    DownloadProductWiseSalesReportList: function () {
        window.location.href = "/report/sales-download-excel";
    },
    SearchProductWiseSalesReportList: function () {
        ProductWiseSalesReportList.CurrentPage = 1;
        ProductWiseSalesReportList.TotalCount = -1;
        ProductWiseSalesReportList.LoadProductWiseSalesReportList();
    },
    LoadProductWiseSalesReportList: function () {
        if (ProductWiseSalesReportList.LoaderAjax && ProductWiseSalesReportList.LoaderAjax.readyState != 4) {
            return;
        }
        if (ProductWiseSalesReportList.TotalCount == $("div.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var parm = {
            PageNo: ProductWiseSalesReportList.CurrentPage,
            SearchText: SearchText,
            StartDate: FromDateTime,
            EndDate: ToDateTime,
        }
        ProductWiseSalesReportList.LoaderAjax = $.ajax({
            url: '/report/productwisesales-report',
            data: parm,
            cache: false,
            success: function (data) {

                if (ProductWiseSalesReportList.CurrentPage == 1) {
                    $("#load_productwisesales_report_list").html('')
                    $("#load_productwisesales_report_list").append(data);
                    ProductWiseSalesReportList.TotalCount = totalcountmerpay;
                    $("#total_count").text(totalcountmerpay)
                }
                else {
                    $("#load_productwisesales_report_list").append(data);
                }
                ProductWiseSalesReportList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    }
}
PropertyProductSuggestiontemplate =
    '<div class="tt-suggestion tt-selectable" data-select="{1}"  onclick="SuggestionAddProduct({0},event, this)">'
    + "<p class='tt-sug-text'>"
    + "<em class='tt-sug-type'></em>{1}"
    + "<br />"
    + "</p> "
    + "</div>";
var SuggestionAddProduct = function (id, e, item) {
    $('.search2.tt-menu').hide();
}
SearchProductPOSLONG = function (item) {
    var inputrow = $(item).parent().parent();
    if ($(item).val() != "") {
        $.ajax({
            url: "/Product/SearchProductForOrderRow",
            type: 'post',
            data: {
                Searchtext: $(item).val(),
            },
            success: function (data) {
                console.log(data)
                if (data.result != "") {
                    var resultparse = JSON.parse(data.result);
                    if (resultparse.length > 0) {
                        var searchresultstring = "<div class='NewProjectSuggestion'>";
                        for (var i = 0; i < resultparse.length; i++) {
                            searchresultstring = searchresultstring + jQuery.validator.format(PropertyProductSuggestiontemplate,
                        /*0*/resultparse[i].Id,
                        /*1*/ resultparse[i].Name.replaceAll('"', '\'\''));
                        }
                        searchresultstring += "</div>";
                        var ttdom = $($(item).parent()).find('.tt-menu');
                        var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                        $(ttdomComplete).html(searchresultstring);
                        $(ttdom).show();
                        InvoiceProductSuggestionClickbind(item)
                        if (resultparse.length > 4) {
                            $(".NewProjectSuggestion").height(352);
                            $(".NewProjectSuggestion").css('position', 'relative');
                        }
                    }
                    if (resultparse.length == 0)
                        $('.tt-menu').hide();
                }
            }
        });
    }
}
//var PosProductSuggestionClickbind = function (item) {
//    $('.product-table .tt-suggestion').click(function () {
//        var clickitem = this;
//        $('.product-table .tt-menu').hide();
//        var olditm = item;
//        $(item).val($(clickitem).attr('data-select'));
//        $(item).attr('data-id', $(clickitem).attr('data-id'));
//        var itemName = $(item).parent().find('span');
//        $(itemName).text($(item).val());
//    });
//    $('.product-table .tt-suggestion').hover(function () {
//        var clickitem = this;
//        $('.tt-suggestion').removeClass("active");
//        $(clickitem).addClass('active');
//    });
//}
$(document).ready(function () {
    ProductWiseSalesReportList.LoadProductWiseSalesReportList();
    $("#SearchText").keyup(function () {
        ProductWiseSalesReportList.SearchProductWiseSalesReportList();
    })
    $("#Search").click(function () {
        ProductWiseSalesReportList.CurrentPage = 1;
        ProductWiseSalesReportList.TotalCount = -1;
        ProductWiseSalesReportList.SearchProductWiseSalesReportList();
    });
    $("#DateRangeRev").change(function () {
        ProductWiseSalesReportList.SearchProductWiseSalesReportList();
    })
    $("#SearchTextBtn").click(function () {
        ProductWiseSalesReportList.Reset();
        ProductWiseSalesReportList.LoadProductWiseSalesReportList();
    });
    $("#SearchText").keyup(function (e) {
        if (e.keyCode == 13) {
            ProductWiseSalesReportList.Reset();
            ProductWiseSalesReportList.LoadProductWiseSalesReportList();
        }
    });

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change()
        ProductWiseSalesReportList.Reset();
        ProductWiseSalesReportList.LoadProductWiseSalesReportList();
    });

    ProductWiseSalesReportList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),

        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    ProductWiseSalesReportList.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });
})
$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("div.data:last").position().top + 100) {
        ProductWiseSalesReportList.LoadProductWiseSalesReportList();
    }
});