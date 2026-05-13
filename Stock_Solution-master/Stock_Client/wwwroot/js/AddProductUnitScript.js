var SaveNewProductUnit = function () {
    var url = "/Product/SaveNewProductUnit";
    var param = {
        Id: $("#Id").val(),
        Name: $("#Name").val(),
        Description: $("#Description").val(),
       };
    $.ajax({
        type: 'post',
        url: url,
        data: param,
        success: function (data) {
            if (data) {
                CloseRightToLeftModal()
                OpenSuccessMessageNew("Success!", "Product Unit Saved Successfully!")
                $('.unit').click()
            }
        },
        error: function (request, error) {
            console.log("Server Error")
        }
    });
}

var DeleteProductUnit = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        $.ajax({
            type: 'POST',
            url: "/Product/DeleteProductUnit",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                OpenSuccessMessageNew("Success!", data.message, "");
                MerchantAccountList.CurrentPage = 1;
                MerchantAccountList.TotalCount = -1;
                MerchantAccountList.LoadMerchantAccountList();
            }
        });
    });
}
var DownloadProductUnitList = function () {
     window.location.href = "/inventory/unit-download-excel";
};

$(document).ready(function () {

    $("#savenewproductunit").click(function () {
        SaveNewProductUnit();
    })
    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            SaveNewProductUnit();
        }
    });
    $(".load_look_list").height(window.innerHeight - 285)
});




