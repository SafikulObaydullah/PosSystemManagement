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
            url: '/Customer/ProductCustomerListLite',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                MerchantAccountList.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#customertemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);


                if (MerchantAccountList.CurrentPage == 1) {
                    $(".load_customer_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_customer_list_data").append(sourceHtml(dataa));
                }
                $(".load_customer_list_data").show();

                MerchantAccountList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    }
};

var DeleteCustomerConfirmed = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Customer/DeleteCustomer",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                MerchantAccountList.CurrentPage = 1;
                MerchantAccountList.TotalCount = -1;
                MerchantAccountList.LoadMerchantAccountList();
            }
        });
    });
}
var UpdateCustomerForm = function (id) {
    var url = "/Productgeneric/add";
    $(".grid-list-exc-page").hide();
    OpenRightToLeftModal("/customer/add?id=" + id);
}

$(document).ready(function () {
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
        MerchantAccountList.CurrentPage = 1;
        MerchantAccountList.TotalCount = -1;
    });

    MerchantAccountList.LoadMerchantAccountList();
});

$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
        MerchantAccountList.LoadMerchantAccountList();
    }
});