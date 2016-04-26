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
//Generator函数!!!
//function* sortData(){
//    var myArr=data;
//    var flag=0;
//    for(var j=0;j<myArr.length;j++){
//        var a=0; 
//        for(var i=0;i<myArr.length-flag;i++){
                
//            if(myArr[i]>myArr[i+1]){
//                var temp=myArr[i];
//                myArr[i]=myArr[i+1];
//                myArr[i+1]=temp;
//                //yield语句
//                yield myArr;
//                a++;
//            }
//        }
//        if(a==0)break;
//        flag++;
//    }
//    return "ending";
//}

function* sortData(){
    var myArr=data;
    for(var j=myArr.length-1;j>=0;j--){
        var flag=0;
        for(var i=0;i<j;i++){
            if(myArr[i]>myArr[i+1]){
                var temp=myArr[i];
                myArr[i]=myArr[i+1];
                myArr[i+1]=temp;
                //yield语句
                yield myArr;
                flag = 1;
            }
        }
        if(flag==0) break;
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
g("sortBtn").onclick=function(event){
    var getData=sortData();
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