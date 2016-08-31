"use strict"

function calendar(el) {
    //calendarNode
    var cal = document.getElementById(el);

    //创建下拉列表并将初始值设为当前日期
    function selectBox() {
        var calDate = document.createElement("P");
        calDate.className = "cal-date";
        cal.appendChild(calDate);
        var calSelect = document.createElement("p");
        calSelect.className = "cal-select";
        cal.appendChild(calSelect);
        var disYear = document.createElement("select");
        disYear.className = "cal-year";
        calSelect.appendChild(disYear);
        var disMonth = document.createElement("select");
        disMonth.className = "cal-month";
        calSelect.appendChild(disMonth);
        var calMain = document.createElement("table");
        calMain.className = "cal-main";
        cal.appendChild(calMain);
        for (var i = 1981; i <= 2030; i++) {
            var optionYear = document.createElement("option");
            optionYear.value = String(i);
            var optionYearText = document.createTextNode(String(i) + "年");
            optionYear.appendChild(optionYearText);
            disYear.appendChild(optionYear);
        }
        for (var j = 0; j < 12; j++) {
            var optionMonth = document.createElement("option");
            optionMonth.value = String(j);
            var optionMonthText = document.createTextNode(String(j + 1) + "月");
            optionMonth.appendChild(optionMonthText);
            disMonth.appendChild(optionMonth);
        }
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;
        currentMonth = (currentMonth < 10) ? ("0" + currentMonth) : currentMonth;
        disYear.value = currentYear;
        disMonth.value = currentDate.getMonth();
        cal.getElementsByClassName("cal-date")[0].value = currentYear + "年" + currentMonth + "月";
    }

    //创建日历主体
    function buildTable() {
        var calMain = cal.getElementsByClassName("cal-main")[0];
        var tableHead = document.createElement("thead");
        tableHead.className = "my-table-head";
        var week = ["日", "一", "二", "三", "四", "五", "六"];
        var tableTr = document.createElement("tr");

        for (var i = 0; i < 7; i++) {
            var tableTh = document.createElement("th");
            var tableThText = document.createTextNode(week[i]);
            tableTh.appendChild(tableThText);
            tableTr.appendChild(tableTh);
        }
        tableHead.appendChild(tableTr);
        calMain.appendChild(tableHead);

        var tableBody = document.createElement("tbody");
        tableBody.className = "my-table-body";
        for (var j = 0; j < 6; j++) {
            var tableTr = document.createElement("tr");
            for (var k = 0; k < 7; k++) {
                var tableTd = document.createElement("td");
                tableTr.appendChild(tableTd);
            }
            tableBody.appendChild(tableTr);
        }
        calMain.appendChild(tableBody);
    }

    //确定某个月的第一天是星期几
    function getWeek() {
        var yearMonth = new Date();
        var disYear = cal.getElementsByClassName("cal-year")[0].value;
        var disMonth = cal.getElementsByClassName("cal-month")[0].value;
        yearMonth.setFullYear(disYear, disMonth, 1);
        var selectDay = yearMonth.getDay();
        return selectDay;
    }

    //确定一个月有多少天
    function getdate() {
        var disYear = parseInt(cal.getElementsByClassName("cal-Year")[0].value);
        var naturalMonth = parseInt(cal.getElementsByClassName("cal-Month")[0].value) + 1;
        if (naturalMonth == 1 || naturalMonth == 3 || naturalMonth == 5 || naturalMonth == 7 || naturalMonth == 8 || naturalMonth == 10 || naturalMonth == 12) {
            return 31;
        } else if (naturalMonth == 4 || naturalMonth == 6 || naturalMonth == 9 || naturalMonth == 11) {
            return 30;
        } else if ((disYear % 100 != 0 && disYear % 4 == 0) || disYear % 400 == 0) {
            return 29;
        } else {
            return 28;
        }
    }

    //给日历内写入日期
    function buildDate() {
        var weekday = getWeek();
        var date = 1;
        var tableTds = cal.getElementsByTagName("td");
        var dateNum = getdate();
        //清空日历
        for (var i = 0; i < tableTds.length; i++) {
            if (tableTds[i].firstChild) {
                tableTds[i].removeChild(tableTds[i].firstChild);
            }
        }
        //重写日历
        for (var m = 0; m < dateNum; m++) {
            var tableTdText = document.createTextNode(date);
            tableTds[weekday].appendChild(tableTdText);
            weekday++;
            date++;
        }
    }

    //选取下拉列表时刷新日历主体与页面头部 "xxxx年xx月xx日" 字样
    function refreshTable() {
        cal.getElementsByClassName("cal-select")[0].onclick = function() {
            buildDate();
            var disYear = cal.getElementsByClassName("cal-year")[0].value;
            var disMonth = parseInt(cal.getElementsByClassName("cal-month")[0].value) + 1;
            disMonth = disMonth < 10 ? "0" + disMonth : disMonth;
            cal.getElementsByClassName("cal-date")[0].innerHTML = disYear + "年" + disMonth + "月";
        }
    }

    //点击日历主体选取日期时刷新页面头部 "xxxx年xx月xx日" 字样
    function showDate() {
        cal.getElementsByClassName("my-table-body")[0].onclick = function(event) {
            var disYear = parseInt(cal.getElementsByClassName("cal-year")[0].value);
            var disMonth = parseInt(cal.getElementsByClassName("cal-month")[0].value) + 1;
            disMonth = disMonth < 10 ? "0" + disMonth : disMonth;
            if (event.target.firstChild) {
                var disDate = event.target.firstChild.nodeValue;
                disDate = disDate < 10 ? "0" + disDate : disDate;
                cal.getElementsByClassName("cal-date")[0].innerHTML = disYear + "年" + disMonth + "月" + disDate + "日";
            }
        }
    }
    selectBox();
    buildTable();
    buildDate();
    refreshTable();
    showDate();
}