var PendingOrder = {
    CurrentPage: 1,
    picker:null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    LoadPendingList: function () {

        if (PendingOrder.LoaderAjax && PendingOrder.LoaderAjax.readyState != 4) {
            //PendingOrder.LoaderAjax.abort();
            return;
        }
        if (PendingOrder.TotalCount == $("tr.data").length) {
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
            PageNo: PendingOrder.CurrentPage,
            SearchText: SearchTxt,
        };
        PendingOrder.LoaderAjax= $.ajax({
            type: "POST",
            url: '/order/Pending-order-Search-lite',
            data: paramlite,
            dataType: "JSON",
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                PendingOrder.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#hbTemplate").html();
                console.log(data);
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (PendingOrder.CurrentPage == 1) {
                    $(".load_pending_order_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_pending_order_list_data").append(sourceHtml(dataa));
                }
                
                $(".load_pending_order_list_data").show();
                PendingOrder.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    }
}

$(document).ready(function () {
    $("#Merchant").select2();
    PendingOrder.LoadPendingList();

    $("#Search").click(function () {
        PendingOrder.CurrentPage = 1;
        PendingOrder.TotalCount = -1;
        PendingOrder.LoadPendingList();
    });
    $("#Status").change(function () {
        PendingOrder.CurrentPage = 1;
        PendingOrder.TotalCount = -1;
        PendingOrder.LoadPendingList();
    });
    $("#srch_btn").click(function () {
        PendingOrder.CurrentPage = 1;
        PendingOrder.TotalCount = -1;
        PendingOrder.LoadPendingList();
    });
    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            PendingOrder.CurrentPage = 1;
            PendingOrder.TotalCount = -1;
            PendingOrder.LoadPendingList();
        }
    });

    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#Merchant").val("");
        $("#Status").val("");
        PendingOrder.CurrentPage = 1;
        PendingOrder.TotalCount = -1;
    });
    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });

    PendingOrder.picker = new Pikaday({
        field: document.getElementById('StartDate'),
        
        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    PendingOrder.picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });
   
});
$(window).resize(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});
$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
        PendingOrder.LoadPendingList();
    }
});
