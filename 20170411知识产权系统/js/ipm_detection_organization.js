/*
 *Description :  ;
 *Author : shiwen2;
 *Date : 20170417;
 **/

 var ipmDetectionOrganization={

 	init:function(){
 		this.ipmIdPop();
 		this.ipmAddAccount();
 	},

 	ipmIdPop:function(){
 		//提示框
          var tipBox = $(".has_tooltip");
          tipBox.on('click', '.table_btn', function (e) {
               var $this = $(this),
                   tipBoxCont = $this.siblings('.tooltip_box');
               $('.tooltip_box').hide();
               tipBoxCont.show();
          });
          tipBox.on('click', '.pop_btn_box .cancle', function () {
               $(this).parents('.tooltip_box').hide();
          });
          $(document).mouseup(function (e) {
               if (!tipBox.is(e.target) && tipBox.has(e.target).length === 0) {
                    tipBox.children('.tooltip_box').hide();
               }
          });

          //弹框调用
          $(".ipm_table").on('click','.sure_start_use',function(){
              var _this = $(this);
              _this.parents('.tooltip_box').hide();
              _this.PopupDialog({ //启用成功
                    popupClass:'.pop_start_succeed', //弹窗ClassName
                    maskLayer:true, //是否遮罩
                    delayClose:2//自动关闭时间
               });
          });
          $(".ipm_table").on('click','.sure_end_use',function(){
              var _this = $(this);
              _this.parents('.tooltip_box').hide();
              _this.PopupDialog({ //停用成功
                    popupClass:'.pop_end_succeed', //弹窗ClassName
                    maskLayer:true, //是否遮罩
                    delayClose:2//自动关闭时间
               });
          });
          $(".ipm_table").on('click','.sure_delete',function(){
              var _this = $(this);
              _this.parents('.tooltip_box').hide();
              _this.PopupDialog({ //删除成功
                    popupClass:'.pop_delete_succeed', //弹窗ClassName
                    maskLayer:true, //是否遮罩
                    delayClose:2//自动关闭时间
               });
              _this.parents('tr').remove();
          });
 	},

 	ipmAddAccount:function(){
 		//添加、删除权限
	    var selectOptionDd = $('.select_option dd'),
            allSelectDt = $('.select_option dt'),
	        ddIpt = selectOptionDd.find('input[type=checkbox]'),
	        dtIpt = allSelectDt.find('input[type=checkbox]'),
	        selectOptionDt = $('.select_option dt'),
	        dtIpt = selectOptionDt.find('input[type=checkbox]');

        //多选
	    ddIpt.each(function(){
            ddIpt.on('change',function(){
	            var _this = $(this),
                    _dataClass = _this.parents('dl').attr('data-class'),//标记
                    _dtTxt = _this.parents('dd').siblings('dt').find('label').text(),//标签
                    _dt ='<dt>'+_dtTxt+'</dt>'
                    selectedBox = _this.parents('.select_option_wrap').next('.selected_box_wrap').find('dl[data-class='+_dataClass+']'),
                    _tflag = selectedBox.find('dt').length,
                     _dflag = selectedBox.find('dd').length
                    flag = _this.parents('dl').find('.select_option_items').length,
                    _text = _this.next('label').text(),
                    _id = _this.attr('id'),
                    selectedItems = '<dd href="javascript:;" class="selected_items" data-class="'+_id+'">'+_text+'<i class="iconfont">&#xe63a;</i></dd>';

                if(_this.is(":checked")){
                    if(!_tflag){selectedBox.append(_dt);}
	                if(selectedBox.find('dd[data-class='+_id+']').length==0){
                        _dflag++;//console.log(flag);console.log(_dflag);
                        if(flag==_dflag){
                            _this.parents('dl').find('dt input').prop('checked',true);
                        }
                        selectedBox.append(selectedItems);
                    }
	            }else{
	                selectedBox.find('dd[data-class="'+_id+'"]').remove();
                    _dflag--;
                    if(_dflag==0){
                        selectedBox.empty();
                    }
                    if(flag==_dflag){
                        _this.parents('dl').find('dt input').attr('checked');
                    }else{
                        _this.parents('dl').find('dt input').removeAttr('checked');
                    }
	            }
	        });
	        return false;
	    });

        //删除
        $('.selected_box').on('click','.iconfont',function(){
            var _thisParent = $(this).parent('.selected_items'),
                _dt = _thisParent.siblings('dt');
                _id = _thisParent.attr('data-class'),
                _dataClass = $(this).parents('dl').attr('data-class'),//标记
                 _Parent = _thisParent.parents('.ipm_choose_box').find('dl[data-class='+_dataClass+']'),
                flag = _Parent.find('.select_option_items').length,
                _dflag = _thisParent.parents('dl').find('dd').length-1;
            _thisParent.remove();
            $('#'+_id).removeAttr('checked');
            $('#'+_id).prop('checked',false);
            if(!_dflag){
                _dt.remove();
            }
            if(_dflag!=flag){
                _Parent.find('dt input').removeAttr('checked');
            }
        });

        //全选
        allSelectDt.each(function(){
            var _this = $(this);
            _this.on('click',function(){
                var $this=$(this),
                    _kidInput=$this.parents('dl').find('dd input'),
                    _dataClass = _this.parents('dl').attr('data-class'),//标记
                    _dtTxt = _this.parents('dl').find('dt label').text(),//标签
                    _dt ='<dt>'+_dtTxt+'</dt>'
                    selectedBox = _this.parents('.select_option_wrap').next('.selected_box_wrap').find('dl[data-class='+_dataClass+']'),
                    _tflag = selectedBox.find('dt').length;
                if($this.find('input').prop("checked")==true){
                    _kidInput.prop('checked',true);
                    if(!_tflag){selectedBox.append(_dt);}
                    _kidInput.each(function(){
                        var _text = $(this).next('label').text(),
                        _id = $(this).attr('id'),
                        selectedItems = '<dd href="javascript:;" class="selected_items" data-class="'+_id+'">'+_text+'<i class="iconfont">&#xe63a;</i></dd>';
                        selectedBox.append(selectedItems);
                    });
                }else{
                    _kidInput.prop('checked',false);
                    selectedBox.empty();
                }
            })
        });
 	}

 }
 ipmDetectionOrganization.init();