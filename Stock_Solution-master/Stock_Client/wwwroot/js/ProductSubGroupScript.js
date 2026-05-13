var ProductSubGroup = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    ProcessOrder: function () {
        if (UserRole != 'Admin') {
            return;
        }
        $(".OrderStatus").each(function () {
            var DataId = $(this).attr('data-id');
            var StatusVal = $(this).find('.StatusVal').text();
            var RiderVal = $(this).find('.RiderlistValUid').text();
            var DRiderVal = $(this).find('.DRiderlistVal').text();
            if (StatusVal != "") {
                $(this).html($(".OrderStatusListDiv").html());
                $(this).append("<div class='hidden riderListDiv'><select class='RiderlistVal form-control' id='rider_" + DataId + "'></select > <i style='cursor:pointer;' class='fa fa-save' onclick='AssignRider(" + DataId + ")'></i> </div > ");
                if (StatusVal == "AssignPickupMan") {
                    $("#rider_" + DataId).html($("#Riderlist").html());
                    $(this).parent().find(".riderListDiv").removeClass("hidden");
                    $("#rider_" + DataId).val(RiderVal)
                }
                if (StatusVal == "AssignDeliveryMan") {
                    $("#rider_" + DataId).html($("#Riderlist").html());
                    $(this).parent().find(".riderListDiv").removeClass("hidden");
                    $("#rider_" + DataId).val(DRiderVal)
                }
                $(this).find('.OrderStatusList').val(StatusVal);
                $(this).find('.OrderStatusList').change(function () {
                    var SelectedStatusVal = $(this).val();
                    if (SelectedStatusVal.includes("AssignPickupMan")) {
                        stat = "AssignPickupMan";
                        $("#rider_" + DataId).html($("#Riderlist").html());
                        $(this).parent().find(".riderListDiv").removeClass("hidden");
                    }
                    else if (SelectedStatusVal.includes("AssignDeliveryMan")) {
                        stat = "AssignDeliveryMan";
                        $("#rider_" + DataId).html($("#Riderlist").html());
                        $(this).parent().find(".riderListDiv").removeClass("hidden");
                    }
                    else {
                        $(this).parent().find(".riderListDiv").addClass("hidden");
                        OpenConfirmationMessageNew("", "Are you sure you want to update this order status?", function () {
                            ProductSubGroup.UpdateOrderStatus(SelectedStatusVal, DataId);
                        });
                    }

                });
            }
        });
    },
    UpdateOrderStatus: function (status, OrderId) {
        if (UserRole != 'Admin') {
            return;
        }
        $.ajax({
            url: "/Order/SaveStatusLog",
            type: 'post',
            data: { Status: status, Id: OrderId },
            beforeSend: function () {
                $('#place_new_porder_loader').show();
            },
            success: function (data) {
                if (data) {
                    OpenSuccessMessageNew("Success!", "Status changed successfully!");
                }
            }
        })

    },
    LoadPendingList: function () {
        if (ProductSubGroup.LoaderAjax && ProductSubGroup.LoaderAjax.readyState != 4) {
            return;
        }
        if (ProductSubGroup.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchTxt = $("#SearchOrder").val();
        var paramlite = {
            PageNo: ProductSubGroup.CurrentPage,
            Searchtext: SearchTxt,
        };
        ProductSubGroup.LoaderAjax = $.ajax({
            type: "post",
            url: '/Product/ProductSubGroupGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                ProductSubGroup.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#productsubgrouptemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (ProductSubGroup.CurrentPage == 1) {
                    $(".load_productsubgroup_list_data").html(sourceHtml(dataa));
                } else {
                    $(".load_productsubgroup_list_data").append(sourceHtml(dataa));
                }
                $(".load_productsubgroup_list_data").show();
                ProductSubGroup.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadPendingList: function () {
        if (ProductSubGroup.LoaderAjax && ProductSubGroup.LoaderAjax.readyState != 4) {
            return;
        }
        if (ProductSubGroup.TotalCount == $("tr.data").length) {
            return;
        }
        var Status = $("#Status").val();
        var FromDateTime = $("#StartDate").val();
        var ToDateTime = $("#EndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var paramlite = "?merchantid=" + $("#Merchant").val()
            + "&FromDateTime=" + FromDateTime
            + "&Status=" + Status
            + "&ToDateTime=" + ToDateTime
            + "&PageNo=" + ProductSubGroup.CurrentPage
            + "&SearchText=" + SearchTxt;
        window.location.href = "/order/order-download-excel" + paramlite;
    }
}
$(document).ready(function () {
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    ProductSubGroup.LoadPendingList();
    $("#Search").click(function () {
        ProductSubGroup.CurrentPage = 1;
        ProductSubGroup.TotalCount = -1;
        ProductSubGroup.LoadPendingList();
    });
    $(".print_sel_ord").change(function () {
        if ($(".print_sel_ord").is(':checked')) {
            $(".print_ord").prop('checked', true)
        } else {
            $(".print_ord").prop('checked', false)
        }
    });
    $("#srch_btn").click(function () {
        ProductSubGroup.CurrentPage = 1;
        ProductSubGroup.TotalCount = -1;
        ProductSubGroup.LoadPendingList();
    });
    $("#SearchOrder").keyup(function (e) {
        if (e.keyCode == 13) {
            ProductSubGroup.CurrentPage = 1;
            ProductSubGroup.TotalCount = -1;
            ProductSubGroup.LoadPendingList();
        }
    });

    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchOrder").val("");
        ProductSubGroup.CurrentPage = 1;
        ProductSubGroup.TotalCount = -1;
    });
   
    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });

    $(".load_look_list").height(window.innerHeight - 100)
    $("#btn-add-product-sub-groups").click(function () {
        OpenRightToLeftModal("/product/new-product-subgroups-add")
    });

});
$(window).resize(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
});
$(window).scroll(function () {
    if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
        ProductSubGroup.LoadPendingList();
    }
});