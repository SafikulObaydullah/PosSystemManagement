var SaveHRprofile = function () {

    console.log("SaveHRprofile");
    var currentDate = new Date();
    var joiningDate = $("#JoiningDate").val();
    var resignationDate = $("#ResignationDate").val();
    POSModal.Show();
    var param = {
        Id: $("#LocHrId").val(),
        EmployeeIdCardNo: $('#EmployeeIdCardNo').val(),
        RFID: $('#RFID').val(),
        Department: $("#Department").val(),
        EmployeeType: $("#EmployeeType").val(),
        JoiningDate: $("#JoiningDate").val(),
        ResignationDate = $("#ResignationDate").val(),
        ShiftId: $("#ShiftId").val(),
        Designation: $("#Designation").val(),
        EmployeeStatus: $("#EmployeeStatus").val(),
        PreviousWorkplace: $("#PreviousWorkplace").val(),
        CurrentWorkstation: $("#CurrentWorkstation").val(),
        LineManagerId: $("#LineManagerName").val(),
        SupervisorId: $("#SupervisorName").val(),
        Status: $("#Status").val(),
        //JoiningDate: $("#JoiningDate").val(),
        //ServiceLengthSinceJoin: $("#ServiceLengthSinceJoin").val(),

    }; debugger;
    var url = "/Employee/SaveHRprofile";
    console.log(param);
    $.ajax({
        type: 'post',
        url: url,
        data: param,
        success: function (data) {
            POSModal.Hide();
            if (data) {
                OpenSuccessMessageNew("Success!", 'Saved')
            } else {
                OpenErrorMessageNew("Failed!", 'Failed!!!')
            }
        },
        error: function (request, error) {
            POSModal.Hide();
            console.log("Server Error")
        }
    });
}
var HRevaluationDate = function (joiningDate, currentDate) {
    var joinDateParts = joiningDate.split('-');
    var joinMonth = parseInt(joinDateParts[0]) - 1;
    var joinDay = parseInt(joinDateParts[1]);
    var joinYear = parseInt(joinDateParts[2]);

    var joinDate = new Date(joinYear, joinMonth, joinDay);
    var timeDiff = Math.abs(currentDate.getTime() - joinDate.getTime());
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
};
var DurationOfServiceConfirm = function (durationServiceConfirmDate, currentDate) {
    var confirmDateParts = durationServiceConfirmDate.split('-');
    var confirmMonth = parseInt(confirmDateParts[0]) - 1;
    var confirmDay = parseInt(confirmDateParts[1]);
    var confirmYear = parseInt(confirmDateParts[2]);

    var confirmDate = new Date(confirmYear, confirmMonth, confirmDay);
    var timeDiff = Math.abs(currentDate.getTime() - confirmDate.getTime());
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
};
var DurationOfLastPromotion = function (lastPromotionDate, currentDate) {
    var confirmDateParts = lastPromotionDate.split('-');
    var confirmMonth = parseInt(confirmDateParts[0]) - 1;
    var confirmDay = parseInt(confirmDateParts[1]);
    var confirmYear = parseInt(confirmDateParts[2]);

    var confirmDate = new Date(confirmYear, confirmMonth, confirmDay);
    var timeDiff = Math.abs(currentDate.getTime() - confirmDate.getTime());
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
};

