
function editEvent(n) {
    alert(n);
}
var TicketGridOnScroll;
String.format = function (n) {
    var t = Array.prototype.slice.call(arguments, 1);
    return n.replace(/{(\d+)}/g, function (n, i) {
        return typeof t[i] != "undefined" ? t[i] : n;
    });
};
var ShowNotiContr = function (n) {
    $("#filt_contr").hide();
    $("#noti_ppl").show(500);
    $("#notitotct").html("Notify to Ticket# " + n);
},
    CancelNotiContr = function () {
        $("#noti_ppl").hide();
        $("#filt_contr").show(500);
    },
    TicketGrid = {
        CurrentPage: 1, 
        IsPin: 1,
        picker: null,
        picker2: null,
        LoaderAjax: null,
        TotalCount: -1,
        Reset: function () {
            TicketGrid.IsPin = 1;
            TicketGrid.CurrentPage = 1;
            TicketGrid.TotalCount = -1;
            TicketGrid.LoadTicketGrid();
        },
        Delete: function () {
            OpenConfirmationMessageNew("Are you sure?", "This invoice will convert as draft!", function () { });
        },
        TicketGridChangeStatus: function (n) {
            console.log(n);
            var t = $(".tstatus_" + n).val();
            t != "-1" &&
                OpenConfirmationMessageNew(
                    "Are you sure?",
                    "This ticket will be marked as " + t,
                    function () {
                        $.ajax({
                            type: "post",
                            url: "/Ticket/ChangeTicketStatus",
                            data: { id: n, status: t },
                            success: function (n) {
                                n ? (OpenSuccessMessageNew("Congrats!", "Saved Successfully!"), TicketGrid.Reset()) : OpenErrorMessageNew("Error!", "Sorry this can not be done this moment");
                            },
                            error: function (n, t, i) {
                                console.log(i);
                                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.");
                            },
                        });
                    },
                    function () {
                        TicketGrid.Reset();
                    }
                );
        },
        TicketGridChangePriority: function (n) {
            var t = $(".tpriority_" + n).val(),
                i = $(".tpriority_" + n + " option:selected").text();
            t != "-1" &&
                OpenConfirmationMessageNew(
                    "Are you sure?",
                    "This ticket will be marked as " + i,
                    function () {
                        $.ajax({
                            type: "post",
                            url: "/Ticket/ChangeTicketPriority",
                            data: { id: n, status: t },
                            success: function (n) {
                                n ? (OpenSuccessMessageNew("Congrats!", "Saved Successfully!"), TicketGrid.Reset()) : OpenErrorMessageNew("Error!", "Sorry this can not be done this moment");
                            },
                            error: function (n, t, i) {
                                console.log(i);
                                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.");
                            },
                        });
                    },
                    function () {
                        TicketGrid.Reset();
                    }
                );
        },
        TicketGridChangeAssignedPerson: function (n) {
            var t = $(".newticketassignedto_" + n).val();
            OpenConfirmationMessageNew(
                "Are you sure?",
                "This ticket will be Changed ",
                function () {
                    $.ajax({
                        type: "post",
                        url: "/Ticket/ChangeTicketAssignedPerson",
                        data: { id: n, assignedperson: t },
                        success: function (n) {
                            n
                                ? (console.log(n), n.result == !0 ? (OpenSuccessMessageNew("Congrats!", "Saved Successfully!"), TicketGrid.Reset()) : OpenErrorMessageNew("Person Already Added!", ""))
                                : OpenErrorMessageNew("Error!", "Sorry this can not be done this moment");
                        },
                        error: function (n, t, i) {
                            console.log(i);
                            OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.");
                        },
                    });
                },
                function () {
                    TicketGrid.Reset();
                }
            );
        },
        LoadTicketGrid: function () {
            if ((!TicketGrid.LoaderAjax || TicketGrid.LoaderAjax.readyState == 4) && TicketGrid.TotalCount != $("tr.data").length) {
                var i = $("#ReviewFilterStartDate").val(),
                    r = $("#ReviewFilterEndDate").val(),
                    u = $("#employfilt").val(),


                    f = $("#SearchOrder").val(),
                    t = initpriority,
                    n = initstatus;
                console.log(IsmineFilter);
                var e = $("#priorityid").val(),
                    o = $("#statusid").val(),
                    s = {
                        StartDate: i,
                        EndDate: r,
                        PageNo: TicketGrid.CurrentPage,
                        CreeAss: $('#asscree').val(),
                        Searchtext: f,
                        Priority: t,
                        TStatus: n,
                        NewPriority: e,
                        NewStatus: o,
                        MyticketFilter: IsmineFilter,
                        UserGuid: u,
                        MotherFilterMine: Motherfiltermine,
                        MotherFilterAll: Motherfilterall,
                        TicketStatusFromStats: ticketstatusfromstat,
                        ProjId: $('#ProjectListId').val(),
                        IsPinned: $('#Pinned').val(),
                        FilterCreAssign: $('#AssignCreate').val(),
                    };
                POSModal.Show();
                TicketGrid.LoaderAjax = $.ajax({
                    type: "post",
                    url: "/Ticket/TicketGrid",
                    data: s,
                    cache: !1,
                    success: function (i) {
                        if (ticketstatusfromstat != null && ticketstatusfromstat != "") {
                            $("#statusid").val(ticketstatusfromstat)
                            $("#statusid").attr('disabled', 'disabled')
                        }
                        if (employeeidfromstat != null && employeeidfromstat != "") {
                            $("#employfilt").select2({
                                ajax: {
                                    url: "/Employee/SearchEmployee",
                                    dataType: "json",
                                    data: function (n) {
                                        return { search: employeeidfromstat, title: "Executive", page: n.page || 15 };
                                    },
                                    processResults: function (n, t) {
                                        t.page = t.page || 15;
                                        var i = JSON.parse(n.data);
                                        $("#employfilt").append("<option value='" + employeeidfromstat + "'>" + i.List[0].text + "</option>");
                                        $("#employfilt").val(employeeidfromstat).select2();
                                        $("#employfilt").attr('disabled', 'disabled')
                                    }
                                },
                            });
                        }
                        var r, u, e, f;
                        r = JSON.parse(i.data);
                        u = r.TotalCount;
                        TicketGrid.TotalCount = u[0].TotalCount;
                        e = $("#tickettemplate").html();
                        f = Handlebars.compile(e);
                        t != "-1" && ($("#priorityid").val(t), $("#priorityid").attr("disabled", !0));
                        (n == "Open" || n == "Closed") && (console.log("nnn"), $("#statusid").val(n), $("#statusid").attr("disabled", !0));
                        $("#total_count").text(u[0].TotalCount);
                        if (TicketGrid.CurrentPage == 1) {
                            $(".load_ticket_list_data").html(f(r))
                            if ($('#QuickFilter').val() != '1') {
                                $('#tpin').text(r.StatusCount[0].Pinned)
                                $('#topen').text(r.StatusCount[0].OpenT)
                                $('#tonprog').text(r.StatusCount[0].OnProgress)
                                $('#tdev').text(r.StatusCount[0].Developed)
                                $('#tqc').text(r.StatusCount[0].QC)
                                $('#tqap').text(r.StatusCount[0].QAApprove)
                                $('#tqfail').text(r.StatusCount[0].QAFailed)
                                $('#tclose').text(r.StatusCount[0].Closed)
                            }
                        } else {
                            $(".load_ticket_list_data").append(f(r))
                        }
                        
                        $(".load_ticket_list_data").show(500);
                        $(".setpriorityclass").each(function () {
                            $(this).attr("data-prioritypoint") == "2"
                                ? $(this).addClass("High")
                                : $(this).attr("data-prioritypoint") == "1"
                                    ? $(this).addClass("Medium")
                                    : $(this).attr("data-prioritypoint") == "0" && $(this).addClass("Low");
                        });

                      
                        setTimeout(function () {
                            $(".til_assign_info .assignedPeople").each(function () {
                                var tkact = $(this).attr("ticketid");
                                var n = $(this).attr("ticketid"),
                                    t;
                                t = "";
                                $(r.AssignedPeople).each(function () {
                                    var i, r, u;
                                    if (n == this.AssignedTicketActivityId) {
                                        i = "/Images/profile_image.png";
                                        r = this.AssignedName + " " + this.AssignDateTime;
                                        i = "/Images/profile_image.png";
                                        u = '<div class="assign_pic_div"><img title="{0}" src="{1}" /></div >';
                                        t += String.format(u, r, i);
                                    }
                                });
                                $(".til_assign_info .assignedPeople_" + tkact).html(t);
                            });

                         
                        }, 100);
                        TicketGrid.CurrentPage++;
                        POSModal.Hide();
                       
                    },
                    error: function (n, t, i) {
                        POSModal.Hide();
                        OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.");
                    },
                });
            }
        },
        DownloadSalesList: function () {
            var n = $("#ReviewFilterStartDate").val(),
                t = $("#ReviewFilterEndDate").val(),
                i = $("#SearchOrder").val(),
                r = "?StartDate=" + n + "&EndDate=" + t + "&Searchtext=" + i;
            window.location.href = "/inventory/sale-download-excel" + r;
        },
        Print: function () {
            var n = [],
                t;
            $(".print_ord:checked").each(function () {
                n.push($(this).val());
            });
            t = "?ids=" + n.toString();
            OpenTopToBottomModal("/Sales/SalesPrintPreview" + t);
        },
    };
