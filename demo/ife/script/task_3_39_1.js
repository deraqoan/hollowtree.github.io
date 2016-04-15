var tableHeaderData = ["姓名", "语文", "数学", "英语","总分"];
var tableData = new Array();

//获取要生成的表格行数
var num;
    var getNumBtn = document.getElementById("getNumBtn");
    var textBox = document.getElementById("studentNum");
    getNumBtn.onclick = function () {
        num = parseInt(textBox.value);
        num = num > 0 ? num : 10;
        buildData(num);
        getTotal(tableData);
        buildTable(tableData);
    }

//生成单科成绩
//var tableData = [
//    ["小明", 80, 90, 70],
//    ["小红", 90, 60, 90],
//    ["小亮", 60, 100, 70],
//]
function buildData(num) {
    tableData = new Array()
    if (num == undefined) {
        num = 10;
    } else if (num > 10000) {
        num = 10000;
    }
    var name = ["小明", "小红", "小亮", "小明", "小刚", "小绿", "小紫", "小伟", "小虎", "豆豆"]
    for (var i = 0; i < num; i++) {
        tableData[i] = new Array();
        tableData[i][0] = name[Math.floor(Math.random() * 10)];
        for (var j = 1; j < 4; j++) {
            tableData[i][j] = Math.floor(Math.random() * 101);
        }
    }
}

//生成表格主体
function buildTable(tableData) {
    var tableBody = document.getElementById("myTable");
    var tableBodyChilds = tableBody.childNodes;
    for (var a = tableBodyChilds.length - 1; a > 1; a--) {
        tableBody.removeChild(tableBodyChilds[a]);
    }
    var tableTr = new Array();
    var tableTd = new Array();
    for (var i = 0; i < tableData.length; i++) {
        tableTr[i] = document.createElement("tr");
        tableTd[i] = new Array();
        for (var j = 0; j < tableData[i].length; j++) {
            tableTd[i][j] = document.createElement("td");
            tableTd[i][j].appendChild(document.createTextNode(tableData[i][j]));
            tableTr[i].appendChild(tableTd[i][j]);
        }
        tableBody.appendChild(tableTr[i]);
    }
}

//生成表头
function buildTableHeader(tableHeaderData) {
    var tableBody = document.getElementById("myTable");
    var tableTr = document.createElement("tr");
    var tableTh = new Array();

    for (var i = 0; i < tableHeaderData.length; i++) {
        tableTh[i] = document.createElement("th");
        tableTh[i].appendChild(document.createTextNode(tableHeaderData[i]));
        tableTr.appendChild(tableTh[i]);
    }
    tableTr.id = "myTableHeader";
    tableBody.appendChild(tableTr);
}

//冻结首行
function tableHeaderStyle() {
    var myTable = document.getElementById("myTable");
    var tableHeader = document.getElementById("myTableHeader");

    var myTableH = myTable.offsetHeight;
    var tableHeaderH = tableHeader.offsetHeight

    //表格上边框与浏览器可见区域上边框的距离
    var tableToY = myTable.offsetTop - document.body.scrollTop;
    if (tableToY > tableHeaderH || document.body.scrollTop > (myTable.offsetTop + myTableH)) {
         tableHeader.style.marginTop = -tableHeaderH + 1 + "px";

     } else if (tableToY <= tableHeaderH) {
         tableHeader.style.marginTop = -tableToY + "px";
     }
}
//求总分
function getTotal(tableData) {
    for (var i = 0; i < tableData.length; i++) {
        var temp = 0;
        for (var j = 1; j < tableData[i].length; j++) {
            temp += tableData[i][j];
        }
        var flag = tableData[i].length;
        tableData[i][flag] = temp;
    }
    return tableData;
}


window.onscroll = function () {
    tableHeaderStyle();
}

window.onload = function () {
    buildTableHeader(tableHeaderData);
    buildData();
    getTotal(tableData);
    buildTable(tableData);
}
