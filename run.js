//  Change this parameters to change the grids' count of row and column
//  DO NOT use big number (more than 15 in common) for good performance


var xMax = 10;
var yMax = 7;

var pathStep = xMax * yMax + 1;
var pathCount = 0;

var gridWidth = 60;
var wall_h = new Array(xMax);
var i = 0;
for (i = 0; i < xMax; i++) {
    wall_h[i] = new Array(yMax - 1);
}
var wall_v = new Array(xMax - 1);
for (i = 0; i < xMax - 1; i++) {
    wall_v[i] = new Array(yMax);
}
var grid = new Array(xMax);
for (i = 0; i < xMax; i++) {
    grid[i] = new Array(yMax);
}
var paths = ["", "", "", "", "", ""];
var pathshow = [0, 0, 0, 0, 0, 0];

$("#main").css("width", xMax * gridWidth + 120 + "px");
$("#main").css("height", yMax * gridWidth + 100 + "px");
$("#grids").css("width", xMax * gridWidth + "px");
$("#grids").css("height", yMax * gridWidth + "px");
$("#texts").css("width", xMax * gridWidth + "px");
$("#texts").css("height", yMax * gridWidth + "px");
$("#walls").css("width", xMax * gridWidth + "px");
$("#walls").css("height", yMax * gridWidth + "px");
$("#paths").css("width", xMax * gridWidth + "px");
$("#paths").css("height", yMax * gridWidth + "px");
$("#housewall").css("width", xMax * gridWidth - 8 + "px");
$("#housewall").css("height", yMax * gridWidth - 8 + "px");
$("#enter").css("top", yMax * gridWidth - 8 + "px");
$("#exit").css("left", xMax * gridWidth - 60 + "px");

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
    var x = 6;
    if (x > pathCount) x = pathCount;
    var w = x * 50 + 40;
    if (pathStep == xMax * yMax + 1) {
        pathStep == 0;
        w = 0;
    }
    $("#text_step").html(pathStep);
    $("#text_count").html(pathCount);
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