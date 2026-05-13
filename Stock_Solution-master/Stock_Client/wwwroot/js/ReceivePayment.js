var picker = [];

$(document).ready(function () {

    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var formattedDate = month + "-" + day + "-" + year;
    $("#InvoiceDate").val(formattedDate);

    InvoiceDate = new Pikaday({
        field: document.getElementById('InvoiceDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#InvoiceDate')[0], firstDay: 1
    });
    DueDate = new Pikaday({
        field: document.getElementById('DueDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#DueDate')[0], firstDay: 15
    });
    Year = new Pikaday({
        field: document.getElementById('Year'),
        format: 'MM-DD-YYYY',
        trigger: $('#Year')[0], firstDay:1
    });
    //var currentDateString = (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '-' + currentDate.getFullYear();
    //$('#DueDate').val(currentDateString);

    //$('#DueDate').each(function (idx) {
    //    var fromDateField = this;
    //    var toDateField = $('#DueDate').not(fromDateField).get(0);
    //picker[idx] = new Pikaday({
    //    field: fromDateField,
    //    format: 'MM-DD-YYYY',
    //    firstDay: 7,
    //    gotoTodayButton: true,
    //    onSelect: function () {
    //        console.log('selected date');
    //    }
    //});
    //picker[idx].setMinDate(new Date());
})

//function Save() {
//    var obj = new Object();
//        obj.id = 0,
//        obj.CustomerId = $("#Customer").val(),
//        obj.EmailAddress = $("#EmailAddress").val(),
//        obj.CurrencyType = $("#ddlCurrency").val(),
//        obj.Status = $("#ddlInvoiceStatus").val(),
//        obj.InvoiceDate = $("#InvoiceDate").val(),
//        obj.DueDate = $("#DueDate").val(),
//        obj.VehicleName = $("#VehicleName").val(),
//        obj.ChasisNo = $("#ChasisNo").val(),
//        obj.ModelNo = $("#ModelNo").val(),
//        obj.EngineNo = $("#EngineNo").val(),
//        obj.FuelType = $("#FuelType").val(),
//        obj.Color = $("#Color").val(),
//        obj.Year = $("#Year").val(),
//        obj.Lot = $("#Lot").val(),
//        obj.Mileage = $("#Mileage").val(),
//        obj.Amount = $("#Amount").val(),
//        obj.Tax = $("#Tax").val(),
//        obj.DiscountAmount = $("#DiscountAmount").val(),
//            obj.TotalAmount = $("#TotalAmount").val(),
//            ob.PaymentType = $("#TransactionType").val(),
//        console.log(obj);
//        $.ajax({
//            url: "/Customer/SaveNewCarInvoice",
//            type: "post", 
//            data: obj, 
//            success: function (data) {
//                if (data.result) {
                    
//                    OpenSuccessMessageNew("Success!", "New Car Invoice added successfully!")
//                }
//            },
//            error: function (er) {
//                console.log(er)
//            }
//        })
//}
