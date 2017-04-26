// 剧本

define(['jquery', 'swiper', 'createjs'], function ($, swiper) {
    var self = {}

    self.open = function () {
        // loading界面
        self.preload();
    }

    self.preload = function () {
        var loader = new createjs.LoadQueue(false);

        // 关键！----设置并发数  
        loader.setMaxConnections(5);
        // 关键！---一定要将其设置为 true, 否则不起作用。  
        loader.maintainScriptOrder = true;

        var source = [
          { "src": "main/loading.gif" }
        ]

        loader.on("complete", onComplete);
        loader.loadManifest(source, true, 'img/');

        function onComplete() {
            $('body').append(self.template.loading);

            self.load();
        }
    }

    self.load = function () {
        var loader = new createjs.LoadQueue(false);

        // 关键！----设置并发数  
        loader.setMaxConnections(5);
        // 关键！---一定要将其设置为 true, 否则不起作用。  
        loader.maintainScriptOrder = true;

        var source = [
          { "src": "logo/logo.jpg" },
          { "src": "logo/sub_logo.jpg" },

          { "src": "main/bg.png" },
          { "src": "main/gg.jpg" },
          { "src": "main/heart.png" },
          { "src": "main/qr.jpg" },

          { "src": "scene01/bg.jpg" },
          { "src": "scene01/slogan.png" },
          { "src": "scene01/title.png" },

          { "src": "scene02/bg.jpg" },
          { "src": "scene02/book.png" },
          { "src": "scene02/button.png" },
          { "src": "scene02/text.png" },
          { "src": "scene02/title.png" },
          { "src": "scene02/xiangkuang.png" },

          { "src": "scene03/bg.jpg" },
          { "src": "scene03/qr.jpg" },
          { "src": "scene03/rule.jpg" },

          { "src": "scene04/bg.jpg" },
          { "src": "scene04/MG7780.png" },
          { "src": "scene04/TS5080.png" },
          { "src": "scene04/TS6080.png" },
          { "src": "scene04/TS8080.png" },
          { "src": "scene04/TS9080.png" },

          { "src": "scene05/bg.jpg" },
          { "src": "scene05/jd.jpg" },
          { "src": "scene05/link1.jpg" },
          { "src": "scene05/link2.jpg" },
          { "src": "scene05/link3.jpg" },
          { "src": "scene05/search.jpg" },
          { "src": "scene05/tmall.jpg" }
        ]

        loader.on("progress", onProgress);
        loader.on("complete", onComplete);
        loader.loadManifest(source, true, 'img/');



        function onComplete(e) {
            // 加载视频地址
            var vid = '948E58A5937951929C33DC5901307461';
            $.get('https://www.canon.com.cn/video/invoking/m/getMobile?vid=' + vid, function (json) {

                //$('.loading span').text('100%');
                $('.loading img').hide();
                $('body').append(self.template.swiper);

                //return;

                self.fixPosition();
                self.bindAction(json);
                self.initSwiper();

            }, 'jsonp');
        }

        function onProgress(e) {
            //console.log(loader.progress);
            // 默认到99，在complete里加载视频地址来到达100%
            //$('.loading span').text((loader.progress * 99 | 0) + " %");
        }
    }

    self.bindAction = function (json) {
        $('.scene01 .s3, .scene02 .s3, .scene03 .s1, .scene04 .s1').on('webkitAnimationEnd', function (e) {
            $('.heart').fadeIn();
        });


        var video = $('.video video');
        $('.scene02 .s2').hammer().on("tap", function (e) {

            $('.video').css('top', '-40px');            

            // 设置视频地址
            video.attr('src', json.value[0].copy);
            video[0].play();
        });

        video.on('timeupdate', function () {

            // 视频结束前执行
            if (video[0].duration > 0 && video[0].currentTime > video[0].duration - 1.5) {

                video[0].pause();
                $('.video').css('top', '-5000px');
            }
        });

        $('.video .close').hammer().on("tap", function (e) {

            $('.video').css('top', '-5000px');
            video[0].pause();
        });



        // 产品等链接绑定
        var className = ['ts6080', 'ts8080', 'ts5080', 'ts9080', 'mg7780', 'search', 'tmall', 'jd', 'link1', 'link2', 'link3', 'scene03 .s1', 'canon-link'];
        var url = [
            'http://m.canon.com.cn/m/products/printer/pixma/ts6080/index.html#form=personal-personal_nav.html,call=multifunction-products_printer_pixma_fax-personal_nav,page=1',
            'http://m.canon.com.cn/m/products/printer/pixma/ts8080/index.html#form=personal-personal_nav.html,call=multifunction-products_printer_pixma_fax-personal_nav,page=1',
            'http://m.canon.com.cn/m/products/printer/pixma/ts5080/index.html#form=personal-personal_nav.html,call=multifunction-products_printer_pixma_fax-personal_nav,page=1',
            'http://m.canon.com.cn/m/products/printer/pixma/ts9080/index.html#form=personal-personal_nav.html,call=multifunction-products_printer_pixma_fax-personal_nav,page=1',
            'http://m.canon.com.cn/m/products/printer/pixma/mg7780/index.html#form=personal-personal_nav.html,call=multifunction-products_printer_pixma_fax-personal_nav,page=1',
            'http://www.canon.com.cn/buy/sale/index.html',
            'https://canon.tmall.com/view_shop.htm?spm=a220m.1000858.0.0.eeTysL&shop_id=112423652&rn=cb531c82abc797dde25dd023b6716f22',
            'https://sale.jd.com/m/act/bdfDKpst2RiYn0uh.html',
            'http://m.canon.com.cn/sticker/',
            'http://m.canon.com.cn/products/printer/pixma/special/ts8080/',
            'http://m.canon.com.cn/specialsite/photogirls/lesson/printer/pr01.html',
            geturl() + 'rule.html',
            'http://www.canon.com.cn'
        ]

        $.each(className, function (index, item) {
            $('.' + item).hammer().on("tap", function (e) {
                location.href = url[index];
                //console.log(url[index]);
            });
        })

        function geturl()
        {
            var path = window.document.location.href;

            var s = path.split('/');
            var result = '';

            for (var i = 0; i < s.length - 1; i++) {
                result += s[i] + '/';
            }

            return result;
        }
    }


    self.swiper = null;
    self.initSwiper = function () {
        // swiper 初始化
        var mySwiper = new swiper('.swiper-container', {
            direction: 'vertical',
            loop: false,
            onInit: function (swiper) {
                swiperAnimateCache(swiper); //隐藏动画元素        

                $('.heart').hammer().on("tap", function (e) {
                    swiper.slideNext();
                });
                //swiper.slideTo(1);
            },
            onSlideChangeEnd: function (swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            },
            onSlideChangeStart: function (swiper) {
                $('.heart').hide();
            }
        })

        setTimeout(function () {
            $('.loading').fadeOut(function () {
                swiperAnimate(mySwiper); //初始化完成开始动画
            })
        }, 1000)
    }



    self.delay = function (fun, delay) {
        return setTimeout(function () { fun() }, delay);
    }

    // 坐标修正
    self.fixPosition = function () {

        var scaleNum = document.documentElement.clientWidth / 640;
        var ele = $('.jsfix');

        ele.each(function () {
            var o = $(this);
            var mode = o.attr('data-mode');

            o.css({
                'width': scaleNum * parseInt(o.css('width')),
                'height': scaleNum * parseInt(o.css('height')),
                'line-height': scaleNum * parseInt(o.css('line-height')) + 'px'
            });

            switch (mode) {

                case 'top-right':
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;

                case 'bottom-left':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;

                case 'bottom-right':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;


                default:
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;
            }
        });
    }

    self.template = {
        loading: '<div class="loading"><img src="img/main/loading.gif"></div>',
        swiper: '<div class="swiper-container">\
                    <div class="heart"><img src="img/main/heart.png"></div>\
                    <div class="swiper-wrapper">\
                        <div class="swiper-slide scene01">\
                            <div class="canon-header">\
                                <div>\
                                    <a href="http://www.canon.com.cn"><img alt="佳能（中国）" src="img/logo/logo.jpg" class="canon-link"></a>\
                                    <img alt="感动常在佳能" src="img/logo/sub_logo.jpg">\
                                </div>\
                            </div>\
                            <div class="gg"></div>\
                            <div class="s1"><img src="img/scene01/bg.jpg"></div>\
                            <div class="s2 ani" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="0.3s"><img src="img/scene01/title.png"></div>\
                            <div class="s3 ani jsfix" data-mode="top-right" swiper-animate-effect="fadeInRight" swiper-animate-duration="1s" swiper-animate-delay="1.3s"></div>\
                        </div>\
                        <div class="swiper-slide scene02">\
                            <div class="s1"><img src="img/scene02/title.png"></div>\
                            <div class="s2 jsfix"><span><img src="img/scene02/button.png"></span></div>\
                            <div class="s3 ani jsfix" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="1.3s"></div>\
                            <div class="s4 ani jsfix" swiper-animate-effect="fadeIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s"></div>\
                        </div>\
                        <div class="swiper-slide scene03">\
                            <div class="s2 jsfix"><img src="img/scene03/qr.jpg"></div>\
                            <div class="s1 ani jsfix" swiper-animate-effect="pulse" swiper-animate-duration="1s" swiper-animate-delay="1s"></div>\
                        </div>\
                        <div class="swiper-slide scene04">\
                            <div class="ts6080 ani jsfix" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="0.5s"></div>\
                            <div class="ts8080 ani jsfix" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="0.7s" data-mode="top-right"></div>\
                            <div class="ts5080 ani jsfix" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="0.9s"></div>\
                            <div class="ts9080 ani jsfix" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="1.1s"></div>\
                            <div class="mg7780 ani jsfix" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="1.3s" data-mode="top-right"></div>\
                            <div class="s1 ani" swiper-animate-effect="bounceIn" swiper-animate-duration="1s" swiper-animate-delay="2.5s"></div>\
                        </div>\
                        <div class="swiper-slide scene05">\
                            <div class="search jsfix"></div>\
                            <div class="tmall jsfix"></div>\
                            <div class="jd jsfix" data-mode="top-right"></div>\
                            <div class="link1 jsfix"></div>\
                            <div class="link2 jsfix" data-mode="top-right"></div>\
                            <div class="link3 jsfix"></div>\
                            <div class="copyright">佳能（中国）有限公司版权所有，未经许可不得转载<br />京ICP备05038060号</div>\
                        </div>\
                    </div>\
                </div>\
                <div class="video"><video x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" preload="auto"></video><div class="close"><i class="iconfont icon-close2"></i></div></div>\
                <div class="mask"></div>'

    }

    return self;

});

//                <div class="s1 ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.8s"></div>\
//<div class="s1 ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.8s"></div>\





















