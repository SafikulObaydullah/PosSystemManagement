var ListProducts = [];
var saveandnew = false;
var redirectToListPage = function () {
    window.location = '/order/Pending-order-list';
}
var CloseAndClose = function () {
    window.location = '/order/new-order-place';
}
var SaveNewOrder = function () {
    ListProducts = [];

    if (role == "2") {
        ListProducts.push({
            OrderId: $("#OrderUId").val(),
            ProductName: "MarchantProduct",
            Price: 0,
            Qty: 1,
            TotalPrice: 0,
            Id: 0
        });
        var sts;
        if ($("#Status").val() == "-1") {
            sts="OrderPlace"
        }
        var requestData = {
            Id: $("#ord_int_id").val(),
            OrderId: $("#OrderId").val(),
            MerchantId: $("#MerchantId").val(),
            PickupAddress: $("#PickupAddress option:selected").text(),
            Status: sts,
            Category: $("#Category").val(),
            Description: $("#Description").val(),
            City: $("#City").val(),
            Zone: $("#Zone").val(),
            DeliveryTime: $("#DeliveryTime").val(),
            Weight: $("#Weight").val(),
            Fees: $("#Fees").val(),
            ReceiverName: $("#ReceiverName").val(),
            ReceiverMobileNumber: $("#ReceiverMobileNumber").val(),
            District: $("#District").val(),
            Area: $("#Area").val(),
            Address: $("#Address").val(),
            SpecialInstruction: $("#SpecialInstruction").val(),
            Discount: $("#Discount").val(),
            AmountToBePaid: $("#AmountToBePaid").val(),
            SelectMerchant: $("#SelectMerchant").val(),
            GrandTotal: $("#GrandTotal").val(),
            CODfee: $("#CODFee").val(),
            Price: $("#SubTotal").val(),
            MerchantAccountId: $("#MerchantAccountId").val(),
            MerchantOrderID: $("#MerchantOrderID").val(),
            //order Product
            ListProducts: ListProducts
        };
        $.ajax({
            url: "/Order/SaveNewOrder",
            type: 'post',
            data: requestData,
            beforeSend: function () {
                $('#place_new_porder_loader').show();
            },
            success: function (data) {
                if (data) {
                    if (saveandnew === true) {
                        OpenSuccessMessageNew("Success!", "Order saved successfully!", CloseAndClose);
                        $('#place_new_porder_loader').hide();
                    }
                    else {
                        OpenSuccessMessageNew("Success!", "Order saved successfully!", redirectToListPage);
                        $('#place_new_porder_loader').hide();
                    }
                }
            }
        });
    } else {
        $("#product-table tbody tr").each(function () {
            if ($(this).find('td .product-name').val() != '') {
                ListProducts.push({
                    OrderId: $("#OrderUId").val(),
                    ProductName: $(this).find('td .product-name').val(),
                    Price: $(this).find('td .product-price').val(),
                    Qty: $(this).find('td .product-qty').val(),
                    TotalPrice: $(this).find('td .product-total-price').val(),
                    Id: $(this).find('td .prduct-id').val()
                });
            }
        });
        if (ListProducts.length === 0) {
            OpenErrorMessageNew('Error', 'You must add at-least one product');
        }
        else {
            var requestData = {
                Id: $("#ord_int_id").val(),
                OrderId: $("#OrderId").val(),
                MerchantId: $("#MerchantId").val(),
                PickupAddress: $("#PickupAddress option:selected").text(),
                Status: $("#Status").val(),
                Category: $("#Category").val(),
                Description: $("#Description").val(),
                City: $("#City").val(),
                Zone: $("#Zone").val(),
                DeliveryTime: $("#DeliveryTime").val(),
                Weight: $("#Weight").val(),
                Fees: $("#Fees").val(),
                ReceiverName: $("#ReceiverName").val(),
                ReceiverMobileNumber: $("#ReceiverMobileNumber").val(),
                District: $("#District").val(),
                Area: $("#Area").val(),
                Address: $("#Address").val(),
                SpecialInstruction: $("#SpecialInstruction").val(),
                Discount: $("#Discount").val(),
                AmountToBePaid: $("#AmountToBePaid").val(),
                SelectMerchant: $("#SelectMerchant").val(),
                GrandTotal: $("#GrandTotal").val(),
                CODfee: $("#CODFee").val(),
                Price: $("#SubTotal").val(),
                MerchantAccountId: $("#MerchantAccountId").val(),
                MerchantOrderID: $("#MerchantOrderID").val(),
                ListProducts: ListProducts
            };
            $.ajax({
                url: "/Order/SaveNewOrder",
                type: 'post',
                data: requestData,
                beforeSend: function () {
                    $('#place_new_porder_loader').show();
                },
                success: function (data) {
                    if (data) {
                        if (saveandnew === true) {
                            OpenSuccessMessageNew("Success!", "Order saved successfully!", CloseAndClose);
                            $('#place_new_porder_loader').hide();
                        }
                        else {
                            OpenSuccessMessageNew("Success!", "Order saved successfully!", redirectToListPage);
                            $('#place_new_porder_loader').hide();
                        }
                    }
                }
            });
        }
    }

}

