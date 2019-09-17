var websocketnum = 0;
// 清楚数据
function clearcontent() {
    $(".features").empty();
}
// 实时显示数据
function show(sdata) {
    var num = sdata[1].Ser_id - 1
    // alert(num);
    var oul = document.getElementById("sname" + num);
    var oli = document.createElement("span");
    oli.innerHTML = "<span id='ss'>" + sdata[1].Ser_id + "</span>";
    oul.appendChild(oli);

    var oul1 = document.getElementById("featurename" + num);
    var oli1 = document.createElement("span");
    oli1.innerHTML = "<span id='ss'>" + sdata[1].Funname + "</span>";
    oul1.appendChild(oli1);

    var oul2 = document.getElementById("time" + num);
    var oli2 = document.createElement("span");
    oli2.innerHTML = "<span id='ss'>" + sdata[1].Num_id + "</span>";
    oul2.appendChild(oli2);

    var oul3 = document.getElementById("val" + num);
    var oli3 = document.createElement("span");
    oli3.innerHTML = "<span id='ss'>" + sdata[1].Val + "</span>";
    oul3.appendChild(oli3);
}
// var wsObj = new WebSocket("ws://127.0.0.1:8082");
function web() {
    websocketnum = 1;
    var wsObj = new WebSocket("ws://192.168.43.180:8082");
    if ("WebSocket" in window) {
        // alert("您的浏览器支持 WebSocket!");
    }
    wsObj.onopen = function () { //发送请求
        // alert("open");
        wsObj.send("Hello WebSocket");
    };
    wsObj.onmessage = function (ev) { //获取后端响应
        var sdata = JSON.parse(ev.data)
        clearcontent();
        show(sdata);
    };
    // wsObj.onclose = function (ev) {
    //     //alert("close");
    //     websocketnum = 0
    // };
    wsObj.onerror = function (ev) {
        //alert("error");
    };
}

$(document).ready(function () {
    $("#show_data").click(function () {
        // $.post('/websocket', function (data, status) {
        //     console.log("web");
        // })
        if (websocketnum == 0) {
            // web();
            setInterval(() => {
                web();
            }, 5000);
        }
    })
    $("#deluser").click(function () {
        $.post('/deluser', function (data, status) {
            console.log("sss");
            // alert(data);

        })
    })
    $("#update").click(function () {
        $.post('/update', function (data, status) {
            console.log("sss");
            // alert(data);

        })
    })
    $("#xin").click(function () {
        $.post('/xin', function (data, status) {
            console.log("sss");
            // alert(data);

        })
    })
    
    // $("#check").click(function(){
    //     $.post(
    //         '/check',
    //         function (data, status) {

    //             alert(data)

    //         }
    //     )
    // })
})