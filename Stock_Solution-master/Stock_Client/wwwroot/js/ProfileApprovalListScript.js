var ProfileApprovalList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    Reset: function () {
        ProfileApprovalList.CurrentPage = 1;
        ProfileApprovalList.TotalCount = -1;
        ProfileApprovalList.LoadProfileApprovalList()
    },
    Delete: function (id) {
        OpenConfirmationMessageNew('Are you sure?', 'This invoice will convert as draft!', function () {
            $.ajax({
                type: "post",
                url: '/Sales/MakeInvoiceAsDraft',
                data: { id: id },
                success: function (data) {
                    if (data.success) {
                        OpenSuccessMessageNew('Congrats!', data.message)
                        ProfileApprovalList.Reset()
                        ProfileApprovalList.LoadProfileApprovalList()
                    } else {
                        OpenErrorMessageNew('Error!', data.message)
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                    OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
                }
            });
        })
    },
    Search: function () {
        ProfileApprovalList.CurrentPage = 1;
        ProfileApprovalList.TotalCount = -1;
        ProfileApprovalList.LoadProfileApprovalList();
    },
    LoadProfileApprovalList: function () {
        POSModal.Show();
        if (ProfileApprovalList.LoaderAjax && ProfileApprovalList.LoaderAjax.readyState != 4) {
            return;
        }
        if (ProfileApprovalList.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var Branch = $("#Branch").val();
        var Manager = $("#Manager").val();
        var LineManager = $("#LineManager").val();
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: ProfileApprovalList.CurrentPage,
            Searchtext: SearchTxt,
            Branch: Branch,
            Manager: Manager,
            LineManager: LineManager
        };
        ProfileApprovalList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Employee/GetProfileApprovalList',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                console.log(dataa);
                var TotalCount = dataa.TotalCount; 
                ProfileApprovalList.TotalCount = dataa.TotalCount;
                var empTemplate = $("#EPTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount)
                if (ProfileApprovalList.CurrentPage === 1) {
                    $(".load_employee_pro_list").html(sourceHtml(dataa));
                } else {
                    $(".load_employee_pro_list").append(sourceHtml(dataa));
                }
                $(".load_employee_pro_list").show(500);
                ProfileApprovalList.CurrentPage++;
                POSModal.Hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadSalesList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&Searchtext=' + SearchTxt;
        window.location.href = "/inventory/sale-download-excel" + parm;
    },
    Print: function (option) {

        var j = [];
        $('.print_ord:checked').each(function () {
            j.push($(this).val());
        });
        var parm = '?ids=' + j.toString();
        OpenTopToBottomModal('/Sales/SalesPrintPreview' + parm);
    }
}
var employeestatus = function (ev, selectid) {
    console.log(ev);
    console.log(selectid);
    OpenConfirmationMessageNew('Warning!', 'Are you sure?', function () {
        POSModal.Show()
        var paramlite = {
            Status: $(ev).val(),
            Id: selectid 
        };
        $.ajax({
            url: '/Employee/ChangeEmployeeProfileStatus',
            type: 'post',
            data: paramlite,
            success: function (data) {
                POSModal.Hide()
                if (data) {
                    OpenSuccessMessageNew('Success', 'Saved')
                }
                else {
                    OpenErrorMessageNew("Error!", 'Failed!!!!');
                }
            }
        })
    })
}
$("#Print_selected_option").click(function () {
    if ($('#PrintOption').val() == '-1') {
        OpenErrorMessageNew('Please select print option!')
    } else {
        var options = $('#PrintOption').val();
        ProfileApprovalList.Reset()
        ProfileApprovalList.Print(options)
    }
});
$(document).ready(function () {
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    ProfileApprovalList.LoadProfileApprovalList();
    $("#Search").click(function () {
        ProfileApprovalList.Reset();
    });
    $(".print_sel_ord").change(function () {
        if ($(".print_sel_ord").is(':checked')) {
            $(".print_ord").prop('checked', true)
        } else {
            $(".print_ord").prop('checked', false)
        }
    });
    $("#srch_btn").click(function () {
        ProfileApprovalList.Reset();
    });
    $("#SearchOrder").keyup(function (e) {
        ProfileApprovalList.Reset();
    });
    $("#Branch").change(function () {
        ProfileApprovalList.CurrentPage = 1;
        ProfileApprovalList.TotalCount = -1;
        ProfileApprovalList.Search();
    });
    $("#LineManager").change(function () {
        ProfileApprovalList.CurrentPage = 1;
        ProfileApprovalList.TotalCount = -1;
        ProfileApprovalList.Search();
    });
    $("#Manager").change(function () {
        ProfileApprovalList.CurrentPage = 1;
        ProfileApprovalList.TotalCount = -1;
        ProfileApprovalList.Search();
    });
    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchOrder").val("");
        $("#DateRangeRev").val("-1").change();
        ProfileApprovalList.Reset();
    });

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });

    ProfileApprovalList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    ProfileApprovalList.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: 'MM-DD-YYYY',
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });

});
$(window).resize(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});