function startAni(){
    $("header").fadeIn();
    $(".loading").fadeIn();
}
function retrieveDataAni(){
    $(".loading").fadeOut();
    $("#results").fadeIn();
}
function openTaglineAni(){
    $("#results").fadeOut();
    $("#tagline").fadeIn();

}


$('#wrapper').bind('click', function(e){
    console.log( e);
});


/*$("#tagline").click(function(){
	this.fadeOut();
	this.parent().find("#results").fadeIn();
});

$("#results").click(function(){
	this.fadeOut();
	this.parent().find("#tagline").fadeIn();
});*/