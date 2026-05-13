$(window).resize(function () {
    $("select").select2({
        dropdownParent: $('.rtl_inner_height')
    });
})
var NewProductSubgroupValidation = function () {
    var isvalid = true;
    if ($("#GroupId").val() == "" || $("#GroupId").val() == "-1") {
        $("#GroupId").addClass('required')
        isvalid = false;
    }
    if ($("#Name").val() == "") {
        $("#Name").addClass('required')
        isvalid = false;
    }
    return isvalid;
}
var SaveNewProductSubgroup = function () {
    var url = "/Product/SaveNewProductSubgroup";
    if (NewProductSubgroupValidation()) {
        var param = {
            GroupId: $("#GroupId").val(),
            Name: $("#Name").val(),
            Description: $("#Description").val(),
        };
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data) {
                    CloseRightToLeftModal();
                    OpenSuccessMessageNew("Success!", "Product subgroup saved successfully!")
                    $('.productsubgroups').click()
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }
}
$(document).ready(function () {
    $("select").select2({
        dropdownParent: $('.rtl_inner_height')
    });
})