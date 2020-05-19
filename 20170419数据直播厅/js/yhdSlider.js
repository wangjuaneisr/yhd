(function(){
	function Switchable(option){
		this.option = {
			container : null,			//轮播切换最外层的容器
			content : null,				//切换内容的容器
			trigger : null,				//数字触点容器
			pageButton : [],			//上下翻页按钮
			steps : 1,					//切换的内容个数
			effect : 'visible',			//切换效果
			autoPlay : false,			//是否自动播放
			interval : 3000,			//自动播放间隔时间
			activeClass : "on",			//触点当前状态样式
			speed : 300,				//动画切换速度
			eventType : "mouseover",	//切换触发事件类型
			delay : 0					//延迟执行
		};

		$.extend(this.option,option);

		//全局变量
		this.box = $(this.option.container);

		if(this.box.length == 0) return false;
		this.sprite = this.box.find(this.option.content);
		if(this.sprite.length == 0) return false;
		
		this.trig = this.box.find(this.option.trigger).children();
		this.btnLast = this.box.find(this.option.pageButton[0]);
		this.btnNext = this.box.find(this.option.pageButton[1]);
		
		this.items = this.sprite.children();
		if(this.items.length == 0) return false;

		this.total = this.items.length;
		if(this.total <= this.option.steps) return false;
		
		this.page = Math.ceil(this.total/this.option.steps);
		this.width = this.items.eq(0).outerWidth(true);
		this.height = this.items.eq(0).outerHeight(true);
		
		this.index = 0;
		this.timer = 0;
		this.handlers = {};

		this.init();
	}
	
	Switchable.prototype = {
		init:function(){
			this.initStyle();
			this.cutover(0);
			this.bindUI();
			this.autoPlay();
		},
		on:function(type,handler){
			if (typeof this.handlers[type] == "undefined") {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data){
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](data);
				}
			}
		},
		initStyle:function(){
			//填充无缝数据
			var fillElem = function(e){
				for(var i=0;i<e.option.steps;i++){
					e.items.eq(e.total-(i+1)).clone().prependTo(e.sprite);
					e.items.eq(i).clone().appendTo(e.sprite);
				}
			};

			switch(this.option.effect){
				case "scrollx":
					fillElem(this);
					this.sprite.css({
						width:this.sprite.children().length*this.width,
						left:-this.option.steps * this.width
					});
					this.sprite.children().css("float","left");
				break;
				case "scrolly":
					fillElem(this);
					this.sprite.css({
						top:-this.option.steps * this.height
					});
				break;
				case "fade":
					this.items.css({position:"absolute",zIndex:0}).eq(this.index).css({zIndex:1});
				break;
				case "visible":
					this.items.css({display:"none"}).eq(this.index).css({display:"block"});
				break;
			}
			
			var that = this;
			var st = setTimeout(function(){
				clearTimeout(st);
				that.fire("init");
			},30);
		},
		cutover:function(speed){
			var sd = (speed==null) ? this.option.speed : 0;
			var _index = this.index != this.page ? this.index : 0;
			this.trig.eq(_index).addClass(this.option.activeClass).siblings().removeClass(this.option.activeClass);
			switch(this.option.effect){
				case "visible":
					this.items.css({display:"none"}).eq(_index).css({display:"block"});
				break;
				case "fade":
					this.items.css({position:"absolute",zIndex:0}).fadeOut(sd);
					this.items.eq(_index).css({zIndex:1}).fadeIn(sd);
				break;
				case "scrollx":
					var w = this.width * this.option.steps;
					this.sprite.stop().animate({"left":-w*this.index-w},sd);
				break;
				case "scrolly":
					var h = this.height * this.option.steps;
					this.sprite.stop().animate({"top":-h*this.index-h},sd);
				break;
			}
			this.fire("cutover",_index);
		},
		bindUI:function(){
			var that = this;
			var delayed = 0;
			this.trig.bind(this.option.eventType,function(){
				var the = this;
				if(that.option.eventType == "mouseover" || that.option.eventType == "mouseenter"){
					if(that.index == $(the).index()){
						return;
					}
					clearTimeout(delayed);
					delayed = setTimeout(function(){
						that.index = $(the).index();
						that.cutover();
						clearTimeout(delayed);
					},that.option.delay);
				}else{
					that.index = $(this).index();
					that.cutover();
				}
			});
			
			this.btnLast.click(function(){
				that.lastPage();
			});
			this.btnNext.click(function(){
				that.nextPage();
			});
			//引入touch事件 add by yuting2 on 2016/6/13
			function touchEvent(dom,end,move,start){
			    var sx = 0,
			        sy = 0,
			        ex = 0,
			        ey = 0;
			    $(dom).off('touchstart touchend').on({
			        'touchstart': function(e) {
			            var touchs = e.originalEvent.changedTouches[0];
			            sx = touchs.pageX;
			            sy = touchs.pageY;
			            if(start) start(sx,sy);
			        },
			        'touchmove':function(e){
			            // if (e.preventDefault) e.preventDefault();
			            // else e.returnValue = false;
			            var touchs = e.originalEvent.changedTouches[0];
			            ex = touchs.pageX;
			            ey = touchs.pageY;
			            if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
			                if(move) move(ex-sx,ey-sy);
			                e.preventDefault();
			            }
			            
			        },
			        'touchend': function(e) {
			            var touchs = e.originalEvent.changedTouches[0];
			            ex = touchs.pageX;
			            ey = touchs.pageY;

			            if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
			                if (ex - sx > 0) {
			                    if(end) end('right');
			                } else {
			                    end('left');
			                }
			            } else {
			                if (ey - sy > 0) {
			                    end('down');
			                } else {
			                    end('up');
			                }
			            }

			        }
			    })
			}
			touchEvent(this.box,function(dir){
		        if (dir == "left") {
		            that.lastPage();
		        }
		        if (dir == "right") {
		            that.nextPage();
		        }
			})
			
			//鼠标是否在感应区内
			this.box.bind({
				"mouseenter":function(){
					that.btnLast.show();
					that.btnNext.show();
					clearInterval(that.timer);	
				},
				"mouseleave":function(){
					that.btnLast.hide();
					that.btnNext.hide();
					that.autoPlay();	
				}
			});
		},
		lastPage: function () {
			this.index--;
			if (this.index < -1) {
				this.index = this.page - 1;
				this.cutover(0);
				this.index = this.page - 2;
			}
			this.cutover();
		},
		nextPage: function () {
			this.index++;
			if (this.index > this.page) {
				this.index = 0;
				this.cutover(0);
				this.index = 1;
			}
			this.cutover();
		},
		autoPlay:function(){
			var that = this;
			if(!this.option.autoPlay) return false;
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				that.nextPage();
			},this.option.interval);
		}
	}
	window.Switchable = Switchable;
})();