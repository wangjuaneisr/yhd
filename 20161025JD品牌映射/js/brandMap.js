/**
 * Created by wangjuan5 on 2016/10/25.
 */


var brandMap = {
	initFun:function(){
		this.popupFun();//所有弹窗开关控制
		this.clearPop();//清除二次确定
		this.checkRecord();
	},
	
	popupFun:function(){

		//编辑类目映射关系
		$('.table_handle').on('click','.import_btn',function(){
			$(this).PopupDialog({
				popupClass:'.import_pop',
				maskLayer:true
			});
		});

		$('.handle_td').on('click','.editor_btn',function(){
			$(this).PopupDialog({
				popupClass:'.brand_editor_pop',
				maskLayer:true
			});
			var _val = $(this).parents('tr').find('td').eq(3).find('a.blue_link').text();console.log(_val);
			$('.brand_editor_pop').find('.yhd_brand').attr('value',_val);//console.log($('.brand_editor_pop').find('.yhd_brand'));
		});

		//EXCEL导入 S
		$('.handle_td').on('click','.map_brand',function(){
			$(this).PopupDialog({
				popupClass:'.brank_map_pop',
				maskLayer:true
			});
		});

		//导入
		$('.popup_btn_box').on('click','.import_btn',function(){
			$(this).PopupDialog({
				popupClass:'.importing_pop',
				maskLayer:true,
				delayClose:3,
				callback:function (){
					//根据返回状态修改
					$(this).PopupDialog({
						popupClass:'.fail_import_status',
						maskLayer:true
					});
			}
			});
		});//EXCEL导入 E


		//EXCEL导出 S
		$('.table_handle').on('click','.export_btn',function(){
			$(this).PopupDialog({
				popupClass:'.export_pop',
				maskLayer:true
			});
		});
		//EXCEL导出 E

	},
	clearPop:function(){
		//   清除
		$('.has_tooltip').on('click','.check_handle',function(){
			if ($(this).hasClass('gray_link')) {
				return false;
			}
			$(this).siblings('.tooltip_box').show();
			$(this).parents('tr').siblings('tr').find('.tooltip_box').hide();
			$(this).siblings('.tooltip_box').find('.confirm').click(function(){
				$(this).parents('.tooltip_box').hide();
				$(this).parents('.tooltip_box').prev('.check_handle').addClass('gray_link');
				$(this).parents('.has_tooltip').siblings('.has_tooltip').find('.check_handle').removeClass('gray_link');
			});
			$('.handle_td .cancle').click(function(){
				$(this).parents('.tooltip_box').hide();
			})
		});
	},
	checkRecord:function(){
		$('.form_cont').on('click','.check_record',function(){
			window.location.href='import_record.html';
		});
		$('.popup_btn_box').on('click','.check_record_btn',function(){
			window.location.href='import_record.html';
		});
	}
};
brandMap.initFun();