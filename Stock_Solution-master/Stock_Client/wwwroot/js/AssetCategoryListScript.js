var AssetCategoryList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteAssetCategoryList: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Product/DeleteAssetCategory",
                data: { id: id },
                success: function (data) {
                    AssetCategoryList.searchrider();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    } a
                }
            });
        });
    },
    GetAssetCategoryById: function (id) {
        OpenRightToLeftModal('/assets/add-asset-category?id=' + id)
    },
    searchrider: function () {
        AssetCategoryList.CurrentPage = 1;
        AssetCategoryList.TotalCount = -1;
        AssetCategoryList.LoadAssetCategoryList();
    },
    LoadAssetCategoryList: function () {
        if (AssetCategoryList.LoaderAjax && AssetCategoryList.LoaderAjax.readyState != 4) {
            return;
        }
        if (AssetCategoryList.TotalCount == $("tr.data").length) {
            return;
        }

        var SearchText = $("#SearchText").val();
        //var SearchText ="";
        //var FromDateTime = $("#StartDate").val();
        //var ToDateTime = $("#EndDate").val();

        var paramlite = {
            PageNo: AssetCategoryList.CurrentPage,
            SearchText: SearchText,
        };
        AssetCategoryList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Product/AssetCategoryListLite',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                AssetCategoryList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#AsTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                if (AssetCategoryList.CurrentPage == 1) {
                    $("#total_count").text(TotalCount[0].TotalCount)
                    $(".LoadAssetlist").html(sourceHtml(dataa));
                } else {
                    $(".LoadAssetlist").append(sourceHtml(dataa));
                }
                $(".LoadAssetlist").show();

                AssetCategoryList.CurrentPage++;

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
var DeleteMerchantAccConfirmed = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Product/DeleteProductcategorie",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message, "");
                AssetCategoryList.CurrentPage = 1;
                AssetCategoryList.TotalCount = -1;
                AssetCategoryList.LoadAssetCategoryList();
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
    AssetCategoryList.picker = new Pikaday({
        field: document.getElementById('StartDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    AssetCategoryList.picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });
    $("#Search").click(function () {
        AssetCategoryList.CurrentPage = 1;
        AssetCategoryList.TotalCount = -1;
        AssetCategoryList.searchrider();
    });
    $("#SearchText").keyup(function () {
        AssetCategoryList.CurrentPage = 1;
        AssetCategoryList.TotalCount = -1;
        AssetCategoryList.searchrider();
    });
    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchText").val("");
        $('select').val('-1').change()
        AssetCategoryList.CurrentPage = 1;
        AssetCategoryList.TotalCount = -1;
    });
    AssetCategoryList.LoadAssetCategoryList();
});
$(window).resize(function () {
    $(".product_cat_height").height(window.innerHeight - 205);
});
$(".product_cat_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_cat_height").scrollTop() > $("tr.data:last").position().top) {
        AssetCategoryList.LoadAssetCategoryList();
    }
});