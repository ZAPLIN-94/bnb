	
//优惠详情
function 	iOSProData(url,data){
	pageData = new Array();
	$.post(url, {data: data}, function(data) {
		console.debug(data);
		document.title= JSON.stringify(data.data.shareInfo.title);
		var shareTitle=data.data.shareInfo.title;
		var productType=data.data.productBaseInfo.productType;

		$.each(data.data.productBaseInfo.imgList,function(i){
			$("#focus .bd ul").append('<li><a href="javascript:;"><img _src="'+data.data.productBaseInfo.imgList[i]+'?imageView2/1/w/'+aa*2+'/h/'+h+'" /></a></li>');
			TouchSlide({
				slideCell:"#focus",
				titCell:".hd ul",
				mainCell:".bd ul",
				effect:"left",
				autoPage:true,
				switchLoad:"_src"
			});
		})
		$(".focus .bd li ").css("height",h*0.525);
		$(".title").html(data.data.productBaseInfo.productName);
		//距离distance
		if(data.data.hotelBaseInfo.distance==undefined){
			$(".dist").css("display","none")
		}
		else{
			$(".dist").html(data.data.hotelBaseInfo.distance)
		}
		//优惠评级
		if(data.data.productBaseInfo.grade==2){
			$(".grade").addClass("chaoZhi");
		}
		else if(data.data.productBaseInfo.grade==3){
			$(".grade").addClass("zhenHan");
		}
		$(".grade").html(data.data.promotionBaseInfo.gradeTitle);
		//倒计时

		var Begin= new Date(parseInt(data.data.productBaseInfo.saleBegintime));
		var Beginy = Begin.getFullYear(); //获取完整的年份(4位,1970-????)
		var Beginm = Begin.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		var Begind = Begin.getDate();
		var end=new Date(parseInt(data.data.productBaseInfo.saleEndtime));
		var year=end.getFullYear();
		var month=end.getMonth() + 1;
		var day=end.getDate();
		var hour=end.getHours();
		var minute=end.getMinutes();
		var second=end.getSeconds();
		time(year,month,day,hour,minute,second)
		if(days<=30&&data.data.productBaseInfo.status==1){
			$(".time").html(days);

		}
		else{
			$(".time").css("display","none");
		}
		//优惠时间
		$(".promTime ul li .yuding").html(Beginy+"."+Beginm+"."+Begind+"--"+year+"."+month+"."+day);
		$(".promTime ul li .ruzhu").html(data.data.promotionBaseInfo.timeTitle);
		//brandIcon
		$("header .icon").css({"background":"url("+data.data.hotelBaseInfo.brandIcon+") 0 0 no-repeat","background-size":w*0.13,"-webkit-background-size":w*0.13})





		//ota价格hotelPrice判断类型是否是下午茶objectType 2是优惠
		if(data.data.hotelBaseInfo==""){
			$(".ota").css("display","none");
			$(".hotelDetail").css("display","none");
		}
		if(data.data.productBaseInfo.objectType==2){
			if(data.data.hotelBaseInfo.price==-1){
				$(".otaPrice span").html("可能有房").css("color","#d13f4c");
			}
			else{
				$(".otaPrice span").html(data.data.hotelBaseInfo.price +"起 / 晚");
			}
		}
		else{
			$(".ota").css("display","none");
		}

		//优惠亮点
		if(data.data.promotionBaseInfo.highlights == undefined){
			$(".highLights").css("display","none");
		}
		else if ( data.data.promotionBaseInfo.highlights.length >= 100) {
			$(".highLightsContent").html(data.data.promotionBaseInfo.highlights.substr(0, 100) + "...");
		}
		else {
			$(".highLightsContent").html(data.data.promotionBaseInfo.highlights);
			$("#btn1").css("display","none");
		}
		$("#btn1").toggle(function() {

			$(this).children("span").html("收起");
			$(this).children("i").html("&#xe641;");
			$(".highLightsContent").html(data.data.promotionBaseInfo.highlights);

		}, function() {
			$(this).children("span").html("展开全部");
			$(this).children("i").html("&#xe619;");
			$(".highLightsContent").html(data.data.promotionBaseInfo.highlights.substr(0, 100)+"...");

		});
		//优惠内容还可优化


		if(data.data.promotionBaseInfo.promotionEquityList==""){
			$(".promotionEquity").css("display","none");
		}
		else{
			$.each(data.data.promotionBaseInfo.promotionEquityList,function(i){
				pageData.push([i]);
				$(".promotionEquity ul").append("<li><span>"+data.data.promotionBaseInfo.promotionEquityList[i]+"</span></li>");
			})
			for(var a=pageData.length;a>3;a--){
				$(".promotionEquity ul li").eq(a-1).css('display', 'none');
			}
			if(pageData.length<=3){
				$("#btn2").css("display","none");
			}
			$("#btn2").toggle(function() {
				$(".promotionEquity ul li").css('display', 'block');
				$(this).children("span").html("收起");
				$(this).children("i").html("&#xe641;");
			}, function() {
				for(var a=pageData.length;a>3;a--){

					$(".promotionEquity ul li").eq(a-1).css('display', 'none');
				}
				$(this).children("span").html("展开全部");
				$(this).children("i").html("&#xe619;");
			});
		}

		//优惠评论
		$(".promComment h2 span").html(data.data.productBaseInfo.commentCount);
		if(data.data.productBaseInfo.commentCount==0){
			$(".proFooter .footerLeft").html("评论");
		}
		else {
			$(".proFooter .footerLeft").html(data.data.productBaseInfo.commentCount);
		}
		if(data.data.productBaseInfo.commentList==undefined){
			$(".promComment").css("display","none");
		}
		else{
			$.each(data.data.productBaseInfo.commentList,function(i){
				$(".promComment .promCommentWrap").append('<dl><dt></dt><dd><span class="commentTop"><strong>'+data.data.productBaseInfo.commentList[i].nickName+'</strong><i class="commentTime">15-10-21</i></span><span class="commentContent">'+data.data.productBaseInfo.commentList[i].context+'</span><div class="btn commentBtn" id="'+i+'" ><span>展开评论</span><i class="iconfont"></i></div></dd></dl>');
			})
			for(var c=$(".promComment .promCommentWrap dl").length;c>0;c--){
				var headerIcon;
				headerIcon=data.data.productBaseInfo.commentList[c-1].headImgUrl;

				if(headerIcon==undefined){
					headerIcon="http://7xio74.com2.z0.glb.qiniucdn.com/default_user_head.gif";
				}
				$(".promComment .promCommentWrap dl").eq(c-1).children("dt").css({"background":'url('+data.data.productBaseInfo.commentList[c-1].headImgUrl+') 0 0 no-repeat',"background-size":"50px 50px","-webkit-background-size":"50px 50px"})
				if(data.data.productBaseInfo.commentList[c-1].context.length<=50){
					$(".promComment .promCommentWrap dl").eq(c-1).children("dd").children("div").css("display","none");
				}
				else{
					$(".promComment .promCommentWrap dl").eq(c-1).children("dd").children(".commentContent").html(data.data.productBaseInfo.commentList[c-1].context.substr(0, 50)+"...");
				}
				var upDate= new Date(parseInt(data.data.productBaseInfo.commentList[c-1].updateTime));
				var upDatey = upDate.getFullYear(); //获取完整的年份(4位,1970-????)
				var upDatem = upDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				var upDated = upDate.getDate();
				$(".promComment .promCommentWrap dl").eq(c-1).children("dd").children(".commentTop").children(".commentTime").html(upDatey+"-"+upDatem+"-"+upDated)

			}
			$(".commentBtn").toggle(function() {
				var d=$(this).attr("id");
				$(this).children("span").html("收起评论");
				$(this).children("i").html("&#xe641;");
				$(this).siblings(".commentContent").html(data.data.productBaseInfo.commentList[d].context)
			}, function() {
				var d=$(this).attr("id");
				$(this).children("span").html("展开评论");
				$(this).children("i").html("&#xe619;");
				$(this).siblings(".commentContent").html(data.data.productBaseInfo.commentList[d].context.substr(0, 50)+"...")
			});


		}


//优惠条件conditionList

		if(data.data.promotionBaseInfo.conditionList==undefined){
			$(".conditionList").css('display', 'none')
		}
		else{
			$.each(data.data.promotionBaseInfo.conditionList,function(i){
				//StepDesc.conditionWay==1访问网页
				//StepDesc.conditionWay==2拨打电话
				$(".conditionList ul").append('<li><strong style="max-width: 248.4px;">'+data.data.promotionBaseInfo.conditionList[i].title+'</strong><span>如何获取？</span></li>');
			})
			//data.data.promotion.conditionList[i].conditionWayValue 链接或电话 data.data.promotion.conditionList[i].conditionDesc描述data.data.promotion.conditionList[i].conditionWay
			for(var b=$(".conditionList ul li").length;b>0;b--){
				if(data.data.promotionBaseInfo.conditionList[b-1].getcondWay==undefined){
					$(".conditionList ul li").eq(b-1).children("span").css("display","none");

				}
				else if(data.data.promotionBaseInfo.conditionList[b-1].getcondWay=="1"){
					$(".conditionList ul li").children("span").click(function(){
						$(".proMask ").css("display","block");
						$(".proMaskBtn").css("display","none");
						var f=$(this).parent().index();
						$(".proMask .proMaskCon").html(data.data.promotionBaseInfo.conditionList[f].condDesc);
						$(".proMaskBtn1 a").html("访问网页").attr("href",""+data.data.promotionBaseInfo.conditionList[f].getcondWayValue);
					})
				}
				else if(data.data.promotionBaseInfo.conditionList[b-1].getcondWay=="2"){
					$(".conditionList ul li").children("span").click(function(){
						$(".proMask ").css("display","block");
						$(".proMaskBtn").css("display","none");
						var f=$(this).parent().index();
						$(".proMask .proMaskCon").html(data.data.promotionBaseInfo.conditionList[f].condDesc);
						$(".proMaskBtn1 a").html("拨打电话").attr("href","tel://"+data.data.promotionBaseInfo.conditionList[f].getcondWayValue);
					})
				}
			}
		}
		//productType 1代订 2直订 3实物类直订
		//判断预定步骤step先判断是否是登录
		//是否是2直订1代订
		if(data.data.productBaseInfo.productType==2||data.data.productBaseInfo.productType==3||data.data.productBaseInfo.productType==5) {
			$(".footerRight").html("订购");
			$(".proFooter .footerRight").click(function () {
				//先判断是否登录


			})
		}


		if(data.data.productBaseInfo.status==3){
			$(".status").addClass('status2');
		}
		else if(data.data.productBaseInfo.status==4){
			$(".time").html("优惠即将开始");
		}
		else if(data.data.productBaseInfo.status==2||data.data.productBaseInfo.status==0){
			$(".status").addClass('status1');
		}

//优惠价格参考价：referPrice
		/* var price=data.data.promotion.promotionPrice;
		 var priceDays=data.data.promotion.countDay;*/
		//是否是几何价
		if (data.data.productBaseInfo.plusPrice == undefined) {



			if (data.data.productBaseInfo.referPrice == undefined) {

				$(".footerCenter .yuanJia ").css("display", "none ");
				$(".footerCenter .proJia").css("line-height", "2.5rem");
			}
			else {
				if (data.data.productBaseInfo.pieces == 1) {
					$(".footerCenter .proJia").html(data.data.productBaseInfo.price + " 起/" + data.data.productBaseInfo.piecesUnit);
					$(".footerCenter .yuanJia ").html(data.data.productBaseInfo.referPrice + " 起/" + data.data.productBaseInfo.piecesUnit);
				}
				else {
					$(".footerCenter .proJia").html(data.data.productBaseInfo.price + " 起/ " + data.data.productBaseInfo.pieces + data.data.productBaseInfo.piecesUnit);
					$(".footerCenter .yuanJia ").html(data.data.productBaseInfo.referPrice + " 起/" + data.data.productBaseInfo.pieces +data.data.productBaseInfo.piecesUnit);
				}


			}

		}
		else {
			if (data.data.productBaseInfo.plusPrice == -1) {
				if(data.data.productBaseInfo.price==undefined){
					$(".footerCenter .plusJia").html("几何PLUS用户享受更低价").css("line-height", "2.5rem");
					$(".footerRight").css("display", "none");
					$(".footerRight2").css("display", "block");
					$(".footerCenter .yuanJia ").css("display", "none ");
					$(".footerCenter .proJia ").css("display", "none ");
				}
				else{
					$(".footerCenter .plusJia").html(" 几何PLUS用户享受更低价");
					if (data.data.productBaseInfo.pieces == 1) {
						$(".footerCenter .proJia").html(data.data.productBaseInfo.price + " 起/" + data.data.productBaseInfo.piecesUnit);
					}
					else {
						$(".footerCenter .proJia").html(data.data.productBaseInfo.price + " 起/ " + data.data.productBaseInfo.pieces  + data.data.productBaseInfo.piecesUnit);
					}
					$(".footerCenter .yuanJia ").css("display", "none ");
				}

			}
			else {
				if(data.data.productBaseInfo.price==undefined){
					if (data.data.productBaseInfo.pieces == 1) {
						$(".footerCenter .proJia").html(data.data.productBaseInfo.plusPrice + " 起/" + data.data.productBaseInfo.piecesUnit);
					}
					else {
						$(".footerCenter .proJia").html(data.data.productBaseInfo.plusPrice + " 起/" +data.data.productBaseInfo.pieces  + data.data.productBaseInfo.piecesUnit);
					}

					$(".footerCenter .plusJia ").css("display", "none ");
					$(".footerCenter .yuanJia ").css("display", "none ");
				}
				else{

					if (data.data.productBaseInfo.pieces == 1) {
						$(".footerCenter .proJia").html(data.data.productBaseInfo.plusPrice + " 起/" + data.data.productBaseInfo.piecesUnit);
						$(".footerCenter .yuanJia").html(data.data.productBaseInfo.price + " 起/" + data.data.productBaseInfo.piecesUnit);
					}
					else {
						$(".footerCenter .proJia").html(data.data.productBaseInfo.plusPrice + " 起/" +  data.data.productBaseInfo.pieces +data.data.productBaseInfo.piecesUnit);
						$(".footerCenter .yuanJia").html(data.data.productBaseInfo.price + " 起/ " + data.data.productBaseInfo.pieces + data.data.productBaseInfo.piecesUnit);
					}
					$(".footerCenter .plusJia ").css("display", "none ");
				}

			}


		}
		$(document).ready(function() {


		


		$(".icon").click(function(event) {
	  		window.location="brand.html?id="+data.data.hotelBaseInfo.brandId
	  });





		});


		//酒店介绍

		var hotelName=data.data.hotelBaseInfo.hotelCname;
		var description=data.data.hotelBaseInfo.prmtDesc;

		$(".content h1").html(hotelName);
		$(".detail").html(description);
		var latitude=data.data.hotelBaseInfo.locLat;
		var longitude=data.data.hotelBaseInfo.locLon;
		var address=data.data.hotelBaseInfo.address;
		var phone=data.data.hotelBaseInfo.phone;
		/*$("<img/>").attr("src", "http://restapi.amap.com/v3/staticmap?location="+longitude+","+latitude+"&zoom=10&size=800*400&markers=mid,,A:"+longitude+","+latitude+"&key=ee95e52bf08006f63fd29bcfbcf21df0").appendTo(".mapPic");*/
		$(".map .mapPic img").attr("src","http://restapi.amap.com/v3/staticmap?location="+longitude+","+latitude+"&zoom=10&size=800*400&markers=mid,,A:"+longitude+","+latitude+"&key=ee95e52bf08006f63fd29bcfbcf21df0");
		$(".address").html("地址："+address);
		$(".phone").html("电话："+phone);

		var goToCount=data.data.hotelBaseInfo.userFavorites[0].count;
		var wantCount=data.data.hotelBaseInfo.userFavorites[1].count;
		if(data.data.hotelBaseInfo.recommendPromotions==undefined){
			$(".Promotion").css("display","none");
			$(".proFooterTop").css("display","none");
			$(".phone").css("margin-bottom","0");
		}
		else{
			$.each(data.data.hotelBaseInfo.recommendPromotions,function(i){
				$(".Promotion ").append('<dl><dt class="itemLeft"></dt><dd class="itemRight"><span class="itemRightTop">'+data.data.hotelBaseInfo.recommendPromotions[i].productName+'</span><span class="itemRightBottom"></span></dd></dl>');
			})
			for (var g = $(".Promotion dl").length; g > 0; g--) {
				$(".Promotion dl").eq(g-1).children("dt").css({"background":'url('+data.data.hotelBaseInfo.recommendPromotions[g-1].imgUri+') center center no-repeat',"background-size":"cover","-webkit-background-size":"cover"})
				
				if(data.data.hotelBaseInfo.recommendPromotions[g-1].pieces==1){
					$(".Promotion dl").eq(g-1).children("dd").children(".itemRightBottom").html(data.data.hotelBaseInfo.recommendPromotions[g-1].price+'起/ '+data.data.hotelBaseInfo.recommendPromotions[g-1].piecesUnit);
				}
				else{
					$(".Promotion dl").eq(g-1).children("dd").children(".itemRightBottom").html(data.data.hotelBaseInfo.recommendPromotions[g-1].price+'起/ '+data.data.hotelBaseInfo.recommendPromotions[g-1].pieces+data.data.hotelBaseInfo.recommendPromotions[g-1].piecesUnit);
				}
			}
			$(document).ready(function() {
				$(".Promotion dl").click(function(event) {
                   window.location="activeDetail.html?id="+data.data.hotelBaseInfo.recommendPromotions[$(this).index()].productId
                });
			});
			


		}
		$(".want b").html(wantCount);
		$(".togo b").html(goToCount);
		//判断状态
		if(wantCount>0){
			$(".want i").addClass("wantCurrent");
		}
		if(goToCount>0){
			$(".togo i").addClass("togoCurrent");
		}
		

		
		/* });*/

	});
}
var data='{"id":"' + id + '"}';
var url="/content/client/promotion/detail";
iOSProData(url,data);

