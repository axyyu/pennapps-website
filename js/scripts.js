
$(document).ready(function(){
    startAni();
    retrieveData();
    openTagline();
});
function retrieveData(){
	
firebase.initializeApp({databaseURL: "https://debrief-v2.firebaseio.com"});
var database = firebase.database();
var topRef = database.ref('topics');
topRef.on('value', function(snapshot){
	updateData();
});
  
}
function openTagline(){
    openTaglineAni();
}
function updateData(){
console.log("changed");
}
