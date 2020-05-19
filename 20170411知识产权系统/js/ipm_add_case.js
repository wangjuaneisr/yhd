/**
 * Created by wangjuan5 on 2017/4/14.
 */
var ipmAddCase = {
    init: function () {
        this.ipmAddPop();
        this.ipmDetelePro();
    },
    ipmAddPop:function(){
        var mID,//商家ID
            mName,//商家名称
            sName,//店铺名称
            sClassify;//店铺分类
        //选商家
        $(".add_merchant_btn").click(function(){
            $(this).PopupDialog({ //调用
                popupClass:'.pop_add_merchant', //弹窗ClassName
                maskLayer:true, //是否遮罩
                callback:function(){
                    alert('自动关闭后的回调函数执行！')
                }
            });

            $('.pop_add_merchant .sure_btn').on('click',function(){
                addCaseFun('.add_merchant_btn');
            });
        });
        //    选商品
        $(".add_product_btn").click(function(){
            $(this).PopupDialog({ //调用
                popupClass:'.pop_add_product', //弹窗ClassName
                maskLayer:true, //是否遮罩
                callback:function(){
                    ipmCommonFun.pageTurning(100,5,1,5);
                }
            });
            $('.pop_add_product .sure_btn').on('click',function(){
                addCaseFun('.add_product_btn');
            });
        });


        //添加案件信息
        function addCaseFun(btnClass){
            $(btnClass).parents('.add_step_box').addClass('added_step_box');
        }

        //    提交  保存案件
        $('.submit_btn_box a').on('click',function(){
            if($(this).hasClass('submit_btn')){
                $(this).PopupDialog({ //调用
                    popupClass:'.pop_submit_succeed', //弹窗ClassName
                    maskLayer:true, //是否遮罩
                    delayClose:2,
                    callback:function(){

                    }
                });
            }else if($(this).hasClass('save_btn')){
                $(this).PopupDialog({ //调用
                    popupClass:'.pop_save_succeed', //弹窗ClassName
                    maskLayer:true, //是否遮罩
                    //delayClose:2,
                    callback:function(){

                    }
                });

            }
        });

    },

    //删除
    ipmDetelePro:function(){
        //新增案件删除商品
        $('.step_box').on('click','.delete_btn',function(){
            $(this).parents('tr').remove();
        });

        //品牌信息填写删除文件
        $('.file_box').on('click','.del_btn',function(){
            $(this).parents('.file_btn').remove();
        });
    }
}
ipmAddCase.init();
