var DataTablePageSize = 50;

var OpenInvoiceNotesById = function (invId) {
    if (typeof (invId) != "undefined" && invId > 0) {
        if (typeof (CustomerLoadId) == "undefined") {
            CustomerLoadId = 0;
        }
        OpenRightToLeftModal(domainurl + "/Invoice/ShowInvoiceNotes/?InvoiceId=" + invId);
    }
}

var OpenEstById = function (invId) {
    if (typeof (invId) != "undefined" && invId > 0) {
        OpenTopToBottomModal("/Estimate/AddEstimate/?Id=" + invId);
    }
}
var OpenInvById = function (invId) {
    if (typeof (invId) != "undefined" && invId > 0) {
        OpenTopToBottomModal(domainurl + "/Invoice/AddInvoice/?Id=" + invId);
    }
    else if (typeof (invId) != "undefined" && invId.indexOf('INV') > -1) {
        OpenTopToBottomModal(domainurl + "/Invoice/AddInvoice/?InvoiceId=" + invId);
    }
}

var CustomerLiteList = {
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
        CustomerLiteList.CurrentPage = 1;
        CustomerLiteList.TotalCount = -1;
        CustomerLiteList.LoadCustomerLiteList();
    },
    Reset: function () {
        CustomerLiteList.CurrentPage = 1;
        CustomerLiteList.TotalCount = -1;
    },
    LoadCustomerLiteList: function (loadCheck) {
        console.log("sagar");
        if (CustomerLiteList.LoaderAjax && CustomerLiteList.LoaderAjax.readyState != 4) {
            return;
        }
        if (CustomerLiteList.TotalCount == $("tr.data").length && loadCheck != 1) {
            var iii = 0;
            return;
        }
        var SearchText = $("#SearchText").val();
        //var SearchText ="";
        //var FromDateTime = $("#StartDate").val();
        //var ToDateTime = $("#EndDate").val();

        var paramlite = {
            PageNo: CustomerLiteList.CurrentPage,
            Searchtext: "",
            CustomerId: CustomerIdGuid,
            EstimateStatus: estimatestatus
        };
        CustomerLiteList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Estimate/InvoiceGrid',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                CustomerLiteList.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#InvoiceTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);


                if (CustomerLiteList.CurrentPage == 1) {
                    $(".load-invoicelist").html(sourceHtml(dataa));
                } else {
                    $(".load-invoicelist").append(sourceHtml(dataa));
                }
                $(".load-invoicelist").show();

                CustomerLiteList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    }
};

$(document).ready(function () {

    //if (typeof (CustomerLoadId) != "undefined") {
    //    /*
    //    This block will run only in customer detail page.
    //    */
    //    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    //    var EstimateTable = $(LoadCustomerDiv + '.tblEstimate').DataTable({
    //        "pageLength": DataTablePageSize,
    //        "destroy": true,
    //        "language": {
    //            "emptyTable": "No data available"
    //        },
    //        "order": [[2, "desc"]]
    //    });
    //} else {
    //    var EstimateTable = $('.tblEstimate').DataTable({
    //        "pageLength": DataTablePageSize,
    //        "destroy": true,
    //        "language": {
    //            "emptyTable": "No data available"
    //        },
    //        "order": [[2, "desc"]]
    //    });
    //}

    //EstimateTable.order([1, 'desc']).draw();

    //$(".Convert-EstimeteToInvoice").click(function () {
    //    EstimateConvertId = $(this).attr("data-id");

    //})
    //$(".CustomerCurrency").html(CustomerCurrency);
    CustomerLiteList.LoadCustomerLiteList();

})

$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
        CustomerLiteList.LoadCustomerLiteList();
    }
});