var SaveEmergencyContact = function () {
    if (CommonUiValidation()) {
        POSModal.Show()
        $.ajax({
            url: '/Mgmt/SaveEmcontacts',
            type: 'post',
            data: {
                /*Id: $("#htId").val(),*/
                UserId: $('#EmployeeId').val(),
                FirstNames: $('#FirstNames').val(),
                LastNames: $('#LastNames').val(),
                Relationship: $('#Relationship').val(),
                MobileNumber: $('#MobileNumber').val(),
                PhoneType: $('#PhoneType').val()
            },
            success: function () {
                LoadHRTab()
                OpenSuccessMessageNew('Success', 'Saved!!')
                $("#site_preloader").hide();
            }
        })

    }
}
$(document).ready(function () {

    $("#add_emg_btn").click(function () {
        $(".add_emg_con_block").show(500);
    });
    $("#emg_con_close").click(function () {
        $(".add_emg_con_block").hide(500);
    });
        //$("#JoiningDate").on("change", function () {
        //    var joiningDate = $(this).val();
        //    var currentDate = new Date();

        //});
        //$("#ResignationDate").on("change", function () {
        //    var ResignationDate = $(this).val();
        //    var currentDate = new Date();

        // Calculate the service length since join
        //var serviceLengthSinceJoin = HRevaluationDate(joiningDate, currentDate);
        //$("#ServiceLengthSinceJoin").val(serviceLengthSinceJoin);

        //// Calculate the six month completion date
        //var sixMonthCompletionDate = new Date(joiningDate);
        //sixMonthCompletionDate.setMonth(sixMonthCompletionDate.getMonth() + 6); // sixMonthCompletionDate.setDate(sixMonthCompletionDate.getDate() + (6 * 30)); by count 30 days as a month.
        //var sixMonthCompletionDateString = (sixMonthCompletionDate.getMonth() + 1) + "-" + sixMonthCompletionDate.getDate() + "-" + sixMonthCompletionDate.getFullYear();
        //$("#SixMounthCompletionDate").val(sixMonthCompletionDateString);

        //var oneYearCompletionDate = new Date(joiningDate);
        //oneYearCompletionDate.setMonth(oneYearCompletionDate.getDate() + 365);
        //var oneYearCompletionDateString = (oneYearCompletionDate.getMonth()) + "-" + (oneYearCompletionDate.getDate() + 1) + "-" + oneYearCompletionDate.getFullYear();
        //$("#OneYearCompletionDate").val(oneYearCompletionDateString);

        //// Calculate the 1 year completion date
        //var oneYearCompletionDate = new Date(joiningDate);
        //oneYearCompletionDate.setFullYear(oneYearCompletionDate.getFullYear() + 1);
        //var formattedOneYearCompletionDate = formatDate(oneYearCompletionDate);
        //$("#OneYearCompletionDate").val(formattedOneYearCompletionDate);

        //// Calculate the 5 year completion date
        //var fiveYearCompletionDate = new Date(joiningDate);
        //fiveYearCompletionDate.setFullYear(fiveYearCompletionDate.getFullYear() + 5);
        //var formattedFiveYearCompletionDate = formatDate(fiveYearCompletionDate);
        //$("#FiveYearCompletionDate").val(formattedFiveYearCompletionDate);

        //// Calculate the 10 year completion date
        //var tenYearCompletionDate = new Date(joiningDate);
        //tenYearCompletionDate.setFullYear(tenYearCompletionDate.getFullYear() + 10);
        //var formattedTenYearCompletionDate = formatDate(tenYearCompletionDate);
        //$("#TenYearCompletionDate").val(formattedTenYearCompletionDate);

        //// Calculate the 15 year completion date
        //var fifteenYearCompletionDate = new Date(joiningDate);
        //fifteenYearCompletionDate.setFullYear(fifteenYearCompletionDate.getFullYear() + 15);
        //var formattedFifteenYearCompletionDate = formatDate(fifteenYearCompletionDate);
        //$("#FifteenYearCompletionDate").val(formattedFifteenYearCompletionDate);
    //});
    function formatDate(date) {
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        var year = date.getFullYear();
        return month + "-" + day + "-" + year;
    }
    $("#DurationServiceConfirmDate").on("change", function () {
        var durationServiceConfirmDate = $(this).val();
        var currentDate = new Date();
        var durationServiceConfirm = DurationOfServiceConfirm(durationServiceConfirmDate, currentDate);
        $("#DurationServiceConfirm").val(durationServiceConfirm);
    });
    $("#LastPromotionDate").on("change", function () {
        var lastPromotionDate = $(this).val();
        var currentDate = new Date();
        var durationFromLastPromotion = DurationOfLastPromotion(lastPromotionDate, currentDate);
        $("#DurationFromLastPromotion").val(durationFromLastPromotion);
    });

    $(".calendar-pi").click(function (er) {
        var itemsselected = $(er.target).parent().parent().parent();
        var inputselected = $(itemsselected).find('.calendar-pt');
        $(inputselected).trigger('click');
    });

    /*})*/
    Birthday = new Pikaday({
        field: document.getElementById('Birthday'),
        format: 'MM-DD-YYYY',
        trigger: $('#Birthday')[0], firstDay: 1
    });

    //JoiningDate = new Pikaday({
    //    field: document.getElementById('JoiningDate'),
    //    format: 'MM-DD-YYYY',
    //    trigger: $('#JoiningDate')[0], firstDay: 1
    //});
    JoiningDate = new Pikaday({
        field: document.getElementById('JoiningDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#JoiningDate')[0], firstDay: 1
    }); 

    ResignationDate = new Pikaday({
        field: document.getElementById('ResignationDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#ResignationDate')[0] //, firstDay: 1
    }); 
});