var LoadGlobalSettingById = function (id) {
    OpenRightToLeftLgModal("/settings/globalsearchpartial?id=" + id);
}
$(document).ready(function () {
    SearchGlobalSet()
    $(".custom_report_table_container").height(window.innerHeight - 330)
})
$(window).resize(function () {
    $(".custom_report_table_container").height(window.innerHeight - 330)
})
$("#addnewbutton").click(function () {
    OpenRightToLeftLgModal("/settings/globalsearchpartial");
});
var SearchGlobalSet = function () {
    $("#CompanyId").change()
    var textvalue = $("#SearchGlobalText").val();
    var textvalue2 = $("#CompanyId").val();
    $(".globsrchtbl").html(LoaderLayout)
    $(".globsrchtbl").load("/settings/globalsearch?searchtext=" + textvalue + '&companyid=' + textvalue2);

}
$("#Searchglobal").click(function () {
    SearchGlobalSet()
})
$(".isactive").click(function () {
    console.log('hi');
    var id = parseInt($(this).attr("data-id"));
    if (isNaN(id)) { id = 0;}
    var ischeeked = false;
    if ($(this).is(":checked")) {
        ischeeked = true;
    }
    $.ajax({
        type: 'POST',
        url: "/settings/ActivePermission",
        data: { id: id, cheeked: ischeeked},
        dataType: "json",
        success: function (data) {
            if (data.result) {
                OpenSuccessMessageNew("Successful!", data.message, function () { });
            }
            else {
                OpenErrorMessageNew("Error!", data.message, function () { });
            }
            

        },
        error: function (request, error) {

        }
    });
})
$("#SearchGlobalText").keyup(function (e) {
    if (e.keyCode == 13) {
        SearchGlobalSet()
    }
})

var DeleteGlobalSettingConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "/settings/globalsearchdelete",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log("delete");
            OpenSuccessMessageNew("Successful!", "Deleted Successfully!", function () {
                $("#global_setting_tab").click();
            });

        },
        error: function (request, error) {

        }
    });
}
var DeleteGlobalSett = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        DeleteGlobalSettingConfirmed(id);
    });
}

