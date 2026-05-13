var EmployeeEduList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteEdu: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want to Delete?", function () {
            $.ajax({
                type: 'post',
                url: "/Mgmt/DeleteEducation",
                data: { id: id },
                success: function (data) {
                    EmployeeEduList.Search();
                    if (!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    } else {
                        OpenSuccessMessageNew('Success', 'Deleted');
                    }
                }
            });
        });
    },
    GetEduById: function (id) {
        OpenRightToLeftModal('/Mgmt/AddEducation?id=' + id)
    },
    Search: function () {
        EmployeeEduList.CurrentPage = 1;
        EmployeeEduList.TotalCount = -1;
        EmployeeEduList.LoadDocList();
    },
    LoadDocList: function () {
        if (EmployeeEduList.LoaderAjax && EmployeeEduList.LoaderAjax.readyState != 4) {
            return;
        }
        if (EmployeeEduList.TotalCount == $("tr.data").length) {
            return;
        }
        var SearchText = $("#SearchDoc").val();
        var DocType = $("#DocType").val();
        var paramlite = {
            PageNo: EmployeeEduList.CurrentPage,
            SearchText: SearchText,
            Area: DocType,
            LoginUserId: $("#regid").val(),
        };
        EmployeeEduList.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Mgmt/GetEducationList',
            dataType: 'json',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                EmployeeEduList.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#EDocTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (EmployeeEduList.CurrentPage == 1) {
                    if (EmployeeEduList.TotalCount == 0) {
                        $(".load-EmployeeEduList").html('<tr><td colspan="7" class="text-center">No Education found</td></tr>');
                    } else {
                        $(".load-EmployeeEduList").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load-EmployeeEduList").append(sourceHtml(dataa));
                }
                $(".load-EmployeeEduList").show();
                EmployeeEduList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadDocList: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var active = $("#active_status").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchText
            + '&active=' + active;
        //window.location.href = "/Employee/employee-download-excel" + parm;
    }

};
$(document).ready(function () {
    EmployeeEduList.LoadDocList()
    $('#SearchDocBtn').click(function () {
        EmployeeEduList.Search()
    })
    $('#ApplyDoc').click(function () {
        EmployeeEduList.Search()
    })
})
$('#emp_doc_height').scroll(function () {
    EmployeeEduList.LoadDocList()
})