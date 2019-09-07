/**
 * @module ser
 * @author: yunruowu
 * @description:yunrowu是一个爱吃糖的小孩.
 * @since: 创建时间  2019-09-06 09:51:01
 */

var express = require('express');
var app = express();
var ws = require('ws'); // 加载ws模块;
// var createError = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
app.use(express.static(path.join(__dirname, 'public')));
var crypto = require('crypto');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 't1'
});
connection.connect();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var util = require('util');
app.use(cookieParser())
var session = require('express-session');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

function hash(str) {
  let md5 = crypto.createHash('md5');
  md5.update(str); // update数据
  let result = md5.digest('hex'); // 十六进制输出
  return result;

}
var identityKey = 'skey';
app.use(session({
  secret: 'dev',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000 * 1000
  } //30 天免登陆
}));




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

// connection.end();


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




var ejs = require('ejs');
app.engine('html', ejs.__express)
app.set('view engine', 'html');

app.get('/data', function (req, res) {
  // console.log();
  console.log(fortime(parseInt(data[1].Num_id)));
  console.log(data);
  res.send(data);
})

//主界面
app.get('/', function (req, res) {

  console.log("通过主页登录");
  if (req.session.username) { //判断session 状态，如果有效，则返回主页，否则转到登录页面
    console.log(req.session.usergrade);
    console.log("已经登录了，直接跳转主界面");
    res.render('main');
  } else {
    console.log(req.session.username);
    console.log("未登录，跳转到登录界面");
    res.render('login');
  }
})
//main
app.get('/main', function (req, res) {
  if (req.session.username == undefined) {
    res.render('login');
  }else{
    console.log("从主页跳转get main");
  console.log("ss", __dirname);
  res.render('main');
  }
  
})
//登录
app.get('/login', function (req, res) {
  res.render("login");

})
app.post('/login', urlencodedParser, function (req, res) {
  var username = req.body.username;
  var pwd = req.body.password;

  pwd = hash(pwd);
  console.log("lofgin:", username, pwd);
  var selSql = 'SELECT * FROM usertable WHERE username = ?';
  var sqlselname = username;
  //查
  connection.query(selSql, sqlselname, function (err, result) {
    console.log(result[0].password);
    console.log(result[0]);
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send("查询错误！");
      return;
    } else {
      if (result == []) {
        res.render('login');
      } else {
        if (pwd != result[0].password) {
          console.log(pwd,result[0].password)
          res.send("密码错误！");
        } else {
          req.session.username = username;
          req.session.usergrade = result[0].usergrade;
          res.render('main');
        }
      }
    }
  });
})

//登出
app.post('/logout', function (req, res) {
  req.session.username = null; // 删除session
  console.log("登出");
  res.clearCookie(identityKey);
  res.sendFile(dir + 'login.html')
});

//注册
app.get('/register', urlencodedParser, function (req, res) {
  console.log("sa");
  res.render("register");
})
app.post('/register', urlencodedParser, function (req, res) {
  console.log("用户注册");
  console.log(req.body);
  var username
  username = req.body.username;
  var password = req.body.password;
  var new_pwd = hash(password);

  var addSql = 'INSERT INTO usertable(username,password,usergrade) VALUES(?,?,?)'; 
  var addSqlParams = [username, new_pwd, 10];
  var selSql = 'SELECT * FROM usertable';
  //查
  connection.query(selSql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    } else {
      if (result == [])
      connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
          console.log('[INSERT ERROR] - ', err.message);
          return;
        } else {
          res.render("main");
        }
    
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
      });
      else{
        res.send("用户名已经存在")
      }
    }
  });

})
var num = 0;
if (num == 1)
// 启动websocket服务器
{
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
        wsObj.send(JSON.stringify(sqldata));
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

}


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
// connection.end();