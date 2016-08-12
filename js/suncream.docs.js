/*
 *  file name	: 	suncream.docs.js
 *  release		:	2016.08.09
 *  update		:	
 *
 * */

var $logoHeight = $('.sc-header-top').outerHeight(true);
var $gnbHeight = $('.sc-gnb').height();
var topHeight = $logoHeight + $gnbHeight;
var topChk = false;

$('.sc-gnb').on('mouseenter',function(){
	$(this).addClass('on');
}).on('mouseleave',function(){
	$(this).removeClass('on');

});

