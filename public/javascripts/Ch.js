var sdata;
var datacpu = [];
var datamem = [];
if ("WebSocket" in window) {
	// alert("您的浏览器支持 WebSocket!");
}
var wsObj = new WebSocket("ws://192.168.43.180:8082");


function getdata() {
	console.log("ssssssssssssssssssss")
	wsObj.onopen = function () { //发送请求
		// alert("open");
		wsObj.send('chart');
	};
	wsObj.onmessage = function (ev) { //获取后端响应
		sdata = JSON.parse(ev.data)
		// clearcontent();
		// show(sdata);
		// console.log(sdata);

		var jslength = 0;
		for (var js2 in sdata) {
			// console.log(sdata)
			jslength++;
		}
		// console.log("sdsdsd", sdata);

		//  console.log("sdd",sdata[0])
		for (var i = 0; i < jslength; i++) {
			// console.log(sdata[i])
			if (sdata[i].Funname == 'cpu') {
				datacpu.push(sdata[i].Val * 10);
				console.log(datacpu)
			}
			if (sdata[i].Funname == 'mem') {
				datamem.push(sdata[i].Val * 10);
				console.log(datacpu)
			}
		}
	};
	// };
	wsObj.onerror = function (ev) {
		//alert("error");
	};
}
// wsObj.onclose = function (ev) {
//     //alert("close");
//     websocketnum = 0

function chart() {
	console.log("sdsd", datacpu)
	var ctx = document.getElementById("myChart").getContext('2d');
	var data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
				label: '2017',
				backgroundColor: 'rgba(40,161, 121, 0.1)',
				data: datacpu
			},
			{
				label: '2016',
				backgroundColor: 'rgba(140,111, 121, 0.1)',
				data: datamem
			},
		],
		borderColor: "rgba(151,187,205,1)"
	}
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {
			scales: {
				yAxes: [{
					tension: 0,
				}]
			}
		}
	});
}

function sleep(milliSeconds) {
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds) {
		// console.log(new Date().getTime());
	} //暂停一段时间 10000=1S。
}

function firstStep() {

	//做一点事
	console.log("1");
	getdata();
	chart();


	console.log("2");
}
// console.log("dsds", datacpu)
$(document).ready(function () {
	firstStep();


});