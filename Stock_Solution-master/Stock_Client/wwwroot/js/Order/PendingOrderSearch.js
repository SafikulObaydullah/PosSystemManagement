var DeleteOrderConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "/Order/DeleteOrder",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log("deleteorder");
            OpenSuccessMessageNew("Success", "Deleted Successfully!", function () {
                window.location.reload();
            });
        },
        error: function (request, error) {

        }
    });
}
var DeleteOrder = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        DeleteOrderConfirmed(id);
    })
}
$(document).ready(function () {
    $('#orderTableId').DataTable();
});