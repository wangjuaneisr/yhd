/*
 *Description :  ;
 *Author : Wang Juan;
 *Date : 20170412;
 **/
var ipmCommonFun = {
    init: function () {
        this.selectClassify();
        this.pageTurning(200,10,1,10);//信息总数，每页显示数目，当前页，页码量
        this.useDatePlugin();//日历调用
    },


    //公共点击 选中
    selectClassify: function () {
        //导航样式，当前选中样式
        $('.ipm_nav .nav').on('click',function(){
            $(this).parents('.ipm_nav').find('.nav').removeClass('highlight');
            $(this).addClass('highlight');
        });

        //导航收缩
        $('.nav .drop_icon').on('click',function(){
            $(this).parents('dl').toggleClass('hide');
        });

        //下拉选框
        $('.item_input .drop_btn').on('click',function(){
            $(this).parents('.item_input').toggleClass('on');
        });

        //输入框
        $('.item_input .ipm_text').on('click',function(){
            $('.item_input').removeClass('cur');
            $(this).parents('.item_input').addClass('cur');
        });

        //点击其他位置 下拉框收起
        $('body').on('click',function(e){
            var target = $(e.target),
                _item =$('.item_input.on');
            if(!$(target).is('.item_input .drop_btn')){
                _item.removeClass('on');
            }
            if(!$(target).is('.item_input .ipm_text')){
                $('.item_input').removeClass('cur');
            }
        });

        //选框内容
        $('.drop_box ul li').on('click',function(){
            var $this = $(this),
                text = $(this).text();
            $this.parents('.item_input').find('.selected').val(text);
        });

        //表格选中行
        $('.ipm_table tr').on('click',function(){
            $(this).toggleClass('selected');
        });



    },
    pageTurning:function(x,y,z,v){
        var _total = x,//信息条数
            _pageSize = y,//每页显示的条数
            _currentNum = z,//当前页码
            _pageObj,
            _totalNum = Math.ceil(_total/_pageSize),
            _pageNum =  Math.min(_totalNum,v);//(页码总数,小于等于v)
        var _pageBox = $('.page_num_box');//页码容器
        var _numP = '<a href="javascript:;" class="page_btn num_btn"></a>';//页码
        //初始化页码
        appendPageNum(_pageNum);
        //初始化页码容器<a>
        function appendPageNum(number){
            for(var i=0;i<number;i++){
                _pageBox.append(_numP);
            }
            _pageObj=_pageBox.find('.num_btn');
        }
        pageChange(_currentNum);//初始化:翻页total,pageSize,currentNum,v（共v个页码按钮）

        //按钮翻页
        $('.page_container').on('click','.page_btn',function(){
            var $this = $(this),
                curPageNum = $this.parents('.page_container').find('.cur').text();
            if($this.hasClass('prev_page')){//上一页
                if(curPageNum>1)curPageNum--;
            }else if($this.hasClass('first_page')){//首页
                curPageNum = 1;
            }else if($this.hasClass('next_page')){//下一页
                if(curPageNum<_totalNum)curPageNum++;
            }else if($this.hasClass('last_page')){//首页
                curPageNum = _totalNum;
            }else{//数字翻页
                curPageNum=$this.text();
            }
            pageChange(curPageNum);
        });

        //页码数字填充
        function pageChange(cur){
            var _cur,//高亮位置索引
                _mid = Math.ceil(v/2),//中间位置索引
                _sIndex = 1;//首页页码
            if(cur<_mid&&_mid<(_totalNum-_mid)) {//前几页
                _cur = cur - 1;
            }else if(cur>(_totalNum-_mid)){console.log(_totalNum-_mid);//后几页
                _cur = v-(_totalNum-cur)-1;
                _sIndex = _totalNum -v+1;
            }else{//中间页
                _cur = _mid-1;
                _sIndex = cur-_mid+1;
            }
            statusChange(_cur,_sIndex);
        }

        //高亮当前页 刷新页码
        function statusChange(cur,_sIndex){
            $('.page_num_box .num_btn').eq(cur).addClass('cur').siblings().removeClass('cur');
            $.each(_pageObj,function(){
                $(this).text(_sIndex);
                _sIndex++;
            });
        }
    },

    // 日历调用-shiwen2-20170413
    useDatePlugin:function(){
        function dataPosition(){
            var data = $('.timeHideModel');
            pageLeft = $('.ipm_container').offset().left,
                dataLeft = data.offset().left,
                dataWidth = data.outerWidth(true),
                iptWidth = $('.selecDatePeriod').outerWidth(true),
                showWid = dataLeft - pageLeft + iptWidth;
            if(showWid>dataWidth){
                $(this).find('.timeHideModel').addClass('leftShow')
            }
        }
        $('.selecDatePeriod').bind('click', function () {
            dataPosition();
        });
        if ($(".date12").length > 0) {
            var obj = $(".date12").spcalendar({daypanel: 2});
            $(".dateTabBtn1 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj.options.defaultType = $(this).attr('data-mode');
                obj.calendarShow();
            });
        };
        if ($(".date13").length > 0) {
            var obj2 = $(".date13").spcalendar({daypanel: 2});
            $(".dateTabBtn2 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj2.options.defaultType = $(this).attr('data-mode');
                obj2.calendarShow();
            });
        };
    }
}
ipmCommonFun.init();