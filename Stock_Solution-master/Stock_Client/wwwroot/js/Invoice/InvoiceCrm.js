
var InvoiceCrmModel = {
    InitRowIndex: function () {
        var i = 1;
        $("#CustomerInvoiceTab tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
    },
    NewEquipmentRow: function () {
        return "<tr class='data'>"
            + "<td>"
            + "</td>"
            + "<td>"
            + "<input type='text' class='form-control product-name' onkeydown='InvoiceCrmModel.SearchKeyDown(this,event)' onkeyup='InvoiceCrmModel.SearchKeyUp(this,event)'/>"
            + "</td>"
            + "<td>"
            + "<input type='text' class='form-control product-description' />"
            + "</td>"
            + "<td>"
            + "<input type='text' class='form-control product-quantity ' />"
            + "</td>"
            + "<td>"
            + "<input type='text' class='form-control product-rate' />"
            + "</td>"
            + "<td>"
            + "<input type='text' class='form-control product-amount' />"
            + "</td>"
            + "<td>"
            + "<i style='cursor: pointer; color: #e40514' class='fa fa-trash'></i>"
            + "</td>"
            + "</tr > ";
    },
    NewEquipmentRowTaxable: function () {
        return "<tr>"
            + "<td valign='top' class='rowindex'></td>"
            + "<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event)' onkeyup='SearchKeyUp(this,event)' />"
            + "<div class='tt-menu'>"
            + "<div class='tt-dataset tt-dataset-autocomplete'> </div> "
            + "</div>"
            + "<span class='spnProductName'></span>"
            + "</td>"
            + "<td valign='top'>"
            + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductDesc' />"
            + "<span class='spnProductDesc'></span>"
            + "</td>"
            + "<td valign='top'>"
            + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductQuantity' />"
            + "<span class='spnProductQuantity'></span>"
            + "</td>";
    },
    PropertyUserSuggestiontemplate: function () {
        return  "<div class='tt-suggestion tt-selectable' data-select='{1}' data-price='{2}' data-type='{5}' data-id='{0}' data-taxable='{8}' data-description='{6}' data-equipvendorcost='{10}' data-classId ='{11}'>"
        + "<p class='tt-sug-text'>"
        + "<em class='tt-sug-type'>{5}</em>{1}" + "<br /><em class='tt_sug_manufac'>{7}</em>"
        + "<em class='tt-eq-sku'></br>SKU: {9}</em>"
        + "<em class='tt-eq-price'>${2}</em>"
        + "<br />"
        + "</p> "
        + "</div>";
},
    SearchKeyDown = function (item, event) {

        if (event.keyCode == 13) {/*Enter*/
            var selectedTTMenu = $(event.target).parent().find('.tt-suggestion.active');
            $(selectedTTMenu).click();
            $('.tt-menu').hide();
            GetProductByBarCode(item, $(item).val());
            $(".NewProjectSuggestion").hide();
        }
        if (event.keyCode == 40) {/*Down*/
            var ttSugstionDom = $(event.target).parent().find('.tt-suggestion');
            var ttSugActive = $(event.target).parent().find('.tt-suggestion.active');
            if ($(ttSugstionDom).length > 0 && $(ttSugstionDom).is(':visible')) {
                if ($(ttSugActive).length == 0) {
                    $($(ttSugstionDom).get(0)).addClass('active');
                    $(item).val($($(ttSugstionDom).get(0)).attr('data-select'))
                }
                else {
                    var suggestionlist = $(ttSugstionDom);
                    var activesuggestion = $(ttSugActive);
                    var indexactive = -1;
                    for (var id = 0; id < suggestionlist.length; id++) {
                        if ($(suggestionlist[id]).hasClass('active'))
                            indexactive = id;
                    }
                    if (indexactive < suggestionlist.length - 1) {
                        $(ttSugstionDom).removeClass('active');
                        var possibleactive = $(ttSugstionDom).get(indexactive + 1);
                        $($(ttSugstionDom).get(indexactive + 1)).addClass('active');
                        $(possibleactive).addClass('active');
                        $(item).val($(possibleactive).attr('data-select'));
                    }
                }

                event.preventDefault();
            }
            else {

                var trselected = $($(event.target).parent()).parent();
                $(trselected).removeClass('focusedItem');
                $($(trselected).next('tr')).addClass('focusedItem');
                if ($(event.target).hasClass('ProductName')) {
                    $($(trselected).next('tr')).find('input.ProductName').focus();
                }
            }
        }
        if (event.keyCode == 38) {/*UP*/
            var ttSugstionDom = $(event.target).parent().find('.tt-suggestion');
            var ttSugActive = $(event.target).parent().find('.tt-suggestion.active');
            if ($(ttSugstionDom).length > 0 && $(ttSugActive).length > 0 && $(ttSugstionDom).is(':visible')) {
                var suggestionlist = $(ttSugstionDom);
                var activesuggestion = $(ttSugActive);
                var indexactive = -1;
                for (var id = 0; id < suggestionlist.length; id++) {
                    if ($(suggestionlist[id]).hasClass('active'))
                        indexactive = id;
                }
                if (indexactive > 0) {
                    $(ttSugstionDom).removeClass('active');
                    var possibleactive = $(ttSugstionDom).get(indexactive - 1);
                    $(possibleactive).addClass('active');
                    $(item).val($(possibleactive).attr('data-select'))
                }
                event.preventDefault();
            }
            else {
                var trselected = $($(event.target).parent()).parent();
                $(trselected).removeClass('focusedItem');
                $($(trselected).prev('tr')).addClass('focusedItem');
                $($(trselected).prev('tr')).find('input.ProductName').focus();
            }
        }

    },
    SearchKeyUp = function (item, event) {
        if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13 || event.keyCode === 9)
            return false;
        var ExistEquipment = "";
        var ExistEquipmentInner = "";
        $(".HasItem").each(function () {
            ExistEquipmentInner += "'" + $(this).attr('data-id') + "',";
        });
        if (ExistEquipmentInner.length > 0) {
            ExistEquipmentInner = ExistEquipmentInner.slice(0, -1);
            ExistEquipment = "(" + ExistEquipmentInner + ")";
        }
        $.ajax({
            url: domainurl + "/Invoice/GetEquipmentListByKey",
            data: {
                key: $(item).val(),
                ExistEquipment: ExistEquipment
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var resultparse = JSON.parse(data.result);

                if (resultparse.length > 0) {
                    var searchresultstring = "<div class='NewProjectSuggestion'>";
                    for (var i = 0; i < resultparse.length; i++) {

                        searchresultstring = searchresultstring + String.format(PropertyUserSuggestiontemplate,
                        /*0*/resultparse[i].EquipmentId,
                        /*1*/ resultparse[i].EquipmentName.replaceAll('"', '\'\''),
                        /*2*/ resultparse[i].RetailPrice,
                        /*3*/resultparse[i].Reorderpoint,
                        /*4*/ resultparse[i].QuantityAvailable,
                        /*5*/ resultparse[i].EquipmentType,
                       /*6*/resultparse[i].EquipmentDescription.replaceAll('"', '\'\''),
                        /*7*/resultparse[i].ManufacturerName.replaceAll('"', '\'\''),/* ImageSource*/
                        /*8*/resultparse[i].IsTaxable,
                        /*9*/resultparse[i].SKU,
                        /*10*/resultparse[i].Equipmentvendorcost,
                        /*11*/ resultparse[i].EquipmentClassId);

                        var IsTaxableVal = resultparse[i].IsTaxable;
                    }
                    searchresultstring += "</div>";
                    var ttdom = $($(item).parent()).find('.tt-menu');
                    var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                    $(ttdomComplete).html(searchresultstring);
                    $(ttdom).show();
                    //console.log(IsTaxableVal);
                    //var IsTaxableItem = IsTaxableVal;
                    //var chkItemTaxable = $(item).parent().parent().find('.chkTaxable');
                    //$(chkItemTaxable).prop('checked', IsTaxableItem);

                    InvoiceEqSuggestionclickbind(item);
                    if (resultparse.length > 4) {
                        $(".NewProjectSuggestion").height(352);
                        $(".NewProjectSuggestion").css('position', 'relative');
                        /*$(".NewProjectSuggestion").perfectScrollbar()*/
                    }
                }
                if (resultparse.length == 0)
                    $('.tt-menu').hide();
            }
        });
    }

}


