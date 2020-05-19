/*
 *Description :  ;
 *Author : Wang Juan;
 *Date : 2016/;
 **/
var pageName = {
	init:function(){
		this.FunName();
	},


    //计算日历
    FunName:function() {
    	var moday=[31,28,31,30,31,30,31,31,30,31,30,31];
    	var d = new Date();
    	var month = d.getMonth()+1;//当前月份
    	var days = d.getDate();//当前月的号数
    	var years = d.getFullYear();//当前年份

    	var run = years%4;
    	if(run!=0){
    		moday[1]=28;
    	}else{
    		moday[1]=29;
    	}

    	var date = new Date();
    	date.setDate(1);





    }

}
pageName.init();