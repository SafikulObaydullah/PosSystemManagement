var StartDate;
var dateseteneed = false;
$(document).ready(function () {

    $('#btnSaveGovtHolyday').click(function (ev) {
        SaveGovtHolyday();
    });
    console.log('start date');
    if ($('#StartDate').val() == '' || $('#StartDate').val() == '1/1/0001 12:00:00 AM') {
        dateseteneed = true;
    }
    StartDate = new Pikaday({
        field: document.getElementById('StartDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#StartDate')[0],
        firstDay: 1
    });
    if (dateseteneed == true) {
        StartDate.setDate(new Date());
    }
    dateseteneed = false;
});

var SaveGovtHolyday = function () {
    if (CommonUiValidation()) {
        POSModal.Show()
        $.ajax({
            url: '/Mgmt/SaveGovtHolyday',
            type: 'post',
            data: {
                Id: $("#Id").val(),
                YearId: $("#YearId").val(),
                Title: $('#Title').val(),
                StartDate: $('#StartDate').val(),
            },
            success: function () {
                CloseRightToLeftModal()
                GovtHolydayList.SearchLoan()
                OpenSuccessMessageNew('Success', 'Saved!!')
            }
        })
        POSModal.Hide()
    }
}