 var EditCustomerDraft = function (id) {
    OpenTopToBottomModal("/customer/add?id=" + id)
}
var ClosePopup = function () {
    $.magnificPopup.close();
}
var ClosePopupGiveError = function () {
    $.magnificPopup.close();
    $("#OpenError").click();
}
var AddCorrespondenceEmail = function (CusId) {
    OpenRightToLeftModal(domainurl + "/Leads/MailToSalesPerson/?id=" + CusId + "&Cid=0");
    history.pushState({ urlpath: window.location.pathname }, window.location.hash, "#addCorrespondence");
}
var ClosePopupGiveSuccess = function () {
    $.magnificPopup.close();
    $("#OpenSuccess").click();
}
var OpenDefaultTab = function () {
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
}
var Ckeckfirsttime = 1;
var UpdateCustomerTabCounter = function () {
    var Param = {
        CustomerId: CustomerLoadGuid
    };
    var url = domainurl + "/Customer/CustomerTabCounts";
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(Param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data) {
            if (data.result) {
                console.log(data.data);
                var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
                /*Invoice*/
                if (data.data.InvoiceCount > 0) {
                    $(LoadCustomerDiv + ".InvoiceCounter").text(String.format("({0})", data.data.InvoiceCount))
                } else {
                    $(LoadCustomerDiv + ".InvoiceCounter").text("")
                }
                /*Estimate*/
                if (data.data.EstimateCount > 0) {
                    $(LoadCustomerDiv + ".EstimateCounter").text(String.format("({0})", data.data.EstimateCount))
                } else {
                    $(LoadCustomerDiv + ".EstimateCounter").text("")
                }
                /*Ticket*/
                if (data.data.TicketsCount > 0) {
                    $(LoadCustomerDiv + ".TicketCounter").text(String.format("({0})", data.data.TicketsCount))
                } else {
                    $(LoadCustomerDiv + ".TicketCounter").text("")
                }
                /*Funding*/
                if (data.data.FundingCount > 0) {
                    $(LoadCustomerDiv + ".FundingCounter").text(String.format("({0})", data.data.FundingCount))
                } else {
                    $(LoadCustomerDiv + ".FundingCounter").text("")
                }
                /*Files*/
                if (data.data.FilesCount > 0) {
                    $(LoadCustomerDiv + ".FilesCounter").text(String.format("({0})", data.data.FilesCount))
                } else {
                    $(LoadCustomerDiv + ".FilesCounter").text("")
                }
                /*Notes*/
                if (data.data.NotesCount > 0) {
                    Ckeckfirsttime = 3;
                    $(LoadCustomerDiv + ".NotesCounter").text(String.format("({0})", data.data.NotesCount))
                } else {
                    $(LoadCustomerDiv + ".NotesCounter").text("")
                }
                /*Correspondance*/
                if (data.data.CorrespondenceCount > 0) {
                    $(LoadCustomerDiv + ".CorrespondanceCounter").text(String.format("({0})", data.data.CorrespondenceCount))
                } else {
                    $(LoadCustomerDiv + ".CorrespondanceCounter").text("")
                }
                /*CustomerCredit*/
                $(LoadCustomerDiv + ".Customer_credit_balance .credit_amount").text(parseFloat(data.data.CustomerCredit).toFixed(2))

                /*Activity*/
                if (data.data.ActivityCustomer > 0) {
                    $(LoadCustomerDiv + ".ActivityCounter").text(String.format("({0})", data.data.ActivityCustomer))
                } else {
                    $(LoadCustomerDiv + ".ActivityCounter").text("")
                }

                /*Opportunity*/
                if (data.data.OpportunityCustomer > 0) {
                    $(LoadCustomerDiv + ".OpportunityCounter").text(String.format("({0})", data.data.OpportunityCustomer))
                } else {
                    $(LoadCustomerDiv + ".OpportunityCounter").text("")
                }

                /*Contact*/
                if (data.data.ContactCustomer > 0) {
                    $(LoadCustomerDiv + ".ContactCounter").text(String.format("({0})", data.data.ContactCustomer))
                } else {
                    $(LoadCustomerDiv + ".ContactCounter").text("")
                }
                /*Booking*/
                if (data.data.BookingCount > 0) {
                    $(LoadCustomerDiv + ".BookingCounter").text(String.format("({0})", data.data.BookingCount))
                } else {
                    $(LoadCustomerDiv + ".BookingCounter").text("")
                }
                /*Log*/
                if (data.data.LogCount > 0) {
                    $(LoadCustomerDiv + ".LogCounter").text(String.format("({0})", data.data.LogCount))
                } else {
                    $(LoadCustomerDiv + ".LogCounter").text("")
                }



            }
            else {

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

var OpenCustomerDetailTab = function () {
    console.log('OpenCustomerDetailTab')
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $( ".CustomerDetailTab").addClass('active');
    $(".CustomerDetailTab_Load").addClass('active');
    /*$(".tab-pane").html(TabsLoaderText);*/
    POSModal.Show();
    $(".CustomerDetailTab_Load").load(domainurl + "/Customer/CustomerDetailPartial?id=" + CustomerIdNoteGuid);
}

var OpenWorkOrderTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".WorkOrderTab").removeClass('hidden');
    $(LoadCustomerDiv + ".WorkOrderTab").addClass('active');
    $(LoadCustomerDiv + ".WorkOrderTab_Load").addClass('active');
     
    POSModal.Show(); 
    $(LoadCustomerDiv + ".WorkOrderTab_Load").load(domainurl + "/WorkOrder/WorkOrderPartial?customerid=" + CustomerLoadGuid);
}

var OpenCorrespondenceTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".CorrespondenceTab").removeClass('hidden');
    $(".CorrespondenceTab").addClass('active');
    $(".CorrespondenceTab_Load").addClass('active');
    //$(".CorrespondenceTab_Load").html(TabsLoaderText); 
    $(".CorrespondenceTab_Load").load(domainurl + "/Contact/CorrespondenceList?CustomerId=" + CustomerIdGuid + '#correspondence');
