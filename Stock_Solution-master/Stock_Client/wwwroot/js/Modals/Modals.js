var DefaultConfirmationfunc = null;
var DefaultConfirmationfunc2 = null;
var DefaultConfirmationfuncn = null;
var DefaultConfirmationRejectfunc = null;
var DefaultSuccessfunc = null;
var DefaultErrorfunc = null;
var DefaultCautionfunc = null;
var DefaultCancelfunc = null;
var DefaultCancelCustomerfunc = null;
var DefaultPayfunc = null;
var DefaultSalePayfunc = null;
var DefaultSalePayRejectfunc = null;
var DefaultTopToBottomFunc = null;
//alerts 
const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
var ToastFuncOnConfirm = null;
var ToastFuncOnDeny = null;
const ToastConfirm = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Go!',
    denyButtonText: 'Cancel',
    allowOutsideClick: false,
    allowEscapeKey: false

})

var ShowConfirmMessage = function (message, ToDoFunc, DenyFunc) {
    ToastConfirm.fire({
        icon: 'success',
        title: message,
        preConfirm: function () {
            if (typeof (ToDoFunc) == "function") {
                ToDoFunc()
            } else {
                ToastFuncOnConfirm = function () { };
            }
        },
        preDeny: function () {
            if (typeof (DenyFunc) == "function") {
                DenyFunc()
            } else {
                ToastFuncOnDeny = function () { };
            }
        },
    })
}
var templ = '<swal-input type="..." label="..." placeholder="..." value="..." />'
var ShowConfirmMessageWithTextbox = function (message, ToDoFunc, DenyFunc) {
    ToastConfirm.fire({
        icon: 'success',
        title: '<input type="text" class="form-control" placeholder="Enter date time" id="dt_time"/>',
        preConfirm: function () {
            if (typeof (ToDoFunc) == "function") {
                ToDoFunc()
            } else {
                ToastFuncOnConfirm = function () { };
            }
        },
        preDeny: function () {
            if (typeof (DenyFunc) == "function") {
                DenyFunc()
            } else {
                ToastFuncOnDeny = function () { };
            }
        },
    })
}
var ShowSuccessMessage = function (message) {
    Toast.fire({
        icon: 'success',
        title: message
    })
}
var ShowErrorMessage = function (message) {
    Toast.fire({
        icon: 'error',
        title: message
    })
} 
var OpenConfirmationMessageNew = function (HeaderMessage, BodyMessage, ToDoFunc, RejectFunc) {
    console.log('OpenConfirmationMessageNew');
    $("#ModalConfirmationMessage .modal-title").html(HeaderMessage);
    $('#ModalConfirmationMessage p').html(BodyMessage);

    
    $("#btn_yes").off('click');
    $("#btn_no").off('click');

    if (typeof (ToDoFunc) === "function") {

        console.log('DefaultConfirmationfunc 0');
        DefaultConfirmationfunc = ToDoFunc;
        $("#eqp_checkbox").prop('checked', true);
        $("#ser_checkbox").prop('checked', true);
        $("#eqp_checkbox").change(function () {
            if ($("#eqp_checkbox").prop('checked')) {
                $("#eqp_checkbox").prop('checked', true);
                $("#ser_checkbox").prop('checked', true);
            } else {
                $("#eqp_checkbox").prop('checked', false);
                $("#ser_checkbox").prop('checked', false);
            }
        });
        $("#ser_checkbox").change(function () {
            if ($("#ser_checkbox").prop('checked')) {
                $("#eqp_checkbox").prop('checked', true);
                $("#ser_checkbox").prop('checked', true);
            } else {
                $("#eqp_checkbox").prop('checked', false);
                $("#ser_checkbox").prop('checked', false);
            }
        });
    } else {
        DefaultConfirmationfunc = function () {
            console.log('DefaultConfirmationfunc 1');
        };
    }

    if (typeof (RejectFunc) === "function") {
        DefaultConfirmationRejectfunc = RejectFunc;
    } else {
        DefaultConfirmationRejectfunc = function () {
            console.log('DefaultConfirmationRejectfunc 0');
        };
    }

    $("#btn_yes").on('click', function () { console.log('yes clicked'); });
    $("#btn_no").on('click', function () { console.log('no clicked'); });

    $("#ConfirmationMessageModal").click();
} 
var OpenSuccessMessageNew = function (HeaderMessage, BodyMessage, ToDoFunc) {
    //$("#ModalSuccessMessage").css('top', -window.innerHeight);
    $("#ModalSuccessMessage .message_header_title").html(HeaderMessage);
    $("#ModalSuccessMessage p").html(BodyMessage);
    if (typeof (ToDoFunc) === "function") {
        DefaultSuccessfunc = ToDoFunc;
        $(".close").unbind();

    } else {
        DefaultSuccessfunc = function () { };
    }
    $("#SuccessMessageModal").click();    
}
var OpenTextModal = function (HeaderMessage, BodyMessage, txtvalue, ToDoFunc, RejectFunc) {
    
        $("#ModalOpenText .message_header_title").text(HeaderMessage);
        $("#ModalOpenText b").html(BodyMessage);
        if (typeof txtvalue === 'undefined' || txtvalue === null || txtvalue === '') {
            txtvalue = 0;
        }
        if (typeof (ToDoFunc) === "function") {
            DefaultSalePayfunc = ToDoFunc;
        } else {
            DefaultSalePayfunc = function () { };
        }
        if (typeof (RejectFunc) === "function") {
            DefaultSalePayRejectfunc = RejectFunc;
        } else {
            DefaultSalePayRejectfunc = function () { };
        }
        $("#OpenTextModal").click();
    }



