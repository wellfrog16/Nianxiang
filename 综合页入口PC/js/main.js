require.config(
{
    baseUrl: "js/libs",
    paths: {
        "jquery": "//cdn.bootcss.com/jquery/1.12.4/jquery.min",
        //"jquery": "jquery-3.1.0.min",
        "less": "less-2.5.3.min"
    },
    waitSeconds: 15
});

require(["jquery", "carousel"], function ($, carousel) {

    var x = new carousel();
    x.config.target = $(".carousel-imgs img");
    x.config.button = $(".carousel-tips>li");
    x.bind();
    x.auto();


    //$(".nav-banner>div").on('click', function () {
    //    alert($('div', $(this)).width());
    //})

    //$(".carousel-tips>li").on('click', function () {
    //    var height = $('div>div', $(this)).height();
    //    $('div', $(this)).animate({ height: height + "px" });
    //})

    //$(".carousel-tips>li").on('mouseleave', function () {
    //    $('div', $(this)).animate({ height: "0px" });
    //})

    $(".nav-banner>div").on('mouseenter', function () {
        var width = $('div', $(this)).width();
        $('div', $(this)).animate({ left: (width * -1) + "px" });
    })

    $(".nav-banner>div").on('mouseleave', function () {
        $('div', $(this)).animate({ left: "0px" });
    })
});