var VendorListGrid = {
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
        VendorListGrid.CurrentPage = 1;
        VendorListGrid.TotalCount = -1;
        VendorListGrid.LoadVendorListGrid();
    },
    LoadVendorListGrid: function () {
        if (VendorListGrid.LoaderAjax && VendorListGrid.LoaderAjax.readyState != 4) {
            return;
        }
        if (VendorListGrid.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var category = $("#Categories").val();
       

        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: VendorListGrid.CurrentPage,
            SearchText: SearchText,
            CategoryName: category,
            
        };
        VendorListGrid.LoaderAjax = $.ajax({
            type: "POST",
            url: '/vendormain/VendorListGrid',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                VendorListGrid.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (VendorListGrid.CurrentPage == 1) {
                    $(".load-Vendorlist").html(sourceHtml(dataa));
                } else {
                    $(".load-Vendorlist").append(sourceHtml(dataa));
                }
                $(".load-Vendorlist").show();
                VendorListGrid.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },

    DownloadVendorList: function () {
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
        window.location.href = "/VendorMain/vendor-download-excel" + parm;
    },
};

var DeleteVendorConfirmed = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'GET',
            url: "/VendorMain/DeleteVendor?id="+id,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.result == true)
                    OpenSuccessMessageNew("Success!", data.message, "");
                VendorListGrid.CurrentPage = 1;
                VendorListGrid.TotalCount = -1;
                VendorListGrid.LoadVendorListGrid();
            }
        });
    });
}
var UpdateVendor = function (id) {
    var url = "/vendormain/add";
    $(".grid-list-exc-page").hide();
    OpenRightToLeftModal("/vendormain/add?id=" + id);
}

$(document).ready(function () {
    $(".product_height").height(window.innerHeight - 205);
    VendorListGrid.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    VendorListGrid.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });
    $("#Productid").click(function () {
        VendorListGrid.CurrentPage = 1;
        VendorListGrid.TotalCount = -1;
        VendorListGrid.Reset();
    });
    $("#SearchText").keyup(function () {
        VendorListGrid.CurrentPage = 1;
        VendorListGrid.TotalCount = -1;
        VendorListGrid.Reset();
    });
    $("#Categories").change(function () {
        VendorListGrid.Reset();
        VendorListGrid.LoadVendorListGrid();
    });
    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $("#Categories").val("");
        $('select').val('-1').change()
        VendorListGrid.CurrentPage = 1;
        VendorListGrid.TotalCount = -1;
    });

    VendorListGrid.LoadVendorListGrid();
});
$(window).resize(function () {
    $(".product_height").height(window.innerHeight - 205);
});
$(".product_height").scroll(function () {
    if (window.innerHeight - 205 + $(".product_height").scrollTop() > $("tr.data:last").position().top) {
        VendorListGrid.LoadVendorListGrid();
    }
});