var saveandnew = false;
var SavePaymentInfo = function () {
    console.log("xczxc");
    var url = "/accounts/MerchantPaymentInfo";
    var param = {
        PayemntType: $("#PaymentType").val(),
        BankName: $("#BankName").val(),
        AccountNumber: $("#AccountNumber").val(),
        AccountName: $("#AccountName").val(),
        RoutingNumber: $("#RoutingNumber").val(),
        BranchName: $("#BranchName").val(),
        MerchantId: $("#MerchantId").val(),
        MbBanking: $("#mbbanking").val()
    };

    console.log(param);
    $.ajax({
        type: 'POST',
        url: url,
        data: param,
        dataType: "json",
        beforeSend: function () {
            $('#place_new_porder_loader').show();
        },
        success: function (data) {
            console.log("xczxc");
            
            if (data) {
                OpenSuccessMessageNew("Payment info add Successfully!", function () {
                    $('#place_new_porder_loader').hide();
                     window.location.reload();

                });
            }
        },
        error: function (request, error) {

        }
    });
}

var DeleteMerchant = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        DeleteMerchantConfirmed(id);
    });
}
var DeleteMerchantConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "/accounts/Merchant-PaymentInfo",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            
            OpenSuccessMessageNew("Successful!", "Deleted Successfully!", function () {
                window.location.reload();
            });

        },
        error: function (request, error) {

        }
    });
}
var MerchanPaymentInfoValidation = function () {
    var result = true;
    if ($("#BankName").val() == "") {
        $("#BankName").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#BankName").val() == "-1") {
        $("#BankName").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#AccountNumber").val() == "") {
        $("#AccountNumber").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#AccountName").val() == "") {
        $("#AccountName").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#BranchName").val() == "") {
        $("#BranchName").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#mbbanking").val() == "") {
        $("#mbbanking").attr("style", "border-color:red;");
        result = false;
    }
    return result;
}

$(document).ready(function () {
        $("#PaymentType").change(function () {
            if ($("#PaymentType").val() == 'mobilebanking') {
                $(".mbname_field").css("display", "block");
                $(".banking_options").css("display", "none");

            }
            else{
                $(".banking_options").css("display", "block");
                $(".mbname_field").css("display", "none");
            }
        });
        $("#paymentinfosave").click(function () {
            if (MerchanPaymentInfoValidation()
                && $("#BankName").val() != "" && $("#BankName").val() != "-1" && $("#AccountNumber").val() != "" && $("#AccountName").val() != "" && $("#BranchName").val() != "" && $("#mbbanking").val() != "") {
                SavePaymentInfo();
            }
        });

    $("#BankName").keyup(function () {
        if ($("#BankName").val() == "") {
            $("#BankName").attr("style", "border-color:red;");
            }
        else
            {
             $("#BankName").attr("style", "border-color:#ccc;");
            }
    })
    $("#AccountNumber").keyup(function () {
        if ($("#AccountNumber").val() == "") {
            $("#AccountNumber").attr("style", "border-color:red;");
        }
        else {
            $("#AccountNumber").attr("style", "border-color:#ccc;");
        }
    })
    $("#AccountName").keyup(function () {
        if ($("#AccountName").val() == "") {
            $("#AccountName").attr("style", "border-color:red;");
        }
        else {
            $("#AccountName").attr("style", "border-color:#ccc;");
        }
    })
    $("#BranchName").keyup(function () {
        if ($("#BranchName").val() == "") {
            $("#BranchName").attr("style", "border-color:red;");
        }
        else {
            $("#BranchName").attr("style", "border-color:#ccc;");
        }
    })
    $("#mbbanking").keyup(function () {
        if ($("#mbbanking").val() == "") {
            $("#mbbanking").attr("style", "border-color:red;");
        }
        else {
            $("#mbbanking").attr("style", "border-color:#ccc;");
        }
    })
})
//$(document).ready(function () {
//    $("#merchantPIdelete").click(function () {
//        alert("abc");
//        window.location.href = '/accounts/Merchant-PaymentINFO';
//    });

//})