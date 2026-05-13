var ProductCategoryList = {
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
        ProductCategoryList.CurrentPage = 1;
        ProductCategoryList.TotalCount = -1;
        ProductCategoryList.LoadProductCategoryList();
    },
    LoadProductCategoryList: function () {
        if (ProductCategoryList.LoaderAjax && ProductCategoryList.LoaderAjax.readyState != 4) {
            return;
        }
        if (ProductCategoryList.TotalCount == $("tr.data").length) {
            return;
        }

        var SearchText = $("#SearchText").val();
        //var SearchText ="";
        //var FromDateTime = $("#StartDate").val();
        //var ToDateTime = $("#EndDate").val();

        var paramlite = {

            PageNo: ProductCategoryList.CurrentPage,
            SearchText: SearchText,
        };
        ProductCategoryList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Product/ProductcategorieListLite',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                ProductCategoryList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                if (ProductCategoryList.CurrentPage == 1) {
                    $("#total_count").text(TotalCount[0].TotalCount)
                    $(".LoadProductlist").html(sourceHtml(dataa));
                } else {
                    $(".LoadProductlist").append(sourceHtml(dataa));
                }
                $(".LoadProductlist").show();

                ProductCategoryList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadcategoryList: function () {
        var SearchTxt = $("#SearchText").val();
        var parm = '?SearchText=' + SearchTxt;
        window.location.href = "/inventory/category-download-excel" + parm;
    },
    
};
//var DeleteCategoryConfirmed = function (id) {
//    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
//        $.ajax({
//            type: 'GET',
//            url: "/Product/DeleteProductcategorie?id=" + id,
//            dataType: "json",
//            success: function (data) {
//                console.log(data);
//                if (data.result == true)
//                    OpenSuccessMessageNew("Success!", data.message, "");
//                ProductCategoryList.CurrentPage = 1;
//                ProductCategoryList.TotalCount = -1;
//                ProductCategoryList.LoadProductCategoryList();
//            }
//        });
//    });
//}
var DeleteMerchantAccConfirmed = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Product/DeleteProductcategorie",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message, "");
                ProductCategoryList.CurrentPage = 1;
                ProductCategoryList.TotalCount = -1;
                ProductCategoryList.LoadProductCategoryList();
            }
        });
    });
}
var UpdateProductcategorie = function (id) {
    var url = "/Productcategorie/add";
    $(".grid-list-exc-page").hide();
    OpenRightToLeftModal("/Productcategorie/add?id=" + id);
}

$(document).ready(function () {
    $(".product_cat_height").height(window.innerHeight - 205);
    ProductCategoryList.picker = new Pikaday({
        field: document.getElementById('StartDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    ProductCategoryList.picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });
    $("#Search").click(function () {
        ProductCategoryList.CurrentPage = 1;
        ProductCategoryList.TotalCount = -1;
        ProductCategoryList.searchrider();
    });
    $("#SearchText").keyup(function () {
        ProductCategoryList.CurrentPage = 1;
        ProductCategoryList.TotalCount = -1;
        ProductCategoryList.searchrider();
    });
    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change()
        ProductCategoryList.CurrentPage = 1;
        ProductCategoryList.TotalCount = -1;
    });
    ProductCategoryList.LoadProductCategoryList();
});
$(window).resize(function () {
    $(".product_cat_height").height(window.innerHeight - 205);
});
$(".product_cat_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_cat_height").scrollTop() > $("tr.data:last").position().top) {
        ProductCategoryList.LoadProductCategoryList();
    }
});