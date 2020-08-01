var jQ = jQuery.noConflict();

if(/^https:\/\/saigaocy\.xyz.*/i.test(window.location.href)){
    jQ(document).ready(function(jQ){
    	var timeID,intDiff,coax_int = jQ('#luck_coax_int').val();
    	jQ.ajax({
    		url: '/wp-admin/admin-ajax.php',
    		type: 'POST', 
    		dataType: "json",
    		data:{ 
    			action:"luck_time"
    		},
    		success: function(data) {
    			if(data.status==200){
    				var intDiff = parseInt(data.msg);
    		        timer(intDiff);
    			}
    			if(coax_int){
    			    jQ('.card-box .card-item:nth-child('+coax_int+')').css("background-color","#13ce63");
    			    jQ('.card-box .card-item:nth-child('+coax_int+')').children("span").css("color","#fff");
    		        jQ('.card-box .card-item:nth-child('+coax_int+')').children("span").text('押');
    	        }
    		}
    	});
        function timer(intDiff){
    	　　timeID = window.setInterval(function(){
    	　　　　var day=0,hour=0,minute=0,second=0;
    	　　　　if(intDiff > 0){
    	　　　　　　day = Math.floor(intDiff / (60 * 60 * 24));
    	　　　　　　hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
    	　　　　　　minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
    	　　　　　　second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    	　　　　}else{
    	　　　　　　window.clearInterval(timeID);
    	　　　　}
    	　　　　if (minute <= 9) minute = '0' + minute;
    	　　　　if (second <= 9) second = '0' + second;
    	　　　　jQ('.luck_time_color').html(minute+":"+second);
    	        if(intDiff==0) auto_ajax_luck();
    	　　　　intDiff--;
    	　　}, 1000);
        }
    	function auto_ajax_luck(){
    		jQ.ajax({
    			url: '/wp-admin/admin-ajax.php',
    			type: 'POST', 
    			dataType: "json",
    			data:{ 
    				action:"auto_luck_bet"
    			},
    			success: function(data) {
    				if(data.status==200){
        			    jQ('.card-box .card-item:nth-child('+data.msg+')').css("background-color","#13ce63");
        			    jQ('.card-box .card-item:nth-child('+data.msg+')').children("span").css("color","#fff");
    					jQ('.card-box .card-item:nth-child('+data.msg+')').children("span").text('K');
    					if(data.tips){
    						jQ('.ajax_luck_tips').text(data.tips);
    					}
    				}
    			}
    	    });
    	}
    	jQ(document).on("click",".card-box .card-item",function(){
    		if(coax_int==''){
    		    jQ('.card-item').children("span").fadeIn(0.000001),
    			jQ('.tai_luck_block .stake-box').fadeIn(0.000001);
    			jQ('.card-box .card-item').removeClass('active');
    			jQ(this).addClass('active');
    			jQ(this).children("span").fadeOut(0.000001);
    		}
    	}).on("click",".stake-buttons .button",function(){
    		jQ('.stake-box .button.submit').attr("disabled",false);
    	    jQ('.stake-buttons .button').removeClass('active');
    		jQ(this).addClass('active');
    	}).on("click",".stake-box .button.submit",function(){
    		var under = jQ('.card-item.active').children("span").text(),
    			point = jQ('.button.active').text();
    		    array = new Array(under,point);
    		jQ.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'POST', 
                dataType: "json",
                data:{ 
    			    action:"user_luck_bet",
    				bets:array
    			},
    			success: function(data) {
    			    if(data.status==200){
    			        alert(data.msg);
    					location.href = '/buyoff';
    				}
                }
    		});
    	    return false;
    	});		
    });
}else{
	document.write("<h1>人作死,就会死</h1>");
}