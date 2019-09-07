var http = require("http");//获取http对象
var querystring = require("querystring");//获取querystring对象
var contents = querystring.stringify({
	name:'devil13th',
	email:'devil13th@163.com',
	addr : ' China BeJing Xizhimen Xinjiekou'
})
 
/*
http.request(options, callback) 发起 HTTP 请求。接受两个参数，option 是
一个类似关联数组的对象，表示请求的参数，callback 是请求的回调函数
 --- option
常用的参数如下所示。
 host ：请求网站的域名或 IP 地址。
 port ：请求网站的端口，默认 80。
 method ：请求方法，默认是 GET。
 path ：请求的相对于根的路径，默认是“/”。QueryString 应该包含在其中。
例如 /search?query=byvoid。
 headers ：一个关联数组对象，为请求头的内容。
 ----callback 传递一个参数，为 http.ClientResponse 的实例。
 
http.request 返回一个 http.ClientRequest 的实例。
*/
var options = {
	host:'127.0.0.1',
	path:'/',
	method:'get',
	port:8081,
	headers:{
		'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':contents.length,
        username = '123',
        passward = '123'
    },
   
}
 
//创建http.ClientRequest对象 ，
/*表示一个已经产生而且正在进行中的 HTTP 请求。
它提供一个 response 事件，
即 http.request或 http.get 第二个参数指定的回调函数的绑定对象。
*/
 
var req = http.request(options,function(res){
	res.setEncoding('utf-8');
	res.on('data',function(data){
		console.log(data);
	});
});
 
req.write(contents);
req.end();//不要忘了通过 req.end() 结束请求，否则服务器将不会收到信息。