var OpenCancelCustomer = function (HeaderMessage, BodyMessage, ToDoFunc) {
    $("#ModalCancelCustomer .cancel-title").text(HeaderMessage);
    $("#ModalCancelCustomer cancel-body p").text(BodyMessage);
    if (typeof (ToDoFunc) === "function") {
        DefaultCancelCustomerfunc = ToDoFunc;

    } else {
        DefaultCancelCustomerfunc = function () { };
    }
    $("#CancelCustomerModal").click();
}
var OpenErrorMessageNew = function (HeaderMessage, BodyMessage, ToDoFunc) {
    $("#ModalErrorMessage .message_header_title").text(HeaderMessage);
    $('#ModalErrorMessage p').html(BodyMessage);
    if (typeof (ToDoFunc) === "function") {
        DefaultPayfunc = ToDoFunc;
    } else {
        DefaultPayfunc = function () { };
    }
    $("#ErrorMessageModal").click();
}
var OpenConfirmMessageTicketNew = function (HeaderMessage, BodyMessage, ToDoFunc, RejectFunc) {
    $("#ConfirmMessageModalN .message_header_title").text(HeaderMessage);
    $('#ConfirmMessageModalN p').html(BodyMessage);
    if (typeof (ToDoFunc) === "function") {
        DefaultConfirmationfunc = ToDoFunc;
    } else {
        DefaultConfirmationfunc = function () { };
    }
    if (typeof (RejectFunc) === "function") {
        DefaultConfirmationRejectfunc = RejectFunc;
    } else {
        DefaultConfirmationRejectfunc = function () { };
    }
    $("#NewConfirmMessageModal").click();
}
var OpenCautionMessageNew = function (HeaderMessage, BodyMessage, ToDoFunc) {
    $("#ModalCautionMessage .message_header_title").text('Caution!');
    $('#ModalCautionMessage p').html(BodyMessage);
    if (typeof (ToDoFunc) === "function") {

        DefaultCautionfunc = ToDoFunc;
    } else {
        DefaultCautionfunc = function () { };
    }
    $("#CautionMessageModal").click();
}
var OpenCancelMessageNew = function (HeaderMessage, BodyMessage, ToDoFunc) {
    $("#ModalCancelMessage .message_header_title").text('Caution!');
    $('#ModalCancelMessage p').html(BodyMessage);
    if (typeof (ToDoFunc) === "function") {

        DefaultCancelfunc = ToDoFunc;
    } else {
        DefaultCancelfunc = function () { };
    }
    $("#CancelMessageModal").click();
}
var OpenTopToBottomModal = function (url, ToDoFunc) {
    var windowHeight = $(window).height();
    $(".TopToBottomModal").css('top', -window.innerHeight);
    $(".TopToBottomModal").show();
    $(".TopToBottomModal").animate({
        top: 0
    }, 200);

    var InvoiceLoaderText = '<div class="lds-dual-ring" id="dev_loader"></div>';
    POSModal.Show();
    /*$(".TopToBottomModal .ContentsDiv").html(InvoiceLoaderText);*/
    setTimeout(function () {
        $(".top_to_bottom_modal_container").css("height", window.innerHeight);
    }, 300);
    setTimeout(function () {
      
        $(".TopToBottomModal .ContentsDiv").load(url, function () {
            if (typeof (ToDoFunc) == "function") {
                setTimeout(function () {
                    DefaultTopToBottomFunc = ToDoFunc;
                }, 300);
            } else {
                DefaultTopToBottomFunc = function () { };
            }
            POSModal.Hide();
        });
       
    }, 700);


}
var OpenTopToBottomConfirmationModal = function (url) {
    var windowHeight = $(window).height();
    $(".TopToBottomConfirmationModal").css('top', -window.innerHeight);
    $(".TopToBottomConfirmationModal").show();
    $(".TopToBottomConfirmationModal").animate({
        top: 60
    }, 300);

    var InvoiceLoaderText = '<div class="lds-dual-ring" id="dev_loader"></div>';
    $(".TopToBottomConfirmationModal .ContentsDiv").html(InvoiceLoaderText);
    setTimeout(function () {
        var h = window.innerHeight - 119;
        $(".top_to_bottom_modal_container").css("height", h);
    }, 300);
    setTimeout(function () {
        $(".TopToBottomConfirmationModal .ContentsDiv").load(url);
    }, 700);
}
var CloseTopToBottomModal = function () {
    $(".TopToBottomModal").animate({
        top: -window.innerHeight
    }, 500);
    setTimeout(function () {
        $(".TopToBottomModal").hide();
        $(".TopToBottomModal .ContentsDiv").html("")
    }, 510);
}
var CloseTopToBottomConfirmationModal = function () {
    $(".TopToBottomConfirmationModal").animate({
        top: -window.innerHeight
    }, 500);
    setTimeout(function () {
        $(".TopToBottomConfirmationModal").hide();
        $(".TopToBottomConfirmationModal .ContentsDiv").html("")
    }, 510);
}

