var LowStockGrid = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    Reset: function () {
        LowStockGrid.CurrentPage = 1;
       
    },
    GetStock: function (productid, id) {
        $.ajax({
            url: '/Inventory/GetStockByProductId',
            type: 'post',
            data: { productid: productid, unit: $('#Unit_' + productid).val(), id: id },
            success: function (data) {
                console.log(data)
                $('#qty' + id).html(data.stock)
                $('#new_lowstock_qty' + id).val(data.quantity)
            }
        })
    },
    LoadLowStockGrid: function () {
        if (LowStockGrid.LoaderAjax && LowStockGrid.LoaderAjax.readyState != 4) {
            return;
        }
        
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var category = $("#Category").val();

        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: LowStockGrid.CurrentPage,
            Searchtext: SearchTxt,
            CategoryName: category,
        };
        LowStockGrid.LoaderAjax = $.ajax({
            type: "post",
            url: '/Product/LowStockGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                var empTemplate = $("#lowstocktemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].totalcount);
                if (LowStockGrid.CurrentPage == 1) {
                    $(".load_low_stock_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_low_stock_list_data").append(sourceHtml(dataa));
                }
                $(".load_low_stock_list_data").show();
                $("#revdatefilter").addClass('display_nn');
                LowStockGrid.CurrentPage++;
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    LoadProductFromLowStock: function (id) {
        OpenTopToBottomModal("/Product/add?id=" + id);
    },
    LoadCategoryFromLowStock: function (id) {
        OpenRightToLeftModal("/Productcategorie/add?id=" + id);
    },
    
    UpdateLowStockFromEnterKey: function (e, id, item) {
                var newqty = parseInt($('#new_lowstock_qty' + id).val());
                var unitdom = $(item).parent().parent().find('.Udropdownlist').val();
                if (unitdom == '' || unitdom == null || unitdom == undefined) {
                    unitdom = '';
                }
                if (isNaN(newqty)) { newqty = 0; }
                var paramlite = {
                    Id: id,
                    Quantity: newqty,
                    Unit: unitdom
                }
                if (paramlite.Quantity != '' && paramlite.Quantity > 0) {
                    $.ajax({
                        type: "post",
                        url: '/Inventory/UpdateLowStock',
                        data: paramlite,
                        cache: false,
                        success: function (data) {
                            $(item).parent().parent().find('.print_ord').attr('checked', 'checked');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown);
                            OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
                        }
                    });

                }
    },
    
    DownloadLowStockList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var category = $("#Category").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&Searchtext=' + SearchTxt
        + '&CategoryName=' + category;
        window.location.href = "/inventory/lowstock-download-excel" +parm;
    },
    SearchLowStockGrid: function () {
        LowStockGrid.CurrentPage = 1;
        LowStockGrid.TotalCount = -1;
        LowStockGrid.LoadLowStockGrid();
    },
    Print: function (option) {

        var j = [];
        $('.print_ord:checked').each(function () {
            j.push($(this).val());
        });
        var parm = '?ids=' + j.toString();
        OpenTopToBottomModal('/Sales/SalesPrintPreview' + parm);
    },
    ApprovedLowStockList: function () {
            var Approvedlist = [];
            console.log('hi');
            $(".print_ord").each(function () {
                if ($(this).prop("checked")) {
                    var selid = $(this).data('id');
                    var newqty = parseInt($('#new_lowstock_qty' + selid).val());
                    if (isNaN(newqty)) { newqty = 0; }
                    var paramlite = {
                        Id: selid,
                        Quantity: newqty
                    }
                    Approvedlist.push(paramlite);
                }
            });
            if (Approvedlist.length > 0) {
                $.ajax({
                    type: "post",
                    url: '/Inventory/UpdateListLowStock',
                    data: { SelectedList: Approvedlist },
                    cache: false,
                    success: function (data) {
                        if (data.success) {
                            for (var i = 0; i < Approvedlist.length; i++) {
                                var qty = parseInt($('#qty' + Approvedlist[i].Id).html());
                                if (isNaN(qty)) { qty = 0; }
                                $('#qty' + Approvedlist[i].Id).text(Approvedlist[i].Quantity + qty);
                                $('#new_lowstock_qty' + Approvedlist[i].Id).val('')
                            }
                            OpenSuccessMessageNew('Congratulation!', data.message)
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
                    }
                });
                $('#lowstockmenu').click()
            }
        }
    }

$("#Print_selected_option").click(function () {
    if ($('#PrintOption').val() == '-1') {
        OpenErrorMessageNew('Please select print option!')
    } else {
        var options = $('#PrintOption').val();
        LowStockGrid.Reset()
        LowStockGrid.Print(options)
    }
});
var unitload = function () {
    $('.unittd').each(function () {
        var UnitVal = $(this).find('.Unitvalue').text();
        $(this).html($("#unitdiv").html());
        if (UnitVal != '' && UnitVal != undefined && UnitVal != null) {
            $(this).find('.UnitDropdownlist').val(UnitVal);
        }
    })
}

$(document).ready(function () {
    $(".low_stock_height").height(window.innerHeight - 205);
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    LowStockGrid.LoadLowStockGrid();
    $("#applybtn").click(function () {
        LowStockGrid.CurrentPage = 1;
        LowStockGrid.TotalCount = -1;
        LowStockGrid.LoadLowStockGrid();
    });
  
    $(".print_sel_ord").change(function () {
        if ($(".print_sel_ord").is(':checked')) {
            $(".print_ord").prop('checked', true)
        } else {
            $(".print_ord").prop('checked', false)
        }
    });
    $("#srch_btn").click(function () {
        LowStockGrid.Reset();
        LowStockGrid.SearchLowStockGrid();
    });
    $("#SearchOrder").keyup(function () {
        LowStockGrid.SearchLowStockGrid();
    })

    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            LowStockGrid.Reset();
            LowStockGrid.SearchLowStockGrid();
        }
    });

      $("#Category").change(function () {
        LowStockGrid.Reset();
        LowStockGrid.LoadLowStockGrid();
    });
   

    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchOrder").val("");
        $("#applybtn").val("");
        $("#Category").val("");
        $('select').val('-1').change()
        LowStockGrid.CurrentPage = 1;
        LowStockGrid.TotalCount = -1;
    });
  

    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });
    $("#DateRangeRev").change(function () {
        LowStockGrid.SearchLowStockGrid();
    })
    LowStockGrid.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: dateformat,
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 1
    });
    LowStockGrid.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: dateformat,
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
    });

});
$(window).resize(function () {
    $(".low_stock_height").height(window.innerHeight - 205);
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});
$(".low_stock_height").scroll(function () {
    if (window.innerHeight - 205 + $(".low_stock_height").scrollTop() > $("tr.data:last").position().top) {
        LowStockGrid.LoadLowStockGrid();
    }
});