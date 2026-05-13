var StartDate;
var EndDate;
var dateseteneed = false;
$(document).ready(function () {

    $('#btnadjustAtt').click(function (ev) {
        SaveAdjustAtten();
    });
    $(".calendar-pi").click(function (er) {
        console.log("old");
        var itemsselected = $(er.target).parent().parent().parent();
        var inputselected = $(itemsselected).find('.calendar-pt');
        $(inputselected).trigger('click');
    });
  
    console.log('start date');
    if ($('#ClockInTime').val() == '' || $('#ClockInTime').val() == '1/1/0001 12:00:00 AM') {
        dateseteneed = true;
    }
    ClockInTime = new Pikaday({
        field: document.getElementById('ClockInTime'),
        format: 'MM-DD-YYYY',
        trigger: $('#ClockInTime')[0],
        firstDay: 1
    });
    if (dateseteneed == true) {
        ClockInTime.setDate(new Date());
    }
    dateseteneed = false;
});

var SaveAdjustAtten = function () {
    if (CommonUiValidation()) {
        POSModal.Show()
        $.ajax({
            url: '/Employee/SaveAdjustAtten',
            type: 'post',
            data: {
                Id: $("#Id").val(),
                ClockInTime: $('#ClockInTime').val() + ' ' + $('#ClockInTimeOnly').val(),
                UserId: $('#UserId').val(),
                ClockType: $('#ClockType').val(),
            },
            success: function () {
                CloseRightToLeftModal()
                OpenSuccessMessageNew('Success', 'Saved!!');
                DailyAttReport.SearchKeyUp(1);
            }
        })
        POSModal.Hide()
    }
}