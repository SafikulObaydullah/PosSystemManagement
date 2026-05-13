////$(window).resize(function () {
////    $("select").select2({
////        dropdownParent: $('.rtl_inner_height')
////    });

//const { Alert } = require("../lib/bootstrap/dist/js/bootstrap.bundle");

////})
//var NewProductPurchaseValidation = function () {
//    var isvalid = true;
//    if ($("#vendor").val() == "" || $("#vendor").val() == "-1") {
//        $("#vendor").addClass('required')
//        isvalid = false;
//    }
//    if ($("#Product").val() == "" || $("#Product").val() == "-1") {
//        $("#Product").addClass('required')
//        isvalid = false;
//    }
//    if ($("#Unit").val() == "" || $("#Unit").val() == "0") {
//        $("#Unit").addClass('required')
//        isvalid = false;
//    }
//    if ($("#PurchaseUnitInt").val() == "" || $("#PurchaseUnitInt").val() == "0") {
//        $("#PurchaseUnitInt").addClass('required')
//        isvalid = false;
//    }
//    if ($("#PurchaseQuantity").val() == "" || $("#PurchaseQuantity").val() == "0") {
//        $("#PurchaseQuantity").addClass('required')
//        isvalid = false;
//    }
//    if ($("#PurchasePrice").val() == "" || $("#PurchasePrice").val() == "0") {
//        $("#PurchasePrice").addClass('required')
//        isvalid = false;
//    }
//    if ($("#TransactionType").val() == "" || $("#TransactionType").val() == "-1") {
//        $("#TransactionType").addClass('required')
//        isvalid = false;
//    }
//    return isvalid;
//}
var myAddProductPurchaseRow = function (item) {
    var selectdval = $(item).val();
    var unitintcount = 0;
    var divId = $(item).parent().parent().parent();
    var prival = $(divId).find('.primary-name').val();
    var secval = $(divId).find('.secondary-name').val();
    var terval = $(divId).find('.wholesale-name').val();
    
    $(divId).find('.product-unit').attr('title', '1');
    if (selectdval == prival) {
        unitintcount = 1;
    }
    else if (selectdval == terval) {
        unitintcount = parseFloat($(divId).find('.tertiary-unit-int').val());
        //$(divId).find('.product-unit').attr('title', terqty);
    }
    else if (selectdval == secval) {
        unitintcount = parseFloat($(divId).find('.secondary-unit-int').val());
        //$(divId).find('.product-unit').attr('title', secqty);
    }

    if (isNaN(unitintcount)) { unitintcount = 0; }
    $(divId).find('.Product-Unit-Int').val(unitintcount);
}
var InvoiceProductSuggestionClickbind = function (item) {
    $('.product-table .tt-suggestion').click(function () {
        var clickitem = this;
        $('.product-table .tt-menu').hide();
        $(item).val($(clickitem).attr('data-select'));
        $(item).attr('data-id', $(clickitem).attr('data-id'));

        var itemName = $(item).parent().find('span');
        $(itemName).text($(item).val());

        $(item).parent().parent().attr('data-id', $(clickitem).attr('data-id'));
        $(item).parent().parent().addClass('HasItem');
        var txtItemUnit = $(item).parent().parent().find('.product-unit');
        $(txtItemUnit).val($(this).attr('data-type'));
        var txtItemQty = $(item).parent().parent().find('.product-qty');
        $(txtItemQty).val(1);
    });
    $('.product-table .tt-suggestion').hover(function () {
        var clickitem = this;
        $('.tt-suggestion').removeClass("active");
        $(clickitem).addClass('active');
    });
}
var DeleteNewOrderRowProduct = function (item) {
    if ($('.product-name').length > 1)
        var removeDom = $(item).parent();
    $($(item).parent().parent()).remove();

}
//var AddSameRowProduct = function (item) {
//    if ($('.product-name').length > 1)
//        var removeDom = $(item).parent();
//    $($(item).parent().parent()).row.add();

