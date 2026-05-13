var UpdateNotificationCount = function () {
    $.ajax({
        url: '/Settings/GetNotiCount',
        type: 'post',
        success: function (data) {
            console.log(data);
            var counts = data.split('-');
            $('#noti_count').text(counts[0]);
            $('#mgs_count').text(counts[1]);

            if ($(".leave_count_block").length > 0) {
                $(".leave_count_block").text(counts[1]);
            }
            $('#noti_container_global').load('/web-notifications')
        }
    })
}
var UpdateNotification = function () {
    $.ajax({
        url: '/Settings/UpdateNotiCount',
        type: 'post',
        success: function (data) {
            $('#noti_count').text('0')
        }
    })
}
var NewPOSSalesClick = function () {
    window.history.pushState({}, '', "/new-pos-sales");
    $(".common-active").removeClass('active');
    //$(".NewSales").addClass('active');
    POSModal.Show();
    $('#main-container-lite').load("/new-pos-sales", function () { POSModal.Hide(); });
    return false;
};
document.addEventListener("keydown", function (event) {
    if (event.altKey && event.code === "KeyN") {
        $('#NewPOSSales').click()
        event.preventDefault();
    }
});
(function () {

    function notifyCallback(title, opt) {
        console.log("title", title);
    }

    const OldNotify = window.Notification;

    function newNotify(title, opt) {
        notifyCallback(title, opt);
        return new OldNotify(title, opt);
    }

    newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
    Object.defineProperty(newNotify, 'permission', {
        get: function () {
            return OldNotify.permission;
        }
    });

    window.Notification = newNotify;
})();
var EnableAll = function () {
    $('.btn').removeAttr('disabled')
}
var DisableAll = function () {
    $('.btn').attr('disabled', 'disabled');
}

var NotiAllPeople = function () {

    Notification.requestPermission(function (permission) {
        if (permission === "granted") {
            const notif = new Notification('ON DEVELOPMENT -by Brinta Sabit');
        }
    });
}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
var invoice;
var LoaderLayout = '<div class="Loader_Container" id="LoaderPOS"><div class="lds-dual-ring" id="dev_loader"></div></div>';
var xhr = new window.XMLHttpRequest(),
    method = "POST";
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
function formatRepo(repo) {
    if (repo.loading) {
        return repo.text;
    }

    var $container = $(
        "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'></div>" +
        "<div class='select2-result-repository__description'></div>" +
        "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> </div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> </div>" +
        "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> </div>" +
        "</div>" +
        "</div>" +
        "</div>"
    );

    $container.find(".select2-result-repository__title").text(repo.full_name);
    $container.find(".select2-result-repository__description").text(repo.description);
    $container.find(".select2-result-repository__forks").append(repo.forks_count + " Forks");
    $container.find(".select2-result-repository__stargazers").append(repo.stargazers_count + " Stars");
    $container.find(".select2-result-repository__watchers").append(repo.watchers_count + " Watchers");

    return $container;
}
function formatRepoSelection(repo) {
    return repo.full_name || repo.text;
}
var currency = 'K';
var Password = {
    Save: function () {
        Swal.fire({
            title: 'Change Password',
            html: ` <label>Old Password</label>
                    <input type="password" class="form-control" id="oldPassword" placeholder="Old Password"><br>
                    <label>New Password</label>
                    <input type="password" class="form-control" id="newPassword" placeholder="New Password"><br>
                    <label>Re-type New Password</label>
                    <input type="password" class="form-control" id="confirmNewPassword" placeholder="Re-type New Password">`,
            inputAttributes: {
                autocapitalize: 'off'
            },
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-success'
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                var url = "/Executive/ChangeExcPassword";
                var requestData = {
                    OldPassword: $("#oldPassword").val(),
                    NewPassword: $("#newPassword").val(),
                    CPassword: $("#confirmNewPassword").val(),
                }
                if (requestData.OldPassword == "") {
                    $("#oldPassword").addClass('required')
                    Swal.showValidationMessage(
                        `Request failed`
                    )
                }
                if (requestData.NewPassword == "") {
                    $("#newPassword").addClass('required')
                    Swal.showValidationMessage(
                        `Request failed`
                    )
                }
                if (requestData.CPassword == "") {
                    $("#confirmNewPassword").addClass('required')
                    Swal.showValidationMessage(
                        `Request failed`
                    )
                }
                //if (requestData.CPassword != requestData.NewPassword) {
                //    $("#confirmNewPassword").addClass('required')
                //    Swal.showValidationMessage(
                //        `Request failed`
                //    )
                //} 
                else {
                    $("#oldPassword").removeClass('required')
                    $("#newPassword").removeClass('required')
                    $("#confirmNewPassword").removeClass('required');
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: JSON.stringify(requestData),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (!data.result) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'warning',
                                    //title: data.message,
                                    showConfirmButton: true,
                                    title: 'Failed',
                                    text: data.message,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#b70410',
                                    cancelButtonColor: '#b70410',
                                    confirmButtonText: 'Try Again'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        Password.Save();
                                    }
                                })
                                //Swal.showValidationMessage(
                                //    `Request failed:${data.message}`
                                //)
                                //Password.Save();
                            }
                            else {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Password changed successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                window.location.href = "/login"
                            }
                        },
                        error: function (exr) {
                            if (typeof exr.statusText != 'undefined') {
                                console.log('Function Status : ' + exr.statusText);
                            }
                        }
                    });
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }
}
var getClientTimeZone = function () {
    var currentzone = new Date().getTimezoneOffset(), number = Math.abs(currentzone);
    return (currentzone < 0 ? "P " : "N ") + ("00" + Math.floor(number / 60)).slice(-2) + ":" + ("00" + (number % 60)).slice(-2);
}
$(document).click((event) => {
    if (!$(event.target).closest('.DateFilterContents').length) {
        // the click occured outside '#element'
        $("#revdatefilter").addClass('display_nn');
    }
    if (!$(event.target).closest('.tt-menu').length) {
        // the click occured outside '#element'
        $('.tt-menu').hide()
    }
});
var ScrollToElement = function (id) {
    $('.nav-wrapper').animate({
        scrollTop: $(id).offset().top
    }, 500);
}
var ResetTiket = function () {
    IsmineFilter = "";
}

