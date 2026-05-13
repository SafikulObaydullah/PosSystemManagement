var SaveGlobalSettingAjaxCall = function (requestInfo) {
    $.ajax({
        url: '/Settings/SaveGlobalSetting',
        type: 'post',
        dataType: "json",
        data: requestInfo,
        success: function (data) {
            if (data.success == true) {
                //CloseRightToLeftModal();
                OpenSuccessMessageNew(data.message, "Success");
                SearchGlobalSet()
                
            }
            else {
                //CloseRightToLeftModal();
                OpenSuccessMessageNew(data.message, "Error");
                SearchGlobalSet()
            }
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined')
                console.log(exr.statusText);
        }
    });
}
var SaveGlobalSetting = function () {
    var clock = false;
    if ($('#IsActive').is(":checked")) {
        clock = true;
    }
    var requestData = {
        Id: $('#globalsetid').val(),
        SearchKey: $('#SearchKey').val(),
        Value: $('#Value').val(),
        Tag: $('#Tag').val(),
        InputType: $('#InputType').val(),
        Description: $('#Description').val(),
        CompanyId: $('#CompanyId').val(),
        IsActive: clock,
    }
    if (typeof (requestData.SearchKey) == "undefined" || requestData.SearchKey == 0 || requestData.SearchKey == "" || requestData.SearchKey == null) {
        OpenErrorMessageNew('Data required', "Error");
    }
    else if (typeof (requestData.Value) == "undefined" || requestData.Value == 0 || requestData.Value == "" || requestData.Value == null) {
        OpenErrorMessageNew('Data required', "Error");
    } else if (typeof (requestData.CompanyId) == "undefined" || requestData.CompanyId == '-1' || requestData.CompanyId == "" || requestData.CompanyId == null) {
        OpenErrorMessageNew('Company required', "Error");
    } else {
        SaveGlobalSettingAjaxCall(requestData);
    }
}
$(document).ready(function () {
    $('#btn_close').click(function () {
        $('#global_setting_tab').click()
    })
    $('#btn_save_global_setting').click(function () {
        SaveGlobalSetting();
    })
})