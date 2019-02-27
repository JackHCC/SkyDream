window.AudioContext=window.AudioContext||
					window.webkitAudioContext||
					window.mozAudioContext;
window.requestAnimationFrame = window.requestAnimationFrame ||
								window.webkitRequestAnimationFrame || 
								window.mozRequestAnimationFrame || 
								window.msRequestAnimationFrame;
window.onload = function(){
	var oBtn = id("play");
	var audio = id("audio");
	var m_star = id("m_star").getElementsByTagName("img")[0];
	var pre = id("pre");
	var next = id("next");
	var m_gm = id("m_gm");
	var m_singer = id("m_singer");
	var wp_totalTime = id("wp_totalTime");
	var lrcCon = id("lrcCon");
	var n = 0;
	var txt = data[0].lrc;//保存歌词
	var mark = true;
	oBtn.onclick = function(){
		if (mark)
		{
			audio.play();
			this.style.backgroundImage = "url(images/zan.png)";
			m_star.className = "rotate";
		}else{
			audio.pause();
			this.style.backgroundImage = "url(images/play.png)";
			m_star.className = "";
		}
		mark = !mark;
		wp_totalTime.innerHTML = time(audio.duration);
	}
	//歌曲左右切换
	pre.onclick = function(){
		n--;
		if(n<0)n = data.length-1;
		playing(n);
	}
	next.onclick = function(){
		n++;
		if(n>data.length-1)n = 0;
		playing(n);
	}
	
	function playing(n){
		audio.src = data[n].src;
		m_gm.innerHTML = data[n].name;
		m_singer.innerHTML = data[n].singer;
		m_star.src = data[n].star; 
		txt = data[n].lrc;
		m_star.className = "rotate";
		oBtn.style.backgroundImage = "url(images/zan.png)";
		mark = false;
		lrcCon.style.marginTop = 20 + "px";
		currentLrc();
		audio.play();
		load();
	}
	//歌曲菜单栏
	var menu = id("menu");
	var m_list = document.getElementsByClassName("m_list")[0];
	var mark1 = true;
	menu.onclick = function(){
		if (mark1)
		{
			move(m_list,"right",0,500);
		}else{
			move(m_list,"right",-300,500);
		}
		mark1 = !mark1;
	}
	//音乐列表歌曲对应
	var oLi = m_list.getElementsByTagName("li");
	for (var i=0;i<oLi.length ;i++ )
	{
		oLi[i].index = i;
		oLi[i].onclick = function(){
			n = this.index;
			playing(n);
		}
	}
	//播放完成自动跳转下一曲
	audio.addEventListener("ended",function(){
		n++;
		if(n>data.length-1)n=0;
		playing(n);
	},false);
	//监听歌曲是否加载完成
	function load(){
		audio.addEventListener("canplay",function(){
			wp_totalTime.innerHTML = time(audio.duration);
		},false)
	}
	
	//当前播放时间
	var wp_playTime = id("wp_playTime");
	var wp_process = id("wp_process");
	var wp_processBar = id("wp_processBar");
	var wp_processBtn = id("wp_processBtn");
	audio.addEventListener("timeupdate",function(){
		nowTime();
	});
	function nowTime(){
		wp_playTime.innerHTML = time(audio.currentTime);
		var n = audio.currentTime/audio.duration;
		wp_processBtn.style.left = n*(wp_process.offsetWidth-wp_processBtn.offsetWidth)+"px";
		wp_processBar.style.width = n*(wp_process.offsetWidth-wp_processBtn.offsetWidth)+"px";
	}
	//拖拽进度条
	wp_processBtn.onmousedown = function(ev){
		var ev = ev || window.event;
		var x = ev.clientX - this.offsetLeft;
		document.onmousemove = function(ev){
			var _left = ev.clientX - x;
			if (_left <= 0)
			{
				_left = 0;
			}else if(_left >= wp_process.offsetWidth-wp_processBtn.offsetWidth){
				_left = wp_process.offsetWidth-wp_processBtn.offsetWidth;
			}
			wp_processBtn.style.left = _left + "px";
			wp_processBar.style.width = _left + "px";
			var proN = _left/(wp_process.offsetWidth-wp_processBtn.offsetWidth);
			audio.currentTime = proN*audio.duration;
			nowTime();
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
	//音量控制
	var wp_volProcess = id("wp_volProcess");
	var wp_volBar = id("wp_volBar");
	var wp_volBtn = id("wp_volBtn");
	var wp_mute = id("wp_mute");
	wp_volBtn.onmousedown = function(ev){
		var ev = ev || window.event;
		var x = ev.clientX - this.offsetLeft;
		document.onmousemove = function(ev){
			var w = ev.clientX - x;
			if (w <= 0)
			{
				w = 0;
			}else if(w >= wp_volProcess.offsetWidth-wp_volBtn.offsetWidth){
				w = wp_volProcess.offsetWidth-wp_volBtn.offsetWidth;
			}
			wp_volBar.style.width = w + "px";
			var proN = w/(wp_volProcess.offsetWidth-wp_volBtn.offsetWidth);
			audio.volume = proN;
			nowTime();
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
	wp_mute.onclick = function(){
		audio.volume = 0;
		wp_volBar.style.width = "0px";
	}

	//创建一个音乐对象
	var actx = new AudioContext();
	//创建一个分析节点
	var analyser = actx.createAnalyser();
	//创建媒体源节点
	var audioSrc = actx.createMediaElementSource(audio);
	audioSrc.connect(analyser);//将媒体源节点与分析机制连接
	analyser.connect(actx.destination);//将分析机制与目标点连接(扬声器)
	
	var can = id("canvas");
	var cxt = can.getContext("2d");
	color = cxt.createLinearGradient(can.width*.5,0,can.width*.5,100);
	color.addColorStop(0,"#00f");
	color.addColorStop(0.5,"#f00");
	color.addColorStop(1,"#0f0");
	colorf = cxt.createLinearGradient(can.width*.5,100,can.width*.5,200);
	colorf.addColorStop(0,"#0f0");
	colorf.addColorStop(0.5,"#f00");
	colorf.addColorStop(1,"#00f");
	var num = 100;
	function draw(){
		//创建一个与音乐频次等长的数组
		var voicehigh = new Uint8Array(analyser.frequencyBinCount);
		//将分析出来的音频数据添加到数组里面
		analyser.getByteFrequencyData(voicehigh);
		//console.log(voicehigh);
		var step = Math.round(voicehigh.length/num);
		cxt.clearRect(0,0,can.width,can.height);
		cxt.beginPath();
		for (var i=0;i<num ; i++)
		{
			var value = (voicehigh[step*i])/3;
			cxt.fillStyle = color;
			cxt.fillRect(i*10+can.width*.5,100,7,-value+1);
			cxt.fillRect(can.width*.5-(i-1)*10,100,7,-value+1);
			cxt.fillStyle = colorf;
			cxt.fillRect(i*10+can.width*.5,100,7,value+1);
			cxt.fillRect(can.width*.5-(i-1)*10,100,7,value+1)
		}
		requestAnimationFrame(draw);
	}
	draw();
	
	//歌词同步
	
	function currentLrc(){
		var lrcArr = txt.split("[");
		//console.log(lrcArr);
		var html = '';
		for (var i=0;i < lrcArr.length ;i++ )
		{
			var arr = lrcArr[i].split("]");
			//console.log(arr);
			var time = arr[0].split(".");
			var timer = time[0].split(":");
			//console.log(timer);
			var ms = timer[0]*60 + timer[1]*1;//将时间转换为秒
			//console.log(ms);
			var text = arr[1];//歌词内容
			if (text)
			{
				html += "<p id=gc"+ms+">"+text+"</p>"
			}
			lrcCon.innerHTML = html;
		}
		var sum = 0;
		var curTime = 0;
		var oP= lrcCon.getElementsByTagName("p");
		audio.addEventListener("timeupdate",function(){
			curTime = parseInt(this.currentTime);//获取当前播放的时间
			//console.log(curTime);
			if (document.getElementById("gc"+curTime))
			{	
				//console.log(document.getElementById("gc"+curTime));
				for (var i=0;i<oP.length ;i++  )
				{
					oP[i].style.color = "#ccc";
				}
				document.getElementById("gc"+curTime).style.color = "#f00";
				if (oP[8+sum].id == "gc"+curTime)
				{
					lrcCon.style.marginTop = 20-sum*20 + "px";
					sum++;
				}
			}
		});
	}
	currentLrc();
}

function id(idName){
	return document.getElementById(idName);
}
//封装运动框架
function move(obj,attr,value,time){
	//获取对象的初始属性值
	var startValue = parseFloat(getStyle(obj,attr));
	var nowTime = new Date();
	var timer = setInterval(function(){
		var n = (new Date() - nowTime)/time;
		if (n >=1 )
		{
			n = 1;
			clearInterval(timer);
		}
	obj.style[attr] = startValue + n*(value - startValue) + "px";
	},1000/60)
	
}

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

//设置时间格式
function time(cTime){
	cTime = parseInt(cTime);
	//var h = zero(Math.floor(cTime/3600));
	var m = zero(Math.floor(cTime%3600/60));
	var s = zero(Math.floor(cTime%60));
	return m+":"+s;
}
function zero(num){
	if (num < 10)
	{
		return "0"+num;
	}else{
		return ' '+num;
	}
}