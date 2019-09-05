

function web() {
    var wsObj = new WebSocket("ws://127.0.0.1:8081");
    if ("WebSocket" in window) {
        alert("您的浏览器支持 WebSocket!");
    }

    alert("发送中…");
    // ws.onopen = function () {
    //     ws.send('发送数据');
    //     alert("发送中…");
    // }
    // ws.onmessage = function (evt) {
    //     var received_msg = evt.data;
    //     alert("数据已经接受……")
    // }
    // ws.close = function () {
    //     alert("close……");
    // }
    wsObj.onopen = function () { //发送请求
        alert("open");
        wsObj.send("Hello WebSocket");
      
    };
    wsObj.onmessage = function (ev) { //获取后端响应
        alert(ev.data);

        var oul = document.getElementById("add");
        var oli = document.createElement("div");
        oli.innerHTML = "<div id='ss'>"+ev.data+"</div>";
        oul.appendChild(oli);
    };
    wsObj.onclose = function (ev) {
        alert("close");
    };
    wsObj.onerror = function (ev) {
        alert("error");
    };
}

$(document).ready(function () {
    $("button").click(function () {
        alert("ok");
        web();
    })
})