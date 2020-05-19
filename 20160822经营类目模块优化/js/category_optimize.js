
/*
 *Description :  ;
 *Author : Wang Juan;
 *Date : 2016/;
 **/
var categoryOptimize = {
    init: function () {
        this.popWin();//提示小气泡
        this.navShow();//菜单收缩
        this.signChange();//加减 符号变化
        this.multipleDelete();//输入框字段删除
        this.setGray();//置灰
        this.searchName();
    },

    signChange:function(){
        var obj = $('.category_kids');
        $.each(obj,function(k){
            var arr = obj.eq(k).siblings('.category_father').find('.nav_txt .icon');
           if(obj.eq(k).is(':visible')){
               arr.addClass('minus');
           }else{
               arr.removeClass('minus');
           }
        });
    },
    popWin: function () {
        $('body').on('click',function(e){
            var e = window.event||e;
            var evt =  e.target?e.target : e.srcElement;
            $('.clear_pop').hide();
            if($(evt).hasClass('delete_btn')){
                $(evt).siblings('.clear_pop').show();
                if($(evt).hasClass('delete_all')){//一键清空
                    $(evt).siblings('.clear_pop').on('click','.pop_btn ',function(){
                        if($(this).hasClass('sure_btn')){
                            $('.category_main_con').empty();
                            $('.search_cancel_btn').hide();
                        }
                    });
                }else
                if($(evt).hasClass('detele_cell')){////删除行
                    $(evt).siblings('.clear_pop').on('click','.pop_btn ',function(){
                        if($(this).hasClass('sure_btn')){//
                            var _obj = $(this).parents('.category_kids');//console.log(_obj);
                            if(_obj.hasClass('cur')){//console.log("090");
                                $(this).parents('li').remove();
                            }else{
                                $(this).parents('.category_con').remove();
                            }
                        }
                    });
                }
            }else if($(evt).is('.clear_pop,.clear_pop *')){//点击确定或取消
                if($(evt).hasClass('pop_btn')){
                    $(evt).parents('.clear_pop').hide();
                }
            }else{//console.log("ooo");
                $('.clear_pop').hide();
            }
        });
    },
    navShow:function(){
        function scrollTop(index,num){
            var _height = $('.category_main_con').height();
            var _top = (index+1+num)*36;
            var _val = _top-_height;//console.log(_top);console.log(_val);
            if(_val > 0){//console.log(_val);
                $('.category_main_con').scrollTop(_val);
            }else{
                $('.category_main_con').scrollTop(0);
            }
        }
        var _index,_num;
        $('body').on('click','.nav_txt',function(){
            //类目收缩与展开
            var obj = $(this).parents('.category_box').siblings('.category_kids');//当前类目
            var _obj = $(this).parents('.category_con').siblings().find('.category_kids');//其他类目
            _index = $(this).parents('.category_con').index();//console.log(_index);
            _num = $(this).parents('.category_con').find('.category_kids ul li').length;
            if(obj.is(":visible")){
                obj.hide().removeClass('cur');
            }else{
                obj.show().addClass('cur');
                _obj.hide().removeClass('cur');
            }
            categoryOptimize.setGray();
            categoryOptimize.signChange();
            scrollTop(_index,_num);
        });

        //收起所有二级类目 //类目定位
        $('.location_con').on('click','.location_btn',function(){

            var obj=$(this);
            if(obj.hasClass('pack_btn')){
                $('.category_kids').hide();
            }else if(obj.hasClass('move_btn')){
                var _data;
                var max= 4;//一级类目种类数目
                var _obj = $('.category_kids');
                $.each(_obj,function(k){
                    if(_obj.eq(k).hasClass('cur')){
                        _data = ($(this).parents('.category_con').attr('data'));//取出 当前data值
                        if(obj.hasClass('prev_btn')){//向上定位
                            if(_data>1){
                                _data = _data -1;
                            }else{
                                _data = max;
                            }
                        }else if(obj.hasClass('next_btn')){//向下定位
                            if(_data<max){
                                _data = _data*1 +1*1;//console.log(_data);
                            }else{
                                _data = 1;
                            }//
                        }
                    }
                });
                var Nav = $('.category_con');//.attr('data',_data);
                $.each(Nav,function(k){
                    if(Nav.eq(k).attr('data')==_data){
                        _index = k;
                        _num = $('.category_con').eq(_index).find('.category_kids ul li').length;
                        return false;
                    }
                });
                var Obj = $('.category_con').eq(_index);
                Obj.find('.category_kids').show();
                Obj.find('.category_kids').addClass('cur');
                Obj.siblings('.category_con').find('.category_kids').hide();
                Obj.siblings('.category_con').find('.category_kids').removeClass('cur');
            }
            categoryOptimize.setGray();
            categoryOptimize.signChange();
            scrollTop(_index,_num);
        });



    },
    multipleDelete:function(){
        $('.search_input').keyup(function(){
            if($(this).val()){
                $('.multiple').show();
                $('.multiple').on('click',function(){
                    $(this).siblings('.search_input').val("");
                    $('.multiple').hide();
                });
            }
        });

    },
    setGray:function(){
        var obj = $('.category_kids');
        var flag=0;
        $.each(obj,function(){
            if(obj.is(':visible'))return flag=1;
        });
        if(!flag){
            $('.pack_btn').addClass('disable_btn');
        }else{
            $('.pack_btn').removeClass('disable_btn');
        }
    },
    searchName:function(){
        var btn = $('.category_hd').find('.search_cancel_btn');
        $('.search_con').on('click','.search_btn',function(){
            var obj = $(this).parents('.category_table').find('.search_box')
            if(obj.is(':hidden')){
                btn.show();
                obj.show().siblings().hide();
            }else{
                btn.hide();
                obj.hide().siblings().show();
            }
        });
        $('.search_box').on('click',function(){
            $(this).hide().siblings('.category_list_con').show();
            btn.hide();
        });
        $('.category_hd').on('click','.search_cancel_btn',function(){
            var obj = $(this).parents('.category_table').find('.search_box');
            obj.hide().siblings().show();
        });

        $('.clear_con').on('click','.add_btn',function(){
            if($('.category_add_con').is(':hidden')){
                $('.category_add_con').show().siblings().hide()
                $('.btn_add_box').on('click','.category_add_btn',function(){
                    $('.category_add_con').hide().siblings().show();
                });
            }else{
                $('.category_add_con').hide().siblings().show();
            }
        });
    }
}
categoryOptimize.init();