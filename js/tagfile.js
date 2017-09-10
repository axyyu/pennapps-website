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
var query = window.location.search.substring(1);
var vars = query.split("=")[1];
vars = vars.replace("%20"," ")
console.log(vars);
firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
var database = firebase.database();
	var topRef = database.ref('topics/'+vars+'');
	topRef.once('value', function(snapshot){
		var str = '';
		str+='<h1 class="title">'+snapshot.key+'</h1>';
		str+='<iframe src="graph.html?q='+snapshot.key+'"></iframe>';
		str+='<div class="opinions">';
		snapshot.forEach(function(article){
			str+='<div class="source" ><div class="source-header">';
			var imgsrc = pictionary[article.child("source").val()];
			if(imgsrc == null){
				imgsrc = pictionary[article.child("source").val().title.toUpperCase()];
			}
			str+='<a href="'+article.child("url").val()+'"><img src="'+imgsrc+'" /></a>';
			str+='<div><h3 class="quote">"'+article.child("quote").val()+'"</h3></div></div>';
			str+='<h3 class="title">'+article.key+'</h3>';
			str+='<p class="summary">'+article.child("summary").val()+'</p></div>';
        });
        str+='</div>';
        $("#tagline").append($(str));
	});