//    UpdateCustomerTabCounter();
}
var OpenCustomerNoteTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".CustomerNoteTab").removeClass('hidden');
    $(".CustomerNoteTab").addClass('active');
    $(".CustomerNoteTab_Load").addClass('active');
     
    POSModal.Show();
    $(".CustomerNoteTab_Load").load(domainurl + "/Customer/CustomerNote?id=" + CustomerIdNoteGuid + '#note');
}

var OpenThirdPartyApiTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".ThirdPartyApiTab").removeClass('hidden');
    $(LoadCustomerDiv + ".ThirdPartyApiTab").addClass('active');
    $(LoadCustomerDiv + ".ThirdPartyApiTab_Load").addClass('active'); 
    POSModal.Show(); 
    $(LoadCustomerDiv + ".ThirdPartyApiTab_Load").load("/API/CustomerApiTabs?customerid=" + CustomerLoadGuid);
}

var OpenContactTab = function (soldby) {
    CustomerGuidID = $(this).attr('data-id');
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".ContactTab_Load").removeClass('hidden');
    $(LoadCustomerDiv + ".ContactTab_Load").addClass('active');
    $(LoadCustomerDiv + ".ContactTab_Load").addClass('active'); 
    POSModal.Show(); 
    $(LoadCustomerDiv + ".ContactTab_Load").load(domainurl + "/Customer/CustomerContactList/?FromCustomer=" + CustomerLoadGuid + "&soldby=" + soldby);
    UpdateCustomerTabCounter();
}
var OpenServiceOrderTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".ServiceOrderTab").removeClass('hidden');
    $(LoadCustomerDiv + ".ServiceOrderTab").addClass('active');
    $(LoadCustomerDiv + ".ServiceOrderTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".ServiceOrderTab_Load").load(domainurl + "/ServiceOrder/ServiceOrderPartial?customerid=" + CustomerLoadGuid);
}

