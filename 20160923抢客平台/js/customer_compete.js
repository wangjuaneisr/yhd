/**
 * Created by wangjuan5 on 2016/9/26.
 */
var customer_compete ={
    init:function (){
        this.navSelect();
    },
    navSelect:function(){
        //导航hover
        $('.customer_nav').on('click','.customer li',function(){
            $(this).addClass('cur').siblings('li').removeClass('cur');
        });

        //查询条件 hover
        $('.items .select_con').hover(function(){
            $(this).find('.select_down_box').addClass('on');
        },function(){
            $(this).find('.select_down_box').removeClass('on');
        });
        $('.select_down_box').on('click','ul li',function(){
            var _value = $(this).text();console.log(_value);
            $(this).parents('.select_con').find('.select_box em').text(_value);
            $(this).parents('.select_down_box').removeClass('on');
        });

        //activity_pandect
        $('.activity_pandect ul li').mouseover(function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });


        $('.slide_nav').on('click','.slide_btn',function(){
            $(this).find('.iconfont:hidden').show().siblings('.iconfont').hide();
            if($(this).hasClass('slide')){//console.log("000");
                $(this).removeClass('slide');
                $('.customer_nav').animate({left:"0"},500);
                $('.content_con').animate({marginLeft:"180px"},500);
            }else{
                $('.customer_nav').animate({left:"-180px"},500);
                $(this).addClass('slide');
                $('.content_con').animate({marginLeft:"0px"},500);
            }

        });

        $('.user_name').hover(function(){
            $(this).find('.esc_con').show();
            $('.esc_con').on('click',function(){
                $(this).hide();
            });
        },function(){
            $(this).find('.esc_con').hide();
        });
    }
}

customer_compete.init();