var OpenFullScreenLoginModal = function (url) {
    var windowHeight = $(window).height();
    $("#FullScreenLoginModal").css('top', -window.innerHeight);
    $("#FullScreenLoginModal").show();
    $("#FullScreenLoginModal").animate({
        top: 0
    }, 200);
    setTimeout(function () {
        $(".top_to_bottom_modal_container").css("height", window.innerHeight);
    }, 300);
}
var CloseFullScreenLoginModal = function () {
    $("#FullScreenLoginModal").animate({
        top: -window.innerHeight
    }, 500);
    setTimeout(function () {
        $("#FullScreenLoginModal").hide();
    }, 510);
}
var CloseRightToLeftModal = function (url) {
    $("#Right-To-Left-Modal-Body .modal-body").html("");
    $("#RightToLeftModal").click();
}
var OpenRightToLeftModal = function (url) {
    $("#RightToLeftModal").click();
    //var InvoiceLoaderText = '<div class="lds-dual-ring" id="dev_loader"></div>';
    //$("#Right-To-Left-Modal-Body .modal-body").html(InvoiceLoaderText);
   
    var InvoiceLoaderText = $("#site_preloader").html();
    $("#Right-To-Left-Modal-Body .modal-body").html(InvoiceLoaderText);
   
    if (typeof (url) != "undefined" && url != "") {
        $("#Right-To-Left-Modal-Body .modal-body").load(url);
    }
    //POSModal.Hide();
}
var OpenRightToLeftModalMMR = function (url) {
    $("#RightToLeftModalMMR").click();
    var InvoiceLoaderText = "<div class='invoice-loader' style='position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;'><div><div class='lds-css ng-scope'><div style='margin:auto; z-index:99;' class='lds-double-ring'><div></div><div></div></div></div></div></div>";
    $("#Right-To-Left-Modal-Body-MMR .modal-body").html(InvoiceLoaderText);
    if (typeof (url) !== "undefined" && url !== "") {
        $("#Right-To-Left-Modal-Body-MMR .modal-body").load(url);
    }
}
var OpenRightToLeftLgModal = function (url) {
    $("#RightToLeftBigModal").click();
    var InvoiceLoaderText = "<div class='invoice-loader' style='position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;'><div><div class='lds-css ng-scope'><div style='margin:auto; z-index:99;' class='lds-double-ring'><div></div><div></div></div></div></div></div>";
    $("#Right-To-Left-big-Modal-Body .modal-body").html(InvoiceLoaderText);
    if (typeof (url) != "undefined" && url !== "") {
        $("#Right-To-Left-big-Modal-Body .modal-body").load(url);
    }
}
var OpenCreditAmountModal = function (HeaderMessage, BodyMessage, ToDoFunc) {
    $("#ModalOpenCreditAndAmmount span").html(HeaderMessage);
    $("#ModalOpenCreditAndAmmount p").html(BodyMessage);
    if (typeof (ToDoFunc) === "function") {
        DefaultSuccessfunc = ToDoFunc;
        $(".closenew").unbind();

    } else {
        DefaultSuccessfunc = function () { };
    }
    $("#OpenCreditAndAmmountModal").click();
}

$(document).ready(function () {
    $(".PaymentPertialvalidation").click(function () {
        console.log("akbhfhja");
        /*if ($("#PayAmountTxt").val().length> 0) {*/
        DefaultSuccessfunc(true);

    });
});


