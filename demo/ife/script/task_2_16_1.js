/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var btn = document.getElementById("add-btn");
    var cityName = document.getElementById("aqi-city-input").value;
    var airValue = document.getElementById("aqi-value-input").value;
    aqiData[cityName] = airValue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var myTable = document.getElementById("aqi-table").getElementsByTagName("tbody")[0];
    var dtdThr = document.createElement("td");
    for (cityName in aqiData) {
        var definition = aqiData[cityName];
        var dtr = document.createElement("tr");
        var dtdOne = document.createElement("td");
        var dtdTwo = document.createElement("td");

        var dtdTextOne = document.createTextNode(cityName);
        dtdOne.appendChild(dtdTextOne);
        dtr.appendChild(dtdOne);
        var dtdTextTwo = document.createTextNode(aqiData[cityName]);
        dtdTwo.appendChild(dtdTextTwo);
        dtr.appendChild(dtdTwo);
        dtr.appendChild(dtdThr);
        dtdThr.innerHTML = '<button>删除</button>';
    }
    myTable.appendChild(dtr);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    alert("9");
    renderAqiList();
}


 function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var delBtn = document.getElementById("aqi-table").getElementsByTagName("button");
    for (var i = 0; i < delBtn.length; i++) {
        delBtn[i].onclick = delBtnHandle;
    }
}

init();