

window.onload=function () {

//1..触碰发音
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

    var keyCode=e.keyCode-50;

    allLis[keyCode].children[1].play();
    allLis[keyCode].children[1].currentTime=0;
};

var buttons=document.getElementsByTagName("button");
for(var i=0;i<buttons.length;i++){

    buttons[i].onmouseover=function () {

        this.children[0].play();
        this.children[0].currentTime=0;
    }
}


    var main_left_header=$("main_left_header");
    var allLi=main_left_header.getElementsByTagName("li");

    for(var i=0;i<allLi.length;i++){

        allLi[i].onmouseover=function () {

            this.children[1].play();
            this.children[1].currentTime=0;
        }
    }

    var content=$("content");
    var Lis=content.getElementsByTagName("li");

    for(var i=0;i<Lis.length;i++){

        Lis[i].onmouseover=function () {

            this.children[1].play();
            this.children[1].currentTime=0;
        }
    }


//2.轮播图
var slider=$("slider");
var slider_main=$("slider_main");
var slider_main_img=slider_main.children;
var slider_ctl=slider.children[1];
var iNow=0;

//动态创建指示器
for(var i=0;i<slider_main_img.length;i++){
    var span=document.createElement("span");
    span.className="slider_ctl_icon";
    span.t=slider_main_img.length-i-1;
    slider_ctl.insertBefore(span,slider_ctl.children[1]);
}

//第一个选中
slider_ctl.children[1].className="slider_ctl_icon current";

// 让滚动内容归位
var scroll_w=slider.offsetWidth;
for(var j=1;j<slider_main_img.length;j++){
    slider_main_img[j].style.left=scroll_w+'px';
}

//遍历监听操作
var slider_ctl_child=slider_ctl.children;
for(var i=0;i<slider_ctl_child.length;i++){
    slider_ctl_child[i].onmousedown=function () {
        if(this.className==="slider_ctl_prev"){

            buffer(slider_main_img[iNow],{"left":scroll_w});
            iNow--;
            if(iNow<0){
                iNow=slider_main_img.length-1;
            }
            slider_main_img[iNow].style.left=-scroll_w+'px';
            buffer(slider_main_img[iNow],{"left":0});


        }else if(this.className==="slider_ctl_next"){

            autoPlay();
        }else{

            var index=parseInt(this.t);
            if(index>iNow){
                buffer(slider_main_img[iNow],{"left":scroll_w});

                slider_main_img[index].style.left=-scroll_w+'px';

            }else if(index<iNow){
                buffer(slider_main_img[iNow],{"left":-scroll_w});

                slider_main_img[index].style.left=scroll_w+'px';
            }
            iNow=index;
            buffer(slider_main_img[iNow],{"left":0});
        }
        changeIndex();
    }
}

//切换索引
function changeIndex() {
    for(var i=1;i<slider_ctl_child.length-1;i++){
        slider_ctl_child[i].className="slider_ctl_icon";

    }

    slider_ctl_child[iNow+1].className="slider_ctl_icon current";}



//自动播放

var timer=setInterval(autoPlay,5000);
function autoPlay() {

    buffer(slider_main_img[iNow],{"left":-scroll_w});
    iNow++;
    if(iNow>=slider_main_img.length){
        iNow=0;
    }
    slider_main_img[iNow].style.left=scroll_w+'px';
    buffer(slider_main_img[iNow],{"left":0});

    changeIndex();
}

//设置清除定时器
slider.onmouseover=function () {
    clearInterval(timer);
};

slider.onmouseout=function () {
    timer=setInterval(autoPlay,5000);
};

//3.Tab选项卡
var allLis=$('main_left_header').getElementsByTagName("li");
var allDom=$('main_left_content').getElementsByClassName("dom");

for(var i=0;i<allLis.length;i++){
    var li=allLis[i];
    li.index=i;

    li.onmousedown = function () {

        for(var j=0;j<allLis.length;j++){
            allLis[j].className="main_left_img";
            allDom[j].style.display="none";
        }

        this.className="main_left_img selected";
        allDom[this.index].style.display="block";
    }
}

//4.阅读模式
    /*var dom=document.getElementsByClassName("dom")[0];
    //var body=document.getElementsByTagName("body");
    var dom_button=dom.getElementsByTagName("button");

    var dom_p=dom.getElementsByTagName("p");
    var dom_h1=dom.getElementsByTagName("h1");
    var dom_h2=dom.getElementsByTagName("h2");
    var open=0;
    dom_button.onclick=function () {
        if (!open) {
            dom.style.backgroundColor= "#ffffff";
            dom_p.style.Color="black";
            dom_p.style.fontSize = "16px";
            dom_h1.style.Color="black";
            dom_h2.style.Color="black";
            console.log(dom_p.style.Color);
            // body.style.backgroundImage='url(#)';
            open = 1;
        } else {
            dom.style.backgroundColor = "#999999";
            dom_p.style.Color="white";
            dom_p.style.fontSize = "12px";
            dom_h1.style.font="black";
            dom_h2.style.Color="black";
            console.log(dom_p.style.Color);
            open = 0;
        }
    };*/
};