$("#Print_selected_option").click(function () {
    if ($("#PrintOption").val() == "-1") OpenErrorMessageNew("Please select print option!");
    else {
        var n = $("#PrintOption").val();
        TicketGrid.Reset();
        TicketGrid.Print(n);
    }
});
$(document).ready(function () {
    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
    ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            navigator.userAgent.substr(0, 4)
        )) &&
        (isMobile = !0);
    TicketGrid.LoadTicketGrid();
    $("#employ").select2({
        ajax: {
            url: "/Employee/SearchEmployee",
            dataType: "json",
            data: function (n) {
                return { search: n.term, title: "Executive", page: n.page || 15 };
            },
            processResults: function (n, t) {
                t.page = t.page || 15;
                var i = JSON.parse(n.data);
                return { results: i.List, pagination: { more: t.page * 15 < n.total_count } };
            },
            delay: 250,
            cache: !0,
            placeholder: "Search for an employee",
            minimumInputLength: 1,
            templateResult: formatRepo,
            templateSelection: formatRepoSelection,
        },
    });
    $("#ProjectListId").select2()
    $("#employfilt").select2({
        ajax: {
            url: "/Employee/SearchEmployee",
            dataType: "json",
            data: function (n) {
                return { search: n.term, title: "Executive", page: n.page || 15 };
            },
            processResults: function (n, t) {
                t.page = t.page || 15;
                var i = JSON.parse(n.data);
                return { results: i.List, pagination: { more: t.page * 15 < n.total_count } };
            },
            delay: 250,
            cache: !0,
            placeholder: "Search for an employee",
            minimumInputLength: 1,
            templateResult: formatRepo,
            templateSelection: formatRepoSelection,
        },
    });
    $("#Search").click(function () {
        $('#QuickFilter').val("0");
        TicketGrid.Reset();
    });
    $(".print_sel_ord").change(function () {
        $(".print_sel_ord").is(":checked") ? $(".print_ord").prop("checked", !0) : $(".print_ord").prop("checked", !1);
    });
    $("#srch_btn").click(function () {
        TicketGrid.Reset();
    });
    $("#SearchOrder").keyup(function () {
        TicketGrid.Reset();
    });
    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchOrder").val("");
        $("#DateRangeRev").val("-1").change();
        $("#priorityid").val("-1");
        $("#statusid").val("-1");
        $("#employfilt").val("-1").trigger('change');
        $("#ProjectListId").val("-1").trigger('change');
        $("#Pinned").val("0");
        $('#QuickFilter').val("0");
        $('#asscree').val('-1');
        TicketGrid.Reset();
    });
    $("#reset-date").click(function () {
        $("#datepicker").val("").datepicker("update");
    });
    $("#notificationassign").click(function (n) {
        OpenTopToBottomModal("/add-notify?id=" + n);
    });
    TicketGrid.picker = new Pikaday({ field: document.getElementById("ReviewFilterStartDate"), format: DateFormat, trigger: $("#ReviewFilterStartDate")[0], firstDay: 1 });
    TicketGrid.picker2 = new Pikaday({ field: document.getElementById("ReviewFilterEndDate"), format: DateFormat, trigger: $("#ReviewFilterEndDate")[0], firstDay: 1 });
});
TicketGridOnScroll = function () {
    $("tr.data:last").length > 0 && (console.log("1"), window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100 && (console.log("2"), TicketGrid.LoadTicketGrid()));
};
$(window).resize(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});
$(".til_height").scroll(function () {
    window.innerHeight - 150 + $(".til_height").scrollTop() > $("tr.data:last").position().top + 100 && TicketGrid.LoadTicketGrid();
});

