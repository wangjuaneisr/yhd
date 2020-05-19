/*
 *Description :  ;
 *Author : Wang Juan;
 *Date : 2016/;
 **/
var pageName = {

    resizeFun: function () {
        function resizeBody(){
            var _width = $(document).width() < $('html').width() ? $(document).width() : $('html').width(),
                _height = $(document).height() < $('html').height() ? $(document).height() : $('html').height(),
                _wScale= _width/1920,
                _hScale = _height/1080,
                _scale = Math.min(_wScale,_hScale);//以宽度为基准缩放

            $('body').css({
                "-webkit-transform":"scale("+_wScale+")",
                "-moz-transform":"scale("+_wScale+")",
                "transform":"scale("+_wScale+")"

            });
        }
        resizeBody();
        $(window).resize(function() {
            resizeBody();
        });
    },
    canvasFun:function(){
        circleGenerate("mycanvas",69,75,"");


        function circleGenerate(x,y,z,s){
            var  width_canvas = 138,
                height_canvas = 138;
            var _id = x,
                _r = y,
                i = z,
                _l = z/100;
//        document.ready = function(){
            var canvas = document.getElementById(_id),
                context =  canvas.getContext("2d");

            canvas.width = width_canvas;
            canvas.height = height_canvas;

            context.beginPath();
            context.arc(_r ,_r , _r-35,0, 2*Math.PI);
            context.lineWidth = 20;
            context.strokeStyle = "#2d4455";
            context.stroke();

            context.beginPath();
            context.arc(_r ,_r, _r-30,1.5*Math.PI,1.5*Math.PI+0.02*i*Math.PI );
            context.lineWidth = 30;
            var gr = context.createLinearGradient(_r,_r,0,_r,_r,_r-30);
            //添加颜色端点
            gr.addColorStop(0,'rgb(26,180,150)');
            gr.addColorStop(.25,'rgb(26,176,154)');
            gr.addColorStop(.5,'rgb(24,162,168)');
            //gr.addColorStop(.75,'rgb(42,111,129)');
            gr.addColorStop(1,'rgb(18,115,140)');
            //应用fillStyle生成渐变
            context.strokeStyle = gr;
            context.stroke();

            context.font="14px Tohama";
            context.textAlign='center';//文本水平对齐方式
            context.fillStyle="#aafeff"; // 圆心百分数
            context.fillText(i,_r,75); // 圆心百分数
            context.textBaseline='middle';//文本垂直方向，基线位置
//        };
        }
    },
    circleFun:function(){
        function sortNumber(a,b)
        {
            return b - a
        }
        var arr=[10,10,40,20,20];
        arr.sort(sortNumber);
        var _s=70/arr[0],
            _circle = $('.dynamic_circle'),
            _dleft = Math.floor($('.dynamic_circle').width()/2),
            _dtop = Math.floor($('.dynamic_circle').height()/2),
            _dr = Math.ceil((100+_s*arr[0])/2),
            x1,y1,
            x2,y2,
            x3,y3,
            x4,y4,
            z1,z2,z3,z4,z5;;
        $.each(arr,function(k){
            var per= 100+_s*arr[k],//直径
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
                    x1 = _dleft-_r-per-40;
                    y1 = 0;
                    x=x1;
                    y=20;
                    z1=y1+per;
                    rePosition(x,y);
                    return z1;
                    break;
                case 2:
                    x2 = x+_dr*2+40;
                    y2 = y+per-_dr;
                    x=x2;
                    y=y2;
                    z2=y2;
                    rePosition(x,y);
                    break;
                case 3:
                    x3= _dleft+_dr+40;
                    y3 = 40;
                    x=x3;
                    y=z2-40-per;
                    z3=z2-20-per;
                    rePosition(x,y);
                    break;
                case 4:
                    x4 = _dleft-_dr-per-40;
                    y4 = z1+60+10;
                    console.log(y2);
                    //y4 = per+_dr;
                    x=x4;
                    y=y4;
                    rePosition(x,y);
                    break;

                default:
                    break;

            }
            function rePosition(x,y){
                _cir.css({
                    'width':_width,
                    "height":_height,
                    "top":y,
                    "left":x
                });
            }
        });
    },
    init: function () {
        this.canvasFun();//进度圆
        this.resizeFun();//页面缩放
        this.circleFun();//分布圆
    }
}
pageName.init();