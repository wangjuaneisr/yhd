/*
 *Description : prism系统公共交互部分 ;
 *Author : Wang Juan5;
 *Date : 2017/03/01;
 **/
var prismCommon = {
    init: function () {
        this.heigtSet();//导航高度自适应文档高度
        this.tablePop();//表格行遮罩
        this.tabChange();
        this.selectFun();//
        this.pageTurning(200,20,1,5);//信息总数，每页显示数目，当前页，页码量
        this.addDeleteData();
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
            }else if($this.hasClass('next_page')){//下一页
                if(curPageNum<_totalNum)curPageNum++;
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
            if(cur<_mid) {//前几页
                _cur = cur - 1;
            }else if(cur>(_totalNum-_mid)){//后几页
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
    //导航高度自适应文档高度
    heigtSet: function () {
        function navHeight(){
            var _h = $('html').outerHeight()-$('.prism_head').outerHeight()+1;
            $('.main_container .nav_box').outerHeight(_h);
        };
        navHeight();
        $('document').resize(function(){
            navHeight();
        });
    },
    tablePop:function(){
        //表格弹窗
        $('.operate_btn').on('click',function(){
            var $this = $(this),
                _top = $this.parents('tr').index()*$this.parents('tr').outerHeight()+$this.parents('table').find('th').outerHeight()+2;
            if($this.find('.iconfont').hasClass('detect_btn')){
                if($this.hasClass('detected')){
                    if($this.find('.detect_btn').hasClass('group_detect_btn')){
                        $this.PopupDialog({
                            popupClass:'.group_detect_pop',
                            maskLayer:true,
                            maskHeight:'.content_box',
                            maskWidth:'.tab_box',
                            fullScreen:false,
                            top:0
                        });
                    }else if($this.find('.detect_btn').hasClass('search_icon')){
                        $this.PopupDialog({
                            popupClass:'.prism_manager_pop',
                            maskLayer:true,
                            maskHeight:'.content_box',
                            maskWidth:'.tab_box',
                            fullScreen:true,
                            top:0
                        });
                    }else{
                        $this.PopupDialog({
                            popupClass:'.no_use_pop',
                            maskLayer:true,
                            maskHeight:'.table_body td',
                            maskWidth:'.table_content_box',
                            fullScreen:false,
                            top:_top
                        });
                    }

                }else{
                    $this.PopupDialog({
                        popupClass:'.loading_pop',
                        maskLayer:true,
                        maskHeight:'.table_body td',
                        maskWidth:'.table_content_box',
                        fullScreen:false,
                        top:_top,
                        delayClose:3
                    });
                }

            }else if($this.find('.iconfont').hasClass('upload_btn')){
                $this.PopupDialog({
                    popupClass:'.update_success',
                    maskLayer:true,
                    maskHeight:'.table_body td',
                    maskWidth:'.table_content_box',
                    fullScreen:false,
                    top:_top
                });
            }else if($this.find('.iconfont').hasClass('delete_btn')){
                $this.PopupDialog({
                    popupClass:'.delete_pop',
                    maskLayer:true,
                    maskHeight:'.table_body td',
                    maskWidth:'.table_content_box',
                    fullScreen:false,
                    top:_top
                });
            }
        });

        //创建数据
        $('.common_btn_box').on('click','.build_group_btn',function(){
            $(this).PopupDialog({
                popupClass:'.build_success',
                maskLayer:true,
                fullScreen:true
            });
        });

        //数据源检测
        $('')
    },
    tabChange:function(){
        $('.tab_list').on('click','.tab',function(){
            $(this).addClass('on').siblings('.tab').removeClass('on');
            var _data = $(this).attr('data-class');
            $('.page_box[data-class='+_data+']').show().siblings('.page_box').hide();
        });
    },
    selectFun:function(){
        $('body').on('click','.item .item_box,.item .iconfont',function(){
            $(this).parents('.item').toggleClass('hover');
        });
        $('body').on('click','.item .item_drop li,.item .item_drop dd',function(){
            $(this).parents('.item').toggleClass('hover');
            $(this).parents('.item').find('.item_box').text($(this).text());
        });

        $('body').on('click',function(e){
            //e.stopPropagation();
            var target = $(e.target),
                _item = $('.common_item .item');
            if(!$(target).is('.item *')){console.log('111');
                _item.removeClass('hover');
            }

        });
    },
    addDeleteData:function(){
        $('body').on('click','.td_box .delete_btn',function(){
            $(this).parents('.td_box').remove();
        });
        var dom = '<div class="td_box">'+
                        '<a href="javascript:;" class="item item_mid">'+
                        '<div class="item_box">选择备库地址</div>'+
                        '<i class="iconfont drop_icon">&#xe658;</i>'+
                        '<div class="item_drop">'+
                            '<dl>'+
                                '<dd>mysql://mysql-upload.int.</dd>'+
                                '<dd>mysql://mysql-upload.int.mysql://mysql-upload.int.</dd>'+
                                '<dd>mysql://mysql-upload.int.</dd>'+
                                '<dd>mysmysql://mysql-upload.int.mysql://mysql-upload.int.ql4</dd>'+
                            '</dl>'+
                        '</div>'+
                        '</a>'+
                        '<a href="javascript:;" class="item item_short item_weight">'+
                            '<label>读权重</label>'+
                            '<input type="text" value="40" class="weight">'+
                            '<i class="iconfont delete_btn">&#xe63b;</i>'+
                        '</a>'+
                    '</div>';
        $('.create_box').on('click','.create_btn',function(){
            $(this).parents('.td_box').before(dom);
        });
    }

}
prismCommon.init();