var SaveStatusLog = function () {
    console.log('test');
    $.ajax( {
        url: "/Order/SaveStatusLog",
        type: 'post',
        data: { Status: $("#Status").val(), Id: $("#ord_int_id").val(), userId: $("#RiderUserId").val() },
        beforeSend: function () {
            $('#place_new_porder_loader').show();
        },
        success: function (data) {
            if (data) {
                OpenSuccessMessageNew("Success!", "Status Change successfully!");
                $('#place_new_porder_loader').hide();
            }
        }
    })
}

var CalculateOrderAmount = function () {
    if (parseFloat($("#Discount").val()) > 0) {
        $("#GrandTotal").val(parseFloat($("#Fees").val()) - parseFloat($("#Discount").val()));
        if (parseFloat($("#CODFee").val()) > 0) {
            $("#GrandTotal").val(parseFloat($("#GrandTotal").val()) + parseFloat($("#CODFee").val()));
        }
    }
    else if (parseFloat($("#CODFee").val()) > 0) {
        if (parseFloat($("#Discount").val()) > 0) {
            $("#GrandTotal").val(parseFloat($("#SubTotal").val()) - parseFloat($("#Discount").val()));
        }
        $("#GrandTotal").val(parseFloat($("#Fees").val()) + parseFloat($("#CODFee").val()));
    }
    else {
        $("#GrandTotal").val($("#SubTotal").val());
    }

    $('#AmountToBePaid').val($("#GrandTotal").val());
}
var CalculateRowTotal = function (inputrow, issave, tabsave) {
    console.log(inputrow);
    var name = $(inputrow).find('.product-name').val();
    var qty = $(inputrow).find('.product-qty').val();
    var uprice = $(inputrow).find('.product-price').val();
    var total = 0;
    if ($.isNumeric(qty) && $.isNumeric(uprice)) {
        total = uprice * qty;
        $($(inputrow).find('.product-total-price')).val(total);
    }
    CalculateGrandTotal();

}
var CalculateGrandTotal = function () {
    console.log("Grand Total");
    var items = $('.product-total-price');

    var sum = 0;

    for (var i = 0; i < items.length; i++) {

        var vauei = parseFloat($(items[i]).val());

        if ($.isNumeric(vauei)) {
            sum += vauei;
        }
    }
    var grandtotal = sum;
    $('#SubTotal').val(sum.toFixed());
    var discount = $('#Discount').val();
    var fee = parseFloat($('#Fees').val());
    if (isNaN(fee) || fee <= 0) {
        fee = parseFloat($("#DefaultFeeValue").val());
        $('#Fees').val(fee);
    }
    var cod = $('#CODFee').val();
    if ($.isNumeric(discount)) {
        grandtotal = grandtotal - parseFloat(discount);
         
    }
    if ($.isNumeric(fee)) {
        grandtotal = grandtotal + parseFloat(fee);

    }
    if ($.isNumeric(cod)) {
        var codcal = (sum * parseFloat(cod)) / 100;
        grandtotal = grandtotal + codcal;

    }
    $('#GrandTotal').val(grandtotal);
    // sum = sum- dicount 
    //Sum = sum + cod
    //sum = sum + Fee
    //Sum _ Grand Total 

    console.log(sum);
}
var productrowsave = function (name, qty, unit, total, item) {
    console.log(item);
    var id = parseInt($(item).find('.prduct-id').val());
    console.log(id);
    if (isNaN(id)) {
        id = 0;
    }
    $.ajax({
        url: "/Order/SaveNewProduct",
        type: 'post',
        data: { Id: id, ProductName: name, Qty: qty, Price: unit, TotalPrice: total, OrderId: $("#OrderUId").val() },
        success: function (data) {
            console.log(data);
            $(item).find('.prduct-id').val(data.id);
        }
    })
}

var OrderRowKeyUp = function (item,e) { 
    console.log(item);
    var issave = false;
    var tabsave = false;
    if (e.which == "13") {
        issave = true;
    }
    else if (e.which == "9") {
        tabsave = true;
    }
    var inputrow = $(item).parent().parent();    
    CalculateRowTotal(inputrow, issave, tabsave);
}

