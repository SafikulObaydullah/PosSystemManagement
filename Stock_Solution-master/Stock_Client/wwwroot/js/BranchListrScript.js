var EmployeeBranchList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteBranch: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Mgmt/DeleteBranch",
                data: { id: id },
                success: function (data) {
                    EmployeeBranchList.SearchLoan();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetEarById: function (id) {
        OpenRightToLeftModal('/Mgmt/AddBranch?id=' + id)
    },
    SearchLoan: function () {
        EmployeeBranchList.CurrentPage = 1;
        EmployeeBranchList.TotalCount = -1;
        EmployeeBranchList.LoadLonList();
    },
    LoadLonList: function () {
        if (EmployeeBranchList.LoaderAjax && EmployeeBranchList.LoaderAjax.readyState != 4) {
            return;
        }
        if (EmployeeBranchList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchText").val();
        var PayrollId = $("#PayrollId").val();
        var paramlite = {
            PageNo: EmployeeBranchList.CurrentPage,
            SearchText: SearchText,
            PayrollId: PayrollId,
            UserGuid: $('#EmployeeId').val(),
        };
        EmployeeBranchList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Mgmt/GetBranchList',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                EmployeeBranchList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#BRTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (EmployeeBranchList.CurrentPage == 1) {
                    if (EmployeeBranchList.TotalCount == 0) {
                        $(".load_Branchlist").html('<tr><td colspan="4">No Data</td></tr>');
                    } else {
                        $(".load_Branchlist").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_Branchlist").append(sourceHtml(dataa));
                }
                $(".load_Branchlist").show();
                EmployeeBranchList.CurrentPage++;
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
    EmployeeBranchList.LoadLonList()
    $('#SearchDocBtn').click(function () {
        EmployeeBranchList.SearchLoan()
    })
    $('#ApplyDoc').click(function () {
        EmployeeBranchList.SearchLoan()
    })
    $("#SearchLoanBtn").click(function () {
        EmployeeBranchList.CurrentPage = 1;
        EmployeeBranchList.TotalCount = -1;
        EmployeeBranchList.SearchLoan();
    });
    $("#SearchText").keyup(function () {
        EmployeeBranchList.CurrentPage = 1;
        EmployeeBranchList.TotalCount = -1;
        EmployeeBranchList.SearchLoan();
    });
})
$('#emp_lon_height').scroll(function () {
    EmployeeBranchList.LoadLonList()
})