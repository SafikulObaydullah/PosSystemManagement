var RackStockGrid = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    LoadPendingList: function () {
        if (RackStockGrid.LoaderAjax && RackStockGrid.LoaderAjax.readyState != 4) {
            return;
        }
        if (RackStockGrid.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#StartDate").val();
        var ToDateTime = $("#EndDate").val();
        var SearchTxt = $("#SearchOrder").val();

        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: RackStockGrid.CurrentPage,
            Searchtext: SearchTxt,
        };
        RackStockGrid.LoaderAjax = $.ajax({
            type: "post",
            url: '/Product/ProductRackStockGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                RackStockGrid.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#rackstocktemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (RackStockGrid.CurrentPage == 1) {
                    $(".load_rack_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_rack_list_data").append(sourceHtml(dataa));
                }
                $(".load_rack_list_data").show();
                RackStockGrid.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadPendingList: function () {
        if (RackStockGrid.LoaderAjax && RackStockGrid.LoaderAjax.readyState != 4) {
            return;
        }
        if (RackStockGrid.TotalCount == $("tr.data").length) {
            return;
        }
        var Status = $("#Status").val();
        var FromDateTime = $("#StartDate").val();
        var ToDateTime = $("#EndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var paramlite = "?merchantid=" + $("#Merchant").val()
            + "&FromDateTime=" + FromDateTime
            + "&Status=" + Status
            + "&ToDateTime=" + ToDateTime
            + "&PageNo=" + RackStockGrid.CurrentPage
            + "&SearchText=" + SearchTxt;
        window.location.href = "/order/order-download-excel" + paramlite;
    }
}
$(document).ready(function () {
    RackStockGrid.LoadPendingList();
    $("#Search").click(function () {
        RackStockGrid.CurrentPage = 1;
        RackStockGrid.TotalCount = -1;
        RackStockGrid.LoadPendingList();
    });
    $(".print_sel_ord").change(function () {
        if ($(".print_sel_ord").is(':checked')) {
            $(".print_ord").prop('checked', true)
        } else {
            $(".print_ord").prop('checked', false)
        }
    });
    $("#srch_btn").click(function () {
        RackStockGrid.CurrentPage = 1;
        RackStockGrid.TotalCount = -1;
        RackStockGrid.LoadPendingList();
    });
    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            RackStockGrid.CurrentPage = 1;
            RackStockGrid.TotalCount = -1;
            RackStockGrid.LoadPendingList();
        }
    });

    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchOrder").val("");
        RackStockGrid.CurrentPage = 1;
        RackStockGrid.TotalCount = -1;
        RackStockGrid.LoadPendingList();
    });

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });

    RackStockGrid.picker = new Pikaday({
        field: document.getElementById('StartDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    RackStockGrid.picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });

});
$(window).resize(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});
$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
        RackStockGrid.LoadPendingList();
    }
});