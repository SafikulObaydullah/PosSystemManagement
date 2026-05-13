
var confirmdeleterider = function (id) {
    $.ajax({
        type: 'POST',
        url: "/Driver/DeleteRider",
        dataType: "JSON",
        data: { id: id },
        success: function (data) {
            OpenSuccessMessageNew("Successful!", "Deleted Successfully!", function () {
                window.location.reload();

            });
        }
    });
}

var searchrider = function () {
    //$("#rsrch").load("/driver/driversearch?searchtext=" + $(".srchrider").val());
    //window.location.href = "/driver/Driver-List?searchtext="+$(".srchrider").val();
    //$("#rsrch").load("/driver/driversearch?searchtext=" + $(".srchrider").val());

    DriverList.LoadRiderList();

}
var DriverList = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,

    DeleteRider: function (id) {
        OpenConfirmationMessageNew("", "Are you sure?", function () {
            confirmdeleterider(id);
        });
    },

    searchrider: function () {
        DriverList.CurrentPage = 1;
        DriverList.TotalCount = -1;
        DriverList.LoadRiderList();
    },

    LoadRiderList: function () { 

        if (DriverList.LoaderAjax && DriverList.LoaderAjax.readyState != 4) {
            //PendingOrder.LoaderAjax.abort();
            return;
        }
        if (DriverList.TotalCount == $("tr.data").length) {
            return;
        }

        var SearchText = $("#SearchText").val();
        var FromDateTime = $("#StartDate").val();
        var ToDateTime = $("#EndDate").val();
         

        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: DriverList.CurrentPage,
            SearchText: SearchText,
        };

        DriverList.LoaderAjax =$.ajax({
            type: "POST",
            url: '/Driver/DriverListLite',
            dataType: "JSON",
            data: paramlite,
            cache: false,
            success: function (data) {
                console.log(data);
                var dataa = JSON.parse(data.data);

                var TotalCount = dataa.TotalCount;
                console.log("Total Count: " + TotalCount[0].TotalCount)
                DriverList.TotalCount = TotalCount[0].TotalCount;

                var empTemplate = $("#hbTemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);

                if (DriverList.CurrentPage == 1) {
                    $(".load-rider-list").html(sourceHtml(dataa));
                } else {
                    $(".load-rider-list").append(sourceHtml(dataa));
                } 
                $(".load-rider-list").show();

                DriverList.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, this page didn't load properly. Please try again.")
            }
        });
    }
};



$(document).ready(function () { 
    $("#addnewriderbutton").click(function () {
        console.log('Rider');
        OpenTopToBottomModal("/Driver/newdriver")
    });
    DriverList.picker = new Pikaday({
        field: document.getElementById('StartDate'),

        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    DriverList.picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1
    });
    $("#Search").click(function () {
        DriverList.searchrider();
    });
    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
        $("#SearchText").val("");
        DriverList.CurrentPage = 1;
        DriverList.TotalCount = -1;
    });
    DriverList.LoadRiderList();

});

$(window).scroll(function () {
    if ($("tr.data:last").length > 0) {
        if (window.innerHeight + window.scrollY > $("tr.data:last").position().top + 100) {
            DriverList.LoadRiderList();
        }
    }

});





