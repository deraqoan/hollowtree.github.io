//获取元素的函数
function $(id) {
    return document.getElementById(id);
}

//配置数据
var configData = {
    //幻灯片从上往下播放时每帧的移动距离，其数值必须为图片高度(98)的因数，单位px
    stepLength: 2,
    //每页幻灯片展示的时间，单位ms
    showTime:2000,
    //幻灯片从上往下播放时动画的帧与帧之间的间隔时间，单位ms
    stepTime: 20,
    //每张幻灯片的高度，单位px
    imageHeight: 98,
    //获取幻灯片
    slides: $("contentBox").getElementsByTagName("img"),
    //获取按钮
    btns: $("btns").getElementsByTagName("i"),

    //！！！！！！！！！！！！！不可修改！！！！！！！！！！！！//
    //flag控制幻灯片运动的方向
    flag: false,
    //控制 id 为 contentBox 的 margin-top 值
    boxMarginTop: 0,
    //页面中会用到的两个超时调用计时器
    timer1: null,
    timer2: null
}

//按钮变色
function changeBtnColor(boxMarginTop) {
    var btnIndex = Math.floor((-boxMarginTop) / configData.imageHeight);
    for (var i = 0; i < configData.btns.length; i++) {
        if (i == btnIndex) {
            configData.btns[i].style.backgroundColor = "#f60";
            configData.btns[i].style.color = "#fff";
        } else {
            configData.btns[i].style.backgroundColor = "";
            configData.btns[i].style.color = "";
        }
    }
}

//鼠标切换
$("btns").onclick = function (event) {
    clearTimeout(configData.timer1);
    clearTimeout(configData.timer2);
    var event = event || window.event;
    var target = event.target || event.srcElement;
    var imageIndex = target.firstChild.nodeValue - 1;
    //判断将要显示的幻灯片是不是最后一页幻灯片，并相应改变 flag 的值
    if (imageIndex == configData.slides.length - 1) {
        configData.flag = false;
    }else{
        configData.flag = true;
    }
    //切换到要显示的幻灯片，并改变按钮的颜色
    configData.boxMarginTop = -imageIndex * configData.imageHeight;
    $("contentBox").style.marginTop = configData.boxMarginTop + "px";
    changeBtnColor(configData.boxMarginTop);
    //设置超时调用定时器
    configData.timer2 = setTimeout(slide, configData.showTime);
}

//无限循环
function slide() {
    var interval = null;
    if (configData.boxMarginTop == 0) {
        //显示第一页幻灯片时
        configData.flag = true;
    } else if (configData.boxMarginTop == -(configData.slides.length - 1) * configData.imageHeight) {
        //显示最后一页幻灯片时
        configData.flag = false;
    }
    //控制幻灯片每帧运动的距离
    if (configData.flag) {
        configData.boxMarginTop = configData.boxMarginTop - configData.stepLength;
    } else {
        configData.boxMarginTop = configData.boxMarginTop + configData.stepLength * (configData.slides.length - 1);
    }
    //改变幻灯片的位置
    $("contentBox").style.marginTop = configData.boxMarginTop + "px";
    //判断当下是否恰好显示一页完整的幻灯片，如果是的话，调整超时调用定时器要等待的时间，并相应改变按钮的颜色
    if (configData.boxMarginTop == 0 || (configData.flag && configData.boxMarginTop % configData.imageHeight == 0)) {
        interval = configData.showTime;
        changeBtnColor(configData.boxMarginTop);
    } else {
        interval = configData.stepTime;
    }
    //设置超时调用定时器
    configData.timer1=setTimeout(slide, interval);

}
setTimeout(slide, configData.showTime);
