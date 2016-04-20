function g(id) {
    return document.getElementById(id);
}
function checkStr() {
    var str = g("textBox").value;
    var strLength = getStrLength(str);

    if (str == "") {
        g("tip").innerText = "名称不能为空！";
        g("tip").style.color = "#e35d5a";
        g("textBox").style.borderColor = "#e35d5a";
    } else if (/^\d/.test(str)) {
        g("tip").innerText = "名称不能以数字开头！";
        g("tip").style.color = "#e35d5a";
        g("textBox").style.borderColor = "#e35d5a";
    } else if (strLength < 4) {
        g("tip").innerText = "名称长度过短！";
        g("tip").style.color = "#e35d5a";
        g("textBox").style.borderColor = "#e35d5a";
    } else if (strLength > 16) {
        g("tip").innerText = "名称长度过长！";
        g("tip").style.color = "#e35d5a";
        g("textBox").style.borderColor = "#e35d5a";
    } else {
        g("tip").innerText = "名称格式正确";
        g("tip").style.color = "#3fbb9c";
        g("textBox").style.borderColor = "#3fbb9c";
    }
}
function getStrLength(str) {
    var length = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] >= 0 && str[i] <= 128) {
            length += 1;
        } else {
            length += 2;
        }
    }
    return length;
}

g("textBox").onblur = g("checkBtn").onclick = checkStr;
