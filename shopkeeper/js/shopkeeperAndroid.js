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
                    document.title = JSON.stringify(data.data.shareInfo);
                    requestData = (data);
                    var str1 = JSON.stringify(data);
                    //-------------操作逻辑-------------
                    $("#top_img").attr("src",data.data.hotelBaseInfo.hotelImgs);
                    $("#shopkeeper_img").attr("src",data.data.hotelOwnerInfo.headimgurl);
                    $("#shopkeeper_name span").append(data.data.hotelOwnerInfo.name);
                    $("#intro_text").append(data.data.hotelBaseInfo.brief);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status+"/"+XMLHttpRequest.readyState);
                    alert("网络有点儿问题~~");
                }

            })
        }
        // if END--------
    }
    //this.setRequestData  END-------
}
