var PropertyProductSuggestiontemplate =
    '<div class="tt-suggestion tt-selectable" data-select="{1}" data-price="{3}" data-vat="{4}" data-type="{5}" data-id="{0}"  data-description="{2}" onclick="SuggestionAddProduct({0},event, this)">'
    + "<p class='tt-sug-text'>"
    + "<em class='tt-sug-type'></em>{1}"
    + '<span <img class="sugg_img" src="' + domain + '{6}{4}"/></span><br>'
    + "<em class='tt-eq-price'> Purchase price: " + 'K ' + "{3}</em>"
    + "<em class='tt-eq-des'>" + ': ' + "{2}</em>"
    + "<br />"
    + "</p> "
    + "</div>";
var NewPosAddFromSuggRow = "<tr data-id='{3}'>"
    + "<td valign='top' class='tableActions'>"
    + "<input type='hidden' class='prduct-id cls_autofill' value='{3}' readonly='readonly'>"
    + "<i class='fa fa-trash' onclick='DeleteNewOrderRow(this)'></i>"
    + "</td>"
    + "<td valign='top' title='{0}'><input readonly='readonly' value='{0}' type='text'class='form-control product-name' id='ProductName' placeholder = 'Product Name' />"
    + "</td>"
    + "<td valign='top'>"
    + "<div class='input-group'>"
    + $('#unitdropdown').html() + "<input value='1' type='number'class='form-control product-qty' id='Qty' placeholder='0' onKeyup='OrderPosSalesRowKeyUpQty(this,event)'  onchange='OrderPosSalesRowKeyUpQty(this,event)' onclick='OrderPosSalesRowKeyUpQty(this,event)' /></td>"
    + "</div>"
    + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>K</span></div></div><input value='{2}' type='text' class='form-control product-price' readonly='readonly' onKeyup='OrderPosSalesRowKeyUpPrice(this,event)' placeholder='Rate' readonly='readonly'/></div></td>"
    + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>K</span></div></div><input value='{2}' placeholder='0' type='text' class='form-control vat-price' readonly='readonly' onKeyup='OrderPosSalesRowKeyUpPrice(this,event)' placeholder='Vat' readonly='readonly'/></div></td>"
    + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>K</span></div></div><input value=''  placeholder='0' type='text' class='form-control product-discount' onKeyup='OrderPosSalesRowKeyUpQty(this,event)' onchange='OrderPosSalesRowKeyUpQty(this,event)' placeholder='Discount' /></div></td>"
    + "<td valign='top'><div class='input-group'> <div class='input-group-prepend'> <div class='input-group-text'> <span class='currency'>K</span> </div>  </div><input readonly='readonly' value='{2}' type='text' class='form-control product-total-price cls_autofill' id='TotalPrice' placeholder='Total amount'> </div></td>"
    + "</tr>";
