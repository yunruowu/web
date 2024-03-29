/**
 * @module ser
 * @author: yunruowu
 * @description:yunrowu是一个爱吃糖的小孩.
 * @since: 创建时间  2019-09-06 09:51:01
 */


var app = express();
var ws = require('ws'); // 加载ws模块;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
app.use(express.static(path.join(__dirname, 'public')));
var crypto = require('crypto');
var mysql = require('mysql');
var session = require('express-session');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 't1'
});
connection.connect();


var conntoDB = mysql.createConnection({
  host: '192.168.43.212',
  user: 'root',
  password: '123456',
  database: 'shebang'
});
conntoDB.connect();

app.use(cookieParser())

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






conntoDB.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});




//查询结果
var data;
var sqldata;
var sql = 'SELECT * FROM State';
//查
conntoDB.query(sql, function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }
  data = result;
  sqldata = result;

  console.log('--------------------------SELECT----------------------------');
  console.log(result);
  console.log('------------------------------------------------------------\n\n');
  var unixTimestamp = new Date(parseInt(result[0].Num_id));
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
  console.log("hjcccccccccccccc", req.session)
  if (req.session.username == undefined) {
    res.render('login');
  } else {
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
    // console.log(result[0].password);
    console.log(result);
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send("查询错误！");
      return;
    } else {
      var obj = result;
      var objStr = JSON.stringify(obj);
      if (result == false) {
        res.render('register');
      } else {
        if (pwd != result[0].password) {
          // console.log(pwd, result[0].password)
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



app.post('/sss', urlencodedParser, function (req, res) {
  if (req.session.username == undefined) {
    res.render('login');
  }


  console.log(req.session.usergrade)
  res.sendFile(__dirname + "/" + "views/one.html");
})
app.post('/eee', urlencodedParser, function (req, res) {
  if (req.session.username == undefined) {
    res.render('login');
  }
  console.log(req.session.usergrade)
  if (req.session.usergrade > 1) {
    res.send("权限不够")
  }
  res.sendFile(__dirname + "/" + "views/two.html");
})


app.get('/one', urlencodedParser, function (req, res) {
  console.log("more");
  console.log(req.session);
  // res.send("122");
  // res.sendFile(__dirname+'/'+'views/more1.html');
  res.render("one");
})
//登出
app.post('/logout', function (req, res) {
  req.session.username = null; // 删除session
  console.log("登出");
  res.clearCookie(identityKey);
  res.render("login");
});

//注册
app.get('/register', urlencodedParser, function (req, res) {
  console.log("sa");
  res.render("register");
})

//注销
app.post('/deluser', urlencodedParser, function (req, res) {
  console.log("zhux");
  username = req.session.username;
  console.log(req.session);
  console.log(req.session.username);
  var delSql = 'DELETE FROM usertable WHERE username =?';
  var sqlselname = username;
  connection.query(delSql, sqlselname, function (err, result) {
    if (err) {
      console.log("删除失败！");
      console.log('[SELECT ERROR] - ', err.message);
      return;
    } else {
      res.render("login");
    }
  })
  // res.render("register");
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
  var selSql = 'SELECT * FROM usertable WHERE username = ?';
  var sqlselname = username;
  //查
  connection.query(selSql, sqlselname, function (err, result) {
    console.log("resul", result);
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    } else {
      if (result == false)
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
      else {
        res.send("用户名已经存在")
      }
    }
  });

})

app.post('/websocket', urlencodedParser, function (req, res) {
  console.log("连接websocket");
  con_websocket();
})
app.get('/update', urlencodedParser, function (req, res) {
  console.log("update")
  console.log(req.session)
  console.log(req.session.username);
  // res.render('login')
  res.render("update");
})
app.post('/update', urlencodedParser, function (req, res) {
  var udSql = "UPDATE usertable SET password = ? where username = ?";
  var pw = req.body.password;
  var newpw = hash(req.body.newpassword);
  var un = req.body.username;
  var selSql = 'SELECT * FROM usertable WHERE username = ?';
  var sqlselname = un;
  console.log(un)
  var sqlselname = [newpw, un];

  connection.query(selSql, un, function (err, result) {
    console.log(result)
    if (err) {
      console.log("删除失败！");
      console.log('[SELECT ERROR] - ', err.message);
      return;
    } else {
      if (result[0].password != hash(pw)) {
        res.send("密码错误@")
      } else {
        connection.query(udSql, sqlselname, function (err, result) {
          if (err) {
            console.log("xiuai失败！");
            // console.log('[SELECT ERROR] - ', err.message);
            res.send("修改错误")
            return;
          } else {
            res.render("login");
          }
        })
      }
    }
  })
})
app.post('/xin', urlencodedParser, function (req, res) {
  console.log("sds", __dirname);
  console.log(req.session.username);
  res.render("one")
  // res.sendFile(__dirname+'/views/'+"one.html")
  // res.send("login");
})
app.post('/one', urlencodedParser, function (req, res) {
  console.log("two");
  console.log(req.session.username);
  // res.send("122");
  // res.sendFile(__dirname+'/'+'views/more1.html');
  // res.redirect(301, 'http://www.baidu.com');
  res.render("one");
})
app.get('/one', urlencodedParser, function (req, res) {
  // if(req.session)?
  console.log(res.session);
  res.render("one");
})
app.get('/two', urlencodedParser, function (req, res) {
  res.render("two");
})



var wsServer = new ws.Server({
  host: "192.168.43.180",
  port: 8082,
});
console.log('WebSocket sever is listening at port localhost:8181');
wsServer.on("connection", on_server_client_comming);

function on_server_client_comming(wsObj) {
  console.log("request comming");
  websocket_add_listener(wsObj);
}


// 各事件处理逻辑
function websocket_add_listener(wsObj) {
  console.log("jieshou");

  wsObj.on("message", function (data) {
    if (data == 'chart') {
      sendtoc();
    }
    if (data == 'one') {
      sendtoc(1);
      console.log("woshicuowu")
      wsObj.send(JSON.stringify(sqldata));
    }
    if (data == "two") {
      sendtoc(2);
      wsObj.send(JSON.stringify(sqldata));
    } else {
      wsObj.send(JSON.stringify(sqldata));
    }

    console.log("request data:" + data);



  });
  // wsObj.send("sss")
  wsObj.on("close", function () {
    console.log("request close");
  });
  wsObj.on("error", function (err) {
    console.log("request error", err);
  });
}


function chart(num) {
  // var sqldata;
  var sql = "SELECT * FROM State where Ser_id = ? order by Num_id desc limit 2 ";
  //查

  conntoDB.query(sql, num, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    data = result;
    sqldata = result;
  });
}

function getRandomNum(min, max) {
  var range = max - min;
  var rand = Math.random();
  return parseInt(min + Math.round(rand * range));
}

function sendtoc(num) {

  console.log("sss");
  var nowDate = new Date().getTime();
  chart(num);
  console.log("发送")

  function websocket_add_listener(wsObj) {
    console.log("sdss", sqldata)
    wsObj.send(JSON.stringify(sqldata));
  }

}



var server = app.listen(8081, "192.168.43.180");