var OrderRowKeyUpPrice = function (item, e) {
    console.log(item);
    var issave = false;
    var tabsave = false;
    if (e.which == "13") {
        issave = true;
    }
    else if (e.which == "9") {
        tabsave = true;
    }
    var inputrow = $(item).parent().parent().parent().parent();
    CalculateRowTotal(inputrow, issave, tabsave);
}
var NewOrderValidation = function () {
    var result = true;
    if ($("#ReceiverName").val() == "") {
        $("#ReceiverName").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#ReceiverMobileNumber").val() == "") {
        $("#ReceiverMobileNumber").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#AmountToCollect").val() == "") {
        $("#AmountToCollect").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#Address").val() == "") {
        $("#Address").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#Category").val() == "") {
        $("#Category").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#DeliveryTime").val() == "") {
        $("#DeliveryTime").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#Weight").val() == "") {
        $("#Weight").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#Fees").val() == "") {
        $("#Fees").attr("style", "border-color:red;");
        result = false;
    }

    return result;
}

var NewEquipmentRow = "<tr>"
    + "<td valign='top' class='rowindex'></td>"
    + "<td valign='top'><input type='text'class='form-control product-name' id='ProductName' placeholder = 'Product Name' onKeyup='OrderRowKeyUp(this)' onkeydown='ProductSearchKeyDown(this, event)' /></td>"
    + "<td valign='top'><input type='text'class='form-control product-qty' id='Qty' placeholder = 'Quantity' onKeyup='OrderRowKeyUp(this,event)' onkeydown='QtySearchKeyDown(this, event)' /></td>"
    

    + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>Tk</span></div><input type='text' class='form-control product-price' onKeyup='OrderRowKeyUpPrice(this,event)' placeholder='Unit Price' /></div></div></td>"
    + "<td valign='top'><div class='input-group'> <div class='input-group-prepend'> <div class='input-group-text'> <span class='currency'>Tk</span> </div> <input type='text' class='form-control product-total-price cls_autofill' id='TotalPrice' onkeyup='OrderRowKeyUpPrice(this,event)' placeholder='Total Price' readonly='readonly'> </div> </div></td>"
    + "<td valign='top' class='tableActions'>"
    + "<input type='hidden' class='prduct-id cls_autofill' value='0' readonly='readonly'>"
    + "<button onclick='DeleteNewOrderRow(this)' class='btn btn-delete'><i class='fa fa-trash'></i></button"
    + "</td>"
    + "</tr>";

