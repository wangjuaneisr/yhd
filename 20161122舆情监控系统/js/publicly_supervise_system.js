/**
 * Created by wangjuan5 on 2016/11/22.
 */
var pss = {
    init:function(){
        this.loginPage();
        this.navSwitch();
        this.publicPage();
        this.webManagement();
    },
    //全选 反选 多选
    checkBox:function(parBox){
    //全选
    parBox.on('click','.all_check',function(){
        var $this = parBox.find('.check_box');
        var flag = $(this).prop('checked');
        if(flag){
            $this.prop('checked', true);
        }else{
            $this.prop('checked', false);
        }
    });

    //多选
    parBox.on('click','.check_box',function(){
        var len = 0,_len = parBox.find('.check_box').length;
        $("input[class='check_box']").each(function(){
            if($(this).prop("checked")){
                len++;
            }
        });
        if(_len==len){
            parBox.find('.all_check').prop("checked", true);
        }else{
            parBox.find('.all_check').prop("checked", false);
        }
    });
},
    loginPage:function(){
        $('.enter_tip_box').on('click','.auto_login',function(){
            $(this).find('.icon').toggleClass('checked');
        })

        $('.pss_header').on('click','.user_name_box',function(){
            $(this).toggleClass('cur');
        });
        $('body').click(function(e){
            e = window.event || e; // 兼容IE7
            obj = $(e.srcElement || e.target);
            if (!$(obj).is(".user_name_box,.user_name_box  *") ){
                //$('.user_name_box').removeClass('cur');
                $('.user_name_box').removeClass('cur_user');
            }
        });

    },
    navSwitch:function(){
        var flag = true;//防止多次点击 影响滑动效果
        $('.pss_nav_container').on('click', '.nav_item_title', function() {
            var $navItem = $(this).parents('.nav_item');
            if (flag) {
                flag = false;
                $navItem.toggleClass('menu_cur');
                $navItem.find('.icon_right').toggleClass('icon_down');
                $navItem.find('.three_category_box').slideToggle(300,function() {
                    flag = true;
                });
            }
        });

        $('.pss_header').on('click','.user_name_box',function(){
            $(this).toggleClass('cur_user');
        });
    },
    publicPage:function(){
        //表格
        var _width =0;
        var _obj = $('.move_table thead tr th');
        _obj.each(function(k){
            _width+=parseInt(_obj.eq(k).attr('width'));
        });
        $('.move_table').width(_width);

        $('.table_page').width($('.pss_header').outerWidth()-180);
        $(window).resize(function(){
            $('.table_page').width($('.pss_header').outerWidth()-180);
        });


        $('.shift_btn').on('click','.icon',function(){
            if($(this).hasClass('on')){
                $(this).removeClass('on')
            }else{
                $(this).addClass('on')
            }
        });

        //link_status_back
        $('.table_operate').on('click','.relation_btn',function(){
            $('.link_status_back').show().fadeOut(3000);
        });
        $('.table_operate').on('click','.export_btn',function(){
            $('.success_distribute').show().fadeOut(3000);
        });
        $('.auto_get_box').on('click','.auto_get_btn',function(){
            $('.success_get').show().fadeOut(3000);
        });

        //弹窗distribute_btn
        $('.table_operate').on('click','.distribute_btn',function(){
            if(!$(this).hasClass('showNow')){
                $('.distribution_task_pop').fadeIn();
            }else{
                $('.distribution_task_pop').fadeOut();
            }
            $(this).toggleClass('showNow');
        });

        //弹窗ingnore_pop
        $('.fixed_table').on('click','.ignore_btn',function(){
            $(this).PopupDialog({
                popupClass:'.ingnore_pop',
                maskLayer:true
            });
        });

        //
        $('.btn_box').on('click','.settle_btn',function(){
            $(this).PopupDialog({
                popupClass:'.sure_settle_pop',
                maskLayer:true
            });
        });

        //每页显示数目
        $('.each_page').on('click','.icon',function(){
            if($(this).hasClass('top')){
                var _val = $(this).siblings('.num_enter').val()-parseInt(10);
                if(_val<10){
                    _val=10
                }
                $(this).siblings('.num_enter').val(_val);
            }else{
                var _val = $(this).siblings('.num_enter').val()+parseInt(10);
                if(_val>50){
                    _val=50
                }
                $(this).siblings('.num_enter').val(_val);
            }
        });

        //drop_select_box
        $('.select_box').on('click',function(){
            $(this).toggleClass('cur');
        });
        $('.select_box').on('click','.drop_select li',function(){

            $(this).parents('.drop_select').siblings('input').val($(this).text());

        });
        //删除case
        $('.enter_box_top').on('click','.delete .icon',function(){
            $(this).parents('.delete').next('em').remove();
            $(this).parents('.delete').remove();

        });

        //判断hover框显示的位置move_table
        //console.log(_height);
        $('td .content').hover(function(){
            var _height = $('.move_table').outerHeight()-$('.move_table thead').outerHeight();
            var _objHeight = $(this).find('.tit').outerHeight();//浮层高度
            var _trH = 51*$(this).parents('tr').index()+parseInt(26)+_objHeight;//tr高度
            //console.log(_height);
            //console.log(_trH);
            if(_height<_trH){
                $(this).find('.tit').addClass('up').removeClass('down');
            }else{
                $(this).find('.tit').removeClass('up').addClass('down');
            }
        },function(){});

        //hover 表格
        $('.move_table tbody tr').hover(function(){
            var _index = $(this).index();//console.log(_index);
            $('.fixed_table tbody tr').eq(_index).addClass('cur');//console.log(_index);
        },function(){
            var _index = $(this).index();
            $('.fixed_table tbody tr').eq(_index).removeClass('cur');
        });

        $('.fixed_table tbody tr').hover(function(){
            var _index = $(this).index();//console.log(_index);
            $('.move_table tbody tr').eq(_index).addClass('cur');
        },function(){
            var _index = $(this).index();
            $('.move_table tbody tr').eq(_index).removeClass('cur');
        });

        //全选 反选 多选
        pss.checkBox($('.move_table'));
        //表格行选择状态
        $('.move_table').on('click',"input[type='checkbox']",function(){
            $("input[class='check_box']").each(function(){
                if($(this).prop("checked")){
                    $(this).parents('tr').addClass('checked_tr');
                }else{
                    $(this).parents('tr').removeClass('checked_tr');
                }
            });

        });


    },
    webManagement:function(){
        //全选 反选 多选
        pss.checkBox($('.check_list'));


        //web_management_table
        $('.web_management_table').on('click','.operate_btn',function(){
            if($(this).hasClass('editor_btn')){
                $(this).parents('tr').find('.saved_box').hide().siblings('.editor_box').show();
            }else if($(this).hasClass('save_btn')){//保存编辑数据
                $(this).parents('tr').find('.editor_box').hide().siblings('.saved_box').show();
                //网站分类
                var _option = $(this).parents('tr').find("select");
                var _obj = $(this).parents('tr').find('.saved_box span');
                _option.each(function(k){
                    if(_option.eq(k).find("option:selected")){
                        _obj.eq(k).text(_option.eq(k).find("option:selected").text());
                    }

                });

                //一级关键词
                //var _checkbox = $(this).parents('tr').find('.check_list .check_box');
                var _checkbox = $(this).parents('tr').find("input[class='check_box']:checked");
                var len = _checkbox.length-1;
                var  _em='';
                var _val =  _checkbox.parents('td').find('.saved_box').html();
                _checkbox.parents('td').find('.saved_box').empty();
                _checkbox.each(function(k){console.log(k);
                    if(_checkbox.eq(k).prop('checked')){//console.log(_checkbox.eq(k).next('label').text());
                        if(len==k){
                            _em += '<em>'+_checkbox.eq(k).next('label').text()+'</em>';
                        }else{
                            _em += '<em>'+_checkbox.eq(k).next('label').text()+'，</em>';
                        }
                    }
                });
                if(len<0){
                    $(this).parents('tr').find('.fir_key_word').siblings('.saved_box').append(_val);
                }else{
                    $(this).parents('tr').find('.fir_key_word').siblings('.saved_box').append(_em);
                }

                //已保存
                $('.saved_pop').show().fadeOut(3000);
            }else if($(this).hasClass('cancel_btn')){//取消编辑数据
                $(this).parents('tr').find('.editor_box').hide().siblings('.saved_box').show();
            }
        });


        //添加一级关键词弹窗
        $('.table_operate').on('click','.add_keyword_01',function(){
            $(this).PopupDialog({
                popupClass:'.add_keyword_01_pop',
                maskLayer:true
            });
        });

        //添加二级关键词弹窗
        $('.table_operate').on('click','.add_keyword_02',function(){
            $(this).PopupDialog({
                popupClass:'.add_keyword_02_pop',
                maskLayer:true
            });
        });

    }
};
pss.init();