$(document).ready(function () {
    var hiturl = window.location.href;
    var path = window.location.pathname;
    var strArray = hiturl.split('#');
    if (strArray.length == 2) {
        hiturl = strArray[1];
    }
    if (hiturl == "asmtab") {
        $('.common-collection-tab').removeClass('active')
        $('.common-collection-tab').removeClass('show')
        $('#asm-collection-tab').addClass('active')
    }
    if (hiturl == "areatab") {
        $('.common-collection-tab').removeClass('active')
        $('.common-collection-tab').removeClass('show')
        $('#area-collection-tab').addClass('active')
    }
    if (hiturl == "zonetab") {
        $('.common-collection-tab').removeClass('active')
        $('.common-collection-tab').removeClass('show')
        $('#zone-collection-tab').addClass('active')
    }
    if (hiturl == "noticeboardtab") {
        $('.common-notice-tab').removeClass('active')
        $('.common-notice-tab').removeClass('show')
        $('#noticeboard-tab').addClass('active')
        $('#noticeboard').addClass('active')
        $('#noticeboard').addClass('show')
    }
    if (hiturl == "notificationtab") {
        $('.common-notice-tab').removeClass('active')
        $('.common-notice-tab').removeClass('show')
        $('#notification-tab').addClass('active')
        $('#notification').addClass('active')
        $('#notification').addClass('show')
    }

    if (hiturl == "transfer") {
        if ($("#location-togole").hasClass("hidden")) {
            $("#location-togole").removeClass("hidden");
        }
        else {
            $("#location-togole").addClass("hidden");
        }
        $("#location_update").addClass('active');
    }

    var pathname = window.location.pathname;
    $(".common-active").removeClass('active');
    if (pathname == "/dashboard") {
        $(".imgdash").addClass('active');
    }
    else if (pathname == "/dashboard") {
        $("#dashboard").addClass('active');
    } else if (pathname == "/employee-profile") {
        $("#employee").addClass('active');
    }  
    else if (pathname == "/projects/list") {
        if ($("#project-togole").hasClass("hidden")) {
            $("#project-togole").removeClass("hidden");
        } else {
            $("#project-togole").addClass("hidden");
        }
        ScrollToElement(".Project")
        $(".Project").addClass('active');
    } else if (pathname == "/pay-slip") {
        if ($("#project-togole").hasClass("hidden")) {
            $("#project-togole").removeClass("hidden");
        } else {
            $("#project-togole").addClass("hidden");
        }
        ScrollToElement(".pay_slip")
        $(".pay_slip").addClass('active');
    }
    else if (pathname == "/employees-salary") {
        if ($("#project-togole").hasClass("hidden")) {
            $("#project-togole").removeClass("hidden");
        } else {
            $("#project-togole").addClass("hidden");
        }
        ScrollToElement(".Project")
        $(".Project").addClass('active');
    } else if (pathname == "/projects/tickets") {
        if ($("#project-togole").hasClass("hidden")) {
            $("#project-togole").removeClass("hidden");
        } else {
            $("#project-togole").addClass("hidden");
        }
        ScrollToElement(".Project_tkt")
        $(".Project_tkt").addClass('active');
    } else if (pathname == "/employees-gratuity") {
        if ($("#project-togole").hasClass("hidden")) {
            $("#project-togole").removeClass("hidden");
        } else {
            $("#project-togole").addClass("hidden");
        }
        ScrollToElement(".Project_tkt")
        $(".Project_tkt").addClass('active');
    }
    else if (pathname == "/report/represent-wise-sales") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        } else {
            $("#report-togole").addClass("hidden");
        }
        ScrollToElement(".RepresentativeSale")
        $(".RepresentativeSale").addClass('active');
    }
    else if (pathname == "/reports/stock-item-summary-report") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        } else {
            $("#report-togole").addClass("hidden");
        }
        ScrollToElement(".StockItemSummaryReport")
        $(".StockItemSummaryReport").addClass('active');
    } else if (pathname == "/reports/stock-report-custom") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        } else {
            $("#report-togole").addClass("hidden");
        }
        ScrollToElement(".StockReportCustom")
        $(".StockReportCustom").addClass('active');
    }
    else if (pathname == "/report/item-wise-sales") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        } else {
            $("#report-togole").addClass("hidden");
        }
        ScrollToElement(".RepresentativeSale")
        $(".ItemWiseSalesReport").addClass('active');
    }
    else if (pathname == "/report/category-wise-sales") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        } else {
            $("#report-togole").addClass("hidden");
        }
        ScrollToElement(".CatgWiseSalesReport")
        $(".CatgWiseSalesReport").addClass('active');
    }
    else if (pathname == "/report/on-credit-sales") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        } else {
            $("#report-togole").addClass("hidden");
        }
        ScrollToElement(".RepresentativeSale")
        $(".OnCreditSales").addClass('active');
    }
    else if (pathname == "/inventory/detail-sale") {
        $(".NewSales").addClass('active');
    } else if (pathname == "/hrd/users-work-log") {
        if ($("#hrdmenu-togole").hasClass("hidden")) {
            $("#hrdmenu-togole").removeClass("hidden");
        } else {
            $("#hrdmenu-togole").addClass("hidden");
        }
        $(".user_work_log").addClass('active');
    }
    else if (pathname == "/settings/hr-manager") {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        } else {
            $("#setting-togole").addClass("hidden");
        }
        $(".HrManager").addClass('active');
    }
    else if (pathname == "/settings/govt-holyday") {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        } else {
            $("#setting-togole").addClass("hidden");
        }
        $(".GovtHolyday").addClass('active');
    }
    else if (pathname == "/settings/settings-menu") {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        } else {
            $("#setting-togole").addClass("hidden");
        }
        $(".settingReport").addClass('active');
    }
    else if (pathname == "/settings/branch") {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        } else {
            $("#setting-togole").addClass("hidden");
        }
        $(".EmpBranch").addClass('active');
    }
    else if (pathname == "/settings/leave-type") {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        } else {
            $("#setting-togole").addClass("hidden");
        }
        $(".leavetype").addClass('active');
    }
    else if (pathname == "/settings/leave-setup") {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        } else {
            $("#setting-togole").addClass("hidden");
        }
        $(".leavesetup").addClass('active');
    }
    else if (pathname == "/settings/calender-year") {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        } else {
            $("#setting-togole").addClass("hidden");
        }
        $(".CalenderYear").addClass('active');
    }
    else if (pathname == "/report/daily-attendance") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".attendanceReport").addClass('active');
    } else if (pathname == "/report/monthly-attendance") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".mAttendanceReport").addClass('active');
    } else if (pathname == "/report/my-attendance") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".myAttendanceReport").addClass('active');
    } else if (pathname == "/report/salary-report") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".salaryReport").addClass('active');
    } else if (pathname == "/report/bonus-report") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".bonusReport").addClass('active');
    }
    else if (pathname == "/report/upcoming-birthday-report") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".uppcomingBirthdayReport").addClass('active');
    }
    else if (pathname == "/report/anniversary-report") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".anniversaryDate").addClass('active');
    } else if (pathname == "/report/upcoming-evaluation-report") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".uppcomingEvaluationReport").addClass('active');
    } else if (pathname == "/report/monthly-attendance-time") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".mAttendanceTimeReport").addClass('active');
    } else if (pathname == "/report/detail-attendance") {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        } else {
            $("#rtmenu-togole").addClass("hidden");
        }
        $(".detattendanceReport").addClass('active');
    }
    else if (pathname == "/hrd/leave-management") {
        if ($("#hrdmenu-togole").hasClass("hidden")) {
            $("#hrdmenu-togole").removeClass("hidden");
        } else {
            $("#hrdmenu-togole").addClass("hidden");
        }
        $(".LeaveApp").addClass('active');
    } else if (pathname == "/employee/leave-detail") {
        if ($("#hrdmenu-togole").hasClass("hidden")) {
            $("#hrdmenu-togole").removeClass("hidden");
        } else {
            $("#hrdmenu-togole").addClass("hidden");
        }
        $(".LeaveApp").addClass('active');
    }
    else if (pathname == "/hrd/meal-management") {
        if ($("#hrdmenu-togole").hasClass("hidden")) {
            $("#hrdmenu-togole").removeClass("hidden");
        } else {
            $("#hrdmenu-togole").addClass("hidden");
        }
        $(".Mealmanagement").addClass('active');
    }
    else if (pathname == "/settings-menu") {
        $(".settingsmenu").addClass('active');
    }
    else if (pathname == "/hrd/colleagues") {
        $(".EmployeeColl").addClass('active');
    }
    else if (pathname == "/hrd/break") {
        $(".break").addClass('active');
    }
    else if (pathname == "/hrd/employee-earn-leave") {
        $(".EmployeeEarnLeave").addClass('active');
    }
    else if (pathname == "/hrd/daily-attendance") {
        $(".DailyAttendance").addClass('active');
    }
    else if (pathname == "/hrd/attendance-adjustment") {
        $(".AttendanceAdjustment").addClass('active');
    }
    else if (pathname == "/hrd/daily-work-log") {
        $(".DailyWorkLog").addClass('active');
    }
    else if (pathname == "/settings/hr-manager") {
        $(".HrManager").addClass('active');
    }
    else if (pathname == "/settings/govt-holyday") {
        $(".GovtHolyday").addClass('active');
    }
    else if (pathname == "/employee-transfer") {
        $(".EmployeeTransfer").addClass('active');
    }
    else if (pathname == "/employee-transfer-req") {
        $(".EmployeeTransferReqest").addClass('active');
    }
    else if (pathname == "/settings/branch") {
        $(".EmpBranch").addClass('active');
    }
    else if (pathname == "/settings/leave-type") {
        $(".leavetype").addClass('active');
    }
    else if (pathname == "/settings/leave-setup") {
        $(".leavesetup").addClass('active');
    }
    else if (pathname == "/settings/calender-year") {
        $(".CalenderYear").addClass('active');
    }
    else if (pathname == "/hrd/team") {
        $(".EmployeeTC").addClass('active');
    }
     else if (pathname == "/settings-menu") {
        $(".settingsmenu").addClass('active');
    }
    else if (pathname == "/inventory/procurement/purchase-history") {
       
        if ($("#inventory-togole").hasClass("hidden")) {
            $("#inventory-togole").removeClass("hidden");
        } else {
            $("#inventory-togole").addClass("hidden");
        }
        //if ($("#procurement-togole").hasClass("hidden")) {
        //    $("#procurement-togole").removeClass("hidden");
        //} else {
        //    $("#procurement-togole").addClass("hidden");
        //}
        $(".Purchase").addClass('active');
        $("#inventorytmenu").addClass("arrow_change");
        /*$("#ProcurementMenu").addClass("arrow_change");*/
    }
    else if (pathname == "/inventory/stock") {
        if ($("#inventory-togole").hasClass("hidden")) {
            $("#inventory-togole").removeClass("hidden");
        } else {
            $("#inventory-togole").addClass("hidden");
        }
        $(".stockmenu").addClass('active');
        $("#inventorytmenu").addClass("arrow_change");
    }
    else if (pathname == "/inventory/low-stock") {
        if ($("#inventory-togole").hasClass("hidden")) {
            $("#inventory-togole").removeClass("hidden");
        } else {
            $("#inventory-togole").addClass("hidden");
        }
        $(".lowstockmenu").addClass('active');
        $("#inventorytmenu").addClass("arrow_change");
    }
    else if (pathname == "/inventory/new-sale") {
        $(".NewSales").addClass('active');
    }
    else if (pathname == "/new-pos-sales") {
        $(".NewPOSSales").addClass('active');
    } else if (pathname == "/notifications") {
        $(".notificationmenu").addClass('active');
    }
    else if (pathname == "/make-quotation") {
        $(".WholeSales").addClass('active');
    }
    else if (pathname == "/make-quotation") {
        $(".MakeQuatation").addClass('active');
    }
    else if (pathname == "/quotation-list") {
        $(".quotationlist").addClass('active');
    }
    else if (pathname == "/expenses") {
        $(".expense").addClass('active');
    }
    else if (pathname == "/customer") {
        $("#CustomerCRM").addClass('active');
    }
    else if (pathname == "/vendor") {
        $("#VendorId").addClass('active');
    }
    else if (pathname == "/lead") {
        $("#Lead").addClass('active');
    }
    else if (pathname == "/customers") {
        window.history.pushState({}, '', "/customers");

        if ($("#account-togole").hasClass("hidden")) {
            $("#account-togole").removeClass("hidden");
        }
        else {
            $("#account-togole").addClass("hidden");
        }
        $("#customers").addClass('active');

    }
    else if (pathname == "/sales") {
        window.history.pushState({}, '', "/sales");
        $("#sales").addClass('active');
    }
    else if (pathname == "/employee") {
        window.history.pushState({}, '', "/employee");
        if ($("#hrdmenu-togole").hasClass("hidden")) {
            $("#hrdmenu-togole").removeClass("hidden");
        } else {
            $("#hrdmenu-togole").addClass("hidden");
        }
        $("#employee").addClass('active');
    }
    //product
    else if (pathname == "/products/product-list") {
        window.history.pushState({}, '', "/products/product-list");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
        $("#product").addClass('active');
        $("#ProductMenu").addClass("arrow_change");
    }
    else if (pathname == "/assets/asset-list") {
        window.history.pushState({}, '', "/assets/asset-list");
        if ($("#asset-togole").hasClass("hidden")) {
            $("#asset-togole").removeClass("hidden");
        }
        else {
            $("#asset-togole").addClass("hidden");
        }
        $("#AssetList").addClass('active');
        $("#AssetMenu").addClass("arrow_change");
    }
    else if (pathname == "/assets/asset-purchase") {
        window.history.pushState({}, '', "/assets/asset-purchase");
        if ($("#asset-togole").hasClass("hidden")) {
            $("#asset-togole").removeClass("hidden");
        }
        else {
            $("#asset-togole").addClass("hidden");
        }
        $("#AssetPurchase").addClass('active');
        $("#AssetMenu").addClass("arrow_change");
    }
    else if (pathname == "/assets/assign-asset") {
        window.history.pushState({}, '', "/assets/assign-asset");
        if ($("#asset-togole").hasClass("hidden")) {
            $("#asset-togole").removeClass("hidden");
        }
        else {
            $("#asset-togole").addClass("hidden");
        }
        $("#AssignAsset").addClass('active');
        $("#AssetMenu").addClass("arrow_change");
    }
    else if (pathname == "/product/product-subgroups") {
        window.history.pushState({}, '', "/product/product-subgroups");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".productsubgroups").offset().top
        }, 500);
        $(".productsubgroups").addClass('active');
    }
    else if (pathname == "/products/units") {
        window.history.pushState({}, '', "/products/units");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".unit").offset().top
        }, 500);
        $(".unit").addClass('active');
        $("#ProductMenu").addClass("arrow_change");
    }
    else if (pathname == "/product/rack-stock-update") {
        window.history.pushState({}, '', "/product/rack-stock-update");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".UpdateRackStockDiscount").offset().top
        }, 500);
        $(".UpdateRackStockDiscount").addClass('active');
    }
    else if (pathname == "/productforms") {
        window.history.pushState({}, '', "/productforms");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
    }
    else if (pathname == "/productgenerics") {
        window.history.pushState({}, '', "/productgenerics");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
    }
    else if (pathname == "/products/product-categories") {
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
        //$('.nav-wrapper').animate({
        //    scrollTop: $(".UpdateRackStockDiscount").offset().top
        //}, 500);
        //$(".UpdateRackStockDiscount").addClass('active');
        $("#ProductMenu").addClass("arrow_change");
    }
    else if (pathname == "/productgroups") {
        window.history.pushState({}, '', "/productgroups");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
    }
    else if (pathname == "/manufacturings") {
        window.history.pushState({}, '', "/manufacturings");
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
    }
     //report
    else if (pathname == "/report/sales") {
        window.history.pushState({}, '', "/report/sales");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".salesreport").offset().top
        }, 500);
        $('.salesreport').addClass('active')
        $("#ReportMenu").addClass("arrow_change");
    } else if (pathname == "/report/transfer") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".transreport").offset().top
        }, 500);
        $('.transreport').addClass('active')
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/todays-transaction") {
        window.history.pushState({}, '', "/report/todays-transaction");
            if ($("#report-togole").hasClass("hidden")) {
                $("#report-togole").removeClass("hidden");
            }
            else {
                $("#report-togole").addClass("hidden");
            }
            $('.nav-wrapper').animate({
                scrollTop: $(".todaystransactionreport").offset().top
            }, 500);
        $('.todaystransactionreport').addClass('active')
        $("#ReportMenu").addClass("arrow_change");
    } else if (pathname == "/report/expense") {
        window.history.pushState({}, '', "/report/expense");
            if ($("#report-togole").hasClass("hidden")) {
                $("#report-togole").removeClass("hidden");
            }
            else {
                $("#report-togole").addClass("hidden");
            }
            $('.nav-wrapper').animate({
                scrollTop: $(".expenserp").offset().top
            }, 500);
        $('.expenserp').addClass('active')
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/counterwisesales") {
        window.history.pushState({}, '', "/report/counterwisesales");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".counterwisesalesreport").offset().top
        }, 500);
        $('.counterwisesalesreport').addClass('active')
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/productwisesales") {
        window.history.pushState({}, '', "/report/productwisesales");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".productwisesalesreport").offset().top
        }, 500);
        $('.productwisesalesreport').addClass('active')
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/counter") {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".CounterReport").offset().top
        }, 500);
        $('.CounterReport').addClass('active')
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/stocks") {
        window.history.pushState({}, '', "/report/stocks");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
    } else if (pathname == "/tickets/stats") {
        window.history.pushState({}, '', "/tickets/stats");
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".Stats").offset().top
        }, 500);
        $('.Stats').addClass('active')

    }
    else if (pathname == "/tickets/all-tickets") {
        $('#statusid').val('-1')
        $('#priorityid').val('-1')
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".Ticket").offset().top
        }, 500);
        var isp = getQueryStringValue('ispriority');
        var getp = getQueryStringValue('priority');
        if (isp == 'true' && !isNaN(parseInt(getp))) {
            if ($("#priority-togole").hasClass("hidden")) {
                $("#priority-togole").removeClass("hidden");
                $("#priority-togole").load('/Ticket/PriorityMenu?menuname=' + 'TicketPriority', function () {
                    $('.pr_' + getp).addClass('active')
                })
            }
            else {
                $("#priority-togole").addClass("hidden");
            }
        } else if (isp == 'true' && isNaN(parseInt(getp))){
            if ($("#StatusMenu-togole").hasClass("hidden")) {
                $("#StatusMenu-togole").removeClass("hidden");
                $("#StatusMenu-togole").load('/Ticket/PriorityMenu?menuname=' + 'TicketStatus', function () {
                    $('.pr_' + getp).addClass('active')
                })
            }
            else {
                $("#StatusMenu-togole").addClass("hidden");
            }
        }else {
            $('.Ticket').addClass('active')
        }
    }
    else if (pathname == "/tickets/my-tickets") {
        $('#statusid').val('-1')
        $('#priorityid').val('-1')
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".Ticket").offset().top
        }, 500);
        $('.MyTicket').addClass('active')

    } else if (pathname == "/tickets/request-ticket-time") {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".TicketTimeReq").offset().top
        }, 500);
        $('.TicketTimeReq').addClass('active')

    } else if (pathname == "/tickets/ticket-time-request") {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".TicketTimeReqAdmin").offset().top
        }, 500);
        $('.TicketTimeReqAdmin').addClass('active')

    }
    else if (pathname == "/tickets/ticket-report") {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".Ticket").offset().top
        }, 500);
        $('.Ticket_Report').addClass('active')

    }
    else if (pathname == "/tickets/running-tickets") {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".RunningTicket").offset().top
        }, 500);
        $('.RunningTicket').addClass('active')

    } else if (pathname == "/tickets/non-ticket-users") {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".NonRunningTicket").offset().top
        }, 500);
        $('.NonRunningTicket').addClass('active')

    } else if (pathname == "/ticket-detail") {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".Ticket").offset().top
        }, 500);
        $(".Ticket").addClass('active');
    }
    else if (pathname == "/tickets/closed") {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $('.nav-wrapper').animate({
            scrollTop: $(".Ticket").offset().top
        }, 500);
        $(".ClosedTicket").addClass('active');
    }
    else if (pathname == "/report/profit") {
        window.history.pushState({}, '', "/report/profit");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/settings/settings-menu") {
        window.history.pushState({}, '', "/settings/settings-menu");
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        }
        else {
            $("#setting-togole").addClass("hidden");
        }
        $("#SettingMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/profit-loss") {
        window.history.pushState({}, '', "/report/profit-loss");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/month-to-date") {
        window.history.pushState({}, '', "/report/month-to-date");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/represent-wise-sales") {
        window.history.pushState({}, '', "/report/represent-wise-sales");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/item-wise-sales") {
        window.history.pushState({}, '', "/report/item-wise-sales");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/category-wise-sales") {
        window.history.pushState({}, '', "/report/category-wise-sales");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/on-credit-sales") {
        window.history.pushState({}, '', "/report/on-credit-sales");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }
    else if (pathname == "/report/todays-transaction") {
        window.history.pushState({}, '', "/report/todays-transaction");
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#ReportMenu").addClass("arrow_change");
    }

   
    $('.profile-sec').click(function () {
        //$('#dv-profile').slideToggle();
    });
    $('#ChangePass').click(function () {
        Password.Save();
    });
    $('.imgdash').click(function () {
        window.history.pushState({}, '', "/dashboard");
        $(".common-active").removeClass('active');
        $(".imgdash").addClass('active');
        POSModal.Show();
        $('#main-container-lite').load("/dashboard/index", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        $('#dv-profile').removeClass('show');
        return false;
    });
    $('#dashboard').click(function () {
        window.history.pushState({}, '', "/dashboard");
        $(".common-active").removeClass('active');
        $("#dashboard").addClass('active');
        POSModal.Show();
        $('#main-container-lite').load("/dashboard/index", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        console.log("Hello world!");
        return false;
    });
    $('#dashboard').click(function () {
        window.history.pushState({}, '', "/dashboard");
        $(".common-active").removeClass('active');
        $("#dashboard").addClass('active');
        POSModal.Show();
        $('#main-container-lite').load("/dashboard/index", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        console.log("Hello world!");
        return false;
    });
    $('#attendanceReport').click(function () {
        window.history.pushState({}, '', "/report/daily-attendance");
        $(".common-active").removeClass('active');
        $("#attendanceReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/daily-attendance', function () { POSModal.Hide(); })
        return false;
    });
    $('#settingReport').click(function () {
        window.history.pushState({}, '', "/settings-menu");
        $(".common-active").removeClass('active');
        $("#settingReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/settings-menu', function () { POSModal.Hide(); })
        return false;
    });
    $('#PreModule').click(function () {
        window.history.pushState({}, '', "/pre-module");
        $(".common-active").removeClass('active');
        $("#PreModule").addClass('active');
        POSModal.Show();
        $('#main-container-lite').load('/pre-module', function () { POSModal.Hide(); })
        return false;
    });

    $('#mAttendanceReport').click(function () {
        window.history.pushState({}, '', "/report/monthly-attendance");
        $(".common-active").removeClass('active');
        $("#mAttendanceReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/monthly-attendance', function () { POSModal.Hide(); })
        return false;
    });
    $('#mAttendanceReport').click(function () {
        window.history.pushState({}, '', "/report/monthly-attendance");
        $(".common-active").removeClass('active');
        $("#mAttendanceReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/monthly-attendance', function () { POSModal.Hide(); })
        return false;
    });
    $('#mAttendanceTimeReport').click(function () {
        window.history.pushState({}, '', "/report/monthly-attendance-time");
        $(".common-active").removeClass('active');
        $("#mAttendanceTimeReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/monthly-attendance-time', function () { POSModal.Hide(); })
        return false;
    });
    $('#detattendanceReport').click(function () {
        window.history.pushState({}, '', "/report/detail-attendance");
        $(".common-active").removeClass('active');
        $("#detattendanceReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/detail-attendance', function () { POSModal.Hide(); })
        return false;
    });
    $('#myAttendanceReport').click(function () {
        window.history.pushState({}, '', "/report/my-attendance");
        $(".common-active").removeClass('active');
        $("#myAttendanceReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/my-attendance', function () { POSModal.Hide(); })
        return false;
    });
    $('#salaryReport').click(function () {
        window.history.pushState({}, '', "/report/salary-report");
        $(".common-active").removeClass('active');
        $("#salaryReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/salary-report', function () { POSModal.Hide(); })
        return false;
    });
    $('#bonusReport').click(function () {
        window.history.pushState({}, '', "/report/bonus-report");
        $(".common-active").removeClass('active');
        $("#bonusReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/bonus-report', function () { POSModal.Hide(); })
        return false;
    });

    $('#uppcomingBirthdayReport').click(function () {
        window.history.pushState({}, '', "/report/upcoming-birthday-report");
        $(".common-active").removeClass('active');
        $("#uppcomingBirthdayReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/upcoming-birthday-report', function () { POSModal.Hide(); })
        return false;
    });
    $('#anniversaryDate').click(function () {
        window.history.pushState({}, '', "/report/anniversary-report");
        $(".common-active").removeClass('active');
        $("#anniversaryDate").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/anniversary-report', function () { POSModal.Hide(); })
        return false;
    });
    $('#uppcomingEvaluationReport').click(function () {
        window.history.pushState({}, '', "/report/upcoming-evaluation-report");
        $(".common-active").removeClass('active');
        $("#uppcomingEvaluationReport").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load('/report/upcoming-evaluation-report', function () { POSModal.Hide(); })
        return false;
    }); 
    $('#RunningTicket').click(function () {
        window.history.pushState({}, '', "/tickets/running-tickets");
        $(".common-active").removeClass('active');
        $("#RunningTicket").addClass('active');
        $("#RunningTicket").addClass('mytcket');
        ResetTiket()
         POSModal.Show();;
        $('#main-container-lite').load("/tickets/running-tickets", function () { POSModal.Hide(); });
        return false;
    });
    $('#ClosedTicket').click(function () {
        window.history.pushState({}, '', "/tickets/closed");
        $(".common-active").removeClass('active');
        $("#ClosedTicket").addClass('active');
        ResetTiket()
         POSModal.Show();;
        $('#main-container-lite').load("/tickets/closed", function () {
            $('#statusid').val('Closed');
            $('#priorityid').val('-1');
            POSModal.Hide();
        });
        return false;
    });
    $('#EmployeeTC').click(function () {
        window.history.pushState({}, '', "/hrd/team");
        $(".common-active").removeClass('active');
        $("#EmployeeTC").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/hrd/team", function () { POSModal.Hide(); });
        return false;
    });
    $('#EmployeeColl').click(function () {
        window.history.pushState({}, '', "/hrd/colleagues");
        $(".common-active").removeClass('active');
        $("#EmployeeColl").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/hrd/colleagues", function () { POSModal.Hide(); });
        return false;
    });
    $('#break').click(function () {
        window.history.pushState({}, '', "/hrd/break");
        $(".common-active").removeClass('active');
        $("#break").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/hrd/break", function () { POSModal.Hide(); });
        return false;
    });
    $('#EmployeeEarnLeave').click(function () {
        window.history.pushState({}, '', "/hrd/employee-earn-leave");
        $(".common-active").removeClass('active');
        $("#EmployeeEarnLeave").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/hrd/employee-earn-leave", function () { POSModal.Hide(); });
        return false;
    });
    $('#DailyAttendance').click(function () {
        window.history.pushState({}, '', "/hrd/daily-attendance");
        $(".common-active").removeClass('active');
        $("#DailyAttendance").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/hrd/daily-attendance", function () { POSModal.Hide(); });
        return false;
    });
    $('#AttendanceAdjustment').click(function () {
        window.history.pushState({}, '', "/hrd/attendance-adjustment");
        $(".common-active").removeClass('active');
        $("#AttendanceAdjustment").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/hrd/attendance-adjustment", function () { POSModal.Hide(); });
        return false;
    });
    $('#DailyWorkLog').click(function () {
        window.history.pushState({}, '', "/hrd/daily-work-log");
        $(".common-active").removeClass('active');
        $("#DailyWorkLog").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/hrd/daily-work-log", function () { POSModal.Hide(); });
        return false;
    });
    $('#HrManager').click(function () {
        window.history.pushState({}, '', "/settings/hr-manager");
        $(".common-active").removeClass('active');
        $("#HrManager").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/settings/hr-manager", function () { POSModal.Hide(); });
        return false;
    });
    $('#GovtHolyday').click(function () {
        window.history.pushState({}, '', "/settings/govt-holyday");
        $(".common-active").removeClass('active');
        $("#GovtHolyday").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/settings/govt-holyday", function () { POSModal.Hide(); });
        return false;
    });
    $('#EmployeeTransfer').click(function () {
        window.history.pushState({}, '', "/employee-transfer");
        $(".common-active").removeClass('active');
        $("#EmployeeTransfer").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/employee-transfer", function () { POSModal.Hide(); });
        return false;
    });
    $('#EmployeeTransferReqest').click(function () {
        window.history.pushState({}, '', "/employee-transfer-req");
        $(".common-active").removeClass('active');
        $("#EmployeeTransferReqest").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/employee-transfer-req", function () { POSModal.Hide(); });
        return false;
    });
    $('#break').click(function () {
        window.history.pushState({}, '', "/hrd/break");
        $(".common-active").removeClass('active');
        $("#break").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/hrd/break", function () { POSModal.Hide(); });
        return false;
    });
    $('#EmpBranch').click(function () {
        window.history.pushState({}, '', "/settings/branch");
        $(".common-active").removeClass('active');
        $("#EmpBranch").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/settings/branch", function () { POSModal.Hide(); });
        return false;
    });
    $('#leavetype').click(function () {
        window.history.pushState({}, '', "/settings/leave-type");
        $(".common-active").removeClass('active');
        $("#leavetype").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/settings/leave-type", function () { POSModal.Hide(); });
        return false;
    });
    $('#leavesetup').click(function () {
        window.history.pushState({}, '', "/settings/leave-setup");
        $(".common-active").removeClass('active');
        $("#leavesetup").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/settings/leave-setup", function () { POSModal.Hide(); });
        return false;
    });
    $('#CalenderYear').click(function () {
        window.history.pushState({}, '', "/settings/calender-year");
        $(".common-active").removeClass('active');
        $("#CalenderYear").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/settings/calender-year", function () { POSModal.Hide(); });
        return false;
    });
    /*$('#NewPOSSales').click(function () {
        window.history.pushState({}, '', "/inventory/new-sale");
        $(".common-active").removeClass('active');
        //$(".NewSales").addClass('active');
         POSModal.Show();
        $('#main-container-lite').load("/inventory/new-sale", function () { POSModal.Hide(); });
        return false;
    });*/
    $('.NewPOSSales').click(function () {
        window.history.pushState({}, '', "/new-pos-sales");
        $(".common-active").removeClass('active');
        $(".NewPOSSales").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/new-pos-sales", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        /*$('.NewPOSSales').click()*/
        return false;
    });
    $('.WholeSales').click(function () {
        window.history.pushState({}, '', "/sales/whole-sale");
        $(".common-active").removeClass('active');
        $(".WholeSales").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/sales/whole-sale", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        /*$('.NewPOSSales').click()*/
        return false;
    });
    $('.MakeQuatation').click(function () {
        window.history.pushState({}, '', "/make-quotation");
        $(".common-active").removeClass('active');
        $(".MakeQuatation").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/make-quotation", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        /*$('.NewPOSSales').click()*/
        return false;
    });
    $('.expense').click(function () {
        window.history.pushState({}, '', "/expenses");
        $(".common-active").removeClass('active');
        $(".expense").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/expenses", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        /*$('.NewPOSSales').click()*/
        return false;
    });
    $('.LeaveApp').click(function () {
        window.history.pushState({}, '', "/hrd/leave-management");
        $(".common-active").removeClass('active');
        $(".LeaveApp").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/hrd/leave-management", function () { POSModal.Hide(); });
        return false;
    });
    $('.Mealmanagement').click(function () {
        window.history.pushState({}, '', "/hrd/meal-management");
        $(".common-active").removeClass('active');
        $(".Mealmanagement").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/hrd/meal-management", function () { POSModal.Hide(); });
        return false;
    });
    $('.Purchase').click(function () {
        window.history.pushState({}, '', "/inventory/procurement/purchase-history");
        $(".common-active").removeClass('active');
        $(".Purchase").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/inventory/procurement/purchase-history", function () { POSModal.Hide(); });
        return false;
    });
    $('.stockmenu').click(function () {
        window.history.pushState({}, '', "/inventory/stock");
        $(".common-active").removeClass('active');
        $(".stockmenu").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/inventory/stock", function () { POSModal.Hide(); });
        return false;
    });
    $('.lowstockmenu').click(function () {
        window.history.pushState({}, '', "/inventory/low-stock");
        $(".common-active").removeClass('active');
        $(".lowstockmenu").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/inventory/low-stock", function () { POSModal.Hide(); });
        return false;
    });
    $('.productsubgroups').click(function () {
        window.history.pushState({}, '', "/product/product-subgroups");
        $(".common-active").removeClass('active');
        $(".productsubgroups").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/product/product-subgroups", function () { POSModal.Hide(); });
        return false;
    });
    $('.ManageCompany').click(function () {
        $(".common-active").removeClass('active');
        $(".ManageCompany").addClass('active');
        OpenTopToBottomModal('/manage-company');
        return false;
    });
    $('.AssignUser').click(function () {
        $(".common-active").removeClass('active');
        $(".AssignUser").addClass('active');
        OpenRightToLeftModal('/assign-company');
        return false;
    });
    $('.ChangeCompany').click(function () {
        //window.history.pushState({}, '', "/list-company-change");
        $(".common-active").removeClass('active');
        $(".ChangeCompany").addClass('active');
        OpenRightToLeftModal('/list-company-change');
        return false;
    });
    $('.unit').click(function () {
        window.history.pushState({}, '', "/products/units");
        $(".common-active").removeClass('active');
        $(".unit").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/products/units", function () { POSModal.Hide(); });
        return false;
    });
    $('.UpdateRackStockDiscount').click(function () {
        window.history.pushState({}, '', "/product/rack-stock-update");
        $(".common-active").removeClass('active');
        $(".UpdateRackStockDiscount").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/product/rack-stock-update", function () { POSModal.Hide(); });
        return false;
    });
    $('.productsubgroups').click(function () {
        window.history.pushState({}, '', "/product/product-subgroups");
        $(".common-active").removeClass('active');
        $(".productsubgroups").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/product/product-subgroups", function () { POSModal.Hide(); });
        return false;
    });
    //$('#customers').click(function () {
    //    window.history.pushState({}, '', "/customers");
    //    $(".common-active").removeClass('active');
    //    $("#customers").addClass('active');
    //     POSModal.Show();;
    //    $('#main-container-lite').load("/customers");
    //    return false;
    //});
    $('#CustomerCRM').click(function () {
        window.history.pushState({}, '', "/customer");
        $(".common-active").removeClass('active');
        $("#CustomerCRM").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/customer", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        return false;
    });
    $('#VendorId').click(function () {
        window.history.pushState({}, '', "/vendor");
        $(".common-active").removeClass('active');
        $("#VendorId").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/vendor", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        return false;
    });
    $('#Lead').click(function () {
        window.history.pushState({}, '', "/lead");
        $(".common-active").removeClass('active');
        $("#Lead").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/lead", function () { POSModal.Hide(); });
        return false;
    });
    $('#sales').click(function () {
        window.history.pushState({}, '', "/sales");
        $(".common-active").removeClass('active');
        $("#sales").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/sales", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        return false;
    });
    $('#quotationlist').click(function () {
        window.history.pushState({}, '', "/quotation-list");
        $(".common-active").removeClass('active');
        $("#quotationlist").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/quotation-list", function () { POSModal.Hide(); });
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        return false;
    });
    $('#employee').click(function () {
        window.history.pushState({}, '', "/employee");
        $(".common-active").removeClass('active');
        $("#employee").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/employee", function () { POSModal.Hide(); });
      
        return false;
    });
    $('#requestemployee').click(function () {
        window.history.pushState({}, '', "/Request-profile");
        $(".common-active").removeClass('active');
        $("#Request-profile").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/Request-profile", function () { POSModal.Hide(); });
      
        return false;
    });
    $('#product').click(function () {
        window.history.pushState({}, '', "/products/product-list");
        $(".common-active").removeClass('active');
        $("#product").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/products/product-list", function () { POSModal.Hide(); });
        return false;
    });
    $('#AssetList').click(function () {
        window.history.pushState({}, '', "/assets/asset-list");
        $(".common-active").removeClass('active');
        $("#AssetList").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/assets/asset-list", function () { POSModal.Hide(); });
        return false;
    });
    $('#AssetPurchase').click(function () {
        window.history.pushState({}, '', "/assets/asset-purchase");
        $(".common-active").removeClass('active');
        $("#AssetPurchase").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/assets/asset-purchase", function () { POSModal.Hide(); });
        return false;
    });
    $('#AssignAsset').click(function () {
        window.history.pushState({}, '', "/assets/assign-asset");
        $(".common-active").removeClass('active');
        $("#AssignAsset").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/assets/assign-asset", function () { POSModal.Hide(); });
        return false;
    });
    $('#CompanyAsset').click(function () {
        window.history.pushState({}, '', "/assets/company-asset");
        $(".common-active").removeClass('active');
        $("#CompanyAsset").addClass('active');
        POSModal.Show();;
        $('#main-container-lite').load("/assets/company-asset", function () { POSModal.Hide(); });
        return false;
    });
    $('#Productforms').click(function () {
        window.history.pushState({}, '', "/productforms");
        $(".common-active").removeClass('active');
        $("#Productforms").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/productforms", function () { POSModal.Hide(); });
        return false;
    });
    $('#Productgenerics').click(function () {
        window.history.pushState({}, '', "/productgenerics");
        $(".common-active").removeClass('active');
        $("#Productgenerics").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/productgenerics", function () { POSModal.Hide(); });
        return false;
    });
    $('#Productcategories').click(function () {
        window.history.pushState({}, '', "/products/product-categories");
        $(".common-active").removeClass('active');
        $("#Productcategories").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/products/product-categories", function () { POSModal.Hide(); });
        return false;
    });
    $('#DamageStock').click(function () {
        window.history.pushState({}, '', "/Damage-stocks");
        $(".common-active").removeClass('active');
        $("#DamageStock").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/Damage-stocks", function () { POSModal.Hide(); });
        return false;
    });
    $('#Returns').click(function () {
        window.history.pushState({}, '', "/returns");
        $(".common-active").removeClass('active');
        $("#Returns").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/returns", function () { POSModal.Hide(); });
        return false;
    });
    $('#Productgroups').click(function () {
        window.history.pushState({}, '', "/productgroups");
        $(".common-active").removeClass('active');
        $("#Productgroups").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/productgroups", function () { POSModal.Hide(); });
        return false;
    });
    $('#manufacturings').click(function () {
        window.history.pushState({}, '', "/manufacturings");
        $(".common-active").removeClass('active');
        $("#manufacturings").addClass('active');
        $('#main-container-lite').load("/manufacturings");
        return false;
    });
    $('#settingsmenu').click(function () {
        window.history.pushState({}, '', "/settings-menu");
        $(".common-active").removeClass('active');
        $("#settingsmenu").addClass('active');
        $('#main-container-lite').load("/settings-menu");
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        return false;
    });
    
    $(".toggle-sidebar").click(function () {
        if ($(".main-sidebar").hasClass("open")) {
            $(".main-sidebar").removeClass("open")
        }
        else {
            $(".main-sidebar").addClass("open");
        }
    });
    $("#accountmenu").click(function () {
        $(".common_ul").addClass("hidden")
        if ($("#account-togole").hasClass("hidden")) {
            $("#account-togole").removeClass("hidden");
        }
        else {
            $("#account-togole").addClass("hidden");
        }
    });
  
  
    //$(".submenu_style li li a").click(function () {
    //    $(".submenu_style li li").removeClass("arrow_change");
    //    if ($(this).parent().parent().parent().find("ul").length > 0) {
    //        $(this).parent().parent().parent().addClass("arrow_change");
    //    }
    //});
    //$(".submenu_style li a").click(function () {
       
    //    $(this).toggleClass("arrow_change");
    //});
    //$(".submenu_style .ml-3 li a").click(function () {
    //    $(".submenu_style .ml-3 li a").removeClass("arrow_change");
    //    $(this).addClass("arrow_change");
    //    $(this).parent().parent().parent().addClass("arrow_change");
    //});
    //$(".common-active").click(function () {
    //    $(".common-active").removeClass("arrow_change");
    //    $(this).addClass("arrow_change");
    //});
    //$(".common-active .common-active").click(function () {
    //    $(".common-active").addClass("arrow_change");
    //    $(".common-active .common-active").removeClass("arrow_change");
    //    $(this).addClass("arrow_change");
    //});

    $("#inventorytmenu").click(function () {
        $(".common_ul").addClass("hidden");
        if ($("#inventory-togole").hasClass("hidden")) {
            $("#inventory-togole").removeClass("hidden");
        }
        else {
            $("#inventory-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        $("#asset-togole").addClass("hidden");
    });
    $("#ProcurementMenu").click(function () {
        $(".common_ul").addClass("hidden")
        if ($("#procurement-togole").hasClass("hidden")) {
            $("#procurement-togole").removeClass("hidden");
        }
        else {
            $("#procurement-togole").addClass("hidden");
        }
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
    });
  
    $("#ProductMenu").click(function () {
        if ($("#product-togole").hasClass("hidden")) {
            $("#product-togole").removeClass("hidden");
        }
        else {
            $("#product-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        $("#asset-togole").addClass("hidden");
    });
    $("#AssetMenu").click(function () {
        if ($("#asset-togole").hasClass("hidden")) {
            $("#asset-togole").removeClass("hidden");
        }
        else {
            $("#asset-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#sub-togole").addClass("hidden");
    });
    $("#ReportMenu").click(function () {
        if ($("#report-togole").hasClass("hidden")) {
            $("#report-togole").removeClass("hidden");
        }
        else {
            $("#report-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        $("#setting-togole").addClass("hidden");
        $("#project-togole").addClass("hidden");
        $("#asset-togole").addClass("hidden");
    });
    $("#SettingMenu").click(function () {
        if ($("#setting-togole").hasClass("hidden")) {
            $("#setting-togole").removeClass("hidden");
        }
        else {
            $("#setting-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
        $("#project-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#asset-togole").addClass("hidden");
    });
    $('#salesreport').click(function () {
        window.history.pushState({}, '', "/report/sales");
        $(".common-active").removeClass('active');
        $("#salesreport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/sales", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#TodaysTransactionReport').click(function () {
        window.history.pushState({}, '', "/report/todays-transaction");
        $(".common-active").removeClass('active');
        $("#TodaysTransactionReport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/todays-transaction", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#CounterWiseSalesReport').click(function () {
        window.history.pushState({}, '', "/report/counterwisesales");
        $(".common-active").removeClass('active');
        $("#CounterWiseSalesReport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/counterwisesales", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#ProductWiseSalesReport').click(function () {
        window.history.pushState({}, '', "/report/productwisesales");
        $(".common-active").removeClass('active');
        $("#ProductWiseSalesReport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/productwisesales", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#stockreport').click(function () {
        window.history.pushState({}, '', "/report/stocks");
        $(".common-active").removeClass('active');
        $("#stockreport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/stocks", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#CounterReport').click(function () {
        window.history.pushState({}, '', "/report/counter");
        $(".common-active").removeClass('active');
        $("#CounterReport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/counter", function () { POSModal.Hide(); });
        return false;
    });
    $('#profitreport').click(function () {
        window.history.pushState({}, '', "/report/profit");
        $(".common-active").removeClass('active');
        $("#profitreport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/profit", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#profitrlosseport').click(function () {
        window.history.pushState({}, '', "/report/profit-loss");
        $(".common-active").removeClass('active');
        $("#profitrlosseport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/profit-loss", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#salesregisterreport').click(function () {
        window.history.pushState({}, '', "/reports/sales-register-report");
        $(".common-active").removeClass('active');
        $("#salesregisterreport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/reports/sales-register-report", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
    $('#mounthtodatereport').click(function () {
        window.history.pushState({}, '', "/report/month-to-date");
        $(".common-active").removeClass('active');
        $("#mounthtodatereport").addClass('active');
         POSModal.Show();;
        $('#main-container-lite').load("/report/month-to-date", function () { POSModal.Hide(); });
        if (!$("#sub-togole").hasClass("hidden")) {
            $("#sub-togole").addClass("hidden");
        }
        return false;
    });
  
    $("#stockmenu").click(function () {
        if ($("#stock-togole").hasClass("hidden")) {
            $("#stock-togole").removeClass("hidden");
        }
        else {
            $("#stock-togole").addClass("hidden");
        }
    }); $("#rtmenu").click(function () {
        if ($("#rtmenu-togole").hasClass("hidden")) {
            $("#rtmenu-togole").removeClass("hidden");
        }
        else {
            $("#rtmenu-togole").addClass("hidden");
        }
    });
    $("#lowstockmenu").click(function () {
        if ($("#lowstock-togole").hasClass("hidden")) {
            $("#lowstock-togole").removeClass("hidden");
        }
        else {
            $("#lowstock-togole").addClass("hidden");
        }
    });
    $("#salesmenu").click(function () {
        if ($("#sales-togole").hasClass("hidden")) {
            $("#sales-togole").removeClass("hidden");
        }
        else {
            $("#sales-togole").addClass("hidden");
        }
    });
    $("#projectmenu").click(function () {
        if ($("#project-togole").hasClass("hidden")) {
            $("#project-togole").removeClass("hidden");
        }
        else {
            $("#project-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
    });
    $("#ticketmenu").click(function () {
        if ($("#ticket-togole").hasClass("hidden")) {
            $("#ticket-togole").removeClass("hidden");
        }
        else {
            $("#ticket-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#hrdmenu-togole").addClass("hidden");
    });
    //$("#SettingMenu").click(function () {
    //    if ($("#setting-togole").hasClass("hidden")) {
    //        $("#setting-togole").removeClass("hidden");
    //    }
    //    else {
    //        $("#setting-togole").addClass("hidden");
    //    }
    //    $("#procurement-togole").addClass("hidden");
    //    $("#inventory-togole").addClass("hidden");
    //    $("#product-togole").addClass("hidden");
    //    $("#ticket-togole").addClass("hidden");
    //    $("#report-togole").addClass("hidden");
    //    $("#hrdmenu-togole").addClass("hidden");
    //    $("#project-togole").addClass("hidden");
    //});
    $("#hrdmenu").click(function () {
        if ($("#hrdmenu-togole").hasClass("hidden")) {
            $("#hrdmenu-togole").removeClass("hidden");
        }
        else {
            $("#hrdmenu-togole").addClass("hidden");
        }
        $("#procurement-togole").addClass("hidden");
        $("#inventory-togole").addClass("hidden");
        $("#product-togole").addClass("hidden");
        $("#ticket-togole").addClass("hidden");
        $("#report-togole").addClass("hidden");
        $("#setting-togole").addClass("hidden");
        $("#project-togole").addClass("hidden");
        $("#asset-togole").addClass("hidden");
    });
    $("#asstesMenu").click(function () {
        if ($("#asstesMenu-togole").hasClass("hidden")) {
            $("#asstesMenu-togole").removeClass("hidden");
        }
        else {
            $("#asstesMenu-togole").addClass("hidden");
        }
    });
    $("#PriorityMenu").click(function () {
        if ($("#priority-togole").hasClass("hidden")) {
            $("#priority-togole").removeClass("hidden");
            $("#priority-togole").load('/Ticket/PriorityMenu?menuname=' + 'TicketPriority')
        }
        else {
            $("#priority-togole").addClass("hidden");
        }
    });
    $("#StatusMenu").click(function () {
        if ($("#StatusMenu-togole").hasClass("hidden")) {
            $("#StatusMenu-togole").removeClass("hidden");
            $("#StatusMenu-togole").load('/Ticket/PriorityMenu?menuname=' + 'TicketStatus')
        }
        else {
            $("#StatusMenu-togole").addClass("hidden");
        }
    });
});
//session check code
var SessionIsActive = true;
var SessionCheckerTimeOut = (1000 * 60);
var SessionChecker = function () {
    setTimeout(function () {
        SessionChecker();
    }, SessionCheckerTimeOut);
    if (SessionIsActive) {
        $.ajax({
            type: "post",
            url: "/Login/SessionChecker",
            success: function (data) {
                if (data.result == false) {
                    SessionIsActive = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Session Expired! Please reload page!',
                        footer: data.message
                    })
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                SessionIsActive = false;
                console.log(errorThrown)
            }
        });
    }
}
SessionChecker();


var wcppPingTimeout_ms = 60000; //60 sec
var wcppPingTimeoutStep_ms = 500; //0.5 sec

function wcppDetectOnSuccess() {
    // WCPP utility is installed at the client side
    // redirect to WebClientPrint sample page

    // get WCPP version
    var wcppVer = arguments[0];
    if (wcppVer.substring(0, 1) == "6")
        window.location.href = '@Url.Action("Index", "PrintESCPOS")';
    else //force to install WCPP v6.0
        wcppDetectOnFailure();
}

function wcppDetectOnFailure() {
    // It seems WCPP is not installed at the client side
    // ask the user to install it
    $('#msgInProgress').hide();
    $('#msgInstallWCPP').show();
}