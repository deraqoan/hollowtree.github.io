function g(id) {
    return document.getElementById(id);
}

var aqiData = {};

//检测输入城市名是否合法
g("aqi-city-input").onblur = function () {
    var cityInput = g("aqi-city-input").value.trim();
    if (cityInput == "") {
        g("tip1").innerHTML = "输入不能为空!";
        g("tip1").style.color = "red";
    } else if (/[^a-z\u4E00-\u9FA5]+/gi.test(cityInput)) {
        g("tip1").innerHTML = "输入不合法! 城市名只能包括中文英文";
        g("tip1").style.color = "red";
    } else {
        g("tip1").innerHTML = "OK!";
        g("tip1").style.color = "black";
    }
}
//检测输入的空气质量指数是否合法
g("aqi-value-input").onblur = function () {
    var valueInput = g("aqi-value-input").value.trim();
    if (valueInput == "") {
        g("tip2").innerHTML = "输入不能为空!";
        g("tip2").style.color = "red";
    } else if (/[^0-9]+/gi.test(valueInput)) {
        g("tip2").innerHTML = "输入不合法!质量指数只能为整数";
        g("tip2").style.color = "red";
    } else {
        g("tip2").innerHTML = "OK!";
        g("tip2").style.color = "black";
    }
}
//存储输入的数据
function addAqiData() {
    var cityInput = g("aqi-city-input").value.trim();
    var valueInput = g("aqi-value-input").value.trim();
    if (g("tip1").innerHTML != "OK!" || g("tip2").innerHTML != "OK!") {
        return;
    }
    if (cityInput && valueInput) {
        aqiData[cityInput] = valueInput;
    }
}

//渲染aqi-table表格
function renderAqiList() {
    g("aqi-table").innerHTML = "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";

    for (cityInput in aqiData) {

        var tableTr = document.createElement("tr");
        var tableTd1 = document.createElement("td");
        var tableTd2 = document.createElement("td");
        var tableTd3 = document.createElement("td");

        var tableTd1Text = document.createTextNode(cityInput);
        tableTd1.appendChild(tableTd1Text);

        var tableTd2Text = document.createTextNode(aqiData[cityInput]);
        tableTd2.appendChild(tableTd2Text);

        var tableTd3Btn = document.createElement("button");
        var tableTd3BtnText = document.createTextNode("删除");
        tableTd3Btn.appendChild(tableTd3BtnText);
        tableTd3Btn.setAttribute("data-city", cityInput);
        tableTd3Btn.className = "del-btn";
        tableTd3.appendChild(tableTd3Btn);

        tableTr.appendChild(tableTd1);
        tableTr.appendChild(tableTd2);
        tableTr.appendChild(tableTd3);
        g("aqi-table").appendChild(tableTr);
    }
}
//删除选中的数据
g("aqi-table").onclick = function (event) {
    delete aqiData[event.target.getAttribute("data-city")];
    renderAqiList();
}

g("add-btn").onclick = function () {
    addAqiData();
    renderAqiList();
}