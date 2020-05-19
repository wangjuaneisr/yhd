/**
 * Created by wangjuan5 on 2016/11/9.
 */
var groupFlash = {
    initFun:function(){
        this.hoverFun();//hover与点击事件
        this.sliderBanner();//轮播
        this.navSwitch();//导航伸缩
        this.activityFilter();
        this.backToTop();
        this.tab();
    },
    hoverFun:function(){
        $('.nav_list').on('click','li',function(){
            $(this).addClass('cur').siblings('li').removeClass('cur');
        });
    },
    sliderBanner:function(){
        var obj = $('.slider_list ul.banner li');
        var num = $('.slider_num_list li');
        var index = 0;
        var bgColor=["#e8ccff","#ed7165","#ffaa33","#ffb7dd"];//背景色
        sliderFun(obj,index,num,bgColor,5000);

        function sliderFun(obj,index,num,bgColor,sliderTime){
            var cur = index;
            var len = obj.length-1;//console.log(len);
            var timer = setInterval(function(){
                cur++;
                if(cur>len){
                    cur=0;
                }
                fadeFun(obj,cur,num,bgColor);
            },sliderTime);

            obj.find('a').hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(function(){
                    cur++;
                    if(cur>len){
                        cur=0;
                    }
                    fadeFun(obj,cur,num,bgColor);
                },sliderTime);
            });

            num.hover(function(){
                clearInterval(timer);
                cur=$(this).index();
                fadeFun(obj,cur,num,bgColor);
            },function(){
                timer = setInterval(function(){
                    cur++;
                    if(cur>len){
                        cur=0;
                    }
                    fadeFun(obj,cur,num,bgColor);
                },sliderTime);
            });

            var btn = obj.parents('.slider_list').find('.swicth_btn');
            btn.hover(function(){
                $(this).on('click',function(){
                    clearInterval(timer);
                    if($(this).hasClass('prev_btn')){
                        cur--;
                        if(cur<0){
                            cur=len;
                        }
                    }else{
                        cur++;
                        if(cur>len){
                            cur=0;
                        }
                    }
                    fadeFun(obj,cur,num,bgColor);
                });
            },function(){
                timer = setInterval(function(){
                    cur++;
                    if(cur>len){
                        cur=0;
                    }
                    fadeFun(obj,cur,num,bgColor);
                },sliderTime);
            });

        }

        function fadeFun($this,cur,num,bgColor){//console.log(cur);
            $this.eq(cur).fadeIn().siblings('li').fadeOut();
            $this.parents('.slider_list_box').css("background-color",bgColor[cur]);
            num.eq(cur).addClass('cur').siblings('li').removeClass('cur');
        }
    },
    navSwitch:function(){
        var flag = true;//防止多次点击 影响滑动效果
        $('.gfc_rule_nav').on('click', '.nav_item_title', function() {
            var $navItem = $(this).parents('.rule_nav_item');
            if (flag) {
                flag = false;
                $navItem.toggleClass('menu_cur');
                $navItem.find('.icon_right').toggleClass('icon_down');
                $navItem.find('.three_category_box').slideToggle(300,function() {
                    flag = true;
                });
            }
        });
    },
    //活动筛选
    activityFilter:function(){
        $('.guide_content').on('click','.guide_con_name',function(){
            $(this).addClass('selected').siblings('.guide_con_name').removeClass('selected');
        });
    },
    //返回顶部
    backToTop:function(){
        var $topBtn = $('.back_top_btn');
        $(window).on('scroll',function(){
            var scrollTop = $(this).scrollTop();
            if(scrollTop > 200){
                $topBtn.fadeIn();
            }
            else {
                $topBtn.fadeOut();
            }
        });
        $topBtn.on('click',function(){
            $('html,body').animate({
                scrollTop: 0
            });
        })
    },
    //活动详情tab切换
    tab: function() {
        $('.detail_tab').on('click', '.detail_tab_item', function() {
            $(this).addClass('cur').siblings('.detail_tab_item').removeClass('cur');
            var type = $(this).data('type');
            var className =  type + '_con';
            $(this).parents('.activity_detail_content').find('.' + className).removeClass('none').siblings('.detail_tab_content').addClass('none');

        });
    },
    //活动名字多行省略
    textOmit:function(){
        var $wrapper = $('.activity_items_box');
        var $ellipsis = "<span class='ellipsis'>...</span>"
        $wrapper.find('.activity_name').each(function(){
            if($(this).height() > 52){
                $(this).parents('.activity_title').append($ellipsis);
            }
        });
    }
};
groupFlash.initFun();