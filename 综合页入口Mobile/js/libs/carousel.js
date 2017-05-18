// 专属轮播

define(["jquery"], function ($) {

    return function () {
        this.config = {}

        var button, target;
        var current = 0, next = 1, index;
        var flagPause = false, flagAnimate = false;
        var timer;

        // 绑定关联
        this.bind = function()
        {
            var self = this;
            button = this.config.button;
            target = this.config.target;

            button.on('click', function () {

                var height = $('div>div', $(this)).height() + 15;
                console.log(height);

                // 防止同一tab连续点击
                if ($(this).index() == current)
                {
                    index = $(this).index();
                    button.eq(index).removeClass("tips0" + (index + 1)).addClass("tips0" + (index + 1) + "H");
                    //$("div", button.eq(index)).show();
                    $('>div', $(this)).animate({ marginTop: (height * -1) + "px", height: height + "px" });

                    button.eq(index).on('mouseleave', function () {
                        $(this).unbind("mouseleave");
                        $(this).removeClass("tips0" + (index + 1) + "H").addClass("tips0" + (index + 1));
                        //$("div", $(this)).hide();
                        $('>div', $(this)).animate({ marginTop: "0px", height: "0px" });
                    })
                    console.log('重复点击'); return false;
                }

                //var height = $('div>div', $(this)).height() + 15;
                //console.log(height);
                $('>div', $(this)).animate({ marginTop: (height*-1) + "px", height: height + "px" });

                // 停止自动播放和正在执行的动画
                self.pause();
                target.eq(current).stop(true);

                index = $(this).index();
                button.eq(index).removeClass("tips0" + (index + 1)).addClass("tips0" + (index + 1) + "H");
                $("div", button.eq(index)).show();

                button.eq(index).on('mouseleave', function () {
                    self.auto();
                    $(this).unbind("mouseleave");
                    $(this).removeClass("tips0" + (index + 1) + "H").addClass("tips0" + (index + 1));
                    //$("div", $(this)).hide();
                    $('>div', $(this)).animate({ marginTop: "0px", height:"0px" });
                })

                // 大banner直接切换
                target.eq(current).hide();
                target.eq(index).css({ 'z-index': 1 }).show();                
                current = index;
                next = current + 1;
                if (next >= 4) { next = 0; }

                //target.eq(current).fadeOut('normal', function(){
                //    target.eq(index).fadeIn(1500);
                //    current = index;
                //    next = current + 1;
                //    if (next >= 4) { next = 0; }
                //});

                //var _current = current, _index = index;
                //current = index;
                //next = current + 1;
                //if (next >= 4) { next = 0; }

                //flagAnimate = true;

                //target.hide();
                //target.eq(current).show();
                ////target.eq(index).hide();
                ////target.eq(index).css("opacity", 0);
                //target.eq(current).css({ 'z-index': 0 });
                //target.eq(index).css({ 'z-index': 1 }).fadeIn(1500, function () {
                //    target.eq(current).hide();
                //    console.log('完成啦啦啦');
                //    current = index;
                //    next = current + 1;
                //    if (next >= 4) { next = 0; }
                //    flagAnimate = false;
                //});
            })

            // 第一张图显示
            // target.hide();
            target.eq(0).show();
        }

        // 自动播放
        this.auto = function () {
            var delay = 3000;

            timer = setTimeout(function () {
                //target.eq(current).fadeOut('normal', function () {
                //    target.eq(next).fadeIn(1500);
                //    current = next;
                //    next++;
                //    if (next >= 4) { next = 0; }
                //});

                //var _current = current, _next = next;

                //current = next;
                //next++;
                //if (next >= 4) { next = 0; }

                target.eq(current).css({ 'z-index': 0 });
                target.eq(next).css({ 'z-index': 1 }).fadeIn(1500, function () {
                    target.eq(current).hide();
                    current = next;
                    next++;
                    if (next >= 4) { next = 0; }
                });


                timer = setTimeout(arguments.callee, delay);
            }, delay);
        }

        // 暂停（仅对自动播放有效）
        this.pause = function () {
            clearTimeout(timer);
            target.css("opacity", 1);
            target.eq(current).hide();
            current = next;
            next++;
            if (next >= 4) { next = 0; }
        }
    }
});