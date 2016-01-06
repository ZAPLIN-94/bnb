//使用:
//var device = new Device();
//device.requestCommit(url, andrData);

function Device() {
    var requestData = "";
    this.setRequestData = function (_requestData) {
        requestData = _requestData;
    };
    this.getRequestData = function () {
        return requestData;
    }

    this.requestCommit = function (allUrl, allData) {
        //var yon = window.hasOwnProperty("AndroidObj");
        var yon = jihe.hasOwnProperty("getHeaderData");
        // if START--------
        if(yon == false) {//若为false 则不在APP中...

            //-------------操作逻辑-------------

        }else {
            //若为true 在APP中...
            // var testHeader = jihe.getHeaderData(allData);
            //var testHeader = window.AndroidObj.getHeaderData(allData);
            var testHeader = jihe.getHeaderData(allData);
            var testHeaderdecoded = decodeURIComponent(testHeader);
            var obj = eval("(" + testHeaderdecoded + ")");
            $.ajax({
                type: 'POST',
                url: allUrl,
                async: false,
                data: {data:allData},
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('apiversion', ''+obj.apiversion )
                    XMLHttpRequest.setRequestHeader('channel', ''+obj.channel)
                    XMLHttpRequest.setRequestHeader('location', ''+obj.location)
                    XMLHttpRequest.setRequestHeader('userid', ''+obj.userid)
                    XMLHttpRequest.setRequestHeader('uuid', ''+obj.uuid)
                    XMLHttpRequest.setRequestHeader('sign', ''+obj.sign)
                },
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
                    var paramHotelLike = '{"id":"' + id + '","type":"2"}';
                    var urlHotelLike =  "/leapp/le.user.like";
                    $(".togo").click(function(){
                        androidToGo(urlHotelWant,paramHotelWant)

                    });
                    $(".want").click(function(){
                        androidWantTo(urlHotelLike,paramHotelLike)
                    })
                },
                error: function () {}
            })
        }
        // if END--------
    }
    //this.setRequestData  END-------
}


