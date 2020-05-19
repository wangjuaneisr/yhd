/**
 * Created by wangjuan5 on 2017/4/25.
 */
var pageName = {
    resizeFun: function () {
        function resizeBody(){
            var _width = $(document).width() < $('html').width() ? $(document).width() : $('html').width(),
                _height = $(document).height() > $('html').height() ? $(document).height() : $('html').height(),
                _wScale= _width/1520,
                _mheight = _height > 740?(_height-740*_wScale-20)/2: 0,//以高度来计算top
                _scale = _wScale;//以宽度为基准缩放
                $('.data_live_hall').css({
                    "-webkit-transform":"scale("+_scale+")",
                    "-moz-transform":"scale("+_scale+")",
                    "transform":"scale("+_scale+")",
                    "top":_mheight
                });
            document.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode==122){ // 按 Esc

                }
            }
        }
        resizeBody();
        $(window).resize(function() {
            resizeBody();
        });
    },
    canvasFun:function(){
    },
    circleFun:function(){
        function sortNumber(a,b)
        {
            return b - a
        }
        var arr=[10,10,40,20,20];
        arr.sort(sortNumber);
        var _s=50/arr[0],
            _circle = $('.dynamic_circle'),
            _dleft = Math.floor($('.dynamic_circle').width()/2),
            _dtop = Math.floor($('.dynamic_circle').height()/2),
            _dr = Math.ceil((60+_s*arr[0])/2),
            x1,y1,
            x2,y2,
            x3,y3,
            x4,y4,
            z1,z2,z3,z4,z5;;
        $.each(arr,function(k){
            var per= 60+_s*arr[k],//直径
                _cir = _circle.find('.circle').eq(k),
                _width = per,
                _height = per,
                _r = Math.ceil(per/2),//半径
                x=_dleft-_r,
                y= _dtop-_r;
            //console.log(per);
            switch (k){
                case 0:
                    z1=y;
                    rePosition(x,y);
                    break;
                case 1:
                    x1= _dleft*2-per-20;
                    y1 = 10;
                    x=x1;
                    y=y1;
                    z1=y1+per;
                    rePosition(x,y);
                    break;
                case 2:
                    x2 = 20;
                    y2 = _dtop+_dtop-per-20;
                    x=x2;
                    y=y2;
                    z2=y2;
                    rePosition(x,y);
                    break;
                case 3:
                    x3 = 20;
                    y3 = 0;
                    x=x3;
                    y=20;
                    z2=y3+per;
                    rePosition(x,y);
                    return z1;
                    break;
                case 4:
                    x4 = _dleft*2-per-20;
                    y4 = z1+40;
                    x=x4;
                    y=y4;
                    z5=y4;
                    rePosition(x,y);
                    break;
                default:
                    break;

            }
            function rePosition(x,y){
                var $box = _cir;
                var $content =_cir.find('.txt');

                // 通过 zoom 来调节文字大小
                var zoom = (_width-20)/ $content.width();
                var height = $content.height();
                var left = $content.width()/2+10;
                //console.log($box.width());
                //console.log($content.width());
                $content.css({
                    'line-height':height/2+'px',
                    'margin-top':-(height)/2,
                    'margin-left':-left,
                    'zoom': zoom
                });
                _cir.css({
                    'width':_width,
                    "height":_height,
                    "top":y,
                    "left":x
                });

            }
        });
    },
    processBar:function(per){
        var _w = per/10*40;
        $('.process_box .process_bar_box').animate({"width":_w+'px'},2000)
    },
    init: function () {
        this.canvasFun();//进度圆
        this.resizeFun();//页面缩放
        this.circleFun();//分布圆
    }
}
pageName.init();