$(document).ready(function () {
    if (OrderStatusValue == 'Init') {
        $(".load_pickup_address").load("/Order/LoadPickupAddress?id=" + $("#Merchant").val());
    }
    var ik = 1;
    $(".product-table tbody tr td:first-child").each(function () {
        $(this).text(ik);
        ik += 1;
    });
    $(".top_to_bottom_height").height(window.innerHeight - 100);
    $("#btn_save_order").click(function () {
        if (CommonUiValidation() && NewOrderValidation()
            && $("#ReceiverName").val() != "" && $("#ReceiverMobileNumber").val() != "" && $("#AmountToCollect").val() != "" && $("#Address").val() != "" && $("#Category").val() != "" && $("#DeliveryTime").val() != "" && $("#Weight").val() != "" && $("#Fees").val() != "") {
            saveandnew = false;
            SaveNewOrder();
        }
    });
    $("#btn_save_order_new").click(function () {
        if (CommonUiValidation() && NewOrderValidation()
            && $("#ReceiverName").val() != "" && $("#ReceiverMobileNumber").val() != "" && $("#AmountToCollect").val() != "" && $("#Address").val() != "" && $("#Category").val() != "" && $("#DeliveryTime").val() != "" && $("#Weight").val() != "" && $("#Fees").val() != "") {
            saveandnew = true;
            SaveNewOrder();
        }
    });
    $("#btn_status_save").click(function () {
        if ($("#Status").val() != "-1" && $("#Status").val() != "" && $("#Status").val() != undefined) {
            SaveStatusLog();
        }
    });
    $("#btn_showlogs").click(function () {
        OpenTopToBottomModal("/Order/GetListStatusLogByOrderId/?OrderId=" + $("#OrderUId").val());
    });
    $("#Fees").keyup(function () {
        CalculateGrandTotal();
    });
    $("#CODFee").keyup(function () {
        CalculateGrandTotal();
    });
    $("#Discount").keyup(function () {
        CalculateGrandTotal();
    });
    //$("#product-table tbody tr").keyup(function (item) {
    //    console.log(item);
    //    var inputrow = $(item.target).parent().parent();
    //    CalculateRowTotal(inputrow);
    //});
    $("#MerchantId").change(function () {
        $(".load_pickup_address").load("/Order/LoadPickupAddress?id=" + $("#MerchantId").val());
    })
    $("#Status").change(function () {
        var statusvalue = $(this).val();
        statusvalue = statusvalue.trim();
        if (statusvalue == 'AssignPickupAgent' || statusvalue == 'DeliveryAgentAssign' || statusvalue == 'DeliveryManAssigned' || statusvalue == 'ReassignDeliveryAgent') {
            $("#RiderUserId").show();
            /*$("#RiderUserId").val('-1');*/
        }
        else {
            $("#RiderUserId").hide();
        }
    })
    var Selectedstatusvalue = $("#Status").val();
    Selectedstatusvalue = Selectedstatusvalue.trim();
    if (Selectedstatusvalue == 'AssignPickupAgent' || Selectedstatusvalue == 'DeliveryAgentAssign' || Selectedstatusvalue == 'DeliveryManAssigned' || Selectedstatusvalue == 'ReassignDeliveryAgent') {
        $("#RiderUserId").show();
    }
    else {
        $("#RiderUserId").hide();
    }
    //$("#District").change(function () {
    //    $(".load_City").load("/Order/LoadCity?id=" + $("#District").val());
    //})
    //$("#City").change(function () {
    //    $(".load_zone").load("/Order/LoadZones?cityval=" + $("#City").val());
    //})
    $("#ReceiverName").keyup(function () {
        if ($("#ReceiverName").val() == "") {
            $("#ReceiverName").attr("style", "border-color:red;");
        }
        else {
            $("#ReceiverName").attr("style", "border-color:#ccc;");
        }
    })
    $("#ReceiverMobileNumber").keyup(function () {
        if ($("#ReceiverMobileNumber").val() == "") {
            $("#ReceiverMobileNumber").attr("style", "border-color:red;");
        }
        else {
            $("#ReceiverMobileNumber").attr("style", "border-color:#ccc;");
        }
    })
    $("#AmountToCollect").keyup(function () {
        if ($("#AmountToCollect").val() == "") {
            $("#AmountToCollect").attr("style", "border-color:red;");
        }
        else {
            $("#AmountToCollect").attr("style", "border-color:#ccc;");
        }
    });
    $("#Address").keyup(function () {
        if ($("#Address").val() == "") {
            $("#Address").attr("style", "border-color:red;");
        }
        else {
            $("#Address").attr("style", "border-color:#ccc;");
        }
    })
    $("#Category").keyup(function () {
        if ($("#Category").val() == "") {
            $("#Category").attr("style", "border-color:red;");
        }
        else {
            $("#Category").attr("style", "border-color:#ccc;");
        }
    })
    $("#DeliveryTime").keyup(function () {
        if ($("#DeliveryTime").val() == "") {
            $("#DeliveryTime").attr("style", "border-color:red;");
        }
        else {
            $("#DeliveryTime").attr("style", "border-color:#ccc;");
        }
    })
    $("#Weight").keyup(function () {
        if ($("#Weight").val() == "") {
            $("#Weight").attr("style", "border-color:red;");
        }
        else {
            $("#Weight").attr("style", "border-color:#ccc;");
        }
    })
    $("#Fees").keyup(function () {
        if ($("#Fees").val() == "") {
            $("#Fees").attr("style", "border-color:red;");
        }
        else {
            $("#Fees").attr("style", "border-color:#ccc;");
        }
    })
    $(".product-table tbody").on('click', 'tr:last', function (e) {
        if ($(e.target).hasClass('fa')) {
            return;
        }
        $("#product-table tbody tr:last").after(NewEquipmentRow);
        var i = 1;
        $(".product-table tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
    });
    $(".product-table tbody").on('click', 'tr td i.fa-trash-o', function (e) {
        $(this).parent().parent().remove();
        var i = 1;
        if ($(".product-table tbody tr").length < 2) {
            $("#product-table tbody tr:last").after(NewEquipmentRow);
        }
        $(".product-table tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
        //CalculateNewBookingAmount();
    });
    $("#District").change(function () {
        var selectedvalue = $(this).val();
        if (selectedvalue != '-1') {
            $.ajax({
                url: "/Order/FindingCity",
                type: 'post',
                data: { District: selectedvalue },
                success: function (data) {
                    if (data.result) {
                        $("#City").html('');
                        var html = '';
                        for (var i = 0; i < data.model.length; i++) {
                            if (i == 0) {
                                html = '<option value="-1">City</option>';
                                html += '<option value="' + data.model[i].dataValue + '">' + data.model[i].displayText + '</option>';
                            }
                            else {
                                html += '<option value="' + data.model[i].dataValue + '">' + data.model[i].displayText + '</option>';
                            }
                        }
                        $("#City").html(html);
                        $("#Zone").html('');
                        var html1 = '<option value="-1">Zone</option>';
                        $("#Zone").html(html1);
                        $("#Area").html('');
                        var html2 = '<option value="-1">Area</option>';
                        $("#Area").html(html2);
                    }
                    else {
                        $("#City").html('');
                        var html = '<option value="-1">City</option>';
                        $("#City").html(html);
                        $("#Zone").html('');
                        var html1 = '<option value="-1">Zone</option>';
                        $("#Zone").html(html1);
                        $("#Area").html('');
                        var html2 = '<option value="-1">Area</option>';
                        $("#Area").html(html2);
                    }
                }
            });
        }
        else {
            $("#City").html('');
            var html = '<option value="-1">City</option>';
            $("#City").html(html);
            $("#Zone").html('');
            var html1 = '<option value="-1">Zone</option>';
            $("#Zone").html(html1);
            $("#Area").html('');
            var html2 = '<option value="-1">Area</option>';
            $("#Area").html(html2);
        }
    });

    $("#City").change(function () {
        var selectedvalue = $(this).val();
        console.log(selectedvalue);
        if (selectedvalue != '-1') {
            $.ajax({
                url: "/Order/FindingZone",
                type: 'post',
                data: { City: selectedvalue },
                success: function (data) {
                    if (data.result) {
                        $("#Zone").html('');
                        var html = '';
                        for (var i = 0; i < data.model.length; i++) {
                            if (i == 0) {
                                html = '<option value="-1">Zone</option>';
                                html += '<option value="' + data.model[i].dataValue + '">' + data.model[i].displayText + '</option>';
                            }
                            else {
                                html += '<option value="' + data.model[i].dataValue + '">' + data.model[i].displayText + '</option>';
                            }
                        }
                        $("#Zone").html(html);
                    }
                    else {
                        $("#Zone").html('');
                        var html = '<option value="-1">Zone</option>';
                        $("#Zone").html(html);
                    }
                }
            });
        }
        else {
            $("#Zone").html('');
            var html = '<option value="-1">Zone</option>';
            $("#Zone").html(html);
        }
    });
    $("#Zone").change(function () {
        var selectedvalue = $(this).val();
        console.log(selectedvalue);
        if (selectedvalue != '-1') {
            $.ajax({
                url: "/Order/FindingArea",
                type: 'post',
                data: { Zone: selectedvalue },
                success: function (data) {
                    if (data.result) {
                        $("#Area").html('');
                        var html = '';
                        for (var i = 0; i < data.model.length; i++) {
                            if (i == 0) {
                                html = '<option value="-1">Area</option>';
                                html += '<option value="' + data.model[i].dataValue + '">' + data.model[i].displayText + '</option>';
                            }
                            else {
                                html += '<option value="' + data.model[i].dataValue + '">' + data.model[i].displayText + '</option>';
                            }
                        }
                        $("#Area").html(html);
                    }
                    else {
                        $("#Area").html('');
                        var html = '<option value="-1">Area</option>';
                        $("#Area").html(html);
                    }
                }
            });
        }
        else {
            $("#Area").html('');
            var html = '<option value="-1">Area</option>';
            $("#Area").html(html);
        }
    });
})


var DeleteNewOrderConfirmed = function (id) {
    $.ajax({
        type: 'POST',
        url: "/Order/DeleteOrder",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log("deleteneworder");
            OpenSuccessMessageNew("Success", "Deleted Successfully!", function () {
                window.location.reload();
            });
        },
        error: function (request, error) {

        }
    });
}
var DeleteNewOrder = function (id) {
    OpenConfirmationMessageNew("", "Are You Sure You Want To Delete?", function () {
        DeleteNewOrderConfirmed(id);
    })
}

var DeleteNewOrderRow = function (item) {
    console.log(item);
    if ($('.product-name').length > 1)
        var removeDom = $(item).parent();
    var id = parseInt($(removeDom).find('.prduct-id').val());
    if (!isNaN(id)) {
        $.ajax({
            type: 'POST',
            url: "/Order/DeleteProduct",
            data: { id: id },
            dataType: "json",
            success: function (data) {
                console.log('deteled row');
            }
        });
    }
    $($(item).parent().parent()).remove();
}