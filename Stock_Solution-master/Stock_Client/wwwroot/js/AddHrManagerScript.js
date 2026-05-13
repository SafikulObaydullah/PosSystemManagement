var SaveHrManager = function () {
    if (CommonUiValidation()) {
        POSModal.Show()
        $.ajax({
            url: '/Employee/SaveHrManager',
            type: 'post',
            data: {
                Id: $("#Id").val(),
                UserID: $('#UserID').val(),
                BranchId: $('#BranchId').val(),
                IsProfileApproval: $("#IsProfileApproval").is(':checked'),
                IsAttendanceApproval: $("#IsAttendanceApproval").is(':checked'),
                IsLeaveApproval: $("#IsLeaveApproval").is(':checked')
            },
            success: function () {
                CloseRightToLeftModal()
                HrManagerList.SearchLoan()
                OpenSuccessMessageNew('Success', 'Saved!!')
            }
        })
        POSModal.Hide()
    }
}
$(document).ready(function () {
    $("#Country").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue !== '-1') {
            $.ajax({
                url: "/Employee/FindingCountryCodelist",
                type: 'post',
                data: { Country: selectedValue.replace(/\s+/g, " ") },
                success: function (data) {
                    if (data.result && data.country === selectedValue) {
                        var countryCode = $("#CountryCode");
                        countryCode.empty();
                        countryCode.append('<option value="-1">CountryCodeList</option>');
                        $.each(data.model, function (index, item) {
                            countryCode.append('<option value="' + item.value + '">' + item.text + '</option>');
                        });
                    } else {
                        $("#CountryCode").empty().append('<option value="-1">CountryCodeList</option>');
                    }
                }
            });
        } else {
            $("#CountryCode").empty().append('<option value="-1">CountryCodeList</option>');
        }
    });
})