var OpenNotesTab = function (pageno) {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".NotesTab").removeClass('hidden');
    $(LoadCustomerDiv + ".NotesTab").addClass('active');
    $(LoadCustomerDiv + ".NotesTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".NotesTab_Load").load(domainurl + "/Notes/NotesPartial?customerid=" + CustomerLoadGuid + "&pageno=" + pageno + "&pagesize=50");
    UpdateCustomerTabCounter();
}

var OpenInvoiceTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".InvoiceTab").removeClass('hidden');
    $(".InvoiceTab").addClass('active');
    $(".InvoiceTab_Load").addClass('active'); 
    POSModal.Show();
    $(".InvoiceTab_Load").load("/customer-invoice?CustomerId=" + CustomerLoadId);
}
var OpenFundingTab = function () {
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".FundingTab").removeClass('hidden');
    $(".FundingTab").addClass('active');
    $(".FundingTab_Load").addClass('active'); 
    POSModal.Show();
    $(".FundingTab_Load").load(domainurl +"/Transaction/TransactionPartial?CustomerId=" + CustomerIdNoteGuid);

}

var OpenFileDocumentTab = function () {
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".FileDocumentTab").removeClass('hidden');
    $(".FileDocumentTab").addClass('active');
    $(".FileDocumentTab_Load").addClass('active'); 
    POSModal.Show();
    $(".FileDocumentTab_Load").load(domainurl + "/Customer/CustomerFiles");

}
var CorrespondenceTab = function () {
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".CorrespondenceTab").removeClass('hidden');
    $(".CorrespondenceTab").addClass('active');
    $(".Correspondence_Load").addClass('active'); 
    POSModal.Show();
    //$(".FileDocumentTab_Load").load(domainurl + "/File/CustomerFilesAndDocument?id=" + CustomerIdNoteGuid);

}

var OpenBookingTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".BookingTab").removeClass('hidden');
    $(LoadCustomerDiv + ".BookingTab").addClass('active');
    $(LoadCustomerDiv + ".BookingTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".BookingTab_Load").load(domainurl + "/Booking/LeadBookingPartial?CustomerId=" + CustomerLoadId);
    UpdateCustomerTabCounter();
}
var OpenDocumentFileManagementTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".DocumentFileManagementTab").removeClass('hidden');
    $(LoadCustomerDiv + ".DocumentFileManagementTab").addClass('active');
    $(LoadCustomerDiv + ".DocumentFileManagement_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".DocumentFileManagement_Load").load(domainurl + "/File/LeadDocumentFileManagementPartial?CustomerId=" + CustomerLoadId);
    UpdateCustomerTabCounter();
}
var OpenLogTab = function () {
    console.log("LogTab_Load");

    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".LogTab").removeClass('hidden');
    $(LoadCustomerDiv + ".LogTab").addClass('active');
    $(LoadCustomerDiv + ".LogTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".LogTab_Load").load(domainurl + "/Booking/LoadLogPartial?pageno=" + 1 + "&pagesize=" + 50 + "&searchtxt=" + "" + "&CustomerId=" + CustomerLoadId + "&order=" + "");

    //$(LoadCustomerDiv + ".LogTab_Load").load(domainurl + "/Booking/LoadLogPartial?Start=" + encodeURI(datemin) + "&End=" + encodeURI(datemax) + "&pageno=" + 1 + "&pagesize=" + 50 + "&searchtxt=" + "" + "&CustomerId=" + CustomerLoadId + "&order=" + "");


    //$(LoadCustomerDiv + ".LogTab_Load").load(domainurl + "/Booking/LeadBookingPartial?CustomerId=" + CustomerLoadId);
    UpdateCustomerTabCounter();
}
var OpenInspectionTab = function () {

    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    OpenTopToBottomModal(domainurl + "/Customer/LoadCustomerInspection?CustomerId=" + CustomerLoadId);

}
var OpenTransactionTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".TransactionsTab").removeClass('hidden');
    $(LoadCustomerDiv + ".TransactionsTab").addClass('active');
    $(LoadCustomerDiv + ".TransactionsTab_Load").addClass('active'); 
    POSModal.Show();
    $(LoadCustomerDiv + ".TransactionsTab_Load").load(domainurl + "/Transaction/TransactionPartial/?CustomerId=" + CustomerLoadId);
    UpdateCustomerTabCounter();
}

