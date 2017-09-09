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
