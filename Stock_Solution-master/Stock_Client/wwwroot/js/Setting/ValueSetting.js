function LoadLookupData() {
    POSModal.Show();
    var queryparm = "?datakey=" + $("#DataKey").val();
    $(".load_look_list").load("/lookup-list" + queryparm, function () {
        POSModal.Hide();
    });
}
function EditLookupData(id) {
    if ($(".common_view").hasClass('tr_active_border')) {
        OpenErrorMessageNew("Warning!", "Save item first!");
    } else {
        $("#editic_" + id).hide();
        $("#saveic_" + id).show();
        var currentTD = $("#ship_tr" + id).find('td:eq(1),td:eq(2),td:eq(3),td:eq(4)');
        $("#ship_tr" + id).addClass('tr_active_border');
        $.each(currentTD, function () {
            $(this).prop('contenteditable', true);
        });
    }
}

var SaveLookupData = function (id) {
    if (id > 0) {
        POSModal.Show();
        var requestdata = {
            Id: id,
            ParentDataKey: $(".pd" + id).text().replace(/\s+/g, ""),
            DisplayText: $(".dt" + id).text().replace(/\s+/g, " "),
            DataValue: $(".dv" + id).text().replace(/\s+/g, " "),
            DataOrder: $(".do" + id).text().replace(/\s+/g, " ")
        };
        $.ajax({
            url: "/Settings/SaveLookup",
            type: 'post',
            data: requestdata,
            success: function (data) {
                if (data.result) {
                    $(".common_view").removeClass('tr_active_border');
                    var currentTD = $("#ship_tr" + id).find('td:eq(1),td:eq(2),td:eq(3),td:eq(4)');
                    $.each(currentTD, function () {
                        $(this).prop('contenteditable', false);
                    });
                    $("#editic_" + id).show();
                    $("#saveic_" + id).hide();
                    $("#btn-search-lookup").click();
                    OpenSuccessMessageNew("Success", "Lookup data Updated successfully!"); 
                }
            },
            error: function (exr) {
                if (typeof exr.statusText != 'undefined') {
                    console.log('Ajax status : ' + exr.statusText);
                }
            }
        });
    }
};


$(document).ready(function () {
    $(".load_look_list").height(window.innerHeight-285)
    $("#DataKey").change(function () {
        if ($("#DataKey").val != "-1") {
            LoadLookupData();
        }
    })
    $("#btn-search-lookup").click(function () {
        if ($("#DataKey").val != "-1") {
            LoadLookupData();
        }
    })
    
        //$('#firstDropdown').change(function () {
        //    var selectedValue = $(this).val(); // Get the selected value
        //    $('#secondDropdown').val(selectedValue); // Set the selected value of the second dropdown
        //});
 
    $("#btn-add-value-settings").click(function () {
        var selectedvalue = $("#DataKey").val()
        OpenTopToBottomModal("/settings/new-lookup-add?value=" + encodeURI(selectedvalue));
    })
})