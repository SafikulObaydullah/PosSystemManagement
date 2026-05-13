$(document).ready(function () {
    $('.rtl_inner_height').height(window.innerHeight - 90);
});
$(window).resize(function () {
    $('.rtl_inner_height').height(window.innerHeight - 90);
});