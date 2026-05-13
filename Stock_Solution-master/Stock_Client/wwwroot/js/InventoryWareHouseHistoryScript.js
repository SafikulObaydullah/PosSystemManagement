var isupdate = false;
var InventoryWarehouse = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    LoadPendingList: function () {
        console.log('fd');
        if (InventoryWarehouse.LoaderAjax && InventoryWarehouse.LoaderAjax.readyState != 4) {
            return;
        }
        if (InventoryWarehouse.TotalCount == $("tr.data").length) {
            return;
        }
        var paramlite = {
            ProductID: $("#ProductID").val(),
            PageNo: InventoryWarehouse.CurrentPage,
        };
        InventoryWarehouse.LoaderAjax = $.ajax({
            type: "post",
            url: '/Inventory/InventoryWareHouseGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                isupdate = true;
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                InventoryWarehouse.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#inventorywarehousetemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (InventoryWarehouse.CurrentPage == 1) {
                    $(".load_inventory_warehouse_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_inventory_warehouse_list_data").append(sourceHtml(dataa));
                }
                $(".load_inventory_warehouse_list_data").show();
                InventoryWarehouse.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
}
$(document).ready(function () {
    
    InventoryWarehouse.LoadPendingList();
});
//$(window).resize(function () {
//   // $(".top_to_bottom_height").height(window.innerHeight - 100);
//});
$(".top_to_bottom_height").scroll(function (e) {
    if (window.innerHeight + e.target.scrollTop > $("tr.data:last").position().top + 150) {
        InventoryWarehouse.LoadPendingList();
    }
});
//$('.top_to_bottom_height').scroll(function () {
//    if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
//        InventoryWarehouse.LoadPendingList();
//    }
//});