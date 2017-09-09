
$(document).ready(function(){
    startAni();
    retrieveData();
    openTagline();
    //document.getElementById("tagline").hidden=true;
});
function retrieveData(){
	retrieveDataAni();
firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
var database = firebase.database();
var topRef = database.ref('topics');
topRef.on('value', function(snapshot){
	updateData(snapshot);
});
  
}
function openTagline(){
    openTaglineAni();
}
function updateData(snapshot){
	//var topic = snapshot.child("topics");
	snapshot.forEach(function(chldTopic){
		var topic = document.createElement("div");
		var title = document.createElement("h1");
		title.className="title";
		title.innerHTML = chldTopic.key;
		topic.append(title);
		var opinions = document.createElement("div");
		chldTopic.forEach(function(article){
			var opinion = document.createElement("div");
			var source = document.createElement("div");
			source.className="source";
			var img = document.createElement("img");
			img.src="https://chococoabaking.com/wp-content/uploads/2012/01/CNN-Logo-300x300.jpg" //CHANGES BASED ON SOURCE
			img.height="100";
			img.width="100";
			var artHead = document.createElement("h3");
			artHead.innerHTML=article.key;
			artHead.className="quote";
			var artHeadDiv = document.createElement("div");
			artHeadDiv.append(artHead);
			
			var sourceHeader = document.createElement("div");
			sourceHeader.className="source-header";
			sourceHeader.append(img);
			sourceHeader.append(artHeadDiv);
			source.append(sourceHeader);
			opinion.append(source);
			opinion.className="opinion"
			opinions.append(opinion);
		});
		//topic.append(opinions);
		opinions.className="opinions"
		document.getElementById("tagline").append(title);
		document.getElementById("tagline").append(opinions);
	});
	
console.log("changed");
}
