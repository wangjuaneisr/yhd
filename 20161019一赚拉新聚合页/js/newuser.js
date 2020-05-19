/**
 * Created by wangjuan5 on 2016/10/19.
 */

var newUser = {
    init:function(){
        this.buttonClick();
    },
    buttonClick:function(){
        //倒计时
        $('.items').on('click','.check_code_btn',function(){
            $(this).addClass('check_code_active');

            var time = 60;
            $('.check_code_btn').find('em.time').html(60);
            var $this = $(this);
            var timer = setInterval(function(){
                if(time>0){
                    time--;console.log(time);
                    $('.check_code_btn').find('em.time').html(time);
                }else{
                    $this.removeClass('check_code_active');
                    clearInterval(timer);
                }
            },1000);

        });

        //领券
        $('.items').on('click','.coupon_btn',function(){
            $(this).addClass('got');
        });

        //弹窗--规则
        $('.activity_rule_box').on('click','.act_btn',function(){
            $(this).PopupDialog({
                popupClass:'.act_rule_pop',
                maskLayer:false
            });
        });

        //弹窗--二维码
        $('.app_store_box').on('click','.app_list li',function(){
            var _index = $(this).index();console.log(_index);

            $(this).PopupDialog({
                popupClass:'.app_code_pop',
                maskLayer:true
            });
           $('body').find('.device_list li').find('.tag').removeClass('on');
            $('body').find('.device_list li').eq(_index).find('.tag').addClass('on');




            $('.device_list').on('click','li',function(){
                $(this).find('.tag').addClass('on');
                $(this).siblings('li').find('.tag').removeClass('on');
            });
        });


    }
}

newUser.init();