var CalculateDiscountAmoount = function () {
    var roductdis = 0;
    $('.product-discount').each(function () {
        if ($.isNumeric($(this).val())) {
            roductdis += parseFloat($(this).val());
        }
    })
    var subtotal = parseFloat($("#sub_tl").val());
    var distype = $("#discountType").val();
    if (isNaN(subtotal)) { subtotal = 0; }
    var discount = parseFloat($("#DiscountAmount").val());
    if (isNaN(discount)) { discount = 0; }
    if (distype == 'percent') {
        discount = (parseFloat(discount) * parseFloat(subtotal)) / 100;
    }
    var partialamt = parseFloat($('#PartialAmount').val());
    if (isNaN(partialamt)) { partialamt = 0; }
    var discal = partialamt + discount;
    var grandtotal = subtotal - discal;
    //var distotal = $.isNumeric(discount) ? discount : 0 + roductdis;
    $('#ProDiscountAmount').val(roductdis);
    $('#tot_amt').html(parseFloat(grandtotal.toFixed(2)));
}
var CalculatePosSalesGrandTotal = function () {
    var items = $('.product-total-price');
    var sum = 0;
    var discount = $.isNumeric(parseFloat($('#DiscountAmount').val())) ? parseFloat($('#DiscountAmount').val()) : 0;
    var distype = $("#discountType").val();
    var partialamt = parseFloat($('#PartialAmount').val());
    if (isNaN(partialamt)) {
        partialamt = 0;
    }
    for (var i = 0; i < items.length; i++) {
        var vauei = parseFloat($(items[i]).val());
        if ($.isNumeric(vauei)) {
            sum += vauei;
        }
    }
    var itemsqty = $('.product-qty');
    var sumqty = 0;
    for (var i = 0; i < itemsqty.length; i++) {
        var vauei = parseFloat($(itemsqty[i]).val());
        if ($.isNumeric(vauei)) {
            sumqty += vauei;
        }
    }
    var proddisc = 0;
    var itemsdisc = $('.product-discount');
    for (var i = 0; i < itemsdisc.length; i++) {
        var vauei = parseFloat($(itemsdisc[i]).val());
        if ($.isNumeric(vauei)) {
            proddisc += vauei;
        }
    }
    if (distype == 'percent') {
        discount = (parseFloat(discount) * parseFloat(sum)) / 100;
    }
    var grandtotal = sum - (partialamt + discount);
    var subtot = grandtotal - discount;
    $('#SubTotal').val(subtot.toFixed(2));
    $('#sub_tl').val(sum.toFixed(2));
    $('#ProDiscountAmount').val(proddisc.toFixed(2));
    $('#GrandTotal').val(grandtotal.toFixed(2));
    $('.tt_item').text(sumqty);
    $('#tot_amt').text(parseFloat((sum - (partialamt + discount)).toFixed(2)));

}
var CalculatePosSalesRowTotal = function (inputrow) {
    var qty = parseInt($(inputrow).find('.product-qty').val());
    if (isNaN(qty)) {
        qty = 0;
    }
    var uprice = parseFloat($(inputrow).find('.product-price').val());
    if (isNaN(uprice)) {
        uprice = 0;
    }
    var total = uprice * qty;
    if (isNaN(total)) {
        total = 0;
    }
    $($(inputrow).find('.product-total-price')).val(total.toFixed(2));
    CalculatePosSalesGrandTotal();
}
var CalculatePosSalesRowTotalQty = function (inputrow) {
    var qty = parseInt($(inputrow).parent().find('.product-qty').val());
    if (isNaN(qty)) {
        qty = 0;
    }
    var uprice = parseFloat($(inputrow).parent().find('.product-price').val());
    if (isNaN(uprice)) {
        uprice = 0;
    }
    var vat = parseFloat($(inputrow).parent().find('.fixed-vat-price').val());
    if (isNaN(vat)) {
        vat = 0;
    }
    var disco = parseFloat($(inputrow).parent().find('.fixed-product-discount').val());
    if (isNaN(disco)) {
        disco = 0;
    }
    var vatamt = qty * vat;
    $($(inputrow).parent().find('.vat-price')).val(vatamt.toFixed());
    var disamt = qty * disco;
    $($(inputrow).parent().find('.product-discount')).val(disamt.toFixed());
    var total = ((uprice + vat) - disco) * qty;
    $($(inputrow).parent().find('.product-total-price')).val(total.toFixed(2));
    CalculatePosSalesGrandTotal();
}
var OrderPosSalesRowKeyUpPrice = function (item, e) {
    var inputrow = $(item).parent().parent();
    CalculatePosSalesRowTotalQty(inputrow);
}
var OrderPosSalesRowKeyUpQty = function (item, e) {
    var inputrow = $(item).parent().parent();
    var number = $(inputrow).parent().find('.product-qty').val();
    if (isNaN(number)) {
        number = 0;
        $(inputrow).parent().find('.product-qty').val(0);
    } else {
        $(inputrow).parent().find('.product-qty').val(number);
    }
    var disamt = $(inputrow).parent().find('.product-discount').val();
    if (isNaN(disamt)) {
        disamt = 0;
        $(inputrow).parent().find('.product-discount').val(0);
    }
    else if (number == 0) {
        disamt = 0;
        $(inputrow).parent().find('.product-discount').val(0);
    }
    else {
        $(inputrow).parent().find('.product-discount').val(disamt);
    }
    var vatamt = $(inputrow).parent().find('.vat-price').val();
    if (isNaN(vatamt)) {
        vatamt = 0;
        $(inputrow).parent().find('.vat-price').val(0);
    }
    else if (number == 0) {
        vatamt = 0;
        $(inputrow).parent().find('.vat-price').val(0);
    }
    else {
        $(inputrow).parent().find('.vat-price').val(vatamt);
    }
    CalculatePosSalesRowTotalQty(inputrow);
}
var OrderRowNewPosSaleKeyUp = function (item, e) {
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
                        /*3*/resultparse[i].SalesPrice,
                        /*4*/ resultparse[i].FileLoc,
                        /*5*/ resultparse[i].PrimaryUnit,
                        /*6*/ domainurl + '/');
                        }
                        searchresultstring += "</div>";
                        var ttdom = $($(item).parent()).find('.tt-menu');
                        var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                        $(ttdomComplete).html(searchresultstring);
                        $(ttdom).show();
                        PosProductSuggestionClickbind(item)
                        if (resultparse.length > 4) {
                            $(".NewProjectSuggestion").height(352);
                            $(".NewProjectSuggestion").css('position', 'relative');
                        }
                    }
                    console.log('a');
                    if (resultparse.length == 0)
                        $('.tt-menu').hide();
                } else {
                    CalculatePosNewAmount(item)
                }
            }
        });
    }
}
var PosProductSuggestionClickbind = function (item) {
    $('.product-table .tt-suggestion').click(function () {
        var clickitem = this;
        $('.product-table .tt-menu').hide();
        var olditm = item;
        $(item).val($(clickitem).attr('data-select'));
        $(item).attr('data-id', $(clickitem).attr('data-id'));
        var itemName = $(item).parent().find('span');
        $(itemName).text($(item).val());
        $(item).parent().parent().attr('data-id', $(clickitem).attr('data-id'));
        $(item).parent().parent().addClass('HasItem');
        var spnItemRate = $(item).parent().parent().find('.product-price');
        $(spnItemRate).val($(this).attr('data-price'));
        var txtItemUnit = $(item).parent().parent().find('.product-unit');
        $(txtItemUnit).val($(this).attr('data-type'));
        var txtItemUnit = $(item).parent().parent().find('.vat-price');
        $(txtItemUnit).val($(this).attr('data-vat'));
        var txtItemQty = $(item).parent().parent().find('.product-qty');
        $(txtItemQty).val(1);
        CalculatePosNewAmount(olditm);
    });
    $('.product-table .tt-suggestion').hover(function () {
        var clickitem = this;
        $('.tt-suggestion').removeClass("active");
        $(clickitem).addClass('active');
    });
}
var CalculatePosNewAmount = function (item) {
    var inputrow = $(item).parent().parent().parent().parent().parent();
    var qty = $(item).parent().parent().find('.product-qty').val();
    var uprice = $(item).parent().parent().find('.product-price').val();
    var total = 0;
    if ($.isNumeric(qty) && $.isNumeric(uprice)) {
        total = uprice * qty;
        $($(item).parent().parent().find('.product-total-price')).val(total.toFixed(2));
    }
    var items = $('.product-total-price');
    var sum = 0;
    for (var i = 0; i < items.length; i++) {
        var vauei = parseFloat($(items[i]).val());
        if ($.isNumeric(vauei)) {
            sum += vauei;
        }
    }
    var grandtotal = sum;
    var itemsqty = $('.product-qty');
    var sumqty = 0;
    for (var i = 0; i < itemsqty.length; i++) {
        var vauei = parseFloat($(itemsqty[i]).val());
        if ($.isNumeric(vauei)) {
            sumqty += vauei;
        }
    }
    var grandtotal = sum;
    $('#SubTotal').val(sum.toFixed(2));
    $('#GrandTotal').val(grandtotal);
    $('.tt_item').text(sumqty)
    $('#sub_tl').val(sum.toFixed(2))
    $('#tot_amt').text(parseFloat(sum).toFixed(2))
}
var SearchedProducttemplate =
    '<div class="card cursor_style product_display_box"  onkeypress="AddProduct({4},event, this)" onclick="AddProduct({4},event, this)" tabindex="0">' +
    '<div class="" style="padding:10px 19px;" id = "div_{4}">' +
    '<span class="card-title">{0}<img class="sugg_img" src="' + domain + '{15}{14}"/></span><br>' +
    '<span class="card-title">{1}</span><br>' +
    '<span class="card-text" style="font-style: italic;">Qty: 1 {2} ,<span> Price: K{3}</span><span class="float-right" style="color: firebrick; font-size: 12px; font-weight: bold;">{5}</span></span><br>' +
    '<input type="hidden" class="primaryvalue" value="{3}" />' +
    '<input type="hidden" class="secondaryvalue" value="{6}"  />' +
    '<input type="hidden" class="strsecondary" value="{8}"  />' +
    '<input type="hidden" class="strtertiary" value="{9}"  />' +
    '<input type="hidden" class="strprimary" value="{2}"  />' +
    '<input type="hidden" class="primarydiscount" value="{10}"  />' +
    '<input type="hidden" class="tertiarydiscount" value="{11}"  />' +
    '<input type="hidden" class="primaryvat" value="{12}"  />' +
    '<input type="hidden" class="tertiaryqty" value="{13}"  />' +
    '<input type="hidden" class="tertiaryvalue" value="{7}"  /></div></div>';
