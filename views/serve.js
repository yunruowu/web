var mysql = require('mysql');
var ws = require('ws');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 't1'
});
connection.connect();

var data;
var sqldata;
var sql = "SELECT * FROM State order by Num_id asc";
//查
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }
    data = result;
    sqldata = result;
    // console.log(typeof (result));
    // console.log(result[1].Num_id);
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
    //  var obj = JSON.parse(result);
    //  var obj = result.parseJSON();
    //  console.log(obj[1]);
    var unixTimestamp = new Date(parseInt(result[1].Num_id));
    commonTime = unixTimestamp.toLocaleString();
    console.log(commonTime)
});

console.log(sqldata);
var wsServer = new ws.Server({
    host: " 192.168.43.180",
    port: 8082,
});
console.log('WebSocket sever is listening at port localhost:8181');
wsServer.on("connection", on_server_client_comming);
// 建立连接，监听客户端请求，绑定对应事件;


// }

function on_server_client_comming(wsObj) {
    console.log("request comming");
    websocket_add_listener(wsObj);
}


// 各事件处理逻辑
function websocket_add_listener(wsObj) {
    console.log("jieshou");
    wsObj.on("message", function (data) {
        console.log("request data:" + data);

        wsObj.send(JSON.stringify(sqldata));



    });
    // wsObj.send("sss")
    wsObj.on("close", function () {
        console.log("request close");
    });
    wsObj.on("error", function (err) {
        console.log("request error", err);
    });
}

setInterval(() => {
    // websocket_add_listener(wsObj);

}, 1000);