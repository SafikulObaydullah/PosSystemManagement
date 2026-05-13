var picker = [];

$(document).ready(function () {
    console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
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
    $(function () {
        // Calculate the minimum date (today + 15 days) 
        // Initialize the date picker
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            minDate: minDate,
            showButtonPanel: true
        });
    });
    var today = new Date();
    var minDate = new Date();
    minDate.setDate(today.getDate() + 15);
    DueDate = new Pikaday({
        field: document.getElementById('DueDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#DueDate')[0], firstDay: 15,
        minDate: minDate
    });
});

function Save() {
    if (CommonUiValidation()) {
        var obj = new Object(); 
        var lcustomerId = $('#CID').val(); 
                obj.id = $('#Id').val(),
                obj.CustomerId = lcustomerId,
                obj.CustomerName = $("#CustomerName").val(),
                obj.EmailAddress = $("#EmailAddress").val(),
                obj.CustomerAddress = $("#CustomerAddress").val(),
                obj.InvoiceDate = $("#InvoiceDate").val(),
                obj.DueDate = $("#DueDate").val(),
                obj.CurrencyType = $("#ddlCurrency").val(),
                obj.Status = $("#ddlInvoiceStatus").val(),
                obj.VehicleName = $("#VehicleName").val(),
                obj.ChasisNo = $("#ChasisNo").val(),
                obj.ModelNo = $("#ModelNo").val(),
                obj.EngineNo = $("#EngineNo").val(),
                obj.FuelType = $("#FuelType").val(),
                obj.Color = $("#Color").val(),
                obj.Year = $("#Year").val(),
                obj.Lot = $("#Lot").val(),
                obj.Mileage = $("#Mileage").val(),
                obj.Amount = $("#Amount").val(),
                obj.Tax = $("#Tax").val(),
                obj.DiscountAmount = $("#DiscountAmount").val(),
                obj.TotalAmount = $("#TotalAmounts").val(),
                obj.Description = $("#Description").val(),
                obj.PaymentType = $("#TransactionType").val();
        $.ajax({
            url: "/Customer/SaveNewCarInvoice",
            type: "post",
            data: obj,
            success: function (data) {
                if (data.result) {
                    OpenSuccessMessageNew("Success!", "New Car Invoice added successfully!");
                    LoadSalesGrid();
                    LoadCustomerSalesGrid();
                    OpenInvoiceTab();
                }
            },
            error: function (er) {
                console.log(er)
            }
        });
    }
}

function MailSend() {
    if (CommonUiValidation()) {
        var obj = new Object();
        var lcustomerId = $('#CID').val();
        obj.id = $('#Id').val(),
            obj.CustomerId = lcustomerId,
            obj.CustomerName = $("#CustomerName").val(),
            obj.EmailAddress = $("#EmailAddress").val(),
            obj.CustomerAddress = $("#CustomerAddress").val(),
            obj.InvoiceDate = $("#InvoiceDate").val(),
            obj.DueDate = $("#DueDate").val(),
            obj.CurrencyType = $("#ddlCurrency").val(),
            obj.Status = $("#ddlInvoiceStatus").val(),
            obj.VehicleName = $("#VehicleName").val(),
            obj.ChasisNo = $("#ChasisNo").val(),
            obj.ModelNo = $("#ModelNo").val(),
            obj.EngineNo = $("#EngineNo").val(),
            obj.FuelType = $("#FuelType").val(),
            obj.Color = $("#Color").val(),
            obj.Year = $("#Year").val(),
            obj.Lot = $("#Lot").val(),
            obj.Mileage = $("#Mileage").val(),
            obj.Amount = $("#Amount").val(),
            obj.Tax = $("#Tax").val(),
            obj.DiscountAmount = $("#DiscountAmount").val(),
            obj.TotalAmount = $("#TotalAmounts").val(),
            obj.Description = $("#Description").val(),
            obj.PaymentType = $("#TransactionType").val(); 
        $.ajax({
            url: "/Customer/SaveNewCarInvoice",
            type: "post",
            data: obj,
            success: function (data) {
                if (data.result) {
                    console.log(data);
                    alert(data.filename);
                    var mailUrl = '/customemr/invoice-mail-review?filename=' + data.filename + '&email=' + encodeURIComponent(obj.EmailAddress);
                    OpenTopToBottomModal(mailUrl);
                    OpenInvoiceTab();
                }
            },
            error: function (er) {
                console.log(er)
            }
        });
    }
}

function PaymentCalculate() {
    var Amount = 0;
    var Tax = 0;
    var DiscountAmount = 0;
    if ($("#Amount").val() != '' && !isNaN($("#Amount").val())) {
        Amount = parseFloat($("#Amount").val());
        Tax = (Amount * 15) / 100;
        $("#Tax").val(Tax);
    }
    if ($("#DiscountAmount").val() != '' && !isNaN($("#DiscountAmount").val())) {
        DiscountAmount = parseFloat($("#DiscountAmount").val());
    }
    var TotalAmount = Amount + Tax - DiscountAmount;
    $("#TotalAmounts").val(TotalAmount);

}
var SalesGrid = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    LoadSalesGrid: function () {
        if (SalesGrid.LoaderAjax && SalesGrid.LoaderAjax.readyState != 4) {
            return;
        }
        if (SalesGrid.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var PayType = $("#payType").val();
        var TransactionType = $("#TransactionType").val();
        var CustoemrID = $("#CustomerId").val();
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: SalesGrid.CurrentPage,
            Searchtext: SearchTxt,
            PayType: PayType,
            TransactionType: TransactionType,
            CustomerId: CustoemrID
        };

        SalesGrid.LoaderAjax = $.ajax({
            type: "post",
            url: '/Sales/SalesGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                SalesGrid.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#salestemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (SalesGrid.CurrentPage == 1) {
                    $(".load_sales_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_sales_list_data").append(sourceHtml(dataa));
                }
                $(".load_sales_list_data").show();
                $("#revdatefilter").addClass('display_nn');
                SalesGrid.CurrentPage++;
                POSModal.Hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenCautionMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.");
                POSModal.Hide();
            }
        });
    },
}
// var VehicleId = $(item).find('.vehicle_Name').val();
var vehicleListArray = [];
var GetVehicleInfoByName = function (item) {
    var VehicleName = $("#VehicleName").val();
    $.ajax({
        type: "post",
        url: "/Customer/GetVehecleInfoDetailByProductName?VehicleName=" + VehicleName,
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            vehicleListArray = data;
            var len = vehicleListArray.length;
            document.getElementById("ModelNo").value = data.modelNo;
            document.getElementById("Color").value = data.color;
            document.getElementById("FuelType").value = data.fuelType;
            document.getElementById("Year").value = data.year;
            document.getElementById("Mileage").value = data.mileage;


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });
}