/*
* @Author: thinkpad
* @Date:   2017-08-24 12:03:50
* @Last Modified by:   thinkpad
* @Last Modified time: 2017-08-24 20:13:40
*/
window.onload=function (){
	headerOpacity();
	countDown();
	sliderBanner();
}
function headerOpacity(){
	var headerDom=document.querySelector(".jd_header");
	var navHeight=document.querySelector(".jd_nav").offsetTop+document.querySelector(".jd_nav").offsetHeight;
	headerDom.style.backgroundColor="rgba(201, 21, 35,0)";
	window.onscroll=function (){
		var scrollTop=document.body.scrollTop;
		// console.log(scrollTop);
		var opacity=scrollTop/navHeight;
		headerDom.style.backgroundColor="rgba(201, 21, 35,"+opacity+")";
		if(opacity>1){
			opacity=1;
		}
	}
}

function countDown(){
	var hour=3;
	var liArr=document.querySelectorAll(".jd_main .content_top li");
	liArr[0].innerHTML=Math.floor(hour/10);
	liArr[1].innerHTML=hour;
	var secTotal=hour*60*60;
	// secTotal=5;
	var timer=setInterval(function (){
		secTotal--;
		var hourFirst=Math.floor(Math.floor(secTotal/3600)/10);
		// console.log(hourFirst);
		var hourSec=Math.floor(secTotal/3600)%10;
		// console.log(hourSec);
		var minFirst=Math.floor(Math.floor(secTotal%3600/60)/10);
		var minSec=Math.floor(secTotal%3600/60)%10;
		var secFirst=Math.floor(Math.floor(secTotal%60)/10);
		var secSec=Math.floor(secTotal%60)%10;
		liArr[0].innerHTML=hourFirst;
		liArr[1].innerHTML=hourSec;
		liArr[3].innerHTML=minFirst;
		liArr[4].innerHTML=minSec;
		liArr[6].innerHTML=secFirst;
		liArr[7].innerHTML=secSec;
		if(secTotal===0){
			clearInterval(timer);
			return;
		}
	}, 1000);
}
function sliderBanner(){
	var screenWidth=document.body.offsetWidth;
	var ulSlider=document.querySelector(".jd_banner .banner_images");
	var liIndex=document.querySelectorAll(".jd_banner .banner_index li");
	var index=1;
	ulSlider.style.transition = "all .3s";
	var timer=setInterval(function (){
		index++;
		ulSlider.style.transition = "all .3s";
		ulSlider.style.transform="translateX("+(-index*screenWidth)+"px)";
	}, 1000);
	ulSlider.addEventListener("webkitTransitionEnd", function (){
		console.log(1);
		if(index>8){
			ulSlider.style.transition = "";
			ulSlider.style.transform="translate("+(-screenWidth)+"px)";
			index=1;			
		}
		if(index<1){
			index=8;
			ulSlider.style.transition = "";
			ulSlider.style.transform="translate("+(-index*screenWidth)+"px)";
		}
		for (var i = 0; i < liIndex.length; i++) {
			liIndex[i].classList.remove("current");
		};
		liIndex[index-1].classList.add("current");				
	});
	var startX=0;
	var moveX=0;
	ulSlider.addEventListener("touchstart",function (event){
		clearInterval(timer);
		ulSlider.style.transition = '';
		// console.log(1);
		// console.log(event);
		startX=event.touches[0].clientX;
		// console.log(startX);
	});
	ulSlider.addEventListener("touchmove",function (event){
		moveX=event.touches[0].clientX-startX;
		ulSlider.style.transform="translateX("+(-index*screenWidth+moveX)+"px)";
	});
	ulSlider.addEventListener("touchend",function (){
		ulSlider.style.transition = "all .3s";
		if(Math.abs(moveX)>screenWidth/3){
			if(moveX>0){
				index--;
			}else{
				index++;
			}
			ulSlider.style.transform="translateX("+(-index*screenWidth)+"px)";
		}else{
			ulSlider.style.transform="translateX("+(-index*screenWidth)+"px)";
		}
		timer=setInterval(function (){
			index++;
			ulSlider.style.transition = "all .3s";
			ulSlider.style.transform="translateX("+(-index*screenWidth)+"px)";
		}, 1000);
	});

}