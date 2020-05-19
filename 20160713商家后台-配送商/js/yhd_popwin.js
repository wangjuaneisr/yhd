(function($) {
    var Modal = function(element, options) {
        this.options = options;
        this.$element = $(element);
        //Modal.list === undefined ? Modal.list = {} : Modal.list;
        this.init('modal', element, options);
    };
    /**
     * 基本参数设置
     * @param title 标题
     * @param mode 弹窗模式  'normal'|'confirm'|'alert'
     * @param content '文字文字' 弹窗的内容
     * @param width 弹窗的宽度
     * @param height 弹窗的高度
     * @param maskLayer 是否需要遮罩层
     * @param delayTime 是否需要自动关闭
     * @param okvalue 确认按钮文字
     * @param ok 点击确定的回调
     * @param cancelvalue 取消按钮文字
     * @param cancel 点击取消的回调
     * @param template 内容模板
     */

    Modal.DEFAULTS = {
        title: '标题',
        mode: 'normal',
        content: '你确定么？',
        width: 412,
        height: 190,
        closed: false,
        maskLayer: true,
        delayTime:false,
        okvalue: '确认',
        ok: function() {},
        cancelvalue: '取消',
        cancel: function() {},
        callback: function() {},
        template: "<div class='yhdbk_popwin'>" +
            "<div class='yhdbk_popwin_title'>" +
            "<h3></h3>"+
            "<span class='yhdbk_popwin_close yhdbk_popwin_action_c'>关闭</span>" +
            "</div>" +
            "<div class='yhdbk_popwin_content'></div>" +
            "<div class='yhdbk_popwin_shadow'></div>"+
            "</div>"
    };

    clearTimeout(Modal.prototype.popDelayTime);

    Modal.prototype.init = function(type, element, options) {
        /*      if (options instanceof Array) {
         for (var i = 0; i < options.length; i++) {
         this.stringDo(options[i]);
         };
         };*/
        this.enabled = true;
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        //this.id === undefined ? this.id = (50 * Math.random() | 0) : this.id;
        this.content = this.DOMCuttor(this.options.content);
    };

    Modal.prototype.DOMCuttor = function(data) {
        var me = this;
        var content = '';
        if (data instanceof Object) {
            var temp = data.html();
            if (temp === '' || temp.length === 0) {
                content = outerHTML(data, document);
            } else {
                content = temp;
            }
            data.remove();
        } else if (typeof data === 'string') {
            content = data;
        }
        return content;
    };

    Modal.prototype.setContent = function(data) {
        if (data.length === 0) return;
        this.content = this.DOMCuttor(data);
    };

    Modal.prototype.show = function() {
        var toolbar = null;
        if (this.options.mode == 'confirm') {
            toolbar = "<div class='text_center'>" + this.content + "</div><p class='yhdbk_popwin_bottom_toolbar'><a href='javascript:;' class='yhdbk_popwin_btn yhdbk_popwin_button yhdbk_popwin_action_s'>" + this.options.okvalue + "</a><a href='javascript:;' class='yhdbk_popwin_btn yhdbk_popwin_button yhdbk_popwin_button_gray yhdbk_popwin_action_c ml'>" + this.options.cancelvalue + "</a></p>";
        } else if (this.options.mode == 'alert') {
            toolbar = "<div class='text_center'>" + this.content + "</div><p class='yhdbk_popwin_bottom_toolbar'><a href='javascript:;' class='yhdbk_popwin_btn yhdbk_popwin_button yhdbk_popwin_action_s'>" + this.options.okvalue + "</a></p>";
        } else {
            toolbar = "<div class='text_center'>" + this.content + "</div>";
        }
        this.pop(toolbar);
    };

    Modal.prototype.stringDo = function(whatido) {
        switch (whatido) {
            case "open":
                break;
        }
    };

    Modal.prototype.getDefaults = function() {
        return Modal.DEFAULTS;
    };

    Modal.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), options);

        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            };
        }
        return options;
    };

    Modal.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template);
    };

    Modal.prototype.close = function() {
        var $tip = this.tip();
        $(window).unbind('.popresize');
        $tip.fadeOut(0, function() {
            $(".popup_mask").remove();
            $(".popup_iframe").remove();
            return $tip.remove();
        });
        // console.log($tip.html())
    };

    Modal.prototype.resize = function() {
        var _popupWidth = this.options.width;
        var _popupHeight = this.tip().height();
        var _winScrollTop = $(window).scrollTop();
        var _winHeight = $(window).height();
        var _docHeight = $(document).height();
        this.tip().css({
            'width': _popupWidth,
            'margin-left': -(_popupWidth / 2),
            'top': (_winHeight - _popupHeight) / 2
        });
        if (_popupHeight > _winHeight) {
            this.tip().css('top', 0);
        }
        if ('undefined' == typeof(document.body.style.maxHeight) && ($.browser.version == "6.0") && !$.support.style) {
            this.tip().css('top', (_winHeight - _popupHeight) / 2 + _winScrollTop);
        }
        return {
            '_winScrollTop': _winScrollTop,
            '_winHeight': _winHeight,
            '_docHeight': _docHeight
        };
    };

    Modal.prototype.pop = function(toolbar) {
        var _this = this;
        var $tip = _this.tip();

        var setContent = toolbar;
        $tip.find(".yhdbk_popwin_content").html(setContent);
        if(_this.options.title){
            $tip.find(".yhdbk_popwin_title > h3").text(_this.options.title);//有标题
        }else{
            $tip.find(".yhdbk_popwin_title > h3").remove();//无标题情况
        }

        $("body").append($tip);
        var tempObj = _this.resize();
        //$tip.fadeIn(300);
        $tip.show();
        if (_this.options.maskLayer) {
            if ($('.popup_mask').length === 0) {
                $tip.after("<div class='popup_mask'></div>");
                $(".popup_mask").css("height", tempObj._docHeight);
                if ('undefined' == typeof(document.body.style.maxHeight) && $.browser.version <= 6) {
                    $(".popup_mask").after("<iframe class='popup_iframe' frameborder='0'></iframe>");
                    $(".popup_iframe").css("height", tempObj._docHeight);
                }
            }
        }
        _this.options.callback();
        $tip.find(".yhdbk_popwin_action_c").on("click", function() {
            var fn = _this.options.cancel;
            return typeof fn !== 'function' || fn.call(this) !== false ?
                _this.close() : this;
        });
        $tip.find(".yhdbk_popwin_action_s").on("click", function() {
            var fn = _this.options.ok;
            return typeof fn !== 'function' || fn.call(this) !== false ?
                _this.close() : this;
        });
        //x秒关闭
        if(_this.options.delayTime){
            _this.options.popDelayTime = setTimeout(function(){
                _this.close();
            },_this.options.delayTime);
        }

        $(window).bind('resize.popresize', function() {
            _this.resize();
        });
    };

    function outerHTML(el, doc) {
        var temp = document.createElement('div');
        el = el.get(0);
        if ('outerHTML' in el) {
            return el.outerHTML;
        } else {
            temp.innerHTML = '';
            var dtemp = (doc && doc.createElement('div')) || temp;
            dtemp.appendChild(el.cloneNode(true));
            return dtemp.innerHTML;
        }
    };

    $.fn.spmodal = function(option) {
        var options = typeof option == 'object' && option;
        return new Modal(this, options);
    };

})(jQuery);
