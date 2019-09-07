
//存储蛇的位置
var snake = [];
var map = [];
var usernum;
var username = [];
var startready = 0; //控制准备按钮
// 判断输入密码是否一致
$(document).ready(function () {
    $("#repeat_password").mouseleave(function () {
        if (($("#repeat_password").val() != $("#password").val()) &&
            $("#repeat_password").val() != '') {
            var oUl = document.getElementById("add");
            var oLi = document.createElement('div');
            oLi.innerHTML = "<div id  = 'error'>两次密码不一致！</div>";
            $("#repeat_password").val('');
            oUl.appendChild(oLi);
            $("#error").css("color", "red");
        }
    });
    $("#repeat_password").mouseenter(function () {
        $("#error").remove();
    });

    $("#username").mouseleave(function () {
        username = $("#username").val();
        $.post(
            '/getusername', {

                username1: $("#username").val(),

            },
            function (data, status) {
                if (data == "err" && $("#username").val() != '') {
                    var addH = "<div id  = 'usererr'>用户名已存在！</div>";
                    $("#userdiv").append(addH);
                    $("#usererr").css("color", "red");
                }
            },
        )
    })
    //删除姓名
    $("#username").mouseenter(function () {
        $("#usererr").remove();
    });
    //键盘事件
    $("body").keyup(function (event) {
        $.post(
            '/Keys', {
                keynum: event.which
            },
            function (data, status) {
                map = data[0].map;
                username = data[0].name;
                users = data[0].users;
                score = data[0].score;
                win = data[0].win;
                if (win != undefined) {
                    alert(win);
                }
                for (var i = 0; i < users.length; i++) {
                    if (users[i] == username) {
                        usernum = i;
                    }
                }
                $("#out1").empty();
                $("#out2").empty();
                $("#out1").append(score[0] + "分");
                $("#out2").append(score[1] + "分");
            }
        );
    });
    //按钮事件控制移动
    $("#left").click(function () {
        $.post(
            '/Keys', {
                keynum: 65
            },
            function (data, status) {
                map = data[0].map;
                username = data[0].name;
                users = data[0].users;
                score = data[0].score;
                win = data[0].win;
                if (win != undefined) {
                    alert(win);
                }
                for (var i = 0; i < users.length; i++) {
                    if (users[i] == username) {
                        usernum = i;
                    }
                }
                $("#out1").empty();
                $("#out2").empty();
                $("#out1").append(score[0] + "分");
                $("#out2").append(score[1] + "分");
            }
        );
    });
    $("#down").click(function () {
        $.post(
            '/Keys', {
                keynum: 83
            },
            function (data, status) {
                map = data[0].map;
                username = data[0].name;
                users = data[0].users;
                score = data[0].score;
                win = data[0].win;
                if (win != undefined) {
                    alert(win);
                }
                for (var i = 0; i < users.length; i++) {
                    if (users[i] == username) {
                        usernum = i;
                    }
                }
                $("#out1").empty();
                $("#out2").empty();
                $("#out1").append(score[0] + "分");
                $("#out2").append(score[1] + "分");

            }
        );
    });
    $("#up").click(function () {
        $.post(
            '/Keys', {
                keynum: 87
            },
            function (data, status) {
                map = data[0].map;
                username = data[0].name;
                users = data[0].users;
                score = data[0].score;
                // console.log(score);
                win = data[0].win;
                if (win != undefined) {
                    alert(win);
                }
                for (var i = 0; i < users.length; i++) {
                    if (users[i] == username) {
                        usernum = i;
                    }
                }
                $("#out1").empty();
                $("#out2").empty();
                $("#out1").append(score[0] + "分");
                $("#out2").append(score[1] + "分");
            }
        );
    });
    $("#right").click(function () {
        $.post(
            '/Keys', {
                keynum: 68
            },
            function (data, status) {
                map = data[0].map;
                username = data[0].name;
                users = data[0].users;
                score = data[0].score;
                // console.log(score);
                win = data[0].win;
                if (win != undefined) {
                    alert(win);
                }
                for (var i = 0; i < users.length; i++) {
                    if (users[i] == username) {
                        usernum = i;
                    }
                }
                $("#out1").empty();
                $("#out2").empty();
                $("#out1").append(score[0] + "分");
                $("#out2").append(score[1] + "分");
            }
        );
    });
    //响应准备
    $("#ready").click(function add() {

        if (startready == 0) {
            startready = 1;
            startplay();
            $.post(
                '/Ready',
                function (data, status) {
                    var user = data[0].user;
                    var username = data[0].username;
                    var usernum;
                }
            );

        }
    });
    //暂停
    $("#stop").click(function () {
        $.post(
            '/stopgame',
            function (data, status) {
                console.log("stop");
            }
        )
    })
    //开始
    $("#start").click(function () {
        $.post(
            '/startgame',
            function (data, status) {
                console.log("start");
            }
        )
    })
    //重新开始
    $("#restart").click(function () {
        $.post(
            '/restart',
            function (data, status) {
                alert("wwww")
                if (ready == 1) {
                    console.log("restart");    
                    startplay();
                }
            }
        )
    })
    //查询
    $("#check").click(function(){
        $.post(
            '/check',
            function (data, status) {
                
                alert(data)
                
            }
        )
    })
});
var sname = 0;
//获取当前游戏数据，轮询
function move() {
    $.post(
        '/data',
        function (data, status) {
            map = data[0].map;
            win = data[0].win;
            head = data[0].head;
            time = data[0].time;
            showh = time[0];
            showm = time[1];
            shows = time[2];
            user = data[0].users;
            username = data[0].name;
            if (sname == 0) {
                sname = 1;
                for (var i = 0; i < user.length; i++) {
                    if (user[i] == username) {
                        usernum = i ;
                    }
                }
                if (usernum == 1) {
                    var addH1 = " <span>" + username + "</span>";
                    $("#play1").append(addH1);
                    var addH2 = " <span>" + user[0] + "</span>";
                    $("#play2").append(addH2);
                }
                if (usernum == 0) {
                    var addH1 = " <span>" + username + "</span>";
                    $("#play1").append(addH1);
                    var addH2 = " <span>" + user[1] + "</span>";
                    $("#play2").append(addH2);
                }
            }
            if (win != undefined) {
                alert(win);
                clearInterval(readygame);
                ready = 1;
                startready = 0;
            }
            $(".body1").remove();
            $(".body2").remove();
            $(".body3").remove();
            $("#snake3").remove();
            $("#snake1").remove();
            $("#snake2").remove();
            $(".head").remove();
            for (var i = 0; i < 16; i++) {
                for (var j = 0; j < 24; j++) {
                    var m = 0;
                    for (var ss = 0; ss < head.length; ss++) {
                        if (i == head[ss][0] && j == head[ss][1]) {
                            m = 1;
                        }
                    }
                    if (m == 0) {
                        if (map[i][j] == 1) {
                            // console.log("snake1")
                            var addH = " <div id = 'ssss' class = 'body1' style='left:" + j * 20 + "px;top:" + i * 20 + "px;'></div>"
                            $("#map").append(addH);
                        }
                        if (map[i][j] == 2) {
                            // console.log("snake2")
                            var addH = " <div id = 'ssss' class = 'body2' style='left:" + j * 20 + "px;top:" + i * 20 + "px;'></div>"
                            $("#map").append(addH);
                        }
                        if (map[i][j] == 3) {
                            // console.log("snake2")
                            var addH = " <div id = 'ssss' class = 'body3' style='left:" + j * 20 + "px;top:" + i * 20 + "px;'></div>"
                            $("#map").append(addH);
                        }

                        if (map[i][j] == 5) { //food
                            // console.log(i,j)
                            var addH = " <div id = 'snake1'  style='left:" + j * 20 + "px;top:" + i * 20 + "px;'></div>"
                            $("#map").append(addH);
                        }
                    }
                    // else{
                    //     var addH = " <div id = 'snake1' style='left:"+j*20+"px;top:" +i*20+"px;'></div>"
                    //     $("#map").append(addH);
                    // }

                }
            }
            for (var i = 0; i < head.length; i++) {
                var addH = " <div class = 'head' id = 'snake" + (i + 1) + "' style='left:" + head[i][1] * 20 + "px;top:" + head[i][0] * 20 + "px;'></div>"
                $("#map").append(addH);
            }
        }
    );
}
var ready = 0;
var readygame

function startplay() {
    ready = 0;
    if (ready == 0) {
        readygame = setInterval('move()', 25);
        ready = 1;
        console.log("move")
    }

}