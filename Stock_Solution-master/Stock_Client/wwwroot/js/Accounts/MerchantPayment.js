var GetOderListForRequestPayment = function (merchantid) {
    var parm = "?merchantid=" + merchantid;
    OpenTopToBottomModal("/order/request-payment-merchant" + parm);
}

var MarchantPayment = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    LoadPendingList: function () {

        if (MarchantPayment.LoaderAjax && MarchantPayment.LoaderAjax.readyState != 4) {
            return;
        }
        if (MarchantPayment.TotalCount == $("tr.data").length) {
            return;
        }

        var Status = $("#Status").val();
        var FromDateTime = $("#StartDate").val();
        var ToDateTime = $("#EndDate").val();
        var SearchTxt = $("#SearchOrder").val();

        var paramlite = {
            merchantid: $("#Merchant").val(),
            FromDateTime: FromDateTime,
            Status: Status,
            ToDateTime: ToDateTime,
            PageNo: MarchantPayment.CurrentPage,
            Searchkey: SearchTxt,
        };
        MarchantPayment.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Order/MarchantPaymentList',
            data: paramlite,
            dataType: "JSON",
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                MarchantPayment.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#merchant_payment_template").html();
                console.log(data);
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count_mar").text(TotalCount[0].TotalCount)
                if (MarchantPayment.CurrentPage == 1) {
                    $(".load_pending_order_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_pending_order_list_data").append(sourceHtml(dataa));
                }
                $(".load_pending_order_list_data").show();
                MarchantPayment.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    }
}

$(document).ready(function () {
    MarchantPayment.LoadPendingList();
    $("#srch_btn").click(function () {
        MarchantPayment.CurrentPage = 1;
        MarchantPayment.TotalCount = -1;
        MarchantPayment.LoadPendingList();
    });
    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            MarchantPayment.CurrentPage = 1;
            MarchantPayment.TotalCount = -1;
            MarchantPayment.LoadPendingList();
        }
    });
});
$(window).resize(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});