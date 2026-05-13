
var adsdate = [];
var adssales = [];
var catun = [];
var category = [];
var months = [];
var salesdatabar = [];
var salestd = [];
var sdatetd = [];
$(document).ready(function () {
    $.ajax({
        url: "/Dashboard/GetChartData",
        type: 'post',
        success: function (data) {
            if (data.success) {
                console.log(data);
                for (var i = 0; i < data.result.ads.length; i++) {
                    adsdate.push(data.result.ads[i].salesDate)
                }
                for (var i = 0; i < data.result.ads.length; i++) {
                    adssales.push(data.result.ads[i].sales)
                }
                InitLineChart(adsdate, adssales);
                for (var i = 0; i < data.result.salesByCat.length; i++) {
                    catun.push(parseInt(data.result.salesByCat[i].totalUnit))
                    category.push(data.result.salesByCat[i].category)
                }
                console.log(category);
                InitPie(catun, category)
                for (var i = 0; i < data.months.length; i++) {
                    months.push(data.months[i])
                }
                console.log(data.months);
                salesdatabar.push(data.result.mom.first)
                salesdatabar.push(data.result.mom.second)
                salesdatabar.push(data.result.mom.third)
                salesdatabar.push(data.result.mom.fourth)
                salesdatabar.push(data.result.mom.fifth)
                salesdatabar.push(data.result.mom.sixth)
                InitBarChart(salesdatabar, months)
                for (var i = 0; i < data.result.std.length; i++) {
                    salestd.push(data.result.std[i].sales)
                    sdatetd.push(data.result.std[i].salesDate)
                }
                InitPieChart2(salestd, sdatetd);
            }
            else {
                $.notify("Failed to retrieve data");
            }
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });
});