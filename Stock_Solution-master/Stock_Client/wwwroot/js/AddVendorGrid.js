var SaveNewVendorMain = function () {
    if (CommonUiValidation() && AddVendorValidation()) {
        var url = "/vendormain/SaveNewVendorMain";
        var param = {
            Id: $("#Id").val(),
            FirstName: $("#vendorfirstname").val(),
            LastName: $("#vendorlastname").val(),
            VendorMobileNumber: $("#vendormobilenumber").val(),
            VendorAddress: $("#vendoraddress").val(),
            VendorShopName: $("#vendorshopname").val(),
            VendorShopAddress: $("#vendorshopaddress").val(),
            //VendorMobileNumber: $("#vendormobilenumber").val(),
        };
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data) {
                    CloseRightToLeftModal()
                    OpenSuccessMessageNew("Success!", "Vendor Saved Successfully!")
                    $('.VendorC').click()
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }
}
var AddVendorValidation = function () {
    var result = true;
    if ($("#vendorfirstname").val() == "") {
        $("#vendorfirstname").attr("style", "border-color:red;");
        result = false;
    }
   
    if ($("#vendormobilenumber").val() == "" || $("#vendormobilenumber").val() == undefined || $("#vendormobilenumber").val() == null) {
        $("#vendormobilenumber").attr("style", "border-color:red;");
        result = false;
    }
    else {
        var pattern = "^(?:\\+88|88)?(01[3-9]\\d{8})$";
        /* var pattern = "^(?:\\+67|67)?(5[0-9]\\d{10})$";*/ //for PNG
        var StrMobile = $("#vendormobilenumber").val();
        if (StrMobile.match(pattern)) {
            $("#vendormobilenumber").attr("style", "border-color:none;");
        }
        else {
            $("#vendormobilenumber").attr("style", "border-color:red;");
            result = false;
        }
    }
    return result;
}

//var DeleteVendor = function (id) {
//    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
//        $.ajax({
//            type: 'POST',
//            url: "/vendor/DeleteVendor",
//            data: { id: id },
//            dataType: "json",
//            success: function (data) {
//                OpenSuccessMessageNew("Success!", data.message, "");
//                MerchantAccountList.CurrentPage = 1;
//                MerchantAccountList.TotalCount = -1;
//                MerchantAccountList.LoadMerchantAccountList();
//            }
//        });
//    });
//}
//var DownloadProductUnitList = function () {
//    window.location.href = "/inventory/unit-download-excel";
//};

$(document).ready(function () {

    $("#savenewvendor").click(function () {
        if (CommonUiValidation()) {
            SaveNewVendorMain();
        }
    })
    //$("#SearchOrder").keyup(function (e) {
    //    if (e.keyCode == 13) {
    //        SaveNewProductUnit();
    //    }
    //});
    $(".load_look_list").height(window.innerHeight - 285)
});