/**
 * Created by wangjuan5 on 2016/12/15.
 */
var wenMiao = {
    init: function () {
        this.ifHasWenmiao();
    },
    ifHasWenmiao: function (){
        // 判断页面中文描是否有图书缩略图列表
        if($('.illustrated').length > 0){
            $('head').append('<link rel="stylesheet" href="imgpreview/imgpreview.css">');
            $('body').append('<script src="imgpreview/imgpreview.js"></script>');
        }
    }
}
wenMiao.init();