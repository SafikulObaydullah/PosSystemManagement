var DailyExpensesList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    searchrider: function () {
        DailyExpensesList.CurrentPage = 1;
        DailyExpensesList.TotalCount = -1;
        DailyExpensesList.LoadDailyExpensesList();
    },
    LoadDailyExpensesList: function () {
        if (DailyExpensesList.LoaderAjax && DailyExpensesList.LoaderAjax.readyState != 4) {
            return;
        }
        if (DailyExpensesList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var paramlite = {
            PageNo: DailyExpensesList.CurrentPage,
            SearchText: SearchText,
            StartDate: FromDateTime,
            EndDate: ToDateTime,
        };
        DailyExpensesList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Sales/DailyExpensesList',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                DailyExpensesList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (DailyExpensesList.CurrentPage == 1) {
                    $(".load-expenselist").html(sourceHtml(dataa));
                } else {
                    $(".load-expenselist").append(sourceHtml(dataa));
                }
                $(".load-expenselist").show();
                $("#revdatefilter").addClass('display_nn');
                DailyExpensesList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    //DownloadExpenseList: function () {
    //    var SearchTxt = $("#SearchText").val();
    //    var parm = '?SearchText=' + SearchTxt;
    //    window.location.href = "/sales/expense-download-excel" + parm;
    //},
    Print: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&Searchtext=' + SearchTxt
            ;
        window.location.href = '/sales/DownloadExpenseList' + parm;
    },
    DownloadExpenseList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchText").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchTxt;
        window.location.href = "/sales/expense-download-excel" + parm;
    },
}

var DeleteExpenseConfirmed = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Sales/DeleteExpensesrow",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message, "");
                DailyExpensesList.CurrentPage = 1;
                DailyExpensesList.TotalCount = -1;
                DailyExpensesList.LoadDailyExpensesList();
            }
        });
    });
}

var UpdateExpensesrow = function (id) {
    var url = "/sales/new-expensesrow-add";
    $(".grid-list-exc-page").hide();
    OpenRightToLeftModal("/sales/new-expensesrow-add?id=" + id);
}

$(document).ready(function () {
    $(".dropdown-filter").css('right', '139px')
    $('#btn-add-expense').click(function () {
        var url = "/sales/new-expensesrow-add";
        $(".grid-list-exc-page").hide();
        OpenRightToLeftModal("/sales/new-expensesrow-add");
    });
    $("#apply").click(function () {
        DailyExpensesList.CurrentPage = 1;
        DailyExpensesList.TotalCount = -1;
        DailyExpensesList.LoadDailyExpensesList();
    });
   
    $("#Search").click(function () {
        DailyExpensesList.CurrentPage = 1;
        DailyExpensesList.TotalCount = -1;
        DailyExpensesList.searchrider();
    });
    $("#SearchText").keyup(function () {
        DailyExpensesList.CurrentPage = 1;
        DailyExpensesList.TotalCount = -1;
        DailyExpensesList.searchrider();
    });
  
    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change();
        DailyExpensesList.CurrentPage = 1;
        DailyExpensesList.TotalCount = -1;
        DailyExpensesList.LoadDailyExpensesList();

    });

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });
    $("#DateRangeRev").change(function () {
        DailyExpensesList.searchrider();
    });
    DailyExpensesList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: dateformat,
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    DailyExpensesList.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: dateformat,
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });
    DailyExpensesList.LoadDailyExpensesList();
});
$(window).resize(function () {
    $(".product_unit_height").height(window.innerHeight - 205);
});
$(".product_unit_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_unit_height").scrollTop() > $("tr.data:last").position().top) {
        DailyExpensesList.LoadDailyExpensesList();
    }
});