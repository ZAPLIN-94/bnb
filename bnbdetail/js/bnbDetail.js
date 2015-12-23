//判断设备
var u = navigator.userAgent, app = navigator.appVersion;

var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

//url处理 获取id
var url = location.href;
host='http://'+window.location.host;
root=window.location.pathname;
h=$("div.list:last").find(window).height();
function getParameter(paraStr, url) {
    var result = "";
    //获取URL中全部参数列表数据
    var str = "&" + url.split("?")[1];
    /*var stri=url.split("?")[1];
     alert(stri);*/
    var paraName = paraStr + "=";
    //判断要获取的参数是否存在
    if(str.indexOf("&"+paraName)!=-1) {
        //如果要获取的参数到结尾是否还包含“&”
        if(str.substring(str.indexOf(paraName),str.length).indexOf("&")!=-1) {
            //得到要获取的参数到结尾的字符串
            var TmpStr=str.substring(str.indexOf(paraName),str.length);
            //截取从参数开始到最近的“&”出现位置间的字符
            result=TmpStr.substr(TmpStr.indexOf(paraName),TmpStr.indexOf("&")-TmpStr.indexOf(paraName));
        } else {
            result=str.substring(str.indexOf(paraName),str.length);
        }
    } else {
        result="无此参数";
    }
    return (result.replace("&",""));
}
var r = getParameter("id",url);
id =r.substring(r.lastIndexOf('=')+1, r.length);


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
    });

    $("#more").click(function(){
        if ($(".hidden").length != 0){
            $("#shopkeeper_intro").removeClass();
            $("#more p").html("收起");
            $("#more img").attr("src","images/up.png");
        }else {
            $("#shopkeeper_intro").addClass("hidden");
            $("#more p").html("查看全部");
            $("#more img").attr("src","images/down.png");
        }

    });
});

//页面内容请求
$(document).ready(function(){
    $.ajax({
        type:"POST",
        //url:"http://10.1.0.153:8091/content/client/hotel/detail",
        url:"http://dev.jihelife.com/content/client/hotel/detail",
        async:false,
        data:{data:"{'id':'"+15052+"'}"},
        success: function (data) {
            var imgList = data.data.productBaseInfo.imgList;
            var productName = data.data.productBaseInfo.productName;
            var distance = data.data.hotelBaseInfo.distanceDesc;
            var shopkeeper = data.data.hotelBaseInfo.brandIcon;
            //var shopkeeper = data.data.hotelBaseInfo.hotelOwner.headimgurl;
            var tagInfoList = data.data.hotelBaseInfo.tagInfoList;
            var shopkeeperUrl = data.data.hotelBaseInfo.brandH5url;
            var prmtDesc = data.data.hotelBaseInfo.prmtDesc;
            var address = data.data.hotelBaseInfo.address;
            var phone = data.data.hotelBaseInfo.phone;
            var brief = data.data.hotelBaseInfo.brief;
            var name = data.data.hotelBaseInfo.hotelOwner.name;
            var roomList = data.data.hotelBaseInfo.roomList;
            //首图
            $("#top_img_index").find("span").eq(1).append(imgList.length);
            for(var i= 0;i<imgList.length;i++){
                var j=i+1;
                $(".hd ul").append("<li>"+j+"</li>");
                $(".bd ul").append("<li><img/></li>");
                $(".bd ul").find("img").eq(i).attr("src",imgList[i]);
            }
            //header信息
            $("#intro h1").append(productName);
            $(".shopkeeper_img").attr("src",shopkeeper);
            $(".shopkeeper_detail").attr("href",shopkeeperUrl);
            $("#distance_unit").append(distance);

            if(data.data.hotelBaseInfo.userFavorites[1].status == 0){
                $("#like .want img").attr("src","images/unstar.png");
            }else {
                $("#like .want img").attr("src","images/star.png");
            }
            if(data.data.hotelBaseInfo.userFavorites[1].status == 0){
                $("#like .togo img").attr("src","images/ungone.png");
            }else {
                $("#like .togo img").attr("src","images/gone.png");
            }
            $("#like .want span").append(data.data.hotelBaseInfo.userFavorites[1].count);
            $("#like .togo span").append(data.data.hotelBaseInfo.userFavorites[0].count);
            for (var l=0;l<tagInfoList.length;l++){
                $("#tips ul").append("<li></li>");
                $("#tips ul li:last").append(tagInfoList[l].name);
            }


            $("#h5body").append(prmtDesc);
            //地图显示
            var cityLat = data.data.hotelBaseInfo.cityLat;
            var cityLon = data.data.hotelBaseInfo.cityLon;
            $("#map").attr("src","http://restapi.amap.com/v3/staticmap?location="+cityLon+","+cityLat+"&zoom=10&size=800*400&markers=mid,,A:"+cityLon+","+cityLat+"&key=ee95e52bf08006f63fd29bcfbcf21df0");
            $("#address").find("li").eq(0).append(address);
            $("#address").find("li").eq(1).append(phone);

            $("#shopkeeper_intro").append(brief);
            if(brief.length < 90){
                $("#more").remove();
            }
            $("#shopkeeper_name").find("span").append(name);
            $(".price").prepend(data.data.hotelBaseInfo.price);

            //房型
            var typebox ="<div class=\"type\"><img class=\"type_img\" ><div><p class=\"type_name\"></p><p class=\"type_price\">参考价:&nbsp;<span class=\"type_number\"></span><span>&nbsp;起/<span class=\"type_unit\"></span>晚</span></p></div><p class=\"type_intro\"></p></div>";
            for(var k=0;k<roomList.length;k++){
                $("#content_2").append(typebox);
                $("img.type_img:last").attr("src",roomList[k].imgList[0]);
                $("p.type_name:last").append(roomList[k].name);
                $("p.type_intro:last").append(roomList[k].roomDesc);
                $("span.type_number:last").append(roomList[k].price);


            }
            $("#content_2").append("<div class=\"gap_3\"></div>");
        },
        error: function () {
            
        }
    })
});

