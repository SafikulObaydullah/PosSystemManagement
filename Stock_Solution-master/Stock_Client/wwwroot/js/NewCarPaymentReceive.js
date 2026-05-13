var invoiceId = "";
$(document).ready(function () {
    invoiceId = $("#spanIvoiceId").text(); 
    $('#TransactionType').change(function () {
        var type = $('#TransactionType').val();
        if ((type == 'EFTPOSBank' || type == 'BankCHQ/BankDeposit')) {
            $("#transactiondatablock").removeClass('hidden');
        }
        else if (type == 'Cash') {
            $("#transactiondatablock").addClass('hidden');
        }
    })
});

var SavePaymentReceiveWithValidation = function () {
    if (CommonUiValidation())
        SavePaymentReceive();
}
var SavePaymentReceive = function () {  
    var obj = new Object();
        obj.id = 0;
        obj.CustomerName = "";
        obj.CustomerId = $('#CustomerId').val();
        obj.Email = "";
        obj.PaymentMethod = $("#TransactionType").val();
        obj.AmountReceived = $("#Amount").val();
        /*obj.InvoiceId = invoiceId;*/
        obj.TransactionNo = $("#TransactionNo").val() == null ? "" : $("#TransactionNo").val();
        obj.paymentReceiveHistoryList = InvoiceList(); 
        console.log(obj);
        $.ajax({
            url: "/customer/SaveNewCarPaymentReceiveInfo",
            type: "post",
            data: obj,
            success: function (data) {
                if (data.result) {
                    parent.LoadCustomerSalesGrid();
                    OpenSuccessMessageNew("Success!", "New Car Payment Receive added successfully!", function () { 
                        CloseTopToBottomModal();
                    }); 

                }
            },
            error: function (er) {
                console.log(er)
            }
        })
}
var CheckItemvale = "";
var CheckItemvaleId = "";
var PaymentRecieve = function (item) {
    var trselected = $(item).parent().parent();
    var inputselected = $(trselected).find('.amount_received'); 
    if ($(item).is(':checked')) { 
        $(inputselected).val($(item).attr('data-bal'));
    }
    else {
        $(inputselected).val('');
    }
    TotalAmountCalculation();
}
var TotalAmountCalculation = function (inputtext) {
    var trinput = $(inputtext).parent().parent().parent().parent().parent();
    var trCheckbox = $(trinput).find('.payment_receive');
    if ($(inputtext).val() != '') {
        $(trCheckbox).prop('checked', true);
    }
    else {

        $(trCheckbox).prop('checked', false); 
    }
   
    var amrecieved = $('.amount_received');
    var totalamountcal = 0;
    for (var ic = 0; ic < $(amrecieved).length; ic++) {
        if ($(amrecieved[ic]).val() != '')
            totalamountcal += parseFloat($(amrecieved[ic]).val()); 
    }
    if (totalamountcal === "NaN" || totalamountcal === null){
        totalamountcal = 0;
    }
    $('#Amount').val(totalamountcal);

}
var ClearPayments = function () {
    $('#Amount').val(''); 
    $('#PaymentId').text(''); 
    $('.payment_receive').is(':checked') == false;
}
var InvoiceList = function () {
    var TransactionInvoiceList = [];
    var transactionselect = $('.transaction_tr');
    for (var i = 0; i < transactionselect.length; i++) {
        var checkboxseleced = $(transactionselect[i]).find('.payment_receive'); 
        if ($(checkboxseleced).is(':checked')) {

            var ob_invoice = $(checkboxseleced).attr('data-invoiceId'); 
            var trselected = $(checkboxseleced).parent().parent();
            var amountselected = $(trselected).find('.amount_received');
            var ob_balance = $(amountselected).val();
            TransactionInvoiceList.push({
                InvoiceId: ob_invoice,
                Payment: ob_balance
            }) 
        }
    }
    return TransactionInvoiceList;
}
//var AmontValidate = function (item) { 
//    var trselected = $(item).parent().parent();
//    var inputselected = $(trselected).find('.amount_received');


//}
