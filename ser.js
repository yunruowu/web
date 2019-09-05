var express = require('express');
var app = express();
var ws = require('ws'); // 加载ws模块;

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 't1'
});



// function writeCurrentDate() {
//   var now = new Date();
//   var year = now.getFullYear(); //得到年份
//   var month = now.getMonth();//得到月份
//   var date = now.getDate();//得到日期
//   var day = now.getDay();//得到周几
//   var hour = now.getHours();//得到小时
//   var minu = now.getMinutes();//得到分钟
//   var sec = now.getSeconds();//得到秒
// 　　     var MS = now.getMilliseconds();//获取毫秒
//   var week;
//   month = month + 1;
//   if (month < 10) month = "0" + month;
//   if (date < 10) date = "0" + date;
//   if (hour < 10) hour = "0" + hour;
//   if (minu < 10) minu = "0" + minu;
//   if (sec < 10) sec = "0" + sec;
//   if (MS < 100) MS = "0" + MS;
//   var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
//   week = arr_week[day];
//   var time = "";
//   time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;
//   // //当前日期赋值给当前日期输入框中（jQuery easyUI）
//   // $("#currentDate").html(time);
//   // //设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
//   // var timer = setTimeout("writeCurrentDate()", 1000);
//   return time;
// }

connection.connect();





connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


// var nowDate = new Date().getTime();
// var addSql = 'INSERT INTO State(Num_id, Ser_id,Funname,Val) VALUES(?,?,?,?)';
// var addSqlParams = [nowDate, '3', 'cpu', '0.1', ];
// //增
// connection.query(addSql, addSqlParams, function (err, result) {
//   if (err) {
//     console.log('[INSERT ERROR] - ', err.message);
//     return;
//   }

//   console.log('--------------------------INSERT----------------------------');
//   //console.log('INSERT ID:',result.insertId);        
//   console.log('INSERT ID:', result);
//   console.log('-----------------------------------------------------------------\n\n');
// });

//查询结果
var data;
var sqldata;
var sql = 'SELECT * FROM State';
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

connection.end();


//如果小于10 则返回'0'+m
function add(m) {
  return m < 10 ? '0' + m : m
}
//将时间戳转为普通格式
function fortime(shijianchuo) {
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add(m) + '-' + add(d) + ' ' + add(h) + ':' + add(mm) + ':' + add(s);
}
//返回需要的时间
function nb(n) {
  var timer = new Date();
  var sc_now = timer.getTime(); //现在时间戳
  var timer1 = new Date(1800000 * n) //半小时时间戳   用现在的时间戳减去半个小时前的时间戳得到了半个小时时间戳
  var sc_now1 = timer1.getTime();
  return sc_now - sc_now1 //半小时前的时间戳
}
console.log(fortime(nb(0))) //现在的时间
console.log(fortime(nb(1))) //半小时前
console.log(fortime(nb(2))) //一小时前
console.log(fortime(nb(3))) //一个半小时前







app.get('/data', function (req, res) {
  // console.log();
  console.log(fortime(parseInt(data[1].Num_id)));
  console.log(data);
  res.send(data);
})
app.get('/', function (req, res) {
  console.log("get");
  res.send("sss");
})



// 启动websocket服务器
var wsServer = new ws.Server({
  host: "127.0.0.1",
  port: 8081,
});
console.log('WebSocket sever is listening at port localhost:8181');

// 建立连接，监听客户端请求，绑定对应事件;
function on_server_client_comming(wsObj) {
  console.log("request comming");
  websocket_add_listener(wsObj);
}
wsServer.on("connection", on_server_client_comming);

// 各事件处理逻辑
function websocket_add_listener(wsObj) {
  console.log("jieshou")
  wsObj.on("message", function (data) {
    console.log("request data:" + data);

    setTimeout(() => { //收到请求，回复
      wsObj.send(JSON.stringifyz(sqldata));
      wsObj.send("1秒延时，收到了，正在处理");
    }, 1000);
    /*****
     * 处理业务逻辑
     */
    setTimeout(() => { //完成请求，回复
      wsObj.send("3秒延时，返回数据，关闭连接");
      wsObj.close()
    }, 3000);

  });

  wsObj.on("close", function () {
    console.log("request close");
  });

  wsObj.on("error", function (err) {
    console.log("request error", err);
  });
}
















var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})