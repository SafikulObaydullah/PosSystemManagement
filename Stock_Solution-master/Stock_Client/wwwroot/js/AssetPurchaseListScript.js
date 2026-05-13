var AssetPurchaseList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteAssetPurchaseList: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Product/DeleteAssetPurchase",
                data: { id: id },
                success: function (data) {
                    AssetPurchaseList.SearchAssetPurchaseList();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    } a
                }
            });
        });
    },
    GetAssetPurchaseById: function (id) {
        OpenRightToLeftModal('/assets/add-asset-purchase?id=' + id)
    },
    SearchAssetPurchaseList: function () {
        AssetPurchaseList.CurrentPage = 1;
        AssetPurchaseList.TotalCount = -1;
        AssetPurchaseList.LoadAssetPurchaseList();
    },
    LoadAssetPurchaseList: function () {
        if (AssetPurchaseList.LoaderAjax && AssetPurchaseList.LoaderAjax.readyState != 4) {
            return;
        }
        if (AssetPurchaseList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var paramlite = {
            PageNo: AssetPurchaseList.CurrentPage,
            SearchText: SearchText,
        };
        AssetPurchaseList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Product/AssetPurchaseListLite',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                AssetPurchaseList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#PurTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (AssetPurchaseList.CurrentPage == 1) {
                    if (AssetPurchaseList.TotalCount == 0) {
                        $(".LoadAssetpurchase").html('<tr><td colspan="7">No Data</td></tr>');
                    } else {
                        $(".LoadAssetpurchase").html(sourceHtml(dataa));
                    }
                } else {
                    $(".LoadAssetpurchase").append(sourceHtml(dataa));
                }
                $(".LoadAssetpurchase").show();
                AssetPurchaseList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadAssetPurchaseList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var active = $("#active_status").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchText
            + '&active=' + active;
        //window.location.href = "/Employee/employee-download-excel" + parm;
    },
};

//var UpdateTransfer = function (id) {
//    var url = "/Employee/AddEmployeeTransfer";
//    $(".grid-list-exc-page").hide();
//    OpenRightToLeftModal('/Employee/AddEmployeeTransfer?id=' + id);
//}

$(document).ready(function () {
    AssetPurchaseList.LoadAssetPurchaseList()
    $('#SearchDocBtn').click(function () {
        AssetPurchaseList.SearchAssetPurchaseList()
    })
    $('#ApplyDoc').click(function () {
        AssetPurchaseList.SearchAssetPurchaseList()
    })
    $("#SearchAssetBtn").click(function () {
        AssetPurchaseList.CurrentPage = 1;
        AssetPurchaseList.TotalCount = -1;
        AssetPurchaseList.SearchAssetPurchaseList();
    });
    $("#SearchText").keyup(function () {
        AssetPurchaseList.CurrentPage = 1;
        AssetPurchaseList.TotalCount = -1;
        AssetPurchaseList.SearchAssetPurchaseList();
    });
})
$('#emp_lon_height').scroll(function () {
    AssetPurchaseList.LoadAssetPurchaseList()
})
