var MakePaymentForMerchant = function (id) {
    var parm = "?payreceiptid=" + id;
    OpenTopToBottomModal("/receipt/make-payment-receipt" + parm);
}
var DeleteMerchantConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "/receipt/Merchant-PaymentInfoDelete",
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
var DeleteMerchantReq = function (id) {
    $.ajax({
        type: 'POST',
        url: "/Receipt/DeleteMerchantPayRequestByPayID",
        data: { payid: id },
        success: function (data) {
            $("#merchantPaymentReceipt").click()
            OpenSuccessMessageNew("Successful!", "Deleted Successfully!", function () {
                
            });

        },
        error: function (request, error) {

        }
    });
}