var TaxablePermit = 'false';
var IsDeleted = 'False';

$(document).ready(function () {
    console.log('invoice call 11');
    $("#CustomerInvoiceTab tbody").on('click', 'tr:last', function (e) {
        var InvoiceStatus = $('#InvoiceStatus').val();

        if ($(e.target).hasClass('fa')) {
            return;
        }
        if (InvoiceStatus === "Partial" || InvoiceStatus === "Paid") {
            return;
        }
        if (IsDeleted !== "True") {
            if (TaxablePermit.toLowerCase() === "true") {
                $("#CustomerInvoiceTab tbody tr:last").after(InvoiceCrmModel.NewEquipmentRowTaxable());
            }
            else {
                $("#CustomerInvoiceTab tbody tr:last").after(InvoiceCrmModel.NewEquipmentRow());
            }
        }
        InvoiceCrmModel.InitRowIndex();
    });
    /*Remove last row*/
    $("#CustomerInvoiceTab tbody").on('click', 'tr td svg', function (e) {
        if (InvoiceStatus === "Partial" || InvoiceStatus === "Paid") {
            return;
        }
        $(this).parent().parent().remove();
        if ($("#CustomerInvoiceTab tbody tr").length < 1) {
            if (TaxablePermit.toLowerCase() === "true") {
                $("#CustomerInvoiceTab tbody tr:last").after(InvoiceCrmModel.NewEquipmentRowTaxable());
            }
            else {
                $("#CustomerInvoiceTab tbody tr:last").after(InvoiceCrmModel.NewEquipmentRow());
            }
        }
        InvoiceCrmModel.InitRowIndex();
        //CalculateNewAmount();
    });
});
