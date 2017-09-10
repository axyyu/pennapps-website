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

function scrollTo(v) {
	console.log(v);
	$('html, body').animate({ scrollTop: $("#"+v).offset().top - 100 }, 'slow');
    return false;
}

function addSource(percentage, pictureUrl, source){
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
		var indices = [];
		for(var i=0; i<source.length;i++) {
		    if (source[i] === "+") indices.push(i);
		}
		indices.reverse();
		for(var i=0; i<indices.length; i++){
			source = source.substring(0, indices[i]) + "\\" + source.substring(indices[i]);
		}
		element.onclick = function(){scrollTo(source)};
		document.getElementById('graph').appendChild(element);
}

function retrieveData(){
	var query = window.location.search.substring(1);
	var vars = query.split("=")[1];
	vars = vars.replace("%20"," ")
	console.log(vars);
	firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
	var database = firebase.database();
		var topRef = database.ref('topics/'+vars+'');
		topRef.once('value', function(snapshot){
			if(snapshot.val()!=null){
			var graphsources = [];
			var str = '';

			str+='<h1 class="title">'+snapshot.key+'</h1>';
			str+='<div id="graph"><h3>Sentiment Spectrum</h3><p>Neutral news sources are not shown</p><div id="line"></div></div>';
			str+='<div class="opinions">';
			snapshot.forEach(function(article){
				str+='<div class="source"><div class="source-header">';
				var imgsrc = pictionary[article.child("source").val()];
				var idv = article.child("source").val();
				if(imgsrc == null){
					idv = article.child("source").val().title;
					imgsrc = pictionary[article.child("source").val().title.toUpperCase()];
				}
				if(article.val().sentiment.score!=0){
					graphsources.push([article.val().sentiment.score, imgsrc, idv]);
				}
				str+='<a href="'+article.child("url").val()+'"><img src="'+imgsrc+'" id="'+idv+'"/></a>';
				str+='<div><h3 class="quote">"'+article.child("quote").val()+'"</h3></div></div>';

				str+='<h3 class="title">'+article.key+'</h3>';
				str+='<p class="summary">'+article.child("summary").val()+'</p>';
				
				var entities = article.child("entities").val();
				if(entities!=null && entities.length>2){
					str+='<div class="sent-list">';
					var length = entities.length;
					if(entities>5){
						length = 5;
					}
					for(i = 0; i<length; i++){
						var sentiment = entities[i].sentiment.score;
						if(sentiment>0){
							str+='<div class="positive">';
							str+='<img src="img/greenup.png"/>';
							str+='<h4>'+entities[i].name+'</h4>';
							str+='</div>';
						}
						else if(sentiment< 0){
							str+='<div class="negative">';
							str+='<img src="img/reddown.png"/>';
							str+='<h4>'+entities[i].name+'</h4>';
							str+='</div>';
						}
					}
					str+='</div>';
				}
				str+='</div>';
	        });
	        str+='</div>';
	        $("#tagline").append($(str));
			graphsources.forEach(function(current){
	        		addSource(Math.round((current[0]+1)*50), current[1], current[2]);
	        });
		}
        else{
        	search(""+vars);
        }
	});
	retrieveDataAni();
}

function search(query){
    startAni();
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            populate(JSON.parse(xmlHttp.responseText), query);
        }
        else{
            console.log(xmlHttp)
        }
    }
    xmlHttp.open("GET", "https://debriefserver.cutlass21.hasura-app.io/search?q="+query, true); // true for asynchronous 
    xmlHttp.send(null);
}
function populate(data, query){
			var str = '';
			str+='<h1 class="title">'+query+'</h1>';
			str+='<div class="opinions">';
    		data.forEach(function(e){
        		str+='<div class="opinion" >';
				str+='<div class="source" >';
				var imgsrc = pictionary[e.source];
				if(imgsrc == null){
					imgsrc = pictionary[e.source.title.toUpperCase()];
				}
				str+='<a href="'+e.url+'"><img src="'+imgsrc+'" /></a>';
				str+='<div><h3 class="quote">"'+e.quote+'"</h3></div></div>';
				str+='<p><span style="font-weight: bold;">'+e.title+'</span></p>';
				str+='<p>'+e.summary+'</p></div>';
    });
    $("#tagline").append($(str));
console.log(data);
    retrieveDataAni();
}

$(document).ready(function(){
    startAni();
    retrieveData();
});
