/**
 * Created by wangjuan5 on 2017/5/16.
 * 装修页面交互 主要是弹窗  组件更换等
 */
var _w = 20/10*40;
$('.process_box .process_bar_box').css({"width":_w+'px'})

//tab切换
$('.tab_box').on('click','.tab',function(){
    var $this = $(this),
        _i = $this.index();
    $this.addClass('cur')
        .siblings('.tab').removeClass('cur');
    $this.parents('.decoration_list').find('.change_con').eq(_i).show()
        .siblings().hide();
});

//特效切换
$('.effect_status').find('input').change(function(){
    var $id = $('.effect_status').find('input:checked').attr('id'),
        $next = $(this).parents('.effect_box').find('.effect_open');
    if($id == 'close'){
        $next.addClass('gray');
        $next.find('input').attr('readonly','readonly');

    }else{
        $next.removeClass('gray');
        $next.find('input').removeAttr('readonly');

    }
});

//确认弹窗
$('.decoration_list .cancel_btn').on('click',function(){
    $(this).PopupDialog({ //调用
        popupClass:'.save_dialog', //弹窗ClassName
        maskLayer:true, //是否遮罩
        callback:function(){}
    });
});

//确定confirm_btn
$('.decoration_list .confirm_btn').on('click',function(){
    $(this).PopupDialog({ //调用
        popupClass:'.decoration_dialog', //弹窗ClassName
        maskLayer:true, //是否遮罩
        callback:function(){}
    });
});

//指标设置index_set
$('.dlh_fixed_container').on('click','.index_set',function(){
    $(this).PopupDialog({ //调用
        popupClass:'.code_index_dialog', //弹窗ClassName
        maskLayer:true, //是否遮罩
        callback:function(){}
    });
    $(".simulation_select").each(function(){
        var text = $(this).find("p"),
            sel = $(this).find(".s_ul li");

        $('body').on('click',function(e){
            var e = e || window.event; //浏览器兼容性
            var evt = e.target || e.srcElement;
            if(!$(evt).hasClass('choice_industry')&&!$(evt).hasClass('choice_money')){
                $('.simulation_select').removeClass('show');
            }
        });
        text.on('click',function(){
            $(this).parent().toggleClass('show');
        });
        //点击下拉框选中
        sel.on("click",function(){
            var val = $(this).text();
            text.text(val);
            $(this).parents('.simulation_select').removeClass('show');
        })
        $(".simulation_select").mouseleave(function(){
            $(this).removeClass('show');
        });

    })
    //点击确定
    $('.confirm_btn').on('click',function(){
        var valHtml = $('.choice_money').text(),
            varTitle = '当前核心指标：' + valHtml,
            aimData = '目标'+valHtml,
            yesterdayData = '昨日'+valHtml,
            _aimVolume = $('#aimVolume').val();//console.log(valHtml);
        $('#indexName').text(valHtml);
        $('#curCoreIndex').text(varTitle);
        $('.today_data .en em').text(aimData);
        $('.today_data .num em').text(numberical(_aimVolume));
        $('.yesterday_data .en em').text(yesterdayData);
    });

    //数字按要求1,000,000.00格式化
    //保留两位小数，每三位出现逗号
    function numberical(number){
        var _number = Number(number).toFixed(2).toString().split('.'),
            _int = _number[0],
            _intLen = Math.ceil(_int.split('').length/3),
            _firLen = _int.split('').length% 3?_int.split('').length% 3:0,
            _float = '.'+_number[1],
            _intString = '',
            j=0;//循环初始位置
        for(var i= 0;i<_intLen;i++){
            var s= j,e = j+ 3;
            if(i<1&&_firLen){//处理前几位
                s=0;
                e=_firLen;
                j=j+_firLen;
            }else{
                j+=3;
            }
            _intString+=_int.substring(s,e)+',';
        }
        _intString = _intString.substring(0,_intString.length-1).concat(_float);
        return _intString;
    }

    //选择不显示置灰
    $('.today_completeness').find('input').change(function(){
        var $id = $('.today_completeness').find('input:checked').attr('id'),
            $next = $(this).parents('.item').next('.item');
        if($id == 'hide'){
            $next.addClass('gray');
            $next.find('input').attr('readonly','readonly');
            $('body').addClass('no_target_sales');
        }else{
            $next.removeClass('gray');
            $next.find('input').removeAttr('readonly');
            $('body').removeClass('no_target_sales');
        }
    });
});

//更换组件按钮change_ele_dialog
$('.dlh_unfixed_container').on('click','.change_ele_btn',function(){
    $(this).PopupDialog({ //调用
        popupClass:'.change_ele_dialog', //弹窗ClassName
        maskLayer:true, //是否遮罩
        callback:function(){}
    });
    /*
    * 加载弹窗内部组件 S
    * */
    var btnParData = $(this).parents('.dlh_unfixed_container').find('.imgContainer'),
        $thisPar = $(this).parents('.imgContainer'),
        $thiCon = $(this).parents('.dlh_unfixed_container').find('.none_box'),
        $thisData = $thisPar.attr('data-class'),
        showImgArr = '',
        j= 0,
        imgArr = [1,2,3,4,5,6,7]
        popImg = $('.change_ele_dialog').find('li');
    //获取页面已有组件data-class标记数组
    btnParData.each(function(k){
        showImgArr+=btnParData.eq(k).attr('data-class');
    });
    //弹窗组件填充src与标记data-class
    $.each(imgArr,function(key,value){
        if(showImgArr.indexOf(value)==-1){
            var _src = 'images/s_pop_0'+(value)+'.png';
            popImg.eq(j++).find('img').attr({
                "src":_src,
                "data-class":value
            });
        }
    });
    /*
     * 加载弹窗内部组件 E
     * */

    //弹窗内部组件选择
    popImg.on('click',function(){
        var data = $(this).find('img').attr('data-class');
        var _src = 'images/s_pop_0'+($thisData)+'.png',
            _curImg = $thiCon.find('.sImg[data-class='+data+']'),
            _parImg = $thisPar.find('.sImg[data-class='+$thisData+']');
        $(this).find('img').attr({
            "src":_src,
            "data-class":$thisData
        });
        //$thisPar.find('.sImg').attr('data-class',data);
        //$thisPar.find('img').attr('src',_Src);
        $thisPar.attr('data-class',data);
        $thisPar.append(_curImg);
        $thiCon.append(_parImg);
    });
});

