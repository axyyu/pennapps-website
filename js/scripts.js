
var pictionary = new Map();//CBS  MSNBC  Breitbart  Fox+News  ABC  CNN  NPR  Huffington+Post+US
pictionary.set("CBS","img/cbs.png");
pictionary.set("MSNBC","img/msnbc.png");
pictionary.set("Breitbart","img/bb.png");
pictionary.set("Fox+News","img/fox.png");
pictionary.set("ABC","img/abc.png");
pictionary.set("CNN","img/cnn.png");
pictionary.set("NPR","img/npr.png");
pictionary.set("Huffington+Post+US","img/huffpost.png");
/*function giveImg(str){
	if(str=="CBS"){
		return "../img/cbs.png";
	}
	else if(str=="MSNBC"){
		return "../img/msnbc.png";
	}
	else if(str=="Breitbart"){
		return "../img/bb.png";
	}
	else if(str=="Fox+News"){
		return "../img/fox.png";
	}
	else if(str=="ABC"){
		return "../img/abc.png";
	}
	else if(str=="CNN"){
		return "../img/cnn.png";
	}
	else if(str=="NPR"){
		return "../img/npr.png";
	}
	else if(str=="Huffington+Post+US"){
		return "../img/huffpost.png";
	}
}*/
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
topRef.once('value', function(snapshot){
	updateData(snapshot);
});
  
}
function openTagline(){
    openTaglineAni();
}
function updateData(snapshot){
	//var topic = snapshot.child("topics");
	snapshot.forEach(function(chldTopic){
		var rHeadline = document.createElement("div");
		rHeadline.className="headline";
		var rTitle = document.createElement("h2");
		rTitle.innerHTML=chldTopic.key;
		rHeadline.append(rTitle);
		var listItem = document.createElement("li");
		listItem.append(rHeadline);
		var rOpinions = document.createElement("div");
		rOpinions.className="opinions"
		var topic = document.createElement("div");
		var title = document.createElement("h1");
		title.className="title";
		title.innerHTML = chldTopic.key;
		topic.append(title);
		var opinions = document.createElement("div");
		chldTopic.forEach(function(article){
			var rOpinion = document.createElement("div");
			var rSource = document.createElement("div");
			rSource.className="source";
			rOpinion.className="opinion";
			var rImg = document.createElement("img");
			rImg.src=pictionary.get(article.child("source").val());
			var rQuote = document.createElement("h3");
			rQuote.innerHTML=article.child("quote").val();//Change to Quote Later
			var rDiv = document.createElement("div");
			rDiv.append(rQuote);
			rSource.append(rImg);
			rSource.append(rDiv);
			rOpinion.append(rSource);
			rOpinions.append(rOpinion);

			var opinion = document.createElement("div");
			var source = document.createElement("div");
			source.className="source";
			var img = document.createElement("img");
			img.src=pictionary.get(article.child("source").val()); //CHANGES BASED ON SOURCE
			img.height="100";
			img.width="100";
			var artHead = document.createElement("h3");
			artHead.innerHTML=article.child("quote").val();//Change to QUOTE Later
			artHead.className="quote";
			var artHeadDiv = document.createElement("div");
			artHeadDiv.append(artHead);
			var pTitle = document.createElement("p");
			pTitle.innerHTML=article.key;
			var pSum = document.createElement("p");
			pSum.className="summary";
			pSum.innerHTML=article.child("summary").val();

			var emoji = document.getElementById("emojis");
			var cln = emoji.cloneNode(true);


			var sourceHeader = document.createElement("div");
			sourceHeader.className="source-header";
			sourceHeader.append(img);
			sourceHeader.append(artHeadDiv);
			source.append(sourceHeader);
			opinion.append(source);
			opinion.className="opinion"
			opinion.append(pTitle);
			opinion.append(pSum);
			opinion.append(cln);
			opinions.append(opinion);

		});
		//topic.append(opinions);
		opinions.className="opinions"
		/*var tagline = document.createElement("div");
		tagline.id = "tagline";

		tagline.append(title);
		tagline.append(opinions);*/
		var tagline = document.createElement("div");
		tagline.className="tagline";
		tagline.display="block";
		tagline.append(title);
		tagline.append(opinions);
		var results = document.createElement("ul");
		results.className="results";
		listItem.append(rOpinions);
		results.append(listItem);
		document.getElementById("wrapper").append(results);
		document.getElementById("wrapper").append(tagline);
	});
	
console.log("changed");
}
