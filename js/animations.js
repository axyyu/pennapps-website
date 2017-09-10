function startAni(){
    $("header").fadeIn();
    $(".loading").fadeIn();
}
function retrieveDataAni(){
    $(".loading").fadeOut(function(){
        $("#results").fadeIn();
        $("#tagline").fadeIn();
    });
}