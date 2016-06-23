jQuery.extend({      
	scrolltop: function(options) {      
		var objects={
			body:[],
			control:[]
		};
		var defaults={
			control_html:'<img src="images/topback.gif" style="width:50px; height:50px; border:0;" />', //返回顶部按钮
			control_attrs:{offsetx:30,offsety:120},//返回按钮固定位置
			anchor_keyword:"#top",
			state:{
				isvisible:false,
				shouldvisible:false
			},	
			startline:100, //起始行
			scrollto:0, //滚动到指定位置
			scrollduration:400, //滚动过渡时间
			fadeduration:[500,100] //淡出淡现消失
		};
		var $opts = $.extend(defaults, options);  
		init($opts,objects);
		print_skeleton($opts,objects);
		
		//私有方法
		function init($opts,$objects){
			var iebrws=document.all;
			$opts.cssfixedsupport=!iebrws||iebrws&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;
	    	$objects.body = (window.opera)?(document.compatMode=="CSS1Compat"?$("html"):$("body")):$("html,body"); 
		}
		
		function keepfixed($opts,$objects){
			var $window=$(window);
			var controlx=$window.scrollLeft()+$window.width()-$objects.control.width()-$opts.control_attrs.offsetx;
			var controly=$window.scrollTop()+$window.height()-$objects.control.height()-$opts.control_attrs.offsety;
			$objects.control.css({left:controlx+"px",top:controly+"px"});
		}
		function print_skeleton($opts,$objects){
			$control_html='<div id="topcontrol">'+$opts.control_html+'</div>';
			$objects.body.eq(0).append($control_html);
			//面板参数
			$control_position=$opts.cssfixedsupport?"fixed":"absolute";
			$control_bottom=$opts.control_attrs.offsety;
			$control_right=$opts.control_attrs.offsetx;
			$control_opacity=0;
			$control_cursor="pointer";
			$("#topcontrol").css({position:$control_position,bottom:$control_bottom,right:$control_right,opacity:$control_opacity,cursor:$control_cursor});
			$("#topcontrol").attr({title:"返回顶部"});
			$("#topcontrol").live("click",function(){
				if(!$opts.cssfixedsupport){
					$($objects.control).css({opacity:0});
				}
				var p_dest=isNaN($opts.scrollto)?$opts.scrollto:parseInt($opts.scrollto);
				if(typeof p_dest=="string"&&jQuery("#"+p_dest).length==1){
					p_dest=jQuery("#"+p_dest).offset().top;
				}else{
					p_dest=0;
				}
				$($objects.body).animate({scrollTop:p_dest},$opts.scrollduration);
			});
			$objects.control=$("#topcontrol");
			if(document.all&&!window.XMLHttpRequest&&$objects.control.text()!=""){
				$objects.control.css({width:$objects.control.width()});
			}
			
			$(window).scroll(function() { 
				toggle_control();
			} );
			$(window).bind("scroll resize",function(e){
				
				toggle_control();
			});
			
			function toggle_control(){
				var scrolltop=jQuery(window).scrollTop();
				if(!$opts.cssfixedsupport){
					keepfixed($opts,$objects);
				}
				$opts.state.shouldvisible=(scrolltop>=$opts.startline)?true:false;
				if($opts.state.shouldvisible&&!$opts.state.isvisible){
					$objects.control.stop().animate({opacity:1},$opts.fadeduration[0]);
					$opts.state.isvisible=true;
				}else{
					if($opts.state.shouldvisible==false&&$opts.state.isvisible){
						$objects.control.stop().animate({opacity:0},$opts.fadeduration[1]);
						$opts.state.isvisible=false;
					}
				}
			}
		}
	}   
});  