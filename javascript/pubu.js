window.onload=function () {

    waterfull("main","box");

    var timer1=null;
    window.onscroll=function () {

        clearTimeout(timer1);

        timer1=setTimeout(function () {//节流
            waterfull('main','box');
        },200)
        if(checkWillLoadImage()){
            //1.造数据
            var dateArr=[
                {"src":"./photos/photo%20(38).jpg"},
                {"src":"./photos/photo%20(39).jpg"},
                {"src":"./photos/photo%20(40).jpg"},
                {"src":"./photos/photo%20(41).jpg"},
                {"src":"./photos/photo%20(42).jpg"},
                {"src":"./photos/photo%20(43).jpg"},
                {"src":"./photos/photo%20(44).jpg"},
                {"src":"./photos/photo%20(45).jpg"},
                {"src":"./photos/photo%20(46).jpg"},
                {"src":"./photos/photo%20(47).jpg"},
                {"src":"./photos/photo%20(48).jpg"},
                {"src":"./photos/photo%20(49).jpg"},
                {"src":"./photos/photo%20(50).jpg"},
                {"src":"./photos/photo%20(51).jpg"},
                {"src":"./photos/photo%20(52).jpg"},
                {"src":"./photos/photo%20(53).jpg"},
                {"src":"./photos/photo%20(54).jpg"},
                {"src":"./photos/photo%20(55).jpg"},
                {"src":"./photos/photo%20(56).jpg"},
                {"src":"./photos/photo%20(57).jpg"},
                {"src":"./photos/photo%20(58).jpg"},
                {"src":"./photos/photo%20(59).jpg"},
                {"src":"./photos/photo%20(60).jpg"},
            ];

            //2.创建元素
            for(var i=0;i<dateArr.length;i++){
                var newBox=document.createElement("div");
                newBox.className="box";
                $("main").appendChild(newBox);

                var newPic=document.createElement("div");
                newPic.className="pic";
                newBox.appendChild(newPic);

                var newImg=document.createElement("img");
                newImg.src=dateArr[i].src;
               newPic.appendChild(newImg);
            }

            //3，重新布局

        }
    }
    
    //窗口大小发生变化
    var timer=null;
    window.onresize=function () {
        clearTimeout(timer);

        timer=setTimeout(function () {//节流
            waterfull('main','box');
        },200)

    }
}

//瀑布流函数封装
function waterfull(parent,child) {
    //1.获取所有盒子
    var allBox=$(parent).getElementsByClassName(child);
    //2.获取子盒子宽度
    var boxWidth=allBox[0].offsetWidth;
    //3.获取屏幕宽度
    var screenW=document.documentElement.clientWidth;
    //4.求出列数
    var cols=parseInt(screenW/boxWidth);

    //5.父盒子居中
    $(parent).style.width=cols*boxWidth+'px';
    $(parent).style.margin="0 auto";

    //1.定义高度数组
    var heightArr=[],boxHeight=0,minBoxHeight=0,minBoxIndex=0;
    //2.遍历子盒子
    for(var i=0;i<allBox.length;i++){
        //2.1求出每个盒子高度
        boxHeight=allBox[i].offsetHeight;

        //2.2取出第一行盒子高度放入高度数组
        if(i<cols){
            heightArr.push(boxHeight);
            allBox[i].style='';
        }else{
            //1.取出最矮盒子高度
            minBoxHeight=_.min(heightArr); //underscore库中的取最小值函数

            //2.取出最矮盒子索引
            minBoxIndex=getMinBoxIndex(heightArr,minBoxHeight);//调用自定义取索引函数

            //3。子盒子定位
            allBox[i].style.position="absolute";
            allBox[i].style.left=minBoxIndex*boxWidth+'px';
            allBox[i].style.top=minBoxHeight+'px';

            //4.更新最小高度
            heightArr[minBoxIndex]+=boxHeight;
        }
    }

}

//去除最小高度的索引
function getMinBoxIndex(arr,val) {
    for(var i=0;i<arr.length;i++){
        if(arr[i]===val){
            return i;
        }
    }
}

//加载图片条件
function checkWillLoadImage() {

    //1.获取最后一个盒子
    var allBox=document.getElementsByClassName("box");
    var lastBox=allBox[allBox.length-1];

    //2.求出最后一个盒子自身高度一半
    var lastBoxDis=lastBox.offsetHeight*0.5+lastBox.offsetTop;

    var screenW=document.body.clientHeight||document.documentElement.clientHeight;

    //4.页面偏离浏览器高度
    var scrollTop=scroll().top;

    return lastBoxDis<=screenW+scrollTop;
}

function $(id) {
    return typeof id==="string"?document.getElementById(id):null;
}

//scroll封装
function scroll() {
    if(window.pageYOffset!==null){
        return{
            top:window.pageYOffset,
            left:window.pageXOffset,

        }
    }else if(document.compatMode==="CSS1Compat"){
        return{
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft,
        }
    }
    return{
        top:document.body.scrollTop,
        left:document.body.scrollLeft,
    }
}