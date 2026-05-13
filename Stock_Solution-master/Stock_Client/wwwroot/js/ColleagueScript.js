var UpdateEmployeeProfile = function () {
    if (CommonUiValidation()){
        POSModal.Show();
        var url = "/Employee/SaveNewEmployeeProfile";
        var param = {
            Id: $("#Id").val(),
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
            Designation: $("#Designation").val(),
            AssignedCounter: $("#AssignedCounter").val(),
            UserName: $("#RegNo").val(),
            RegNo: $("#RegNo").val(),
            Password: $("#Password").val(),
            PhoneNumber: $("#PhoneNumber").val(),
            PermissionGroupId: $("#PermissionGroupId").val(),
            ProfilePicture: $("#employeepicture_pro").val(),
            Sale: $("#SaleTransactionType").val(),
            HasStopTimerPermission: $("#HasStopTimerPermission").is(':checked'),
            HasLimitedAccess: $("#HasLimitedAccess").is(':checked'),
            Email: $("#Email").val(),
            PhoneNumber: $("#PhoneNumber").val(),
            NID: $("#NID").val(),
            District: $("#District").val(),
            City: $("#CityDropdown").val(),
            Zip: $("#Zip").val(),
            Street: $("#Street").val(),
            JoiningDate: $("#JoiningDate").val(),
            Birthday: $("#Birthday").val(),
            AnniversaryDate: $("#AnniversaryDate").val(),
            Department: $("#Department").val(),
            EmployeeType: $("#EmployeeType").val(),
            IsActive: $("#IsActive").is(':checked'),
            IsSupervisor: $("#IsSupervisor").is(':checked'),
        };
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                POSModal.Hide();
                if (data.success) {
                    OpenSuccessMessageNew("Success!", data.message)
                } else {
                    OpenErrorMessageNew("Failed!", data.message)
                }
            },
            error: function (request, error) {
                POSModal.Hide();
                console.log("Server Error")
            }
        });
    } 
}
Birthday = new Pikaday({
    field: document.getElementById('Birthday'),
    format: 'MM-DD-YYYY',
    trigger: $('#Birthday')[0], firstDay: 1
});
AnniversaryDate = new Pikaday({
    field: document.getElementById('AnniversaryDate'),
    format: 'MM-DD-YYYY',
    trigger: $('#AnniversaryDate')[0], firstDay: 1
});