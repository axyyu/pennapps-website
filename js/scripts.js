
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

$(document).ready(function(){
    startAni();
    retrieveData();
});
function retrieveData(){
	firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
	var database = firebase.database();
	var topRef = database.ref('topics');
	topRef.once('value', function(snapshot){
		var r = $("#results");
		snapshot.forEach(function(child){
			var str = "";
			str+='<li class="result" onclick="openTagline(this)"><div class="headline"><h2 class="title">';
			str+=child.key+'</h2>';
			str+='</div><div class="opinions">';
			child.forEach(function(article){
				str+='<div class="source">';
				var imgsrc = pictionary[article.child("source").val()];
				if(imgsrc == null){
					imgsrc = pictionary[article.child("source").val().title.toUpperCase()];
				}
				str+='<img src="'+imgsrc+'"/>';
				str+='<div><h3 class="title">'+article.child("title").val()+'</h3></div></div>';
			});
	        str+='</div></li>';
	        r.append($(str));
        });
        
	});
	retrieveDataAni();
}
function openTagline(v){
	//window.location = "tagline.html?tag="+$(v).find(".title").text();
}