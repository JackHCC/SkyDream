window.onload=function () {

    //1.发帖
    $("arti_btn").onclick=function () {
        var content=$("arti_text").value; //获取输入内容

        if(content.length===0){
            alert("请输入内容");
            return ;
        }  //判断

        var li =document.createElement("li");
        li.innerHTML= content + '<a href="javascript:;">删除</a>';
        //$("ul").appendChild(li);
        $("arti_ul").insertBefore(li,$("arti_ul").children[0]);   //插入在之前发表的前面

        $("arti_text").value="";  //清除输入的内容

        var as=$("arti_ul").getElementsByTagName("a");

        for (var i=0;i<as.length;i++){
            var a=as[i];
            a.onclick=function () {
                this.parentNode.remove();
            }
        }
    }
    
    //2.音乐按钮
    var audio=$("audio");
    var audio1=$("audio1");
    var audio2=$("audio2");
    var audio3=$("audio3");
    var audio4=$("audio4");
    var open=0,open1=0,open2=0,open3=0,open4=0;
    $("audio_main").onclick=function () {
        if(!open) {
            audio.play();
            open=1;
        }else{
            audio.pause();
            open=0;
        }
    };
    $("apdix_btn1").onclick=function () {
        if(!open1) {
            audio1.play();
            open1=1;
        }else{
            audio1.pause();
            open1=0;
        }
    };
    $("apdix_btn2").onclick=function () {
        if(!open2) {
            audio2.play();
            open2=1;
        }else{
            audio2.pause();
            open2=0;
        }
    };
    $("apdix_btn3").onclick=function () {
        if(!open3) {
            audio3.play();
            open3=1;
        }else{
            audio3.pause();
            open3=0;
        }
    };
    $("apdix_btn4").onclick=function () {
        if(!open4) {
            audio4.play();
            open4=1;
        }else{
            audio4.pause();
            open4=0;
        }
    };

    //3.背景无限轮播
        var slider=$("slider");
        var slider_main=$("slider_main");
        var slider_main_img=slider_main.children;
        var slider_ctl=$("slider_ctl");
        var iNow=0;

        //动态创建指示器
        for(var i=0;i<slider_main_img.length;i++) {
            var span = document.createElement("span");
            span.className = "slider_ctl_icon";
            span.t = i;
            slider_ctl.appendChild(span);
        }
        //第一个选中
        slider_ctl.children[0].className="slider_ctl_icon current";

        // 让滚动内容归位
        var scroll_H=slider.offsetWidth;
        for(var j=1;j<slider_main_img.length;j++){
            slider_main_img[j].style.left=scroll_H+'px';
        }

        //遍历监听操作
        var slider_ctl_child=slider_ctl.children;
        for(var i=0;i<slider_ctl_child.length;i++){

            slider_ctl_child[i].onmousedown=function () {

                clearInterval(timer);
                autoPlay();

                    var index=parseInt(this.t);
                    if(index>iNow){
                        buffer(slider_main_img[iNow],{"left":scroll_H});

                        slider_main_img[index].style.left=-scroll_H+'px';

                    }else if(index<iNow){
                        buffer(slider_main_img[iNow],{"left":-scroll_H});

                        slider_main_img[index].style.left=scroll_H+'px';
                    }
                    iNow=index;
                    buffer(slider_main_img[iNow],{"left":0});

                    changeIndex();

            }
        }

        //切换索引
        function changeIndex() {
            for(var i=0;i<slider_ctl_child.length;i++){
                slider_ctl_child[i].className="slider_ctl_icon";

            }

            slider_ctl_child[iNow].className="slider_ctl_icon current";}

        //自动播放

               var timer=setInterval(autoPlay,10000);
                function autoPlay() {



                    buffer(slider_main_img[iNow],{"left":-scroll_H});
                    iNow++;
                    if(iNow>=slider_main_img.length){
                        iNow=0;
                    }
                    slider_main_img[iNow].style.left=scroll_H+'px';
                    buffer(slider_main_img[iNow],{"left":0});

                    changeIndex();
                }

        //4.触碰发音
        var nav=$("nav");
        var allLis=nav.children;

    for(var i=1;i<allLis.length;i++){

        allLis[i].onmouseover=function () {

            this.children[1].play();
            this.children[1].currentTime=0;
        }
    }

    //键盘发音
    // var key=[65,83,68,70,74,75,76];
    document.onkeydown=function (event) {
        var e=event||window.event;

         var keyCode=e.keyCode-49;

        allLis[keyCode].children[1].play();
        allLis[keyCode].children[1].currentTime=0;
    };

    var apdix=$("apdix");
    var lis=apdix.getElementsByTagName("li");
    for(var i=0;i<lis.length;i++){

        lis[i].onmouseover=function () {

            this.children[1].play();
            this.children[1].currentTime=0;
        }
    }

    // var signin=$("signin");
    var buttons=document.getElementsByTagName("button");
    for(var i=0;i<buttons.length;i++){

        buttons[i].onmouseover=function () {

            this.children[0].play();
            this.children[0].currentTime=0;
        }
    }
};