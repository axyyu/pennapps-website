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

function addSource(percentage, pictureUrl){
	console.log(percentage);
	console.log(pictureUrl);
		document.getElementById("graph");
		var element = document.createElement('IMG');
		element.src = pictureUrl;
		element.className = "hvr-bob";
		element.style.width = "50px";
		element.style.height = "50px";
		element.style.position = "absolute";
		element.style.marginTop = "-30px";
		element.style.borderRadius = "25px";
		element.style.left = "calc("+percentage.toString()+"% - 25px)";
		element.style.right = "calc("+percentage.toString()+"% - 25px)";
		document.getElementById('graph').appendChild(element);
}

$(document).ready(function(){
	var query = window.location.search.substring(1);
	var vars = query.split("=")[1];
	vars = vars.replace("%20"," ")
	console.log(vars);
	firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
	var database = firebase.database();
		var topRef = database.ref('topics/'+vars+'');
		topRef.once('value', function(snapshot){
			var graphsources = [];
			var str = '';
			str+='<h1 class="title">'+snapshot.key+'</h1>';
			str+='<div id="graph"><h3>Sentiment Spectrum</h3><p>Neutral news sources are not shown</p><div id="line"></div></div>';
			str+='<div class="opinions">';
			snapshot.forEach(function(article){
				str+='<div class="source" ><div class="source-header">';
				var imgsrc = pictionary[article.child("source").val()];
				if(imgsrc == null){
					imgsrc = pictionary[article.child("source").val().title.toUpperCase()];
				}
				if(article.val().sentiment.score!=0){
					graphsources.push([article.val().sentiment.score, imgsrc]);
				}
				str+='<a href="'+article.child("url").val()+'"><img src="'+imgsrc+'" /></a>';
				str+='<div><h3 class="quote">"'+article.child("quote").val()+'"</h3></div></div>';
				str+='<h3 class="title">'+article.key+'</h3>';
				str+='<p class="summary">'+article.child("summary").val()+'</p></div>';
	        });
	        str+='</div>';
	        $("#tagline").append($(str));

	        graphsources.forEach(function(current){
	        	addSource(Math.round((current[0]+1)*50), current[1]);
	        });
		});
});
