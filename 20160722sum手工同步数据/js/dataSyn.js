/**
 * Created by wangjuan5 on 2016/7/22.
 */

//文件上传
var obj = $('.file_path');
var flag = 1;

$('body').on('change','.file_btn',function(){
    $(this).parents('.items_box').find('.file_path').val($(this).val());
});


//弹窗
$('body').on('click','.start_syn',function(){
	$.each(obj,function(k,v){
		if(obj.eq(k).val()=='')flag=0;
	});
	if(flag){
		$(this).PopupDialog({
	        popupClass:'.syn_pop_box',
	        maskLayer:true,
	    });
	    var timer = setTimeout(function(){
		    	$('.syn_pop_box').hide();
		    	$(".popup-mask").remove();
		        $(".popup-iframe").remove();
		        $(this).PopupDialog({
		        popupClass:'.success_box',
		        maskLayer:true,
		        delayClose:1
		    });
	    },3000);
	}
});

