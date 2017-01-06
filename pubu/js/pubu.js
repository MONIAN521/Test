window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"},{"src":"04.jpg"}]}
	window.onscroll=function(){
		if (checkScrollSide) {
			var oParent=document.getElementById('main');
			//将数据块渲染到页面
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src="img/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
		
	}
}
function waterfall(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
//	console.log(oBoxs.length);
	//计算整个页面现实的列数（页面宽/box的宽）
	var oBoxW=oBoxs[0].offsetWidth;
//	console.log(oBoxW);
	
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
//	console.log(cols);
	//设置main的宽的
	oParent.style.cssText='width:'+oBoxs*cols+'px;margin:0 auto';
	
	var hArr=[];
	for (var i=0;i<oBoxs.length;i++) {
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
//			console.log(minH);
			var index=getMinhInndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
//			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			oBoxs[i].style.left=oBoxW*index+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
//	console.log(hArr);
}
//根据class获取元素存储方式是数组
function getByClass(parent,clsName){
	var boxArr=new Array(),
		oElements=parent.getElementsByTagName('*');
	for (var i=0;i<oElements.length;i++) {
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}		
	}
	return boxArr;
}
function getMinhInndex(arr,val){
	for (var i in arr) {
		if(arr[i]==val){
			return i;
		}
	}
}
//检测是否具有滚条加载数据块的条件
function checkScrollSide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
//	console.log(height);
	return(lastBoxH<scrollTop+height)?true:false;
}
