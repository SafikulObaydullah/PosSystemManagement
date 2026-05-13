

$(document).ready(function () {
    
    $("#reset").click(function () {
        $("#StartDate").val("");
        $("#EndDate").val("");
    });
    picker = new Pikaday({
        field: document.getElementById('StartDate'),
        
        format: 'MM/DD/YYYY',
        trigger: $('#StartDate_custom')[0], firstDay: 1
    });
    picker2 = new Pikaday({
        field: document.getElementById('EndDate'),
        format: 'MM/DD/YYYY',
        trigger: $('#EndDate_custom')[0], firstDay: 1

        
    });
    
});
$(window).resize(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 100);
})


var picker;
$("#reset-date").click(function () {
    $('#datepicker').val("").datepicker("update");
})