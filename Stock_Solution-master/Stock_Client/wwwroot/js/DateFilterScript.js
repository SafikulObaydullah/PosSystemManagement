//var ReviewFilterStartDate;
//var ReviewFilterEndDate;
var InitiateDate = function () {
    $("#DateRangeRev").val("Today");
    var date = new Date();
    var todaydate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    $('#ReviewFilterStartDate').val(todaydate);
    $('#ReviewFilterEndDate').val(todaydate);
    $('#filterBy').text("Today");
}
var CurrentDate = new Date();
var CurrentDay = moment(CurrentDate).format(DateFormat);
var Previous7Day = moment(CurrentDate).subtract(1, 'd').format(DateFormat);
var Next7Day = moment(CurrentDate).add(7, 'd').format(DateFormat);
var Next15Day = moment(CurrentDate).add(15, 'd').format(DateFormat);
var Next30Day = moment(CurrentDate).add(30, 'd').format(DateFormat);
var Next60Day = moment(CurrentDate).add(60, 'd').format(DateFormat);
var Next90Day = moment(CurrentDate).add(90, 'd').format(DateFormat);
var Previous90Day = moment(CurrentDate).subtract(90, 'd').format(DateFormat);
var Previous999Day = moment(CurrentDate).subtract(20, 'y').format(DateFormat);
var Next999Day = moment(CurrentDate).add(20, 'y').format(DateFormat);
$(document).ready(function () {
    $('#ReviewFilterStartDate').click(function () {
        $("#DateRangeRev").val("Custom");
        $('#FilterByRev').text("Custom");
    });
    $('#ReviewFilterEndDate').click(function () {
        $("#DateRangeRev").val("Custom");
        $('#FilterByRev').text("Custom");
    });

    $('#DeadFilterStartDate').click(function () {
        $("#DateRangeDead").val("Custom");
        $('#FilterByDead').text("Custom");
    });
    $('#DeadFilterEndDate').click(function () {
        $("#DateRangeDead").val("Custom");
        $('#FilterByDead').text("Custom");
    });

    $('#TargetFilterStartDate').click(function () {
        $("#DateRangeTarget").val("Custom");
        $('#FilterByTarget').text("Custom");
    });

    $('#TargetFilterEndDate').click(function () {
        $("#DateRangeTarget").val("Custom");
        $('#FilterByTarget').text("Custom");
    });


    $('#dtfilterrev').click(function () {
        $("#revdatefilter").slideToggle();
    });
    $('#dtfilterdead').click(function () {
        $("#deaddatefilter").slideToggle();
    });
    $('#dtfiltertarget').click(function () {
        $("#targetdatefilter").slideToggle();
    });
    $('#DateRangeRev').change(function () {
        if ($("#DateRangeRev").children(":selected").attr("value") == "1") {
            $('#FilterByRev').text("Today");
            $('#ReviewFilterStartDate').val(CurrentDay);
            $('#ReviewFilterEndDate').val(CurrentDay);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "7") {
            alert(Previous7Day)
            $('#FilterByRev').text("Yesterday");
            $('#ReviewFilterStartDate').val(Previous7Day);
            $('#ReviewFilterEndDate').val(Previous7Day);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "8") {
            $('#FilterByRev').text("7 Days");
            $('#ReviewFilterStartDate').val(CurrentDay);
            $('#ReviewFilterEndDate').val(Next7Day);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "15") {
            $('#FilterByRev').text("15 Days");
            $('#ReviewFilterStartDate').val(CurrentDay);
            $('#ReviewFilterEndDate').val(Next15Day);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "30") {
            $('#FilterByRev').text("30 Days");
            $('#ReviewFilterStartDate').val(CurrentDay);
            $('#ReviewFilterEndDate').val(Next30Day);

        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "60") {
            $('#FilterByRev').text("60 Days");
            $('#ReviewFilterStartDate').val(CurrentDay);
            $('#ReviewFilterEndDate').val(Next60Day);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "90") {
            $('#FilterByRev').text("90 Days");
            $('#ReviewFilterStartDate').val(CurrentDay);
            $('#ReviewFilterEndDate').val(Next90Day);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "-90") {
            $('#FilterByRev').text("Past");
            $('#ReviewFilterStartDate').val(Previous90Day);
            $('#ReviewFilterEndDate').val(CurrentDay);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "999") {
            $('#FilterByRev').text("AllTime");
            $('#ReviewFilterStartDate').val(Previous999Day);
            $('#ReviewFilterEndDate').val(Next999Day);
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "Custom") {
            $('#FilterByRev').text("Custom");
            $('#ReviewFilterStartDate').val('');
            $('#ReviewFilterEndDate').val('');
        }
        if ($("#DateRangeRev").children(":selected").attr("value") == "-1") {
            $('#FilterByRev').text("Select Date");
            $('#ReviewFilterStartDate').val('');
            $('#ReviewFilterEndDate').val('');
        }
    });
    $('#DateRangeDead').change(function () {
        if ($("#DateRangeDead").children(":selected").attr("value") == "1") {
            $('#FilterByDead').text("Today");
            $('#DeadFilterStartDate').val(CurrentDay);
            $('#DeadFilterEndDate').val(CurrentDay);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "7") {
            $('#FilterByDead').text("Yesterday");
            $('#DeadFilterStartDate').val(Previous7Day);
            $('#DeadFilterEndDate').val(Next7Day);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "8") {
            $('#FilterByDead').text("7 Days");
            $('#DeadFilterStartDate').val(CurrentDay);
            $('#DeadFilterEndDate').val(Next7Day);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "15") {
            $('#FilterByDead').text("15 Days");
            $('#DeadFilterStartDate').val(CurrentDay);
            $('#DeadFilterEndDate').val(Next15Day);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "30") {
            $('#FilterByDead').text("30 Days");
            $('#DeadFilterStartDate').val(CurrentDay);
            $('#DeadFilterEndDate').val(Next30Day);

        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "60") {
            $('#FilterByDead').text("60 Days");
            $('#DeadFilterStartDate').val(CurrentDay);
            $('#DeadFilterEndDate').val(Next60Day);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "90") {
            $('#FilterByDead').text("90 Days");
            $('#DeadFilterStartDate').val(CurrentDay);
            $('#DeadFilterEndDate').val(Next90Day);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "-90") {
            $('#FilterByDead').text("Past");
            $('#DeadFilterStartDate').val(Previous90Day);
            $('#DeadFilterEndDate').val(CurrentDay);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "999") {
            $('#FilterByDead').text("AllTime");
            $('#DeadFilterStartDate').val(Previous999Day);
            $('#DeadFilterEndDate').val(Next999Day);
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "Custom") {
            $('#FilterByDead').text("Custom");
            $('#DeadFilterStartDate').val('');
            $('#DeadFilterEndDate').val('');
        }
        if ($("#DateRangeDead").children(":selected").attr("value") == "-1") {
            $('#FilterByDead').text("None");
            $('#DeadFilterStartDate').val('');
            $('#DeadFilterEndDate').val('');
        }
    });
    $('#DateRangeTarget').change(function () {
        if ($("#DateRangeTarget").children(":selected").attr("value") == "1") {
            $('#FilterByTarget').text("Today");
            $('#TargetFilterStartDate').val(CurrentDay);
            $('#TargetFilterEndDate').val(CurrentDay);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "7") {
            $('#FilterByTarget').text("Yesterday");
            $('#TargetFilterStartDate').val(Previous7Day);
            $('#TargetFilterEndDate').val(Next7Day);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "8") {
            $('#FilterByTarget').text("7 Days");
            $('#TargetFilterStartDate').val(CurrentDay);
            $('#TargetFilterEndDate').val(Next7Day);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "15") {
            $('#FilterByTarget').text("15 Days");
            $('#TargetFilterStartDate').val(CurrentDay);
            $('#TargetFilterEndDate').val(Next15Day);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "30") {
            $('#FilterByTarget').text("30 Days");
            $('#TargetFilterStartDate').val(CurrentDay);
            $('#TargetFilterEndDate').val(Next30Day);

        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "60") {
            $('#FilterByTarget').text("60 Days");
            $('#TargetFilterStartDate').val(CurrentDay);
            $('#TargetFilterEndDate').val(Next60Day);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "90") {
            $('#FilterByTarget').text("90 Days");
            $('#TargetFilterStartDate').val(CurrentDay);
            $('#TargetFilterEndDate').val(Next90Day);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "-90") {
            $('#FilterByTarget').text("Past");
            $('#TargetFilterStartDate').val(Previous90Day);
            $('#TargetFilterEndDate').val(CurrentDay);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "999") {
            $('#FilterByTarget').text("AllTime");
            $('#TargetFilterStartDate').val(Previous999Day);
            $('#TargetFilterEndDate').val(Next999Day);
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "Custom") {
            $('#FilterByTarget').text("Custom");
            $('#TargetFilterStartDate').val('');
            $('#TargetFilterEndDate').val('');
        }
        if ($("#DateRangeTarget").children(":selected").attr("value") == "-1") {
            $('#FilterByTarget').text("None");
            $('#TargetFilterStartDate').val('');
            $('#TargetFilterEndDate').val('');
        }
    });
})