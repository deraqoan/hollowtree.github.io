var keys = document.getElementsByClassName("key"),
    express = document.getElementsByClassName("express")[0],
    result = document.getElementsByClassName("result")[0],
    historyBtn = document.getElementById("historyBtn");
var appData = {
    express: "",
    result: "",
    restart: false,
    history: []
};
if (localStorage.appData) {
    appData = JSON.parse(localStorage.appData);
    console.log(appData);
}
for (var i = 0, temp = keys.length; i < temp; i++) {
    keys[i].addEventListener("click", function() {
        // console.log(this.dataset.key);
        if (appData.restart) {
            appData.express = "";
            appData.result = "";
            appData.restart = false;
        }
        switch (this.dataset.key) {
            case "clear":
                appData.express = "";
                console.log(appData.express);
                break;
            case "backspace":
                appData.express = appData.express.slice(0, -1);
                console.log(appData.express);
                break;
            case "=":
                try {
                    appData.result = eval(appData.express);
                } catch (err) {
                    console.log(err);
                }
                var temp = {
                    express: appData.express,
                    result: appData.result
                }
                appData.history.push(temp);
                console.log(appData.history);
                appData.restart = true;
                // 不能直接存
                localStorage.appData = JSON.stringify(appData);
                console.log(appData.result);
                break;
            default:
                appData.express += this.dataset.key;
                console.log(appData.express);
                break;
        }
        express.innerHTML = appData.express;
        result.innerHTML = appData.result;
    })
}
historyBtn.addEventListener("click", function() {
    var history = document.getElementById("history"),
        html = "";
    if(history.style.display=="none"){
        history.style.display="block";
    }else{
        history.style.display="none";
        return;
    }
    for (var i = 0, temp = appData.history.length; i < temp; i++) {
        html += "<p>" + appData.history[i].express + "</p><p class='historyResult'>" + appData.history[i].result + "</p>"
    }
    history.innerHTML = html;
})