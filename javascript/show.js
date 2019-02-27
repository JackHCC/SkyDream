/* ʵ��˼·��
 * 1.ͨ��css3 ��transfrom��opacity��zIndex�����������ֲ����λ��
 * 2.ͨ��js��ȡÿ���ֲ����transfrom��opacity��zIndex���Բ���˳������ά����
 * 3.ͨ�������pull��pop��shift��unshift��������������ͷβ�������ݵ�λ�������������飻
 * 4.�������е����鰴������˳�����¸�ֵ���ֲ���Ŀ��ʵ�����Ұ�ť�Ķ���Ч��
*/
/* ֪ʶ������
 * 1. ͨ��querySelector��querySelectorAll����
	  querySelector�������ص���DOMԪ�ض���queryselectorAll��������ӵ��DOM��nodeList
	  ���ϣ��ü���ӵ��length���ԣ���ͨ���±��ȡָ��DOM�ڵ����
 * 2. style��ʽ������getComputedStyle(obj,null)\obj.currentStyle
	  ע�⣺getAttribute/setAttribute�������ڲ���Ԫ�����ԣ�
	        getComputedStyle(obj,null)\obj.currentStyle���ڶ�ȡԪ�����ճ��ֵ���ʽ��
			������ʽֻ��ͨ��obj.style��ʽ��
			obj.style��ʽֻ�ܻ�ȡ�м���ʽ�����ܻ�ȡcss��ʽ
*/
/* δ������⣺
   1��moveToLeft��moveToRight������������window.onload�ⲿʱ������arr����δ�������⣬δ�ҵ�ԭ��
*/
window.onload = function(){
	
	var slideItems = document.querySelectorAll(".wrapper .slide li");
	var leftBtn = document.querySelector(".wrapper .controller .btn-left");
	var rightBtn = document.querySelector(".wrapper .controller .btn-right");
	var arr = new Array();
	var len = slideItems.length;
	var timer = null;
	for(var i=0; i<len; i++){
		//��ȡ�ֲ������css��ʽ
		var transform = getStyle(slideItems[i]).transform;
		var opacity = getStyle(slideItems[i]).opacity;
		var zIndex = getStyle(slideItems[i]).zIndex;
		arr.push([transform,opacity,zIndex]);
	}
	
	//���Ҽ�ͷ��ť�ϰ󶨵���¼�
	leftBtn.addEventListener("click",moveToLeft);
	rightBtn.addEventListener("click",moveToRight);
	
	//�Զ��ֲ�
	carousel();
	
	//�������ֹͣ�ֲ�
	document.querySelector(".wrapper .slide").addEventListener("mouseenter",function(){
		clearInterval(timer);
	});
	
	//����Ƴ������ֲ�
	document.querySelector(".wrapper .slide").addEventListener("mouseleave",function(){
		timer = setInterval(function(){
			moveToRight();
		},1000);
	});
	
	function carousel(){
		timer = setInterval(function(){
			moveToRight();
		},3000);
	}
	
	//����
	function moveToLeft(){
		arr.unshift(arr.pop());
		for(var i=0; i<len; i++){
			slideItems[i].style.transform = arr[i][0];
			slideItems[i].style.opacity = arr[i][1];
			slideItems[i].style.zIndex = arr[i][2];
		}
	}
	
	//����
	function moveToRight(){
		arr.push(arr.shift());
		for(var i=0; i<len; i++){
			slideItems[i].style.transform = arr[i][0];
			slideItems[i].style.opacity = arr[i][1];
			slideItems[i].style.zIndex = arr[i][2];
		}	
	}
};

function getStyle(obj){
	return obj.currentStyle? obj.currentStyle:getComputedStyle(obj);
}

