$(document).ready(function () {
	$(".intro_content .essay").eq(0).show().siblings().hide();
	$(".intro_nav .list").click(function(){
		var x=$(this).index();//修改
		$(".intro_content .essay").eq(x).show().siblings().hide();
	});
})
