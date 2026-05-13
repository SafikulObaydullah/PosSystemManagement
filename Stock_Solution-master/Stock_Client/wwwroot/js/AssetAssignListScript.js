var AssetAssignList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteAssetAssignList: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Product/DeleteAssetAssign",
                data: { id: id },
                success: function (data) {
                    AssetAssignList.SearchAssetAssignList();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    } 
                }
            });
        });
    },
    GetAssetAssignById: function (id) {
        OpenRightToLeftModal('/assets/add-asset-assign?id=' + id)
    },
    SearchAssetAssignList: function () {
        AssetAssignList.CurrentPage = 1;
        AssetAssignList.TotalCount = -1;
        AssetAssignList.LoadAssetAssignList();
    },
    LoadAssetAssignList: function () {
        if (AssetAssignList.LoaderAjax && AssetAssignList.LoaderAjax.readyState != 4) {
            return;
        }
        if (AssetAssignList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var paramlite = {
            PageNo: AssetAssignList.CurrentPage,
            SearchText: SearchText,
        };
        AssetAssignList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Product/AssetAssignListLite',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                AssetAssignList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#AssiTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (AssetAssignList.CurrentPage == 1) {
                    if (AssetAssignList.TotalCount == 0) {
                        $(".LoadAssetassign").html('<tr><td colspan="6">No Data</td></tr>');
                    } else {
                        $(".LoadAssetassign").html(sourceHtml(dataa));
                    }
                } else {
                    $(".LoadAssetassign").append(sourceHtml(dataa));
                }
                $(".LoadAssetassign").show();
                AssetAssignList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadAssetAssignList: function () {
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
    AssetAssignList.LoadAssetAssignList()
    $('#SearchDocBtn').click(function () {
        AssetAssignList.SearchAssetAssignList()
    })
    $('#ApplyDoc').click(function () {
        AssetAssignList.SearchAssetAssignList()
    })
    $("#SearchAssetBtn").click(function () {
        AssetAssignList.CurrentPage = 1;
        AssetAssignList.TotalCount = -1;
        AssetAssignList.SearchAssetAssignList();
    });
    $("#SearchText").keyup(function () {
        AssetAssignList.CurrentPage = 1;
        AssetAssignList.TotalCount = -1;
        AssetAssignList.SearchAssetAssignList();
    });
})
$('#emp_lon_height').scroll(function () {
    AssetAssignList.LoadAssetAssignList()
})
