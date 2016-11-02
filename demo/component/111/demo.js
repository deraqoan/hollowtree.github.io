//数据
var data = {
    //点击滚动条时鼠标在页面中的y坐标
    yStart: null,
    //拖动滚动条时鼠标在页面中的y坐标
    yMove: null,
    //是否正在拖动滚动条
    isDraging: false,
    //滚动条滚动的距离
    scrollBarTop: null,
    //滚动条所能拖动的最大距离
    maxScrollBarTop: null,
    //content(对话内容)的margin-top值(初始为0)
    contentMarginTop: 0,
    //talkShow(展示框的高度)的高度
    talkShowHeight: 500,
    //滚轮每滚一下对话内容所滚动的距离
    step:40
}

//设置滚动条长度，并获取滚动条所能拖动的最大距离
function setScrollbarHeight() {
    $("scrollBar").style.height = Math.floor(data.talkShowHeight * data.talkShowHeight / $("content").offsetHeight) + "px";
    data.maxScrollBarTop = data.talkShowHeight - parseInt($("scrollBar").style.height);
}

//按下鼠标
$("scrollBar").onmousedown = function (e) {
    data.yStart = e.pageY;
    data.isDraging = true;
    data.scrollBarTop = parseInt($("scrollBar").style.top) || 0;
}

//移动鼠标
$("talkShow").onmousemove = function (e) {
    if (data.isDraging) {
        data.yMove = e.pageY;
        $("scrollBar").style.top = Math.min(data.maxScrollBarTop, Math.max(0, data.scrollBarTop + data.yMove - data.yStart)) + "px";
        $("content").style.marginTop = -parseInt($("scrollBar").style.top) / data.talkShowHeight * $("content").offsetHeight + "px";
    }
}

//释放鼠标
$("talkShow").onmouseup = function (e) {
    data.isDraging = false;
    data.contentMarginTop = parseFloat($("content").style.marginTop);
}

//滚动鼠标滚轮时使对话内容上下滚动
function scroll(e) {
    e.preventDefault();
    e = EventUtil.getEvent(e);
    var delta = EventUtil.getWheelDelta(e);
    console.log(delta);
    if (delta < 0) {
        //滚轮往下翻页面
        $("content").style.marginTop = Math.max(data.talkShowHeight - $("content").offsetHeight, data.contentMarginTop - data.step) + "px";
        data.contentMarginTop = parseFloat($("content").style.marginTop);
        $("scrollBar").style.top = -data.contentMarginTop / $("content").offsetHeight * data.talkShowHeight + "px";
    } else {
        //滚轮往上翻页面
        $("content").style.marginTop = Math.min(0, data.contentMarginTop + data.step) + "px";
        data.contentMarginTop = parseFloat($("content").style.marginTop);
        $("scrollBar").style.top = -data.contentMarginTop / $("content").offsetHeight * data.talkShowHeight + "px";
    }
    EventUtil.preventDefault(document.body);
}
EventUtil.addHandler($("talkShow"), "mousewheel", scroll);
EventUtil.addHandler($("talkShow"), "DOMMouseScroll", scroll);

window.onload = function () {
    setScrollbarHeight();
}