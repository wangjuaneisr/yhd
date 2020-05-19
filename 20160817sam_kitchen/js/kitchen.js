/*
 *Description :  ;
 *Author : Wang Juan;
 *Date : 2016/08/17;
 * update: 2016/08/22
 **/
var pageName = {
    init: function () {
        this.hoverSelect();//模拟select的hover效果
        this.deletePop();//删除弹窗
        this.colorChange();//隔行换色
        this.addMaterial();//新增
        this.moveDom();//上移、下移、删除操作
        this.textareaEditor();//模拟富文本编辑器
        this.selectClassify();//选取种类
        this.classGray();//置灰操作状态
        this.listNum();//新增做菜步骤序号更新
        this.popWin();//成功发布弹窗
    },

    //点击查看更多订单功能
    hoverSelect: function () {
        $('.hover_select_con').hover(function(){
            var obj =  $(this).find('.hover_select');
            obj.addClass('cur');
            obj.find('li').on('click',function(){
                $(this).parents('.hover_select_con').find('.select_txt').text($(this).text());
                obj.removeClass('cur');
            });
        },function(){
            $(this).find('.hover_select').removeClass('cur');
        });
    },//hoverSelect end

    colorChange:function(){
        var trArr = $('.add_menu tbody tr');

        $.each(trArr,function(k,v){
            if(k%2==1){
                $(this).addClass('bg_color');
            }else{
                $(this).removeClass('bg_color');
            }
        });

        trArr.hover(function(){
            $(this).addClass('cur');
        },function(){
            $(this).removeClass('cur');
        });

    },//colorChange end

    deletePop:function(){
        $('body').on('click',function(e){
            var e = window.event||e;
            var evt =  e.target?e.target : e.srcElement;
            if($(evt).hasClass('delete_btn')){//console.log("000");
                $(evt).parents('td').find('.pop_box').show();
                $(evt).parents('tr').siblings('tr').find('.pop_box').hide();
            }else if($(evt).is('.pop_box,.pop_box *')){
                if($(evt).hasClass('sure_btn')){
                    $(evt).parents('.dom').remove();
                    pageName.colorChange();
                }else if($(evt).hasClass('cancel_btn')){
                    $('.pop_box').hide();
                }
            }else{//console.log("00");
               $('.pop_box').hide();
            }
        });
    },//deletePop end

    classGray:function(){
        var _operation = $('.operation_con');
        $.each(_operation,function(){
            var $this = $(this).find('li');
            var len = $this.length-1;
            $this.eq(0).find('.up').addClass('gray');
            $this.eq(0).siblings('li').find('.up').removeClass('gray');
            $this.eq(len).find('.down').addClass('gray');
            $this.eq(len).siblings('li').find('.down').removeClass('gray');
        });
    },

    listNum:function(){
        var _listNum = $('.step_con .step_num');
        $.each(_listNum,function(k,v){
            $(this).html(k+1);
        });
    },//listNum end

    addMaterial:function(){
        var len = $('.menu_tab .step_list').length+1;
        var _tr = '  <tr class="dom">' +
                        '<td width="50%">' +
                            '<input type="text" class="quantity" placeholder="用料1">' +
                        '</td>' +
                        '<td width="50%">' +
                            '<input type="text" class="quantity" placeholder="用量1">' +
                        '</td>' +
                    '</tr>';
        var _li = '<li class="clearfix">' +
                    '<a href="javascript:void(0)" class="operation up">上移</a>' +
                    '<a href="javascript:void(0)" class="operation down">下移</a>' +
                    '<a href="javascript:void(0)" class="operation delete">删除</a>' +
                 '</li>';

        var _odiv ='<li class="pro dom">' +
                     '<a href="javascript:void(0)" class="pro_img"><img src="http://fed.yhd.cn:9000/84X84" alt=""></a>' +
                     '<div class="pro_info">' +
                         '<p class="pro_name">澳洲奔富BIN407干红 精品750ml111</p>' +
                        '<p class="pro_price">&yen;68.9</p>' +
                     '</div>' +
                '</li>';
        var _otr ='<tr class="dom"><td><div class="menu_box clearfix">' +
            '<a href="javascript:void(0)" class="menu_img"><img src="http://fed.yhd.cn:9000/56X56" alt=""></a>' +
            '<p class="menu_tit">小鸡炖蘑菇小鸡炖蘑菇小鸡炖蘑菇小鸡炖蘑菇小鸡炖蘑菇小鸡炖蘑菇</p>' +
            '</div></td><td>猪肉、中秋晚宴</td><td>已发布</td><td>' +
            '<a href="javascript:void(0)" class="operation_btn editor_btn">编辑</a>' +
            '<a href="javascript:void(0)" class="operation_btn delete_btn">删除</a>' +
            '<div class="pop_box">' +
            '<em class="corner before"></em>' +
            '<em class="corner after"></em>' +
            '<p class="pop_tit">确定删除吗？</p>' +
            '<div class="btn_box">' +
            '<a href="javascript:void(0)" class="pop_btn sure_btn">确定</a>' +
            '<a href="javascript:void(0)" class="pop_btn cancel_btn">取消</a></div></div></td></tr>';


        $('body').on('click','.add_btn',function(){
            if($(this).hasClass('add_material_btn')){//增加用料
                $(this).parents('.menu_material_con').find('.menu_tab tbody').append(_tr);
            }else if($(this).hasClass('add_step_btn')){//增加菜谱
                var _div ='<div class="step_list clearfix dom">' +
                    '<p class="step_num">' +len+
                    '.</p>' +
                    '<div class="menu_img_con step_img">' +
                    '<div class="tips" href="javascript:void(0)">' +
                    '<i class="icon add"></i> ' +
                    '<p class="tit">添加图片</p>' +
                    '<p class="img_size">（建议尺寸：185X147）</p>' +
                    '</div>' +
                    '<input type="file" class="add_img">' +
                    '</div>' +
                    '<div class="step_describe">' +
                    '<textarea name="step" id="step"></textarea>' +
                    '</div>' +
                    '</div>';
                len++;
                $(this).parents('.menu_material_con').find('.menu_tab').append(_div);
            }else if($(this).hasClass('add_pro_btn')){//增加相关商品
                if($(this).parents('.menu_material_con').find('.menu_tab .dom').length>3){
                    $(this).parents('.add_box').find('.notice_con').html("最多只能添加4个商品,请删除其他商品再添加！");
                    return false;
                }else{
                    $(this).parents('.menu_material_con').find('.menu_tab').append(_odiv);
                }
            }else if($(this).hasClass('kitchen_btn')){//厨房列表增加
                $(this).parents('.menu_material_con').find('.menu_tab').append(_otr);
                pageName.colorChange();
            }
            $(this).parents('.menu_material_con').find('.operation_con').append(_li);
            //
            //操作状态置灰
            pageName.classGray();
            pageName.listNum();
        });
    },//addMaterial end

    moveDom:function(){

        $('body').on('click','.operation_con .operation',function(){//console.log("000");
            var _index = $(this).parents('li').index();
            var _dom = $(this).parents('.menu_material').find('.menu_tab .dom').eq(_index);
            var _li = $(this).parents('.menu_material').find('.operation_con li').eq(_index);//操作
            var _next = _dom.next();
            var _prev = _dom.prev();
            if($(this).hasClass('delete')){
                _dom.remove();
                _li.remove();
            }else if($(this).hasClass('down')){
                _dom.insertAfter(_next);
            }else if($(this).hasClass('up')){
                _dom.insertBefore(_prev);
            }
            //操作状态置灰
            pageName.classGray();
            pageName.listNum();
        });
    },//moveDom end

    textareaEditor:function(){

        $('body').on('click','.editor_family .font_choice',function(){//console.log($);
            var $this = $(this);
            var _btn = $this.parents('.editor_family');
            var _obj =  $this.parents('.editor_con').find('.editor_txt #menu_intro');
            if(_btn.hasClass('editor_size')){//大小
                var fontSize = $this.attr("data-size");
                _obj.css('font-size',fontSize);
            }else if(_btn.hasClass('editor_weight')){//是否加粗
                if(_obj.hasClass('weight')){
                    _obj.removeClass('weight');
                }else{
                    _obj.addClass('weight');
                }
            }else{//字体
                var fontFamily = $this.attr("data");
                _obj.css('font-family',fontFamily);
            }
        });
    },//textareaEditor end

    selectClassify:function(){
        var textInfor = '<dd class="add_classify"><input type="text" placeholder="输入分类" class="classify_search_input"><sup class="close"></sup><sup class="ok"></sup></dd>';

        $('.menu_material_classify dl').on('click','dd:not(.add_classify)',function(){
            if($(this).hasClass('menu_cur')) {
                return false;
            }else{
                $(this).addClass("menu_cur");
                $(this).clone().appendTo(".menu_material_choose dl");
            }
        });
        $('.menu_material_classify dl dd').on('click','.menu_cur',function(){
            $(this).addClass("menu_cur");
        });
        $('.menu_material_choose dl').on('click','dd sup',function(){
            var dataNum = $(this).parent().data('num');
            $(this).parent('dd').remove();
            $(".menu_material_classify dl dd").each(function(){
                if($(this).data('num') == dataNum){
                    $(this).removeClass('menu_cur');
                }
            });
        });
        $('.menu_material_classify dl dd.menu_add').on('click',function(){
            $(this).hide();
            $(this).before(textInfor);
        });
        $('.menu_material_classify dl ').on('click','dd.add_classify sup.close',function(){
            $(this).parent().parent().find('.menu_add').show();
            $(this).parent('dd').remove();
        });
        $('.menu_material_classify dl ').on('click','dd.add_classify sup.ok',function(){
            var textInforValue = $('.classify_search_input').val();
            var addClassify = '<dd><span>'+textInforValue+'</span><sup></sup></dd>';
            $(this).parent('dd').before(addClassify);
            $(this).parent().parent().find('.menu_add').show();
            $(this).parent('dd').remove();
        });
    },//selectClassify end

    popWin:function(){
        $('body').on('click','.publish_btn',function(){
            $(this).PopupDialog({
                popupClass:'.templet-open-box',
                maskLayer:true,
                delayClose:3
            });
        });
    }//popWin end
}
pageName.init();