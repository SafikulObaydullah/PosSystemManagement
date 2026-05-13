var AssetCompanyList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteAssetCompanyList: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Product/DeleteAssetCompany",
                data: { id: id },
                success: function (data) {
                    AssetCompanyList.SearchAssetCompanyList();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    } a
                }
            });
        });
    },
    GetAssetCompanyById: function (id) {
        OpenRightToLeftModal('/assets/add-asset-company?id=' + id)
    },
    SearchAssetCompanyList: function () {
        AssetCompanyList.CurrentPage = 1;
        AssetCompanyList.TotalCount = -1;
        AssetCompanyList.LoadAssetCompanyList();
    },
    LoadAssetCompanyList: function () {
        if (AssetCompanyList.LoaderAjax && AssetCompanyList.LoaderAjax.readyState != 4) {
            return;
        }
        if (AssetCompanyList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var paramlite = {
            PageNo: AssetCompanyList.CurrentPage,
            SearchText: SearchText,
        };
        AssetCompanyList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Product/AssetCompanyListLite',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                AssetCompanyList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#ComTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (AssetCompanyList.CurrentPage == 1) {
                    if (AssetCompanyList.TotalCount == 0) {
                        $(".LoadAssetcompany").html('<tr><td colspan="7">No Data</td></tr>');
                    } else {
                        $(".LoadAssetcompany").html(sourceHtml(dataa));
                    }
                } else {
                    $(".LoadAssetcompany").append(sourceHtml(dataa));
                }
                $(".LoadAssetcompany").show();
                AssetCompanyList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadAssetCompanyList: function () {
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
    AssetCompanyList.LoadAssetCompanyList()
    $('#SearchDocBtn').click(function () {
        AssetCompanyList.SearchAssetCompanyList()
    })
    $('#ApplyDoc').click(function () {
        AssetCompanyList.SearchAssetCompanyList()
    })
    $("#SearchAssetBtn").click(function () {
        AssetCompanyList.CurrentPage = 1;
        AssetCompanyList.TotalCount = -1;
        AssetCompanyList.SearchAssetCompanyList();
    });
    $("#SearchText").keyup(function () {
        AssetCompanyList.CurrentPage = 1;
        AssetCompanyList.TotalCount = -1;
        AssetCompanyList.SearchAssetCompanyList();
    });
})
$('#emp_lon_height').scroll(function () {
    AssetCompanyList.LoadAssetCompanyList()
})