//行业设置change_industry_dialog
$('.dlh_unfixed_container').on('click','.change_industry_set',function(){
    $(this).PopupDialog({ //调用
        popupClass:'.change_industry_dialog', //弹窗ClassName
        maskLayer:true, //是否遮罩
        callback:function(){}
    });
    //行业选择下拉框 4级下拉
    $(".Acate-express-con").click(function(){
        var $this = $(this);
        $this.addClass('show');
        $this.find(".hidden-goodslist").show();
        $(".Li-list-item .classMa").off('click').on('click' , function(event){ //1级 click
            event.stopPropagation();
            // 判断只有 1级 的情况
            if(!$(this).hasClass('classMa-icon')){
                $(this).parents('.Acategories').find('.Acate-express').val( $(this).text()); //赋值
                $(this).parents('.hidden-goodslist').find('.curColor').removeClass('curColor') ;
                $(this).addClass('curColor');
                $(".hidden-goodslist").hide();
            };


            if($(this).next('.second-ul').is(':hidden')){  //判断 有2级类目的情况
                $(this).addClass('highColor').next('.second-ul').slideDown(200).find('.classMb').off('click').on('click' , function(){
                    if($(this).next('.third-ul').is(':hidden')){  //2级 click
                        $(this).addClass('highColor').next('.third-ul').slideDown(200)
                            .find('a.classMc').off('click').on('click' , function(event){//3级 click
                            event.stopPropagation();
                            if(!$(this).hasClass('classMc-icon')){
                                $(this).parents('.Acategories').find('.Acate-express').val($(this).text()); //赋值
                                $(this).parents('.hidden-goodslist').find('.curColor').removeClass('curColor') ;
                                $(this).addClass('curColor');
                                $(".hidden-goodslist").hide();
                                return false;
                            }
                            if($(this).next('.forth-ul').is(':hidden')){  //3级 click
                                $(this).addClass('highColor').next('.forth-ul').slideDown(200)
                                    .find('a.classMd').off('click').on('click' , function(event){//4级 click
                                    event.stopPropagation();
                                    if(!$(this).hasClass('classMd-icon')){
                                        $(this).parents('.Acategories').find('.Acate-express').val($(this).text()); //赋值
                                        $(this).parents('.hidden-goodslist').find('.curColor').removeClass('curColor') ;
                                        $(this).addClass('curColor');
                                        $(".hidden-goodslist").hide();
                                        return false;
                                    }
                                    if($(this).next('.fifth-ul').is(':hidden')){  //5级 click
                                        $(this).addClass('highColor').next('.fifth-ul').slideDown(200)
                                            .find('a.classMe').off('click').on('click' , function(event) {//3级 click
                                            event.stopPropagation();
                                            $(this).parents('.Acategories').find('.Acate-express').val($(this).text()); //赋值
                                            $(this).parents('.hidden-goodslist').find('.curColor').removeClass('curColor');
                                            $(this).addClass('curColor');
                                            $(".hidden-goodslist").hide();
                                        });
                                    }
                                    else{
                                        $(this).removeClass('highColor').next('.fifth-ul').slideUp(200);
                                    }
                                });
                            }
                            else{
                                $(this).removeClass('highColor').next('.forth-ul').slideUp(200);
                            }
                        });
                    }else{
                        $(this).removeClass('highColor').next('.third-ul').slideUp(200);
                    };
                    if(!$(this).hasClass('classMb-icon')){
                        $(this).parents('.Acategories').find('.Acate-express').val($(this).text()); //赋值
                        $(this).parents('.hidden-goodslist').find('.curColor').removeClass('curColor') ;
                        $(this).addClass('curColor');
                        $(".hidden-goodslist").hide();
                    };
                });
            }else{
                $(this).parent('.Li-list-item').find('.highColor').removeClass('highColor');
                $(this).next('.second-ul').find('.third-ul').slideUp(200);
                $(this).next('.second-ul').slideUp(200);
            };
        });
    });
    $(".Acategories").mouseleave(function(){
        //$(".hidden-goodslist").find('.highColor').removeClass('highColor');
        $(".hidden-goodslist").hide();
        $(".Acate-express-con").removeClass('show');
    });
});

// 店铺指标设置code_index_dialog
$('.shop_index_set').on('click',function(){
    $(this).PopupDialog({ //调用
        popupClass:'.shop_index_dialog', //弹窗ClassName
        maskLayer:true, //是否遮罩
        callback:function(){}
    });
    //店铺数据展示指标--限制4个
    $('.check_con').off().on('click',function(){
        var $number = $(this).parents('.content_box').find('.checked_con').length,
            $next = $(this).parents('.content_box').next('.btn_box'),
            $choIndex = $next.find('.cho_index'),
            $levIndex = $next.find('.lev_index');
        if($(this).hasClass('checked_con')){
            if($number>0){
                $(this).removeClass('checked_con');
                $number--;
            }
        }else{
            if($number<4){
                $(this).addClass('checked_con');
                $number++;
            }
        }
        $choIndex.text($number);
        $levIndex.text(4-$number);
    });
});

