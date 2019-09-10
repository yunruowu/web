$(document).ready(function(){
	var ctx = document.getElementById("myChart").getContext('2d');
	var data = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{	
				label:'2017',
				backgroundColor:'rgba(40,161, 121, 0.1)',
				data : [65,59,90,81,56,55,40]
			},
			{	
				label:'2016',
				backgroundColor:'rgba(140,111, 121, 0.1)',
				data : [28,48,40,19,96,27,100]
			},
		],
		borderColor:"rgba(151,187,205,1)"
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
});