//}
var SuggestionAddPurchaseProduct = function (id, e, item) {
    console.log('hghf');
    $('.search2.tt-menu').hide();
    var txt = $(item).attr('data-select');
    $('.pos_search').val(txt);
    AddPurchaseProduct(id, e, item);
}
var AddSameRowProduct = function (id, item) {
    $(item).hide();
    //$(item).addClass("hidden");
    AddPurchaseProduct(id);
}
function AddPurchaseProduct(id, e, item) {
    /*if (e.keyCode == 13) {*/
        $.ajax({
            url: "/Inventory/GetProductToPurchase?id=" + id,
            type: 'post',
            beforeSend: function () {
                POSModal.Show(); 
            },
            success: function (data) {
                if (data.success) {
                    console.log(data)
                    var selecttemplate = '<select class="form-control product-unit" title="1" onchange = "myAddProductPurchaseRow(this)">';
                    var optiontemplate = '<option value="' + data.result.primaryUnit + '">' + data.result.primaryUnit + ' [P]</option>';
                    if (data.result.secondaryUnit != null && data.result.secondaryUnit != '' && data.result.secondaryUnit != '-1') {
                        optiontemplate += '<option value="' + data.result.secondaryUnit + '">' + data.result.secondaryUnit + ' [S]</option>';
                    }
                    if (data.result.tertiaryUnit != null && data.result.tertiaryUnit != '' && data.result.tertiaryUnit != '-1') {
                        optiontemplate += '<option value="' + data.result.tertiaryUnit + '">' + data.result.tertiaryUnit + ' [T]</option>';
                    }
                    selecttemplate += optiontemplate + '</select>';
                    setTimeout(function () {
                        var NewPosAddFromSuggRowCustom = "<tr data-id='{2}' class='newp_{2} itemclass'>"
                            + "<td valign='top' class='tableActions'>"
                            + "<input type='hidden' class='prduct-id cls_autofill' value='{2}' readonly='readonly'>"
                            + "<i title='Delete row' class='fa fa-trash' onclick='DeleteNewOrderRowProduct(this)'></i>"
                            + "<i title='Add new row' class='fa fa-plus-circle' style ='float: right;' onclick='AddSameRowProduct({2}, this)'></i>"
                            + "</td>"
                            + "<td class='hov_td' style='position:relative' valign='top' title=''><span style='position: absolute; font-size: 10px;right: 16px;bottom: 15px;'></span><input readonly='readonly' value='{0}' type='text'class='form-control product-name' id='ProductName' placeholder = 'Product Name' />"
                            + "</td>"
                            + "<td valign='top'>"
                            + "<div class='input-group'>"
                            + selecttemplate + "<input value='1' oninput='validity.valid || (value = 1)' type='number' min='1' class='form-control product-qty' id='Qty' placeholder='0' />" /*onKeyup = 'OrderPosSalesRowKeyUpQty(this,event)'  onchange = 'OrderPosSalesRowKeyUpQty(this,event)' onclick = 'OrderPosSalesRowKeyUpQty(this,event)'*/
                            + "</div>"
                            + "<input type='hidden' class='tertiary-unit-int' value='{4}'>"
                            //+ "<input type='hidden' class='wholesale-value' value='{10}'>"
                            + "<input type='hidden' class='secondary-unit-int' value='{5}'>"
                            //+ "<input type='hidden' class='secondary-value' value='{12}'>"
                            + "<input type='hidden' class='primary-name' value='{1}'>"
                            + "<input type='hidden' class='secondary-name' value='{6}'>"
                            + "<input type='hidden' class='wholesale-name' value='{3}'>"
                            + "</td>"
                            + "<td class='hov_td' style='position:relative' valign='top' title=''><input value='1' type='number'class='form-control Product-Unit-Int' placeholder = '1' readonly='readonly' /> <input value='1' type='hidden' class='fixed-Unit-Int' />"
                            + "</td>"
                            + "<td class='hov_td' style='position:relative' valign='top' title=''><select class='form-control transaction-type'><option value='Stock'>Stock</option></select>"
                            + "</td>"
                            + "<td class='hov_td' style='position:relative' valign='top' title=''><input type='number'class='form-control Product-Price' datarequired = 'true' placeholder = '0' />"
                            + "</td>"
                            + "</tr>";
                        var searchresultstring = "";
                        searchresultstring = jQuery.validator.format(NewPosAddFromSuggRowCustom,
                        /*0*/data.result.name,
                        /*1*/data.result.primaryUnit,
                        /*2*/ id,
                        /*3*/data.result.tertiaryUnit,
                        /*4*/ data.result.tertiaryUnitInt,
                        /*5*/ data.result.secondaryUnitInt,
                        /*6*/data.result.secondaryUnit
                        );
                        if ($('#prod_cont tr').length > 0) {
                            var flag = true;
                            $('#product-table tbody tr').each(function () {
                                var gettingid = $(this).attr('data-id');
                                console.log('data: ' + gettingid);
                                console.log('id: ' + id);
                                if (gettingid == id) {

                                    flag = false;
                                    var qty1 = parseInt($(this).find('product-qty').val());
                                    console.log('qty: ' + qty1);
                                    if (isNaN(qty1)) { qty1 = 1; }
                                    qty1++;
                                    $(this).find('product-qty').val(qty1);
                                    var rt1 = parseFloat($(this).find('product-price').val());
                                    if (isNaN(rt1)) { rt1 = 0; }
                                    var dsc1 = parseFloat($(this).find('product-discount').val());
                                    if (isNaN(dsc1)) { dsc1 = 0; }
                                    var amt1 = parseFloat($(this).find('product-total-price').val());
                                    if (isNaN(amt1)) { amt1 = 0; }
                                    amt1 += rt1;
                                    amt1 -= dsc1;
                                    $(this).find('product-total-price').val(amt1.toFixed(2));
                                }
                            });
                          $('#product-table tbody tr:last').after(searchresultstring);
                        }
                        else {
                            $('#prod_cont').append(searchresultstring)
                        }
                        $(".newp_" + id).last().find('td .product-unit').val(data.result.primaryUnit); 
                        POSModal.Hide();
                    }, 10)

                } else {
                    OpenErrorMessageNew('Sorry', data.message); 
                    POSModal.Hide();
                }

            }
        });
     
} 
var PurchaseProductSuggestiontemplate =
    '<div class="tt-suggestion tt-selectable" data-select="{1}"   data-id="{0}"   onclick="SuggestionAddPurchaseProduct({0},event, this)">'
    + "<p class='tt-sug-text'>"
    + "<em class='tt-sug-type'></em>{1}"
    + "<br />"
    + "</p> "
    + "</div>"; 
