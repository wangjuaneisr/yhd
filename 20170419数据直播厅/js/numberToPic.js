/**
 * Created by wangjuan5 on 2017/5/18.
 */
/*
 * 根据成交金额字符串，转化为图片数字
 * */
//数字转化
transitionToPicNum(1845673092.05);
function transitionToPicNum(x){
    var number = x.toString(),
        arr = number.split('.'),//console.log(arr);
        integerNum = arr[0],
        floatNum = arr[1],
        integerNumArr = integerNum.split(''),
        floatNumArr = floatNum.split(''),
        integerNumArrLen = integerNumArr.length,
        floatNumArrLen = floatNumArr.length;
    var spanNum = Math.ceil(integerNumArrLen/3),
        spanFir = integerNumArrLen%3,
        container = $('.break_num'),
        _top = 0;
    //整数部分
    for(var i = 0;i<spanNum;i++){
        var j = 0,
            emNum = 3,
            span ='<span class="sec clearfix"></span>';
        container.append(span);//添加span
        if(i==0&&spanFir!=0){
            emNum = spanFir;
        }
        var em = '';
        for(var k=0;k<emNum;k++){
            var topP = integerNumArr[_top]*60;
            em+='<em style="background-position: 0 -'+topP+'px"></em>';
            _top++;
        }
        if(i<(spanNum-1)){
            em+='<s class="comma"></s>';
        }else{
            em+='<s class="dit"></s>';
        }
        container.find('span').eq(i).append(em);
    }
    //小数部分
    var float = '';
    container.append('<span class="sec clearfix"></span>');
    var spanL = container.find('span').last(),
        floatEm='',
        floatTop=0;
    for(var i=0;i<floatNumArrLen;i++){
        var topP = floatNumArr[floatTop]*60;
        floatEm += '<em style="background-position: 0 -'+topP+'px"></em>';
        floatTop++;
    }
    spanL.append(floatEm);
}