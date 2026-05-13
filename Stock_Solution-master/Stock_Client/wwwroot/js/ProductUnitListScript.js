var MerchantAccountList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,

    //DeleteMerchantAccount: function (id) {
    //    OpenConfirmationMessageNew("", "Are you sure?", function () {
    //        confirmdeleteMerchantAccount(id);
    //    });
    //},
    searchrider: function () {
        MerchantAccountList.CurrentPage = 1;
        MerchantAccountList.TotalCount = -1;
        MerchantAccountList.LoadMerchantAccountList();
    },
    LoadMerchantAccountList: function () {
        if (MerchantAccountList.LoaderAjax && MerchantAccountList.LoaderAjax.readyState != 4) {
            return;
        }
        if (MerchantAccountList.TotalCount == $("tr.data").length) {
            return;
        }

        var SearchText = $("#SearchText").val();
        //var SearchText ="";
        //var FromDateTime = $("#StartDate").val();
        //var ToDateTime = $("#EndDate").val();

        var paramlite = {

            PageNo: MerchantAccountList.CurrentPage,
            SearchText: SearchText,
        };
        MerchantAccountList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Product/ProductUnitListLite',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                MerchantAccountList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (MerchantAccountList.CurrentPage == 1) {
                    $(".load-merchantlist").html(sourceHtml(dataa));
                } else {
                    $(".load-merchantlist").append(sourceHtml(dataa));
                }
                $(".load-merchantlist").show();

                MerchantAccountList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadunitList: function () {
        var SearchTxt = $("#SearchText").val();
        var parm = '?SearchText=' + SearchTxt;
        window.location.href = "/inventory/unit-download-excel" + parm;
    },
}

var DeleteProductUnitConfirmed = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Product/DeleteProductUnit",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message, "");
                MerchantAccountList.CurrentPage = 1;
                MerchantAccountList.TotalCount = -1;
                MerchantAccountList.LoadMerchantAccountList();
            }
        });
    });
}

var UpdateProductUnit = function (id) {
    var url = "/product/new-productunit-add";
    $(".grid-list-exc-page").hide();
    OpenRightToLeftModal("/product/new-productunit-add?id=" + id);
}

$(document).ready(function () {
    $(".product_unit_height").height(window.innerHeight - 205);
    MerchantAccountList.picker = new Pikaday({
        field: document.getElementById('StartDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    MerchantAccountList.picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });
    $("#Search").click(function () {
        MerchantAccountList.CurrentPage = 1;
        MerchantAccountList.TotalCount = -1;
        MerchantAccountList.searchrider();
    });
    $("#SearchText").keyup(function () {
        MerchantAccountList.CurrentPage = 1;
        MerchantAccountList.TotalCount = -1;
        MerchantAccountList.searchrider();
    });
    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change()
        MerchantAccountList.CurrentPage = 1;
        MerchantAccountList.TotalCount = -1;
    });

    MerchantAccountList.LoadMerchantAccountList();
});
$(window).resize(function () {
    $(".product_unit_height").height(window.innerHeight - 205);
});
$(".product_unit_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_unit_height").scrollTop() > $("tr.data:last").position().top) {
        MerchantAccountList.LoadMerchantAccountList();
    }
});