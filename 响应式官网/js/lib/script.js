// 剧本

define(['jquery', 'swiper', 'weixin', 'createjs'], function ($, swiper, wx) {
    var self = {}

    self.open = function () {

        if ($('.loading')) {
            self.load();
        }

        if (self.isMobile) {
            $('body').append('<div class="block">请使用竖屏访问本页面</div>');
        }

        //
        var mySwiper = new swiper('.swiper-container', {
            loop: true,
            autoplay: 4000,
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            speed: 1500,

            // 如果需要分页器
            pagination: '.swiper-pagination',

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            effect: 'fade'
        })

        //$('.nx-about-people>div').on('mouseenter', function () {
        //    console.log(11);
        //})

        $('.nx-contact .weixin, .nx-footer .weixin').on('mouseenter', function () {
            $('div', $(this)).show();
        })

        $('.nx-contact .weixin, .nx-footer .weixin').on('mouseleave', function () {
            $('div', $(this)).hide();
        });

        $('.nx-design').on('touchstart', function () {
            location.href = 'http://www.nx-design.net';
        })
    }

    self.isMobile = (function () {
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                isMobile = isIphone || isAndroid;

        return isMobile;
    })();

    self.load = function () {
        var loader = new createjs.LoadQueue(false);

        // 关键！----设置并发数  
        loader.setMaxConnections(5);
        // 关键！---一定要将其设置为 true, 否则不起作用。  
        loader.maintainScriptOrder = true;

        var source = [
            { 'src': 'file/work/01.jpg' },

            { 'src': 'img/loading/1.png' },
            { 'src': 'img/loading/2.png' },
            { 'src': 'img/loading/3.png' },
            { 'src': 'img/loading/4.png' },

            { 'src': 'img/loading/1.jpg' },
            { 'src': 'img/loading/2.jpg' },
            { 'src': 'img/loading/3.jpg' },
            { 'src': 'img/loading/4.jpg' },

            { 'src': 'img/about/carousel/1.jpg' },
            { 'src': 'img/about/carousel/2.jpg' },
            { 'src': 'img/about/carousel/3.jpg' },
            { 'src': 'img/about/carousel/4.jpg' },
            { 'src': 'img/about/carousel/5.jpg' },
            { 'src': 'img/about/carousel/6.jpg' },

            { 'src': 'img/client/carousel/1.jpg' },
            { 'src': 'img/client/carousel/2.jpg' }
        ]

        loader.on("progress", onProgress);
        loader.on("complete", onComplete);
        loader.loadManifest(source, true, '');



        function onComplete(e) {
            //self.share();

            //return;

            //$('.loading').css('background-color', '#fff');


            $('.loading .showImg').html('<div class="showImg4"></div><div class="showImg3"></div><div class="showImg2"></div><div class="showImg1"></div>').show();

            $('.showImg').on('click', function () {
                $('.navbar-default').fadeIn();
                $('.loading').fadeOut();
            })

            var imgs = $('.loading .showImg div');


            setTimeout(function () {
                $(imgs.get(3)).fadeOut();
            }, 3000)

            setTimeout(function () {
                $(imgs.get(2)).fadeOut();
            }, 6000)

            setTimeout(function () {
                $(imgs.get(1)).fadeOut();
            }, 9000)

            setTimeout(function () {
                $(imgs.get(0)).fadeOut();

                $('.navbar-default').fadeIn();
                $('.loading').fadeOut();

            }, 12000);
        }

        function onProgress(e) {
            //console.log(loader.progress);
            // 默认到99，在complete里加载视频地址来到达100%
            $('.loading span').text((loader.progress * 100 | 0) + " %");
        }
    }

    return self;
});





