//首图滑动效果
var topImgIndex = function(){
    var index = $("li.on").text();
    $("#top_img_index").find("span").eq(0).text(index);
};

$(document).ready(function(){
    TouchSlide({ slideCell:"#top_img",titCell:".hd li",mainCell:".bd ul"});
    setInterval("topImgIndex()",800);
});

//点赞接口1是去过 2是想去 3是喜欢
function iOSChangLikeCount(urlLike,dataLike) {
    $.post(urlLike, {
        data: dataLike
    }, function (result) {
        if (result.data.likeStatus> 0) {
            $(".want i").addClass("likeCurrent");
        } else {
            $(".want i").removeClass("likeCurrent");
        }
    });
}
function androidChangLikeCount( urlLike,dataLike) {
    var person = new Person();
    person.requestCommit(urlLike, dataLike)
    if (person.getRequestData().data.likeStatus> 0) {
        $(".proLike i").addClass("likeCurrent");
    } else {
        $(".proLike i").removeClass("likeCurrent");
    }
}
function androidToGo(urlHotelWant,paramHotelWant){
    var person = new Person();
    person.requestCommit(urlHotelWant, paramHotelWant)
    $(".togo b").html(person.getRequestData().data.goToCount);
    if(person.getRequestData().data.goToStatus==0){
        $(".togo i").removeClass("togoCurrent");
    }
    else
    {
        $(".togo i").addClass("togoCurrent");
    }
}
function iOSToGo(urlHotelWant,paramHotelWant) {
    $.post(urlHotelWant, {
        data: paramHotelWant
    }, function (result) {
        $(".togo b").html(result.data.goToCount);
        if(result.data.goToStatus==1){
            $(".togo i").removeClass("togoCurrent");
        }
        else
        {
            $(".togo i").addClass("togoCurrent");
        }
    });
}

function androidWantTo(urlHotelLike,paramHotelLike){
    var person = new Person();
    person.requestCommit(urlHotelLike, paramHotelLike)
    console.debug(person.getRequestData());
    $(".want b").html(person.getRequestData().data.wantCount);
    if(person.getRequestData().data.wantStatus==1){
        $(".want i").addClass("wantCurrent");
    }
    else
    {
        $(".want i").removeClass("wantCurrent");
    }
}

function iOSWantTo(urlHotelLike,paramHotelLike){
    $.post(urlHotelLike, {
        data: paramHotelLike
    }, function (result) {
        $(".want b").html(result.data.wantCount);

        if(result.data.wantStatus==0){
            $(".want i").removeClass("wantCurrent");
        }
        else
        {
            $(".want i").addClass("wantCurrent");
        }
    });
}
//自己跳先判断是否登录
function comment(){
    var urlInfo ="/leapp/le.user.info";
    var paramInfo = '{}';
    var person = new Person();
    person.requestCommit(urlInfo, paramInfo);
    if(person.getRequestData().data.user.loginstatus==1){
        window.location="comment.html?id="+id;
    }
    else{
        jihe.toLogin()
    }

}



