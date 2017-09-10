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
function retrieveData(){
var query = window.location.search.substring(1);
var vars = query.split("=")[1];
vars = vars.replace("%20"," ")
console.log(vars);
firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
	var database = firebase.database();
	var topRef = database.ref('topics/'+vars+'');
	topRef.once('value', function(snapshot){
		console.log(snapshot.val());
		if(snapshot.val()!=null){
		var str = '';
			str+='<h1 class="title">'+snapshot.key+'</h1>';
			str+='<div class="opinions">';
		snapshot.forEach(function(article){
			
			//child.forEach(function(article){
				str+='<div class="opinion" >';
				str+='<div class="source" >';
				var imgsrc = pictionary[article.child("source").val()];
				if(imgsrc == null){
					imgsrc = pictionary[article.child("source").val().title.toUpperCase()];
				}
				str+='<a href="'+article.child("url").val()+'"><img src="'+imgsrc+'" /></a>';
				str+='<div><h3 class="quote">"'+article.child("quote").val()+'"</h3></div></div>';
				str+='<p><span style="font-weight: bold;">'+article.key+'</span></p>';
				str+='<p>'+article.child("summary").val()+'</p></div>';
			//});
        }
        );
        $("#tagline").append($(str));}
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
	/*<div class="tagline" hidden>

            <h1 class="title"><span class="n">Trump</span> ended the <span class="o">DACA</span> program.</h1>
            <div class="opinions">
                    <div class="opinion">
                        <div class="source">
                            <div class="source-header">
                            <img src="https://chococoabaking.com/wp-content/uploads/2012/01/CNN-Logo-300x300.jpg"/>
                            <div>
                                <h3 class="quote">"Trump shouldn't have ended DACA"</h3>
                            </div>
                        </div>
                        <p> TITLE </p>
                        <p class="summary">Trump da lump is a bump</p>*/