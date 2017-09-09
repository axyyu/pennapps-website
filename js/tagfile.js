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
console.log(vars);
firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
	var database = firebase.database();
	var topRef = database.ref('topics/'+vars+'');
	topRef.once('value', function(snapshot){
		var str = '';
			str+='<h1 class="title">'+snapshot.key+'</h1>';
			str+='<div class="opinions">';
		snapshot.forEach(function(article){
			
			//child.forEach(function(article){
				str+='<div class="opinion" >';
				str+='<div class="source" >';
				str+='<img src="'+pictionary[article.child("source").val()]+'"/>';
				str+='<div><h3 class="quote">"'+article.child("quote").val()+'"</h3></div></div>';
				str+='<p>'+article.key+'</p>';
				str+='<p>'+article.child("summary").val()+'</p></div>';
			//});
        });
        $("#tagline").append($(str));
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