var OpenEstimateTab = function () {
    
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".EstimateTab").removeClass('hidden');
    $(".EstimateTab").addClass('active');
    $(".EstimateTab_Load").addClass('active'); 
    POSModal.Show();
   
    $(".EstimateTab_Load").load("/customer-estimate/?CustomerId=" + CustomerLoadId);
//    UpdateCustomerTabCounter();
}
var OpenEstimatorTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".EstimatorTab").removeClass('hidden');
    $(LoadCustomerDiv + ".EstimatorTab").addClass('active');
    $(LoadCustomerDiv + ".EstimatorTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".EstimatorTab_Load").load("/Estimator/EstimatorPartial/?CustomerId=" + CustomerLoadId);
    UpdateCustomerTabCounter();
}
var OpenOrderTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".OrderTab").removeClass('hidden');
    $(LoadCustomerDiv + ".OrderTab").addClass('active');
    $(LoadCustomerDiv + ".OrderTab_Load").addClass('active'); 
    POSModal.Show();
    
    //$(LoadCustomerDiv + ".OrderTab_Load").load("/Order/CustomerOrderPartial/?CustomerId=" + CustomerLoadId);
    $(LoadCustomerDiv + ".OrderTab_Load").load("/Order/OrderPartial/");
    UpdateCustomerTabCounter();
}

var OpenScheduleTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".ScheduleTab").removeClass('hidden');
    $(LoadCustomerDiv + ".ScheduleTab").addClass('active');
    $(LoadCustomerDiv + ".ScheduleTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".ScheduleTab_Load").load(domainurl + "/TechSchedule/TechSchedulePartial?customerid=" + CustomerLoadGuid);
}

//var OpenFundingTab = function () {
//    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
//    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
//    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
//    $(LoadCustomerDiv + ".FundingTab").removeClass('hidden');
//    $(LoadCustomerDiv + ".FundingTab").addClass('active');
//    $(LoadCustomerDiv + ".FundingTab_Load").addClass('active');
//    $(LoadCustomerDiv + ".FundingTab_Load").html(TabsLoaderText);
//    
//    $(LoadCustomerDiv + ".FundingTab_Load").load(domainurl + "/Funding/FundingPartial?customerid=" + CustomerLoadGuid);
//}

var OpenFilesTab = function (soldby) {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".FilesTab").removeClass('hidden');
    $(LoadCustomerDiv + ".FilesTab").addClass('active');
    $(LoadCustomerDiv + ".FilesTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".FilesTab_Load").load(domainurl + "/File/CustomerFilesAndDocument/?id=" + CustomerLoadId + "&soldby=" + soldby);
    UpdateCustomerTabCounter();
}
var OpenTicketTab = function () {
    //var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(".customer-options-tabs li").removeClass('active');
    $(".tab_Content_customer_items .tab-pane").removeClass('active');
    $(".TicketTab").removeClass('hidden');
    $(".TicketTab").addClass('active');
    $(".TicketTab_Load").addClass('active'); 
    POSModal.Show();
    
    //$(".TicketTab_Load").load(domainurl + "/Ticket/TicketListPartial/?CustomerId=" + CustomerLoadGuid);
    UpdateCustomerTabCounter();
}
var OpenActivityTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".ActivityTab").removeClass('hidden');
    $(LoadCustomerDiv + ".ActivityTab").addClass('active');
    $(LoadCustomerDiv + ".ActivityTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".ActivityTab_Load").load(domainurl + "/Activity/ActivityListPartial/?CustomerId=" + CustomerLoadGuid);
    UpdateCustomerTabCounter();
}
var OpenOpportunityTab = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer-options-tabs li").removeClass('active');
    $(LoadCustomerDiv + ".tab_Content_customer_items .tab-pane").removeClass('active');
    $(LoadCustomerDiv + ".OpportunityTab").removeClass('hidden');
    $(LoadCustomerDiv + ".OpportunityTab").addClass('active');
    $(LoadCustomerDiv + ".OpportunityTab_Load").addClass('active'); 
    POSModal.Show();
    
    $(LoadCustomerDiv + ".OpportunityTab_Load").load(domainurl + "/Opportunity/OpportunityListPartial/?CustomerId=" + CustomerLoadGuid);
    UpdateCustomerTabCounter();
}

