/*
 *@Description:
 *@Author: wangjuan
 *@time: 2016-06-13
 *@update: 2016-06-14 wangjuan
 */
var bkGuideFed = {
    gdStep: function() {
        var allBox=$('.bk_sp');
        allBox.eq(0).show().siblings().hide();
        var bkSpLen = $('.bk_sp').length-1;
        //下一步btn
        $('.bk_sp').undelegate().delegate('.go_sp','click',function(){
            var par = $(this).parents('.bk_sp'),
                that = $('.step_bar .step_pic'),
                parIndex = par.index();//当前步骤索引
            //设置步骤条
            $(that).eq(parIndex).removeClass('cur').addClass('on');
            $(that).eq(parIndex+1).addClass('cur');
            //隐藏前一个，显示下一个
            if(parIndex<bkSpLen)
                par.hide().next('.bk_sp').show();            
        });
        //立即设置
        $('.bk_sp').delegate('.ap_install', 'click', function() {
            var succedDiv = $('<div class="gd_succed"><sup></sup><span>已完成</span></div>');
            $(this).parents('.bk_sp').addClass('cur_sp').find('.gd_stepbtn').addClass('go_sp');
            $(this).parents('.sp_btn').hide();
            succedDiv.insertAfter($(this).parent());
        });

        $('.bk_sp').delegate('.step_btn','click',function(){
            //未设置显示气泡提示 
            var flag = $(this).parents('.bk_sp').hasClass("cur_sp");//console.log(flag);
            var thats = $(this).parents('.bk_sp');
            if(!flag){
                $(thats).find(".content-tips").show();
            }
        });

        // 显示二维码
        $('.sp_fou').delegate('.step_btn','click',function(){
            if($(this).parents('.sp_fou').hasClass('cur_sp')){
                $('.yhd_code').show();
            }
        });

        /*弹窗*/
        $('body').delegate('.sp_fif .activation_Btn','click',function(){
            if($(this).parents('.sp_fif').hasClass('cur_sp')){
                $(this).PopupDialog({
                    popupClass:'.pop-batch-delay',
                    maskLayer:true,
                    delayClose:3000
                });
            
                var i=3;//3秒倒计时
                var timer0=setInterval(function(){
                    i--;
                    if(i>0)
                        $('.success_tips p .time').html(i);//console.log(i);
                },1000);

                var timer=setTimeout(function(){
                    window.location.href='http://shangjia.yhd.com/inshop_portal/portal/main.action?nocache=116514937222604175.479949917644';
                },3000);
            }     
        });

    }
}