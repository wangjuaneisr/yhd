/*
 *description:;
 *author:yuting;
 *date:;
 *update:
*/

//弹窗里面的交互
var popwin_script = {
	initFun:function(){
		this.uploadFun();
	},
	//上传图片
	uploadFun:function(){
		console.log($('.real_ipt').length);
		$('.real_ipt').change(function(){
			$(this).siblings('.show_ipt').val($(this).val());
		});
		$('.clear').click(function(){
			$(this).siblings('.show_ipt').val('');
		})
	}
}