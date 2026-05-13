var DeleteMerchantConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "/Merchant/DeleteMerchant",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log("delete"); 
            OpenSuccessMessageNew("Successful!", "Deleted Successfully!", function () {
                window.location.reload();
            });

        },
        error: function (request, error) {

        }
    });
}
var PageNo = 1;
var TotalCount = -1;
var LoaderAjax;
var LoadMerchantList = function (id) {      
    var Status = $("#Status").val();
    var FromDateTime = $("#StartDate").val();
    var ToDateTime = $("#EndDate").val();
    var searchtext = $("#SearchText").val();

    if (LoaderAjax && LoaderAjax.readyState != 4) { 
        return;
    }
    if (TotalCount == $("tr.data").length) {
        return;
    }

    var paramlite = {
        StartDate: FromDateTime, 
        EndDate: ToDateTime, 
        PageNo: PageNo,
        SearchText: searchtext,
    };
    LoaderAjax = $.ajax({
        type: "POST",
        url: '/merchant/merchants-lite',
        data: paramlite,
        dataType: "JSON",
        cache: false,
        success: function (data) {
            console.log(data);

            var dataa = JSON.parse(data.data);
            var TotalCount = dataa.TotalCount;
            console.log("Total Count: " + TotalCount[0].TotalCount)
            TotalCount = TotalCount[0].TotalCount;
            
            var empTemplate = $("#hbTemplate").html(); 
            var sourceHtml = Handlebars.compile(empTemplate); 

            if (PageNo == 1) {
                $(".load_hbdata").html(sourceHtml(dataa));
            } else {
                $(".load_hbdata").append(sourceHtml(dataa));
            }

            $(".load_hbdata").show();
            PageNo++;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
        }
    });
    
}
var DeleteMerchant = function (id) {
    OpenConfirmationMessageNew("","Are You Sure You Want To Delete?", function () {
        DeleteMerchantConfirmed(id);
    });
}
var picker;
var picker2;
$(document).ready(function () {
    picker = new Pikaday({
        field: document.getElementById('StartDate'),

        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });
    $("#Search").click(function () {
        PageNo = 1;
        TotalCount = -1;
        LoadMerchantList();
    });
    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val(""); 
        $("#SearchText").val("");
        PageNo = 1;
        TotalCount = -1;
    });

    $("#addnewbutton").click(function () {
        OpenTopToBottomModal("/Merchant/newmerchantpartial");
        $("#passcredential").hide();
        $("#namecredential").hide();
    })

    LoadMerchantList();

});
$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
        LoadMerchantList();
    }
});


