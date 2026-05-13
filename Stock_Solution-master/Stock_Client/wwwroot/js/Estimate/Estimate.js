var DataTablePageSize = 50;
var ConvertEstimeToInvoiceById = function (EstimateConvertId) {
    $.ajax({
        url: domainurl + "/Invoice/ConvertEstimateToInvoice",
        data: { Id: EstimateConvertId },
        type: "Post",
        dataType: "Json",
        success: function (data) {
            //OpenEstimateTab();
            CloseTopToBottomModal();
            if (typeof (OpenInvoiceTab) != "undefined") {
                OpenInvoiceTab();
            }
            OpenSuccessMessageNew("", data.message);
            //OpenInvById(EstimateConvertId);
        }
    });
}
var OpenInvoiceNotesById = function (invId) {
    if (typeof (invId) != "undefined" && invId > 0) {
        if (typeof (CustomerLoadId) == "undefined") {
            CustomerLoadId = 0;
        }
        OpenRightToLeftModal(domainurl + "/Invoice/ShowInvoiceNotes/?InvoiceId=" + invId);
    }
}
var DeleteEstimateById = function (EstDeleteId) {
    $.ajax({
        url: domainurl + "/Invoice/DeleteInvoice",
        data: { Id: EstDeleteId },
        type: "Post",
        dataType: "Json",
        success: function (data) {
            if (data.result) {
                OpenSuccessMessageNew("Success!", "Estimate deleted successfully.");
                OpenEstimateTab();
            } else {
                OpenErrorMessageNew("Error!", data.message);
            }
        }
    });
}
var OpenEstById = function (invId, InvoiceId) {
    if (typeof (invId) != "undefined" && invId > 0) {
        OpenTopToBottomModal(domainurl + "/Estimate/AddEstimate/?Id=" + invId + "&InvoiceId=" + InvoiceId);
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
var ConvertEstimateToInvoice = function (id) {
    OpenConfirmationMessageNew("Confirm?", "Are you sure you want to Convert this Estimate to Invoice?", function () {
        ConvertEstimeToInvoiceById(id);
    });
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
        if (CustomerLiteList.LoaderAjax && CustomerLiteList.LoaderAjax.readyState != 4) {
            return;
        }
        if (CustomerLiteList.TotalCount == $("tr.data").length && loadCheck !=1) {
            var iii = 0;
            return;
        }
        var SearchText = $("#SearchText").val();
        var paramlite = {          
            PageNo: CustomerLiteList.CurrentPage,
            Searchtext: "",
            CustomerId: CustomerIdGuid,
            EstimateStatus: estimatestatus
        };
        CustomerLiteList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Estimate/EstimateGrid',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                CustomerLiteList.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#EstimateTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);


                if (CustomerLiteList.CurrentPage == 1) {
                    $(".load-Estimatelist").html(sourceHtml(dataa));
                } else {
                    $(".load-Estimatelist").append(sourceHtml(dataa));
                }
                $(".load-Estimatelist").show();

                CustomerLiteList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    }
};
var ConvertEstimeToInvoiceByIdInner = function (EstimateConvertId) {
    $.ajax({
        url: domainurl + "/Estimate/ConvertEstimateToInvoice",
        data: { Id: EstimateConvertId },
        type: "Post",
        dataType: "Json",
        success: function (data) {
            CloseTopToBottomModal();
            if (typeof (OpenInvoiceTab) != "undefined") {
                OpenInvoiceTab();
            }
            OpenSuccessMessageNew("", data.message);
        }
    });
}
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

    $(".item-delete").click(function () {
        EstDeleteId = $(this).attr("data-id");
        OpenConfirmationMessageNew("Confirm?", "Are you sure you want to delete?", function () {
            DeleteEstimateById(EstDeleteId)
        });
    });
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
