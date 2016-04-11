window.onload = function () {
    var backgroundBox = document.getElementById("background-box");
    var bigBoxHeight = window.innerHeight + "px";
    backgroundBox.style.height = bigBoxHeight;
    var closeBtn = document.getElementById("close-btn");
    closeBtn.onclick = function () {
        backgroundBox.style.display = "none";
    }
    var signinLink = document.getElementById("signin-link");
    signinLink.onclick = function () {
        backgroundBox.style.display = "block";

    }
}