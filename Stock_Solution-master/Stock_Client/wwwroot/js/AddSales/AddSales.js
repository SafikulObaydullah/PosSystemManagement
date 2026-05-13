var LoaderDom = "<div class='invoice-loader'><div><div class='lds-css ng-scope'><div style='margin:auto; z-index:99;' class='lds-double-ring'><div></div><div></div></div></div></div></div>";
var DefaultDueDate = "30";
var TotalAmount = 0;
var ServiceTotalAmount = 0;
var FinalTotal = 0;
var ServiceFinalTotal = 0;
var NonTaxValue = 0;
var ServiceNonTaxValue = 0;
var DiscountAmount = 0;
var ServiceDiscountAmount = 0;
var ShippingAmount = 0;
var DepositAmount = 0;
var BalanceDue = 0;
var ServiceBalanceDue = 0;
var DiscountDBPercent = 0;
var ServiceDiscountDBPercent = 0;
var DiscountDBAmount = 0;
var ServiceDiscountDBAmount = 0;
var TaxAmount = 0;
var ServiceTaxAmount = 0;
var TPVal = "0.00";
var ServiceTPVal = "0.00";
var SendEmailUrl = "";
var mailAdd = "";
var eqpserkeyparameter = "";
var InvoiceDatepicker;
var ShippingDate;
var DueDatepicker;
var EstimateConvertId = 0;
var Fdiscountamount = 0;
var ServiceFdiscountamount = 0;
var equipmentval = "";
var serviceval = "onlyservice";
var equipcategorydropdownval = $('#EquipmentCategory').html();
var CustomerIdNew = "";
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
var GetTimeFormat = function (date) {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    return new Date(date + ' ' + time)
}

String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};
var SmallLoader = '<div class="spinner-grow spinner-grow-sm" role="status">' + '</div>';
var PropertyUserSuggestiontemplate =
    '<div class="tt-suggestion tt-selectable" data-select="{1}" data-price="{2}" data-type="{}" data-id="{0}"  data-description="{3}">'
    //+ "<img src='{7}' class='EquipmentImage'>"
    + "<p class='tt-sug-text'>"
    + "<em class='tt-sug-type'></em>{1}" 
    + "<em class='tt-eq-price'>" +'Tk '+ "{2}</em>"
    + "<br />"
    + "</p> "
    + "</div>";

var CustomerSuggestiontemplate =
    '<div class="tt-suggestion tt-selectable"   data-firstName="{2}" data-lastName="{3}"  data-customerId="{4}" data-cellNo="{1}">'

    + "<p class='tt-sug-text'>"
    + "{0}"
    + " <em class='tt-sug-type'>{1}</em>"
    + "</p> "

    + "</div>";
var NewEquipmentRow = "<tr>"
    + "<td valign='top' class='rowindex'></td>";
if (EquipCategoryPermit.toLowerCase() == "true") {
    NewEquipmentRow += String.format("<td valign='top'><select class='EquipmentCategory form-control'>{0}</select> </td>", equipcategorydropdownval);

}
if (servicesetting.toLowerCase() == "true") {
    equipmentval = "onlyequipment";
    NewEquipmentRow += "<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event,equipmentval)' onkeyup='SearchKeyUp(this,event,equipmentval)' />";

}
else {
    equipmentval = "";

    NewEquipmentRow += "<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event,equipmentval)' onkeyup='SearchKeyUp(this,event,equipmentval)' />";
}
//"<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event,onlyequipmentval)' onkeyup='SearchKeyUp(this,event,onlyequipmentval)' />"
//eqpserkeyparameter
NewEquipmentRow += "<div class='tt-menu'>"
    + "<div class='tt-dataset tt-dataset-autocomplete'> </div> "
    + "</div>"
    + "<span class='spnProductName'></span>"
    + "</td>"
    //+ "<td valign='top'>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductDesc' />"
    //+ "<span class='spnProductDesc'></span>"
    //+ "</td>"

    + "<td valign='top'>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductQuantity' />"
    + "<span class='spnProductQuantity'></span>"
    + "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnRetailPrice'></span>"
    //+ "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtTotalRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnTotalRetalPrice'></span>"
    //+ "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + 'Tk' + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductRate' />"
    + "</div>"
    + "<span class='spnProductRate'></span>"
    + "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + 'Tk' + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductAmount' />"
    + "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductAmount' />"
    + "<span class='spnProductAmount'></span>"
    + "</td>"
    + "<td valign='top' class='tableActions'>"
    + "<div class='estimate_action_div'>"
    + "<i class='fa fa-trash' aria-hidden='true'></i>"
    + "</div>"
    + "</td>"
    + "</tr>";

var NewServiceRow = "<tr>"
    + "<td valign='top' class='rowindex'></td>";
if (EquipCategoryPermit.toLowerCase() == "true") {
    NewServiceRow += String.format("<td valign='top'><select class='EquipmentCategory form-control'>{0}</select> </td>", equipcategorydropdownval);

}
NewServiceRow +=
    "<td valign='top'><input type='text'class='ServiceName' onkeydown='SearchKeyDown(this,event,serviceval)' onkeyup='SearchKeyUp(this,event,serviceval)' />"
    + "<div class='tt-menu'>"
    + "<div class='tt-dataset tt-dataset-autocomplete'> </div> "
    + "</div>"
    + "<span class='spnServiceName'></span>"
    + "</td>"
    + "<td valign='top'>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceDesc' />"
    + "<span class='spnServiceDesc'></span>"
    + "</td>"

    + "<td valign='top'>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceQuantity' />"
    + "<span class='spnServiceQuantity'></span>"
    + "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnServiceRetailPrice'></span>"
    //+ "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceTotalRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnServiceTotalRetalPrice'></span>"
    //+ "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + Currency + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceRate' />"
    + "</div>"
    + "<span class='spnServiceRate'></span>"
    + "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + Currency + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceAmount' />"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductAmount' />"
    + "<span class='spnServiceAmount'></span>"
    + "</td>"
    + "<td valign='top' class='tableActions'>"
    + "<div class='estimate_action_div'>"
    + "<i class='fa fa-trash-o' aria-hidden='true'></i>"
    + "</div>"
    + "</td>"
    + "</tr>";
var NewEquipmentRowTaxable = "<tr>"
    + "<td valign='top' class='rowindex'></td>";
if (servicesetting.toLowerCase() == "true") {
    equipmentval = "onlyequipment";
    NewEquipmentRowTaxable += "<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event,equipmentval)' onkeyup='SearchKeyUp(this,event,equipmentval)' />";
}
else {
    equipmentval = "";

    NewEquipmentRowTaxable += "<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event,equipmentval)' onkeyup='SearchKeyUp(this,event,equipmentval)' />";
}
NewEquipmentRowTaxable += "<div class='tt-menu'>"
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
    + "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnRetailPrice'></span>"
    //+ "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtTotalRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnTotalRetalPrice'></span>"
    //+ "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + Currency + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductRate' />"
    + "</div>"
    + "<span class='spnProductRate'></span>"
    + "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + Currency + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductAmount' />"
    + "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductAmount' />"
    + "<span class='spnProductAmount'></span>"
    + "</td>"
    + "<td valign='top' class='tableActions'>"
    + "<div class='estimate_action_div'>"
    + "<input type='checkbox' style='display:block;' onkeydown='OthersKeyDown(this,event)' class='chkTaxable' />"
    + "<i class='fa fa-trash-o' aria-hidden='true'></i>"
    + "</div>"
    + "</td>"
    + "</tr>";
var NewServiceRowTaxable = "<tr>"
    + "<td valign='top' class='rowindex'></td>"
    + "<td valign='top'><input type='text'class='ServiceName' onkeydown='SearchKeyDown(this,event,serviceval)' onkeyup='SearchKeyUp(this,event,serviceval)' />"
    + "<div class='tt-menu'>"
    + "<div class='tt-dataset tt-dataset-autocomplete'> </div> "
    + "</div>"
    + "<span class='spnServiceName'></span>"
    + "</td>"
    + "<td valign='top'>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceDesc' />"
    + "<span class='spnServiceDesc'></span>"
    + "</td>"

    + "<td valign='top'>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceQuantity' />"
    + "<span class='spnServiceQuantity'></span>"
    + "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnServiceRetailPrice'></span>"
    //+ "</td>"
    //+ "<td valign='top' class='retail_area'>"
    //+ "<div class='C_S I_G'>"
    //+ "<div class='input-group-prepend'>"
    //+ "<div class='input-group-text'>" + Currency + "</div>"
    //+ "</div>"
    //+ "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceTotalRetailPrice' />"
    //+ "</div>"
    //+ "<span class='spnServiceTotalRetalPrice'></span>"
    //+ "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + Currency + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceRate' />"
    + "</div>"
    + "<span class='spnServiceRate'></span>"
    + "</td>"
    + "<td valign='top'>"
    + "<div class='C_S I_G'>"
    + "<div class='input-group-prepend'>"
    + "<div class='input-group-text'>" + Currency + "</div>"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtServiceAmount' />"
    + "</div>"
    + "<input type='text' onkeydown='OthersKeyDown(this,event)' class='txtProductAmount' />"
    + "<span class='spnServiceAmount'></span>"
    + "</td>"
    + "<td valign='top' class='tableActions'>"
    + "<div class='estimate_action_div'>"
    + "<input type='checkbox' style='display:block;' onkeydown='OthersKeyDown(this,event)' class='chkTaxable' />"
    + "<i class='fa fa-trash-o' aria-hidden='true'></i>"
    + "</div>"
    + "</td>"
    + "</tr>";
var OpenClosingConfirmationMessage = function () {
    CloseTopToBottomModal();
    //if (IsChanged) {
    //    OpenConfirmationMessageNew("Confirmation", "Do you want to leave? Changes you made may not be saved.", function () {
    //        CloseTopToBottomModal();
    //    });
    //} else {
      
    //}
}

