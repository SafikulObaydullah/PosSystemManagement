var price = 0;


Handlebars.registerHelper("price", function (dateString) {
    if (dateString == null) {
        return "";
    }
    price = price + dateString;
    return dateString == null ? "" : "Tk" + dateString.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
});



var EmployeeAssetList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteAsset: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Employee/DeleteAssetLite",
                data: { id: id },
                success: function (data) {
                    EmployeeAssetList.SearchLoan();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetAssetById: function (id) {
        OpenRightToLeftModal('/employee/addasset?id=' + id)
    },
    SearchLoan: function () {
        EmployeeAssetList.CurrentPage = 1;
        EmployeeAssetList.TotalCount = -1;
        EmployeeAssetList.LoadLonList();
    },
    LoadLonList: function () {
        if (EmployeeAssetList.LoaderAjax && EmployeeAssetList.LoaderAjax.readyState != 4) {
            return;
        }
        if (EmployeeAssetList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var paramlite = {
            PageNo: EmployeeAssetList.CurrentPage,
            SearchText: SearchText,
            UserGuid: $('#EmployeeId').val(),
        };
        EmployeeAssetList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Employee/AssetLiteList',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                price = 0;
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                EmployeeAssetList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#AsTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (EmployeeAssetList.CurrentPage == 1) {
                    if (EmployeeAssetList.TotalCount == 0) {
                        $(".load_Assetlist").html('<tr><td colspan="8">No Data</td></tr>');
                    } else {
                        $(".load_Assetlist").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_Assetlist").append(sourceHtml(dataa));
                }
                setTimeout(function () {
                    $(".price").text(price == null ? "" : "Tk" + price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                }, 300);
                $(".load_Assetlist").show();
                EmployeeAssetList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownLoadLonList: function () {
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
$(document).ready(function () {
    EmployeeAssetList.LoadLonList()
    $('#SearchDocBtn').click(function () {
        EmployeeAssetList.SearchLoan()
    })
    $('#ApplyDoc').click(function () {
        EmployeeAssetList.SearchLoan()
    })
    $("#SearchAssetBtn").click(function () {
        EmployeeAssetList.CurrentPage = 1;
        EmployeeAssetList.TotalCount = -1;
        EmployeeAssetList.SearchLoan();
    });
    $("#SearchText").keyup(function () {
        EmployeeAssetList.CurrentPage = 1;
        EmployeeAssetList.TotalCount = -1;
        EmployeeAssetList.SearchLoan();
    });
})
$('#emp_lon_height').scroll(function () {
    EmployeeAssetList.LoadLonList()
})
