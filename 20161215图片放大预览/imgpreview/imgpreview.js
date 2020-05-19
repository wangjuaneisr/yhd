/*
 *Description :  仿京东图书 图片预览;
 *Author : Wang Juan;
 *Date : 2016/12/14;
 **/
var pageName = {
    init: function () {
        this.addPopDom();
        this.pageFun();
    },
    addPopDom:function(){
        var dialogDOM = '<div class="ui-dialog" style="position:absolute;width: 850px;">'
            +'<div class="ui-dialog-title" style="width: 830px;">'
            +'<span>内页插图</span>'
            +'</div>'
            +'<div class="ui-dialog-content">'
            +'<div class="ui-preview-box">'
            +'<a href="javascript:void(0);" class="ui-preview-prev" title="上一张">&lt;</a>'
            +'<div class="ui-preview-big">'
            +'<img class="showImg">'
            +'<img class="zoomImg"/>'
            +'</div>'
            +'<a href="javascript:void(0);" class="ui-preview-next" title="下一张">&gt;</a>'
            +'<div class="ui-preview-num">4/4</div>'
            +'</div>'
            +'</div>'
            +'<a class="ui-dialog-close" title="关闭">'
            +'<span class="ui-icon ui-icon-delete"></span>'
            +'</a>'
            +'</div>'
            +'<div class="ui-mask"></div>';
        $('body').append(dialogDOM);
    },
    pageFun: function () {
        var _index,_len = $('.ui-preview-img').length;
     /*弹窗 S*/
        $('.illustrated').on('click','.ui-preview-img',function(){
            _index = $(this).parents('li').index();
            setNumber(_index+parseInt(1),_len);
            changeImg(_index);
            /*弹窗 S*/
            var _obj = $('.ui-dialog'),
                _mask = $('.ui-mask');
            $('.ui-dialog').show();
            var _popupHeight = _obj.outerHeight(),
                _winScrollTop = $(window).scrollTop(),
                _winHeight = $(window).height(),
                _winWidth = $(window).width(),
                _docHeight = $(document).height(),
                _popupWidth = _obj.outerWidth();
            //弹窗位置
            _obj.css({
                marginLeft:-(_popupWidth/2),
                top:(_winHeight-_popupHeight)/2+_winScrollTop,
                display:"block"
            });
            //弹窗遮罩
            _mask.css({
                width:_winWidth,
                height:_docHeight,
                display:"block"
            });
            return false;
        });
        //关闭
        $('.ui-dialog').on('click','.ui-dialog-close',function(){
            $('.ui-dialog').hide();
            $('.ui-mask').hide();
        });
    /*弹窗 E*/

    /*轮播 S*/
        //点击图片切换
        $('.ui-preview-box').on('click','a',function(){
            if($(this).hasClass('ui-preview-prev')){//前一张
                _index--;
                if(_index<0)_index=_len-1;
                changeImg(_index);
                setNumber(_index+parseInt(1),_len);
            }else if($(this).hasClass('ui-preview-next')){//后一张
                _index++;
                if(_index>(_len-1))_index=0;
                changeImg(_index);
                setNumber(_index+parseInt(1),_len);
            }
        });
        //设置当前图片页码
        function setNumber(index,len){
            $('.ui-preview-num').html(index+'/'+len);
        }

        //轮播图片切换
        function changeImg(index){
            var _src = $('.ui-preview-img').eq(index).attr('data-big-img');
            $('.ui-preview-big .showImg').attr('src',_src);//小图
            $('.ui-preview-big .zoomImg').attr('src',_src);//大图
            $('.ui-preview-big').removeClass('ui-preview-zoom-out');//缩小
        }

        //放大缩小
        $('.ui-preview-big').on('click','img',function(){
            $(this).parents('.ui-preview-big').toggleClass('ui-preview-zoom-out');
        });

        //移动放大区域_viewWidth、_viewHeight方法比例 _maxLeft、_maxTop相对最大left top值
        $('.ui-dialog,.ui-mask').on('mousemove',function(e){
            areaMove(e);
        });
        $('.ui-dialog').on('click',function(e){
            areaMove(e);
        });
        $('.ui-mask').on('click',function(e){
            $('.ui-mask').hide();
            $('.ui-dialog').hide();
        });

    //    区域移动
        function areaMove(e){
            var _objImg = $('.ui-preview-big .zoomImg'),
                _uiPreviewBig = $('.ui-preview-big');
            var _viewWidth = _objImg.width()/_uiPreviewBig.width(),
                _viewHeight = _objImg.height()/_uiPreviewBig.height(),
                _maxLeft = _objImg.width()-_uiPreviewBig.width(),
                _maxTop = _objImg.height()-_uiPreviewBig.height();
            if(_uiPreviewBig.hasClass('ui-preview-zoom-out')){
                var _objX = (e.pageX-_uiPreviewBig.offset().left)*(_viewWidth-1),
                    _objY = (e.pageY-_uiPreviewBig.offset().top)*(_viewHeight-1);
                _objImg.css({
                    left:-(Math.max(Math.min(_objX,_maxLeft),0))+"px",
                    top:-(Math.max(Math.min(_objY,_maxTop),0))+"px"
                });
            }
        }
    /*轮播 E*/

    /*查看目录 收起 收缩
    * *  upDate: 2016/12/22 by wangjuan5
    * */
        var _contentBox = $('.book-detail-item .more').parents('.book-detail-item').find('.book-detail-content');
        _contentBox.css("height","314px");
        $('.book-detail-item .more').on('click','a',function(){
            var $this = $(this),
                _more = $this.parents('.more'),
                _obj = $this.parents('.book-detail-item').find('.book-detail-content');
            if(_more.hasClass('close')){
                _more.removeClass('close');
                $this.attr("data-open",0);
                $this.html('查看全部↓');
                _obj.css("height","314px");
            }else{
                _more.addClass('close');
                $this.attr("data-open",1);
                $this.html('收起全部↑');
                _obj.css("height","auto");
            }
            _obj.toggleClass('open');
        });
    }

}
pageName.init();