var picker1 = [];
//var NewEquipmentRow = "<tr>"
//    + "<td valign='top' class='rowindex'></td>"
//    + "<td valign='top'><input type='text'class='form-control product-name' datarequired='false' id='ProductName' placeholder = 'Product Name' onKeyup='OrderRowNewSaleKeyUp(this)' />"
//    + "<div class='tt-menu'>"
//    + "<div class='tt-dataset tt-dataset-autocomplete'> </div>"
//    + "</div>"
//    + "</td> "
//    + "<td valign='top' class='untdrop'>" + $('#unitdropdown').html() + "</td>"
//    + "<td valign='top'><input type='text'class='form-control product-qty' id='Qty' placeholder = 'Quantity' onKeyup='QuantitySaleKeyUp(this,event)' /></td>"
//    + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>Tk</span></div><input type='text' class='form-control product-price' onKeyup='RateKeyUpPrice(this,event)' placeholder='Rate' /></div></div></td>"
//    + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>Tk</span></div><input type='text' class='form-control product-discount' onKeyup='RateKeyUpPrice(this,event)' placeholder='Discount' /></div></div></td>"
//    + "<td valign='top'><div class='input-group'> <div class='input-group-prepend'> <div class='input-group-text'> <span class='currency'>Tk</span> </div> <input type='text' class='form-control product-total-price cls_autofill' id='TotalPrice' onkeyup='OrderSalesRowKeyUpPrice(this,event)' placeholder='Total amount'  disabled='disabled' readonly='readonly'> </div> </div></td>"
//    + "<td valign='top' class='tableActions'>"
//    + "<input type='hidden' class='prduct-id cls_autofill' value='0' readonly='readonly'>"
//    + "<button onclick='DeleteNewOrderRow(this)' class='btn btn-delete'><i class='fa fa-trash'></i></button"
//    + "</td>"
//    + "</tr>";
var DeleteNewOrderRow = function (item) {
    if ($('.product-name').length > 1)
        var removeDom = $(item).parent();
    //var id = parseInt($(removeDom).find('.prduct-id').val());
    //if (!isNaN(id)) {
    //    $.ajax({
    //        type: 'POST',
    //        url: "/Order/DeleteProduct",
    //        data: { id: id },
    //        dataType: "json",
    //        success: function (data) {
    //            console.log('deteled row');
    //        }
    //    });
    //}
    $($(item).parent().parent()).remove();
}
var ReturnNewOrderRow = function (item) {
    if ($('.product-name').length > 1)
        var removeDom = $(item).parent();
    $($(item).parent().parent()).remove();
    /*CalculatePosSalesGrandTotal()*/
}
var PropertyProductSuggestiontemplate =
    '<div class="tt-suggestion tt-selectable" data-select="{1}" data-price="{4}" data-type="{5}" data-id="{0}"  data-description="{2}">'
    + "<p class='tt-sug-text'>"
    + "<em class='tt-sug-type'></em>{1}"
    + "<em class='tt-eq-price'> Purchase price: " + 'Tk ' + "{3}</em>"
    + "<em class='tt-eq-des'>" + ': ' + "{2}</em>"
    + "<br />"
    + "</p> "
    + "</div>";
