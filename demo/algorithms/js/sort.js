function g(id){
    return document.getElementById(id);
}
var data=new Array();

function buildData() {
    data=[];
    for (var i = 0; i < 50; i++) {
        data[i] = Math.floor(Math.random() * 91 + 10);
    }
}

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

//冒泡排序
function* bubbleSort(){
    var myArr=data;
    for(var j=myArr.length-1;j>=0;j--){
        var flag=0;
        for(var i=0;i<j;i++){
            if(myArr[i]>myArr[i+1]){
                swap(myArr,i,i+1);
                //yield语句
                yield myArr;
                flag = 1;
            }
        }
        if(flag==0) break;
    }
    return "ending";
}

//选择排序
function* selectionSort() {
    var arr=data;
    var min, temp;
    for (var outer = 0; outer <= arr.length - 2; ++outer) {
        min = outer;
        for (var inner = outer + 1; inner <= arr.length - 1; ++inner) {
            if (arr[inner] < arr[min]) {
                min = inner;
            }
        }
        swap(arr, outer, min);
        yield arr;
    }
    return "ending";
}

//插入排序
function* insertionSort(){
    var arr=data;
    for(var i=1;i<arr.length;i++){
        for(var j=i;j>0 && arr[j-1]>arr[j];j--){
            swap(arr,j-1,j);
            yield arr;
            console.log(arr);
        }
    }
    return "ending";
}

//可视化数据
function showData(arr){
    var showBox = document.getElementById("showBox");
    showBox.innerHTML = "";
    for(var i=0;i<arr.length;i++){
        var smallBox = document.createElement("div");
        smallBox.className = "small-box";
        smallBox.style.height = arr[i]*3 + 'px';
        smallBox.style.backgroundColor="hsl("+Math.floor(arr[i]*2.54)+",70%,80%)";
        smallBox.innerText=arr[i];
        showBox.appendChild(smallBox);
    }
}

//排序可视化
g("btns").onclick=function(event){
    var sort=event.target.className;
    switch(sort){
        case "bubbleSort":
            var getData = bubbleSort();
            break;
        case "selectionSort":
            var getData = selectionSort();
            break;
        case "insertionSort":
            var getData = insertionSort();
            break;
    }
    timeH = setInterval(function(){
        //getData.next()每调用一次, 其值都会改变, 故设一个临时变量存储其值
        var temp = getData.next().value;
        if(temp!=undefined && temp!="ending"){
            showData(temp);
        }else if(temp=="ending"){
            clearInterval("timeH");
        }
    },50);

}

//验证输入的文本
g("numInput").onblur=function(){
    var inputValue = g("numInput").value;
    if(/^\d{1,}$/g.test(inputValue)){
        if(parseInt(inputValue) < 10){
            g("tips").innerHTML="输入的数字过小!";
            g("tips").className="warn";
        }else if(parseInt(inputValue) > 100){
            g("tips").innerHTML="输入的数字过大!";
            g("tips").className="warn";
        }else{
            g("tips").innerHTML="( •̀ .̫ •́ )✧"
            g("tips").className="normal";
        }
    }else{
        g("tips").innerHTML="请输入整数!"
        g("tips").className="warn";
    }
}
//从左侧添加数据
g("leftIn").onclick=function(){
    var inputValue = g("numInput").value;
    if(/^\d{1,}$/g.test(inputValue) && parseInt(inputValue)>=10 && parseInt(inputValue)<=100){
        var num = parseInt(inputValue);
        data.unshift(num)
        showData(data);
    }
}
//从右侧添加数据
g("rightIn").onclick=function(){
    var inputValue = g("numInput").value;
    if(/^\d{1,}$/g.test(inputValue) && parseInt(inputValue)>=10 && parseInt(inputValue)<=100){
        var num = parseInt(inputValue);
        data.push(num)
        showData(data);
    }
}
//从左侧移除数据
g("leftOut").onclick=function(){
    data.shift();
    showData(data);
}
//从右侧移除数据
g("rigtOut").onclick=function(){
    data.pop();
    showData(data);
}
//生成数据数组
g("randomArr").onclick=function(){
    buildData();
    showData(data);
}

window.onload = function(){
    buildData();
    showData(data);
}