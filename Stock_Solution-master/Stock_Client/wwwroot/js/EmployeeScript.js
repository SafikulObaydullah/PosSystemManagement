var EmployeeProfileList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    DeleteEmployee: function (id) {
        OpenConfirmationMessageNew("Confirmation", "Are You Sure You Want To Delete?", function () {
            $.ajax({
                type: 'POST',
                url: "/Employee/DeleteEmployee",
                data: { id: id },
                success: function (data) {
                    EmployeeProfileList.Search();
                    if(!data) {
                        OpenErrorMessageNew('Failed', 'Access Denied');
                    }
                }
            });
        });
    },
    GetEmployeeById: function (id) {
        OpenRightToLeftModal('/employee/addprofile?id=' + id)
    },
    GetEmployeeByUId: function (uid) {
        window.open('/employee-profile?uid=' + uid);
    },
    Search: function () {
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
        EmployeeProfileList.LoadEmployeeProfileList();
    },
    LoadEmployeeProfileList: function () {
        if (EmployeeProfileList.LoaderAjax && EmployeeProfileList.LoaderAjax.readyState != 4) {
            return;
        }
        if (EmployeeProfileList.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var active = $("#active_status").val();
        var Branch = $("#Branch").val();
        var HrCompany = $("#HrCompany").val();
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: EmployeeProfileList.CurrentPage,
            SearchText: SearchText,
            active: active,
            Branch: Branch,
            HrCompany: HrCompany
        };
        EmployeeProfileList.LoaderAjax = $.ajax({
            type: "POST",
            url: '/Employee/EmployeeProfileListLite',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                EmployeeProfileList.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#EPTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                $("#total_count").text(TotalCount[0].TotalCount)
                if (EmployeeProfileList.CurrentPage == 1) {
                    $(".load-employeelist").html(sourceHtml(dataa));
                } else {
                    $(".load-employeelist").append(sourceHtml(dataa));
                }
                $(".load-employeelist").show();
                $("#revdatefilter").addClass('display_nn');
                EmployeeProfileList.CurrentPage++;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    },
    DownloadEmployeeListExcel: function () {
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchText = $("#SearchText").val();
        var active = $("#active_status").val();
        var Branch = $("#Branch").val();
        var parm = '?StartDate=' + FromDateTime
            + '&EndDate=' + ToDateTime
            + '&SearchText=' + SearchText
            + '&active=' + active;
        + '&Branch=' + Branch;
        window.location.href = "/Employee/employee-list-download-excel" + parm;
    },

    ClickToUploadBulkExcel: function ()
    {
        $('#click_to_upload').trigger('click');
    },

    DownloadEmployeeListBulkExcel: function () {
       // alert();
        fetch('/Employee/DownloadTemplate')
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'BulkUploadTemplate.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }).catch(error => console.error('Error:', error));
        }
    
};
var ChangeEmployeeStatus = function (id, active) {
    OpenConfirmationMessageNew('Confirmation', 'Are you sure?', function () {
        $.ajax({
            type: 'POST',
            url: "/Employee/ChangeEmployeeStatus",
            data: { id: id, active: active },
            success: function (data) {
                EmployeeProfileList.Search();
                if (!data) {
                    OpenErrorMessageNew('Failed', 'Access Denied');
                }
            }
        });
    })
}

$(document).ready(function () {
   $('#merchantTableId').on('change', '.rowCheckbox', function () {
      // Get the data of the corresponding row when the checkbox is clicked
      var employeeId = $(this).data('employee-id');
      var rowData = getRowData(employeeId);

      // Use the rowData as needed
      console.log(rowData);
   });

   function getRowData(employeeId) {
      var rowData = {};

      // Find the row with the specified EmployeeId
      var row = $('#merchantTableId').find('tr').filter(function () {
         return $(this).find('.rowCheckbox').data('employee-id') == employeeId;
      });

      // If the row is found, retrieve the data
      if (row.length > 0) {
         rowData.employeeId = employeeId;
         rowData.name = row.find('td:eq(2)').text(); // Assuming name is in the third column, adjust as needed
         // Add more properties as needed
      }

      return rowData;
   }

   $("#selectAll").click(function () {
      if ($(this).prop("checked")) {
         $(".rowCheckbox").prop("checked", true);
      } else {
         $(".rowCheckbox").prop("checked", false);
      }
   });
    
   $(".rowCheckbox").click(function () {
    
      if (!$(this).prop("checked")) {
         $("#selectAll").prop("checked", false);
      }
   });

    $("#click_to_upload").change(function (event) {
        var fd = new FormData();
        const files = event.target.files;
        if (files.length > 0) {
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    fd.append('file', files[i]);
                }
                event.target.value = "";
                UploadFile(fd);
            }
            else {
                OpenSuccessMessageNew('Please upload 1file at a time');
            }

        }

    });
    var UploadFile = function (fd) {
        var url = '/DataImport/UploadEmployeeInfoExcelFile';
        $.ajax({
            url: url,
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.success == true) {
                    alert(data.result + " row" + (data.result != 1 ? "s" : "") + " inserted!");
                }
                else {
                    alert("Failed! Please recheck the file")
                }
            },
            error: function (exr) {
                if (typeof exr.statusText != 'undefined') {
                    console.log('Function Status : ' + exr.statusText);
                }
            }
        });
    }

    $("#Search").click(function () {
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
        EmployeeProfileList.Search();
    });
    $("#active_status").change(function () {
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
        EmployeeProfileList.Search();
    });
    $("#addnewprobtn").click(function () {
        EmployeeProfileList.GetEmployeeById(0);
    });
    $("#SearchText").keyup(function () {
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
        EmployeeProfileList.Search();
    });
    $("#Branch").change(function () {
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
        EmployeeProfileList.Search();
    });
    $("#HrCompany").change(function () {
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
        EmployeeProfileList.Search();
    });


    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchText").val("");
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
    });
    $("#reset-date").click(function () {
        $('#datepicker').val("").datepicker("update");
    });
    $("#DateRangeRev").change(function () {
        EmployeeProfileList.Search();
    })
    EmployeeProfileList.picker = new Pikaday({
        field: document.getElementById('ReviewFilterStartDate'),
        format: DateFormat,
        trigger: $('#ReviewFilterStartDate')[0], firstDay: 7
    });
    //EmployeeProfileList.picker = new Pikaday({
    //    field: document.getElementById('StartDate'),
    //    format: DateFormat/*'DD-MM-YYYY'*/,
    //    trigger: $('#StartDate_custom')[0], firstDay: 1
    //});
    //EmployeeProfileList.picker2 = new Pikaday({
    //    field: document.getElementById('EndDate'),
    //    format: DateFormat /*'DD-MM-YYYY'*/,
    //    trigger: $('#EndDate_custom')[0], firstDay: 1
    //});
    EmployeeProfileList.picker2 = new Pikaday({
        field: document.getElementById('ReviewFilterEndDate'),
        format: DateFormat,
        trigger: $('#ReviewFilterEndDate')[0], firstDay: 7
    });
    $("#applybtn").click(function () {
        EmployeeProfileList.CurrentPage = 1;
        EmployeeProfileList.TotalCount = -1;
        EmployeeProfileList.LoadEmployeeProfileList();
    });
    $("#reset").click(function () {
        $("#ReviewFilterStartDate").val("");
        $("#ReviewFilterEndDate").val("");
        $("#SearchText").val("");
        $("#applybtn").val("");
        $('select').val('-1').change()
        EmployeeProfileList.Search();
        EmployeeProfileList.LoadEmployeeProfileList();
    });
    EmployeeProfileList.LoadEmployeeProfileList();
    $("#test_height").scroll(function () {
        console.log("test");
        if (window.innerHeight - 140 + $("#test_height").scrollTop() > $("tr.data:last").position().top + 100) {
            EmployeeProfileList.LoadEmployeeProfileList();
        }
    });
});

