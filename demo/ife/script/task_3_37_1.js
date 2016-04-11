window.onload = function () {
    var bigBox = document.getElementById("background-box");
    var backgroundBox = document.getElementById("background-box");
    var bigBoxHeight = window.innerHeight + "px";
    bigBox.style.height = bigBoxHeight;
    var closeBtn = document.getElementById("close-btn");
    closeBtn.onclick = function () {
        backgroundBox.style.display = "none";
    }
    var signinLink = document.getElementById("signin-link");
    signinLink.onclick = function () {
        backgroundBox.style.display = "block";

    }
}