/**
 * Created by wangjuan5 on 2017/2/10.
 */
var saleAudit = {
    init:function (){
        this.weekGenerate();//生成自然周
        this.weekFold();//周次折叠
    },
    weekGenerate:function(){
        var curDate = new Date(),
            _date,
            _weekArr=[],
            _monthDays=30,
            _monthNum=[],
            _year = curDate.getFullYear();
        //是否闰年
        if(_year%4){
            _date = 365;
        }else{
            _date = 366;
        }
        //每月天数
        for(var i=1; i<13; i++){
            if(i==1|i==3|i==5|i==7|i==8|i==10|i==12){
                _monthDays=31;
            }else if(i!=2){
                _monthDays=30;
            }else{
                if(_date==366){
                    _monthDays=29;
                }
                else{
                    _monthDays=28;
                }
            }
            _monthNum.push(_monthDays);
        }
        //录入
        $.each(_monthNum,function(k,v){//console.log(k+1);console.log(v);
            var _key,
                _val;
            for(var j=1; j<v+1; j++){
                if(k<9){
                    _key='0'+(k+1);
                }else{
                    _key = (k+1);
                }
                if(j<10){
                    _val='0'+j;
                }else{
                    _val=j;
                }
                _weekArr.push(_key+'.'+_val);
            }
        });

        //第一周
        var date = "01/01/"+_year;    //此处也可以写成 17/07/2014 一样识别    也可以写成 07-17-2014  但需要正则转换
        var day = new Date(Date.parse(date));
        var today = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
        var week = today[day.getDay()],curYearFirstWeek=0;//1月1号为星期几
        for(var i=0; i<today.length; i++){//console.log(today[i]);console.log(week);
            if(week==today[i])curYearFirstWeek=i;
        }
        //第一周开始时间
        if(curYearFirstWeek!=0){
            for(var i=0; i<7-curYearFirstWeek; i++){
                _weekArr.shift();
            }
        }

        //最后一周
        if(_weekArr.length%7!=0){
            var len=7-_weekArr.length%7;
            for(var j=0;j<len;j++){
                _weekArr.push('01.0'+(j+1));
            }
        }

        //生成二维数组
        var _weekList = [], w=0;
        $.each(_weekArr,function(k){
            if((k+1)%7==0){
                _weekList[w] = [];
                _weekList[w].firDate = _weekArr[k-6];
                _weekList[w].lasDate = _weekArr[k];
                _weekList[w].weekNum = w+1;
                _weekList[w].genTime = _weekArr[k-6];//可根据实际产生时间修改
                w++;
            }
        });

        //是否审核1为审核，0为未审核
        var  data= [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0];
        for(var i=0;i<data.length;i++){
            _weekList[i].audit=data[i];
        }

        //生成dom,待审核
        $.each(_weekList,function(k){
            var　_aDom;
            if(_weekList[k].audit){
                _aDom = '<a href="javascript:;" class="week_items" title="'
                    +_weekList[k].firDate
                    +'-'+ _weekList[k].lasDate+'">'
                    +'Week'
                    +(_weekList[k].weekNum)
                    +'<i class="sale_icons audit_icon"></i></a>';
            }else{
                _aDom = '<a href="javascript:;" class="week_items no_audit" title="'
                    +_weekList[k].firDate
                    +'-'+ _weekList[k].lasDate+'">'
                    +'Week'
                    +(_weekList[k].weekNum)
                    +'<i class="sale_icons audit_icon"></i></a>';
            }
            $('.week_list_box .week_list').append(_aDom);
        });
    },

    weekFold:function(){
        //折叠周次活动
        var _obj = $('.week_list_container').find('.week_list_box'),
            obj = $('.week_list_container'),
            _height = obj.height();//console.log(_height);
        $('.week_fold_btn').on('click',function(){//console.log(!obj.hasClass('no-show'));
            if(!obj.hasClass('cur')){
                _obj.animate({height:"0px"},200);
                obj.addClass('cur')
            }else{
                _obj.animate({height:_height+"px"},200);
                obj.removeClass('cur');
            }
        });

        //编辑
        $('.activity_btn a').on('click',function(){
            var _obj = $(this).parents('.activity_setting');
            _obj.toggleClass('editing');
            if(_obj.find('.num .editor_num').val()&&$(this).hasClass('save_btn')){
                _obj.find('.num label').text(_obj.find('.num .editor_num').val());
            }else if($(this).hasClass('edit_btn')){
                _obj.find('.num .editor_num').val(_obj.find('.num label').text());
            }

        });

        //活动tab
        $('.activity_tab_list li').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        //删除
        $('.td_delete_btn').on('click',function(){
            $(this).parents('tr').remove();
        });

        //点击提交，增加预计GMV、预计毛利
        $('.submit_count_btn').on('click',function(){

        });
    }
}
saleAudit.init();
