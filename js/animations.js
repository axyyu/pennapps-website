function startAni(){
    $("header").fadeIn();
    $(".loading").fadeIn();
}
function retrieveDataAni(){
    $(".loading").fadeOut();
    $("#results").fadeIn();
}