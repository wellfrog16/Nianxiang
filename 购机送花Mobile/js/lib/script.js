// 剧本

define(['jquery', 'swiper', 'weixin', 'createjs'], function ($, swiper, wx) {
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
          { "src": "main/qr1.jpg" },
          { "src": "main/qr2.jpg" },
          { "src": "main/qr3.jpg" },

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

            self.share();

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

    // 设备简单判断
    self.device = (function () {
        var ua = navigator.userAgent.toLowerCase(), device;
        if (/android/.test(ua)) {
            device = 'android';
        }
        else if (/safari/.test(ua)) {
            device = 'safari';
        }
        else {
            device = 'iphone';
        }

        return device;
    })();

    self.bindAction = function (json) {
        $('.scene01 .s3, .scene02 .s3, .scene03 .s1, .scene04 .s1').on('webkitAnimationEnd', function (e) {
            $('.heart').fadeIn();
        });


        var video = $('.video video');
        $('.scene02 .s2').hammer().on("tap", function (e) {

            //$('.video').css('top', '-40px');            
            $('.video').show();
            $('.block').css('z-index', '-1');

            // 设置视频地址
            video.attr('src', json.value[0].copy);
            video[0].play();
            if (self.device == 'iphone') { fullScreen(); }
        });

        video.on('timeupdate', function () {

            if (video[0].duration > 0) {
                if (self.device == 'iphone') { fullScreen(); }
            }

            // 视频结束前执行
            //if (video[0].duration > 0 && video[0].currentTime > video[0].duration - 1.5) {

                //video[0].pause();
                //$('.video').css('top', '-5000px');
            //}
        });


        video.on('pause', function () {

            $('.video').hide();
            $('.block').css('z-index', '9999');
            video[0].pause();
        });

        $('.video .close').hammer().on("tap", function (e) {

            fullScreen();

            return;

            //$('.video').css('top', '-5000px');
            $('.video').hide();
            $('.block').css('z-index', '9999');
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
            'http://m.canon.com.cn/m/buy/sale/index.html',
            'https://content.tmall.com/wow/pegasus/subject/0/1819984936/7542694?spm=0.0.0.0.JtXglD&gccpm=13644688.600.2.subject-1106&id=7542694',
            'https://sale.jd.com/m/act/kobpVmU8d2a.html',
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

        function fullScreen() {

            
            if (video[0].requestFullscreen) {
                video[0].requestFullscreen();
            } else if (video[0].msRequestFullscreen) {
                video[0].msRequestFullscreen();
            } else if (video[0].mozRequestFullScreen) {
                video[0].mozRequestFullScreen();
            } else if (video[0].webkitSupportsFullscreen) {
                video[0].webkitEnterFullscreen();
            }
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
                <div class="video"><video x-webkit-airplay="allow" webkit-playsinline="" playsinline="true"  controls="controls">您的浏览器不支持html5 video</video></div>\
                <div class="mask"></div>'

    }

    //<div class="video"><video x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" preload="auto"></video><div class="close"><i class="iconfont icon-close2"></i></div></div>\
    //<video id="cc_D0C04EC4BA6D26F89C33DC5901307461" x-webkit-airplay="allow" webkit-playsinline="" playsinline="true" width="100%" height="280" src="http://cm14-ccm1-2.play.bokecc.com/flvs/ca/Qx8v5/uvQWEIrSHU-10.mp4?t=1494000189&amp;key=DC0F93D2A1C7AA05A978DCEEE1BBD4D2">您的浏览器不支持html5 video</video>

    // 微信分享
    self.share = function () {
        var host = "http://m.canon.com.cn/m/products/printer/pixma/pixmaevent";
        //var host = 'www.tron-m.com/frog/canon/170414-goujisonghua/Mobile32';
        var project = '';

        $.ajax({
            type: 'post',
            url: host + '/share/jssdk',
            data: { url: window.location.href, m: 'getWxConfig' },
            //url: 'https://www.tron-m.com/wx/jssdk?m=getWxConfig',
            //data: { url: window.location.href },
            dataType: 'json',
            success: function (args) {
                args = args.result;
                //alert(args)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: args.appId, // 必填，公众号的唯一标识
                    timestamp: args.timestamp, // 必填，生成签名的时间戳
                    nonceStr: args.nonceStr, // 必填，生成签名的随机串
                    signature: args.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                    var url = document.location.href,
                        title = '520，带你花式秀恩爱。',
                        desc = '距离产生美，谁说异地恋就不幸福！',
                        imgUrl = host + '/img/main/sharecover.jpg'

                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareWeibo({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQZone({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

                wx.error(function (res) {
                    console.log("wx has error:" + res);
                });
            }
        });
    }

    return self;

});

//                <div class="s1 ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.8s"></div>\
//<div class="s1 ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="1s" swiper-animate-delay="0.8s"></div>\





















