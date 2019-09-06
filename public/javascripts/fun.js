function show(sdata) {
    var oul = document.getElementById("sname");
    var oli = document.createElement("span");
    oli.innerHTML = "<span id='ss'>" + sdata[1].Ser_id + "</span>";
    oul.appendChild(oli);

    var oul1 = document.getElementById("featurename");
    var oli1 = document.createElement("time");
    oli1.innerHTML = "<span id='ss'>" + sdata[1].Funname + "</span>";
    oul1.appendChild(oli1);

    var oul2 = document.getElementById("time");
    var oli2 = document.createElement("span");
    oli2.innerHTML = "<span id='ss'>" + sdata[1].Num_id + "</span>";
    oul2.appendChild(oli2);

    var oul3 = document.getElementById("val");
    var oli3 = document.createElement("span");
    oli3.innerHTML = "<span id='ss'>" + sdata[1].Val + "</span>";
    oul3.appendChild(oli3);
}

function web() {
    var wsObj = new WebSocket("ws://127.0.0.1:8081");
    if ("WebSocket" in window) {
        //alert("您的浏览器支持 WebSocket!");
    }

    //alert("发送中…");
    // ws.onopen = function () {
    //     ws.send('发送数据');
    //     //alert("发送中…");
    // }
    // ws.onmessage = function (evt) {
    //     var received_msg = evt.data;
    //     //alert("数据已经接受……")
    // }
    // ws.close = function () {
    //     //alert("close……");
    // }
    wsObj.onopen = function () { //发送请求
        //alert("open");
        wsObj.send("Hello WebSocket");

    };
    wsObj.onmessage = function (ev) { //获取后端响应
        //alert(ev.data);
        //alert(typeof (ev.data))
        
        var sdata = JSON.parse(ev.data)
        // console.log(sdata);
        //alert(typeof (sdata))
        //alert(sdata[0].Ser_id);
        //alert(sdata[0]);
        show(sdata);

    };
    wsObj.onclose = function (ev) {
        //alert("close");
    };
    wsObj.onerror = function (ev) {
        //alert("error");
    };
}

$(document).ready(function () {
    $("button").click(function () {
        //alert("ok");
        web();
    })
})