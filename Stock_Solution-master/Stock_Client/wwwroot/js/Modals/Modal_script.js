$(document).ready(function () {
    $(".top_to_bottom_height").height(window.innerHeight - 97);
    $(".ttb_inner_height_center").height(window.innerHeight - 204);
    $(".ttb_inner_height").height(window.innerHeight - 90);
})
$(window).resize(function () {
    $(".ttb_inner_height").height(window.innerHeight - 90);
    $(".ttb_inner_height_center").height(window.innerHeight - 204);
    $(".top_to_bottom_height").height(window.innerHeight - 97);
})