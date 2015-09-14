var xMax = 8;
var yMax = 5;

var pathStep = xMax * yMax + 1;
var pathCount = 0;

var gridWidth = 60;
var wall_h = new Array(xMax);
for (var i = 0; i < xMax; i++) {
    wall_h[i] = new Array(yMax - 1);
}
var wall_v = new Array(xMax - 1);
for (var i = 0; i < xMax - 1; i++) {
    wall_v[i] = new Array(yMax);
}
var grid = new Array(xMax);
for (var i = 0; i < xMax; i++) {
    grid[i] = new Array(yMax);
}
var paths = ["", "", "", "", "", ""];
var pathshow = [0, 0, 0, 0, 0, 0];

drawGrids(xMax, yMax, gridWidth);
drawTexts(xMax, yMax, gridWidth);
drawWalls(xMax, yMax, gridWidth);

$(".wall_v").click(function () {
    var x = $(this).attr("x");
    var y = $(this).attr("y");
    var d = $(this).attr("d");
    if ($(this).html() == "") {
        $(this).append("<div class='wall'></div>");
        wall_v[x][y] = 1;
    } else {
        $(this).empty();
        wall_v[x][y] = 0;
    }
});

$(".wall_h").click(function () {
    var x = $(this).attr("x");
    var y = $(this).attr("y");
    var d = $(this).attr("d");
    if ($(this).html() == "") {
        $(this).append("<div class='wall'></div>");
        wall_h[x][y] = 1;
    } else {
        $(this).empty();
        wall_h[x][y] = 0;
    }
});

$("#check").click(function () {
    $("#check").title = "checking";
    pathStep = xMax * yMax + 1;
    pathCount = 0;
    $("#text_step").empty();
    $("#text_step").empty();
    $("#colors").css("height", "0px");
    $("#infotexts").css("height", "0px");
    paths = ["", "", "", "", "", ""];
    clearPaths();
    checkGrid(0, 0, 0, 0, "");
    $("#check").title = "Check";
    $("#text_step").html(pathStep);
    $("#text_count").html(pathCount);
    var x = 6;
    if (x > pathCount) x = pathCount;
    var w = x * 50 + 20;
    $("#colors").css("height", "40px");
    $("#infotexts").css("height", "30px");
    $("#colors").css("width", w + "px");
    drawPaths();
});
$("#clear").click(function () {
    clearPaths();
    clearWalls();
    pathshow = [0, 0, 0, 0, 0, 0];
    $("#text_step").empty();
    $("#text_count").empty();
    $("#colors").css("height", "0px");
    $("#infotexts").css("height", "0px");
});
$(".color").hover(function () {
    var i = $(this).attr("pid");
    if (pathshow[i] == 0) showPath(i);
});
$(".color").mouseleave(function () {
    var i = $(this).attr("pid");
    if (pathshow[i] == 0) hidePath(i);
});
$(".color").click(function () {
    var i = $(this).attr("pid");
    if ($(this).hasClass("color_active")) {
        $(this).removeClass("color_active");
        pathshow[i] = 0;
    } else {
        $(this).addClass("color_active");
        pathshow[i] = 1;
    }
});