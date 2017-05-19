// 剧本

define(['jquery', 'swiper', 'weixin'], function ($, swiper, wx) {
    var self = {}

    self.open = function () {
        var mySwiper = new swiper('.swiper-container', {
            loop: true,
            autoplay: 6000,
            paginationClickable: true,
            autoplayDisableOnInteraction:false,

            // 如果需要分页器
            pagination: '.swiper-pagination',

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            effect:'fade'
        })

        //$('.nx-about-people>div').on('mouseenter', function () {
        //    console.log(11);
        //})

        $('.nx-contact .weixin, .nx-footer .weixin').on('click', function () {
            $('div', $(this)).toggle();
        })

    }

    return self;
});





















