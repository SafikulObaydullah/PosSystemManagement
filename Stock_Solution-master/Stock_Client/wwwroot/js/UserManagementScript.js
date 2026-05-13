var SaveManagementprofile = function () {
    if (CommonUiValidation()) {
        POSModal.Show();
        var url = "/Employee/SaveManagementprofile";
        var param = {
            Id: $("#htId").val(),
            UserID: $('#EmployeeId').val(),
            LastEvaluationDate: $("#LastEvaluationDate").val(),
            NextEvaluationDate: $("#NextEvaluationDate").val(),
            EvaluationRemainderDate: $("#EvaluationRemainderDate").val(),
            EvaluationType: $("#EvaluationType").val(),
        };
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                POSModal.Hide();
                if (data) {
                    OpenSuccessMessageNew("Success!", 'Saved')
                } else {
                    OpenErrorMessageNew("Failed!", 'Failed!!!')
                }
            },
            error: function (request, error) {
                POSModal.Hide();
                console.log("Server Error")
            }
        });
    }
}
$(document).ready(function () {
    $("#BasePay").change(function () {
        if (HourlyRate == "Hourly") {
            $("#Salary").removeClass(display);
            $("#HourlyRate").addClass(display);
        }
        else {
            $("#Salary").addClass(display);
            $("#HourlyRate").removeClass(display);
        }
    })
})
LastEvaluationDate = new Pikaday({
    field: document.getElementById('LastEvaluationDate'),
    format: 'MM-DD-YYYY',
    trigger: $('#LastEvaluationDate')[0], firstDay: 1
});
NextEvaluationDate = new Pikaday({
    field: document.getElementById('NextEvaluationDate'),
    format: 'MM-DD-YYYY',
    trigger: $('#NextEvaluationDate')[0], firstDay: 1
});
EvaluationRemainderDate = new Pikaday({
    field: document.getElementById('EvaluationRemainderDate'),
    format: 'MM-DD-YYYY',
    trigger: $('#EvaluationRemainderDate')[0], firstDay: 1
});