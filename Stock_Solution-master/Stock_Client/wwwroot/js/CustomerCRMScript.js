$(document).ready(function () {
    $('#btn-add-Customer').click(function () {
        $(".grid-list-exc-page").hide();
        OpenTopToBottomModal("/customer/add");
    });
    $('#Add-CustomerLite').click(function () {
        Addcustomerlite();
    });
})
var UpdateCustomerCRM = function (id) {
    $(".grid-list-exc-page").hide();
    window.open('customer/customer-details?id=' + id)
}
var DeleteCustomer = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'post',
            url: "/Customer/DeleteCustomer?id=" + id,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.result == true)
                    OpenSuccessMessageNew("Success!", data.message);
                CustomerLiteList.CurrentPage = 1;
                CustomerLiteList.TotalCount = -1;
                CustomerLiteList.LoadCustomerLiteList();
            }
        });
    });
}
var DeleteCustomerLite = function (id) {
    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'post',
            url: "/Customer/DeleteCustomerLite?id=" + id,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.result == true)
                    OpenSuccessMessageNew("Success!", data.message);
                CustomerLiteList.CurrentPage = 1;
                CustomerLiteList.TotalCount = -1;
                CustomerLiteList.LoadCustomerLiteList();
            }
        });
    });
}

var Addcustomerlite = function () {
var Currency = $("#Currency").val();
var SSN = $("#NID").val();
 var url = "/Customer/SaveCustomerLite";

var param = {

    id: $("#id").val(),
    Currency: Currency,
    FirstName: $("#FirstName").val(),
    LastName: $("#LastName").val(),
    BusinessName: $("#BusinessName").val(),
    EmailAddress: $("#EmailAddress").val(),
    Type: $("#Type").val(),
    Street: $("#Street").val(),
    City: $("#City").val(),
    State: $("#State").val(),
    ZipCode: $("#ZipCode").val(),
    PrimaryPhone: $("#PrimaryPhone").val(),
    SecondaryPhone: $("#SecondaryPhone").val(),
    CellNo: $("#CellNo").val(),
    Fax: $("#Fax").val(),
    CallingTime: $("#CallingTime").val(),
    LeadSource: $("#LeadSource").val(),
    NID: SSN,
    CityPrevious: $("#CityPrevious").val(),
    StatePrevious: $("#StatePrevious").val(),
    ZipCodePrevious: $("#ZipCodePrevious").val(),
    StreetPrevious: $("#StreetPrevious").val(),
    //Status: $("#Status").val(),
    CustomerStatus: $("#CustomerStatus").val(),
    //PaymentMethod: $("#PaymentMethod").val(),
    PhoneType: $("#PhoneType").val(),
    ReferringCustomer: $('#Ref_customer').val(),
    //Note: $("#Note").val(),
    //SalesLocation: $("#SalesLocation").val(),
    BestTimeToCall: $("#BestTimeToCall").val(),

    };
    console.log(param);

    $.ajax({
        type: 'post',
        url: url,
        data: param,
        success: function (data) {
            console.log(data);
            if (data) {
                CustomerLiteList.CurrentPage = 1;
                CustomerLiteList.TotalCount = -1;
                CustomerLiteList.LoadCustomerLiteList();
                CloseTopToBottomModal();
                OpenSuccessMessageNew("Success!", "Customer added successfully!")
            //    $('#customers').click()
            }
        },
        error: function (request, error) {
            console.log("Server Error")
        }
    });

}

var CustomerLiteList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,

  
    searchrider: function () {
        CustomerLiteList.CurrentPage = 1;
        CustomerLiteList.TotalCount = -1;
        CustomerLiteList.LoadCustomerLiteList();
    },
    LoadCustomerLiteList: function () {
        if (CustomerLiteList.LoaderAjax && CustomerLiteList.LoaderAjax.readyState != 4) {
            return;
        }
        if (CustomerLiteList.TotalCount == $("tr.data").length) {
            return;
        }

        var SearchText = $("#SearchText").val();
        //var SearchText ="";
        //var FromDateTime = $("#StartDate").val();
        //var ToDateTime = $("#EndDate").val();

        var paramlite = {

            PageNo: CustomerLiteList.CurrentPage,
            SearchText: SearchText,
        };
        CustomerLiteList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Customer/CustomerliteList',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                CustomerLiteList.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);


                if (CustomerLiteList.CurrentPage == 1) {
                    $("#total_count").text(TotalCount[0].TotalCount)
                    $(".load-Productlist").html(sourceHtml(dataa));
                } else {
                    $(".load-Productlist").append(sourceHtml(dataa));
                }
                $(".load-Productlist").show();

                CustomerLiteList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
     DownloadCustomerList: function () {
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
         window.location.href = "/Customer/customer-download-excel" + parm;
    },
};


$(document).ready(function () {
    $(".customer_for_crm_height").height(window.innerHeight - 205);
    $('.acfc_container').height(window.innerHeight - 90);
    CustomerLiteList.picker = new Pikaday({
        field: document.getElementById('StartDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    CustomerLiteList.picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });
    $("#Search").click(function () {
        CustomerLiteList.CurrentPage = 1;
        CustomerLiteList.TotalCount = -1;
        CustomerLiteList.searchrider();
    });
    $("#SearchText").keyup(function () {
        CustomerLiteList.CurrentPage = 1;
        CustomerLiteList.TotalCount = -1;
        CustomerLiteList.searchrider();
    });
    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchText").val("");
        CustomerLiteList.CurrentPage = 1;
        CustomerLiteList.TotalCount = -1;
    });

    CustomerLiteList.LoadCustomerLiteList();
    $(".customer_for_crm_height").scroll(function () {
        if (window.innerHeight - 205 + $(".customer_for_crm_height").scrollTop() > $("tr.data:last").position().top) {
            CustomerLiteList.LoadCustomerLiteList();
        }
    });
});


$(window).resize(function () {
    $(".customer_for_crm_height").height(window.innerHeight - 205);
    $('.acfc_container').height(window.innerHeight - 90);
});
