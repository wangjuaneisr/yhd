/**
 * Created by wangjuan5 on 2016/8/10.
 */
var pageName = {
    init:function(){
        this.caseOther();//案件处理页面
        this.loginPage();//登陆页面
        this.fileUpload();//文件上传
        this.useDatePlugin();//日历调用
    },
    //案件处理页面
    caseOther:function(){
        selectEmulation(); //模拟selectEmulation
        changeColor(); //隔行换色
        checkboxChoose();//多选框
        detect();//检测弹窗
        exportData();//导出数据

        //模拟selectEmulation
        function selectEmulation(){
            $('.status_choose').hover(function(){
                $(this).find('.select_box').show();
                //获取select值
                $('body').on('click','.select_box li',function(){
                    var txt = $(this).text();
                    $(this).parents('.status_choose').find('.status').text(txt);
                    $(this).parents('.select_box').hide();
                });
            },function(){
                $(this).find('.select_box').hide();
            });
        }//selectEmulation end

        function changeColor(){
            var trArr;
            //隔行换色
            trArr = $('.pro_info_tab tbody tr');
            $.each(trArr,function(k,v){
                if(k%2==1){
                    trArr.eq(k).addClass('odd_tr');
                }
            });
            //hover
            trArr.hover(function(){
                $(this).addClass('hover_tr');
            },function(){
                $(this).removeClass('hover_tr');
            });
        }//changeColor end

        function checkboxChoose(){
            //全选
            $('body').on('click','.all_check',function(){
                if($(this).is(':checked')){
                    $('.pro_info_tab tr').addClass('checked_tr');
                    $(".check_box").each(function(){
                        //this.checked=true;//this指的是html对象，html具有checked属性，因此，此处可使用this
                        // this其实是一个Html 元素。
                        // $this 只是个变量名，加$是为说明其是个jquery对象。
                        // 而$(this)是个转换，将this表示的dom对象转为jquery对象，这样就可以使用jquery提供的方法操作。
                        $(this).prop('checked',true);
                    });
                }else{
                    $('.pro_info_tab tr').removeClass('checked_tr');
                    $(".check_box").each(function(){
                        //this.checked=false;
                        $(this).prop('checked',false);
                    });
                }
                exportData();
            });

            //单选
            $('body').on('click','.check_box',function(){
                if($(this).is(':checked')){
                    $(this).parents('tr').addClass('checked_tr');
                }else{
                    $(this).parents('tr').removeClass('checked_tr');
                }
                exportData();
            });
        }//checkboxChoose end

        //检测
        function detect(){
            $('body').on('click','.no_detect',function(){
                $(this).PopupDialog({
                    popupClass:'.templet-open-box',
                    maskLayer:true
                });
            });

        }//detect end


        //导出数据
        function exportData(){
            var flag = 0;
            var checkBox = $('.check_box');
            $.each(checkBox,function(){
                if(checkBox.is(':checked')){
                    flag = 1;
                }
            });
            if(!flag){// console.log(s);
                $('.check_btn').addClass('disable_btn');
            }else{
                $('.check_btn').removeClass('disable_btn');
            }
      }//exportData end
    },//caseOther 案件处理页面end

    //登陆页面
    loginPage:function(){
        inputEnter();//输入框字体颜色变化

        function inputEnter(){
            $('body').on('focus','.user_input',function(){
                $(this).addClass('on');
            });
            $('body').on('blur','.user_input',function(){
                $(this).removeClass('on');
            });
        }
    },//登陆页面 end

    //文件上传
    fileUpload:function(){
        $('body').on('change','.file_btn',function(){
            $(this).parents('.items').find('.ipt').val($(this).val());
        });
		$('.file_btn').hover(function(){
			$(this).siblings('.btn_atta').addClass('atta_hover');
		},function(){
			$(this).siblings('.btn_atta').removeClass('atta_hover');
		});
    },//文件上传 end

    //调用日历
    useDatePlugin:function(){
        if($(".date12").length>0){
            var obj = $(".date12").spcalendar({daypanel: 2});
            $(".dateTabBtn1 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj.options.defaultType = $(this).attr('data-mode');
                obj.calendarShow();
            });
        };
        if($(".date13").length>0){
            var obj2 = $(".date13").spcalendar({daypanel: 2});
            $(".dateTabBtn2 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj2.options.defaultType = $(this).attr('data-mode');
                obj2.calendarShow();
            });
        };
        if($(".date14").length>0){
            var obj3 = $(".date14").spcalendar({daypanel: 2});
            $(".dateTabBtn3 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj3.options.defaultType = $(this).attr('data-mode');
                obj3.calendarShow();
            });
        };
        if($(".date15").length>0){
            var obj4 = $(".date15").spcalendar({daypanel: 2});
            $(".dateTabBtn4 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj4.options.defaultType = $(this).attr('data-mode');
                obj4.calendarShow();
            });
        };
    }//调用日历 end
}
pageName.init();