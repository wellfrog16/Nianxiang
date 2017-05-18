require.config(
{
    baseUrl: "js/libs",
    paths: {
        //"jquery": "//cdn.bootcss.com/jquery/1.12.4/jquery.min",
        "jquery": "jquery-3.1.0.min",
        //"less": "less-2.5.3.min",
        "swiper": "swiper-3.3.1.jquery.min",
        //"swiper": "//cdn.bootcss.com/Swiper/3.3.1/js/swiper.min"
    },
    waitSeconds: 15
});

require(["jquery", "swiper"], function ($, swiper) {

    var mySwiper2 = new swiper('#carousel-tips', {
        direction: 'horizontal',
        //loop: true,
        slidesPerView: 2
    })

    if (!swiper) {
        $(".header").html("1111");
    }

    var index = 0;

    var mySwiper = new swiper('#carousel-banner', {
        direction: 'horizontal',
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,

        // 如果需要分页器
        // pagination: '.swiper-pagination',

        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        effect :'fade',

        // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',

        onSlideChangeEnd: function(swiper){
            //console.log(swiper.activeIndex)
            //if (index++ > 0) { mySwiper2.slideNext(); }
            //if (index++ > 0) { tt(swiper.activeIndex); }
            tt(swiper.activeIndex);
        }

        //onSliderMove: function (swiper) {
        //    $('.tip-box').animate({ marginTop: "0px", height: "0px" });
        //}

        //onSlideNextEnd: function () {
        //    mySwiper2.slideNext();
        //},

        //onSlidePrevStart: function () {
        //    mySwiper2.slidePrev();
        //}
    })

    function tt(y) {

        //console.log('111 ==' + y);

        var z = y - 1;
        if (z == 4) { z = 0; }
        if (z == -1) { z = 4; }

        mySwiper2.slideTo(z);
        //console.log(z);

        var arr = $('.tips');        
        var x = y++;

        if (x > 4) { x = 1; }

        var className = arr.eq(x-1).attr("data-class");

        //console.log(x-1);
        //console.log(className);
        arr.eq(0).removeClass("tips01H").addClass("tips01");
        arr.eq(1).removeClass("tips02H").addClass("tips02");
        arr.eq(2).removeClass("tips03H").addClass("tips03");
        arr.eq(3).removeClass("tips04H").addClass("tips04");
        arr.eq(x - 1).removeClass(className).addClass(className + "H");

        //$('.tip-box').animate({ marginTop: "0px", height: "0px" });

        //if (x == 1) { x = 4; }
        //var className2 = arr.eq(x-2).attr("data-class");
        //arr.eq(x-2).removeClass(className2 + "H").addClass(className2);


        //mySwiper2.slideTo(index-1);
    }




    var startY;
    $("#carousel-tips .tips").on("touchstart", function(e) {
        startY = e.originalEvent.changedTouches[0].pageY;
    });

    var tipBox;

    $('#carousel-tips .tips').on('touchend', function (e) {

        var changeY = e.originalEvent.changedTouches[0].pageY - startY;
        changeY = changeY < 0 ? changeY * -1 : changeY;

        if (changeY > 1) { return; }


        var height = $('div>div', $(this)).height();

        var className = $(this).attr("data-class");

        if ($('.tip-box', $(this)).height() == 0) {
            p();

            var arr = $('.tips');
            arr.eq(0).removeClass("tips01H").addClass("tips01");
            arr.eq(1).removeClass("tips02H").addClass("tips02");
            arr.eq(2).removeClass("tips03H").addClass("tips03");
            arr.eq(3).removeClass("tips04H").addClass("tips04");

            $(this).removeClass(className).addClass(className + "H");
            $('.tip-box', $(this)).animate({ marginTop: (height * -1) + "px", height: height + "px" });

            tipBox = $(this);

            console.log(parseInt(className.substring(5, 6)))

            mySwiper.unlockSwipes();
            mySwiper.slideTo(parseInt(className.substring(5, 6)));
            mySwiper.stopAutoplay();
            mySwiper.lockSwipes();

            //setTimeout(function () {
                
            //    mySwiper.lockSwipes();
            //    console.log("锁定");
            //}, 2000)


        }
        else {
            //$(this).removeClass(className + "H").addClass(className);
            $('.tip-box', $(this)).animate({ marginTop: "0px", height: "0px" });

            mySwiper.startAutoplay();
            mySwiper.unlockSwipes();

            console.log("解锁");
        }
    });

    function p() {
        if (tipBox) {
            var className = tipBox.attr("data-class");
            tipBox.removeClass(className + "H").addClass(className);
            $('.tip-box', tipBox).animate({ marginTop: "0px", height: "0px" });
        }
    }

    var mask;

    $(".nav-link").on("touchstart", function (e) {
        startY = e.originalEvent.changedTouches[0].pageY;
    });

    $(".nav-link").on("touchend", function (e) {
        var changeY = e.originalEvent.changedTouches[0].pageY - startY;
        changeY = changeY < 0 ? changeY * -1 : changeY;

        if (changeY > 1) { return; }

        if (parseInt($('.nav-mask', $(this)).css("left")) < 0) { return false; }

        t();
        var x = $(this).outerWidth() * -1;
        $('.nav-mask', $(this)).animate({ left: x });

        mask = $('.nav-mask', $(this));

        return false;

    });

    function t() {
        if (mask) { mask.animate({ left: 0 }); }
    }


    $("a").on("touchstart", function (e) {
        location.href = $(this).attr('href');
    });

    //$(".swiper-button-prev").on("touchstart", function (e) {
    //    $('.tip-box').animate({ marginTop: "0px", height: "0px" });
    //});

    //$(".swiper-button-next").on("touchstart", function (e) {
    //    $('.tip-box').animate({ marginTop: "0px", height: "0px" });
    //});
});