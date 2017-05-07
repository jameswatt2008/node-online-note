$(function () {
    $('.main').height(window.innerHeight - 98);
    $(window).resize(function () {
        $('.main').height(window.innerHeight - 98);
    });
});