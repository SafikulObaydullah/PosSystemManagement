$(window).resize(function () {
    $("select").select2({
        placeholder: 'Select one',
        dropdownParent: $('.top_to_bottom_container'),
        //closeOnSelect: false
    });
})
var ChangeSummary = function () {
    $('#storepoint').text($("#StoreId option:selected").text())
    $('#prod').text($("#ProductId option:selected").text())
    $('#proform').text($("#Form option:selected").text())
    $('#prosubgroup').text($("#ProductSubGroupId option:selected").text())
    $('#manufacom').text($("#SupplierId option:selected").text())
    $('#rack').text($("#Rack").val())
    $('#minstock').text($("#MinimumStock").val())
    $('#discountmargin').text($("#DiscountMargin").val())
}
var SaveNewRackStockMargin = function () {
    if (CommonUiValidation()) {
        var url = "/Product/SaveProductStockMargin";
        var param = {
            Id: $("#Id").val(),
            StoreId: $("#StoreId").val(),
            SupplierId: $("#SupplierId").val(),
            ProductId: $("#ProductId").val(),
            ProductSubGroupId: $("#ProductSubGroupId").val(),
            Form: $("#Form").val(),
            Rack: $("#Rack").val(),
            MinimumStock: $("#MinimumStock").val(),
            DiscountMargin: $("#DiscountMargin").val(),
        };
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data.success) {
                    CloseTopToBottomModal();
                    OpenSuccessMessageNew("Success!", data.message)
                    $('.UpdateRackStockDiscount').click()
                } else {
                    OpenErrorMessageNew('Error!', data.message)
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }

}
$(document).ready(function () {
    ChangeSummary()
    $("select").change(function () {
        ChangeSummary()
    })
    $(".text").keyup(function () {
        ChangeSummary()
    })
    $("select").select2({
        placeholder: 'Select one',
        dropdownParent: $('.top_to_bottom_container'),
        //closeOnSelect: false
    });
})