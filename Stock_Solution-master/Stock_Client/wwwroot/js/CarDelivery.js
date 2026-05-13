var SaveNewOrder = function () {
    var url = "/Order/SaveNewOrder";
    var param = {
        Id: $("#order_id").val(),
        MerchantId: $("#MerchantId").val(),
        PickupAddress: $("#PickupAddress").val(),
        Status: $("#Status").val(),
        Category: $("#Category").val(),
        Description: $("#Description").val(),
        City: $("#City").val(),
        Zone: $("#Zone").val(),
        Status: $("#Status").val(),
        DeliveryTime: $("#DeliveryTime").val(),
        Zone: $("#Zone").val(),
        Weight: $("#Weight").val(),
        Fees: $("#Fees").val(),
        MerchantOrderID: $("#MerchantOrderID").val(),
        ReceiverName: $("#ReceiverName").val(),
        ReceiverMobileNumber: $("#ReceiverMobileNumber").val(),
        Area: $("#Area").val(),
        Address: $("#Address").val(),
        PaymentType: $("#PaymentType").val(),
        SpecialInstruction: $("#SpecialInstruction").val(),
        AmountToBePaid: $("#AmountToBePaid").val(),
        Discount: $("#Discount").val()
    };

    console.log(param);
    $.ajax({
        type: 'POST',
        url: url,
        data: param,
        dataType: "json",
        success: function (result) {
            console.log(result + 'test');
            if (result) {
                OpenSuccessMessageNew("Success!", "Order placed successfully!");
                window.location.reload();
            }
        },
        error: function (request, error) {

        }
    });
       
}
$(document).ready(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
    $("#btn_save_order").click(function () {
        SaveNewOrder();
    })
});
  