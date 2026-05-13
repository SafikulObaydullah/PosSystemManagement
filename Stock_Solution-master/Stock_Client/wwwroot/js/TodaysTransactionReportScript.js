
var TodaysTransactionReportList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    Reset: function () {
        TodaysTransactionReportList.CurrentPage = 1;
        TodaysTransactionReportList.TotalCount = -1;
    },
    LoadTodaysTransactionReportList: function () {
        if (TodaysTransactionReportList.LoaderAjax && TodaysTransactionReportList.LoaderAjax.readyState != 4) {
            return;
        }
        if (TodaysTransactionReportList.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var PayType = $("#payType").val();
        var TransactionType = $("#TransactionType").val();
        var CustoemrID = $("#CustomerId").val();
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: TodaysTransactionReportList.CurrentPage,
            Searchtext: SearchTxt,
            PayType: PayType,
            TransactionType: TransactionType,
            CustomerId: CustoemrID
        };

        TodaysTransactionReportList.LoaderAjax = $.ajax({
            type: "post",
            url: '/Report/TodaysTransactionReportList',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                TodaysTransactionReportList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#salestemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (TodaysTransactionReportList.CurrentPage == 1) {
                    $(".load_sales_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_sales_list_data").append(sourceHtml(dataa));
                }
                $(".load_sales_list_data").show();
                $("#revdatefilter").addClass('display_nn');
                TodaysTransactionReportList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenCautionMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadTodaysTransactionReport: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var PayType = $("#payType").val();
        var TransactionType = $("#TransactionType").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&Searchtext=' + SearchTxt
            + '&PayType=' + PayType
            + '&TransactionType=' + TransactionType
            + '&IsDownload=true';
        window.location.href = "/Report/DownloadTodaysTransactionReport" + parm;
    },
    SearchTodaysTransactionReportList: function () {
        TodaysTransactionReportList.CurrentPage = 1;
        TodaysTransactionReportList.TotalCount = -1;
        TodaysTransactionReportList.LoadTodaysTransactionReportList();
    },
}
$("#Print_selected_option").click(function () {
    if ($('#PrintOption').val() == '-1') {
        OpenCautionMessageNew('Please select print option!')
    } else {
        var options = $('#PrintOption').val();
        TodaysTransactionReportList.Reset()
        TodaysTransactionReportList.Print(options)
    }
});

$(document).ready(function () {
    $(".sales_cont").height(window.innerHeight - 205);
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    TodaysTransactionReportList.LoadTodaysTransactionReportList();
    $("#applybtn").click(function () {
        TodaysTransactionReportList.CurrentPage = 1;
        TodaysTransactionReportList.TotalCount = -1;
        TodaysTransactionReportList.LoadTodaysTransactionReportList();
    });
    $(".print_sel_ord").change(function () {
        if ($(".print_sel_ord").is(':checked')) {
            $(".print_ord").prop('checked', true)
        } else {
            $(".print_ord").prop('checked', false)
        }
    });
    $("#PrintAllSettled").click(function () {
        TodaysTransactionReportList.PrintAllinvoicePDF();
    });
    $("#SearchOrder").keyup(function () {
        TodaysTransactionReportList.SearchTodaysTransactionReportList();
    })
    $("#srch_btn").click(function () {
        TodaysTransactionReportList.Reset();
        TodaysTransactionReportList.SearchTodaysTransactionReportList();
    });

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchOrder").val("");
        $("#applybtn").val("");
        $('select').val('-1').change()
        TodaysTransactionReportList.Reset();
        TodaysTransactionReportList.LoadTodaysTransactionReportList();
    });

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });

    $("#DateRangeRev").change(function () {
        TodaysTransactionReportList.SearchTodaysTransactionReportList();
    })
    TodaysTransactionReportList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: DateFormat,
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 7
    });
    TodaysTransactionReportList.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: DateFormat,
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 7
    });
    TodaysTransactionReportList.LoadTodaysTransactionReportList();
});
$(window).resize(function () {
    $(".sales_cont").height(window.innerHeight - 205);
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});
$(".sales_cont").scroll(function () {
    if (window.innerHeight - 205 + $(".sales_cont").scrollTop() > $("tr.data:last").position().top) {
        TodaysTransactionReportList.LoadTodaysTransactionReportList();
    }
});










