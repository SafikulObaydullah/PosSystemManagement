var ManageGroup = function () {
    
    var url = "/Dashboard/ManageGroup";
    var param = {
        
        

        
        Name: $("#ManageGroups").val(),
        



    };

    console.log(param);
    $.ajax({
        type: 'POST',
        url: url,
        data: param,
        dataType: "json",
        success: function (data) {
            console.log("xczxc");
            
        },
        error: function (request, error) {

        }
    });
}
$(document).ready(function () {
    $("#ManageGroups").click(function () {
        ManageGroup();
    })

})