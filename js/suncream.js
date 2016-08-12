/*
 *  file name	: 	suncream.min.js
 *  release		:	2016.05.12
 *  update		:	2016.05.12
 *
 * */

var Suncream = {}; // namespace

Suncream.UiManager = (function(){
	
	// private members

	// public members
	return{

		/* 모바일기기 체크
		----------------------------------------------------------*/
		isMobile: {
			Android : function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS : function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera : function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows : function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any : function() {
				console.log(this);
				return (Suncream.UiManager.isMobile.Android() || Suncream.UiManager.isMobile.BlackBerry() || Suncream.UiManager.isMobile.iOS() || Suncream.UiManager.isMobile.Opera() || Suncream.UiManager.isMobile.Windows());
			}
		},
		
		/* 브라우저 체크
		----------------------------------------------------------*/
		getBrowsertype: function(){
			 var agt = navigator.userAgent.toLowerCase();
			 if (agt.indexOf("chrome") != -1) return 'Chrome';
			 if (agt.indexOf("opera") != -1) return 'Opera';
			 if (agt.indexOf("staroffice") != -1) return 'Star Office';
			 if (agt.indexOf("webtv") != -1) return 'WebTV';
			 if (agt.indexOf("beonex") != -1) return 'Beonex';
			 if (agt.indexOf("chimera") != -1) return 'Chimera';
			 if (agt.indexOf("netpositive") != -1) return 'NetPositive';
			 if (agt.indexOf("phoenix") != -1) return 'Phoenix';
			 if (agt.indexOf("firefox") != -1) return 'Firefox';
			 if (agt.indexOf("safari") != -1) return 'Safari';
			 if (agt.indexOf("skipstone") != -1) return 'SkipStone';
			 if (agt.indexOf("msie") != -1) return 'Internet Explorer';
			 if (agt.indexOf("rv:11.0") != -1) return 'Internet Explorer';
			 if (agt.indexOf("netscape") != -1) return 'Netscape';
			 if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
		},
		
		/* 위치 찾아가기
		----------------------------------------------------------*/
		tapSlide : function(opts){
			var page = $("html,body");
			 page.on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
		       page.stop();
			 });
			var defaults ={
					target : opts.obj,
					gap : 0,
					spd : 500
			};
			var options  = $.extend({},defaults,opts);
			page.animate({scrollTop:$(options.target.hash).offset().top+options.gap}, options.spd, function(){
				  page.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
			});
			return this;
		},

		/* 마우스휠 여부 체크 (for mobile)
		----------------------------------------------------------*/
		touchDisableScroll: function(chk){
			if(chk){
				$(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
					e.preventDefault();
					return;
				});
				$(document).on("keydown.disableScroll", function(e) {
			        var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
			        for (var i = 0; i < eventKeyArray.length; i++) {
			            if (e.keyCode === eventKeyArray [i]) {
			                e.preventDefault();
			                return;
			            }
			        }
			    });
			}else{
				$(document).off(".disableScroll");
			}
		},
		
		/* file upload
		----------------------------------------------------------*/
		setFileUpload: function(obj){
			$this = $(obj);
			var $fileTarget = $this.find('.sc-upload-hidden');
			
			$fileTarget.on('change', function(){  // 값이 변경되면
			    if(window.FileReader){  // modern browser
			      var filename = $(this)[0].files[0].name;
			    } 
			    else {  // old IE
			      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
			    }
			    
			    // 추출한 파일명 삽입
			    $this.find('.sc-upload-name').val(filename);
			 
			  });
			
		},
		
		
		
	}
})();

(function($){

    // create cover
	$.fn.createBlock = function(){
    	var obj = $("<div class='sc-cover' style='width:100%;height:100%;position:fixed;top:0;background:#000;opacity:0.65;z-index:500'></div>");
    	$(obj).appendTo(this)
    	.on("click",function(){
			$(".sc-cover").removeBlock();
			$(".sc-modal").removeClass("on");
		});
    	Suncream.UiManager.touchDisableScroll(true);
    	return this;
    };
	 // remove cover
    $.fn.removeBlock = function(){
    	$(this).remove();
    	Suncream.UiManager.touchDisableScroll(false);
    };
	// tap 상하 위치찾아가기
	$.fn.tapSlide = function(opts){
		var $this = $(this)[0];
		var page = $("html,body");
		 page.on("mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
	       page.stop();
		 });
		var defaults ={
				target : $this,
				gap : 0,
				spd : 500
		};
		var options  = $.extend({},defaults,opts);
		page.animate({scrollTop:$(options.target.hash).offset().top+options.gap}, options.spd, function(){
			  page.off("mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
		});
		return this;
	};
    
})(jQuery);

/* top */
$(".sc-top").on("click",function(e){
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
	//$(this).tapSlide();
	Suncream.UiManager.tapSlide({'obj':this});
})

/* nav */
$(".sc-nav-item").each(function(index){
	var $this = $(this).find(".sc-dropdown");
	$(this).on('click',function(chk){
		$this.toggleClass("on");
	});
});

/* dropdown */
$(".sc-dropdown-click").on("click",function(){
	var $this = $(this).siblings().filter("ul");
	$this.toggleClass("on");
});

/* selectbox */
$(".sc-select-click").on("click",function(){
	var $this = $(this).siblings().filter("ul");
	$this.toggleClass("on");
});

/* selectbox for changing text */
$(".sc-select-click").parent().find("ul li").each(function(){
	$(this).on("click",function(){
		$(".sc-select-click input").val($(this).find("a").text());
		$(".sc-select-click +ul").toggleClass("on");
	});
});

/* modal */
$(".sc-modal-click").on("click",function(){
	var $this = $(this).siblings().filter(".sc-modal");
	$(".sc-modal").css({left:"50%",top:"50%",marginLeft:-$this.outerWidth()/2,marginTop:-$this.outerHeight()/2,position:"fixed",zIndex:510});

	$("body").createBlock();
	$this.addClass("on");
});

$(".sc-cover").on("click",function(){
	$(".sc-cover").removeBlock();
	$(".sc-modal").removeClass("on");
});

$(".sc-btn-close").on("click",function(){
	$(".sc-cover").removeBlock();
	$(".sc-modal").removeClass("on");
});


// selectbox for native
var select_box = $('.sc-select-list');
select_box.change(function(){
    var select_name = $(this).children('option:selected').text();
    $(this).siblings('label').text(select_name);
});


/* window resize */
//$(window).on('resize',function(){
	//
//});