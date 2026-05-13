SaveNewExpense = function () {
    var url = "/Sales/SaveNewExpense";
    var param = {
        Id: $("#Id").val(),
        Title: $("#Title").val(),
        Description: $("#Description").val(),
        Amount: $("#Amount").val(),
        TransactionType: $("#TransactionType").val(),
        EmployeeNameFromList: $("#Empname").val(),
        ExpenseDate: $("#ExpenseDate").val(),
    };
    $.ajax({
        type: 'post',
        url: url,
        data: param,
        success: function (data) {
            if (data.success) {
                CloseRightToLeftModal()
                OpenSuccessMessageNew("Success!", "Expense Saved Successfully!")
                $('.expense').click()
            } else {
                OpenErrorMessageNew("Warning", data.message);
            }
        },
        error: function (request, error) {
            console.log("Server Error")
        }
    });
}

//var DeleteExpense = function (id) {
//    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
//        $.ajax({
//            type: 'POST',
//            url: "/Product/DeleteProductUnit",
//            data: { id: id },
//            dataType: "json",
//            success: function (data) {
//                OpenSuccessMessageNew("Success!", data.message, "");
//                DailyExpensesList.CurrentPage = 1;
//                DailyExpensesList.TotalCount = -1;
//                DailyExpensesList.LoadMerchantAccountList();
//            }
//        });
//    });
//}
//var DownloadProductUnitList = function () {
//    window.location.href = "/inventory/unit-download-excel";
//};

$(document).ready(function () {

    $("#savenewexpense").click(function () {
        if (CommonUiValidation()) {
            SaveNewExpense();
        }
    })

    $(".load_look_list").height(window.innerHeight - 285)
});
ExpenseDate = new Pikaday({
    field: document.getElementById('ExpenseDate'),
    format: 'MM-DD-YYYY',
    trigger: $('#ExpenseDate')[0], firstDay: 1
});
