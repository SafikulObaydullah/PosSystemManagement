var PurchaseOperation = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    LoadPendingList: function () {
        if (PurchaseOperation.LoaderAjax && PurchaseOperation.LoaderAjax.readyState != 4) {
            return;
        }
        if (PurchaseOperation.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var category = $("#Category").val();
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: PurchaseOperation.CurrentPage,
            Searchtext: SearchTxt,
            CategoryName: category,
        };
        PurchaseOperation.LoaderAjax = $.ajax({
            type: "post",
            url: '/Inventory/InventoryGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                console.table(dataa)
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                PurchaseOperation.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#inventorytemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (PurchaseOperation.CurrentPage == 1) {
                    $(".load_inventory_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_inventory_list_data").append(sourceHtml(dataa));
                }
                $(".load_inventory_list_data").show();
                $("#revdatefilter").addClass('display_nn');
                PurchaseOperation.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    UpdateProduct: function (id) {
        OpenTopToBottomModal("/Product/add?id=" + id);
    },

    DownloadPurchaseList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var category = $("#Category").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&Searchtext=' + SearchTxt
            + '&CategoryName=' + category;
        window.location.href = "/inventory/purchase-download-excel" + parm;
    },
    SearchPurchaseList: function () {
        PurchaseOperation.CurrentPage = 1;
        PurchaseOperation.TotalCount = -1;
        PurchaseOperation.LoadPendingList();
    },
}
//var UpdateProduct = function (id) {
//    var url = "/Productform/add";
//    $(".grid-list-exc-page").hide();
//    OpenTopToBottomModal("/Product/add?id=" + id);
//}
var DeletePurchchasedProductConfirmed = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Inventory/DeleteWarehouseInventory",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                if (data.result == true)
                    OpenSuccessMessageNew("Success!", data.message, "");
                PurchaseOperation.CurrentPage = 1;
                PurchaseOperation.TotalCount = -1;
                PurchaseOperation.LoadPendingList();
            }
        });
    });
}
$(document).ready(function () {
    $(".pur_ope_height").height(window.innerHeight - 205);
    PurchaseOperation.LoadPendingList();
    $("#apply").click(function () {
        PurchaseOperation.CurrentPage = 1;
        PurchaseOperation.TotalCount = -1;
        PurchaseOperation.LoadPendingList();
    });
    $(".print_sel_ord").change(function () {
        if ($(".print_sel_ord").is(':checked')) {
            $(".print_ord").prop('checked', true)
        } else {
            $(".print_ord").prop('checked', false)
        }
    });
    //$("#srch_btn").click(function () {
    //    PurchaseOperation.CurrentPage = 1;
    //    PurchaseOperation.TotalCount = -1;
    //    PurchaseOperation.LoadPendingList();
    //});
    $("#srch_btn").click(function () {
        PurchaseOperation.Reset();
        PurchaseOperation.SearchPurchaseList();
    });
    $("#SearchOrder").keyup(function () {
        PurchaseOperation.SearchPurchaseList();
    })

    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            PurchaseOperation.Reset();
            PurchaseOperation.SearchPurchaseList();
        }
    });
  
    $("#Category").change(function () {
        PurchaseOperation.Reset();
        PurchaseOperation.LoadPendingList();
    });

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchOrder").val("");
        $("#Category").val("-1");
        $('select').val('-1').change();
        PurchaseOperation.CurrentPage = 1;
        PurchaseOperation.TotalCount = -1;
        PurchaseOperation.LoadPendingList();
        
    });

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });
    $("#DateRangeRev").change(function () {
        PurchaseOperation.SearchPurchaseList();
    });
    PurchaseOperation.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: dateformat,
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    PurchaseOperation.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: dateformat,
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });

});
$(window).resize(function () {
    $(".pur_ope_height").height(window.innerHeight - 205);
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});
$(".pur_ope_height").scroll(function () {
    if (window.innerHeight - 205 + $(".pur_ope_height").scrollTop() > $("tr.data:last").position().top) {
        PurchaseOperation.LoadPendingList();
    }
});