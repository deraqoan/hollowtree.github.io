//      ┌ ┬ ┐
//      ├ ┼ ┤│─
//      └ ┴ ┘ 

// ┌─  loginLink
// ├─  mask
// ├─  loginBox 
// │   ├─ loginBoxHeader
// │      ├─ closeBtn

//*******************************************************************
//获取元素对象
function g(el) { return document.getElementById(el); }

//*******************************************************************

//函数: 自动居中
function autoCenter(el) {
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var elW = el.offsetWidth;
    var elH = el.offsetHeight;

    el.style.left = (bodyW - elW) / 2 + "px";
    el.style.top = (bodyH - elH) / 2 + "px";
}
//函数: 自动全屏
function fillToBody(el) {
    el.style.width = document.documentElement.clientWidth + 'px';
    el.style.height = document.documentElement.clientHeight + 'px';
}

var mouseOffsetX = 0;
var mouseOffsetY = 0;
var isDraging = false;

g("loginBoxHeader").addEventListener('mousedown', function (e) {
    var e = e || window.event;
    mouseOffsetX = e.pageX - g("loginBox").offsetLeft;
    mouseOffsetY = e.pageY - g("loginBox").offsetTop;
    isDraging = true;
})

document.onmousemove = function (e) {
    var e = e || window.event;
    mouseX = e.pageX;
    mouseY = e.pageY;

    var moveX = 0;
    var moveY = 0;

    if (isDraging === true) {
        moveX = mouseX - mouseOffsetX;
        moveY = mouseY - mouseOffsetY;

        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        var loginBoxWidth = g("loginBox").offsetWidth;
        var loginBoxHeight = g("loginBox").offsetHeight;

        var maxMoveX = pageWidth - loginBoxWidth;
        var maxMoveY = pageHeight - loginBoxHeight;

        //moveX = moveX > 0 ? moveX : 0;
        moveX = Math.min(maxMoveX, Math.max(0, moveX));
        moveY = Math.min(maxMoveY, Math.max(0, moveY));
        g("loginBox").style.left = moveX + "px";
        g("loginBox").style.top = moveY + "px";
    }
}
















//点击半透明遮罩和关闭按钮时，使半透明遮罩和登陆框不可见
g("mask").onclick = g("closeBtn").onclick = function () {
    mask.style.display = "none";
    loginBox.style.display = "none";
 }
//点击页面标题栏“登录”链接时，使半透明遮罩和登陆框可见
g("loginLink").onclick = function () {
    mask.style.display = "block";
    loginBox.style.display = "block";
}


//***********************************************************************************************************************
var mousePanel, mouseCtrl, mouseType;
//var moving = 0, mouseStartX = 0, mouseStartY = 0, mouseX = 0, mouseY = 0;
var moving = 0, mouseStartX = 0, mouseStartY = 0;
function onMouseDown(e, panel, ctrl, type) {
    var e = e || window.event;
    //alert(ctrl.offsetLeft);
    mouseStartX = e.pageX - ctrl.offsetLeft;
    mouseStartY = e.pageY - ctrl.offsetTop;

    mousePanel = panel;
    mouseCtrl = ctrl;
    mouseType = type;

    moving = setInterval(onMove, 10);
}

function onMove() {
    if (moving) {
        var minLeft = mousePanel.offsetLeft;
        var minTop = mousePanel.offsetTop;

        var toX = mouseX - mouseStartX;
        var toY = mouseY - mouseStartY;

        toX = Math.max(toX, 300);
        toY = Math.max(toY, 200);
        //console.log(mouseCtrl.style.left);
        switch (mouseType) {
            case "r":
                mouseCtrl.style.left = toX + "px";
                mousePanel.style.width = toX  + "px";
                break;
            case "b":
                mouseCtrl.style.top = toY + "px";
                mousePanel.style.height = toY + "px";
                break;
            case "rb":
                console.log(mouseCtrl.style.left);
                mouseCtrl.style.left = toX  + "px";
                mouseCtrl.style.top = toY + "px";
                mousePanel.style.width = toX  + "px";
                mousePanel.style.height = toY + "px";
                break;
        }
    }
}



document.onmouseup = function () {
    isDraging = false;

    clearInterval(moving);
    moving = 0;
    var cls = document.getElementsByClassName("resizable-box");
    for (var i = 0; i < cls.length; i++) {
        cls[i].style.left = "";
        cls[i].style.top = "";
    }
}

function resizable(panelId) {
    var panel = g(panelId);
    var rightBox = document.createElement("div");
    var bottomBox = document.createElement("div");
    var rightBottomBox = document.createElement("div");
    rightBox.class = rightBox.className = "resizable-right resizable-box";
    bottomBox.class = bottomBox.className = "resizable-bottom resizable-box";
    rightBottomBox.class = rightBottomBox.className = "resizable-right-bottom resizable-box";

    panel.appendChild(rightBox);
    panel.appendChild(bottomBox);
    panel.appendChild(rightBottomBox);

    rightBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, rightBox, "r");
    })
    bottomBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, bottomBox, "b");
    })
    rightBottomBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, rightBottomBox, "rb");
    })
}

window.onload = window.onresize = function () {
    autoCenter(g("loginBox"));
    fillToBody(g("mask"));
    resizable("loginBox");
}