var InvoiceProductSuggestionClickbind = function (item) {
    $('.product-table .tt-suggestion').click(function () {
        var clickitem = this;
        $('.product-table .tt-menu').hide();
        var olditm = item;
        $(item).val($(clickitem).attr('data-select'));
        $(item).attr('data-id', $(clickitem).attr('data-id'));

        var itemName = $(item).parent().find('span');
        $(itemName).text($(item).val());
        var imageItemRate = $(item).parent().parent().find('.product_img');
        $(imageItemRate).val($(this).attr('data-img'));

        $(item).parent().parent().attr('data-id', $(clickitem).attr('data-id'));
        $(item).parent().parent().addClass('HasItem');
        var spnItemRate = $(item).parent().parent().find('.product-price');
        $(spnItemRate).val($(this).attr('data-price'));
        var txtItemUnit = $(item).parent().parent().find('.product-unit');
        $(txtItemUnit).val($(this).attr('data-type'));
        var txtItemQty = $(item).parent().parent().find('.product-qty');
        $(txtItemQty).val(1);
        CalculateNewAmount(olditm);
    });
    $('.product-table .tt-suggestion').hover(function () {
        var clickitem = this;
        $('.tt-suggestion').removeClass("active");
        $(clickitem).addClass('active');
    });
}
var InvoiceProductNewCashSuggestionClickbind = function (item) {
    $('.product-table-new .tt-suggestion').click(function () {
        var clickitem = this;
        $('.product-table-new .tt-menu').hide();
        var olditm = item;
        $(item).val($(clickitem).attr('data-select'));
        $(item).attr('data-id', $(clickitem).attr('data-id'));

        var itemName = $(item).parent().find('span');
        $(itemName).text($(item).val());
        var imageItemRate = $(item).parent().parent().find('.product_img');
        $(imageItemRate).val($(this).attr('data-img'));

        $(item).parent().parent().attr('data-id', $(clickitem).attr('data-id'));
        $(item).parent().parent().addClass('HasItem');
        var spnItemRate = $(item).parent().parent().find('.product-price');
        $(spnItemRate).val($(this).attr('data-price'));
        var txtItemUnit = $(item).parent().parent().find('.product-unit');
        $(txtItemUnit).val($(this).attr('data-type'));
        var txtItemQty = $(item).parent().parent().find('.product-qty');
        $(txtItemQty).val(1);
        CalculateNewAmount(olditm);
    });
    $('.product-table-new .tt-suggestion').hover(function () {
        var clickitem = this;
        $('.tt-suggestion').removeClass("active");
        $(clickitem).addClass('active');
    });
}
var CalculateNewAmount = function (item) {
    var inputrow = $(item).parent().parent().parent().parent();
    console.log(inputrow)
    var qty = $(item).parent().parent().find('.product-qty').val();
    var uprice = $(item).parent().parent().find('.product-price').val();
    var total = 0;
    if ($.isNumeric(qty) && $.isNumeric(uprice)) {
        total = uprice * qty;
        $($(item).parent().parent().find('.product-total-price')).val(total);
    }
    var items = $('.product-total-price');
    var sum = 0;
    for (var i = 0; i < items.length; i++) {
        var vauei = parseFloat($(items[i]).val());
        if ($.isNumeric(vauei)) {
            sum += vauei;
        }
    }
    var itemsdis = $('.product-discount');
    var discp = 0;
    for (var i = 0; i < itemsdis.length; i++) {
        var vauei = parseFloat($(itemsdis[i]).val());
        if ($.isNumeric(vauei)) {
            discp += vauei;
        }
    }
    var returnamt = parseFloat($('#ReturnAmount').val());
    if (isNaN(returnamt)) { returnamt = 0; }
    var grandtotal = sum - returnamt - discp;
    $('#SubTotal').val(sum).toFixed(2);
    $('#GrandTotal').val(grandtotal);
    $('#DiscountAmount').val(discp);
}
var CalculateSalesGrandTotal = function (item) {
    var items = $(item).parent().find('.product-total-price');
    var itemsdis = $(item).parent().find('.product-discount');
    var sum = 0;
    for (var i = 0; i < items.length; i++) {
        var vauei = parseFloat($(items[i]).val());
        if ($.isNumeric(vauei)) {
            sum += vauei;
        }
    }
    var discp = 0;
    for (var i = 0; i < itemsdis.length; i++) {
        var vauei = parseFloat($(itemsdis[i]).val());
        if ($.isNumeric(vauei)) {
            discp += vauei;
        }
    }
    var returnamt = parseFloat($(item).parent().parent().parent().find('#ReturnAmount').val());
    if (isNaN(returnamt)) { returnamt = 0;}
    var grandtotal = sum - returnamt /*- discp*/;
    $(item).parent().parent().parent().find('#SubTotal').val(sum).toFixed(2);
    $(item).parent().parent().parent().find('#GrandTotal').val(grandtotal);
    $(item).parent().parent().parent().find('#DiscountAmount').val(discp);
}
var CalculateSalesRowTotal = function (inputrow) {
    var qty = parseFloat($(inputrow).find('.product-qty').val());
    var disc = parseFloat($(inputrow).find('.product-discount').val());
    if (isNaN(qty)) {
        qty = 0;
    }
    var uprice = parseFloat($(inputrow).find('.product-price').val());
    if (isNaN(uprice)) {
        uprice = 0;
    }
    var total = 0;
    if ($.isNumeric(qty) && $.isNumeric(uprice)) {
        total = (uprice * qty) - disc;
        $($(inputrow).find('.product-name')).attr('datarequired', 'true');
        $($(inputrow).find('.product-total-price')).val(total);
    }
    else {
        $($(inputrow).find('.product-name')).attr('datarequired', 'false');
    }
    CalculateSalesGrandTotal(inputrow);

}
var OrderSalesRowKeyUpPrice = function (item, e) {
    var inputrow = $(item).parent().parent();
    CalculateSalesRowTotal(inputrow);
}
var QuantitySaleKeyUp = function (item, e) {
    var inputrow = $(item).parent().parent();
    CalculateSalesRowTotal(inputrow);
}
var RateKeyUpPrice = function (item, e) {
    var inputrow = $(item).parent().parent().parent().parent();
    CalculateSalesRowTotal(inputrow);
}
var OrderRowNewSaleKeyUp = function (item, e) {
    console.log(e.keyCode);
    var inputrow = $(item).parent().parent();
    if ($(item).val() != "") {
        $.ajax({
            url: "/Product/SearchProductForOrderRow",
            type: 'post',
            data: {
                Searchtext: $(item).val(),
            },
            success: function (data) {
                console.log(data)
                if (data.result != "") {
                    var resultparse = JSON.parse(data.result);
                    if (resultparse.length > 0) {
                        var searchresultstring = "<div class='NewProjectSuggestion'>";
                        for (var i = 0; i < resultparse.length; i++) {
                            searchresultstring = searchresultstring + jQuery.validator.format(PropertyProductSuggestiontemplate,
                        /*0*/resultparse[i].Id,
                        /*1*/ resultparse[i].Name.replaceAll('"', '\'\''),
                        /*2*/ resultparse[i].Description,
                        /*3*/resultparse[i].PrimaryPrice,
                        /*4*/ resultparse[i].SalesPrice,
                        /*5*/ resultparse[i].PrimaryUnit,
                        /*6*/ resultparse[i].FileLoc);
                        }
                        searchresultstring += "</div>";
                        var ttdom = $($(item).parent()).find('.tt-menu');
                        var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                        $(ttdomComplete).html(searchresultstring);
                        $(ttdom).show();
                        InvoiceProductSuggestionClickbind(item)
                        if (resultparse.length > 4) {
                            $(".NewProjectSuggestion").height(352);
                            $(".NewProjectSuggestion").css('position', 'relative');
                        }
                    }
                    if (resultparse.length == 0)
                        $('.tt-menu').hide();
                }
            }
        });
    }
    
}
var OrderRowNewCashSaleKeyUp = function (item, e) {
    console.log(e.keyCode);
    var inputrow = $(item).parent().parent();
    if ($(item).val() != "") {
        $.ajax({
            url: "/Product/SearchProductForOrderRow",
            type: 'post',
            data: {
                Searchtext: $(item).val(),
            },
            success: function (data) {
                console.log(data)
                if (data.result !== "") {
                    var resultparse = JSON.parse(data.result);
                    if (resultparse.length > 0) {
                        
                        var searchresultstring = "<div class='NewProjectSuggestion'>";
                        for (var i = 0; i < resultparse.length; i++) {
                            searchresultstring = searchresultstring + jQuery.validator.format(PropertyProductSuggestiontemplate,
                        /*0*/resultparse[i].Id,
                        /*1*/ resultparse[i].Name.replaceAll('"', '\'\''),
                        /*2*/ resultparse[i].Description,
                        /*3*/resultparse[i].PrimaryPrice,
                        /*4*/ resultparse[i].SalesPrice,
                        /*5*/ resultparse[i].PrimaryUnit);
                        }
                        searchresultstring += "</div>";
                        var ttdom = $($(item).parent()).find('.tt-menu');
                        var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                        $(ttdomComplete).html(searchresultstring);
                        $(ttdom).show();
                        InvoiceProductNewCashSuggestionClickbind(item)
                        if (resultparse.length > 4) {
                            $(".NewProjectSuggestion").height(352);
                            $(".NewProjectSuggestion").css('position', 'relative');
                        } 
                    }
                    if (resultparse.length == 0)
                        $('.tt-menu').hide();
                }
            }
        });
    }

}
var ListProductsCustom = [];
var SaveNewSale = function () {
    if ($("#btn_save_invoice").hasClass('is_cash_sale')) {
        SaveNewCashSale()
    } else {
        if (true) {
            $("#product-table tbody tr").each(function () {
                if ($(this).find('td .product-name').val() != '') {
                    var id = $(this).attr('data-id');
                    ListProductsCustom.push({
                        ProductName: $(this).find('td .product-name').val(),
                        Rate: $(this).find('td .product-price').val(),
                        Unit: $(this).find('td .product-unit').val(),
                        Quanity: $(this).find('td .product-qty').val(),
                        DiscountAmount: $(this).find('td .product-discount').val(),
                        TotalAmount: $(this).find('td .product-total-price').val(),
                        Id: $(this).attr('data-id')
                    });
                }
            });
            var requestData = {
                Id: $("#Invoice_Id").val(),
                InvoiceId: $("#Invoice_InvoiceId").val(),
                SalesDate: $("#Invoice_SalesDate").val(),
                VoucherNumber: $("#Invoice_VoucherNumber").val(),
                Description: $("#Invoice_Description").val(),
                TransactionType: $("#TransactionType").val(),
                TransactionId: $("#TransactionId").val(),
                DiscountAmount: $("#DiscountAmount").val(),
                PartialAmount: $("#PartialAmount").val(),
                SoldBy: $("#Invoice_SoldBy").val(),
                CreatedBy: $("#Invoice_SoldFrom").val(),
                InvoiceDetailList: ListProductsCustom
            };
            $.ajax({
                url: "/Inventory/SaveNewSale",
                type: 'post',
                data: requestData,
                beforeSend: function () {
                    POSModal.Show();
                },
                success: function (data) {
                    POSModal.Hide();
                    if (data.success) {
                        OpenSuccessMessageNew("Success!", data.message);
                        window.location.reload()
                    } else {
                        OpenErrorMessageNew("Sorry!", data.message);
                    }
                }
            });
        }
    }
}
var ListCashProductsCustom = [];
var SaveNewCashSale = function () {
    if (CommonUiValidation()) {
        $("#product-table-new tbody tr").each(function () {            
            if ($(this).find('td .product-name').val() != '') {
                var id = $(this).attr('data-id');
                ListCashProductsCustom.push({
                    ProductName: $(this).find('td .product-name').val(),
                    Rate: $(this).find('td .product-price').val(),
                    Unit: $(this).find('td .product-unit').val(),
                    Quanity: $(this).find('td .product-qty').val(),
                    DiscountAmount: $(this).find('td .product-discount').val(),
                    TotalAmount: $(this).find('td .product-total-price').val(),
                    Id: $(this).attr('data-id')
                });
            }
        });
        var requestData = {
            Id: $("#Invoice_Id").val(),
            InvoiceId: $("#Invoice_InvoiceId").val(),
            SalesDate: $("#Invoice_SalesDate").val(),
            VoucherNumber: $("#Invoice_VoucherNumber").val(),
            Description: $("#Invoice_Description").val(),
            TransactionType: $("#TransactionType").val(),
            TransactionId: $("#TransactionId").val(),
            DiscountAmount: $("#DiscountAmount").val(),
            PartialAmount: $(".cash_sale_bottom tbody tr").find('td #PartialAmount').val(),
            InvoiceDetailList: ListCashProductsCustom
        };
        $.ajax({
            url: "/Inventory/SaveNewSale",
            type: 'post',
            data: requestData,
            beforeSend: function () {
                $('#place_new_porder_loader').show();
            },
            success: function (data) {
                if (data.success) {
                    OpenSuccessMessageNew("Success!", data.message);
                    window.location.reload(function () {
                        $('#btn_exchange').click()
                    })
                } else {
                    OpenErrorMessageNew("Sorry!", data.message);
                }
            }
        });
    }

}
var PrintPosDetail = function () {
    var id = $('#Invoice_InvoiceId').val();
    var parm = '?ids=' + id;
    OpenTopToBottomModal('/Sales/SalesPrintPreviewPage' + parm);
}
function ReturnProduct(id, item) {
    OpenRightToLeftModal('/Inventory/ReturnProductPartial?id=' + id);
}
var DeleteInvoice = function (id) {
    console.log(id);
    OpenConfirmationMessageNew('Warning', 'Are you sure want to delete? All invoice related data will be lost!', function () {
        $.ajax({
            url: '/Inventory/DeleteCutomerInvoice',
            type: 'post',
            data: { id: id },
            success: function (data) {
                console.log(data);
                if (data.result === true) {
                    window.location = '/sales';
                }
            }
        });
    })
}
$(document).ready(function () {
    $('.newsalesdate_picker').each(function (idx) {
        picker1[idx] = new Pikaday({
            field: this,
            format: 'MM-DD-YYYY',
        });
    });
    $(".returned_prod").load("/Inventory/ReturnProductListPartial?invoiceid=" + $('#Invoice_InvoiceId').val());
    $(".flip-box").height(window.innerHeight - 127);
    $("#btn_exchange").click(function () {
        $(".flip-box-inner").toggleClass("rotate_class")
        $("#btn_save_invoice").toggleClass("is_cash_sale")
    })
    $(".product-table tbody").on('click', 'tr:last', function (e) {
        if ($(e.target).hasClass('fa')) {
            return;
        }
        //$("#product-table tbody tr:last").after(NewEquipmentRow);
        //var i = 1;
        //$(".product-table tbody tr td:first-child").each(function () {
        //    $(this).text(i);
        //    i += 1;
        //});
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
    });
    //$(".product-table-new tbody").on('click', 'tr:last', function (e) {
    //    if ($(e.target).hasClass('fa')) {
    //        return;
    //    }
    //    $("#product-table-new tbody tr:last").after(NewEquipmentRow);
    //    var i = 1;
    //    $(".product-table-new tbody tr td:first-child").each(function () {
    //        $(this).text(i);
    //        i += 1;
    //    });
    //});
    //$(".product-table-new tbody").on('click', 'tr td i.fa-trash-o', function (e) {
    //    $(this).parent().parent().remove();
    //    var i = 1;
    //    if ($(".product-table-new tbody tr").length < 2) {
    //        $("#product-table-new tbody tr:last").after(NewEquipmentRow);
    //    }
    //    $(".product-table-new tbody tr td:first-child").each(function () {
    //        $(this).text(i);
    //        i += 1;
    //    });
    //});
})