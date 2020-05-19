/*
 *Description :  ;
 *Author : Wang Juan;
 *Date : 2016/;
 **/
var pageName = {
    init: function () {
        this.searchTips();
        this.imgDelete();
        this.chooseDelivery();
    },

    searchTips: function () {
        //配送商名称搜索下拉框
        $('body').on('click','#delivery_choose',function(){
            $(this).parents('.form_con').find('.search_drop_box').show();
        });
        //选择
        $('body').on('click','.search_drop_box ul li a',function(){
            var txt = $(this).text();
            $(this).parents('.form_con').find('#delivery_choose').val(txt);
        });
        $('body').on('click','.delivery_info_con .list a',function(){
            var txt = $(this).text();
            $(this).parents('.form_con').find('#delivery_choose').val(txt);
        });
        $('body').on('click',function(event){
            var e = window.event || event;
            var evt = e.target || e.srcElement;
            if(!$(evt).is('#delivery_choose,#delivery_choose *')){
                $(".search_drop_box").hide();
            }
        });

        //其他物流公司搜索提示下拉框
        $('body').on('click','#delivery_name',function(){
            $(this).parents('.others_search_box').find('.others_search_box_tips').show();
        });
        //选择
        $('body').on('click','.others_search_box_tips ul li a',function(){
            var txt = $(this).text();
            $(this).parents('.others_search_box').find('#delivery_name').val(txt);
        });
        $('body').on('click',function(event){
            var e = window.event || event;
            var evt = e.target || e.srcElement;
            if(!$(evt).is('#delivery_name,#delivery_name *')){
                $(".others_search_box_tips").hide();
            }
        });
    },
    chooseDelivery:function(){
        //判断是否显示下拉按钮
       //判断是否显示下拉按钮
        var objWidth = $('.delivery_info_con li').find(".list").width();
        var objArr = $('.delivery_info_con li').find(".list");
        $.each(objArr,function(k,v){
            var brr=objArr.eq(k).find('a');
            var aWidth = 0;//console.log(k);console.log(v);
            for(var i in brr){
                aWidth += brr.eq(i).outerWidth();
            }
            if(aWidth<=objWidth){
                objArr.eq(k).parent().find('.icon_box').hide();
            }
        });
        //点击下拉按钮,收缩列表
        $('body').on('click','.drop_btn',function(){
            var obj = $(this);
            if(obj.hasClass('down')){//显示的是down
                obj.parents('.delivery_info_list_box').find('li').removeClass('cur');
                obj.parents('li').addClass('cur');
            }else{
                obj.parents('li').removeClass('cur');
            }
        });
    },
    imgDelete: function(){
        $('body').on('click','.delete_img_btn',function(){
            $(this).parents('.img_box').remove();
        });
    }

}
pageName.init();