var SearchedProducttemplateWithoutImage =
    '<div class="card cursor_style product_display_box"  onkeypress="AddProduct({4},event, this)" onclick="AddProduct({4},event, this)" tabindex="0">' +
    '<div class="" style="padding:10px 19px;" id = "div_{4}">' +
    '<span class="card-title">{0} {15}{14} </span><br>' +
    '<span class="card-title">{1}</span><br>' +
    '<span class="card-text" style="font-style: italic;">Qty: 1 {2} ,<span> Price: K{3}</span><span class="float-right" style="color: firebrick; font-size: 12px; font-weight: bold;">{5}</span></span><br>' +
    '<input type="hidden" class="primaryvalue" value="{3}" />' +
    '<input type="hidden" class="secondaryvalue" value="{6}"  />' +
    '<input type="hidden" class="strsecondary" value="{8}"  />' +
    '<input type="hidden" class="strtertiary" value="{9}"  />' +
    '<input type="hidden" class="strprimary" value="{2}"  />' +
    '<input type="hidden" class="primarydiscount" value="{10}"  />' +
    '<input type="hidden" class="tertiarydiscount" value="{11}"  />' +
    '<input type="hidden" class="primaryvat" value="{12}"  />' +
    '<input type="hidden" class="tertiaryqty" value="{13}"  />' +
    '<input type="hidden" class="tertiaryvalue" value="{7}"  /></div></div>';
var AddToCartAppend = '<tr id="del_prod_fr_{3}"  data-price="{2}">'
    + '<td style = ""> <span class="font-weight-bold"><i class="fa fa-trash text-danger" onclick="RemoveProduct({3})"></i> {0}</span></td>'
    + '<td style=""><span><input type="number" class="form-control" id="data_qty_{3}" value="1"></> {1}</span></td>'
    + '<td style=""><input type="text" class="form-control" id="data_price_{3}" value="{2}"></></td>'