//var isdate = true;
//var TodaysTransactionReportList = {
//    CurrentPage: 1,
//    picker: null,
//    picker2: null,
//    LoaderAjax: null,
//    TotalCount: -1,
//    DeleteMerchantAccount: function (id) {
//        OpenConfirmationMessageNew("", "Are you sure?", function () {
//            confirmdeleteMerchantAccount(id);
//        });
//    },
//    DownloadTodaysTransactionReportList: function () {
//        window.location.href = "/report/sales-download-excel";
//    },
//    SearchTodaysTransactionReportList: function () {
//        TodaysTransactionReportList.CurrentPage = 1;
//        TodaysTransactionReportList.TotalCount = -1;
//        TodaysTransactionReportList.LoadTodaysTransactionReportList();
//    },
//    LoadTodaysTransactionReportList: function () {
//        if (TodaysTransactionReportList.LoaderAjax && TodaysTransactionReportList.LoaderAjax.readyState != 4) {
//            return;
//        }
//        if (TodaysTransactionReportList.TotalCount == $("div.data").length) {
//            return;
//        }
//        var SearchText = $("#SearchText").val();
//        var FromDateTime = $("#ReviewFilterStartDate").val();
//        var ToDateTime = $("#ReviewFilterEndDate").val();
//        var parm = {
//            PageNo: TodaysTransactionReportList.CurrentPage,
//            SearchText: SearchText,
//            StartDate: FromDateTime,
//            EndDate: ToDateTime,
//        }
//        TodaysTransactionReportList.LoaderAjax = $.ajax({
//            url: '/report/todaystransaction-report',
//            data: parm,
//            cache: false,
//            success: function (data) {

//                if (TodaysTransactionReportList.CurrentPage == 1) {
//                    $("#load_todaystransaction_report_list").html('')
//                    $("#load_todaystransaction_report_list").append(data);
//                    TodaysTransactionReportList.TotalCount = totalcountmerpay;
//                    $("#total_count").text(totalcountmerpay)
//                }
//                else {
//                    $("#load_todaystransaction_report_list").append(data);
//                }
//                TodaysTransactionReportList.CurrentPage++;
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                console.log(errorThrown);
//                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
//            }
//        });


//    }
//}
//$(document).ready(function () {

//    if (isdate) {
//        var currentdate = new Date();
//        var dd = currentdate.getDay();
//        var mm = currentdate.getMonth();
//        var yy = currentdate.getFullYear();
//        var today = mm + '/' + dd + '/' + yy;
//        $("#ReviewFilterStartDate").val(today);
//        $("#ReviewFilterEndDate").val(today);
//        $('select').val('1').change()
//        isdate = false;
//    }
//    TodaysTransactionReportList.LoadTodaysTransactionReportList();
//    $("#SearchText").keyup(function () {
//        TodaysTransactionReportList.SearchTodaysTransactionReportList();
//    })
//    $("#Search").click(function () {
//        TodaysTransactionReportList.CurrentPage = 1;
//        TodaysTransactionReportList.TotalCount = -1;
//        TodaysTransactionReportList.SearchTodaysTransactionReportList();
//    });
//    $("#DateRangeRev").change(function () {
//        TodaysTransactionReportList.SearchTodaysTransactionReportList();
//    })
//    $("#SearchTextBtn").click(function () {
//        TodaysTransactionReportList.Reset();
//        TodaysTransactionReportList.LoadTodaysTransactionReportList();
//    });
//    $("#SearchText").keyup(function (e) {
//        if (e.keyCode == 13) {
//            TodaysTransactionReportList.Reset();
//            TodaysTransactionReportList.LoadTodaysTransactionReportList();
//        }
//    });

//    $("#reset").click(function () {
//        $("#ReviewFilterStartDate").val("");
//        $("#ReviewFilterEndDate").val("");
//        $("#SearchText").val("");
//        $('select').val('-1').change()
//        TodaysTransactionReportList.Reset();
//        TodaysTransactionReportList.LoadTodaysTransactionReportList();
//    });

//    TodaysTransactionReportList.picker = new Pikaday({
//        field: document.getElementById('ReviewFilterStartDate'),

//        format: 'MM/DD/YYYY',
//        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
//    });
//    TodaysTransactionReportList.picker2 = new Pikaday({
//        field: document.getElementById('ReviewFilterEndDate'),
//        format: 'MM/DD/YYYY',
//        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
//    });
//})
//$(window).scroll(function () {
//    if (window.innerHeight + window.scrollY > $("div.data:last").position().top + 100) {
//        TodaysTransactionReportList.LoadTodaysTransactionReportList();
//    }
//});