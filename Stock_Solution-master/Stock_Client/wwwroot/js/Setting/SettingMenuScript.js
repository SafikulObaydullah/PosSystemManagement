$(document).ready(function () {
    POSModal.Show();
    $(".value_setting_tab").load("/settings-value", function () {
        POSModal.Hide();
    })
    $("#value_setting_tab").click(function () {
        POSModal.Show();
        $(".value_setting_tab").load("/settings-value", function () {
            POSModal.Hide();
        })
    })
    $("#permission_setting_tab").click(function () {
        POSModal.Show();
        $(".permission_setting_tab").load("/settings", function () {
            POSModal.Hide();
        })
    })
    $("#add_permission_setting_tab").click(function () {
        POSModal.Show();
        $(".add_permission_setting_tab").load("/add-permission", function () {
            POSModal.Hide();
        })
    })
    $("#global_setting_tab").click(function () {
        POSModal.Show();
        $(".global_setting_tab").load("/settings/global", function () {
            POSModal.Hide();
        })
    })
})
var Deleteglobalsett = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        DeleteglobalsettConfirmed(id);
    });
}
var DeleteglobalsettConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "settings/globalsearchdelete",
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