'</tr>';
var alreadyadded = false;
function RemoveProduct(id) {
    var i = parseInt($('.tt_item').text());
    if (isNaN(i)) { i = 0; }
    var item = i - 1;
    var sub = parseFloat($('#sub_tl').val());
    if (isNaN(sub)) { sub = 0; }
    var rise = parseFloat($('#data_price_' + id).val());
    if (isNaN(rise)) { rise = 0; }
    var itemsubtotal = sub - rise;
    if (item < 0) {
        item = 0;
    }
    if (itemsubtotal < 0) {
        itemsubtotal = 0;
    }
    $('#del_prod_fr_' + id).remove();
    $('.tt_item').text(item);
    $('#sub_tl').val(itemsubtotal);
    $('#tot_amt').text(parseFloat(itemsubtotal).toFixed(2));
}
var subtotal = [];
var prodcount = [];
var SuggestionAddProduct = function (id, e, item) {
    $('.search2.tt-menu').hide();
    AddProduct(id, e, item);
}
var ChangeQty = function (id, rn) {
    if ($('.pq_' + id).val() == 0) {
        $('.pq_' + id).val('1')
    }
    $.ajax({
        url: "/Product/GetProductQtyCustom",
        data: { id: id, unit: $('.unit_pro_' + id + rn).val(), qty: $('.pq_' + id + '_' + rn).val() },
        type: 'post',
        beforeSend: function () {
            POSModal.Show();
        },
        success: function (data) {
            if (data.success) {
                console.log(data)
                POSModal.Hide();
                $('.pp_' + id + '_' + rn).val(data.result.rate)
                $('.pv_' + id + '_' + rn).val(data.result.vat)
                $('.pd_' + id + '_' + rn).val(data.result.disc)
                $('.pt_' + id + '_' + rn).val(data.result.total)
                CalculatePosSalesGrandTotal();
            }
            else {
                OpenErrorMessageNew('Sorry', data.message);
                POSModal.Hide();
            }
        }
    });
}
var i = 1;
function AddProduct(id, e, item) {
    console.log('new pos 2')
    if (typeof e !== 'undefined' && e.keyCode === 13) {
        $.ajax({
            url: "/Product/GetProductToAddCart?id=" + id,
            type: 'post',
            beforeSend: function () {
                POSModal.Show();
            },
            success: function (data) {
                if (data.success) {
                    console.log('Visit Product');
                    console.log(data);
                    var selecttemplate = '<select class="form-control product-unit unit_pro_"' + id + i + ' title="1" onchange = "ChangeQty(' + id + ',' + i + ')">';
                    var optiontemplate = '<option value="' + data.result.primaryUnit + '.P">' + data.result.primaryUnit + ' [P]</option>';
                    if (data.result.secondaryUnit !== null && data.result.secondaryUnit !== '' && data.result.secondaryUnit != '-1') {
                        optiontemplate += '<option value="' + data.result.secondaryUnit + '.S">' + data.result.secondaryUnit + ' [S]</option>';
                    }
                    if (data.result.tertiaryUnit != null && data.result.tertiaryUnit != '' && data.result.tertiaryUnit != '-1') {
                        optiontemplate += '<option value="' + data.result.tertiaryUnit + '.T">' + data.result.tertiaryUnit + ' [T]</option>';
                    }
                    selecttemplate += optiontemplate + '/<select>';
                    setTimeout(function () {
                        var NewPosAddFromSuggRowCustom = "<tr data-id='{3}' class='newp_{3}'>"
                            + "<td valign='top' class='tableActions'>"
                            + "<input type='hidden' class='prduct-id cls_autofill' value='{3}' readonly='readonly'>"
                            + "<i class='fa fa-trash' onclick='DeleteNewOrderRow(this)'></i>"
                            + "</td>"
                            + "<td class='hov_td' style='position:relative' valign='top' title=''><span class='hov_text'>[{0},{7}]</span><span style='position: absolute; font-size: 10px;right: 16px;bottom: 15px;'></span><input readonly='readonly' value='{0}' type='text'class='form-control product-name' id='ProductName' placeholder = 'Product Name' />"
                             + "</td>"
                            + "<td valign='top'>"
                            + "<div class='input-group'>"
                            + selecttemplate + "<input value='1' oninput='validity.valid || (value = 1)' type='number' min='1' class='form-control product-qty pq_{3}_{17}' id='Qty' placeholder='0' onKeyup='ChangeQty({3},{17})'  onchange='ChangeQty({3},{17})' onclick='ChangeQty({3},{17})'/>"
                            + "</div>"
                            + "<input type='hidden' class='terwholesale-tdis' value='{8}'>"
                            + "<input type='hidden' class='wholesale-qty' value='{9}'>"
                            + "<input type='hidden' class='wholesale-value' value='{10}'>"
                            + "<input type='hidden' class='secondary-qty' value='{11}'>"
                            + "<input type='hidden' class='secondary-value' value='{12}'>"
                            + "<input type='hidden' class='primary-name' value='{1}'>"
                            + "<input type='hidden' class='secondary-name' value='{13}'>"
                            + "<input type='hidden' class='wholesale-name' value='{14}'>"
                            + "<input type='hidden' class='discounttype' value='{15}'>"
                            + "<input type='hidden' class='discountpercent' value='{16}'>"

                            + "</td>"
                            + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>K</span></div></div><input value='{2}' type='text' class='form-control product-price pp_{3}_{17}' readonly='readonly' onKeyup='OrderPosSalesRowKeyUpPrice(this,event)' placeholder='Rate' /> <input value='{2}' type='hidden' class='fixed-price' /></div></td>"
                            + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>K</span></div></div><input value='{4}' type='text' class='form-control vat-price pv_{3}_{17}' readonly='readonly' placeholder='0' onKeyup='OrderPosSalesRowKeyUpPrice(this,event)' placeholder='Vat' /><input value='{4}' type='hidden' class='fixed-vat-price' /><input value='{4}' type='hidden' class='whole-vat-price' /></div></td>"
                            + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>K</span></div></div><input value='{5}' readonly='readonly' placeholder='0' oninput='validity.valid || (value = 1)' type='number'  min='0' class='form-control product-discount pd_{3}_{17}' /*onKeyup='OrderPosSalesRowKeyUpQty(this,event)' onchange='OrderPosSalesRowKeyUpQty(this,event)'*//><input value='{5}' type='hidden' class='fixed-product-discount' /><input value='{5}' type='hidden' class='whole-product-discount' /></div></td>"

                            + "<td valign='top'><div class='input-group'> <div class='input-group-prepend'> <div class='input-group-text'> <span class='currency'>K</span> </div>  </div><input readonly='readonly' value='{6}' type='text' class='form-control product-total-price cls_autofill pt_{3}_{17}' id='TotalPrice' placeholder='Total amount'> </div></td>"
                            + "</tr>";
                        var vatper = '';
                        if (data.result.vatType == 'percent') {
                            vatper = 'Vat: ' + data.result.vatPercent + '%';
                        }
                        else {
                            vatper = 'Vat: ' + data.result.vatAmount + ' K';
                        }
                        var searchresultstring = "";
                        var tAmt = 0, rate = parseFloat(data.result.salesPrice), vat = parseFloat(data.result.vatAmount), dis = parseFloat(data.result.discountAmount);
                        if (isNaN(rate)) { rate = 0; }
                        if (isNaN(vat)) { vat = 0; }
                        if (isNaN(dis)) { dis = 0; }
                        tAmt = rate + vat - dis;
                        searchresultstring = jQuery.validator.format(NewPosAddFromSuggRowCustom,
                         /*0*/data.result.name,
                        /*1*/data.result.primaryUnit,
                        /*2*/ data.result.salesPrice,
                        /*3*/ id,
                        /*4*/ data.result.vatAmount,
                        /*5*/ data.result.discountAmount,
                        /*6*/ tAmt.toFixed(2),
                        /*7*/ vatper,
                        /*8*/ data.result.tertiaryWholesaleDiscountAmount,
                        /*9*/ data.result.tertiaryUnitInt,
                        /*10*/ data.result.tertiaryPrice,
                        /*11*/ data.result.secondaryUnitInt,
                        /*12*/ data.result.secondaryPrice,
                        /*13*/data.result.secondaryUnit,
                        /*14*/data.result.tertiaryUnit,
                        /*15*/data.result.discountType,
                        /*16*/data.result.discountPercent,
                        /*17*/i


                        );
                        if ($('#prod_cont tr').length > 0) {
                            var flag = true;
                            $('#product-table tbody tr').each(function () {
                                var gettingid = $(this).attr('data-id');
                                if (gettingid == id) {
                                    flag = false;
                                    var qty1 = parseInt($(this).find('product-qty').val());
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
                            if (flag) {
                                $('#product-table tbody tr:last').after(searchresultstring);
                            }
                        }
                        else {
                            $('#prod_cont').append(searchresultstring)
                        }
                        $(".newp_" + id).last().find('td .product-unit').val(data.result.primaryUnit);
                        POSModal.Hide();
                        CalculatePosSalesGrandTotal()
                    }, 10)
                } else {
                    OpenErrorMessageNew('Sorry', data.message);
                    POSModal.Hide();
                }
            }
        });
    } else {
        $.ajax({
            url: "/Product/GetProductToAddCart?id=" + id,
            type: 'post',
            beforeSend: function () {
                POSModal.Show();
            },
            success: function (data) {
                if (data.success) {
                    console.log(data)
                    var selecttemplate = '<select class="form-control product-unit unit_pro_' + id + i + '" title="1" onchange = "ChangeQty(' + id + ',' + i + ')">';
                    var optiontemplate = '<option selected value="' + data.result.primaryUnit + '.P">' + data.result.primaryUnit + ' [P]</option>';
                    if (data.result.secondaryUnit != null && data.result.secondaryUnit !== '' && data.result.secondaryUnit != '-1') {
                        optiontemplate += '<option value="' + data.result.secondaryUnit + '.S">' + data.result.secondaryUnit + ' [S]</option>';
                    }
                    if (data.result.tertiaryUnit != null && data.result.tertiaryUnit != '' && data.result.tertiaryUnit != '-1') {
                        optiontemplate += '<option value="' + data.result.tertiaryUnit + '.T">' + data.result.tertiaryUnit + ' [T]</option>';
                    }
                    selecttemplate += optiontemplate + '/<select>';
                    setTimeout(function () {
                        var readonly = "readonly='readonly'";
                        var descriptiondom = '';
                        if (data.result.productType === "Service") {
                            readonly = '';
                            descriptiondom = jQuery.validator.format("<input value='{0}' type='text'class='form-control product-description' id='ProductDescription' placeholder = 'Product Description' />", data.result.description);
                        }
                        var NewPosAddFromSuggRowCustom = "<tr data-id='{3}' class='newp_{3}'>"
                            + "<td valign='top' class='tableActions'>"
                            + "<input type='hidden' class='prduct-id cls_autofill' value='{3}' {18}>"
                            + "<i class='fa fa-trash' onclick='DeleteNewOrderRow(this)'></i>"
                            + "</td>"
                            + "<td class='hov_td' style='position:relative' valign='top' title=''><span class='hov_text'>[{0},{7}]</span><span style='position: absolute; font-size: 10px;right: 16px;bottom: 15px;'></span><input {18} value='{0}' type='text'class='form-control product-name' id='ProductName' placeholder = 'Product Name' />"
                             + "{19} </td>"
                            + "<td valign='top'>"
                            + "<div class='input-group'>"
                            + selecttemplate + "<input value='1' oninput='validity.valid || (value = 1)' type='number' min='1' class='form-control product-qty pq_{3}_{17}' id='Qty' placeholder='0' onKeyup='ChangeQty({3},{17})'  onchange='ChangeQty({3},{17})' onclick='ChangeQty({3},{17})'/>"
                            + "</div>"
                            + "<input type='hidden' class='terwholesale-tdis' value='{8}'>"
                            + "<input type='hidden' class='wholesale-qty' value='{9}'>"
                            + "<input type='hidden' class='wholesale-value' value='{10}'>"
                            + "<input type='hidden' class='secondary-qty' value='{11}'>"
                            + "<input type='hidden' class='secondary-value' value='{12}'>"
                            + "<input type='hidden' class='primary-name' value='{1}'>"
                            + "<input type='hidden' class='secondary-name' value='{13}'>"
                            + "<input type='hidden' class='wholesale-name' value='{14}'>"
                            + "<input type='hidden' class='discounttype' value='{15}'>"
                            + "<input type='hidden' class='discountpercent' value='{16}'>"

                            + "</td>"
                            + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>{20}</span></div></div><input value='{2}' type='text' class='form-control product-price pp_{3}_{17}' {18}  onKeyup='OrderPosSalesRowKeyUpPrice(this,event)' placeholder='Rate' /> <input value='{2}' type='hidden' class='fixed-price' /></div></td>"
                            + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>{20}</span></div></div><input value='{4}' type='text' class='form-control vat-price pv_{3}_{17}' {18} placeholder='0' onKeyup='OrderPosSalesRowKeyUpPrice(this,event)' placeholder='Vat' /><input value='{4}' type='hidden' class='fixed-vat-price' /><input value='{4}' type='hidden' class='whole-vat-price' /></div></td>"
                            + "<td valign='top'><div class='input-group'><div class='input-group-prepend'><div class='input-group-text'><span class='currency'>{20}</span></div></div><input value='{5}' {18} placeholder='0' oninput='validity.valid || (value = 1)' type='number'  min='0' class='form-control product-discount pd_{3}_{17}' /*onKeyup='OrderPosSalesRowKeyUpQty(this,event)' onchange='OrderPosSalesRowKeyUpQty(this,event)'*//><input value='{5}' type='hidden' class='fixed-product-discount' /><input value='{5}' type='hidden' class='whole-product-discount' /></div></td>"

                            + "<td valign='top'><div class='input-group'> <div class='input-group-prepend'> <div class='input-group-text'> <span class='currency'>{20}</span> </div>  </div><input readonly='readonly' value='{6}' type='text' class='form-control product-total-price cls_autofill pt_{3}_{17}' id='TotalPrice' placeholder='Total amount'> </div></td>"
                            + "</tr>";
                        var vatper = '';
                        if (data.result.vatType === 'percent') {
                            vatper = 'Vat: ' + data.result.vatPercent + '%';
                        }
                        else {
                            vatper = 'Vat: ' + data.result.vatAmount + ' K';
                        }
                        var searchresultstring = "";
                        var tAmt = 0, rate = parseFloat(data.result.salesPrice), vat = parseFloat(data.result.vatAmount), dis = parseFloat(data.result.discountAmount);
                        if (isNaN(rate)) { rate = 0; }
                        if (isNaN(vat)) { vat = 0; }
                        if (isNaN(dis)) { dis = 0; }
                        tAmt = rate + vat - dis;
                        searchresultstring = jQuery.validator.format(NewPosAddFromSuggRowCustom,
                        /*0*/data.result.name,
                        /*1*/data.result.primaryUnit,
                        /*2*/ data.result.salesPrice,
                        /*3*/ id,
                        /*4*/ data.result.vatAmount,
                        /*5*/ data.result.discountAmount,
                        /*6*/ tAmt.toFixed(2),
                        /*7*/ vatper,
                        /*8*/ data.result.tertiaryWholesaleDiscountAmount,
                        /*9*/ data.result.tertiaryUnitInt,
                        /*10*/ data.result.tertiaryPrice,
                        /*11*/ data.result.secondaryUnitInt,
                        /*12*/ data.result.secondaryPrice,
                        /*13*/data.result.secondaryUnit,
                        /*14*/data.result.tertiaryUnit,
                        /*15*/data.result.discountType,
                        /*16*/data.result.discountPercent,
                        /*17*/i,
                        /*18*/readonly,
                        /*19*/descriptiondom,
                        /*20*/defaultCurrency

                        );
                        if ($('#prod_cont tr').length > 0) {
                            var flag = true;
                            $('#product-table tbody tr').each(function () {
                                var gettingid = $(this).attr('data-id');
                                if (gettingid == id) {
                                    flag = false;
                                    var qty1 = parseInt($(this).find('product-qty').val());
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
                            //if (flag) {

                            //}
                            $('#product-table tbody tr:last').after(searchresultstring);
                        }
                        else {
                            $('#prod_cont').append(searchresultstring)
                        }
                        i++;
                        /*$(".unit_pro_" + id).change();*/
                        POSModal.Hide();
                        CalculatePosSalesGrandTotal()
                    }, 10)
                } else {
                    OpenErrorMessageNew('Sorry', data.message);
                    POSModal.Hide();
                }
            }
        });
    }
}
var SearchProductPOSLONG = function (item) {
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
                        /*3*/resultparse[i].SalesPrice,
                         /*4*/ resultparse[i].FileLoc,
                        /*5*/ resultparse[i].PrimaryUnit,
                        /*6*/ domainurl + '/');
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
var searchProductRequest;
var SearchProductPOS = function (searcht) {
   
    if (searcht === $('.pos_search').val()) {

        if (searchProductRequest && searchProductRequest.readyState !== 4) {
            searchProductRequest.abort();
            searchProductRequest = null;
        }

        console.log('pos_search fired!!!');

        searchProductRequest = $.ajax({
            url: "/Product/SearchProductForOrderRow",
            type: 'post',
            data: {
                Searchtext: $('.search_button_input').val(),
            },
            beforeSend: function () {
                POSModal.Show();
            },
            success: function (data) {
                POSModal.Hide();
                if (data.result !== "") {
                    var resultparse = JSON.parse(data.result);
                    if (resultparse !== null && resultparse.length > 0) {
                        $('.product_display').html(LoaderLayout)
                        var searchresultstring = "";
                        for (var i = 0; i < resultparse.length; i++) {
                            if (resultparse[i].FileLoc != null && resultparse[i].FileLoc != '') {
                                searchresultstring = searchresultstring + jQuery.validator.format(SearchedProducttemplate,
                        /*0*/resultparse[i].Name,
                        /*1*/ resultparse[i].Description,
                        /*2*/resultparse[i].PrimaryUnit,
                        /*3*/ resultparse[i].SalesPrice,
                        /*4*/ resultparse[i].Id,
                       /*5*/(resultparse[i].ProductType === "Service" ? "" : (resultparse[i].ProductType !== null ? resultparse[i].Quantity : "Out of stock")),
                        /*6*/ resultparse[i].SecondaryPrice,
                        /*7*/ resultparse[i].TertiaryPrice,
                        /*8*/ resultparse[i].SecondaryUnit,
                        /*9*/ resultparse[i].TertiaryUnit,
                        /*10*/ resultparse[i].DiscountAmount,
                        /*11*/ resultparse[i].WholesaleDiscountAmount,
                        /*12*/ resultparse[i].VATAmount,
                        /*13*/ resultparse[i].TertiaryUnitInt,
                        /*14*/ resultparse[i].FileLoc,
                        /*15*/ domainurl)
                            } else {
                                searchresultstring = searchresultstring + jQuery.validator.format(SearchedProducttemplateWithoutImage,
                        /*0*/resultparse[i].Name,
                        /*1*/ resultparse[i].Description,
                        /*2*/resultparse[i].PrimaryUnit,
                        /*3*/ resultparse[i].SalesPrice,
                        /*4*/ resultparse[i].Id,
                       /*5*/(resultparse[i].ProductType === "Service" ? "" : (resultparse[i].ProductType !== null ? resultparse[i].Quantity : "Out of stock")),
                        /*6*/ resultparse[i].SecondaryPrice,
                        /*7*/ resultparse[i].TertiaryPrice,
                        /*8*/ resultparse[i].SecondaryUnit,
                        /*9*/ resultparse[i].TertiaryUnit,
                        /*10*/ resultparse[i].DiscountAmount,
                        /*11*/ resultparse[i].WholesaleDiscountAmount,
                        /*12*/ resultparse[i].VATAmount,
                        /*13*/ resultparse[i].TertiaryUnitInt,
                        /*14*/ resultparse[i].FileLoc,
                        /*15*/ domainurl)
                            }

                        }
                        $('.product_display').html(searchresultstring)

                        if (resultparse.length === 1 && resultparse[0].IsSku === 'yes') {
                            AddProduct(resultparse[0].Id);
                            $('.pos_search').val('');
                            $('.pos_search').focus();
                        }
                    } 
                    if (resultparse === null || resultparse.length === 0)
                        $('.tt-menu').hide();
                }
            }
        });
    }
}
function AddCustomerFromSugg(name) {
    $('.new_cus').show()
    var inval = $('#customers-search').val();
    $(name).parent().find('.FirstName').val(inval);
    $(".customer_search_tt").animate({ scrollTop: 1000 }, 1000);
}
function SetCustomerFromSugg(id) {
    $('#customer_id').val(id);
    $('#customer_name').text($('.name_' + id).text());
    $('#customers-search').val($('.name_' + id).text());
    $('.tt-menu').hide();
}
var CustomerSuggestionTemplate = '<li class="list-group-item" onclick="SetCustomerFromSugg({0})">Name: <span class="name_{0}">{1}</span>, <i class="fas fa-phone"></i> <span class="phnum_{0}">{2}</span> </li>';
var NewCustomerSuggestionTemplate = ''
    + '<li class="list-group-item add_style"  onclick="AddCustomerFromSugg(this)"><b>Add {0} as New Customer</b></li>'
    + '<li class="list-group-item new_cus" style="display:none;"><input id="FirstName" type="text" placeholder="Name" class="form-control FirstName search_button_input" data-required="true" />'
    + '<input id="PhoneNumber" type="number" placeholder="Phone number" class="form-control PhoneNumber search_button_input"  /><i class=" btn green_button search_icon_bg" aria-hidden="true" data-required="true" onclick="SaveCustomerFromSugg(this)">Save</li>'
    + '';
var CustomerKeyUp = function (item) {
    if ($(item).val() != "") {
        $.ajax({
            url: "/Customer/SearchCustomer",
            type: 'post',
            data: {
                Searchtext: $(item).val(),
            },
            success: function (data) {
                console.log(data)
                if (data.success) {
                    var resultparse = JSON.parse(data.result);
                    if (resultparse.length > 0) {
                        var searchresultstring = '<div class="card"><ul class="list-group list-group-flush">';
                        for (var i = 0; i < resultparse.length; i++) {
                            searchresultstring = searchresultstring + jQuery.validator.format(CustomerSuggestionTemplate,
                        /*0*/resultparse[i].Id,
                        /*1*/ resultparse[i].CustomerName,
                        /*2*/ resultparse[i].PhoneNumber,
                        /*3*/resultparse[i].Balance)
                        }
                        searchresultstring += jQuery.validator.format(NewCustomerSuggestionTemplate, $(item).val()) + '</ul></div>';
                        var ttdom = $('.customer_search_tt');
                        $(ttdom).html(searchresultstring);
                        $(ttdom).show();
                        if (resultparse.length > 4) {
                            $(".NewProjectSuggestion").height(352);
                            $(".NewProjectSuggestion").css('position', 'relative');
                        }
                    }
                } else {
                    var TEMPSUG = jQuery.validator.format(NewCustomerSuggestionTemplate, $(item).val());
                    $('.customer_search_tt').show();
                    $('.customer_search_tt').html(TEMPSUG);
                }
            }
        });
    } else {
        console.log('e');
        $('.tt-menu').hide();
    }
}

var DeleteNewOrderRow = function (item) {
    if ($('.product-name').length > 1)
        var removeDom = $(item).parent();
    $($(item).parent().parent()).remove();
    console.log('delrow');
    CalculatePosSalesGrandTotal()
}
var POSSale = {
    SaveNewPOSSale: function () {
        $('.pay_btn_cm').removeClass('btn_active')
        $('#Paybtn').addClass('btn_active')
        if (CommonUiValidation() && PartialpaymentValidation() && DiscountValidation() && CardandmobilepaymentValidation()) {
            var ListProductsCustomPOS = [];
            $("#product-table tbody tr").each(function () {
                if ($(this).find('td .product-name').val() != '') {
                    ListProductsCustomPOS.push({
                        ProductName: $(this).find('td .product-name').val(),
                        Rate: $(this).find('td .product-price').val(),
                        Unit: $(this).find('td .product-unit').val(),
                        Quanity: $(this).find('td .product-qty').val(),
                        VatAmount: $(this).find('td .vat-price').val(),
                        DiscountAmount: $(this).find('td .product-discount').val(),
                        ProductDiscountAmount: $(this).find('td .product-discountpro').val(),
                        TotalAmount: $(this).find('td .product-total-price').val(),
                        Id: $(this).attr('data-id')
                    });
                }
            });
            var flag = true;
            $("#product-table tbody tr").each(function () {
                console.log($(this).find('td .product-qty').val());
                if ($(this).find('td .product-qty').val() < 1) {
                    OpenErrorMessageNew("Sorry!", "Quantity Should minimum 1");
                    flag = false;
                }
            });
            console.log(flag);
            if (!flag) {
                return flag;
            }
            var requestData = {
                Id: $("#Invoice_Id").val(),
                CustomerIntId: $('#customer_id').val(),
                CustomerName: $('#customer_name').text(),
                SalesCounter: $('#SalesCounter').val(),
                InvoiceId: $("#Invoice_InvoiceId").val(),
                SalesDate: $("#Invoice_SalesDate").val(),
                VoucherNumber: $("#Invoice_VoucherNumber").val(),
                TransactionType: $("#TransactionType").val(),
                TransactionId: $("#TransactionId").val(),
                PartialAmount: $("#PartialAmount").val(),
                DiscountAmount: $("#DiscountAmount").val(),
                ProDiscountAmount: $("#ProDiscountAmount").val(),
                Vat: $(".vat-price").val(),
                ProDiscountAmount1: $(".product-discount").val(),
                SalesCounter: $("#SalesCounter").val(),
                DiscountType: $("#discountType").val(),
                SaleButton: $('.btn_active').attr('id'),
                InvoiceDetailList: ListProductsCustomPOS
            };
            $.ajax({
                url: "/Inventory/SaveNewSale",
                type: 'post',
                data: requestData,
                beforeSend: function () {
                    $('#place_new_porder_loader').show();
                },
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        OpenSuccessMessageNew("Success!", data.message);
                        if ($('#PosSalesRight').hasClass('PosSalesRight_active')) {
                            $('.openbtn').click()
                            $('#NewPOSSales').click();
                            setTimeout(function () {
                                $('.closebtn').click()
                            }, 3000)
                        } else {
                            $('#NewPOSSales').click();
                        }
                    } else {
                        OpenCautionMessageNew("Sorry!", data.message);
                    }
                }
            });
        }
    },
    SaveNPrintNewPOSSale: function (ispos) {
        /*$('button.fu-disable').prop("disabled", true);*/
        $('.pay_btn_cm').removeClass('btn_active')
        $('#PayPrintbtn').addClass('btn_active')
        if (CommonUiValidation() && PartialpaymentValidation() && DiscountValidation() && CardandmobilepaymentValidation()) {
            var ListProductsCustomPOS = [];
            var flag = true;
            $("#product-table tbody tr").each(function () {
                var stockQty = $(this).find('td .product-stockqty').val();
                var sellingQty = $(this).find('td .product-qty').val();
                if ($(this).find('td .product-name').val() != '') {
                    if (sellingQty > stockQty) {
                        OpenErrorMessageNew("Sorry!", "Selling quantity cannot be bigger than stock quantity");
                        flag = false;
                        return false;
                    }
                    ListProductsCustomPOS.push({
                        ProductName: $(this).find('td .product-name').val(),
                        Rate: $(this).find('td .product-price').val(),
                        Unit: $(this).find('td .product-unit').val(),
                        Quanity: sellingQty,
                        VatAmount: $(this).find('td .vat-price').val(),
                        DiscountAmount: $(this).find('td .product-discount').val(),
                        TotalAmount: $(this).find('td .product-total-price').val()/*.toFixed(2)*/,
                        Id: $(this).attr('data-id')
                    });
                }
            });

            if (!flag) {
                return flag;
            }
            $("#product-table tbody tr").each(function () {
                console.log($(this).find('td .product-qty').val());
                if ($(this).find('td .product-qty').val() < 1) {
                    OpenErrorMessageNew("Sorry!", "Quantity Should minimum 1");
                    flag = false;
                }
            });
            if (!flag) {
                return flag;
            }
            if (ListProductsCustomPOS.length > 0) {
                var requestData = {
                    Id: $("#Invoice_Id").val(),
                    CustomerIntId: $('#customer_id').val(),
                    CustomerName: $('#customer_name').val(),
                    SalesCounter: $('#SalesCounter').val(),
                    InvoiceId: $("#Invoice_InvoiceId").val(),
                    SalesDate: $("#Invoice_SalesDate").val(),
                    VoucherNumber: $("#Invoice_VoucherNumber").val(),
                    TransactionType: $("#TransactionType").val(),
                    TransactionId: $("#TransactionId").val(),
                    PartialAmount: $("#PartialAmount").val(),
                    DiscountAmount: $("#DiscountAmount").val(),
                    ProDiscountAmount: $("#ProDiscountAmount").val(),
                    Vat: $(".vat-price").val(),
                    ProDiscountAmount1: $(".product-discount").val(),
                    SalesCounter: $("#SalesCounter").val(),
                    DiscountType: $("#discountType").val(),
                    SaleButton: $('.btn_active').attr('id'),
                    InvoiceDetailList: ListProductsCustomPOS
                };
                $.ajax({
                    url: "/Inventory/SaveNewSale",
                    type: 'post',
                    data: requestData,
                    success: function (data) {
                        console.log(data);
                        if (data.success) {
                            if (ispos) {
                                OpenTopToBottomConfirmationModal('/sales/pos-print?invoiceid=' + $("#Invoice_InvoiceId").val());
                            } else {
                                OpenTopToBottomModal('/Sales/SalesPrintPreviewPage?ids=' + $("#Invoice_InvoiceId").val(), function () {
                                    $('.top_to_bottom_container').printThis();
                                })
                            }
                            NewPOSSalesClick();
                        }
                        else {
                            OpenCautionMessageNew("Sorry!", data.message);
                            /*$('button.fu-disable').prop("disabled", false);*/
                        }
                    }
                });
            } else {
                OpenErrorMessageNew("Sorry!", 'Please, Add one item!');
            }
        }
    },
    PrintInvoiceWeb: function () {
        var parm = '?ids=' + invoice;
        window.location.href = '/Sales/DownloadSalesPrintPreview' + parm;
    }
}
var SaveAddCustomerValidation = function () {
    var result = true;
    if ($("#FirstName").val() == "") {
        $("#FirstName").attr("style", "border-color:red;");
        result = false;
    }
    if ($("#PhoneNumber").val() === "" || typeof $("#PhoneNumber").val() === 'undefined' || $("#PhoneNumber").val() === null) {
        $("#PhoneNumber").attr("style", "border-color:red;");
        result = false;
    }
    //else {
    //   /* var pattern = "^(?:\\+88|88)?(01[3-9]\\d{8})$";*/
    //    var pattern = "^(?:\\+67|67)?(5[0-9]\\d{10})$"; //for PNG
    //    var StrMobile = $("#PhoneNumber").val();
    //    if (StrMobile.match(pattern)) {
    //        $("#PhoneNumber").attr("style", "border-color:none;");
    //    }
    //    else {
    //        $("#PhoneNumber").attr("style", "border-color:red;");
    //        $("#PhoneNumberError").text("Your phone number is not valid. Please enter a valid phone number.");
    //        result = false;
    //    }
    //}
    return result;
}
//var SaveAddCustomerValidation = function () {
//        var result = true;
//        if ($("#FirstName").val() == "") {
//            $("#FirstName").attr("style", "border-color:red;");
//            result = false;
//        }
//        if ($("#PhoneNumber").val() == "" || $("#PhoneNumber").val() == undefined || $("#PhoneNumber").val() == null) {
//           $("#PhoneNumber").attr("style", "border-color:red;");
//           result = false;
//        }
//        else {
//            /*var pattern = "^(?:\\+88|88)?(01[3-9]\\d{8})$";*/
//            var pattern = "^(?:\\+67|67)?(5[0-9]\\d{10})$"; //for PNG
//        var StrMobile = $("#PhoneNumber").val();
//        if (StrMobile.match(pattern)) {
//            $("#PhoneNumber").attr("style", "border-color:none;");
//        }
//        else {
//            $("#PhoneNumber").attr("style", "border-color:red;");
//            result = false;
//        }
//    }
//        return result;
//}
var PartialpaymentValidation = function () {
    var result = true;
    if ($("#TransactionType").val() == "CashPartial") {
        var artial = parseFloat($("#PartialAmount").val());
        if (isNaN(artial) || artial <= 0) {
            $("#PartialAmount").attr("style", "border-color:red;");
            result = false;
        }
        else {
            $("#PartialAmount").attr("style", "border-color:none;");
        }
    }
    return result;
}
var CardandmobilepaymentValidation = function () {
    var result = true;
    if (($("#TransactionType").val() == "EFTPOSBank") || ($("#TransactionType").val() == "BankCHQ/BankDeposit")) {
        var Transno = parseFloat($("#TransactionId").val());
        if (isNaN(Transno) || Transno <= 0) {
            $("#TransactionId").attr("style", "border-color:red;");
            result = false;
        }
        else {
            $("#TransactionId").attr("style", "border-color:none;");
        }
    }
    return result;
}
var DiscountValidation = function () {
    var result = true;
    var roductdis = 0, sum = 0;
    var items = $('.product-total-price');
    $('.product-discount').each(function () {
        if ($.isNumeric($(this).val())) {
            roductdis += parseFloat($(this).val());
        }
    });
    for (var i = 0; i < items.length; i++) {
        var vauei = parseFloat($(items[i]).val());
        if ($.isNumeric(vauei)) {
            sum += vauei;
        }
    }
    var distype = $("#discountType").val();
    var discount = parseFloat($("#DiscountAmount").val());
    if (isNaN(discount)) { discount = 0; }
    if (distype == 'percent') {
        discount = (parseFloat(discount) * parseFloat(sum)) / 100;
    }
    var totaldiscount = roductdis + discount;
    if (totaldiscount > sum) {
        OpenErrorMessageNew('Warning!!!', 'Discount amount is bigger then total amount.');
        result = false;
    }
    return result;
}
var SaveCustomerFromSugg = function (item) {
    var url = "/Customer/SaveCustomer";
    var param = {
        FirstName: $(item).parent().find(".FirstName").val(),
        PrimaryPhone: $(item).parent().find(".PhoneNumber").val(),
        CellNo: $(item).parent().find(".PhoneNumber").val()
    };
    if (SaveAddCustomerValidation()) {
        $.ajax({
            type: 'post',
            url: url,
            data: param,
            success: function (data) {
                if (data.result) {
                    $('#customer_id').val(data.daata)
                    $('#customer_name').text($("#FirstName").val())
                    console.log('f');
                    $('.tt-menu').hide();
                    OpenSuccessMessageNew("Success!", "Customer added successfully!")
                }
            },
            error: function (request, error) {
                console.log("Server Error")
                OpenErrorMessageNew("Error!", "There was an error adding the customer. Please try again later.");
            }
        });
    } else {
        OpenErrorMessageNew("Error!", "Please input the valid Phone number.");
    }
}
//var SaveCustomerFromSugg = function (item) {
//        var url = "/Customer/SaveCustomer";
//        var param = {
//            FirstName: $(item).parent().find(".FirstName").val(),
//            PrimaryPhone: $(item).parent().find(".PhoneNumber").val(),
//            CellNo: $(item).parent().find(".PhoneNumber").val()
//        };
//        if (SaveAddCustomerValidation()) {
//            $.ajax({
//                type: 'post',
//                url: url,
//                data: param,
//                success: function (data) {
//                    if (data.result) {
//                        $('#customer_id').val(data.daata)
//                        $('#customer_name').text($("#FirstName").val())
//                        console.log('f');
//                        $('.tt-menu').hide();
//                        OpenSuccessMessageNew("Success!", "Customer added successfully!")
//                    }
//                },
//                error: function (request, error) {
//                    console.log("Server Error")
//                }
//            });
//        }
//    }

//SET CURSOR POSITION
$.fn.setCursorPosition = function (pos) {
    this.each(function (index, elem) {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
    return this;
};
function IsBetween(start, end) {
    var format = 'hh:mm a'
    // var time = moment() gives you current time. no format required.
    var time = moment(new Date(), format),
        beforeTime = moment(start, format),
        afterTime = moment(end, format);
    if (time.isBetween(beforeTime, afterTime)) {
        console.log('is between')
        return true;
    } else {
        console.log('is not between')
        return false;
    }
}
function StoreOpenscheduling() {
    var strtime = $("#strontime").val();
    var endtime = $("#strofftime").val();
    if (strtime == undefined || strtime == '' || strtime == null || endtime == undefined || endtime == '' || endtime == null) {
        return false;
    }
    if (IsBetween(strtime, endtime)) {
        $("#PayPrintbtn").prop('disabled', false);
        $("#PayPrintbtn").prop('readonly', false);
        $("#PayPrintbtn").show();
        $("#Paybtn").prop('disabled', false);
        $("#Paybtn").prop('readonly', false);
        $("#Paybtn").show();
    } else {
        $("#PayPrintbtn").prop('disabled', true);
        $("#PayPrintbtn").prop('readonly', true);
        $("#PayPrintbtn").hide();
        $("#Paybtn").prop('disabled', true);
        $("#Paybtn").prop('readonly', true);
        $("#Paybtn").hide();
        OpenErrorMessageNew('Store Message', 'Sorry, Store is Closed')
    }
    setTimeout(StoreOpenscheduling, (1000 * 60));
}
document.addEventListener("keydown", function (event) {
    if (event.altKey && event.code === "KeyS") {
        $('.pos_search').focus()
        event.preventDefault();
    }
    if (event.altKey && event.code === "KeyP") {
        $('#TransactionType').focus()
        event.preventDefault();
    }
    if (event.altKey && event.code === "KeyQ") {
        $('#Qty').first().focus()
        event.preventDefault();
    }
});
var currenttime;
$(document).ready(function () {
    $('.pos_search').focus()
    $('#PartialAmount').keyup(function () {
        CalculateDiscountAmoount()
    })
    $('.Paybtnkey').keyup(function (e) {
        if (e.keyCode == 13) {
            $('.product_display_box:first').focus()
            e.preventDefault();
        } else {
            if ($('.search_button_input').val() != '') {
                SaveNewPOSSale()
            }
        }
    })

    $('.pos_search').keyup(function (e) {
        if (e.keyCode === 13) {
            return false; 
        }

        if (e.keyCode === 40) {
            $('.product_display_box:first').focus()
            e.preventDefault();
        } else {
            if ($('.search_button_input').val() !== '') {
                var callingTimeVal = $(e.target).val();
                console.log(callingTimeVal);
                console.log(e.keyCode);
                setTimeout(function () {
                    SearchProductPOS(callingTimeVal);
                }, 100);


            }
        }
    })
    StoreOpenscheduling();
    $('#TransactionType').change(function () {
        var type = $('#TransactionType').val();
        if ((type == 'EFTPOSBank' || type == 'BankCHQ/BankDeposit') && type != '-1') {
            $('#TransactionId').show()
            $('#PartialAmount').hide()
        } else if (type == 'CashPartial' && type != '-1') {
            $('#TransactionId').hide()
            $('#PartialAmount').show()
        }
        else {
            $('#TransactionId').hide()
            $('#PartialAmount').hide()
        }
    })
    $('.prod_cont_height').height(window.innerHeight - 304);
    $('#customers-search').click(function (e) {
        var TEMPSUG = jQuery.validator.format(NewCustomerSuggestionTemplate, '');
        $('.customer_search_tt').show();
        $('.customer_search_tt').html(TEMPSUG);
        $('.tt-menu').show();
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
    });
});
$(window).resize(function () {
    $('.prod_cont').height(window.innerHeight - 410);
    $('.prod_cont_height').height(window.innerHeight - 304);
})