var EstimateCustomerclickbind = function (item) {
    $('.customer_name_insert_div .tt-suggestion').click(function () {
        var clickitem = this;
        $('.customer_name_insert_div .tt-menu').hide();
        var Customerfnum = $(clickitem).attr("data-firstName").trim();
        var Customerlnum = $(clickitem).attr("data-lastName").trim();
        var CustomerGuId = $(clickitem).attr("data-customerId").trim();
        $('#InvoiceCustomerId').val(CustomerGuId);
        CustomerIdNew = CustomerGuId;
        var CustomerPhoneNum = $(clickitem).attr("data-cellNo").trim();
        if (typeof (CustomerPhoneNum) != "undefined" && CustomerPhoneNum != null && CustomerPhoneNum != "") {
            var spphnnum = CustomerPhoneNum.split(';');
            if (spphnnum.length > 0) {
                $(".add_invoice_phnnum").html("<span class='span-style'>Phone Number<span class='red'>*</span></span><select class='form-control' id='PhnNum' datarequired='true'><option value='-1'>Please Select</option></select>");
                for (var phn = 0; phn < spphnnum.length; phn++) {
                    if (spphnnum[phn] != "") {
                        $("#PhnNum").append("<option value='" + spphnnum[phn] + "'>" + spphnnum[phn] + "</option>");
                    }
                }
            }
        }
        var displayname = Customerfnum + ' ' + Customerlnum;
        $("#CustomerList").val(displayname);
        //$("#InvoicePhoneNumber").val(CustomerPhoneNum);
        //ajax call for registration brand model lies here!!
        //$.ajax({
        //    type: "POST",
        //    url: domainurl + "/Invoice/GetCustomerAddressByCustomerId",
        //    data: JSON.stringify({
        //        CustomerId: CustomerGuId
        //    }),
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (data) {
        //        if (data.result == true) {
        //            tinyMCE.get('Invoice_BillingAddress').setContent(data.BillingAddressVal);
        //            tinyMCE.get('Invoice_ShippingAddress').setContent(data.ShippingAddressVal);
        //        }
        //    }
        //});
    });
    $('.customer_name_insert_div .tt-suggestion').hover(function () {
        var clickitem = this;
        $('.tt-suggestion').removeClass("active");
        $(clickitem).addClass('active');
    });
}

var CustomerSearchKeyDown = function (item, event) {
    if (event.keyCode == 13) {
        var selectedTTMenu = $(event.target).parent().find('.tt-suggestion.active');
        if (selectedTTMenu.length > 0) {
            setTimeout(function () { $(selectedTTMenu).click(); }, 10)
            $('.tt-menu').hide();
        }
    }
    if (event.keyCode == 40) {
        var ttSugstionDom = $(event.target).parent().find('.tt-suggestion');
        var ttSugActive = $(event.target).parent().find('.tt-suggestion.active');
        if ($(ttSugstionDom).length > 0) {
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
    }
    if (event.keyCode == 38) {
        var ttSugstionDom = $(event.target).parent().find('.tt-suggestion');
        var ttSugActive = $(event.target).parent().find('.tt-suggestion.active');
        if ($(ttSugstionDom).length > 0 && $(ttSugActive).length > 0) {
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
    }
}

var CustomerSearchKeyUp = function (item, event) {
    //alert('1')
    $("#VehicleIfoService").hide();
    $("#VehicleInfoSeriveOrg").show();
    if (event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13)
        return false;
   // alert('2')
    $.ajax({
        url:"/Sales/GetCustomerListByKey",
        data: {
            key: $(item).val()
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var resultparse = JSON.parse(data.result.customerSearchModelDataString);
            console.log(resultparse);
            //var resultparse = data.result.CustomerSearchModelData;
            if (resultparse.length > 0) {
                var searchresultstring = "<div class='NewProjectSuggestion'>";
                for (var i = 0; i < resultparse.length; i++) {
                    if (resultparse[i].Type == "Commercial") {
                        var name = resultparse[i].BusinessName;
                    }
                    else {
                        var name = resultparse[i].FirstName + ' ' + resultparse[i].LastName;
                    }

                    searchresultstring = searchresultstring + String.format(CustomerSuggestiontemplate,
                        resultparse[i].Id + ' - ' + name,/*0*/                     
                        resultparse[i].PhoneNumber,/*1*/
                        resultparse[i].FirstName,/*2*/
                        resultparse[i].LastName,/*3*/
                        resultparse[i].CustomerId/*4*/
                    );
                }
                searchresultstring += "</div>";
                var ttdom = $($(item).parent()).find('.tt-menu');
                var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                $(ttdomComplete).html(searchresultstring);
                $(ttdom).show();

                EstimateCustomerclickbind(item);
                if (resultparse.length > 4) {
                    $(".customer_name_insert_div .NewProjectSuggestion").height(200);
                    //$(".NewProjectSuggestion").css('position', 'relative');
                }
            }
            if (resultparse.length == 0)
                $('.tt-menu').hide();
        }
    });
}




var SaveAndNew = function () {
    SaveEstimate(false, false, "others");
    if ($(".HasItem").length != 0) {
        OpenTopToBottomModal(domainurl + "/Invoice/AddInvoiceService/?customerid=" + customerId);
    }

}
var SaveAndClose = function () {
    SaveEstimate(true, false, "others");
}
var SaveAndShare = function () {
    SaveEstimate(false, true);
    CloseTopToBottomModal();
    OpenSuccessMessageNew("Success!", "Invoice Successfully Saved and Sent to Customer.", function () { OpenEstimateTab() });
}

var makeSendEmailUrl = function () {

    mailAdd = encodeURIComponent($("#EmailAddress").val());
    SendEmailUrl = "/Estimate/SendEmailEstimate/?Id=" + UrlModelInvoiceId + "&EmailAddress=" + mailAdd;
    $("#EstimatePrintAndSend").attr("href", SendEmailUrl);
}

var SendContract = function () {
    SaveEstimate(false, false, "contractpreview");
    //CloseTopToBottomModal();
    ////OpenLeadEstimateTab();
    //setTimeout(function () {
    //    OpenTopToBottomModal(domainurl + "/SmartLeads/GetSmartLeadsForPopUp/?LeadId=" + CustomerLoadId + "&grant=" + false + "&firstpage=" + false + "&recreate=" + false + "&isinvoice=" + true + "&invoiceid=" + InvoiceId);
    //}, 1000
    //)


}

var SaveAndSend = function () {
    //is exist
    console.log("df");
    //makeSendEmailUrl();
    SaveEstimate(false, true, "preview");
    //OpenEstimateTab();
}
var AddNewRowFunc = function (lol, t) {
    //if ($(e.target).hasClass('fa')) {
    //    return;
    //}
    if (InvoiceStatus == "Partial" || InvoiceStatus == "Paid") {
        return;
    }
    if (TaxablePermit.toLowerCase() == "true") {
        console.log("fire 1")
        $("#CustomerEstimateTab tbody tr:last").after(NewEquipmentRowTaxable);
    }
    else {
        console.log("fire 2")
        $("#CustomerEstimateTab tbody tr:last").after(NewEquipmentRow);
        //console.log(lol);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ')').addClass('HasItem');
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ')').attr('data-id', lol.EquipmentId);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(2)').find('span').text(lol.EquipmentName);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(2)').find('.spnProductName').val(lol.EquipmentName);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(2)').find('.ProductName').val(lol.EquipmentName);
        //$('.CustomerEstimateTab tbody tr:nth-child(' + t + ')td:nth-child(3)').find('.txtProductDesc').val(lol.Description);
        //$('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(3)').find('.spnProductDesc').text(lol.Description);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(4)').find('.spnProductQuantity').text(1);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(4)').find('.txtProductQuantity').val(1);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(5)').find('.spnProductRate').text(Currency + lol.RetailPrice);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(5)').find('.txtProductRate').val(lol.RetailPrice);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(6)').find('.spnProductAmount').text(Currency + lol.RetailPrice);
        $('.CustomerEstimateTab tbody tr:nth-child(' + t + ') td:nth-child(6)').find('.txtProductAmount').val(lol.RetailPrice);
    }
    var i = 1;
    $(".CustomerEstimateTab tbody tr td:first-child").each(function () {
        console.log("fire 3")
        $(this).text(i);
        i += 1;
    });
    CalculateNewAmount();
}
var GetAllServiceEquipment = function (serviceId, currentrowIndex) {
    $.ajax({
        url: "/Invoice/GetAllEquipmentsByServiceId?ServiceId=" + serviceId,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log('ajax call for all service with product by sabit');
            var json = (data.result);
            var jsonCount = data.result.length;
            console.log(json);
            console.log(jsonCount);
            if (json.length > 0) {
                console.log(json);
                for (var i = 0; i < json.length; i++) {
                    var tes = (parseInt(currentrowIndex) + i);
                    console.log(tes);
                    AddNewRowFunc(json[i], tes);
                }
            }
        },
        error: function () {
            alert("Error!");
        }
    });
}
var EstimateEqSuggestionclickbind = function (item) {
    $('.CustomerEstimateTab .tt-suggestion').click(function () {
        if ($(".CustomerEstimateTab tbody tr").hasClass('focusedItem')) {
            var currentrowIndex = $(".CustomerEstimateTab tbody tr:last td:nth-child(1)").text();
            //alert(currentrowIndex);
        }
        var clickitem = this;
        $('.CustomerEstimateTab .tt-menu').hide();
        $(item).val($(clickitem).attr('data-select'));
        $(item).attr('data-id', $(clickitem).attr('data-id'));

        var serviceId = $(clickitem).attr('data-id');
        //GetAllServiceEquipment(serviceId, currentrowIndex);

        var itemName = $(item).parent().find('span');
        $(itemName).text($(item).val());

        $(item).parent().parent().attr('data-id', $(clickitem).attr('data-id'));
        $(item).parent().parent().addClass('HasItem');
        /*Item Rate Set*/
        var spnItemRate = $(item).parent().parent().find('.spnProductRate');
        $(spnItemRate).text("Tk" + $(this).attr('data-price'));
        var txtItemRate = $(item).parent().parent().find('.txtProductRate');
        $(txtItemRate).val($(this).attr('data-price'));
        /*Item Description Set*/
        var spnItemRate = $(item).parent().parent().find('.spnProductDesc');
        $(spnItemRate).text($(this).attr('data-description'));
        //var txtItemRate = $(item).parent().parent().find('.txtProductDesc');
        //$(txtItemRate).val($(this).attr('data-description'));
        /*Item Quantity Set*/
        var spnItemRate = $(item).parent().parent().find('.spnProductQuantity');
        $(spnItemRate).text(1);
        var txtItemRate = $(item).parent().parent().find('.txtProductQuantity');
        $(txtItemRate).val(1);
        console.log("here");
        var spnItemRetail = $(item).parent().parent().find('.spnRetailPrice');
        $(spnItemRetail).text("Tk" + $(this).attr('data-vendorCost'));
        var txtItemRatail = $(item).parent().parent().find('.txtRetailPrice');
        $(txtItemRatail).val($(this).attr('data-vendorCost'));

        var spnItemTotalRetail = $(item).parent().parent().find('.spnTotalRetalPrice');
        $(spnItemTotalRetail).text("Tk" + $(this).attr('data-vendorCost'));
        var txtItemTotalRatail = $(item).parent().parent().find('.txtTotalRetailPrice');
        $(txtItemTotalRatail).val($(this).attr('data-vendorCost'));


        /*Item Amount Set*/
        var spnItemRate = $(item).parent().parent().find('.spnProductAmount');
        $(spnItemRate).text("Tk" + $(this).attr('data-price'));
        var txtItemRate = $(item).parent().parent().find('.txtProductAmount');
        $(txtItemRate).val($(this).attr('data-price'));


        /*Taxable*/
        var IsTaxableItem = $(this).attr('data-taxable');
        var chkItemTaxable = $(item).parent().parent().find('.chkTaxable');
        $(chkItemTaxable).prop('checked', IsTaxableItem);


        CalculateNewAmount();

    });
    $('.CustomerEstimateTab .tt-suggestion').hover(function () {
        var clickitem = this;
        $('.tt-suggestion').removeClass("active");
        $(clickitem).addClass('active');
    });
}
var EstimateServiceSuggestionclickbind = function (item) {
    $('.CustomerEstimateServiceTab .tt-suggestion').click(function () {
        var clickitem = this;
        $('.CustomerEstimateServiceTab .tt-menu').hide();
        $(item).val($(clickitem).attr('data-select'));
        $(item).attr('data-id', $(clickitem).attr('data-id'));
        var itemName = $(item).parent().find('span');
        $(itemName).text($(item).val());

        $(item).parent().parent().attr('data-id', $(clickitem).attr('data-id'));
        $(item).parent().parent().addClass('HasServiceItem');
        /*Item Rate Set*/
        var spnItemRate = $(item).parent().parent().find('.spnServiceRate');
        $(spnItemRate).text("$" + $(this).attr('data-price'));
        var txtItemRate = $(item).parent().parent().find('.txtServiceRate');
        $(txtItemRate).val($(this).attr('data-price'));
        /*Item Description Set*/
        var spnItemRate = $(item).parent().parent().find('.spnServiceDesc');
        $(spnItemRate).text($(this).attr('data-description'));
        var txtItemRate = $(item).parent().parent().find('.txtServiceDesc');
        $(txtItemRate).val($(this).attr('data-description'));
        /*Item Quantity Set*/
        var spnItemRate = $(item).parent().parent().find('.spnServiceQuantity');
        $(spnItemRate).text(1);
        var txtItemRate = $(item).parent().parent().find('.txtServiceQuantity');
        $(txtItemRate).val(1);
        console.log("here");
        var spnItemRetail = $(item).parent().parent().find('.spnServiceRetailPrice');
        $(spnItemRetail).text("$" + $(this).attr('data-vendorCost'));
        var txtItemRatail = $(item).parent().parent().find('.txtServiceRetailPrice');
        $(txtItemRatail).val($(this).attr('data-vendorCost'));

        var spnItemTotalRetail = $(item).parent().parent().find('.spnServiceTotalRetalPrice');
        $(spnItemTotalRetail).text("$" + $(this).attr('data-vendorCost'));
        var txtItemTotalRatail = $(item).parent().parent().find('.txtServiceTotalRetailPrice');
        $(txtItemTotalRatail).val($(this).attr('data-vendorCost'));


        /*Item Amount Set*/
        var spnItemRate = $(item).parent().parent().find('.spnServiceAmount');
        $(spnItemRate).text("$" + $(this).attr('data-price'));
        var txtItemRate = $(item).parent().parent().find('.txtServiceAmount');
        $(txtItemRate).val($(this).attr('data-price'));


        /*Taxable*/
        var IsTaxableItem = $(this).attr('data-taxable');
        var chkItemTaxable = $(item).parent().parent().find('.chkTaxable');
        $(chkItemTaxable).prop('checked', IsTaxableItem);


        CalculateServiceNewAmount();

    });
    $('.CustomerEstimateServiceTab .tt-suggestion').hover(function () {
        var clickitem = this;
        $('.tt-suggestion').removeClass("active");
        $(clickitem).addClass('active');
    });
}

