var xMax = 8;
var yMax = 5;

var pathStep = xMax * yMax + 1;
var pathCount = 0;

var gridWidth = 60;
var wall_h = new Array(xMax);
for (var i = 0; i < xMax; i++) {
    wall_h[i] = new Array(yMax-1);
}
var wall_v = new Array(xMax-1);
for (var i = 0; i < xMax-1; i++) {
    wall_v[i] = new Array(yMax);
}
var grid = new Array(xMax);
for (var i = 0; i < xMax; i++) {
    grid[i] = new Array(yMax);
}
var paths = ["","","","",""];

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

$("#check").click(function(){
    document.title="checking";
    pathStep = xMax * yMax + 1;
    pathCount = 0;
    paths = ["","","","",""];
    clearPaths();
    checkGrid(0,0,0,0,"");
    document.title=pathCount+","+pathStep;
    drawPaths();
});
$("#clear").click(function(){
    clearPaths();
    clearWalls();
});