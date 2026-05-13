var saverider = function () {
    var url = "/Driver/SaveNewRider";

    var param = {
        Id: $("#Id").val(),
        UserName: $("#UserName").val(),
        Thana: $("#Thana").val(),
        District: $("#District").val(),
        NID: $("#NID").val(),
        UserId: $("UserId").val(),
        UserName: $("#namecredential").val(),
        Password: $("#passcredential").val(),
        IsRequiredRiderCredential: $('#isRiderCredential').is(':checked')
    }
    console.log(param);
    $.ajax({
        type: 'POST',
        url: url,
        data: param,
        dataType: "json",
        success: function (data) {
            console.log("rider add");
            CloseTopToBottomModal();

            if (data) {
                OpenSuccessMessageNew("Success!", "Rider account add successfully!", function () {
                    window.location.href = "/driver/Driver-List";

                });
            }
        },
        error: function (request, error) {

        }
    });

}
$(document).ready(function () {
    console.log('dsa');
    if ($('#isRiderCredential').click(function () {
        $(".passcredential").toggle(this.checked);
        $(".namecredential").toggle(this.checked);
    }));
    if ($('#isRiderCredential').is(':checked')) {
        $(".passcredential").show();
        $(".namecredential").show();
    }
    else {
        $(".passcredential").hide();
        $(".namecredential").hide();
    }
    $("#newdriversave").click(function () {

        console.log("sdfsdf");

        if (CommonUiValidation() && $('#isRiderCredential').is(':checked') && $("#UserName").val() != "" && $("#NID").val() != "" && $("#Thana").val() != "" && $("#District").val() != "" && $("#passcredential").val() != "" && $("#namecredential").val() != "") {

            saverider();
        }
        else {
            if ($("#UserName").val() == '') {
                $("#UserName").attr("style", "border-color:red");
            }
            else {
                $("#UserName").attr("style", "border-color:none;");
            }
            if ($("#NID").val() == '') {
                $("#NID").attr("style", "border-color:red");
            }
            else {
                $("#NID").attr("style", "border-color:none;");
            }
            if ($("#Thana").val() == '') {
                $("#Thana").attr("style", "border-color:red");
            }
            else {
                $("#Thana").attr("style", "border-color:none;");
            }
            if ($("#District").val() == '') {
                $("#District").attr("style", "border-color:red");
            }
            else {
                $("#District").attr("style", "border-color:none;");
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
})