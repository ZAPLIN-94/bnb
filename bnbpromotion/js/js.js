$(document).ready(function() {
			h = $(window).height();
            w = $(window).width();
            $("header").css("height", h * 0.525);
            $("header .icon").css({"height": w * 0.13, "width": w * 0.13});
            $("header span").css("height", w * 0.13);
            $(".proMask").css("height", h);
            $(".proLike").css("min-width", w * 0.13);
            $(".footerRight").css({"max-width": w * 0.32, "min-width": w * 0.32});
            $(".footerRight2").css({"max-width": w * 0.32, "min-width": w * 0.32});
            $(".conditionList li strong").css("max-width", w * 0.6);
            $(".promTime ul li span").css("width", w -110);
            $(".grade").css({
                "min-height": w * 0.165,
                "-webkit-background-size": w * 0.165,
                "background-size": w * 0.165,
                "padding-left": w * 0.205
            });
            if (w == 320) {
                $("header .time").css("right", w * 0.05);
                var s = $(".dist").html();
                $(".dist").html(s.substr(0, 11) + "...");
                $(".footerCenter").css({"max-width": w * 0.42, "min-width": w * 0.42});
            }
            else {
                $("header .time").css("right", w * 0.1);
                $(".footerCenter").css({"max-width": w * 0.48, "min-width": w * 0.48});
            }
            $(".proMask").click(function(){
                $(this).css("display","none");
            })
            
});	