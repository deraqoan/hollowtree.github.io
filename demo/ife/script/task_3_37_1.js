//      ┌ ┬ ┐
//      ├ ┼ ┤│─
//      └ ┴ ┘ 

// ┌─  loginLink
// ├─  mask
// ├─  loginBox 
//     ├─loginBoxHeader
//       ├─closeBtn

window.onload = function () {
    //获取元素对象
    function g(el) { return document.getElementById(el); }

    //自动居中
    function autoCenter(el) {
        var bodyW = document.documentElement.clientWidth;
        var bodyH = document.documentElement.clientHeight;

        var elW = el.offsetWidth;
        var elH = el.offsetHeight;

        el.style.left = (bodyW - elW) / 2 + "px";
        el.style.top = (bodyH - elH) / 2 + "px";
    }

    var mouseOffsetX = 0;
    var mouseOffsetY = 0;
    var isDraging = false;

    g("mask").style.height = window.innerHeight + "px";

    g("loginBoxHeader").addEventListener('mousedown', function (e) {
        var e = e || window.event;
        mouseOffsetX = e.pageX - g("loginBox").offsetLeft;
        mouseOffsetY = e.pageY - g("loginBox").offsetTop;
        isDraging = true;
    })

    document.onmousemove = function (e) {
        var e = e || window.event;
        var mouseX = e.pageX;
        var mouseY = e.pageY;

        var moveX = 0;
        var moveY = 0;

        if (isDraging === true) {
            moveX = mouseX - mouseOffsetX;
            moveY = mouseY - mouseOffsetY;
            g("loginBox").style.left = moveX + "px";
            g("loginBox").style.top = moveY + "px";
        }
    }

    document.onmouseup = function (e) {
        isDraging = false;
    }

    function fillToBody(el) {
        el.style.width = document.documentElement.clientWidth + 'px';
        el.style.height = document.documentElement.clientHeight + 'px';
    }
    ////获取页面可视区域高度
    //var bigBoxHeight = window.innerHeight;
    ////设置半透明遮罩高度
    //mask.style.height = window.innerHeight + "px";

    //点击半透明遮罩和关闭按钮时，使半透明遮罩和登陆框不可见
    g("mask").onclick = g("closeBtn").onclick = function () {
        mask.style.display = "none";
        loginBox.style.display = "none";
        fillToBody(g("mask"))
     }
    //点击页面标题栏“登录”链接时，使半透明遮罩和登陆框可见
    g("loginLink").onclick = function () {
        mask.style.display = "block";
        loginBox.style.display = "block";

    }

    window.onresize = function () {
        fillToBody(g("mask"))
        
    }
    
}