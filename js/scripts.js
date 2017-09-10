
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
var green="#42f483";
var red ="#f44141";
var gray = "#adadad";

$(document).ready(function(){
    startAni();
    retrieveData();
});
String.prototype.hashCode = function() {
  var hash = 5381, i = this.length
  while(i)
    hash = (hash * 33) ^ this.charCodeAt(--i)
  return hash >>> 0;
}
function retrieveData(){
	firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
	var database = firebase.database();
	var topRef = database.ref('topics');
	topRef.once('value', function(snapshot){
		var r = $("#results");
		snapshot.forEach(function(child){
			var str = "";
			str+='<li class="result" onclick="openTagline(this)"><div class="headline"><h2 class="title">';
			str+=child.key+'</h2><canvas id="'+child.key.hashCode()+'"></canvas>';
			str+='</div><div class="opinions">';

			var positive = 0;
			var neutral = 0;
			var negative = 0;
			child.forEach(function(article){
				str+='<div class="source">';
				var imgsrc = pictionary[article.child("source").val()];
				if(imgsrc == null){
					imgsrc = pictionary[article.child("source").val().title.toUpperCase()];
				}
				str+='<img src="'+imgsrc+'"/>';
				str+='<div><h3 class="title">'+article.child("title").val()+'</h3></div></div>';

				var sentiment = article.child("sentiment").val().score;
				if(sentiment>0){
					positive++;
				}
				else if(sentiment< -0.25){
					negative++;
				}
				else{
					neutral++;
				}
			});
	        str+='</div></li>';
	        r.append($(str));

	        var data = {
	        	labels: [
			        'Positive',
			        'Neutral',
			        'Negative'
			    ],
			    datasets: [{
			        data: [positive, neutral, negative],
			        backgroundColor: [green, gray, red],
			        borderWidth: ["20px"]
			    }],
			    options: [{
			    	enabled:true,
			    	position:"nearist",
			    }]
			};

	        var ctx = $("#"+child.key.hashCode());
	        var myDoughnutChart = new Chart(ctx, {
			    type: 'doughnut',
			    data: data
			});
        });
        
	});
	retrieveDataAni();
}
function openTagline(v){
	window.location = "tagline.html?tag="+$(v).find(".headline").text();
}
window.onkeyup = function(e) {
   //console.log(e);
   if(e.code=="Enter"&& $("#search_bar").is(':focus')&&!(document.getElementById("search_bar").value=="")){
   	window.location = "tagline.html?tag="+document.getElementById("search_bar").value;
   		

   }
}
$( "#search_button" ).click(function() {
  if(document.getElementById("search_bar").value==""|| !$("#search_bar").is(':focus'))
  {
  		
  		document.getElementById("search_bar").hidden=false;
  		document.getElementById("search_bar").focus();
  }
  else
  {
  	window.location = "tagline.html?tag="+document.getElementById("search_bar").value;
  }

});

/*$("#search_bar").focusout(function() {
	
		document.getElementById("search_bar").hidden=true;
	

});
*/