var SaveNewMerchant = function () {
    var url = "/Merchant/SaveNewMerchant";
    var param = {
        Id: $("#Id").val(),
        MerchantId: $("#MerchantId").val(),
        FullName: $("#FullName").val(),
        BusinessName: $("#BusinessName").val(),
        Telephone: $("#Telephone").val(),
        MobileNumber: $("#MobileNumber").val(),
        CellNumber: $("#CellNumber").val(),
        EmailAddress: $("#EmailAddress").val(), 
        Website: $("#Website").val(),
        Facebook: $("#Facebook").val(), 
        Twitter: $("#Twitter").val(),
        Pinterest: $("#Pinterest").val(), 
        Whatsapp: $("#Whatsapp").val(),
        LinkedIn: $("#LinkedIn").val(),  
        Address: $("#Address").val(),
        City: $("#City").val(),
        District: $("#District").val(),
        Division: $("#Division").val(),
        PostalCode: $("#PostalCode").val(), 
        UserId: $("UserId").val(),
        UserName: $("#namecredential").val(),
        Password: $("#passcredential").val(),
        IsRequiredMarchentCredential: $('#isMarchentCredential').is(':checked')
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: param,
        dataType: "json",
        beforeSend: function () {
            $('#place_new_porder_loader').show();
        },
        success: function (data) {
            CloseTopToBottomModal();
            if (data) {
                OpenSuccessMessageNew("Success!", "Merchant Added Successfully!", function () {
                    $('#place_new_porder_loader').hide();
                });
            }
            $("#MerchantList").click();
        },
        error: function (request, error) {

        }
    });
}
var SaveMerchantaddress = function () {
    var url = "/Merchant/SaveMerchantaddress";
    var param = {
        Id: $("#Id").val(),
        Address: $("#Address").val(),
        City: $("#City").val(),
        District: $("#District").val(),
        Division: $("#Division").val(),
        PostalCode: $("#PostalCode").val(),
       
    };
    $.ajax({
        type: 'post',
        url: url,
        data: param,
        beforeSend: function () {
            $('#place_new_porder_loader').show();
        },
        success: function (data) {
            CloseTopToBottomModal();
            if (data) {
                OpenSuccessMessageNew("Success!", "Merchant Address saved Successfully!", function () {
                    $('#place_new_porder_loader').hide();
                });
            }
        },
        error: function (request, error) {

        }
    });
}


$(document).ready(function () {
    $("#addnewMAdress").click(function () {
        $(".address_container").css('display','block')
    })
    $("#merchantAddresssave").click(function () {
        SaveMerchantaddress();
        });
    $("#merchantAddresscancel").click(function () {
        $(".address_container").css('display', 'none')
    });
    console.log('dsa');
    if ($('#isMarchentCredential').click(function () {
        $(".passcredential").toggle(this.checked);
        $(".namecredential").toggle(this.checked);
    }));
    if ($('#isMarchentCredential').is(':checked')) {
        $(".passcredential").show();
        $(".namecredential").show();
    }
    else {
        $(".passcredential").hide();
        $(".namecredential").hide();
    }

    $("#merchantsave").click(function () {
        console.log("sdfsdf");
       
        if (CommonUiValidation() && $('#isMarchentCredential').is(':checked') && $("#FullName").val() != "" && $("#CellNumber").val() != "" && $("#Address").val() != "" && $("#City").val() != "" && $("#District").val() != "" && $("#Division").val() != "" && $("#PostalCode").val() != "" && $("#passcredential").val() != "" && $("#namecredential").val() != "") {

            SaveNewMerchant();

        }
        else if ($('#isMarchentCredential').is(':checked') == false && $("#FullName").val() != "" && $("#CellNumber").val() != "" && $("#Address").val() != "" && $("#City").val() != "" && $("#District").val() != "" && $("#Division").val() != "" && $("#PostalCode").val() != "") {

            SaveNewMerchant();

        }
        else {
            if ($("#FullName").val() == '') {
                $("#FullName").attr("style", "border-color:red;");
            }
            else {
                $("#FullName").attr("style", "border-color:none;");
            }
            if ($("#CellNumber").val() == '') {
                $("#CellNumber").attr("style", "border-color:red;");
            }
            else {
                $("#CellNumber").attr("style", "border-color:none;");
            }
            
            if ($("#Address").val() == '') {
                $("#Address").attr("style", "border-color:red");
            }
            else {
                $("#Address").attr("style", "border-color:none;");
            }
            if ($("#City").val() == '') {
                $("#City").attr("style", "border-color:red");
            }
            else {
                $("#City").attr("style", "border-color:none;");
            }
            if ($("#District").val() == '') {
                $("#District").attr("style", "border-color:red");
            }
            else {
                $("#District").attr("style", "border-color:none;");
            }
            if ($("#Division").val() == '') {
                $("#Division").attr("style", "border-color:red");
            }
            else {
                $("#Division").attr("style", "border-color:none;");
            }
            if ($("#PostalCode").val() == '') {
                $("#PostalCode").attr("style", "border-color:red");
            }
            else {
                $("#PostalCode").attr("style", "border-color:none;");
            }
            if ($("#namecredential").val() == '') {
                $("#namecredential").attr("style", "border-color:red");
            }
            else {
                $("#namecredential").attr("style", "border-color:none;");
            }
            if ($("#passcredential").val() == '') {
                $("#passcredential").attr("style", "border-color:red");
            }
            else {
                $("#passcredential").attr("style", "border-color:none;");
            }
            
        }

    })
   

    $("#FullName").keyup(function () {
        if ($("#FullName").val() == "") {
            $("#FullName").attr("style", "border-color:red;");
        }
        else {
            $("#FullName").attr("style", "border-color:#ccc;");
        }
        if ($("#CellNumber").val() == "") {
            $("#CellNumber").attr("style", "border-color:red");
        }
        else {
            $("#CellNumber").attr("style", "border-color:#ccc");
        }
        if ($("#Address").val() == "") {
            $("#Address").attr("style", "border-color:red");
        }
        else {
            $("#Address").attr("style", "border-color:#ccc");
        }
        if ($("#City").val() == "") {
            $("#City").attr("style", "border-color:red");
        }
        else {
            $("#City").attr("style", "border-color:#ccc");
        }
        if ($("#District").val() == "") {
            $("#District").attr("style", "border-color:red");
        }
        else {
            $("#District").attr("style", "border-color:#ccc");
        }
        if ($("#Division").val() == "") {
            $("#Division").attr("style", "border-color:red");
        }
        else {
            $("#Division").attr("style", "border-color:#ccc");
        }
        if ($("#PostalCode").val() == "") {
            $("#PostalCode").attr("style", "border-color:red");
        }
        else {
            $("#PostalCode").attr("style", "border-color:#ccc");
        }
    })

})