var OpenReceivePayment = function () {
    OpenTopToBottomModal(domainurl + "/Transaction/ReceivePayment/?CustomerId=" + CustomerLoadId);
}
var NewCarPaymentReceive = function (CustomerGuid, InvoiceId) {
    OpenTopToBottomModal(domainurl + "/customer/new-car-paymentreceive?CustomerId=" + CustomerGuid + "&InvoiceId=" + InvoiceId );
}
var EditCustomer = function (CustomerId) {

    OpenTopToBottomModal(domainurl + "/Customer/AddCustomer?id=" + CustomerId);
}
//[Shariful-25-9-19]
var EditCustomerInspection = function (CustomerId) {

    OpenTopToBottomModal(domainurl + "/Customer/LoadCustomerInspection?CustomerId=" + CustomerId);
}
//[~Shariful-25-9-19]
var EditCredential = function (CustomerId) {
    OpenRightToLeftModal(domainurl + "/Customer/EditCredential?CustomerId=" + CustomerId);
}
var CredentialSave = function () {
    var userlogin = {};
    userlogin.UserName = $("#username").val();
    userlogin.Password = $("#password").val();
    userlogin.Id = $("#Userlogin").val();
    userlogin.UserId = $("#CustomerId").val();
    userlogin.EmailAddress = $("#Email").val();
    if ($('#SendMailAddress').is(':checked') == true) {
        userlogin.SendMail = "true";
    }
    else {
        userlogin.SendMail = "false";
    }

    $.ajax({
        type: "POST",
        url: domainurl + "/Customer/CredentialSave",
        data: '{userlogin: ' + JSON.stringify(userlogin) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response.result);
            if (response.result) {
                if (response.result == true) {

                    OpenSuccessMessageNew("Success!", response.message, function () {


                        $("#Right-To-Left-Modal-Body .close").click();
                    });


                }

                else {
                    OpenErrorMessageNew("Error!", response.message);
                }

            }
            else {
                OpenErrorMessageNew("Error!", response.message);
            }
        }
    });
}

var CheckTokenForCredential = function () {


    var userlogin = {};
    userlogin.UserName = $("#username").val();
    userlogin.Password = $("#password").val();
    userlogin.Id = $("#Userlogin").val();
    userlogin.UserId = $("#CustomerId").val();
    userlogin.EmailAddress = $("#Email").val();
    if ($('#SendMailAddress').is(':checked') == true) {
        userlogin.SendMail = "true";
    }
    else {
        userlogin.SendMail = "false";
    }

    $.ajax({
        type: "POST",
        url: domainurl + "/Customer/CheckRoleAndSaveCredential",
        data: '{userlogin: ' + JSON.stringify(userlogin) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response.result);
            if (response.result) {
                OpenSuccessMessageNew("Success!", response.message, function () {


                    $("#Right-To-Left-Modal-Body .close").click();
                });
            }
            else {
                OpenErrorMessageNew("Error!", response.message);
            }
        }
    });

}

var PasswordGenerate = function () {
    $.ajax({

        type: "POST",
        url: domainurl + "/Customer/GeneratePassword",
        data: '{length: ' + JSON.stringify("8") + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#password").val("");
            $("#password").val(response);
        }
    });
}
var EditCustomerBill = function (CustomerId) {
    OpenTopToBottomModal(domainurl + "/Customer/AddCustomer?id=" + CustomerId + "&IsGotoBill=true");
}
var SaveCredential = function () {
    console.log("hihello");
    if (CommonUiValidation()) {

        CheckTokenForCredential();
    }
    else {

    }
}
var OpenCustomerEmergency = function (CustomerId) {
    OpenTopToBottomModal(domainurl + "/Customer/AddCustomer?id=" + CustomerId + "&IsEmergency=true");
}
var OpenCustomerContact = function (CustomerId) {
    OpenTopToBottomModal(domainurl + "/Contact/AddContact?CustomerId=" + CustomerId);
}
var OpenCustomerActivity = function (CustomerId) {
    OpenTopToBottomModal("/Activity/AddActivity?CustomerId=" + CustomerId);
}