var SearchProductForPurchase = function (item) {
    var inputrow = $(item);
    if ($(item).val() != "") {
        $.ajax({
            url: "/Inventory/SearchProductForAddPurchase",
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
                            searchresultstring = searchresultstring + jQuery.validator.format(PurchaseProductSuggestiontemplate,
                        /*0*/resultparse[i].Id,
                        /*1*/ resultparse[i].Name.replaceAll('"', '\'\''),
                         /* 2*/ resultparse[i].Description,
                        /*5*/ resultparse[i].PrimaryUnit);
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
                    console.log('b');
                    if (resultparse.length == 0)
                        $('.tt-menu').hide();
                }
            }
        });

    }

}
var SaveNewInventory = function () {
    if (CommonUiValidation()) {
        var url = "/Inventory/SaveNewInventory";
        var list = [];
        $('.itemclass').each(function () {
            list.push({
                PurchaseVendorName: $("#vendor").val(),
                PurchaseDate: $("#Purchase-Date").val(),
                ProductIntID: $(this).find(".prduct-id").val(),
                PurchaseProductName: $(this).find(".product-name").val(),
                PurchaseProductUnit: $(this).find(".product-unit").val(),
                PurchaseUnitInt: $(this).find(".Product-Unit-Int").val(),
                PurchaseQuantity: $(this).find(".product-qty").val(),
                TransactionType: $(this).find(".transaction-type").val(),
                PurchasePrice: $(this).find(".Product-Price").val()
            });
        });
        $.ajax({
            type: 'post',
            url: url,
            data: { SelectedList: list },
            success: function (data) {
                if (data.success) {
                    $(".close-div").trigger("click");
                    PurchaseOperation.CurrentPage = 1;
                    PurchaseOperation.TotalCount = -1;
                    PurchaseOperation.LoadPendingList();
                    OpenSuccessMessageNew("Success!", data.message)
                }
                else {
                    OpenErrorMessageNew("Error", "New Quantity is bigger than Quantity,So this value can't be taken");
                }
            },
            error: function (request, error) {
                console.log("Server Error")
            }
        });
    }
}
//var DeleteProductPurchaseLineItem = function (id) {
//    OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
//        $.ajax({
//            type: 'POST',
//            url: "/Inventory/DeleteProductPurchaseLineItem",
//            data: { id: id },
//            dataType: "json",
//            success: function (data) {
//                OpenSuccessMessageNew("Success!", data.message, "");
//            }
//        });
//    });
//}
$(document).ready(function () {
    //$("select").select2({
    //    dropdownParent: $('#Product')
    //});
    $('#Purchase').click()
    $(".purchase-table tbody").on('click', 'tr:last', function (e) {
        if ($(e.target).hasClass('fa')) {
            return;
        }
        var searchresultstring = jQuery.validator.format(PurchaseProductSuggestiontemplate,
            $("#product-list-id").html(), //0
            $("#unit-list-id").html(), //1
            $("#transactiontype-list-id").html() //2
        );
            $("#purchase-table tbody tr:last").after(searchresultstring);
        var i = 1;
        $(".purchase-table tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
    });
    $(".purchase-table tbody").on('click', 'tr td .fa-trash', function (e) {
        $(this).parent().parent().remove();

        //var id = parseInt($(this).attr("id"));
        //if (!isNaN(id)) {
        //    DeleteProductPurchaseLineItem(id);
        //}
        
        var i = 1;
        if ($(".purchase-table tbody tr").length < 1) {
            var searchresultstring = jQuery.validator.format(PurchaseProductSuggestiontemplate,
                $("#product-list-id").html() //0
            );
            $("#purchase-table tbody tr:last").after(searchresultstring);
        }
        $(".purchase-table tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
    });
})