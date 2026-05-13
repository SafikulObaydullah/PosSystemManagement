var ProductListGrid = {
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
    Reset: function () {
        ProductListGrid.CurrentPage = 1;
        ProductListGrid.TotalCount = -1;
        ProductListGrid.LoadProductListGrid();
    },
    LoadProductListGrid: function () {
        if (ProductListGrid.LoaderAjax && ProductListGrid.LoaderAjax.readyState != 4) {
            return;
        }
        if (ProductListGrid.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var category = $("#Categories").val();
        var vendor = $("#Vendor").val();

        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: ProductListGrid.CurrentPage,
            SearchText: SearchText,
            CategoryName: category,
            Vendor: vendor,
        };
        ProductListGrid.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Product/ProductListLite',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                ProductListGrid.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (ProductListGrid.CurrentPage == 1) {
                    $(".load-merchantlist").html(sourceHtml(dataa));
                } else {
                    $(".load-merchantlist").append(sourceHtml(dataa));
                }
                $(".load-merchantlist").show();
                ProductListGrid.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },

    DownloadProductList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var category = $("#Categories").val();
        var vendor = $("#Vendor").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchText
            + '&CategoryName=' + category;
            + '&Vendor=' + vendor;
        window.location.href = "/product/product-download-excel" + parm ;
    },
};

var DeleteProductConfirmed = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Product/DeleteProduct",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                if (data.result == true)
                    OpenSuccessMessageNew("Success!", data.message, "");
                ProductListGrid.CurrentPage = 1;
                ProductListGrid.TotalCount = -1;
                ProductListGrid.LoadProductListGrid();
            }
        });
    });
}
var UpdateProduct = function (id) {
    var url = "/product/add";
    $(".grid-list-exc-page").hide();
    OpenTopToBottomModal("/Product/add?id=" + id);
}

$(document).ready(function () {
    $(".product_height").height(window.innerHeight - 205);
    ProductListGrid.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    ProductListGrid.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });
    $("#Productid").click(function () {
        ProductListGrid.CurrentPage = 1;
        ProductListGrid.TotalCount = -1;
        ProductListGrid.Reset();
    });
    $("#SearchText").keyup(function () {
        ProductListGrid.CurrentPage = 1;
        ProductListGrid.TotalCount = -1;
        ProductListGrid.Reset();
    });
    $("#Categories").change(function () {
        ProductListGrid.Reset();
        ProductListGrid.LoadProductListGrid();
    });
    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $("#Categories").val("");
        $('select').val('-1').change()
        ProductListGrid.CurrentPage = 1;
        ProductListGrid.TotalCount = -1;
    });

    ProductListGrid.LoadProductListGrid();
});
$(window).resize(function () {
    $(".product_height").height(window.innerHeight - 205);
});
$(".product_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_height").scrollTop() > $("tr.data:last").position().top) {
        ProductListGrid.LoadProductListGrid();
    }
});