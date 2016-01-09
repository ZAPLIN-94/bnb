function  androidProData(url,data){
    $(document).ready(function() {
        pageData = new Array();
        var person = new Person();
        person.requestCommit(url, data)
        console.debug(person.getRequestData());
        document.title = JSON.stringify(person.getRequestData().data.shareInfo);
        var shareTitle=person.getRequestData().data.shareInfo.title;
        var productType=person.getRequestData().data.productBaseInfo.productType;

       
        //sellStatus==1是活动进行中0是结束图标还没弄上去
        if(person.getRequestData().data.productBaseInfo.status==3){
            $(".status").addClass('status2');
            $(".footerRight").css("display","none");
            $(".footerRight2").css("display","block");
            $(".footerRight2").html("优惠已售罄");
        }
        else if(person.getRequestData().data.productBaseInfo.status==4){
            $(".time").html("优惠即将开始");
            $(".footerRight").css("display","none");
            $(".footerRight2").css("display","block");
            $(".footerRight2").html("优惠即将开始");
        }
        else if(person.getRequestData().data.productBaseInfo.status==2||person.getRequestData().data.productBaseInfo.status==0){
            $(".status").addClass('status1');
            $(".footerRight").css("display","none");
            $(".footerRight2").css("display","block");
            $(".footerRight2").html("优惠已结束");
        }

        $.each(person.getRequestData().data.productBaseInfo.imgList, function (i) {
            $("#focus .bd ul").append('<li><a href="javascript:;"><img _src="' + person.getRequestData().data.productBaseInfo.imgList[i] + '?imageView2/1/w/' + aa * 2 + '/h/' + h + '" /></a></li>');

            TouchSlide({
                slideCell: "#focus",
                titCell: ".hd ul",
                mainCell: ".bd ul",
                effect: "left",
                autoPage: true,
                switchLoad: "_src"
            });
        })
        $(".focus .bd li ").css("height", h * 0.525);
        $(".title").html(person.getRequestData().data.productBaseInfo.productName);
        //距离distance
        if (person.getRequestData().data.hotelBaseInfo.distanceDesc == undefined) {
            $(".dist").css("display", "none")
        }
        else {
            $(".dist").html(person.getRequestData().data.hotelBaseInfo.distanceDesc)
        }
        //优惠评级
        if (person.getRequestData().data.productBaseInfo.grade == 2) {
            $(".grade").addClass("chaoZhi");
        }
        else if (person.getRequestData().data.productBaseInfo.grade== 3) {
            $(".grade").addClass("zhenHan");
        }
        $(".grade").html(person.getRequestData().data.promotionBaseInfo.gradeTitle);
        //倒计时
        var Begin = new Date(parseInt(person.getRequestData().data.productBaseInfo.saleBegintime));
        var Beginy = Begin.getFullYear(); //获取完整的年份(4位,1970-????)
        var Beginm = Begin.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var Begind = Begin.getDate();
        var end = new Date(parseInt(person.getRequestData().data.productBaseInfo.saleEndtime));
        var year = end.getFullYear();
        var month = end.getMonth() + 1;
        var day = end.getDate();
        var hour = end.getHours();
        var minute = end.getMinutes();
        var second = end.getSeconds();
        time(year, month, day, hour, minute, second)
        if (days <= 30 && person.getRequestData().data.productBaseInfo.status == 1 && days >=1) {
            $(".time").html(days);

        }
        else {
            $(".time").css("display", "none");
        }
        //优惠时间
        $(".promTime ul li .yuding").html(Beginy + "." + Beginm + "." + Begind + "--" + year + "." + month + "." + day);
        $(".promTime ul li .ruzhu").html(person.getRequestData().data.promotionBaseInfo.timeTitle);
        //brandIcon
        $("header .icon").css({
            "background": "url(" + person.getRequestData().data.hotelBaseInfo.brandIcon + ") 0 0 no-repeat",
            "background-size": w * 0.13,
            "-webkit-background-size": w * 0.13
        })
        //ota价格hotelPrice判断类型是否是下午茶
        //ota价格hotelPrice判断类型是否是下午茶objectType 2是优惠
        if(person.getRequestData().data.hotelBaseInfo==""){
            $(".ota").css("display","none");
            $(".hotelDetail").css("display","none");
        }
        if(person.getRequestData().data.productBaseInfo.objectType==2){
            if(person.getRequestData().data.promotionBaseInfo.subType==210){
                if(person.getRequestData().data.hotelBaseInfo.price==-1){
                    $(".otaPrice span").html("可能有房").css("color","#d13f4c");
                }
                else{
                    $(".otaPrice span").html(person.getRequestData().data.hotelBaseInfo.price);
                }
            }
            else{
                $(".ota").css("display","none");
            }

        }
        else{
            $(".ota").css("display","none");
        }


        //优惠亮点
        /*console.debug(person.getRequestData().data.promotion.highLights);*/
        if (person.getRequestData().data.promotionBaseInfo.highlights == undefined) {
            $(".highLights").css("display", "none");
        }
        else if (person.getRequestData().data.promotionBaseInfo.highlights.length >= 100) {
            $(".highLightsContent").html(person.getRequestData().data.promotionBaseInfo.highlights.substr(0, 100) + "...");
        }
        else {
            $(".highLightsContent").html(person.getRequestData().data.promotionBaseInfo.highlights);
            $("#btn1").css("display", "none");
        }
        $("#btn1").toggle(function () {

            $(this).children("span").html("收起");
            $(this).children("i").html("&#xe641;");
            $(".highLightsContent").html(person.getRequestData().data.promotionBaseInfo.highlights);

        }, function () {
            $(this).children("span").html("展开全部");
            $(this).children("i").html("&#xe619;");
            $(".highLightsContent").html(person.getRequestData().data.promotionBaseInfo.highlights.substr(0, 100) + "...");

        });
        //优惠内容还可优化
        if (!person.getRequestData().data.promotionBaseInfo.promotionEquityList) {
            $(".promotionEquity").css("display", "none");
        }
        else {
            $.each(person.getRequestData().data.promotionBaseInfo.promotionEquityList, function (i) {
                pageData.push([i]);
                $(".promotionEquity ul").append("<li><span>" + person.getRequestData().data.promotionBaseInfo.promotionEquityList[i] + "</span></li>");
            })
            for (var a = pageData.length; a > 3; a--) {
                $(".promotionEquity ul li").eq(a - 1).css('display', 'none');
            }
            if (pageData.length <= 3) {
                $("#btn2").css("display", "none");
            }
            $("#btn2").toggle(function () {
                $(".promotionEquity ul li").css('display', 'block');
                $(this).children("span").html("收起");
                $(this).children("i").html("&#xe641;");
            }, function () {
                for (var a = pageData.length; a > 3; a--) {

                    $(".promotionEquity ul li").eq(a - 1).css('display', 'none');
                }
                $(this).children("span").html("展开全部");
                $(this).children("i").html("&#xe619;");
            });
        }

        //优惠评论还可优化
        $(".promComment h2 span").html(person.getRequestData().data.productBaseInfo.commentCount);
        if(person.getRequestData().data.productBaseInfo.commentCount==0){
            $(".proFooter .footerLeft").html("评论");
        }
        else{
            $(".proFooter .footerLeft").html(person.getRequestData().data.productBaseInfo.commentCount);
        }

        if (person.getRequestData().data.productBaseInfo.commentList == undefined) {
            $(".promComment").css("display", "none");
        }
        else {
            $.each(person.getRequestData().data.productBaseInfo.commentList, function (i) {
                $(".promComment .promCommentWrap").append('<dl><dt></dt><dd><span class="commentTop"><strong>' + person.getRequestData().data.productBaseInfo.commentList[i].nickName + '</strong><i class="commentTime">15-10-21</i></span><span class="commentContent">' + person.getRequestData().data.productBaseInfo.commentList[i].context + '</span><div class="btn commentBtn" id="' + i + '" ><span>展开评论</span><i class="iconfont"></i></div></dd></dl>');
            })
            for (var c = $(".promComment .promCommentWrap dl").length; c > 0; c--) {
                var headerIcon;
                headerIcon = person.getRequestData().data.productBaseInfo.commentList[c - 1].headImgUrl;

                if (headerIcon == undefined) {
                    headerIcon = "http://7xio74.com2.z0.glb.qiniucdn.com/default_user_head.gif";
                }
                $(".promComment .promCommentWrap dl").eq(c - 1).children("dt").css({
                    "background": 'url(' + person.getRequestData().data.productBaseInfo.commentList[c - 1].headImgUrl + ') 0 0 no-repeat',
                    "background-size": "50px 50px",
                    "-webkit-background-size": "50px 50px"
                })
                if (person.getRequestData().data.productBaseInfo.commentList[c - 1].context.length <= 50) {
                    $(".promComment .promCommentWrap dl").eq(c - 1).children("dd").children("div").css("display", "none");
                }
                else {
                    $(".promComment .promCommentWrap dl").eq(c - 1).children("dd").children(".commentContent").html(person.getRequestData().data.productBaseInfo.commentList[c - 1].context.substr(0, 50) + "...");
                }
                var upDate = new Date(parseInt(person.getRequestData().data.productBaseInfo.commentList[c - 1].updateTime));
                var upDatey = upDate.getFullYear(); //获取完整的年份(4位,1970-????)
                var upDatem = upDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
                var upDated = upDate.getDate();
                $(".promComment .promCommentWrap dl").eq(c - 1).children("dd").children(".commentTop").children(".commentTime").html(upDatey + "-" + upDatem + "-" + upDated)

            }

            $(".commentBtn").toggle(function () {

                var d = $(this).attr("id");
                $(this).children("span").html("收起评论");
                $(this).children("i").html("&#xe641;");
                $(this).siblings(".commentContent").html(person.getRequestData().data.productBaseInfo.commentList[d].context);

            }, function () {
                var d = $(this).attr("id");
                $(this).children("span").html("展开评论");
                $(this).children("i").html("&#xe619;");
                $(this).siblings(".commentContent").html(person.getRequestData().data.productBaseInfo.commentList[d].context.substr(0, 50) + "...")
            });


        }


//优惠条件conditionList

        if (person.getRequestData().data.promotionBaseInfo.conditionList == undefined) {
            $(".conditionList").css('display', 'none')
        }
        else {
            $.each(person.getRequestData().data.promotionBaseInfo.conditionList, function (i) {
                //StepDesc.conditionWay==1访问网页
                //StepDesc.conditionWay==2拨打电话
                $(".conditionList ul").append('<li><strong style="max-width: 248.4px;">' + person.getRequestData().data.promotionBaseInfo.conditionList[i].title + '</strong><span>如何获取？</span></li>');
            })
            //person.getRequestData().data.promotion.conditionList[i].conditionWayValue 链接或电话 person.getRequestData().data.promotion.conditionList[i].conditionDesc描述person.getRequestData().data.promotion.conditionList[i].conditionWay
            for (var b = $(".conditionList ul li").length; b > 0; b--) {
                if (person.getRequestData().data.promotionBaseInfo.conditionList[b - 1].conditionWay  ==undefined) {
                    $(".conditionList ul li").eq(b - 1).children("span").css("display", "none");
                }
                else if (person.getRequestData().data.promotionBaseInfo.conditionList[b - 1].conditionWay == "1") {
                    $(".conditionList ul li").eq(b - 1).children("span").click(function () {
                        $(".proMask ").css("display", "block");
                        $(".proMaskBtn").css("display", "none");
                        var f=$(this).parent().index();
                        $(".proMask .proMaskCon").html(person.getRequestData().data.promotionBaseInfo.conditionList[f].conditionDesc);
                        $(".proMaskBtn1 a").html("访问网页").attr("href",""+person.getRequestData().data.promotionBaseInfo.conditionList[f].conditionWayValue);
                    })
                }
                else if (person.getRequestData().data.promotionBaseInfo.conditionList[b - 1].conditionWay == "2") {
                    $(".conditionList ul li").eq(b - 1).children("span").click(function () {
                        $(".proMask ").css("display", "block");
                        $(".proMaskBtn").css("display", "none");
                        var f=$(this).parent().index();
                        $(".proMask .proMaskCon").html(person.getRequestData().data.promotionBaseInfo.conditionList[f].conditionDesc);
                        $(".proMaskBtn1 a").html("拨打电话").attr("href","tel://"+person.getRequestData().data.promotionBaseInfo.conditionList[f].conditionWayValue);
                    })
                }
            }
        }


//优惠价格参考价：referPrice
        //是否是几何价可优化
        if (person.getRequestData().data.productBaseInfo.plusPrice == undefined) {
            if (person.getRequestData().data.productBaseInfo.referPrice == undefined) {

                $(".footerCenter .yuanJia ").css("display", "none ");
                if (person.getRequestData().data.productBaseInfo.pieces == 1) {
                    $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.price );
                    $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.piecesUnit);
                }
                else {
                    $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.price );
                    $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.pieces +person.getRequestData().data.productBaseInfo.piecesUnit);
                    /*$(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.price + " 起/ " + person.getRequestData().data.productBaseInfo.pieces + person.getRequestData().data.productBaseInfo.piecesUnit);*/
                }
                $(".footerCenter .proJia").css("line-height", "2.5rem");
            }
            else {
                if (person.getRequestData().data.productBaseInfo.pieces == 1) {
                    $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.price );
                    $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.piecesUnit);
                   /* $(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.price + " 起/" + person.getRequestData().data.productBaseInfo.piecesUnit);*/
                    $(".footerCenter .yuanJia ").html(person.getRequestData().data.productBaseInfo.referPrice + " 起/" + person.getRequestData().data.productBaseInfo.piecesUnit);
                }
                else {
                    $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.price );
                    $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.piecesUnit);
                   /* $(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.price + " 起/ " + person.getRequestData().data.productBaseInfo.pieces + person.getRequestData().data.productBaseInfo.piecesUnit);*/
                    $(".footerCenter .yuanJia ").html(person.getRequestData().data.productBaseInfo.referPrice + " 起/" + person.getRequestData().data.productBaseInfo.pieces +person.getRequestData().data.productBaseInfo.piecesUnit);
                }


            }

        }
        else {
            if (person.getRequestData().data.productBaseInfo.plusPrice == -1) {
                if(person.getRequestData().data.productBaseInfo.price==undefined){
                    $(".footerCenter .plusJia").html("几何PLUS用户享受更低价").css("line-height", "2.5rem");
                    $(".footerRight").css("display", "none");
                    $(".footerRight2").css("display", "block");
                    $(".footerCenter .yuanJia ").css("display", "none ");
                    $(".footerCenter .proJia ").css("display", "none ");
                }
                else{
                    $(".footerCenter .proJia").html(" 几何PLUS用户享受更低价");
                    if (person.getRequestData().data.productBaseInfo.pieces == 1) {
                        $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.price);
                        $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.piecesUnit);
                        /*$(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.price + " 起/" + person.getRequestData().data.productBaseInfo.piecesUnit);*/
                    }
                    else {
                        $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.price);
                        $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.pieces  + person.getRequestData().data.productBaseInfo.piecesUnit);
                       /* $(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.price + " 起/ " + person.getRequestData().data.productBaseInfo.pieces  + person.getRequestData().data.productBaseInfo.piecesUnit);
                    */}
                    $(".footerCenter .yuanJia ").css("display", "none ");
                }

            }
            else {
                if(person.getRequestData().data.productBaseInfo.price==undefined){
                    if (person.getRequestData().data.productBaseInfo.pieces == 1) {
                        $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.plusPrice);
                        $(".footerCenter .proJia em").html( person.getRequestData().data.productBaseInfo.piecesUnit);
                        
                        /*$(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.plusPrice + " 起/" + person.getRequestData().data.productBaseInfo.piecesUnit);
                    */}
                    else {
                        $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.plusPrice );
                        $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.pieces  + person.getRequestData().data.productBaseInfo.piecesUnit);
                        
                       /* $(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.plusPrice + " 起/" +person.getRequestData().data.productBaseInfo.pieces  + person.getRequestData().data.productBaseInfo.piecesUnit);
                  */  }

                    $(".footerCenter .yuanJia ").css("display", "none ");
                }
                else{

                    if (person.getRequestData().data.productBaseInfo.pieces == 1) {
                        $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.plusPrice);
                        $(".footerCenter .proJia em").html( person.getRequestData().data.productBaseInfo.piecesUnit);
                        
                        /*$(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.plusPrice + " 起/" + person.getRequestData().data.productBaseInfo.piecesUnit);
                        */$(".footerCenter .yuanJia").html(person.getRequestData().data.productBaseInfo.price + " 起/" + person.getRequestData().data.productBaseInfo.piecesUnit);
                    }
                    else {
                        $(".footerCenter .proJia i").html(person.getRequestData().data.productBaseInfo.plusPrice );
                        $(".footerCenter .proJia em").html(person.getRequestData().data.productBaseInfo.pieces  + person.getRequestData().data.productBaseInfo.piecesUnit);
                        
                        /*$(".footerCenter .proJia").html(person.getRequestData().data.productBaseInfo.plusPrice + " 起/" +  person.getRequestData().data.productBaseInfo.pieces +person.getRequestData().data.productBaseInfo.piecesUnit);
                       */ $(".footerCenter .yuanJia").html(person.getRequestData().data.productBaseInfo.price + " 起/ " + person.getRequestData().data.productBaseInfo.pieces + person.getRequestData().data.productBaseInfo.piecesUnit);
                    }
                    $(".footerCenter .plusJia ").css("display", "none ");
                }

            }


        }



 //productType 1代订 2直订 3实物类直订productBaseInfo
       //判断预定步骤step先判断是否是登录
        //是否是2直订1代订
        if(person.getRequestData().data.productBaseInfo.productType==2||person.getRequestData().data.productBaseInfo.productType==3||person.getRequestData().data.productBaseInfo.productType==5){
            $(".footerRight").html("订购");
            $(".footerRight2").html("订购");
            $(".proFooter .footerRight").click(function(){
                //先判断是否登录
                var urlInfo ="/leapp/le.user.info";
                var paramInfo = '{}';
                var person = new Person();
                person.requestCommit(urlInfo, paramInfo);
                if(person.getRequestData().data.user.loginstatus==1){
                    var orderData='{"productType":"'+productType+'","id":"'+id+'"}'
                    jihe.toOrder(orderData)
                }
                else{
                    jihe.toLogin()
                }

            })
        }
        else{
            $(".proFooter .footerRight").click(function(){
                //先判断是否登录
                var urlInfo ="/leapp/le.user.info";
                var paramInfo = '{}';
                var person = new Person();
                person.requestCommit(urlInfo, paramInfo);
                if(person.getRequestData().data.user.loginstatus==1){
                    var stepUrl ="/leapp/promotion.step";
                    var person = new Person();
                    person.requestCommit(stepUrl, data);
                    //登录后请求步骤内容是否为空
                    if(person.getRequestData().data.stepInfo.step==""){
                        var stepData ='{"h5url":"'+host+'/h5/tip.html?id='+id+'","id":"'+id+'","title":"'+shareTitle+'","productType":"'+productType+'"}'
                        jihe.toOutSide(stepData)

                    }
                    else{
                        $(".proMask").css("display","block");
                        $(".proMaskTitle").html("预订步骤");
                        $(".proMaskCon").html(person.getRequestData().data.stepInfo.step);
                        if(person.getRequestData().data.stepInfo.reserveWay==1) {
                            $(".proMaskBtn").html("前往购买");
                            $(".proMaskBtn1").css("display","none");
                             $(".proMaskCon").css("height","200px");
                          
                              if(h<=480){
                               $(".proMaskCloseBtn").css("bottom","5px"); 
                            }
                            else{
                              $(".proMaskCloseBtn").css("bottom","30px");
                            }
                           /* $(".proMaskCloseBtn").css("bottom","60px");*/
                            $(".proMask .proCon ").css({"transform":"translate(-50%,-50%)","-webkit-transform":"translate(-50%,-50%)","-moz-transform":"translate(-50%,-50%)","-ms-transform":"translate(-50%,-50%)","transform":"-o-translate(-50%,-50%)"});
                            $(".proMaskBtn").click(function(){
                                var stepData ='{"h5url":"'+host+'/h5/tip.html?id='+id+'","id":"'+id+'","title":"'+shareTitle+'","productType":"'+productType+'"}'
                                jihe.toOutSide(stepData)
                            })

                        }
                        else{
                            $(".proMaskBtn").css("display","none");
                            $(".proMaskCon").css("height","200px");
                            if(h<=480){
                               $(".proMaskCloseBtn").css("bottom","5px"); 
                            }
                            else{
                              $(".proMaskCloseBtn").css("bottom","30px");
                            }
                            
                            $(".proMask .proCon ").css({"transform":"translate(-50%,-50%)","-webkit-transform":"translate(-50%,-50%)","-moz-transform":"translate(-50%,-50%)","-ms-transform":"translate(-50%,-50%)","transform":"-o-translate(-50%,-50%)"});
                            $(".proMaskBtn1 a").html("前往购买").attr("href","tel://"+person.getRequestData().data.stepInfo.reserveWayValue);
                            /*$(".proMaskBtn").append("<a href='tel://"+person.getRequestData().data.stepInfo.reserveWayValue+"'>前往购买</a>");*/
                        }

                    }
                }
                else{
                    jihe.toLogin()
                }

            })
        }

        $(document).ready(function() {
            $(".ota").click(function () {
                var hotelData='{"id":"' + person.getRequestData().data.promotionBaseInfo.hotelId + '"}'
                jihe.toCalendar(hotelData)
            })
            var paramHotelWant = '{"id":"' + person.getRequestData().data.hotelBaseInfo.hotelId + '","type":"1"}';
            var urlHotelWant =  "/leapp/le.user.like";
            var paramHotelLike = '{"id":"' + person.getRequestData().data.hotelBaseInfo.hotelId + '","type":"2"}';
            var urlHotelLike =  "/leapp/le.user.like";
            $(".togo").click(function(){
                androidToGo(urlHotelWant,paramHotelWant)

            })
            $(".want").click(function(){
                androidWantTo(urlHotelLike,paramHotelLike)

            })
            if(person.getRequestData().data.hotelBaseInfo.brandId>0){
                $(".icon").click(function(event) {
                    window.location="brandDetail.html?id="+person.getRequestData().data.hotelBaseInfo.brandId
                });
            }

        });

        //酒店介绍
        var hotelName=person.getRequestData().data.hotelBaseInfo.hotelCname;
        //var description=person.getRequestData().data.hotelBaseInfo.prmtDesc;
        $(".content h1").html(hotelName);

        var imgList = person.getRequestData().data.productBaseInfo.imgList;
        var productName = person.getRequestData().data.productBaseInfo.productName;
        //var distance = person.getRequestData().data.hotelBaseInfo.distanceDesc;
        //var shopkeeper = person.getRequestData().data.hotelBaseInfo.brandIcon;
        var shopkeeper = person.getRequestData().data.hotelBaseInfo.hotelOwner.headimgurl;
        var shopkeeperUrl = "/h5_2.0/shopkeeper.html?id="+person.getRequestData().data.hotelBaseInfo.hotelOwner.ownerId;
        var tagInfoList = person.getRequestData().data.promotionBaseInfo.tagInfoList;
        var prmtDesc = person.getRequestData().data.hotelBaseInfo.prmtDesc;
        var address = person.getRequestData().data.hotelBaseInfo.address;
        var phone = person.getRequestData().data.hotelBaseInfo.phone;
        var brief = person.getRequestData().data.hotelBaseInfo.brief;
        var name = person.getRequestData().data.hotelBaseInfo.hotelOwner.name;
        var roomList = person.getRequestData().data.hotelBaseInfo.roomList;
        var recommendPromotions = person.getRequestData().data.hotelBaseInfo.recommendPromotions;
        var cityName = person.getRequestData().data.hotelBaseInfo.cityName;
        //首图
        $("#top_img_index").find("span").eq(1).append(imgList.length);
        for(var i= 0;i<imgList.length;i++){
            var j=i+1;
            //$(".hd ul").append("<li>"+j+"</li>");
            $(".bd ul").append("<li><img/></li>");
            $(".bd ul").find("img").eq(i).attr("src",imgList[i]);
        }
        //header信息
        //$("#intro h1").append(productName);
        $(".shopkeeper_img").attr("src",shopkeeper);
        $(".shopkeeper_detail").attr("href",shopkeeperUrl);
        //$("#distance_unit").append(distance);

        //if(person.getRequestData().data.hotelBaseInfo.userFavorites[1].status == 0){
        //	$("#like .want img").attr("src","../h5_2.0/images/unstar.png");
        //}else {
        //	$("#like .want img").attr("src","../h5_2.0/images/star.png");
        //}
        //if(person.getRequestData().data.hotelBaseInfo.userFavorites[0].status == 0){
        //	$("#like .togo img").attr("src","../h5_2.0/images/ungone.png");
        //}else {
        //	$("#like .togo img").attr("src","../h5_2.0/images/gone.png");
        //}
        //$("#like .want span").append(person.getRequestData().data.hotelBaseInfo.userFavorites[1].count);
        //$("#like .togo span").append(person.getRequestData().data.hotelBaseInfo.userFavorites[0].count);
        if(tagInfoList){
            for (var l=0;l<tagInfoList.length;l++){
                $("#tips ul").append("<li></li>");
                $("#tips ul li:last").append(tagInfoList[l].name);
            }
        }
        $("#h5body").append(prmtDesc);
        //地图显示
        var cityLat = person.getRequestData().data.hotelBaseInfo.cityLat;
        var cityLon = person.getRequestData().data.hotelBaseInfo.cityLon;
        $("#map").attr("src","http://restapi.amap.com/v3/staticmap?location="+cityLon+","+cityLat+"&zoom=10&size=800*400&markers=mid,,A:"+cityLon+","+cityLat+"&key=ee95e52bf08006f63fd29bcfbcf21df0");
        $("#address").find("li").eq(0).append(address);
        $("#address").find("li").eq(1).append(phone);

        $("#shopkeeper_intro").append(brief);
        if(brief.length < 90){
            $("#more").remove();
        }
        $("#shopkeeper_name").find("span").append(name);
        $(".price").prepend(person.getRequestData().data.hotelBaseInfo.price);
        //猜你喜欢
        var recommendbox = "<a href=\"#\"><div class=\"prom_list\"><img src=\"images/p4.jpeg\" class=\"prom_img\"><p class=\"prom_title\"></p><p class=\"prom_price\"><span> 起/<span class=\"prom_unit\"></span>晚</span></p></div></a><div class=\"gap_2\"></div>";
        if(recommendPromotions){
            for (var n=0;n<recommendPromotions.length;n++){
                $("#content_1").append(recommendbox);
                $("#content a:last").attr("href",recommendPromotions[n].h5url);
                $(".prom_img:last").attr("src",recommendPromotions[n].imgUri);
                $(".prom_title:last").append(recommendPromotions[n].productName);
                $(".prom_price:last").prepend(recommendPromotions[n].price);
            }
        }else{
            $("#title_guess").remove();
            $(".gap").eq(1).remove();
        }

        $("#content_1").append("<img id=\"end_line\" src=\"../h5_2.0/images/TheEnd.png\">");
        //房型
        var typebox ="<div class=\"type\"><img class=\"type_img\" ><div><p class=\"type_name\"></p><p class=\"type_price\">参考价:&nbsp;<span class=\"type_number\"></span><span>&nbsp;起/<span class=\"type_unit\"></span>晚</span></p></div><p class=\"type_intro\"></p></div>";

        if(roomList){
            for(var k=0;k<roomList.length;k++){
                $("#content_2").append(typebox);
                $("img.type_img:last").attr("src",roomList[k].imgList[0]);
                $("p.type_name:last").append(roomList[k].name);
                $("p.type_intro:last").append(roomList[k].roomDesc);
                $("span.type_number:last").append(roomList[k].price);
            }
            $("#content_2").append("<div class=\"gap_3\"></div>");
        }

        //调用地图
        $(document).ready(function () {
            document.getElementById("map").onclick = function () {
                data = '{"longitude":"' + cityLon + '","latitude":"' + cityLat + '","BuildingName":"' + productName + '","city":"' + cityName + '","address":"' + address + '"}';
                jihe.toMap(data);
            }
        });

         var goToCount=person.getRequestData().data.hotelBaseInfo.userFavorites[0].count;
         var wantCount=person.getRequestData().data.hotelBaseInfo.userFavorites[1].count;
         if(person.getRequestData().data.hotelBaseInfo.recommendPromotions==undefined){
            $(".Promotion").css("display","none");
            $(".proFooterTop").css("display","none");
            $(".phone").css("margin-bottom","0");
        }
        else{
            $.each(person.getRequestData().data.hotelBaseInfo.recommendPromotions,function(i){
                $(".Promotion ").append('<dl><dt class="itemLeft"></dt><dd class="itemRight"><span class="itemRightTop">'+person.getRequestData().data.hotelBaseInfo.recommendPromotions[i].productName+'</span><span class="itemRightBottom"></span></dd></dl>');
            })
            for (var g = $(".Promotion dl").length; g > 0; g--) {
                $(".Promotion dl").eq(g-1).children("dt").css({"background":'url('+person.getRequestData().data.hotelBaseInfo.recommendPromotions[g-1].imgUri+') center center no-repeat',"background-size":"cover","-webkit-background-size":"cover"})
                //判断价格是否有plus价,没就判断是否有优惠价，若是-1就看是否有优惠价，没就显示plus用户享受更低价
                    if(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].price==undefined){
                        if(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].plusPrice==-1){
                            $(".Promotion dl").eq(g - 1).css("display","none");
                        }
                        else{
                            if (person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].pieces == 1) {
                                $(".Promotion dl").eq(g - 1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].plusPrice + '起/ ' + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].piecesUnit);
                            }
                            else {
                                $(".Promotion dl").eq(g - 1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].plusPrice + '起/ ' + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].pieces + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].piecesUnit);
                            }
                        }

                    }
                    else{
                        if(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].plusPrice==-1||person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].plusPrice==undefined){
                            if (person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].pieces == 1) {
                                $(".Promotion dl").eq(g - 1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].price + '起/ ' + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].piecesUnit);
                            }
                            else {
                                $(".Promotion dl").eq(g - 1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].price + '起/ ' + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].pieces + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].piecesUnit);
                            }
                        }
                        else{
                            if (person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].pieces == 1) {
                                $(".Promotion dl").eq(g - 1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].plusPrice + '起/ ' + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].piecesUnit);
                            }
                            else {
                                $(".Promotion dl").eq(g - 1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].plusPrice + '起/ ' + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].pieces + person.getRequestData().data.hotelBaseInfo.recommendPromotions[g - 1].piecesUnit);
                            }
                        }
                    }
                /*if(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g-1].pieces==1){
                    $(".Promotion dl").eq(g-1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g-1].price+'起/ '+person.getRequestData().data.hotelBaseInfo.recommendPromotions[g-1].piecesUnit);
                }
                else{
                    $(".Promotion dl").eq(g-1).children("dd").children(".itemRightBottom").html(person.getRequestData().data.hotelBaseInfo.recommendPromotions[g-1].price+'起/ '+person.getRequestData().data.hotelBaseInfo.recommendPromotions[g-1].pieces+person.getRequestData().data.hotelBaseInfo.recommendPromotions[g-1].piecesUnit);
                }*/
            }
            $(document).ready(function() {
                $(".Promotion dl").click(function(event) {
                   window.location=person.getRequestData().data.hotelBaseInfo.recommendPromotions[$(this).index()].h5url
                });
            });


        }
         $(".want b").html(wantCount);
         $(".togo b").html(goToCount);
        if(person.getRequestData().data.promotionBaseInfo.userFavorites[0].status==1){
            $(".proLike i").addClass("likeCurrent");
        }
        if(person.getRequestData().data.hotelBaseInfo.userFavorites[0].status==1){
            $(".togo i").addClass("togoCurrent");
        }
        if(person.getRequestData().data.hotelBaseInfo.userFavorites[1].status==1){
            $(".want i").addClass("wantCurrent");
        }

    })

}
var data='{"id":"' + id + '"}';
var url="/content/client/promotion/detail";
androidProData(url,data);


var dataLike = '{"type":"3","id":"'+id+'"}';
var urlLike = "/leapp/le.user.like";
$(document).ready(function() {
    $(".proLike").click(function(){
        androidChangLikeCount(urlLike, dataLike)
    })
})

//切换印象和房型
$(document).ready(function(){
    $("#nav div").click(function(){
        $("#nav div").removeClass();
        $(this).addClass("select");
        $(".unselect").removeClass();
        if($(".select").attr("id") == "yinxiang"){
            $("#content_2").addClass("unselect");
        }else {
            $("#content_1").addClass("unselect");
        };
        myScroll.refresh();
    });

    $("#more").click(function(){
        if ($(".hidden").length != 0){
            $("#shopkeeper_intro").removeClass();
            $("#more p").html("收起");
            $("#more img").attr("src","../h5_2.0/images/up.png");
        }else {
            $("#shopkeeper_intro").addClass("hidden");
            $("#more p").html("查看全部");
            $("#more img").attr("src","../h5_2.0/images/down.png");
        }
        myScroll.refresh();
    });
});