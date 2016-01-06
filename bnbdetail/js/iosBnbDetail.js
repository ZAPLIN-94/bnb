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
            $("#more img").attr("src","../h5_2.0/images/up.png");
        }else {
            $("#shopkeeper_intro").addClass("hidden");
            $("#more p").html("查看全部");
            $("#more img").attr("src","../h5_2.0/images/down.png");
        }
    });
});

var u = navigator.userAgent, app = navigator.appVersion;

var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//url处理
var url = location.href;
host='http://'+window.location.host;
root=window.location.pathname;
h=$("div.list:last").find(window).height();
/*alert(root);*/
function getParameter(paraStr, url)
{
    var result = "";
    //获取URL中全部参数列表数据
    var str = "&" + url.split("?")[1];
    /*var stri=url.split("?")[1];
     alert(stri);*/
    var paraName = paraStr + "=";
    //判断要获取的参数是否存在
    if(str.indexOf("&"+paraName)!=-1)
    {
        //如果要获取的参数到结尾是否还包含“&”
        if(str.substring(str.indexOf(paraName),str.length).indexOf("&")!=-1)
        {
            //得到要获取的参数到结尾的字符串
            var TmpStr=str.substring(str.indexOf(paraName),str.length);
            //截取从参数开始到最近的“&”出现位置间的字符
            result=TmpStr.substr(TmpStr.indexOf(paraName),TmpStr.indexOf("&")-TmpStr.indexOf(paraName));
        }
        else
        {
            result=str.substring(str.indexOf(paraName),str.length);
        }
    }
    else
    {
        result="无此参数";
    }
    return (result.replace("&",""));
}
var r = getParameter("id",url);
id =r.substring(r.lastIndexOf('=')+1, r.length);



if(isAndroid) {
    var url, andrData;
    var device = new Device();
    device.requestCommit('/content/client/hotel/detail', "{'id':'"+id+"'}");

}else if(isiOS) {
    //--------IOS中的逻辑-------------
    $(document).ready(function(){
        //var id = 15052;
        $.ajax({
            type: 'POST',
            url: '/content/client/hotel/detail',
            data: {data:'{"id":'+id+'}'},
            dataType: 'json',
            async:false,
            success: function (data) {
                document.title= data.data.hotelBaseInfo.hotelCname;
                var imgList = data.data.productBaseInfo.imgList;
                var productName = data.data.productBaseInfo.productName;
                var distance = data.data.hotelBaseInfo.distanceDesc;
                //var shopkeeper = data.data.hotelBaseInfo.brandIcon;
                var shopkeeper = data.data.hotelBaseInfo.hotelOwner.headimgurl;
                var tagInfoList = data.data.hotelBaseInfo.tagInfoList;
                var shopkeeperUrl = data.data.hotelBaseInfo.brandH5url;
                var prmtDesc = data.data.hotelBaseInfo.prmtDesc;
                var address = data.data.hotelBaseInfo.address;
                var phone = data.data.hotelBaseInfo.phone;
                var brief = data.data.hotelBaseInfo.brief;
                var name = data.data.hotelBaseInfo.hotelOwner.name;
                var roomList = data.data.hotelBaseInfo.roomList;
                var recommendPromotions = data.data.hotelBaseInfo.recommendPromotions;
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
                    $("#like .want img").attr("src","../h5_2.0/images/unstar.png");
                }else {
                    $("#like .want img").attr("src","../h5_2.0/images/star.png");
                }
                if(data.data.hotelBaseInfo.userFavorites[0].status == 0){
                    $("#like .togo img").attr("src","../h5_2.0/images/ungone.png");
                }else {
                    $("#like .togo img").attr("src","../h5_2.0/images/gone.png");
                }
                $("#like .want span").append(data.data.hotelBaseInfo.userFavorites[1].count);
                $("#like .togo span").append(data.data.hotelBaseInfo.userFavorites[0].count);
                if(tagInfoList){
                    for (var l=0;l<tagInfoList.length;l++){
                        $("#tips ul").append("<li></li>");
                        $("#tips ul li:last").append(tagInfoList[l].name);
                    }
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
                        data = '{"longitude":"' + cityLon + '","latitude":"' + cityLat + '","BuildingName":"' + productName + '","city":"' + data.data.hotelBaseInfo.cityName + '","address":"' + address + '"}';
                        jihe.toMap(data);
                    }
                });

                //弹窗
                //$("#tanchuang p span").html(productName);
                if(data.data.productBaseInfo.reserveWay == 1){
                    //调用APP价格日历
                    $("footer button").click(function() {
                        var json='{"id":"' + id + '"}'
                        jihe.toCalendar(json)
                    })
                }else if(data.data.productBaseInfo.reserveWay == 2){
                    var phone = data.data.productBaseInfo.reserveWayValue;
                    $("#phone").attr("href","tel:'" + phone + "'");
                    $("footer button").click(function(){
                        $("#tanchuang_background").removeClass("disappear");
                        $("#tanchuang").removeClass("disappear");
                    });
                    $("#tanchuang_background").click(function(){
                        $(this).addClass("disappear");
                        $("#tanchuang").addClass("disappear");
                    })
                }

                //点赞
                var paramHotelWant = '{"id":"' + id + '","type":"1"}';
                var urlHotelWant =  "/leapp/le.user.like";
                var paramHotelLike = '{"id":"' + id+ '","type":"2"}';
                var urlHotelLike =  "/leapp/le.user.like";
                $(".togo").click(function(){
                    iOSToGo(urlHotelWant,paramHotelWant)
                });
                $(".want").click(function(){
                    iOSWantTo(urlHotelLike,paramHotelLike)
                })
            },
            error: function () {}
        });
    })
}

//首图滑动效果
var topImgIndex = function(){
    var index = $("li.on").text();
    $("#top_img_index").find("span").eq(0).text(index);
};

$(document).ready(function(){
    TouchSlide({ slideCell:"#top_img",titCell:".hd li",mainCell:".bd ul"});
    setInterval("topImgIndex()",800);
});



