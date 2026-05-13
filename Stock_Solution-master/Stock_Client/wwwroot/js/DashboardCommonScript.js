var sdate = [];
var pendingsales = [];
var ongoingsales = [];
var completesales = [];
var cancelsales = [];
var totalsales = [];

var pendingsalescount = [];
var ongoingsalescount = [];
var completesalescount = [];
var cancelsalescount = [];
var totalsalescount = [];

var months = [];
var salesdatabar = [];
var statuscategory = [];
var countbycategory = [];
var amtbycategory = [];
$(document).ready(function () {
    $.ajax({
        url: "/Dashboard/GetDashboardChartData",
        type: 'post',
        success: function (data) {
            console.log(data);
            if (data.firstGraph.length > 0) {
                for (var i = 0; i < data.firstGraph.length; i++) {
                    sdate.push(data.firstGraph[i].createdDate)
                }
            }
            if (data.firstGraph.length > 0) {
                for (var i = 0; i < data.firstGraph.length; i++) {
                    pendingsales.push(data.firstGraph[i].amount)
                }
            }
            if (data.secondGraph.length > 0) {
                for (var i = 0; i < data.secondGraph.length; i++) {
                    ongoingsales.push(data.secondGraph[i].amount)
                }
            }
            if (data.thirdGraph.length > 0) {
                for (var i = 0; i < data.thirdGraph.length; i++) {
                    completesales.push(data.thirdGraph[i].amount)
                }
            }
            if (data.fourthGraph.length > 0) {
                for (var i = 0; i < data.fourthGraph.length; i++) {
                    cancelsales.push(data.fourthGraph[i].amount)
                }
            }
            if (data.fifthGraph.length > 0) {
                for (var i = 0; i < data.fifthGraph.length; i++) {
                    totalsales.push(data.fifthGraph[i].amount)
                }
            }
            //count order
            if (data.firstGraph.length > 0) {
                for (var i = 0; i < data.firstGraph.length; i++) {
                    pendingsalescount.push(data.firstGraph[i].totalCount)
                }
            }
            if (data.secondGraph.length > 0) {
                for (var i = 0; i < data.secondGraph.length; i++) {
                    ongoingsalescount.push(data.secondGraph[i].totalCount)
                }
            }
            if (data.thirdGraph.length > 0) {
                for (var i = 0; i < data.thirdGraph.length; i++) {
                    completesalescount.push(data.thirdGraph[i].totalCount)
                }
            }
            if (data.fourthGraph.length > 0) {
                for (var i = 0; i < data.fourthGraph.length; i++) {
                    cancelsalescount.push(data.fourthGraph[i].totalCount)
                }
            }
            if (data.fifthGraph.length > 0) {
                for (var i = 0; i < data.fifthGraph.length; i++) {
                    totalsalescount.push(data.fifthGraph[i].totalCount)
                }
            }
            statuscategory.push("Pending")
            statuscategory.push("On Going")
            statuscategory.push("Completed")
            statuscategory.push("Cancelled")
            statuscategory.push("Total")

            if (pendingsalescount.length > 0) {
                countbycategory.push(pendingsalescount.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                countbycategory.push(0)
            }
            if (ongoingsalescount.length > 0) {
                countbycategory.push(ongoingsalescount.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                countbycategory.push(0)
            }
            if (completesalescount.length > 0) {
                countbycategory.push(completesalescount.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                countbycategory.push(0)
            }
            if (cancelsalescount.length > 0) {
                countbycategory.push(cancelsalescount.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                countbycategory.push(0)
            }
            if (totalsalescount.length > 0) {
                countbycategory.push(totalsalescount.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                countbycategory.push(0)
            }
            //amount
            if (pendingsales.length > 0) {
                amtbycategory.push(pendingsales.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                amtbycategory.push(0)
            }
            if (ongoingsales.length > 0) {
                amtbycategory.push(ongoingsales.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                amtbycategory.push(0)
            }
            if (completesales.length > 0) {
                amtbycategory.push(completesales.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                amtbycategory.push(0)
            }
            if (cancelsales.length > 0) {
                amtbycategory.push(cancelsales.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                amtbycategory.push(0)
            }
            if (totalsales.length > 0) {
                amtbycategory.push(totalsales.reduce((a, b) => parseInt(a) + parseInt(b)))
            } else {
                amtbycategory.push(0)
            }




            InitLineChart(sdate, pendingsales, ongoingsales, completesales, cancelsales, totalsales);
            InitPie(statuscategory, countbycategory)
            InitBarChart(sdate, amtbycategory)
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });
});