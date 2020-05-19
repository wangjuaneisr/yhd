/*
 *@Description: dialog v0.1
 *@Author: yankaipan
 *@Update: wangjuan520170307
 */
;(function($){
    $.fn.extend({
        "PopupDialog" : function(options){
            var defaults = {
                popupClass:'',
                maskLayer:true,
                fullScreen:true,//是否全屏
                maskHeight:'',
                maskWidth:'',
                delayClose:null,//设置延时自动关闭时间(取值为自然数)
                top:0//定位
            };
            var options  = $.extend(true,defaults,options);//深度拷贝defaults,options到options

            this.each(function(){
                var $this = $(this),
                    _popupWidth = $(options.popupClass).outerWidth(),
                    _popupHeight = $(options.popupClass).outerHeight(),
                    _trHeight = $(options.maskHeight).height(),
                    _docWidth = $(options.maskWidth).width(),
                    _winScrollTop = $(window).scrollTop(),
                    _winHeight = $(window).height(),
                    _docHeight = $(document).height(),
                    _InterValObj ;
                var S={
                    init:function(){
                        $('.Ag-common-dialog').hide();
                        if(options.fullScreen){
                            $(options.popupClass).css({
                                marginLeft:-(_popupWidth/2),
                                top:(_winHeight-_popupHeight)/2+_winScrollTop,
                                display:"block"
                            });

                        }else{
                            $(options.popupClass).css({
                                marginLeft:-(_popupWidth/2),
                                top:options.top+_trHeight/2-_popupHeight/2,
                                display:"block"
                            });

                        }
                        $(".pop-close",options.popupClass).off("click").on("click" , S.layerClose );
                        if(options.maskLayer){ S.maskModel(); };
                        if(options.delayClose!=null){ S.delayModel(); };
                    },
                    maskModel:function(){
                        $('.Ag-maskLayer').remove();
                        $(options.popupClass).after("<div class='Ag-maskLayer'></div>");
                        if(options.fullScreen){
                            $(".Ag-maskLayer").css({"height":_docHeight,"width":"100%"});
                        }else{
                            $(".Ag-maskLayer").css({"top":options.top,"height":_trHeight,"width":_docWidth});

                        }

                        if ($.support.msie && $.support.version <= 6){
                            $(".Ag-maskLayer ").after("<iframe class='popup-iframe' frameborder='0'></iframe>");
                            $(".popup-iframe").css("height",_docHeight);
                        }
                    },
                    layerClose:function(){
                        window.clearInterval(_InterValObj);
                        $(options.popupClass).hide();
                        $(".Ag-maskLayer ").remove();
                        $(".popup-iframe").remove();
                    },

                    delayModel:function(){
                        $('.delayClose' , options.popupClass).text(options.delayClose);
                        var curCount = options.delayClose;
                        _InterValObj = setInterval(function(){
                            if(curCount==1){
                                window.clearInterval(_InterValObj);
                                S.layerClose();
                            }else{
                                curCount-- ;
                                $('.delayClose' , options.popupClass).text(curCount);
                            }
                        } ,1000);
                    }
                };
                S.init();

            });
            return this;
        }
    });
})(jQuery);
