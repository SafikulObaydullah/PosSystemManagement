//code without dynamic time elapsed
//$(document).ready(function () {
//    LoadAttedanceBreakList();
//});
//var LoadAttedanceBreakList = function () {
//    var res
//    debugger;
//    console.log("executed");
//    $.ajax({
//        url: '/attendance-break',
//        type: 'get',
//        success: function (data) {
//            debugger;
//            res = data.result
//            if (data.result && data.result.length > 0) {
//                const template = $("#break_time_list").html();
//                const compiledTemplate = Handlebars.compile(template);
//                const html = compiledTemplate({ employee: data.result });
//                $(".render_data").html(html);
//            } else {
//                $(".render_data").html("Server error!");
//            }
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.log(errorThrown);
//        }
//    });
//    console.log(res);

//}


$(document).ready(function () {
    LoadAttedanceBreakList();
});

var employeeTimers = {};
var LoadAttedanceBreakList = function () {
    employeeTimers = {};
    var res;
    debugger;
    $.ajax({
        url: '/attendance-break',
        type: 'get',
        success: function (data) {

            debugger;
            res = data.result
            if (data.result && data.result.length > 0) {
                data.result.forEach(function (employee) {
                    if (employee.buttonStatus === "Stop") {
                        employeeTimers[employee.employeeId] = {
                            startTime: new Date(employee.startTime),
                            timerIsRunning: true
                        };
                        debugger
                        display(employee.employeeId);
                    }
                });
                const template = $("#break_time_list").html();
                const compiledTemplate = Handlebars.compile(template);
                const html = compiledTemplate({ employee: data.result });
                $(".render_data").html(html);
            } else {
                $(".render_data").html("Server error!");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}
var BreakInfoOfEmployee = function (button, EmployeeId) {
    var buttonText = $(button).text();
    if (buttonText === 'More') {
        var fromDate = $('#ReviewFilterStartDate').val();
        var toDate = $('#ReviewFilterEndDate').val();
        debugger;
        $.ajax({
            url: '/attendance-break-more-info-employee',
            type: 'get',
            data: { EmployeeId: EmployeeId, FromDateString: fromDate, ToDateString: toDate },
            success: function (data) {
                debugger;
                res = data.result
                if (data.result && data.result.length > 0) {
                    const template = $("#more_data_template").html();
                    const compiledTemplate = Handlebars.compile(template);
                    const html = compiledTemplate({ info: data.result });
                    $(`#more_data_${EmployeeId}`).html(html).removeAttr('hidden');
                    $(button).text('Hide');

                } else {

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else {
        $(`#more_data_${EmployeeId}`).attr('hidden', true);
        $(button).text('More');
    }

}

function formatTime(value) {
    return value < 10 ? "0" + value : value;
}
function display(employeeId) {
    if (employeeTimers[employeeId] && employeeTimers[employeeId].timerIsRunning) {
        var endTime = new Date();
        var timeDiff = endTime - employeeTimers[employeeId].startTime;
        timeDiff /= 1000;
        var seconds = Math.floor(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);
        var minutes = Math.floor(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);
        var hours = Math.floor(timeDiff);

        var formattedTime = hours + ":" + formatTime(minutes) + ":" + formatTime(seconds);
        //$(".time_" + employeeId).text(formattedTime);
        $(".time_" + employeeId).html("<strong>" + formattedTime + "</strong>");
    }
    setTimeout(function () {
        display(employeeId);
    }, 1000);
}

var StopTimer = function (BreakId) {
    var res
    debugger;
    $.ajax({
        url: '/stop-break-timer',
        type: 'get',
        data: { BreakId: BreakId },
        success: function (response) {
            debugger;
            if (response.code == 200) {
                alert("Break timer stoped!");
                LoadAttedanceBreakList();
            }
            else {
                alert("Server error!")
                
            }
        }
    });
}

var StartTimer = function (EmployeeId) {
    var res
    debugger;
    $.ajax({
        url: '/start-break-timer',
        type: 'get',
        data: { EmployeeId: EmployeeId },
        success: function (response) {
            debugger;
            if (response.code == 200) {
                alert("Break timer started for today!");
                LoadAttedanceBreakList();
            }
            else {
                alert("Server error!")
            }
        }
    });
}


var FilterBreakDataByDate = function () {
    employeeTimers = {};
    var fromDate = $('#ReviewFilterStartDate').val();
    var toDate = $('#ReviewFilterEndDate').val();
    $.ajax({
        url: '/attendance-break',
        type: 'POST',
        data: { FromDateString: fromDate, ToDateString: toDate },
        success: function (data) {
            debugger;
            res = data.result
            if (data.result && data.result.length > 0) {
                data.result.forEach(function (employee) {
                    if (employee.buttonStatus === "Stop") {
                        employeeTimers[employee.employeeId] = {
                            startTime: new Date(employee.startTime),
                            timerIsRunning: true
                        };
                        debugger
                        display(employee.employeeId);
                    }
                });
                const template = $("#break_time_list").html();
                const compiledTemplate = Handlebars.compile(template);
                const html = compiledTemplate({ employee: data.result });
                $(".render_data").html(html);
            } else {
                $(".render_data").html("Server error!");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

