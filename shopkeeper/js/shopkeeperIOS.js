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


var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

if(isAndroid) {
    var url, andrData;
    var device = new Device();
    device.requestCommit('#', "{'id':'"+id+"'}");

}else if(isiOS) {

    //--------IOS中的逻辑-------------

    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: '/content/client/topic/detail?',
            data: {data:'{"id":'+id+'}'},
            dataType: 'json',
            async:false,
            success: function (data) {
                $("#top_img").attr("src",data.data.hotelBaseInfo.hotelImgs);
                $("#shopkeeper_img").attr("src",data.data.hotelOwnerInfo.headimgurl);
                $("#shopkeeper_name span").append(data.data.hotelOwnerInfo.name);
                $("#intro_text").append(data.data.hotelBaseInfo.brief);
            },
            error:function(){},
        });
    })
}
