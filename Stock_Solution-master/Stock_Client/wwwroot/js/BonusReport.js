 
var checkedEmployeeExport = "";
$(document).ready(function () {

  
   $('.employeeCheckbox').change(function () {
      var checkedEmployeeId = $('.employeeCheckbox:checked').map(function () {
         return $(this).data('employee-id');
      }).get();

      // Log the selected employee IDs
      console.log('Selected Employee IDs:', checkedEmployeeId.join(', '));

   });
   
   $('.ExportCheckbox').change(function () {
       checkedEmployeeExport = $('.ExportCheckbox:checked').map(function () {
         return $(this).data('employee-id');
      }).get();
      console.log('Selected Employee IDs:', checkedEmployeeExport);

   });





   setTimeout(function () {
      $('#DateRangeRev').val('1').change()
      EmployeeBonusReport.SearchKeyUp(1);
   }, 500)
   $('#btn-search-emp-att').click(function () {
      EmployeeBonusReport.SearchKeyUp(1);
   });
   $('#DownloadBonusReport').click(function () {
      EmployeeBonusReport.Download(1);
   });
   $('#btn-apply-bonus-report-filter').click(function () {
      EmployeeBonusReport.SearchKeyUp(1);
   });
   $('#srch-emp-att').keyup(function () {
      EmployeeBonusReport.SearchKeyUp(1);
   });
   $('#srch-regno-att').keyup(function () {
      EmployeeBonusReport.SearchKeyUp(1);
   });
   $('#srch-designation-att').keyup(function () {
      EmployeeBonusReport.SearchKeyUp(1);
   });
   $('#srch-department-att').keyup(function () {
      EmployeeBonusReport.SearchKeyUp(1);
   });
});
var EmployeeBonusReport = {
   picker: null,
   picker2: null,
   SearchKeyUp: function (PageNo) {
      POSModal.Show();
      var searchtext = encodeURI($('#srch-emp-att').val());
      var reg = encodeURI($('#srch-regno-att').val());
      var des = encodeURI($('#srch-designation-att').val());
      var dept = encodeURI($('#srch-department-att').val());
      var startDate = $("#ReviewFilterStartDate").val();
      var endDate = $("#BonusReviewFilterTodate").val();
      var vals = [];
      var str = "";
      var datas = new Array();
      var arr = []
      var result = [];
      var checkedValues = $('input[name="selected"]:checked').map(function () {
         return this.value;
      }).get();

     /* arr.push(checkedValues);*/
      console.log("checkedValues = ", arr);
      var parm = {
         PageNo: PageNo,
         Searchkey: searchtext,
         RegNo: reg,
         Designation: des,
         Department: dept,
         StartDate: startDate,
         EndDate: endDate,
         exportdata: checkedValues,
         downloadType: checkedEmployeeExport
      }
      console.log("checkedValues = ", checkedValues);
      console.log(parm);
      //var parm = '?StartDate=' + FromDateTime
      //    + '&EndDate=' + ToDateTime
      //    + '&Searchkey=' + searchText
      //    + '&UsedIdNo=' + regno;
      //+ '&Designation=' + designation;
      //+ '&Department=' + department;
      var url = '/report/FilterBonusReport'
      $.ajax({
         url: url,
         type: 'post',
         data: parm,
         success: function (response) {
            $(".grid-list-exc").html('')
            $(".grid-list-exc").append(response);
            POSModal.Hide();
         },
         error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
         }
      });
   },
   Download: function () {
      $('.grid-list-exc').printThis({
         importCSS: true,
         removeInline: false,
         importStyle: true,
         loadCSS: "/wwwroot/css/site.css",
         header: '<h3 style="color:red;text-align:center;">Bonus Report</h3>'
      })
   },
}
var SeeAttDetail = function (userid, date) {
   window.history.pushState({}, '', "/reports/attendance-report/detail?id=" + userid + "&date=" + date);
   $('#main-container-lite').load("/Report/AttendanceReportDetail?id=" + userid + "&date=" + date);
}
var SetInitialValueOfDateFilter = function () {
   $('#filterBy').text("ThisMonth");
   var curr = new Date();
   var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
   var lastday = new Date(firstday);
   lastday.setMonth(lastday.getMonth() + 1);
   lastday.setDate(lastday.getDate() - 1);
   var wkStartDate = (firstday.getDate()) + "-" + (firstday.getMonth() + 1) + "-" + firstday.getFullYear();
   var wkEndDate = (lastday.getDate()) + "-" + (lastday.getMonth() + 1) + "-" + lastday.getFullYear();
   $('#ProductFilterStartDate').val(wkStartDate);
   $('#ProductFilterEndDate').val(wkEndDate);
}
EmployeeBonusReport.picker = new Pikaday({
   field: document.getElementById('ReviewFilterStartDate'),
   format: 'DD-MM-YYYY',
   trigger: $('#ReviewFilterStartDate')[0] //, firstDay: 1
});
EmployeeBonusReport.picker = new Pikaday({
   field: document.getElementById('BonusReviewFilterTodate'),
   format: 'DD-MM-YYYY',
   trigger: $('#BonusReviewFilterTodate')[0] //, firstDay: 1
});
EmployeeBonusReport.picker2 = new Pikaday({
   field: document.getElementById('ReviewFilterEndDate'),
   format: 'DD-MM-YYYY',
   defaultDate: new Date(),
   trigger: $('#ReviewFilterEndDate')[0], firstDay: 1
});