var OpenCustomerEditActivity = function (CustomerId) {
    console.log(CustomerId);
    OpenTopToBottomModal(domainurl + "/Customer/AddCustomer?id=" + CustomerId + "&IsAccountActivity=true");
}
var GetDate = function (day, month, year) {
    if ($("li.SalesTab").hasClass('active')) {
        NewSalesLoad(day, month, year);
    } else if ($("li.WorkOrderTab").hasClass('active')) {
        NewWorkOrderLoad(day, month, year);
    } else if ($("li.ServiceOrderTab").hasClass('active')) {
        //$(".Left-Modal-Open").click()
        ServiceCalendarLoad(day, month, year);
    }
}
var GetEcontract = function () {

    var DownloadUrl = domainurl + "/API/GetEcontract/?EcontractId=" + EnvelopeID + "&&CustomerId=" + CustomerLoadGuid;
    window.open(DownloadUrl, '_blank');

}
var LoadActivityBox = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".CustomerActivity").load(domainurl + "/Customer/CustomerActivities?customerId=" + CustomerLoadGuid);
}
var LoadOpportunityBox = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer_opportunitylist").load(domainurl + "/Customer/CustomerOpportunityList?CustomerId=" + CustomerLoadGuid);
}
var LoadContactBox = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".contacts").load(domainurl + "/Customer/CustomerContacts?customerId=" + CustomerLoadGuid + "&soldby=" + $(".contacts").attr('soldby'));
}

var LoadTicketBox = function () {
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $(LoadCustomerDiv + ".customer_ticket_list").load(domainurl + "/Ticket/CustomerOverviewTicketList?customerid=" + CustomerLoadId);
}

var LoadCustomerDetailBoxes = function () {
    LoadContactBox();
    LoadOpportunityBox();
    LoadActivityBox();
    LoadTicketBox();
}

$(document).ready(function () {
    //jQuery.each(idlist, function (i, val) {
    //    //magnificPopupObj(val);
    //});
    var LoadCustomerDiv = "#customer_tab_" + CustomerLoadId + " ";
    $('.back-to-customerlist').click(function () {
        LoadCustomer(true);
    })
    $(".LoaderWorkingDiv").hide();
    $("#LoadManufacturers").addClass("active");
    var newsupplierpopwinowwith = 920;
    var newsupplierpopwinowheight = 600;
    OpenCustomerDetailTab()
    $(".addressMapPopup").click(function () {
        CustomerGuidID = $(this).attr('data-id');
        var mapLoadUrl = domainurl + "/Customer/CustomerAddressMap?CustomerId=" + CustomerGuidID;
        $(".MapManufacturerMagnific").attr("href", mapLoadUrl);
        $(".MapManufacturerMagnific").click();
    });
    $(".addressMapPopupPrevious").click(function () {
        CustomerGuidID = $(this).attr('data-id');
        var mapLoadUrlPrevious = domainurl + "/Customer/CustomerAddressMapPrevious?CustomerId=" + CustomerGuidID;
        $(".MapManufacturerMagnificPrevious").attr("href", mapLoadUrlPrevious);
        $(".MapManufacturerMagnificPrevious").click();
    });
    $("#btnEcontract").click(function () {
        GetEcontract();
    })
    $("#btn_addccpaymentcustomer").click(function () {
        OpenRightToLeftModal("/SmartLeads/CCAddViewPaymentMethod?customerid=" + CustomerLoadGuid + "&type=Customer");
    });
    $("#btn_addachpaymentcustomer").click(function () {
        OpenRightToLeftModal("/SmartLeads/ACHAddViewPaymentMethod?customerid=" + CustomerLoadGuid + "&type=Customer");
    });
});
