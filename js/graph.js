var data = {
	// "CBS":[],
	// "MSNBC":[],
	// "Breitbart":[],
	// "Fox+News":[],
	// "ABC":[],
	// "CNN":[],
	// "NPR":[],
	// "Huffington+Post+US":[]
}
var colors = {
	"CBS":"#494949",
	"MSNBC":"#21b73a",
	"Breitbart":"#ed6212",
	"Fox+News":"#7195ce",
	"ABC":"#6d4e06",
	"CNN":"#e00000",
	"NPR":"#313cb2",
	"Huffington+Post+US":"#5ac972"
}
var pictionary = {
	"CBS":"img/cbs.png",
	"MSNBC":"img/msnbc.png",
	"Breitbart":"img/bb.png",
	"Fox+News":"img/fox.png",
	"ABC":"img/abc.png",
	"CNN":"img/cnn.png",
	"NPR":"img/npr.png",
	"Huffington+Post+US":"img/huffpost.png"
}
var selected = ['CNN'];

$(document).ready(function(){
	startAni();
	processData();
	$('#toggleMessage').click(function(){
        	if($('#explanation').css('display')=='none')
        		$('#explanation').fadeIn();
        	else
        		$('#explanation').fadeOut();
        })
})
function processData(){
	firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
	var database = firebase.database();
	var topRef = database.ref('topics');
	topRef.once('value', function(snapshot){
		snapshot.forEach(function(child){
			child.forEach(function(article){
				var key = article.child("source").val();
				if(key == null || pictionary[key] == null){
					key = article.child("source").val().title.toUpperCase();
				}

				var entities = article.child("entities").val();
				if(entities !=null){
					for(i = 0; i<entities.length; i++){
						var name = entities[i].name;
						if(!data[key]){
							data[key] = {};
						}
						if(!data[key][name]){
							data[key][name] = {
									x:0,
									y:0
							}
						}

						var sentiment = entities[i].sentiment.score;
						var number = entities[i].mentions.length;
						data[key][name].x += number;
						data[key][name].y = (sentiment+data[key][name].y)/2;
					}
				}
			});
        });
        retrieveDataAni();
		createChart();
		// populateSources();
	});
}
function createChart(){
	var ctx = $("#entitygraph");
	var datasets = [];
	for (var key in data) {
		var dataset = [];
	    for (var k in data[key]) {
			dataset.push(data[key][k]);
		}
	  	datasets.push({
	  		label: key,
            data: dataset,
            backgroundColor: colors[key],
            fill:false,
            pointRadius: 5,
	  	});
	}
	var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: datasets,
    },
    options: {
    	showLines: false,
    	maintainAspectRatio: false,
    	// legend: {
    	// 	display: false,
    	// },
        scales: {
        	yAxes: [{
        		ticks:{
        			min: -.5,
        			max: .5
        		},
                type: 'linear',
                position: 'left',
                scaleLabel:{
        			display:true,
        			labelString: "Average Sentiment",
        		},
            }],

            xAxes: [{
            	ticks:{
        			min: 1,
        			max: 25
        		},
                type: 'linear',
                position: 'bottom',
                scaleLabel:{
        			display:true,
        			labelString: "Number of Appearance",
        		},
            }]
        },
        tooltips: {
            custom: function(tooltipModel) {
             //    var tooltip = $('#entity');

             //    console.log(tooltipModel.yAlign);
             //    console.log(tooltipModel.title);
             //    console.log(tooltipModel.body);

             //    if(tooltipModel && tooltipModel.body && tooltip.Model.body[0].lines){
	            //     var coord = tooltipModel.body[0].lines[0];
	            //     coord = coord.substring(1, coord.length-1);
	            //     coord = coord.split(", ");
	            //     console.log(coord);
	            //     var current = {
	            //     	x:coord[0],
	            //     	y:coord[1]
	            //     }

            	// }


                /*
                for (var key in data) {
				    for (var k in data[key]) {
						if(data[key][k] == current && key == source){
							tooltip.text(k);
						}
					}
				}
				*/
                


                // // Create element on first render
                // if (!tooltipEl) {
                //     tooltipEl = document.createElement('div');
                //     tooltipEl.id = 'chartjs-tooltip';
                //     tooltipEl.innerHTML = "<table></table>"
                //     document.body.appendChild(tooltipEl);
                // }

                // // Hide if no tooltip
                // if (tooltipModel.opacity === 0) {
                //     tooltipEl.style.opacity = 0;
                //     return;
                // }

                // // Set caret Position
                // tooltipEl.classList.remove('above', 'below', 'no-transform');
                // if (tooltipModel.yAlign) {
                //     tooltipEl.classList.add(tooltipModel.yAlign);
                // } else {
                //     tooltipEl.classList.add('no-transform');
                // }

                // function getBody(bodyItem) {
                //     return bodyItem.lines;
                // }

                // // Set Text
                // if (tooltipModel.body) {
                //     var titleLines = tooltipModel.title || [];
                //     var bodyLines = tooltipModel.body.map(getBody);

                //     var innerHtml = '<thead>';

                //     titleLines.forEach(function(title) {
                //         innerHtml += '<tr><th>' + title + '</th></tr>';
                //     });
                //     innerHtml += '</thead><tbody>';

                //     bodyLines.forEach(function(body, i) {
                //         var colors = tooltipModel.labelColors[i];
                //         var style = 'background:' + colors.backgroundColor;
                //         style += '; border-color:' + colors.borderColor;
                //         style += '; border-width: 2px';
                //         var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                //         innerHtml += '<tr><td>' + span + body + '</td></tr>';
                //     });
                //     innerHtml += '</tbody>';

                //     var tableRoot = tooltipEl.querySelector('table');
                //     tableRoot.innerHTML = innerHtml;
                // }

                // // `this` will be the overall tooltip
                // var position = this._chart.canvas.getBoundingClientRect();

                // // Display, position, and set styles for font
                // tooltipEl.style.opacity = 1;
                // tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
                // tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
                // tooltipEl.style.fontFamily = tooltipModel._fontFamily;
                // tooltipEl.style.fontSize = tooltipModel.fontSize;
                // tooltipEl.style.fontStyle = tooltipModel._fontStyle;
                // tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            }
        }
    }
});
}
function populateSources(){
	var str="";
	for (var key in data) {
	    str += '<img src="'+pictionary[key]+'"/>';
	}
	$("#newsoptions").append($(str));
}
function toggleSearch(){
	$("#search_button").fadeOut(function(){
		$("#search_bar").fadeIn();
		$("#search_bar").animate({
		"width":"200px",
		},1000,function(){
			$("#search_bar").focus();
			$("#search_bar").keypress(function(e) {
    			if(e.which == 13) {
        			window.location = "tagline.html?tag="+$("#search_bar").val();
    			}
			});
		});
	});
}