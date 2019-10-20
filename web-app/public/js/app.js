$(window).load(function() {
    $("#intro").show();
    $("#result").hide();
    $("#form").hide();
});

$("#data-intensive-computing-select").click(function(){
    $("#intro").hide();
    $("#form").show();
});

$("#evaluate").click(function(){
    $("#form").hide();
    $("#result").show();
});

$("#evaluate-another").click(function(){
    $("#result").hide();
    $("#form").show();
});

$("#home").click(function(){
    $("#result").hide();
    $("#intro").show();
});