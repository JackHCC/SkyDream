//myFunc常用函数封装库


//获取ID函数
//id:对象的id[string]
function $(id) {
    return typeof id==="string"?document.getElementById(id):null;
}


//滚轮左上长度封装兼容函数
//返回滚轮左上长度
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


//可视区域的封装兼容函数
//返回可视区域宽高
function client() {
    if(window.innerWidth){
        return{
            width:window.innerWidth,
            height:window.innerHeight,
        }
    }else if(document.compatMode==="CSS1Compat"){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight,
        }
    }
    return{
        width:document.body.clientWidth,
        height:document.documentElement.clientHeight,
    }
}


//获取CSS样式封装兼容函数
/*obj:调用对象[string]
attr:调用对象的那个属性[string]*/
function getCSSStyleAttr(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}


//匀速动画
/*element:调用对象[string]
target:结束值 [num]
speed:速度[num]*/
function constant(element,target,speed){

    clearInterval(element.timer);

    //判断方向
    var dir=element.offsetLeft<target?speed:-speed;

    element.timer=setInterval(function () {
        element.style.left=element.offsetLeft+dir+'px';


        if(Math.abs(target-element.offsetLeft)<Math.abs(dir)){
            clearInterval(element.timer);

            element.style.left=target+'px';
            console.log(element.offsetLeft, target);
        }
    },20);

}


//缓动动画封装
/*obj:调用的对象 [string]
json:属性键值对
fn：回调函数*/
function buffer(obj,json,fn) {

    clearInterval(obj.timer);

    var begin=0,target=0,speed=0;
    obj.timer=setInterval(function () {

        var flag=true;
        for(var k in json){

            if("opacity"===k){//透明度

                begin=Math.round(parseFloat(getCSSStyleAttr(obj,k))*100 )||100;
                target=parseInt(parseFloat(json[k]*100));
            }else if("scrollTop"===k){
                begin=Math.ceil(obj.scrollTop);
                target=parseInt(json[k]);
            }
            else{//其他情况
                begin=parseInt(getCSSStyleAttr(obj,k)) ||0;
                target=parseInt(json[k]);
            }

            speed=(target-begin)*0.1;

            speed=(target>begin)?Math.ceil(speed):Math.floor(speed);

            if("opacity"===k){//透明度
                //w3c浏览器
                obj.style.opacity=(begin+speed)/100;
                //ie浏览器
                obj.style.filter='alpha(opacity:'+(begin+speed)+')';
            }else if("scrollTop"===k){
                obj.scrollTop=begin+speed;
            } else if("zIndex"===k){
                obj.style[k]=json[k];
            } else{
                obj.style[k]=begin+speed+'px';
            }


            if(begin!==target){
                flag=false;
            }
        }

        if(flag){
            clearInterval(obj.timer);

            if(fn){
                fn();
            }
        }

    },20);
}


//函数节流
/*fn：要执行的函数
delay：多少毫秒后执行*/
function throttle(fn,delay){
    var timer=null;
    return function () {
        clearTimeout(timer);
        timer=setTimeout(fn,delay);
    }
}