
/**
 * Created by wangjuan5 on 2016/8/25.
 */
var quality_platform = {
    init:function (){
        this.menuJson();//导航菜单数据
        this.statement();//导航收缩
        this.tabChange();//tab切换
        this.tableColor();//表格
        this.selectHover();//hover效果
        this.useDatePlugin();//日历调用
        this.popWin();//弹窗调用
        this.heightSet();//自适应高度设置
        this.winResize();//窗口变化
        this.downBoxList();//下拉树
        this.tableAdd();//动态表格
        this.loginPage();//登录页
        this.healthReport();//健康报告页面
        this.reportManage();//报告管理页面
        this.indexDetail();//指数详情页面
    },
    menuJson:function(){
        var menuData = [
            {
                "name":"首页",
                "iconfont":"&#xe605;"

            },
            {
                "name":"报告",
                "iconfont":"&#xe603;",
                "content":[
                    {   "name" : "健康度报告",

                        link:"health_report_home"
                    },
                    {   "name" : "健康趋势图",
                        "link":"health_report_chart"
                    }
                ]
            },
            {
                "name":"报表",
                "iconfont":"&#xe600;",
                "content":[
                    {"name" : "基础报表",
                        "content" : [
                            {"name":"工时清单","link":"time_report"},
                            {"name":"Task清单","link":"task_report"},
                            {"name":"Story清单","link":"story_report"}
                        ]
                    },
                    {"name" : "度量指标报表",
                        "content":[{"name":"效率度量报表(story相关)",link:"story_relative"}]

                    }
                ]
            },
            {
                "name":"后台管理",
                "iconfont":"&#xe602;",
                "content":[
                    {"name":"报告配置管理","link":"report_management"}
                ]
            }
        ];
        var menuBox = $('.nav_list');//导航容器
        for(var i=0;i<menuData.length;i++){//一级导航
            var firNav = '<li class="fir_con"><a href="javascript:void(0)" class="nav_txt fir_nav"><i class="iconfont">'+menuData[i].iconfont+'</i>'+menuData[i].name+'</a></li>';
            menuBox.append(firNav);
            if(menuData[i].content!=0&&menuData[i].content!=null)
                for(var j=0;j<menuData[i].content.length;j++){//二级导航与三级导航容器
                    var secNav = '<div class="sec_con nav_con"><a  href="javascript:void(0)" class="nav_tit nav_txt sec_nav clearfix" tab-name='+menuData[i].content[j].link+'><i class="icon down_btn"></i><em>'+menuData[i].content[j].name+'</em></a></div>';
                    menuBox.find('.fir_con').eq(i).append(secNav);
                    var thiCon = '<div class="thi_con nav_con"></div>';
                    menuBox.find('.fir_con').eq(i).find('.sec_con').eq(j).append(thiCon);
                    if(menuData[i].content[j].content!=0&&menuData[i].content[j].content!=null)
                        for(var m=0;m<menuData[i].content[j].content.length;m++){//三级导航
                            var thiNav = '<a href="javascript:void(0)" class="nav_tit nav_txt thi_nav clearfix" tab-name='+menuData[i].content[j].content[m].link+'><i class="line"></i><em>'+menuData[i].content[j].content[m].name+'</em></a>';
                            menuBox.find('.fir_con').eq(i).find('.sec_con').eq(j).find('.thi_con').append(thiNav);
                        }
                }
        }
    },
    statement:function(){
        //左侧菜单收缩与当前状态切换
        $('body').on('click','.nav_tit',function(){
            if($(this).hasClass('sec_nav')){//点击二级指标
                if($(this).parents('.sec_con').hasClass('cur')){//已经展开的二级指标 收缩
                    $(this).parents('.sec_con').removeClass('cur');
                }else{
                    $(this).parents('.nav_box').find('.fir_nav').removeClass('light');
                    $(this).parents('.fir_con').find('.fir_nav').addClass('light');
                    $('.fir_con').find('.sec_con').removeClass('cur');
                    $(this).parents('.nav_con').addClass('cur');
                }
            }else if($(this).hasClass('thi_nav')){//点击三级指标
                $(this).parents().find('.thi_nav').removeClass('on');
                $(this).addClass('on');
            }
        });
    },
    tabChange: function(){
        var _tabName;
        //点击导航切换tab
        $('body').on('click','.nav_con .nav_tit',function(){
            var _con = $('.tab_hd .tab_win');
            var _tabName = $(this).attr('tab-name');//标识打开的tab
            //表格内容切换,根据_tabName切换表格数据

            var _title = $(this).find('em').text();//
            var _tab = '<li class="'+_tabName+' cur"><em>'+_title+'</em><a href="javascript:void(0)" class="icon x_mark"></a></li>';
           //console.log(_tabName);
            if(_tabName!='null'&&_tabName!='undefined'&&_tabName){
                _con.find('li').removeClass('cur');
                if(_con.find('li').hasClass(_tabName)){//tab已经打开
                    $("li[class='"+_tabName+"']").addClass('cur');
                    $("iframe[class='iframe_box "+_tabName+"']").show().siblings().hide();
                }else{//tab未打开
                    _con.append(_tab);
                    var _iframe = '<iframe src="'+_tabName+'.html"  width="1800" height="900" scrolling="no" frameborder="0" id="'+_tabName+'" class="iframe_box '+_tabName+'" onload="getData()"></iframe>';
                    $('.iframe_con').append(_iframe);
                    quality_platform.heightSet();
                    $("iframe[class='iframe_box "+_tabName+"']").show().siblings().hide();
                }
            }
        });

        //点击tab切换tab
        $('body').on('click','.tab_win li',function(){
            _tabName = $(this).attr('class');
            $("iframe[class='iframe_box "+_tabName+"']").show().siblings().hide();
            $(this).addClass('cur').siblings('li').removeClass('cur');
            var _obj = $("a[tab-name='"+_tabName+"']");
            if(_obj.hasClass('sec_nav')){//点击二级指标
                if(_obj.hasClass('cur')){
                    _obj.removeClass('cur');
                }
            }else if(_obj.hasClass('thi_nav')){//点击三级指标
                _obj.parents('.nav_box').find('.fir_nav').removeClass('light');
                _obj.parents('.fir_con').find('.fir_nav').addClass('light');
                $('.fir_con').find('.sec_con').removeClass('cur');
                _obj.parents('.nav_con').addClass('cur');
                _obj.parents().find('.thi_nav').removeClass('on');
                _obj.addClass('on');
            }
        });

        //tab关闭
        var tab;//删除后显示的tab
        $('.tab_win').on('click','.x_mark',function(event){
            event.stopPropagation();
            var _obj = $(this).parents('li');
            _obj.removeClass('cur');
            var _oTabName = _obj.attr('class');
            $("iframe[class='iframe_box "+_oTabName+"']").remove();
            if(_obj.next('li').length){//当前元素后面有兄弟
                _tabName = _obj.next('li').attr('class');
                tab= _obj.next('li');
            }else if(_obj.prev('li').length){//后无  前面有兄弟
                _tabName = _obj.prev('li').attr('class');
                tab=_obj.prev('li');
            }else{//当前是最后一个元素
                _obj.remove();
                _tabName = 'quality_login';
            }
            $("iframe[class='iframe_box "+_tabName+"']").show().siblings().hide();
            tab.addClass('cur');
            _obj.remove();
        });
    },
    tableColor:function(){
        var Obj = $('.table_column_body tbody tr');
        var obj = $('.table_body tbody tr');
        tabcolorFun(obj);
        tabcolorFun(Obj);
        function tabcolorFun(obj){
            for(var i in obj){//console.log(i);
                if(i%2==1){
                    obj.eq(i).addClass('change_color').removeClass('change');
                }else{
                    obj.eq(i).addClass('change').removeClass('change_color');
                }
            }
        }

        var obj1 = $('.table_body tbody tr');
        obj1.hover(function(){
            $(this).addClass('cur');
            var _index = $(this).index();//console.log(_index);
            $(this).parents('.table_box').find('.table_column_body tr').eq(_index).addClass('cur');
        },function(){
            var _index = $(this).index();//console.log(_index);
            $(this).removeClass('cur');
            $(this).parents('.table_box').find('.table_column_body tr').eq(_index).removeClass('cur');
        });

        var Obj1 =$('.table_column_body tr');
        Obj1.hover(function(){
            $(this).addClass('cur');
            var _index = $(this).index();//console.log(_index);
            $(this).parents('.table_box').find('.table_body_con tr').eq(_index).addClass('cur');
        },function(){
            var _index = $(this).index();//console.log(_index);
            $(this).removeClass('cur');
            $(this).parents('.table_box').find('.table_body_con tr').eq(_index).removeClass('cur');
        });

    },
    selectHover:function() {
        var obj = $('.select_box');
        obj.hover(function () {
            var $this = $(this);
            $this.find('.select_list').show();
            $('.select_list li').on('click', function () {//console.log('000');
                if ($(this).hasClass('all_checked')) {//点击全选
                    if ($(this).hasClass('checked')) {
                        $(this).parent().find('li').removeClass('checked');
                    } else {
                        $(this).parent().find('li').addClass('checked');
                    }
                } else {//点击单选
                    if ($(this).hasClass('checked')) {
                        $(this).removeClass('checked');
                    } else {
                        $(this).addClass('checked');
                    }
                    allCheck($this);
                }

            });
            function allCheck($this) {
                var _obj = $this.parent().find('.check_con');
                var _len = _obj.length;//console.log(_len);
                var _clen = $this.parent().find('.check_con.checked').length;//console.log(_clen);
                if (_len == _clen) {
                    $('.all_checked').addClass('checked');
                } else {
                    $('.all_checked').removeClass('checked');
                }
            }

        }, function () {
            $(this).find('.select_list').hide();
        });

        //页码选择
        $('.select_con').hover(function () {
            $(this).find('.select_list_con').show();
            $('.select_list_con').on('click', 'li', function () {
                $(this).parents('.select_con').find('.selected_con').text($(this).text());
                $(this).parents('.select_list_con').hide();
            });
        }, function () {
            $(this).find('.num_list').hide();
        });

        //注销
        $('body').on('click',function(event){//
            var _obj = $('.tab_con .tab_hd .log_off');
            var evt = event.target?event.target : event.srcElement;
            if($(evt).hasClass('down')){
                if(_obj.is(':visible')){
                    $('.tab_con .tab_hd .log_off').hide();
                }else{
                    $('.tab_con .tab_hd .log_off').show();
                }
            }else{
                $('.tab_con .tab_hd .log_off').hide();
            }
        });
    },
    useDatePlugin:function(){
        if($(".date12").length>0){
            var obj = $(".date12").spcalendar({daypanel: 2});
            $(".dateTabBtn1 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj.options.defaultType = $(this).attr('data-mode');
                obj.calendarShow();
            });
        };
        if($(".date13").length>0){
            var obj2 = $(".date13").spcalendar({daypanel: 2});
            $(".dateTabBtn2 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj2.options.defaultType = $(this).attr('data-mode');
                obj2.calendarShow();
            });
        };
        if($(".date14").length>0){
            var obj3 = $(".date14").spcalendar({daypanel: 2});
            $(".dateTabBtn3 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj3.options.defaultType = $(this).attr('data-mode');
                obj3.calendarShow();
            });
        };
        if($(".date15").length>0){
            var obj4 = $(".date15").spcalendar({daypanel: 2});
            $(".dateTabBtn4 a").bind('click', function () {
                $(this).addClass('current').siblings('a').removeClass('current');
                obj4.options.defaultType = $(this).attr('data-mode');
                obj4.calendarShow();
            });
        };
    },
    popWin:function(){
    },
    heightSet:function(){
        var _body =$(window).outerHeight();
        var _window =$('.quality_hd').outerHeight();
        var _tabwindow =$('.tab_hd').outerHeight();
        var _mainwindow =$('.main_con').outerHeight();
        var _navWidth = $('.nav_box').outerWidth();
        var _bodyWidth = $(window).outerWidth();
        var _tableWidth = _bodyWidth-_navWidth;
        $('.content_box').height(_body-20);
        $('.content_box').width(_bodyWidth);

        var _tabH = $('.table_operation_con').outerHeight();
        var _tabF = $('.page_num_con').outerHeight();

        var _total = _window+_tabwindow+_mainwindow+_tabH + _tabF;
        var _tabHeight = _body-_total;
        var _num = (_tabHeight-50)/30;
        var _Height = _num*30;//console.log(_tabF);


        $('.iframe_box').height(_tabHeight);
        $('.iframe_box').width(_tableWidth);
        $('.table_body_con').height(_Height);
        var Sys={};
        var ua=navigator.userAgent.toLowerCase();
        var s;
        (s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
            (s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:
                (s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
                    (s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
                        (s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;
        if(Sys.ie){//Js判断为IE浏览器
            $('.table_column_con').height(_Height+20);
        }
        if(Sys.firefox){//Js判断为火狐(firefox)浏览器
            $('.table_column_con').height(_Height+23);
        }
        if(Sys.chrome){//Js判断为谷歌chrome浏览器
            $('.table_column_con').height(_Height+19);
        }
        if(Sys.opera){//Js判断为opera浏览器
            $('.table_column_con').height(_Height+20);
        }
        if(Sys.safari){//Js判断为苹果safari浏览器
            $('.table_column_con').height(_Height+20);
        }

        $('.scroll_box').height(_Height);
        var _rankHeight = $('.ranking_con').outerHeight();
        $('.health_table_con').height((parseInt(_tabHeight-_rankHeight-102-60-2)/30)*30);
        $('.health_table_con').width(_tableWidth-42);

        //报表管理 —— 查看日志
        $('.table_body_con').on('click','.check_record_btn',function(){
            var _width = _tableWidth*0.75;//console.log(_tableWidth);
            var _width2 = _tableWidth*0.25;
            $('.report_management_con').stop().animate({width:_width},500);
            $('.log_record_con').css({"right":-_width2,"width":_width2});
            $('.log_record_con').stop().animate({right:"0"},500,function(){
                $('.record_head').addClass('open');
            });

            $('.record_head').on('click','.close',function(){
                $('.log_record_con').css({"right":-_width2,"width":"0"});
                $('.report_management_con').stop().animate({width:_tableWidth},500,function(){
                    $('.record_head').removeClass('open');
                });

            });
        });

    },
    winResize:function(){
        $(window).resize(function(){
            quality_platform.heightSet();
        });
    },
    downBoxList:function(){
        treeStore();
        //初始化区域门店结构
        function treeStore(){
            var zNodes_gl1 = [{
                name: "技术平台部",
                children: [{
                    name: "平台保障部",
                    children:[{
                        name: "质量保障部"

                    },{
                        name: "平台研发部"
                    },{
                        name: "平台支持部"
                    }]
                }]
            },{
                name: "用户体验设计部",
                children: [{
                    name: "视觉设计部"
                },
                    {
                        name: "交互设计部"
                    },
                    {
                        name: "前端设计部"
                    }]
            },{
                name: "基础平台",
                children: [{
                    name: "系统运维部"
                },
                    {
                        name: "安全部"
                    },
                    {
                        name: "企业IT部"
                    }]
            }];
            initTree($("#treeStore"), $("#zone_treeStore"), $("#zone_tree_resultStore"), zNodes_gl1);
        };
        //初试化
        function initTree(tree_wrap, tree_source, tree_result, tree_data) {
            //初始化树配置
            var setting = {
                view: {
                    showIcon: false,
                    showLine: false,
                    autoCancelSelected: false
                },
                check: {
                    enable: true
                    //chkStyle: "radio",
                    //radioType: "all"
                },
                data: {
                    simpleData: {
                        enable: false

                    }
                },
                callback: {
                    beforeClick: beforeClick
                }
            };
            //    //加载自定义的区域树
            var treeObj_gl = $.fn.zTree.init(tree_source, setting, tree_data);
            //    var treeObj_result = $.fn.zTree.init(tree_result, setting2,[]);
            //
            //    count();
            //
            function beforeClick(treeId, treeNode) {
                var obj = $.fn.zTree.getZTreeObj(treeId);
                //obj.checkNode(treeNode, !treeNode.checked, true, true);
                //var node = treeObj.getNodeByParam("name", '', null);
            }

        }
        function searchNodes(treeId,name,val){
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var sNodes = treeObj.getCheckedNodes();//console.log(sNodes);
            if (sNodes.length > 0) {
                var tId = sNodes[0].tId;
            }
        }
    },
    tableAdd:function(){
        //表头 表内容数据
        var tableHead ={
            columns : [
                {
                    title : '序号',
                    width : '50',
                    field : 'serialNumber',
                    hidden : true,
                    fixColumns:true,
                    color : false,
                    editor:false
                },
                {
                    title : 'Domain ID',
                    width : '0',
                    field : 'id',
                    hidden : true,
                    fixColumns:true,
                    color : false
                }, {
                    title : '所属部门',
                    width : '80',
                    field : 'departmentName',
                    fixColumns:false,
                    color : false,
                    editor:false
                }, {
                    title : 'Domain名称',
                    width : '120',
                    field : 'domainName',
                    fixColumns:true,
                    color : false,
                    editor:false
                }, {
                    title : 'Domain编码',
                    width : '80',
                    field : 'domainCode',
                    fitColumns : true,
                    fixColumns:false,
                    color : false,
                    editor:false
                }, {
                    title : '邮箱',
                    width : '150',
                    field : 'domainEmailGroup',
                    fixColumns:false,
                    color : false,
                    editor:false
                }, {
                    title : 'DL',
                    width : '150',
                    field : 'domainLeaderName',
                    fixColumns:false,
                    color : true,
                    editor:false
                }, {
                    title : 'Backup DL',
                    width : '150',
                    field : 'backupDomainLeaderName',
                    fixColumns:false,
                    color : false,
                    editor:false
                }, {
                    title : '对应业务部门及接口人',
                    width : '100',
                    field : 'businessContacter',
                    fitColumns : true,
                    fixColumns:false,
                    color : false,
                    editor:false
                }, {
                    title : 'Domain成员数量',
                    width : '80',
                    field : 'userSize',
                    fixColumns:false,
                    color : false,
                    editor:true
                }

            ]
        }
        var tableData ={
            "rows": [
                {
                    "backupDomainLeaderAccount": "lipengfei",
                    "backupDomainLeaderId": 35812,
                    "backupDomainLeaderName": "Li Pengfei(上海_技术部_中台服务_黎鹏飞)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 887,
                    "departmentName": "商品服务部",
                    "domainCode": "ARCH-102",
                    "domainEmailGroup": "IT_ShareService_Price@yhd.com",
                    "domainLeaderAccount": "zuozhen",
                    "domainLeaderId": 29864,
                    "domainLeaderName": "Zuo Zhen(上海_技术部_中台服务_左臻)",
                    "domainName": "商品价格",
                    "enable": 0,
                    "id": 206,
                    "iucId": 2247,
                    "parentDepartmentId": 877,
                    "parentDepartmentName": "中台服务部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 7
                },
                {
                    "backupDomainLeaderAccount": "huxiaobin",
                    "backupDomainLeaderId": 29188,
                    "backupDomainLeaderName": "Hu Xiaobin(上海_技术部_中台服务_胡晓斌)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 876,
                    "departmentName": "用户服务中心",
                    "domainCode": "ARCH-103",
                    "domainEmailGroup": "IT_ShareService_User@yhd.com",
                    "domainLeaderAccount": "huxiaobin",
                    "domainLeaderId": 29188,
                    "domainLeaderName": "Hu Xiaobin(上海_技术部_中台服务_胡晓斌)",
                    "domainName": "用户服务",
                    "enable": 0,
                    "id": 207,
                    "iucId": 2,
                    "parentDepartmentId": 877,
                    "parentDepartmentName": "中台服务部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 5
                },
                {
                    "backupDomainLeaderAccount": "tianlinbo",
                    "backupDomainLeaderId": 36288,
                    "backupDomainLeaderName": "Tian Linbo(上海_技术部_中台服务_田林波)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1595,
                    "departmentName": "应用架构",
                    "domainCode": "ARCH-104",
                    "domainEmailGroup": "IT_ShareService_Architecture@yhd.com",
                    "domainLeaderAccount": "zhangfeng",
                    "domainLeaderId": 29982,
                    "domainLeaderName": "Zhang Feng(上海_技术部_中台服务_张峰)",
                    "domainName": "应用架构",
                    "enable": 0,
                    "id": 208,
                    "iucId": 92,
                    "parentDepartmentId": 877,
                    "parentDepartmentName": "中台服务部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 4
                },
                {
                    "backupDomainLeaderAccount": "wanghaitao",
                    "backupDomainLeaderId": 29530,
                    "backupDomainLeaderName": "Wang Haitao(上海_技术部_中台服务_汪海涛)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 876,
                    "departmentName": "用户服务中心",
                    "domainCode": "ARCH-105",
                    "domainEmailGroup": "IT_ShareService_Payment@yhd.com",
                    "domainLeaderAccount": "wanghaitao",
                    "domainLeaderId": 29530,
                    "domainLeaderName": "Wang Haitao(上海_技术部_中台服务_汪海涛)",
                    "domainName": "支付服务",
                    "enable": 0,
                    "id": 209,
                    "iucId": 2246,
                    "parentDepartmentId": 877,
                    "parentDepartmentName": "中台服务部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 6
                },
                {
                    "backupDomainLeaderAccount": "haohongting",
                    "backupDomainLeaderId": 33785,
                    "backupDomainLeaderName": "Hao Hongting(上海_技术部_平台保障_郝洪霆)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1585,
                    "departmentName": "平台研发部",
                    "domainCode": "ARCH-201",
                    "domainEmailGroup": "IT_Architecture_SOA@yhd.com",
                    "domainLeaderAccount": "jianglie",
                    "domainLeaderId": 29203,
                    "domainLeaderName": "Jiang Lie(上海_技术部_平台保障_江烈)",
                    "domainName": "SOA治理平台",
                    "enable": 0,
                    "id": 210,
                    "iucId": 49,
                    "parentDepartmentId": 862,
                    "parentDepartmentName": "平台保障部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 16
                },
                {
                    "backupDomainLeaderAccount": "heshengben",
                    "backupDomainLeaderId": 29150,
                    "backupDomainLeaderName": "He Shengben(上海_技术部_数据平台_何声犇)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1455,
                    "departmentName": "大数据平台",
                    "domainCode": "ARCH-202",
                    "domainEmailGroup": "IT_Architecture_DB@yhd.com",
                    "domainLeaderAccount": "chenchang",
                    "domainLeaderId": 29016,
                    "domainLeaderName": "Chen Chang(上海_技术部_数据平台_陈畅)",
                    "domainName": "数据基础设施",
                    "enable": 0,
                    "id": 211,
                    "iucId": 50,
                    "parentDepartmentId": 881,
                    "parentDepartmentName": "数据平台部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 11
                },
                {
                    "backupDomainLeaderAccount": "jianglie",
                    "backupDomainLeaderId": 29203,
                    "backupDomainLeaderName": "Jiang Lie(上海_技术部_平台保障_江烈)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 867,
                    "departmentName": "基础架构",
                    "domainCode": "ARCH-204",
                    "domainEmailGroup": "IT_Architecture_DFS@yhd.com",
                    "domainLeaderAccount": "haohongting",
                    "domainLeaderId": 33785,
                    "domainLeaderName": "Hao Hongting(上海_技术部_平台保障_郝洪霆)",
                    "domainName": "分布式存储",
                    "enable": 0,
                    "id": 213,
                    "iucId": 1991,
                    "parentDepartmentId": 882,
                    "parentDepartmentName": "架构部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 0
                },
                {
                    "backupDomainLeaderAccount": "yuqilu",
                    "backupDomainLeaderId": 29876,
                    "backupDomainLeaderName": "Yu Qilu(上海_技术部_中台服务_虞琦璐)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 929,
                    "departmentName": "OMS订单管理平台",
                    "domainCode": "ARCH-301",
                    "domainEmailGroup": "IT_OMS_GOS@yhd.com",
                    "domainLeaderAccount": "dengqiao",
                    "domainLeaderId": 29957,
                    "domainLeaderName": "Deng Qiao(武汉_技术部_架构部_OMS订单管理平台_邓桥)",
                    "domainName": "订单服务",
                    "enable": 0,
                    "id": 214,
                    "iucId": 2131,
                    "parentDepartmentId": 882,
                    "parentDepartmentName": "架构部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 0
                },
                {
                    "backupDomainLeaderAccount": "yuqilu",
                    "backupDomainLeaderId": 29876,
                    "backupDomainLeaderName": "Yu Qilu(上海_技术部_中台服务_虞琦璐)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1212,
                    "departmentName": "运营服务&订单",
                    "domainCode": "ARCH-301",
                    "domainEmailGroup": "IT_OMS@yhd.com",
                    "domainLeaderAccount": "yuqilu",
                    "domainLeaderId": 29876,
                    "domainLeaderName": "Yu Qilu(上海_技术部_中台服务_虞琦璐)",
                    "domainName": "订单管理平台",
                    "enable": 0,
                    "id": 215,
                    "iucId": 7,
                    "parentDepartmentId": 877,
                    "parentDepartmentName": "中台服务部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 12
                },
                {
                    "backupDomainLeaderAccount": "tuzihui",
                    "backupDomainLeaderId": 29515,
                    "backupDomainLeaderName": "Tu Zihui(武汉_技术部_中台服务_涂子辉)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 887,
                    "departmentName": "商品服务部",
                    "domainCode": "ARCH-303",
                    "domainEmailGroup": "IT_OMS_STOCK@yhd.com",
                    "domainLeaderAccount": "jiangkun1",
                    "domainLeaderId": 29201,
                    "domainLeaderName": "Jiang Kun(武汉_技术部_中台服务_江昆)",
                    "domainName": "商品库存",
                    "enable": 0,
                    "id": 216,
                    "iucId": 18,
                    "parentDepartmentId": 877,
                    "parentDepartmentName": "中台服务部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 12
                },
                {
                    "backupDomainLeaderAccount": "wuyalin",
                    "backupDomainLeaderId": 30081,
                    "backupDomainLeaderName": "Wu Yalin(武汉_技术部_数据平台_邬亚林)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1590,
                    "departmentName": "数据治理",
                    "domainCode": "BI-110",
                    "domainEmailGroup": "BI_WHA@yhd.com",
                    "domainLeaderAccount": "wuyalin",
                    "domainLeaderId": 30081,
                    "domainLeaderName": "Wu Yalin(武汉_技术部_数据平台_邬亚林)",
                    "domainName": "数据服务平台",
                    "enable": 0,
                    "id": 223,
                    "iucId": 97,
                    "parentDepartmentId": 881,
                    "parentDepartmentName": "数据平台部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 3
                },
                {
                    "backupDomainLeaderAccount": "wanggao",
                    "backupDomainLeaderId": 29528,
                    "backupDomainLeaderName": "Wang Gao(武汉_技术部_数据平台_汪高)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1590,
                    "departmentName": "数据治理",
                    "domainCode": "BI-111",
                    "domainEmailGroup": "BI_WHA@yhd.com",
                    "domainLeaderAccount": "wanggao",
                    "domainLeaderId": 29528,
                    "domainLeaderName": "Wang Gao(武汉_技术部_数据平台_汪高)",
                    "domainName": "数据仓库",
                    "enable": 0,
                    "id": 224,
                    "iucId": 2143,
                    "parentDepartmentId": 881,
                    "parentDepartmentName": "数据平台部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 7
                },
                {
                    "backupDomainLeaderAccount": "chengliangjian",
                    "backupDomainLeaderId": 30006,
                    "backupDomainLeaderName": "Cheng Liangjian(武汉_技术部_数据平台_程梁健)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1590,
                    "departmentName": "数据治理",
                    "domainCode": "BI-112",
                    "domainEmailGroup": "bi_java@yhd.com",
                    "domainLeaderAccount": "chengliangjian",
                    "domainLeaderId": 30006,
                    "domainLeaderName": "Cheng Liangjian(武汉_技术部_数据平台_程梁健)",
                    "domainName": "数据分析平台",
                    "enable": 0,
                    "id": 226,
                    "iucId": 2529,
                    "parentDepartmentId": 881,
                    "parentDepartmentName": "数据平台部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 8
                },
                {
                    "backupDomainLeaderAccount": "wuyijie",
                    "backupDomainLeaderId": 29995,
                    "backupDomainLeaderName": "Wu Yijie(武汉_技术部_数据平台_吴轶杰)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1590,
                    "departmentName": "数据治理",
                    "domainCode": "BI-114",
                    "domainEmailGroup": "BI_WHA@yhd.com",
                    "domainLeaderAccount": "wuyijie",
                    "domainLeaderId": 29995,
                    "domainLeaderName": "Wu Yijie(武汉_技术部_数据平台_吴轶杰)",
                    "domainName": "决策支持",
                    "enable": 0,
                    "id": 227,
                    "iucId": 2778,
                    "parentDepartmentId": 881,
                    "parentDepartmentName": "数据平台部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 8
                },
                {
                    "backupDomainLeaderAccount": "liufei",
                    "backupDomainLeaderId": 29900,
                    "backupDomainLeaderName": "Liu Fei(上海_过渡期项目小组_刘飞)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1469,
                    "departmentName": "数据科学",
                    "domainCode": "BI-201",
                    "domainEmailGroup": "liufei@yhd.com",
                    "domainLeaderAccount": "liufei",
                    "domainLeaderId": 29900,
                    "domainLeaderName": "Liu Fei(上海_过渡期项目小组_刘飞)",
                    "domainName": "数据应用",
                    "enable": 0,
                    "id": 228,
                    "iucId": 1994,
                    "parentDepartmentId": 1465,
                    "parentDepartmentName": "商务智能部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 1
                },
                {
                    "backupDomainLeaderAccount": "wangyingxiang",
                    "backupDomainLeaderId": 30211,
                    "backupDomainLeaderName": "Wang Yingxiang(上海_商务智能部_数据分析_王颖祥)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1468,
                    "departmentName": "数据分析",
                    "domainCode": "BI-401",
                    "domainEmailGroup": "wangyingxiang@yhd.com",
                    "domainLeaderAccount": "wangyingxiang",
                    "domainLeaderId": 30211,
                    "domainLeaderName": "Wang Yingxiang(上海_商务智能部_数据分析_王颖祥)",
                    "domainName": "商品及交易",
                    "enable": 0,
                    "id": 230,
                    "iucId": 2145,
                    "parentDepartmentId": 1465,
                    "parentDepartmentName": "商务智能部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 0
                },
                {
                    "backupDomainLeaderAccount": "liqi",
                    "backupDomainLeaderId": 29273,
                    "backupDomainLeaderName": "Li Qi(上海_技术部_商务智能_李琦)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 1470,
                    "departmentName": "自动化智能系统",
                    "domainCode": "BI-501",
                    "domainEmailGroup": "liqi@yhd.com",
                    "domainLeaderAccount": "liqi",
                    "domainLeaderId": 29273,
                    "domainLeaderName": "Li Qi(上海_技术部_商务智能_李琦)",
                    "domainName": "自动化智能系统",
                    "enable": 0,
                    "id": 231,
                    "iucId": 2146,
                    "parentDepartmentId": 1465,
                    "parentDepartmentName": "商务智能部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 0
                },
                {
                    "backupDomainLeaderAccount": "zhangxianhe",
                    "backupDomainLeaderId": 30212,
                    "backupDomainLeaderName": "Zhang Xianhe(上海_技术部_商务智能_张仙鹤)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 912,
                    "departmentName": "移动业务",
                    "domainCode": "BI-601",
                    "domainEmailGroup": "zhangxianhe@yhd.com",
                    "domainLeaderAccount": "zhangxianhe",
                    "domainLeaderId": 30212,
                    "domainLeaderName": "Zhang Xianhe(上海_技术部_商务智能_张仙鹤)",
                    "domainName": "商务智能-移动业务",
                    "enable": 0,
                    "id": 232,
                    "iucId": 2147,
                    "parentDepartmentId": 868,
                    "parentDepartmentName": "商务智能部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 0
                },
                {
                    "backupDomainLeaderAccount": "zouyang",
                    "backupDomainLeaderId": 30201,
                    "backupDomainLeaderName": "Zou Yang(上海_商务智能部_CMI_邹炀)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 913,
                    "departmentName": "CMI",
                    "domainCode": "BI-701",
                    "domainEmailGroup": "zouyang@yhd.com",
                    "domainLeaderAccount": "zouyang",
                    "domainLeaderId": 30201,
                    "domainLeaderName": "Zou Yang(上海_商务智能部_CMI_邹炀)",
                    "domainName": "商务智能-CMI",
                    "enable": 0,
                    "id": 233,
                    "iucId": 2148,
                    "parentDepartmentId": 868,
                    "parentDepartmentName": "商务智能部",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 0
                },
                {
                    "backupDomainLeaderAccount": "liziyu",
                    "backupDomainLeaderId": 29355,
                    "backupDomainLeaderName": "Li Ziyu(上海_技术部_基础平台_李子昱)",
                    "createTime": "2016-09-05 17:53:16",
                    "departmentId": 895,
                    "departmentName": "系统运维部",
                    "domainCode": "BP-101",
                    "domainEmailGroup": "IT_OPS_SA@yhd.com",
                    "domainLeaderAccount": "liziyu",
                    "domainLeaderId": 29355,
                    "domainLeaderName": "Li Ziyu(上海_技术部_基础平台_李子昱)",
                    "domainName": "基础平台-SA",
                    "enable": 0,
                    "id": 234,
                    "iucId": 78,
                    "parentDepartmentId": 871,
                    "parentDepartmentName": "基础平台",
                    "updateTime": "2016-09-05 17:53:16",
                    "userSize": 10
                }
            ],
            "total": 110
        }

        //表
        var tabH = tableHead.columns.length;//表头 字段数量
        var tabTh = $('.table_head_con thead tr');//表头
        var fixTh = $('.table_column_con .table_column thead tr');//固定表头
        var tabObj = $('.table_body tbody');//表主体内容
        var fixObj = $('.table_column_body tbody');//固定表主体内容

        //页码
        var _total = tableData.total;//信息总数 _total
        $('.page_num_con .total_page em').text(_total);
        //获取每页显示数量 _eachNum
        var _eachNum = $('.each_num_sel .selected_con').text();
        var _curIndex = 0;//初始为第一页
        var _totalNum = Math.ceil(_total/_eachNum);//初始化，向上取整页码数
        var _inNum = 5;
        var _pageBox = $('.page_num_box');//页码容器
        var _numP = '<a href="javascript:void(0)" class="turn_btn page_num"></a>';//页码html
        pageNumChange(_curIndex,_totalNum);//初始化页码

        tabBodyAdd(_eachNum,_curIndex);//初始化表格
        tabHeadAdd();//表头初始化


        //点击修改每页显示几条数据,即修改_eachNum
        $('.each_num_sel').on('click','.select_list_con li',function(){
            _eachNum = $(this).text();//每页显示信息条数
            _totalNum = Math.ceil(_total/_eachNum);//向上取整为总页码
            _curIndex=0;//重置当前页码
            pageNumChange(_curIndex,_totalNum);//刷新页码
            tabHeadAdd();//刷新表头
            tabBodyAdd(_eachNum,_curIndex);//刷新表格
        });

        //页码刷新 高亮当前页
        function pageNumChange(_curIndex,_totalNum){
            var _sNum;//开始页码
            var _pageObj;//页码容器
            var pageLen;//页码长度
            _pageBox.empty();
            if(_totalNum<_inNum){//五页以下
                _sNum = _totalNum;
                appendPageNum(_sNum);
                notEnoughPage();
            }else{//五页以上
                _sNum = 5;
                appendPageNum(_sNum);
                enoughPage();
            }
            //添加页码
            function appendPageNum(_sNum){
                for(var i = 0;i<_sNum;i++){
                    _pageBox.append(_numP);
                }
                _pageObj = $('.page_num');
                pageLen = $('.page_num').length;//更新页码数量
                $('.total_num em').text(_totalNum);//更新共几页
            }
            //5页以下
            function notEnoughPage(){
                $('.page_turn .page_num').eq(_curIndex).addClass('cur').siblings().removeClass('cur');
                $.each(_pageObj,function(k){
                    $(this).text(k+1);
                });
            }
            //5页以上
            function enoughPage(){
                if(_curIndex<3){//前3页
                    $('.page_turn .page_num').eq(_curIndex).addClass('cur').siblings().removeClass('cur');
                    $.each(_pageObj,function(k){
                        $(this).text(k+1);
                    });
                }else if(_curIndex>_totalNum-3){//后三页
                    var _ePage = _curIndex*1-_totalNum*1+pageLen;//console.log(_ePage);
                    $('.page_turn .page_num').eq(_ePage).addClass('cur').siblings().removeClass('cur');
                    $.each(_pageObj,function(k){
                        $(this).text(_totalNum-(4-k));
                    });
                }else{//中间正常显示，总是把当前页码置中
                    $('.page_turn .page_num').eq(2).addClass('cur').siblings().removeClass('cur');
                    var _sIndex = _curIndex-1;
                    $.each(_pageObj,function(){
                        $(this).text(_sIndex);
                        _sIndex++;
                    });
                }
            }
        }

        //点击改变显示页码,即修改_curIndex的值
        $('.page_turn').off('click').on('click','.turn_btn',function(){
            if($(this).hasClass('page_num')){//点击的是数字翻页
                $(this).addClass('cur').siblings().removeClass('cur');
                _curIndex = $(this).text()-1;
            }else{//点击的是按钮翻页
                if($(this).hasClass('fir_btn')){//首页
                    _curIndex=0;//console.log(_curIndex);
                }else if($(this).hasClass('prev_btn')){//前一页
                    _curIndex=_curIndex-1;
                    if(_curIndex<0){
                        _curIndex =0;
                        //return false;
                    }
                }else if($(this).hasClass('next_btn')){//下一页
                    _curIndex=_curIndex+1;
                    if(_curIndex>(_totalNum-1)){
                        _curIndex = _totalNum-1;
                    }//console.log(_curIndex);
                }else if($(this).hasClass('last_btn')){//末页
                    _curIndex=_totalNum-1;
                }
            }//console.l og(_curIndex);
            pageNumChange(_curIndex,_totalNum);
            tabBodyAdd(_eachNum,_curIndex);
        });

        //输入当前页码
        var enterNum = $('.cur_num_box .cur_num');
        enterNum.change(function(){
            if(enterNum.val()){
                var _index;
                if(enterNum.val()>_totalNum){
                    _index= _totalNum-1;
                }else{//若输入的数字大于总页码，置为末页
                    _index = enterNum.val()-1;
                }

            }
            pageNumChange(_index,_totalNum);
            tabBodyAdd(_eachNum,_index);
        });


        //加载表头+更新表头宽
        function tabHeadAdd(){
            tabTh.empty();//不固定列
            fixTh.empty();//固定列
            var _width=0;
            for(var j = 0;j<tabH;j++){
                var flag = tableHead.columns[j].fixColumns;
                var _td = '<td><div style="width: '+tableHead.columns[j].width+'px";">'+tableHead.columns[j].title+'</div></td>';
                if(flag){//为固定列
                    fixTh.append(_td);
                    _width += parseInt(tableHead.columns[j].width);
                }else{//为滑动列
                    if(tableHead.columns[j].color){
                        _td = '<td><div class="green" style="width: '+tableHead.columns[j].width+'px";">'+tableHead.columns[j].title+'</div></td>'
                    }
                    tabTh.append(_td);
                }
            }//console.log(_width);

            //重置表格与表头宽度
            $('.table_column_con').width(_width);
            $('.slider_table_box').css('margin-left',_width);
            var _obj = $('.table_body tbody tr').eq(0).find('td');
            var _widthAll = 0;
            _obj.each(function(k){
                var _tdWidth = _obj.eq(k).outerWidth();
                _widthAll+=_tdWidth;//console.log(_width);
            });
            var _box = $('.table_con').width()-_width;
            if(_widthAll<_box){//表格宽度不足时，100%拉伸
                $('.table_body').width(_box-21);//20为滚动条宽度，1为边框宽度
                $('.table_head').width(_box-21);
            }else{//表格宽度超出时，滚动条出现
                $('.table_body').width(_widthAll);
                $('.table_head').width(_widthAll);
            }
        }

        function tabBodyAdd(number,index){//fixObj
            tabObj.empty();
            fixObj.empty();
            $('.cur_num_box .cur_num').val(parseInt(index)+1);
            var _sNum = number*index;//每次重新开始加载数据的位置
            for(var j = 0;j<number;j++){//console.log(j);
                    var _tr = '<tr><td width="50"><div style="width: 50px">'+(j+_sNum+1)+'</div></td></tr>';
                    fixObj.append(_tr);
                    var _otr = '<tr></tr>';
                    tabObj.append(_otr);
                for(var i = 0;i<tabH;i++){//k++;
                    var _field = tableHead.columns[i].field;//需要显示的字段名
                    if(_field!='serialNumber'){
                        var _td = '<td width="'+tableHead.columns[i].width+'"><div class="td_cell" title="'+tableData.rows[j+_sNum][_field]+'" style="width: '+tableHead.columns[i].width+'px";">'+ tableData.rows[j+_sNum][_field]+'</div></td>';
                        if(tableHead.columns[i].fixColumns){
                            fixObj.find('tr').eq(j).append(_td);
                        }else{
                            if(tableHead.columns[i].editor){
                                _td = '<td width="'+tableHead.columns[i].width+'" class="editor_td"><div class="td_cell" title="'+tableData.rows[j+_sNum][_field]+'" style="width: '+tableHead.columns[i].width+'px";">'+ tableData.rows[j+_sNum][_field]+'</div></td>';
                            }else if(tableHead.columns[i].color){//console.log(i);
                                _td = '<td width="'+tableHead.columns[i].width+'"><div class="td_cell green" title="'+tableData.rows[j+_sNum][_field]+'" style="width: '+tableHead.columns[i].width+'px";">'+ tableData.rows[j+_sNum][_field]+'</div></td>';
                            }
                            tabObj.find('tr').eq(j).append(_td);
                        }
                    }
                    if(tableHead.columns[i].editor){

                    }
                }
            }
            quality_platform.tableColor();
        }

        $('.table_body_con').scroll(function(){
            var _left = $('.table_body_con').scrollLeft();//console.log(_left);
            $('.table_head').css('left',-_left);
            var _top = $('.table_body_con').scrollTop()-parseInt(40);//console.log(_top);
            $(".table_column_body").css('top',-_top);
        });
    },
    loginPage:function(){
        //输出框状态变化
        $('.enter_input').focus(function(){//console.log("000");
            $(this).parents('.enter_box').addClass('entering');
        });
        $('.enter_input').blur(function(){
            $(this).parents('.enter_box').removeClass('entering');
        });

        //登录设置
        $('.login_set').on('click','.content',function(){
            if($(this).find('i').hasClass('check_icon')){
                $(this).find('i').removeClass('check_icon');
            }else{
                $(this).find('i').addClass('check_icon');
            }
        });
    },
    healthReport:function(){
        //健康报告首页--折叠表格
        $('.toggle_table').on('click','.father_tr .toggle_box',function(){
            var $this = $(this).parents('.father_tr'),//console.log($this);
                _data = $this.attr('data-tr'),//获取点击的data-tr值
                _kid = $(".child_tr[par-data='"+_data+"']"),
                _icon = $this.find('.toggle_box .icon');
            if($this.hasClass('cur')){//收起
                $this.removeClass('cur');
                _icon.removeClass('minus_btn');
                _kid.hide();
                _kid.removeClass('on');
                _kid.find('.toggle_box .icon').removeClass('minus_btn');
                _kid.each(function(k){
                    var _dataTr = _kid.eq(k).attr('data-tr');
                    $(".son_tr[par-data='"+_dataTr+"']").hide();
                });
            }else{//展开
                $this.addClass('cur');
                _icon.addClass('minus_btn');
                if($this.next('tr').hasClass('child_tr')) {
                    _icon.addClass('minus_btn');
                    _kid.show();
                }
            }
        });
        $('.toggle_table').on('click','.child_tr .toggle_box',function(){
            var $this = $(this).parents('.child_tr'),
                _dataTr = $this.attr('data-tr'),//获取点击的data-tr值
                _son = $(".son_tr[par-data='"+_dataTr+"']"),
                _icon = $this.find('.toggle_box .icon');
            if($this.hasClass('on')){//收起
                $this.removeClass('on');
                _son.hide();
                _icon.removeClass('minus_btn');
            }else{//展开
                $this.addClass('on');
                _son.show();
                _icon.addClass('minus_btn');
            }
        });

        //健康报告首页--排名收缩
        $('.rank_toggle_box').on('click','.more_btn',function(){ console.log($(document).height());
            $(this).hide().siblings('.more_btn').show();
            var _icon = $(this).find('.icon');
            if(_icon.hasClass('up')){//收起
                _icon.parents('.ranking_con').find('.rank_box_top').animate({height:"100px"});
                _icon.parents('.ranking_con').removeClass('show');
            }else{//下拉
                _icon.parents('.ranking_con').find('.rank_box_top').animate({height:"240px"});
                _icon.parents('.ranking_con').addClass('show');
            }
        });
        $('.rank_room_con').on('click','.pack_up_btn',function(){//console.log($('.table_con').height());
            var _height = $('.health_table_con').height();
            if($(this).hasClass('packed')){
                $(this).siblings('.ranking_con').find('.rank_box_top').animate({height:"102px"});
                $(this).parents('.rank_room_con').animate({height:"102px"});
                $(this).siblings('.ranking_con').find('.rank_toggle_box').show();
                $('.health_table_con').height(_height-parseInt(74));
            }else{//收起
                $(this).siblings('.ranking_con').find('.rank_box_top').animate({height:"28px"});
                $(this).parents('.rank_room_con').animate({height:"28px"});
                $(this).siblings('.ranking_con').find('.rank_toggle_box').hide();
                var obj = $(this).siblings('.ranking_con').find('.more_btn .up');
                obj.parents('.more_btn').hide().siblings().show();
                $('.health_table_con').height(_height+parseInt(74));
            }
            $(this).toggleClass('packed');
        });



        //健康趋势图  报告周期选择
        var min= 0,max= 0,_s= 0,_e= 0,startName,endName;//开始，结束索引
        $('.period_con').on('click','.select_list li',function(){
            var len = $('.select_list li.on').length;//console.log(len);
            var _obj = $('.select_list li.on');
            switch(len){
                case 0:
                    $(this).addClass('on');
                    _s = $(this).attr('data');
                    break;
                case 1:
                    $(this).addClass('on');
                    _e = $(this).attr('data');//console.log();
                    max = Math.max(_s,_e);
                    min = Math.min(_s,_e);
                    startName = $(".select_list li[data='"+min+"']").find('em').text();
                    endName = $(".select_list li[data='"+max+"']").find('em').text();
                    var reName = startName +' ~ '+ endName;
                    $(this).parents('.select_box').find('.selected_con').text(reName);
                    for(var i=min;i<max;i++){
                        $(".select_list li[data='"+i+"']").addClass('on');//console.log(i);
                    }
                    break;
                default:
                    $.each(_obj,function(k){
                            _obj.eq(k).removeClass('on');
                        });
                    _s = $(this).attr('data');
                    $(this).addClass('on');
                    break;
            }
        });
    },
    reportManage:function(){

    },
    indexDetail:function(){
        $('.index_detail_body').on('click','.operation_btn_con a',function(){
            if($(this).hasClass('editor_btn')){
                $(this).parents('.operation_btn_con').addClass('editing');
            }else{
                $(this).parents('.operation_btn_con').removeClass('editing');
            }
        });
    }
}

quality_platform.init();