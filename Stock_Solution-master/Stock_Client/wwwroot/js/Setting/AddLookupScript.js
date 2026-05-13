var LoadGlobalSettingById = function (id) {
    OpenTopToBottomModal("/settings/new-lookup-add?id=" + id);
}
var SaveValueSettings = function () {
    var active = false;
    var deft = false;
    if ($('#IsActive').is(":checked")) {
        active = true;
    }
    if ($('#IsDefaultItem').is(":checked")) {
        deft = true;
    }

    var datakey = $('#DataKey').val();
    var url = "/Settings/SaveLookup";
    var requestData = {
        Id: $("#LookupIntId").val(),
        CompanyId: $("#CompanyGuidId").val(),
        ParentDataKey: $('#ParentDataKey').val(),
        DataKey: datakey,
        DisplayText: encodeURI(String($('#DisplayText').val())),
        DataValue: encodeURI(String($('#DataValue').val())),
        DataOrder: encodeURI(String($('#DataOrder').val())),
        AlterDisplayText: encodeURI(String($('#AlterDisplayText').val())),
        AlterDisplayText1: encodeURI(String($('#AlterDisplayText1').val())),
        IsActive: active,
        IsDefaultItem: deft
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: requestData,
        dataType: 'json',
        success: function (data) {
            if (data.result) {
                CloseTopToBottomModal();
                $("#btn-search-lookup").click();
                OpenSuccessMessageNew("Success", "Lookup data saved successfully!");
            }
            else {
                OpenErrorMessageNew("Failed", data.message);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
function syncDropdownValue(value) {
    // Set the selected value of the second dropdown to match the first dropdown
    $('#DataKeyCustom').val(value);
}


var DeleteLookupConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "/settings/DeleteLookup",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            OpenSuccessMessageNew("Successful!", "Deleted Successfully!", function () {
                $("#value_setting_tab").click();
            });
        },
        error: function (request, error) {

        }
    });
}
$(document).ready(function () {

    $('#btn-save-exc').click(function () {
        var display = $('#DisplayText').val();
        var datavalue = $('#DataValue').val();
        var datakey = $('#DataKey').val();
        if (datakey == '' || datakey == null || datakey == 'undefined') {
            return false;
        }
        else if (display == '' || display == null || display == 'undefined') {
            $('#DisplayText').addClass('required');
            $('#DataValue').removeClass('required');
            $('#DataKey').removeClass('required');
            return false;
        }
        else if (datavalue == '' || datavalue == null || datavalue == 'undefined') {
            $('#DataValue').addClass('required');
            $('#DisplayText').removeClass('required');
            $('#DataKey').removeClass('required');
            return false;
        }
        else {
            $('#DisplayText').removeClass('required');
            $('#DataValue').removeClass('required');
            $('#DataKey').removeClass('required');
            SaveValueSettings();
        }
    });
    $('#btn-back').click(function () {
        var searchtext = encodeURI(String($('#DataKey').val()));
        if (searchtext == '' || searchtext == null || searchtext == 'undefined') {
            window.location.href = "/settings/value";
        }
        else {
            window.location.href = "/settings/value?value=" + searchtext;
        }
    });

    var ShortableTable = setTimeout(function () {

        $("#GFG").sortable({
            items: 'tr:not(tr:first-child)',
            dropOnEmpty: false,
            start: function (G, ui) {
                ui.item.addClass("select");
            },
            stop: function (G, ui) {
                ui.item.removeClass("select");
                $(this).find("tr").each(function (GFG) {
                    console.log(GFG);
                    if (GFG > 0) {
                        $(this).find("td").eq(4).html(GFG);
                    }
                });

                //Ajax Call for save ordering..
            }
        });

    }, 500);
});
var DeleteLookup = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        DeleteLookupConfirmed(id);
    });
}
 