// ==UserScript==
// @name        Youtube Auto Subtitle Downloader
// @description  download youtube AUTO subtitle.
// @include      http://www.youtube.com/watch?*
// @include      https://www.youtube.com/watch?*
// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js
// @version 0.0.1.20140930033554
// @namespace https://greasyfork.org/users/5711
// ==/UserScript==


// Author : Cheng Zheng
// Author Email : guokrfans@gmail.com
// Author Github : https://github.com/1c7
// Last update  :  2014/9/29

// 作者 : 郑诚
// 作者邮箱 : guokrfans@gmail.com
// 作者 Github : https://github.com/1c7
// 作者微博 : @糖醋陈皮 ( http://weibo.com/p/1005052004104451 )
// 最近一次升级 : 2014/9/29

$(document).ready(function(){
    
    //------------------------------------
    //
    //  往页面上加个按钮
    //
    //------------------------------------
    $("#eow-title")
    .append('<a id="YT_auto">Download Youtube Auto Subtitle | 下载Youtube自动字幕</a>');

    
    
    //------------------------------------
    //
    //  调整一下样式
    //
    //------------------------------------
    $("#YT_auto").addClass('start yt-uix-button yt-uix-button-text yt-uix-tooltip'); // 这些样式是Youtube自带的.
    
    $("#YT_auto").css('margin-top','2px');  
    $("#YT_auto").css('margin-left','4px'); 
    // 有点没对齐..加点边距对齐一下..
    $("#YT_auto").css('border','1px solid rgb(0, 183, 90)');
    $("#YT_auto").css('cursor','pointer');
    $("#YT_auto").css('color','rgb(255, 255, 255)');
    $("#YT_auto").css('border-top-left-radius','3px');
    $("#YT_auto").css('border-top-right-radius','3px');
    $("#YT_auto").css('border-bottom-right-radius','3px');
    $("#YT_auto").css('border-bottom-left-radius','3px');
    $("#YT_auto").css('background-color','#00B75A');
    // 为了美观的 css 样式

    $("#YT_auto").hover(function() {
       $(this).css("background-color","rgb(0, 163, 80)");
       $(this).css("border","1px solid rgb(0, 183, 90)");
    });
    // 鼠标悬浮时改变一下背景颜色;
    
    $("#YT_auto").mouseout(function() {
       $(this).css("background-color","#00B75A");
    });
    
    
    //------------------------------------
    //
    //  点击就下载
    //
    //------------------------------------
    $("#YT_auto").click(function(){
        download_subtitle();
    });

});

function getTmp(strstr){
    splitobj = strstr.split(":");
    tmp = ""
        if(splitobj.length<3)
        {
            if(parseInt(splitobj[0])<10){
                tmp = "00:0"+strstr;
            }else if(parseInt(splitobj[0])>59){
                inttmp = Math.floor(parseInt(splitobj[0])/60);
                itmp = (inttmp < 10)?"0"+inttmp:""+inttmp;
                modtmp = parseInt(splitobj[0]) % 60;
                mtmp = (modtmp < 10)?"0"+modtmp:""+modtmp;
                tmp = itmp+":"+mtmp+":"+splitobj[1];
            }else{
                tmp = "00:"+strstr;
            } 
        }
        else{
            tmp = strstr;
        }
    return tmp;
}


function download_subtitle(){
	$("#action-panel-overflow-menu button").eq(1).click();
       var vtitle = $("#eow-title").text().trim().replace("\n","")
	setTimeout(function(){ 
        var strTextArray = new Array();
        var strTimeArray = new Array();
        var count=0;
		$("#transcript-scrollbox .caption-line-text").each(function(){
            strTextArray[count] = $(this).text().replace("\n"," ");
            count = count+1;
            //strTime = strTime + $(this).text().replace("\n"," ")+"\n";
        });
       var count=0;
		$("#transcript-scrollbox .caption-line-time").each(function(){
            strTimeArray[count] = $(this).text().replace("\n"," ");
            count = count+1;
           // strText = strText + $(this).text().replace("\n"," ")+"\n";
        });
        result = "";
        for(var i=0;i<strTimeArray.length-1;i++)
        {
            tmpleft = getTmp(strTimeArray[i])+",300";
            tmpright = getTmp(strTimeArray[i+1])+",100";
            if (i > 0){
                 result = result + "\n"
            } 
            result = result + (i+1) +"\n"
            result = result + tmpleft + " --> " + tmpright +"\n";
            result = result + strTextArray[i]+"\n";
        }


       downloadFile(vtitle+".srt",result);
    },2000);
	
}

function downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}