var SearchKeyUp = function (item, event, servicesettingval) {

    if (servicesettingval == "onlyservice") {
        console.log("debug");
        if (event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13)
            return false;
        var ExistEquipment = "";
        var ExistEquipmentInner = "";
        var urlservice = "/Invoice/GetOnlyServiceListByKey";

        $(".HasServiceItem").each(function () {
            ExistEquipmentInner += "'" + $(this).attr('data-id') + "',";
        });
        if (ExistEquipmentInner.length > 0) {
            ExistEquipmentInner = ExistEquipmentInner.slice(0, -1);
            ExistEquipment = "(" + ExistEquipmentInner + ")";
        }
        if (EquipCategoryPermit.toLowerCase() == "true") {
            var EqpCategory = $(item).parent().parent().find('.EquipmentCategory').val();
            if (EqpCategory != "-1") {
                urlservice = "/Invoice/GetOnlyServiceListByTypeAndKey?EqpTypeId=" + EqpCategory;
            }
        }

        $.ajax({
            url: domainurl + urlservice,
            data: {
                key: $(item).val(),
                ExistEquipment: ExistEquipment
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var resultparse = JSON.parse(data.result);

                if (resultparse.length > 0) {
                    var searchresultstring = "<div class='NewProjectSuggestion'>";
                    for (var i = 0; i < resultparse.length; i++) {
                        searchresultstring = searchresultstring + String.format(PropertyUserSuggestiontemplate,
                        /*0*/resultparse[i].ProductId,
                        /*1*/ resultparse[i].Name,
                        /*2*/ resultparse[i].SalesPrice,
                        /*3*/resultparse[i].Description
                        ///*4*/ resultparse[i].QuantityAvailable,
                        ///*5*/ resultparse[i].EquipmentType,

                        );
                    }

                    searchresultstring += "</div>";
                    var ttdom = $($(item).parent()).find('.tt-menu');
                    var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                    $(ttdomComplete).html(searchresultstring);
                    $(ttdom).show();

                    EstimateServiceSuggestionclickbind(item);
                    console.log(resultparse.length);
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

    else {
        if (event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 13)
            return false;
        var ExistEquipment = "";
        var ExistEquipmentInner = "";
        console.log("pointer");
        var urleqp = "/Sales/GetEquipmentListByKey";

        if (servicesettingval == "onlyequipment") {
            urleqp = "/Invoice/GetOnlyEquipmentListByKey";
        }
        if (EquipCategoryPermit.toLowerCase() == "true") {
            var EqpCategory = $(item).parent().parent().find('.EquipmentCategory').val();
            if (EqpCategory != "-1") {
                urleqp = "/Invoice/GetEquipmentListByTypeAndKey?EqpTypeId=" + EqpCategory;
            }
            console.log($(item).parent().parent().find('.EquipmentCategory').val() + "category dhukss");
        }
        if (servicesettingval == "onlyequipment" && EquipCategoryPermit.toLowerCase() == "true") {
            var EqpCategory = $(item).parent().parent().find('.EquipmentCategory').val();
            if (EqpCategory != "-1") {
                urleqp = "/Invoice/GetOnlyEquipmentListByTypeAndKey?EqpTypeId=" + EqpCategory;
            }
        }

        $(".HasItem").each(function () {

            ExistEquipmentInner += "'" + $(this).attr('data-id') + "',";
        });
        if (ExistEquipmentInner.length > 0) {
            ExistEquipmentInner = ExistEquipmentInner.slice(0, -1);
            ExistEquipment = "(" + ExistEquipmentInner + ")";
        }
        $.ajax({
            url: domainurl + urleqp,
            data: {
                key: $(item).val(),
                ExistEquipment: ExistEquipment
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var resultparse = JSON.parse(data.result.customerSearchModelDataString);
                console.log(resultparse);
                if (resultparse.length > 0) {
                    var searchresultstring = "<div class='NewProjectSuggestion'>";
                    for (var i = 0; i < resultparse.length; i++) {
                        searchresultstring = searchresultstring + String.format(PropertyUserSuggestiontemplate,
                        /*0*/resultparse[i].ProductId,
                        /*1*/ resultparse[i].Name,
                        /*2*/ resultparse[i].SalesPrice,
                        /*3*/resultparse[i].Description
                            ///*4*/ resultparse[i].QuantityAvailable,
                            ///*5*/ resultparse[i].EquipmentType,

                        );
                    }

                    searchresultstring += "</div>";
                    var ttdom = $($(item).parent()).find('.tt-menu');
                    var ttdomComplete = $($(item).parent()).find('.tt-dataset-autocomplete');
                    $(ttdomComplete).html(searchresultstring);
                    $(ttdom).show();

                    EstimateEqSuggestionclickbind(item);
                    console.log(resultparse.length);
                    if (resultparse.length > 4) {
                        $(".NewProjectSuggestion").height(352);
                        $(".NewProjectSuggestion").css('position', 'relative');
                        //$(".NewProjectSuggestion").perfectScrollbar();
                    }
                }
                if (resultparse.length == 0)
                    $('.tt-menu').hide();
            }
        });
    }
}
var SearchKeyDown = function (item, event, servicesettingval) {
    if (servicesettingval == "onlyservice") {
        if (event.keyCode == 13) {
            var selectedTTMenu = $(event.target).parent().find('.tt-suggestion.active');
            $(selectedTTMenu).click();
            $('.tt-menu').hide();
        }
        if (event.keyCode == 40) {
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
                $($(trselected).next('tr')).find('input.ServiceName').focus();
            }
        }
        if (event.keyCode == 38) {
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
                $($(trselected).prev('tr')).find('input.ServiceName').focus();
            }
        }
    }

    else {
        if (event.keyCode == 13) {
            var selectedTTMenu = $(event.target).parent().find('.tt-suggestion.active');
            $(selectedTTMenu).click();
            $('.tt-menu').hide();
        }
        if (event.keyCode == 40) {
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
                $($(trselected).next('tr')).find('input.ProductName').focus();
            }
        }
        if (event.keyCode == 38) {
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
    }
}
var OthersKeyDown = function (item, event, servicesettingval) {
    if (servicesettingval == "onlyservice") {
        if (event.keyCode == 40) {
            var trselected = $($(event.target).parent()).parent();
            $(trselected).removeClass('focusedItem');
            $($(trselected).next('tr')).addClass('focusedItem');
            if ($(event.target).hasClass('txtServiceDesc')) {
                $($(trselected).next('tr')).find('input.txtServiceDesc').focus();
            } else if ($(event.target).hasClass('txtServiceQuantity')) {
                $($(trselected).next('tr')).find('input.txtServiceQuantity').focus();
            } else if ($(event.target).hasClass('txtServiceRetailPrice')) {
                $($(trselected).next('tr')).find('input.txtServiceRetailPrice').focus();
            } else if ($(event.target).hasClass('txtServiceTotalRetailPrice')) {
                $($(trselected).next('tr')).find('input.txtServiceTotalRetailPrice').focus();
            } else if ($(event.target).hasClass('txtServiceRate')) {
                $($(trselected).next('tr')).find('input.txtServiceRate').focus();
            } else if ($(event.target).hasClass('txtServiceAmount')) {
                $($(trselected).next('tr')).find('input.txtServiceAmount').focus();
            } else if ($(event.target).hasClass('chkTaxable')) {
                $($(trselected).next('tr')).find('input.chkTaxable').focus();
            }
        } else if (event.keyCode == 38) {
            var trselected = $($(event.target).parent()).parent();
            $(trselected).removeClass('focusedItem');
            $($(trselected).prev('tr')).addClass('focusedItem');
            if ($(event.target).hasClass('txtServiceDesc')) {
                $($(trselected).prev('tr')).find('input.txtServiceDesc').focus();
            } else if ($(event.target).hasClass('txtServiceQuantity')) {
                $($(trselected).prev('tr')).find('input.txtServiceQuantity').focus();
            } else if ($(event.target).hasClass('txtServiceRetailPrice')) {
                $($(trselected).prev('tr')).find('input.txtServiceRetailPrice').focus();
            } else if ($(event.target).hasClass('txtServiceTotalRetailPrice')) {
                $($(trselected).prev('tr')).find('input.txtServiceTotalRetailPrice').focus();
            } else if ($(event.target).hasClass('txtServiceRate')) {
                $($(trselected).prev('tr')).find('input.txtServiceRate').focus();
            } else if ($(event.target).hasClass('txtServiceAmount')) {
                $($(trselected).prev('tr')).find('input.txtServiceAmount').focus();
            } else if ($(event.target).hasClass('chkTaxable')) {
                $($(trselected).prev('tr')).find('input.chkTaxable').focus();
            }
        }
        else if (event.keyCode == 9 && $(event.target).hasClass('txtServiceAmount')) {
            var trselected = $($(event.target).parent()).parent();
            $(trselected).removeClass('focusedItem');
            var trfocuseditem = $(trselected).next('tr');
            $(trfocuseditem).addClass('focusedItem');
            $($(trfocuseditem).find('input.ServiceName')).focus();
            event.preventDefault();
        }
    }

    else {
        if (event.keyCode == 40) {
            var trselected = $($(event.target).parent()).parent();
            $(trselected).removeClass('focusedItem');
            $($(trselected).next('tr')).addClass('focusedItem');
            if ($(event.target).hasClass('txtProductDesc')) {
                $($(trselected).next('tr')).find('input.txtProductDesc').focus();
            } else if ($(event.target).hasClass('txtProductQuantity')) {
                $($(trselected).next('tr')).find('input.txtProductQuantity').focus();
            } else if ($(event.target).hasClass('txtRetailPrice')) {
                $($(trselected).next('tr')).find('input.txtRetailPrice').focus();
            } else if ($(event.target).hasClass('txtTotalRetailPrice')) {
                $($(trselected).next('tr')).find('input.txtTotalRetailPrice').focus();
            } else if ($(event.target).hasClass('txtProductRate')) {
                $($(trselected).next('tr')).find('input.txtProductRate').focus();
            } else if ($(event.target).hasClass('txtProductAmount')) {
                $($(trselected).next('tr')).find('input.txtProductAmount').focus();
            } else if ($(event.target).hasClass('chkTaxable')) {
                $($(trselected).next('tr')).find('input.chkTaxable').focus();
            }
        } else if (event.keyCode == 38) {
            var trselected = $($(event.target).parent()).parent();
            $(trselected).removeClass('focusedItem');
            $($(trselected).prev('tr')).addClass('focusedItem');
            if ($(event.target).hasClass('txtProductDesc')) {
                $($(trselected).prev('tr')).find('input.txtProductDesc').focus();
            } else if ($(event.target).hasClass('txtProductQuantity')) {
                $($(trselected).prev('tr')).find('input.txtProductQuantity').focus();
            } else if ($(event.target).hasClass('txtRetailPrice')) {
                $($(trselected).prev('tr')).find('input.txtRetailPrice').focus();
            } else if ($(event.target).hasClass('txtTotalRetailPrice')) {
                $($(trselected).prev('tr')).find('input.txtTotalRetailPrice').focus();
            } else if ($(event.target).hasClass('txtProductRate')) {
                $($(trselected).prev('tr')).find('input.txtProductRate').focus();
            } else if ($(event.target).hasClass('txtProductAmount')) {
                $($(trselected).prev('tr')).find('input.txtProductAmount').focus();
            } else if ($(event.target).hasClass('chkTaxable')) {
                $($(trselected).prev('tr')).find('input.chkTaxable').focus();
            }
        }
        else if (event.keyCode == 9 && $(event.target).hasClass('txtProductAmount')) {
            var trselected = $($(event.target).parent()).parent();
            $(trselected).removeClass('focusedItem');
            var trfocuseditem = $(trselected).next('tr');
            $(trfocuseditem).addClass('focusedItem');
            $($(trfocuseditem).find('input.ProductName')).focus();
            event.preventDefault();
        }
    }

}
var NewAmountCallCount = 0;
var CalculateNewAmount = function () {
    NewAmountCallCount++;
    if (NewAmountCallCount > 1) {
        IsChanged = true;
    }
    var amount = parseFloat('0');
    var nontaxamount = parseFloat('0');
    $(".txtProductAmount").each(function () {

        var _CalAmt = $(this).val().trim();
        _CalAmt = _CalAmt.replaceAll(',', '');

        var currAmount = parseFloat(_CalAmt);
        if (!isNaN(currAmount)) {
            amount += currAmount;
        }
    });


    amount = parseFloat(amount).toFixed(2);
    nontaxamount = parseFloat(nontaxamount).toFixed(2);
    amount1 = amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    $(".amount").text("Tk" + amount1);
    TotalAmount = amount;
    FinalTotal = amount;
    NonTaxValue = nontaxamount;
    BalanceDue = amount;
    TransMakeCurrency = "Tk";
    //$(".FinalTotalTxt").text(TransMakeCurrency + FinalTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    //$(".balanceDueAmount").text(TransMakeCurrency + BalanceDue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//    $(".amount-big").text(TransMakeCurrency + BalanceDue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
}
var ServiceNewAmountCallCount = 0;
//var CalculateServiceNewAmount = function () {
//    ServiceNewAmountCallCount++;
//    if (ServiceNewAmountCallCount > 1) {
//        IsChanged = true;
//    }
//    var amount = parseFloat('0');
//    var nontaxamount = parseFloat('0');
//    $(".txtServiceAmount").each(function () {

//        var _CalAmt = $(this).val().trim();
//        _CalAmt = _CalAmt.replaceAll(',', '');

//        var currAmount = parseFloat(_CalAmt);
//        if (!isNaN(currAmount)) {
//            amount += currAmount;
//        }
//    });
//    //Non Tax amount calculate 
//    if (TaxablePermit.toLowerCase() == "true") {
//        $(".HasServiceItem").each(function () {
//            console.log("test");
//            if ($(this).find('.chkTaxable').is(':checked') == false) {
//                var _CalAmt = $(this).find('.txtServiceAmount').val().trim();
//                _CalAmt = _CalAmt.replaceAll(',', '');

//                var currAmount = parseFloat(_CalAmt);
//                if (!isNaN(currAmount)) {
//                    nontaxamount += currAmount;
//                }
//            }

//        });
//    }

//    amount = parseFloat(amount).toFixed(2);
//    nontaxamount = parseFloat(nontaxamount).toFixed(2);
//    amount1 = amount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
//    $(".Serviceamount").text(TransMakeCurrency + amount1);
//    ServiceTotalAmount = amount;
//    ServiceFinalTotal = amount;
//    ServiceNonTaxValue = nontaxamount;
//    ServiceBalanceDue = amount;

//    if ($("#ServiceDiscountType").val() == "percent") {
//        var a = 0;
//        var Fval = 0;
//        var discountAmount = 0;
//        if ($("#ServicediscountAmount").length > 0) {
//            if ($("#ServicediscountAmount").val() == "") {
//                discountAmount = 0;
//            }
//            else {
//                discountAmount = $("#ServicediscountAmount").val();
//            }
//        }
//        ServiceFdiscountamount = ServiceTotalAmount - ((amount / 100) * discountAmount);
//        if (discountAmount != "" && ServiceFdiscountamount > 0) {
//            var discountAmountPercent = parseFloat(discountAmount);
//            ServiceDiscountDBPercent = discountAmountPercent;
//            ServiceDiscountDBAmount = a;
//            ServiceDiscountAmount = (amount / 100) * discountAmountPercent;
//            ServiceFinalTotal = ServiceTotalAmount - ServiceDiscountAmount;
//            ServiceBalanceDue = ServiceFinalTotal;
//            $(".ServiceshippingAmountTxt").text(TransMakeCurrency + ServiceDiscountAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//            if (ServiceDiscountAmount == 0) {
//                $(".ServiceDiscount-total").addClass('hidden');
//            }
//            else {
//                $(".ServiceDiscountAmountTxt").text(TransMakeCurrency + ServiceFdiscountamount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//            }
//        }
//        else {
//            $(".ServiceshippingAmountTxt").text(TransMakeCurrency + "0.00");
//            $("#ServicediscountAmount").val("");
//            $(".ServiceDiscountAmountTxt").text(TransMakeCurrency + "0.00");
//        }
//    }
//    if ($("#ServiceDiscountType").val() == "amount") {
//        var a = 0;
//        var discountAmount = 0;
//        if ($("#ServicediscountAmount").length > 0) {
//            if ($("#ServicediscountAmount").val() == "") {
//                discountAmount = 0;
//            }
//            else {
//                discountAmount = $("#ServicediscountAmount").val();
//            }
//        }
//        if (discountAmount != "" && ServiceDiscountAmount < amount) {
//            var discountAmountPercent = parseFloat(discountAmount);
//            ServiceDiscountDBAmount = discountAmountPercent;
//            ServiceDiscountDBPercent = a;
//            ServiceDiscountAmount = discountAmountPercent;
//            ServiceFinalTotal = ServiceTotalAmount - ServiceDiscountAmount;
//            ServiceBalanceDue = ServiceFinalTotal;
//            ServiceFdiscountamount = amount - ServiceDiscountAmount;
//            $(".ServiceshippingAmountTxt").text(TransMakeCurrency + ServiceDiscountAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//            if (ServiceDiscountAmount == 0) {
//                $(".ServiceDiscount-total").addClass('hidden');
//            }
//            else {
//                $(".ServiceDiscountAmountTxt").text(TransMakeCurrency + ServiceFdiscountamount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//            }
//            /*$(".FinalTotalTxt").text("$" + FinalTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            
//            $(".balanceDueAmount").text("$" + FinalTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));*/

//        }
//        else {
//            $(".ServiceshippingAmountTxt").text(TransMakeCurrency + "0.00");
//            $("#ServicediscountAmount").val("");
//            $(".ServiceDiscountAmountTxt").text(TransMakeCurrency + "0.00");
//        }
//    }

//    if ($("#ServicetaxType").val() != "") {
//        if ($("#ServicetaxType").val() == "Custom") {
//            ServiceTPVal = $(".Servicetax_val").val();
//        }
//        else {
//            ServiceTPVal = $("#ServicetaxType").val();
//        }
//        var TPercent = parseFloat(ServiceTPVal);
//        if ($("#ServicediscountAmount").val() != "") {
//            ServiceTaxAmount = ((ServiceFdiscountamount - ServiceNonTaxValue) / 100) * TPercent;
//            $(".Servicetax").text(TransMakeCurrency + ServiceTaxAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//        }
//        else {
//            ServiceTaxAmount = ((ServiceFinalTotal - ServiceNonTaxValue) / 100) * TPercent;
//            $(".Servicetax").text(TransMakeCurrency + ServiceTaxAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//        }
//        /*FinalTotal = parseFloat(FinalTotal) + parseFloat(TaxAmount);
//        $(".FinalTotalTxt").text("$" + FinalTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//        BalanceDue = FinalTotal;
//        $(".balanceDueAmount").text("$" + FinalTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));*/
//    }
//    //if ($("#Invoice_ShippingCost").val() != "") {
//    //    var shippingCostString = $("#Invoice_ShippingCost").val();
//    //    ShippingAmount = parseFloat(shippingCostString);

//    //}
//    var DA = 0;
//    //if ($("#Invoice_Deposit").val() != "") {
//    //    DA = $("#Invoice_Deposit").val();
//    //    if ($("#discountAmount").val() != "") {
//    //        BalanceDue = Fdiscountamount - parseFloat(DA);
//    //    }
//    //    else {
//    //        BalanceDue = FinalTotal - parseFloat(DA);
//    //    }
//    //    /* $(".balanceDueAmount").text("$" + BalanceDue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));*/
//    //}
//    if ($("#ServicediscountAmount").val() != "") {
//        ServiceBalanceDue = parseFloat(ServiceFdiscountamount) + parseFloat(ServiceTaxAmount) - parseFloat(DA);
//        ServiceFinalTotal = parseFloat(ServiceFdiscountamount) + parseFloat(ServiceTaxAmount);
//    }
//    else {
//        ServiceBalanceDue = parseFloat(ServiceTotalAmount) + parseFloat(ServiceTaxAmount) - parseFloat(DA);
//        ServiceFinalTotal = parseFloat(ServiceTotalAmount) + parseFloat(ServiceTaxAmount);
//        console.log(ServiceFinalTotal);
//    }

//    $(".ServiceFinalTotalTxt").text(TransMakeCurrency + ServiceFinalTotal.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//    $(".ServicebalanceDueAmount").text(TransMakeCurrency + ServiceBalanceDue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//    //$(".Serviceamount-big").text(TransMakeCurrency + ServiceBalanceDue.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
//}
var InitRowIndex = function () {
    var i = 1;
    $(".CustomerEstimateTab tbody tr td:first-child").each(function () {
        $(this).text(i);
        i += 1;
    });
}
var ServiceInitRowIndex = function () {
    var i = 1;
    $(".CustomerEstimateServiceTab tbody tr td:first-child").each(function () {
        $(this).text(i);
        i += 1;
    });
}
var ExpirationDateValidation = function () {
    var result = true;
    var now = new Date();
    var Today = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate());
    var ExpirationDate = new Date($("#Invoice_DueDate").val());
    if (Today != "Invalid Date" && ExpirationDate != "Invalid Date") {
        if (ExpirationDate < Today) {
            $("#Invoice_DueDate").addClass("required");
            $("#DueDateGtToday").removeClass("hidden");
            result = false;
        } else {
            $("#Invoice_DueDate").removeClass("required");
            $("#DueDateGtToday").addClass("hidden");
            result = true;
        }
    }
    return result;
}
var SaveInvoice = function () {
    var memoval = "";

    //if (!ExpirationDateValidation()) {
    //    OpenErrorMessageNew("Error!", "Estimate expire date cannot be less than today.", function () { });
    //    return;
    //}
    if ($(".HasItem").length == 0) {
        OpenErrorMessageNew("Error!", "You have to select at least one equipment to proceed", function () { });
        return;
    }
    //if ($("#InvoiceDescription").val().trim() == '') {
    //    var DescriptionText = "";
    //    $(".txtProductDesc").each(function () {
    //        if ($(this).val().trim() != '') {
    //            DescriptionText += $(this).val();
    //            DescriptionText += ", ";
    //        }
    //    });

    //    DescriptionText = DescriptionText.slice(0, -2);

    //    $("#InvoiceDescription").val(DescriptionText);
    //}
    var DetailList = [];
    $(".HasItem").each(function () {
        DetailList.push({
            EquipmentId: $(this).attr('data-id'),
            Quantity: $(this).find('.txtProductQuantity').val(),
            UnitPrice: parseFloat($(this).find('.txtProductRate').val().trim().replaceAll(',', '')),
            TotalPrice: $(this).find('.txtProductQuantity').val() * parseFloat($(this).find('.txtProductRate').val().trim().replaceAll(',', '')),
            Taxable: TaxablePermit.toLowerCase() == "true" ? $(this).find('.chkTaxable').is(':checked') : true,
            EquipDetail: $(this).find('.txtProductDesc').val(),
            EquipName: $(this).find('.ProductName').val(),
            Order: $(this).find('td:nth-child(1)').text().trim(),
            InventoryId: '00000000-0000-0000-0000-000000000000',
            CreatedDate: '1-1-2017',
            InvoiceId: InvoiceId,
            EquipCategory: $(this).find('.EquipmentCategory').val()
        });
    });
    console.log(DetailList);

    InsertInvoice();

}
var InsertInvoice = function () {
    var url = "/Sales/AddInvoice";

        var param = JSON.stringify({
            //EmailDescription: $(".txtEmailbody").val(),
            "Invoice.InvoiceId": InvoiceId,

            //"Invoice.CustomerId": $("#InvoiceCustomerId").val(),
            //"Invoice.Amount": TotalAmount,
            "Invoice.TotalAmount": FinalTotal,
            //"Invoice.DiscountAmount": DiscountDBAmount,
            //"Invoice.Discountpercent": DiscountDBPercent,
            "Invoice.BalanceDue": BalanceDue,
            //"Invoice.Tax": TaxAmount,
            //"Invoice.TaxType": $("#taxType option:selected").text(),
            //"Invoice.InvoiceMessage": $("textarea#InvoiceMessage").val(),
            //"Invoice.Description": $("#InvoiceDescription").val(),
            //"Invoice.Deposit": $("#Invoice_Deposit").val(),
            //"Invoice.Memo": memoval,
            //"Invoice.DiscountType": $("#Invoice_DiscountType").val(),
            "Invoice.Total": Fdiscountamount,
            //"Invoice.InstallDate": GetTimeFormat($("#OrderInstallDate").val()),
            "Invoice.InvoiceDate": GetTimeFormat($("#Invoice_CreatedDate").val()),
            //"Invoice.CreatedDate": GetTimeFormat($("#CreatedDate").val()),
            //"Invoice.ShippingDate": GetTimeFormat($("#Invoice_ShippingDate").val()),
            //"Invoice.DueDate": GetTimeFormat($("#Invoice_DueDate").val()),
            //"Invoice.FinanceCompany": $("#Invoice_FinanceCompany").val(),
            //"Invoice.CustomerId": cusIdLite2,
            //"Invoice.JobNo": $("#JobNo").val(),
            //"Invoice.PaymentType": $("#PaymentType").children(":selected").attr("value"),
            //"Invoice.TechnicianId": $("#SalesPersonList").children(":selected").attr("value"),
            //"Invoice.RegistrationNo": $("#CustomerVRegNo").val(),
            //"Invoice.VehicleModelId": $("#VIVehicleModel").val(),
            //"Invoice.VehicleBrandId": $("#VIVehicleBrand").val(),
            //"Invoice.InvoicePhoneNo": $("#InvoicePhoneNumber").val(),
            InvoiceDetailList: DetailList,
 
        });
    
    console.log(param);
    $.ajax({
        type: "POST",
        ajaxStart: function () {
            alert('start')
            $(".loader-div").show()
        },
        url: url,
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data) {
            console.log(data);
            if (CameFrom == "preview") {
                $("#EstimatePrintAndSend").click();
            }
            else if (CameFrom == "contractpreview") {
                CloseTopToBottomModal();
                //OpenLeadEstimateTab();
                setTimeout(function () {
                    OpenTopToBottomModal(domainurl + "/SmartLeads/GetSmartLeadsForPopUp/?LeadId=" + CustomerLoadId + "&grant=" + false + "&firstpage=" + false + "&recreate=" + false + "&isinvoice=" + true + "&invoiceid=" + InvoiceId);
                }, 1000
                )
            }
            else if (CameFrom == "approve" && data.result) {
                OpenSuccessMessageNew("Success!", data.message, function () {

                });
                CloseTopToBottomModal();
            }
            else if (data.result && CameFrom != "others" && data.EmailSent == false) {
                var estimateMessage = "Estimate created successfully.";
                if (SendEmail) {
                    if ($(".InvoiceSaveButton").text() == "Save") {
                        estimateMessage = "Estimate saved and sent successfully.";
                    }
                    else {
                        estimateMessage = "Estimate created and sent successfully.";
                    }
                }
                else {
                    if ($(".InvoiceSaveButton").text() == "Save") {
                        estimateMessage = "Estimate saved successfully.";
                    }
                }
                OpenSuccessMessageNew("Success!", estimateMessage, function () {

                });
                CloseTopToBottomModal();
            }
            else if (data.result && CameFrom != "others" && data.EmailSent == true) {
                OpenSuccessMessageNew("Success!", data.message, function () { /*OpenEstimateTab()*/

                });
                CloseTopToBottomModal();
            }
            $("#Estimate").load(domainurl + "/Sales/Estimate");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


var LoadDiscount = function () {
    if (DiscountAmountDbValue != "0") {
        $("#discountAmount").val(DiscountAmountDbValue);
        $('#discountType').val('amount');
    }
    if (DiscountPercentDbValue != "0") {
        $("#discountAmount").val(DiscountPercentDbValue);
        $('#discountType').val('percent');
    }
}
var LoadServiceDiscount = function () {
    if (DiscountAmountDbValue != "0") {
        $("#ServicediscountAmount").val(DiscountAmountDbValue);
        $('#ServicediscountType').val('amount');
    }
    if (DiscountPercentDbValue != "0") {
        $("#ServicediscountAmount").val(DiscountPercentDbValue);
        $('#ServicediscountType').val('percent');
    }
}
var LoadTax = function () {
    console.log("TaxTypeDbValue" + TaxTypeDbValue);
    if (TaxTypeDbValue != null && TaxTypeDbValue != "") {
        console.log("TaxType" + TaxTypeDbValue)
        $("#taxType option").each(function () {
            if ($(this).text() == TaxTypeDbValue) {
                console.log("TaxType ok" + TaxTypeDbValue)
                $(this).prop('selected', 'selected');
            }
        });
    }
}
var LoadServiceTax = function () {
    console.log("ServiceTaxTypeDbValue" + TaxTypeDbValue);
    if (TaxTypeDbValue != null && TaxTypeDbValue != "") {
        console.log("TaxType" + TaxTypeDbValue)
        $("#ServicetaxType option").each(function () {
            if ($(this).text() == TaxTypeDbValue) {
                console.log("TaxType ok" + TaxTypeDbValue)
                $(this).prop('selected', 'selected');
            }
        });
    }
}

var Showshipping = function () {
    //$(".shipping").show();
    $(".Shipping").show();
}
var Hideshipping = function () {
    //$(".shipping").hide();
    $(".Shipping").hide();
}
var ShowDiposit = function () {
    $(".Diposit").show();
}
var HideDiposit = function () {
    $(".Diposit").hide();
}
var ShowDiscount = function () {
    $(".Discount").show();
    $(".Discount-total").removeClass('hidden');
}
var HideDiscount = function () {
    $(".Discount").hide();
}
var ShowShippingDiv = function () {
    $(".shipping-div").show();
    $(".shipping-amount-div").show();
}
var HideShippingDiv = function () {
    $(".shipping-div").hide();
    $(".shipping-amount-div").hide();
}
var ShowDiscountDiv = function () {
    $(".discount-amount-div").show();
    $(".Discount-total").removeClass('hidden');
}
var HideDiscountDiv = function () {
    $(".discount-amount-div").hide();
}
var ShowDepositDiv = function () {
    $(".deposit-amount-div").show();
}
var HideDepositDiv = function () {
    $(".deposit-amount-div").hide();
}



var ConvertEstimeToInvoiceByIdInner = function () {
    $.ajax({
        url: domainurl + "/Invoice/ConvertEstimateToInvoice",
        data: { Id: EstimateConvertId },
        type: "Post",
        dataType: "Json",
        success: function (data) {
            CloseTopToBottomModal();
            if (typeof (OpenInvoiceTab) != "undefined") {
                OpenInvoiceTab();
            }
            $("#Estimate").load(domainurl + "/Sales/Estimate");
            OpenSuccessMessageNew("", data.message);
        }
    });
}

var EstimateSettingsInitialLoad = function () {
    var WindowHeight = window.innerHeight;
    if (screen.width < 414) {
        var divHeight = WindowHeight - ($(".add-invoice-container .div-header").height() + $(".invoice-footer").height() - 110);
    }
    else {
        var divHeight = WindowHeight - ($(".add-invoice-container .div-header").height() + $(".invoice-footer").height() - 70);
    }

    $(".estimate_contents_scroll").css("height", divHeight);
    if ($(".InvoiceSaveButton").text() == "Create") {
        $(".estimate_contents_scroll").css("height", divHeight - 33);
    }
    if (EstimateShippingSetting == "True") {
        setTimeout(function () {
            $(".shipping-div").show();
            $(".shipping-amount-div").show();
            $(".Shipping").show();
        }, 10);
        //ShowShippingDiv();
        //Showshipping();
    }
    else {
        setTimeout(function () {
            $(".shipping-div").hide();
            $(".shipping-amount-div").hide();
            $(".Shipping").hide();
            $(".shippingAddress").val("");
        }, 10);
        //HideShippingDiv();
        //Hideshipping();
    }
    if (EstimateDiscountSetting == "True") {
        setTimeout(function () {
            $(".discount-amount-div").show();
            $(".Discount").show();
        }, 10);
        //ShowDiscountDiv();
        //ShowDiscount();
    }
    else {
        setTimeout(function () {
            $(".discount-amount-div").hide();
            $(".Discount").hide();
        }, 10)
        //HideDiscountDiv();
        //HideDiscount();
    }
    if (EstimateServiceSetting.toLowerCase() == "true") {
        $(".service_list_div").show();
    }
    else {
        $(".service_list_div").hide();
    }
    if (EstimateDepositSetting == "True") {
        setTimeout(function () {
            $(".deposit-amount-div").show();
            $(".Diposit").show();
        }, 10)
        //ShowDepositDiv();
        //ShowDiposit();
    }
    else {
        setTimeout(function () {
            $(".deposit-amount-div").hide();
            $(".Diposit").hide();
        }, 10)
        //HideDepositDiv();
        //HideDiposit();
    }
}
$(document).ready(function () {

    $("#discountAmount").keyup(function () {
        if ($("#discountAmount").val() != "") {
            $(".Discount-total").removeClass('hidden');
        }
        else {
            $(".Discount-total").addClass('hidden');
        }
    });
    $("#ServicediscountAmount").keyup(function () {
        if ($("#ServicediscountAmount").val() != "") {
            $(".ServiceDiscount-total").removeClass('hidden');
        }
        else {
            $(".ServiceDiscount-total").addClass('hidden');
        }
    });
    if (EstimateTaxSetting != null && EstimateTaxSetting.toLowerCase() == "false") {
        $(".tax-amount-div").hide();
        $("#taxType").val("0");
        $("#ServicetaxType").val("0");
        CalculateNewAmount();
    //    CalculateServiceNewAmount();
    }
    else {

        $(".tax-amount-div").show();

    }
    //if (servicesetting.toLowerCase() == "true") {
    //    equipmentval = "onlyequipment";
    //    eqpserkeyparameter = "<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event,equipmentval)' onkeyup='SearchKeyUp(this,event,equipmentval)' />";
    //}
    //else {
    //    equipmentval = "";

    //    eqpserkeyparameter = "<td valign='top'><input type='text'class='ProductName' onkeydown='SearchKeyDown(this,event,equipmentval)' onkeyup='SearchKeyUp(this,event,equipmentval)' />";
    //}
    //EstimateSettingsInitialLoad();
    //makeSendEmailUrl();
    $("#EmailAddress").keydown(function () {
        makeSendEmailUrl();
    });
    $("#EmailAddress").keyup(function () {
        makeSendEmailUrl();
    });

    var Popupwidth = 920;
    var Popupheight = 600;
    //if (Device.All()) {
    //    Popupwidth = window.innerWidth;
    //    Popupheight = window.innerHeight;
    //}
    var idlist = [{ id: ".EstPreview", type: 'iframe', width: Popupwidth, height: Popupheight }
    ];
    jQuery.each(idlist, function (i, val) {
    //    magnificPopupObj(val);
    });
    //$(".CustomerEstimateTab tbody").sortable({
    //    update: function () {
    //        var i = 1;
    //        $(".CustomerEstimateTab tbody tr td:first-child").each(function () {
    //            $(this).text(i);
    //            i += 1;
    //        });
    //    }
    //}).disableSelection();
    //$(".CustomerEstimateServiceTab tbody").sortable({
    //    update: function () {
    //        var i = 1;
    //        $(".CustomerEstimateServiceTab tbody tr td:first-child").each(function () {
    //            $(this).text(i);
    //            i += 1;
    //        });
    //    }
    //}).disableSelection();
    $(".add-invoice-container input,.add-invoice-container textarea").change(function () {
        IsChanged = true;

    });
    //InvoiceDatepicker = new Pikaday({
    //     field: $('#Invoice_InvoiceDate')[0],
    //     trigger: $('#Invoice_InvoiceDateArea')[0],

    //  format: 'MM/DD/YYYY',
    //     firstDay: 1
    // });
    // DueDatepicker = new Pikaday({
    //     field: $('#Invoice_DueDate')[0],
    //     trigger: $('#Invoice_DueDateArea')[0], 
    //     format: 'MM/DD/YYYY',
    //     firstDay: 1
    // });
    //InvoiceDatepicker = new Pikaday({
    //    field: $('#Invoice_InvoiceDate')[0],
    //    format: 'MM/DD/YYYY'
    //});
    //DueDatepicker = new Pikaday({
    //    field: $('#Invoice_DueDate')[0],
    //    format: 'MM/DD/YYYY'
    //});
    //ShippingDate = new Pikaday({
    //    field: $('.ShippingDatePicker')[0],
    //    format: 'MM/DD/YYYY'
    //});
    $("#Invoice_DueDate").blur(function () {
        ExpirationDateValidation();
    });
    LoadDiscount();
    LoadServiceDiscount();
    //LoadTax();
    //LoadServiceTax();
    InitRowIndex();
    ServiceInitRowIndex();
    //$(".DescStartCount").html($("#InvoiceDescription").val().length);
    $("#InvoiceDescription").keyup(function () {
        $(".DescStartCount").html($("#InvoiceDescription").val().length);
    });
    // $(".StartCount").html($("#InvoiceMessage").val().length);
    $("#InvoiceMessage").keyup(function () {
        $(".StartCount").html($("#InvoiceMessage").val().length);
    });

    //if (memopermit == "True") {
    //    //$(".MemoStartCount").html($("#Memo").val().length);
    //    $("#Memo").keyup(function () {
    //        $(".MemoStartCount").html($("#Memo").val().length);
    //    });
    //}
    //$("#Terms").change(function () {
    //    if ($("#Terms").val() == "-1") {
    //        return;
    //    } else {
    //        var NewDueDate = new Date($("#Invoice_InvoiceDate").val());
    //        if (NewDueDate == "Invalid Date") {
    //            NewDueDate = new Date();
    //            $("#Invoice_InvoiceDate").val(NewDueDate.getMonth() + 1 + "/" + NewDueDate.getDate() + "/" + NewDueDate.getFullYear());
    //        }
    //        NewDueDate = NewDueDate.addDays(parseInt($("#Terms").val()));
    //        NewDueDate = NewDueDate.getMonth() + 1 + "/" + NewDueDate.getDate() + "/" + NewDueDate.getFullYear();
    //        $("#Invoice_DueDate").val(NewDueDate);
    //    }

    //});
    $("#Invoice_InvoiceDate,#Invoice_DueDate").change(function () {
        var Date1 = new Date($("#Invoice_InvoiceDate").val());
        var Date2 = new Date($("#Invoice_DueDate").val());
        var diff = DateDiff.inDays(Date1, Date2);
        if (diff == 0) {
            $("#Terms").val("0");
        }
        else if (diff == 15) {
            $("#Terms").val("15");
        }
        else if (diff == 30) {
            $("#Terms").val("30");
        } else if (diff == 60) {
            $("#Terms").val("60");
        } else {
            $("#Terms").val("-1");
        }

    });

    $("#CustomerList").focusout(function () {
        setTimeout(function () {
            $(".customer_name_insert_div .tt-menu").hide();
        }, 200);
    });

    //$(".btnAddLines").click(function () {
    //    for (var i = 0; i < 4; i++) {
    //        $("#CustomerEstimateTab tbody tr:last").after(NewEquipmentRow);
    //    }
    //    var i = 1;
    //    $(".CustomerEstimateTab tbody tr td:first-child").each(function () {
    //        $(this).text(i);
    //        i += 1;
    //    });
    //});
    //$(".btnClearLines").click(function () {
    //    $(".CustomerEstimateTab tbody").html(NewEquipmentRow + NewEquipmentRow);
    //    var i = 1;
    //    $(".CustomerEstimateTab tbody tr td:first-child").each(function () {
    //        $(this).text(i);
    //        i += 1;
    //    });
    //    CalculateNewAmount();
    //});
    $(".btnAddSubtotal").click(function () {

    });
    //$("#CustomerEstimateTab tbody").on('focusout', 'input.ProductName', function () {
    //    $(".tt-menu").hide();
    //    var ProductNameDom = $(this).parent().find('span.spnProductName');
    //    $(ProductNameDom).text($(this).val());
    //});
    $("#CustomerEstimateServiceTab tbody").on('focusout', 'input.ServiceName', function () {
        $(".tt-menu").hide();
        var ProductNameDom = $(this).parent().find('span.spnServiceName');
        $(ProductNameDom).text($(this).val());
    });
    //$("#CustomerEstimateTab tbody").on('blur', 'tr', function (item) {
    //    if (typeof ($(item.target).parent().parent().attr('data-id')) == 'undefined'
    //        && typeof ($(item.target).parent().parent().parent().attr('data-id')) == 'undefined') {
    //        var trdom = $(item.target).parent().parent();
    //        $(trdom).find("input.ProductName").val('');
    //        $(trdom).find("span.spnProductName").text('');

    //        $(trdom).find("input.txtProductDesc").val('');
    //        $(trdom).find("span.spnProductDesc").text('');

    //        $(trdom).find("input.txtProductQuantity").val('');
    //        $(trdom).find("span.spnProductQuantity").text('');

    //        $(trdom).find("input.txtProductRate").val('');
    //        $(trdom).find("span.spnProductRate").text('');

    //        $(trdom).find("input.txtProductAmount").val('');
    //        $(trdom).find("span.spnProductAmount").text('');
    //        CalculateNewAmount();
    //    }
    //});
    $("#CustomerEstimateServiceTab tbody").on('blur', 'tr', function (item) {
        if (typeof ($(item.target).parent().parent().attr('data-id')) == 'undefined'
            && typeof ($(item.target).parent().parent().parent().attr('data-id')) == 'undefined') {
            var trdom = $(item.target).parent().parent();
            $(trdom).find("input.ServiceName").val('');
            $(trdom).find("span.spnServiceName").text('');

            $(trdom).find("input.txtServiceDesc").val('');
            $(trdom).find("span.spnServiceDesc").text('');

            $(trdom).find("input.txtServiceQuantity").val('');
            $(trdom).find("span.spnServiceQuantity").text('');

            $(trdom).find("input.txtServiceRate").val('');
            $(trdom).find("span.spnServiceRate").text('');

            $(trdom).find("input.txtServiceAmount").val('');
            $(trdom).find("span.spnServiceAmount").text('');
            CalculateServiceNewAmount();
        }
    });
    $("#CustomerEstimateTab tbody").on('click', 'tr', function (e) {
        if ($(e.target).hasClass('fa') || $(e.target).hasClass('tt-sug-text') || $(e.target).hasClass('tt-suggestion')) {
            return;
        }

        if ($(e.target).hasClass("spnProductName") || $(e.target).hasClass("spnProductDesc")
            || $(e.target).hasClass("spnProductQuantity") || $(e.target).hasClass("spnProductRate")
            || $(e.target).hasClass("spnProductAmount")) {
            //alert('3');
            $("#CustomerEstimateTab tr").removeClass("focusedItem");
            $($(e.target).parent().parent()).addClass("focusedItem");
            $(e.target).parent().parent().find('input').focus();
        }
        else if (e.target.tagName.toUpperCase() == 'INPUT') {
            return;
        }
        else {
            //alert('4');
            $("#CustomerEstimateTab tr").removeClass("focusedItem");
            $($(e.target).parent()).addClass("focusedItem");
            $(e.target).find('input').focus();
        }

        /*
        $("#CustomerEstimateTab tr").removeClass("focusedItem");
        $($(e.target).parent()).addClass("focusedItem");
        $(e.target).find('input').focus();  
        */

    });

    $("#CustomerEstimateServiceTab tbody").on('click', 'tr', function (e) {
        if ($(e.target).hasClass('fa') || $(e.target).hasClass('tt-sug-text') || $(e.target).hasClass('tt-suggestion')) {
            return;
        }

        if ($(e.target).hasClass("spnServiceName") || $(e.target).hasClass("spnServiceDesc")
            || $(e.target).hasClass("spnServiceQuantity") || $(e.target).hasClass("spnServiceRate")
            || $(e.target).hasClass("spnServiceAmount")) {
            //alert('1');
            $("#CustomerEstimateServiceTab tr").removeClass("focusedItem");
            $($(e.target).parent().parent()).addClass("focusedItem");
            $(e.target).parent().find('input').focus();
        }
        else if (e.target.tagName.toUpperCase() == 'INPUT') {
            return;
        }
        else {
            //alert('2')
            $("#CustomerEstimateServiceTab tr").removeClass("focusedItem");
            $($(e.target).parent()).addClass("focusedItem");
            $(e.target).find('input').focus();
        }

        /*
        $("#CustomerEstimateTab tr").removeClass("focusedItem");
        $($(e.target).parent()).addClass("focusedItem");
        $(e.target).find('input').focus();  
        */

    });

    $("#CustomerEstimateTab tbody").on('click', 'tr:last', function (e) {
        if ($(e.target).hasClass('fa')) {
            return;
        }
        if (TaxablePermit.toLowerCase() == "true") {
            $("#CustomerEstimateTab tbody tr:last").after(NewEquipmentRowTaxable);
        }
        else {
            $("#CustomerEstimateTab tbody tr:last").after(NewEquipmentRow);
        }
        if (ShowRetailVal == "True") {
            $(".retail_area").show();
        }
        else {
            $(".retail_area").hide();
        }
        var i = 1;
        $(".CustomerEstimateTab tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
    });

    $("#CustomerEstimateServiceTab tbody").on('click', 'tr:last', function (e) {
        if ($(e.target).hasClass('fa')) {
            return;
        }
        if (TaxablePermit.toLowerCase() == "true") {
            $("#CustomerEstimateServiceTab tbody tr:last").after(NewServiceRowTaxable);
        }
        else {
            $("#CustomerEstimateServiceTab tbody tr:last").after(NewServiceRow);
        }
        if (ShowRetailVal == "True") {
            $(".retail_area").show();
        }
        else {
            $(".retail_area").hide();
        }
        var i = 1;
        $(".CustomerEstimateServiceTab tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
    });

    $(".CustomerEstimateTab tbody").on('click', 'tr td i.fa', function (e) {
        $(this).parent().parent().parent().remove();
        var i = 1;
        if ($(".CustomerEstimateTab tbody tr").length < 2) {
            if (TaxablePermit.toLowerCase() == "true") {
                $("#CustomerEstimateTab tbody tr:last").after(NewEquipmentRowTaxable);
            }
            else {
                $("#CustomerEstimateTab tbody tr:last").after(NewEquipmentRow);
            }
            if (ShowRetailVal == "True") {
                $(".retail_area").show();
            }
            else {
                $(".retail_area").hide();
            }
        }
        $(".CustomerEstimateTab tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
        CalculateNewAmount();

    });
    $(".CustomerEstimateServiceTab tbody").on('click', 'tr td i.fa', function (e) {
        $(this).parent().parent().parent().remove();
        var i = 1;
        if ($(".CustomerEstimateServiceTab tbody tr").length < 2) {
            if (TaxablePermit.toLowerCase() == "true") {
                $("#CustomerEstimateServiceTab tbody tr:last").after(NewServiceRowTaxable);
            }
            else {
                $("#CustomerEstimateServiceTab tbody tr:last").after(NewServiceRow);
            }
            if (ShowRetailVal == "True") {
                $(".retail_area").show();
            }
            else {
                $(".retail_area").hide();
            }
        }
        $(".CustomerEstimateServiceTab tbody tr td:first-child").each(function () {
            $(this).text(i);
            i += 1;
        });
        CalculateServiceNewAmount();

    });

    $(".CustomerEstimateTab tbody").on('click', 'tr td .chkTaxable', function (e) {
        CalculateNewAmount();
    });
    $(".CustomerEstimateServiceTab tbody").on('click', 'tr td .chkTaxable', function (e) {
        CalculateServiceNewAmount();
    });
    $(".CustomerEstimateTab tbody").on('change', "tr td .txtProductQuantity", function (e) {

        var ProductQuantityDom = $(this).parent().find('span.spnProductQuantity');
        var productQuantity = $(this).parent().parent().find('input.txtProductQuantity');
        $(ProductQuantityDom).text($(this).val());
        var ProductRateDom = $(this).parent().parent().find('input.txtProductRate');
        var RetailPriceDom = $(this).parent().parent().find('input.txtRetailPrice');
        if ($(productQuantity).val() > -1) {
            if ($(ProductRateDom).val() != "" && parseFloat($(ProductRateDom).val().trim().replaceAll(',', '')) > 0) {
                var NewProductAmount = $(this).val() * parseFloat($(ProductRateDom).val().trim().replaceAll(',', ''));
                console.log(NewProductAmount);
                var txtProductAmountDom = $(this).parent().parent().find('input.txtProductAmount');
                var spnProductAmountDom = $(this).parent().parent().find('span.spnProductAmount');
                $(txtProductAmountDom).val(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductAmountDom).text(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                console.log("df");
                var txtTotalRetailtDom = $(this).parent().parent().find('input.txtTotalRetailPrice');
                var spnTotalRetailDom = $(this).parent().parent().find('span.spnTotalRetalPrice');
                var Quantity = $(this).val();
                var RetailPrice = parseFloat($(RetailPriceDom).val().trim().replaceAll(',', '')) * Quantity;
                $(txtTotalRetailtDom).val(RetailPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnTotalRetailDom).text(RetailPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

                CalculateNewAmount();
            }
        }
        else {
            console.log($(this).parent().find('span.spnProductQuantity').text("1"));
            $(productQuantity).val("1");
            $(ProductQuantityDom).val("1");

            if ($(ProductRateDom).val() != "" && parseFloat($(ProductRateDom).val().trim().replaceAll(',', '')) > 0) {
                var NewProductAmount = $(this).val() * parseFloat($(ProductRateDom).val().trim().replaceAll(',', ''));
                console.log(NewProductAmount);
                var txtProductAmountDom = $(this).parent().parent().find('input.txtProductAmount');
                var spnProductAmountDom = $(this).parent().parent().find('span.spnProductAmount');
                $(txtProductAmountDom).val(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductAmountDom).text(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                CalculateNewAmount();
            }
        }
    });

    $(".CustomerEstimateServiceTab tbody").on('change', "tr td .txtServiceQuantity", function (e) {

        var ProductQuantityDom = $(this).parent().find('span.spnServiceQuantity');
        var productQuantity = $(this).parent().parent().find('input.txtServiceQuantity');
        $(ProductQuantityDom).text($(this).val());
        var ProductRateDom = $(this).parent().parent().find('input.txtServiceRate');
        var RetailPriceDom = $(this).parent().parent().find('input.txtServiceRetailPrice');
        if ($(productQuantity).val() > -1) {
            if ($(ProductRateDom).val() != "" && parseFloat($(ProductRateDom).val().trim().replaceAll(',', '')) > 0) {
                var NewProductAmount = $(this).val() * parseFloat($(ProductRateDom).val().trim().replaceAll(',', ''));
                console.log(NewProductAmount);
                var txtProductAmountDom = $(this).parent().parent().find('input.txtServiceAmount');
                var spnProductAmountDom = $(this).parent().parent().find('span.spnServiceAmount');
                $(txtProductAmountDom).val(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductAmountDom).text(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                console.log("df");
                var txtTotalRetailtDom = $(this).parent().parent().find('input.txtServiceTotalRetailPrice');
                var spnTotalRetailDom = $(this).parent().parent().find('span.spnServiceTotalRetalPrice');
                var Quantity = $(this).val();
                var RetailPrice = parseFloat($(RetailPriceDom).val().trim().replaceAll(',', '')) * Quantity;
                $(txtTotalRetailtDom).val(RetailPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnTotalRetailDom).text(RetailPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

                CalculateServiceNewAmount();
            }
        }
        else {
            console.log($(this).parent().find('span.spnServiceQuantity').text("1"));
            $(productQuantity).val("1");
            $(ProductQuantityDom).val("1");

            if ($(ProductRateDom).val() != "" && parseFloat($(ProductRateDom).val().trim().replaceAll(',', '')) > 0) {
                var NewProductAmount = $(this).val() * parseFloat($(ProductRateDom).val().trim().replaceAll(',', ''));
                console.log(NewProductAmount);
                var txtProductAmountDom = $(this).parent().parent().find('input.txtServiceAmount');
                var spnProductAmountDom = $(this).parent().parent().find('span.spnServiceAmount');
                $(txtProductAmountDom).val(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductAmountDom).text(NewProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                CalculateServiceNewAmount();
            }
        }
    });




    $(".CustomerEstimateTab tbody").on('change', "tr td .txtProductAmount", function () {
        console.log("Product Amount Change");
        var ProductAmount = $(this).parent().parent().find('input.txtProductAmount');

        var ProductQuantityDom = $(this).parent().parent().parent().find('input.txtProductQuantity');
        var ProductRateDom = $(this).parent().parent().parent().find('input.txtProductRate');
        var spnProductRateDom = $(this).parent().parent().parent().find('span.spnProductRate');
        if ($(ProductAmount).val() != "" && parseFloat($(ProductAmount).val().trim().replaceAll(',', '')) >= 0) {
            var ProductAmountDom = $(this).parent().parent().find('span.spnProductAmount');
            $(ProductAmountDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var NewProductRate = (parseFloat($(this).val().trim().replaceAll(',', '')) / $(ProductQuantityDom).val());
                $(ProductRateDom).val(NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductRateDom).text("$" + NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            }
            CalculateNewAmount();
        }
        else {
            var CalculateAmount = parseFloat($(ProductRateDom).val().trim().replaceAll(',', '')) * $(ProductQuantityDom).val();
            $(ProductAmount).val(CalculateAmount);
            var ProductAmountDom = $(this).parent().parent().find('span.spnProductAmount');
            $(ProductAmountDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var NewProductRate = (parseFloat($(this).val().trim().replaceAll(',', '')) / $(ProductQuantityDom).val());
                $(ProductRateDom).val(NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductRateDom).text("$" + NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            }
            CalculateNewAmount();
        }

    });
    $(".CustomerEstimateServiceTab tbody").on('change', "tr td .txtServiceAmount", function () {
        console.log("Product Amount Change");
        var ProductAmount = $(this).parent().parent().find('input.txtServiceAmount');

        var ProductQuantityDom = $(this).parent().parent().parent().find('input.txtServiceQuantity');
        var ProductRateDom = $(this).parent().parent().parent().find('input.txtServiceRate');
        var spnProductRateDom = $(this).parent().parent().parent().find('span.spnServiceRate');
        if ($(ProductAmount).val() != "" && parseFloat($(ProductAmount).val().trim().replaceAll(',', '')) >= 0) {
            var ProductAmountDom = $(this).parent().parent().find('span.spnServiceAmount');
            $(ProductAmountDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var NewProductRate = (parseFloat($(this).val().trim().replaceAll(',', '')) / $(ProductQuantityDom).val());
                $(ProductRateDom).val(NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductRateDom).text("$" + NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            }
            CalculateServiceNewAmount();
        }
        else {
            var CalculateAmount = parseFloat($(ProductRateDom).val().trim().replaceAll(',', '')) * $(ProductQuantityDom).val();
            $(ProductAmount).val(CalculateAmount);
            var ProductAmountDom = $(this).parent().parent().find('span.spnServiceAmount');
            $(ProductAmountDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var NewProductRate = (parseFloat($(this).val().trim().replaceAll(',', '')) / $(ProductQuantityDom).val());
                $(ProductRateDom).val(NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                $(spnProductRateDom).text("$" + NewProductRate.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            }
            CalculateServiceNewAmount();
        }

    });

    $(".CustomerEstimateTab tbody").on('change', "tr td .txtProductRate", function () {

        /*
         *If product rate changes make change to amount.
         */
        var ProductQuantityDom = $(this).parent().parent().parent().find('input.txtProductQuantity');
        var ProductRate = $(this).parent().parent().find('input.txtProductRate');
        var txtProductAmountDom = $(this).parent().parent().find('input.txtProductAmount');
        if ($(ProductRate).val() != "" && parseFloat($(ProductRate).val().trim().replaceAll(',', '')) >= 0) {
            var ProductRateDom = $(this).parent().parent().find('span.spnProductRate');
            $(ProductRateDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var ProductAmount = parseFloat($(this).val().trim().replaceAll(',', '')) * $(ProductQuantityDom).val();


                var txtProductAmountDom = $(this).parent().parent().parent().find('input.txtProductAmount');
                $(txtProductAmountDom).val(ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                var spnProductAmountDom = $(this).parent().parent().parent().find('span.spnProductAmount');
                $(spnProductAmountDom).text("$" + ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                CalculateNewAmount();
            }
        }
        else {

            var txtProductAmountDom = $(this).parent().parent().parent().find('input.txtProductAmount');
            var CalculateRate = parseFloat($(txtProductAmountDom).val().trim().replaceAll(',', '')) / $(ProductQuantityDom).val();
            $(ProductRate).val(CalculateRate);
            var ProductRateDom = $(this).parent().parent().find('span.spnProductRate');
            $(ProductRateDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var ProductAmount = parseFloat($(this).val().trim().replaceAll(',', '')) * $(ProductQuantityDom).val();


                var txtProductAmountDom = $(this).parent().parent().parent().find('input.txtProductAmount');
                $(txtProductAmountDom).val(ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                var spnProductAmountDom = $(this).parent().parent().parent().find('span.spnProductAmount');
                $(spnProductAmountDom).text("$" + ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                CalculateNewAmount();
            }
        }

    });
    $(".CustomerEstimateServiceTab tbody").on('change', "tr td .txtServiceRate", function () {

        /*
         *If product rate changes make change to amount.
         */
        var ProductQuantityDom = $(this).parent().parent().parent().find('input.txtServiceQuantity');
        var ProductRate = $(this).parent().parent().find('input.txtServiceRate');
        var txtProductAmountDom = $(this).parent().parent().find('input.txtServiceAmount');
        if ($(ProductRate).val() != "" && parseFloat($(ProductRate).val().trim().replaceAll(',', '')) >= 0) {
            var ProductRateDom = $(this).parent().parent().find('span.spnServiceRate');
            $(ProductRateDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var ProductAmount = parseFloat($(this).val().trim().replaceAll(',', '')) * $(ProductQuantityDom).val();


                var txtProductAmountDom = $(this).parent().parent().parent().find('input.txtServiceAmount');
                $(txtProductAmountDom).val(ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                var spnProductAmountDom = $(this).parent().parent().parent().find('span.spnServiceAmount');
                $(spnProductAmountDom).text("$" + ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                CalculateServiceNewAmount();
            }
        }
        else {

            var txtProductAmountDom = $(this).parent().parent().parent().find('input.txtServiceAmount');
            var CalculateRate = parseFloat($(txtProductAmountDom).val().trim().replaceAll(',', '')) / $(ProductQuantityDom).val();
            $(ProductRate).val(CalculateRate);
            var ProductRateDom = $(this).parent().parent().find('span.spnServiceRate');
            $(ProductRateDom).text("$" + parseFloat($(this).val().trim().replaceAll(',', '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            if ($(ProductQuantityDom).val() != "" && $(ProductQuantityDom).val() > 0) {
                var ProductAmount = parseFloat($(this).val().trim().replaceAll(',', '')) * $(ProductQuantityDom).val();


                var txtProductAmountDom = $(this).parent().parent().parent().find('input.txtServiceAmount');
                $(txtProductAmountDom).val(ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                var spnProductAmountDom = $(this).parent().parent().parent().find('span.spnServiceAmount');
                $(spnProductAmountDom).text("$" + ProductAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                CalculateServiceNewAmount();
            }
        }

    });

    $(".CustomerEstimateTab tbody").on('change', "tr td .txtProductDesc", function () {
        var ProductQuantityDom = $(this).parent().find('span.spnProductDesc');
        $(ProductQuantityDom).text($(this).val());
    });
    $(".CustomerEstimateServiceTab tbody").on('change', "tr td .txtServiceDesc", function () {

        var ProductQuantityDom = $(this).parent().find('span.spnServiceDesc');
        $(ProductQuantityDom).text($(this).val());
    });

    $(".InvoiceSaveButton").click(function () {
        if ($(".HasItem").length == 0) {
            OpenErrorMessageNew("Error!", "You have to select at least one equipment to proceed", "");
        } else {
            SaveInvoice();
        }

    });
    $(".btn-Convert-EstimeteToInvoice").click(function () {
        EstimateConvertId = $(".btn-Convert-EstimeteToInvoice").attr("data-id");
        OpenConfirmationMessageNew("Confirm?", "Are you sure you want to Convert this Estimate to Invoice?", ConvertEstimeToInvoiceByIdInner);
        OpenEstimateTab();
    });
    $("#Invoice_DiscountType").on('change', function () {
        CalculateNewAmount();
        $("#ServiceDiscountType").val($("#Invoice_DiscountType").val());
        CalculateServiceNewAmount();
    });
    //$("#ServiceDiscountType").on('change', function () {
    //    CalculateServiceNewAmount();
    //});
    $("#discountAmount").change(function () {
        CalculateNewAmount();
        $("#ServicediscountAmount").val($("#discountAmount").val());
        CalculateServiceNewAmount();
    });
    //$("#ServicediscountAmount").change(function () {
    //    CalculateServiceNewAmount();
    //});
    $('#Invoice_ShippingCost').focusout(function () {
        CalculateNewAmount();
    });
    $('#discountAmount').focusout(function () {
        CalculateNewAmount();
        $('#ServicediscountAmount').val($('#discountAmount').val());
        CalculateServiceNewAmount();
    });
    //$('#ServicediscountAmount').focusout(function () {
    //    CalculateServiceNewAmount();
    //});
    $('#Invoice_Deposit').focusout(function () {
        CalculateNewAmount();
    });
    $(".tax_val").change(function () {
        CalculateNewAmount();
        $(".Servicetax_val").val($(".tax_val").val());
        CalculateServiceNewAmount();
    });
    //$(".Servicetax_val").change(function () {
    //    CalculateServiceNewAmount();
    //});
    $("#taxType").change(function () {
        console.log("debug;" + $("#taxType").val());
        if ($("#taxType").val() == "") {
            $(".tax_amount_custom").addClass('hidden');
            $(".tax ").text(TransMakeCurrency + "0.00");
            CalculateNewAmount();
            $("#ServicetaxType").val($("#taxType").val());
            $(".Servicetax_amount_custom").addClass('hidden');
            $(".Servicetax ").text(TransMakeCurrency + "0.00");
            CalculateServiceNewAmount();
        }
        else if ($("#taxType").val() == "Custom") {
            $(".tax_amount_custom").removeClass('hidden');
            $(".tax_val").val("0.00");
            CalculateNewAmount();
            $("#ServicetaxType").val($("#taxType"));
            $(".Servicetax_amount_custom").removeClass('hidden');
            $(".Servicetax_val").val("0.00");
            CalculateServiceNewAmount();
        }
        else {
            $(".tax_amount_custom").addClass('hidden');
            CalculateNewAmount();
            $("#ServicetaxType").val($("#taxType").val());
            $(".Servicetax_amount_custom").addClass('hidden');
            CalculateServiceNewAmount();
        }

    });
    //$("#ServicetaxType").change(function () {
    //    if ($("#ServicetaxType").val() == "") {
    //        $(".Servicetax_amount_custom").addClass('hidden');
    //        $(".Servicetax ").text(TransMakeCurrency + "0.00");
    //        CalculateServiceNewAmount();
    //    }
    //    else if ($("#ServicetaxType").val() == "Custom") {
    //        $(".Servicetax_amount_custom").removeClass('hidden');
    //        $(".Servicetax_val").val("0.00");
    //        CalculateServiceNewAmount();
    //    }
    //    else {
    //        $(".Servicetax_amount_custom").addClass('hidden');
    //        CalculateServiceNewAmount();
    //    }

    //});

    /*$("select.dropdown-search").select2();*/
    CalculateNewAmount();
//    CalculateServiceNewAmount();
});
$(window).resize(function () {

    $(".top_to_bottom_modal_container").height(window.height);

    $(".estimate_contents_scroll").height(window.height - 55);

});