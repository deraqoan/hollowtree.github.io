window.onload = function () {
    //获取半透明遮罩
    var backgroundBox = document.getElementById("background-box");
    //获取登录框
    var loginBox = document.getElementById("login-box");
    //获取登陆框上的关闭按钮
    var closeBtn = document.getElementById("close-btn");
    //获取页面可视区域高度
    var bigBoxHeight = window.innerHeight;
    //设置半透明遮罩高度
    backgroundBox.style.height = bigBoxHeight + "px";

    //点击半透明遮罩和关闭按钮时，使半透明遮罩和登陆框不可见
     backgroundBox.onclick = closeBtn.onclick = function () {
         backgroundBox.style.display = "none";
         loginBox.style.display = "none";
     }
    //点击页面标题栏“登录”链接时，使半透明遮罩和登陆框可见
    var signinLink = document.getElementById("signin-link");
    signinLink.onclick = function () {
        backgroundBox.style.display = "block";
        loginBox.style.display = "block";

    }

    
}