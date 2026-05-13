var SaveLeaveBalanceEarned = function () {
    if (CommonUiValidation()) {
        POSModal.Show()
        $.ajax({
            url: '/Employee/SaveLeaveBalanceEarned',
            type: 'post',
            data: {
                Id: $("#Id").val(),
                UserId: $('#UserId').val(),
                YearId: $('#YearId').val(),
                LeaveTypeId: $('#LeaveTypeId').val(),
                LeaveChange: $('#LeaveChange').val(),
                Note: $('#Note').val(),
            },
            success: function () {
                CloseRightToLeftModal();
                LeaveMgmtGrid.Reset();
                OpenSuccessMessageNew('Success', 'Saved!!')
                
            }
        })
        POSModal.Hide()
    }
}

var SaveLeaveBalanceUsed = function () {
    if (CommonUiValidation()) {
        POSModal.Show()
        $.ajax({
            url: '/Employee/SaveLeaveBalanceUsed',
            type: 'post',
            data: {
                Id: $("#Id").val(),
                UserId: $('#UserId').val(),
                YearId: $('#YearId').val(),
                LeaveTypeId: $('#LeaveTypeId').val(),
               // LeaveChange: $('#LeaveChange').val(),
                Note: $('#Note').val(),
                FromDate: $('#ReviewFilterStartDate').val(),
                ToDate: $('#ReviewFilterEndDate').val(),
            },
            success: function () {
                CloseRightToLeftModal();
                LeaveMgmtGrid.Reset();
                OpenSuccessMessageNew('Success', 'Saved!!');
            }
        })
        POSModal.Hide()
    }
}
$(document).ready(function () {
    //$('#Taken').change(function () {
    //    if ($('#Taken').val() != '-1') {
    //        $("#LeaveChange").val($('#Taken option:selected').val())
    //    }
    //})
    //$("#UserId").select2({
    //    ajax: {
    //        url: "/Employee/SearchEmployee",
    //        dataType: "json",
    //        data: function (n) {
    //            return { search: n.term, title: "Executive", page: n.page || 15 };
    //        },
    //        processResults: function (n, t) {
    //            t.page = t.page || 15;
    //            var i = JSON.parse(n.data);
    //            return { results: i.List, pagination: { more: t.page * 15 < n.total_count } };
    //        },
    //        delay: 250,
    //        cache: !0,
    //        placeholder: "Search for an employee",
    //        minimumInputLength: 1,
    //        templateResult: formatRepo,
    //        templateSelection: formatRepoSelection,
    //    },
    //});
})


