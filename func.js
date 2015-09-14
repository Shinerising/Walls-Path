function createGrid(x, y, w) {
    var left = x * w;
    var top = 300 - y * w;
    $("#grids").append("<div class='grid' style='left:" + left + "px;top:" + top + "px'></div>");
}

function createTextGrid(x, y, w, str) {
    var left = x * w;
    var top = 300 - y * w;
    $("#texts").append("<div class='grid_text' style='left:" + left + "px;top:" + top + "px'>" + str + "</div>");
}

function createWall(x, y, d, w) {
    if (d == 0) { //horizontal
        var left = x * w - 4;
        var top = 300 - y * w - 4;
        $("#walls").append("<div class='wall_h' x=" + x + " y=" + y + " d=" + d + " style='left:" + left + "px;top:" + top + "px'></div>");
    } else { //vertical
        var left = 60 + x * w - 4;
        var top = 300 - y * w - 4;
        $("#walls").append("<div class='wall_v' x=" + x + " y=" + y + " d=" + d + " style='left:" + left + "px;top:" + top + "px'></div>");
    }
}

function createPath(x, y, d, w, i) {
    var c, node;
    node = "#path0" + i;
    if (i == 0) c = "#F65";
    else if (i == 1) c = "#8E7";
    else if (i == 2) c = "#FE3";
    else if (i == 3) c = "#5DF";
    else if (i == 4) c = "#D5F";
    else if (i == 5) c = "#F59";

    if (d == 0) {
        var left = x * w + 26;
        var top = 360 - y * w - 34;
        $(node).append("<div class='path_v' x=" + x + " y=" + y + " d=" + d + " style='left:" + left + "px;top:" + top + "px;background:" + c + "'></div>");
    } else if (d == 1) {
        var left = x * w + 26;
        var top = 360 - y * w - 34;
        $(node).append("<div class='path_h' x=" + x + " y=" + y + " d=" + d + " style='left:" + left + "px;top:" + top + "px;background:" + c + "'></div>");
    } else if (d == 2) {
        var left = x * w + 26;
        var top = 360 - y * w - 64;
        $(node).append("<div class='path_v' x=" + x + " y=" + y + " d=" + d + " style='left:" + left + "px;top:" + top + "px;background:" + c + "'></div>");
    } else if (d == 3) {
        var left = x * w - 4;
        var top = 360 - y * w - 34;
        $(node).append("<div class='path_h' x=" + x + " y=" + y + " d=" + d + " style='left:" + left + "px;top:" + top + "px;background:" + c + "'></div>");
    }

}

function drawGrids(x, y, w) {
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
            createGrid(j, i, w);
        }
    }
}

function drawTexts(x, y, w) {
    for (var i = 0; i < x; i++) {
        createTextGrid(i, -1, w, i);
    }
    for (var i = 0; i < y; i++) {
        createTextGrid(-1, i, w, i);
    }
}

function drawWalls(x, y, w) {
    for (var i = 0; i < y - 1; i++) {
        for (var j = 0; j < x; j++) {
            createWall(j, i, 0, w);
        }
    }
    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x - 1; j++) {
            createWall(j, i, 1, w);
        }
    }
}

function drawPath(i) {
    var x, y, d0, d1;
    x = 0;
    y = 0;
    for (var j = 0; j < pathStep; j++) {
        d0 = paths[i].charAt(j);
        d1 = paths[i].charAt(j + 1);
        if (d1 == 0) d1 = 2;
        else if (d1 == 1) d1 = 3;
        else if (d1 == 2) d1 = 0;
        else if (d1 == 3) d1 = 1;
        createPath(x, y, d0, gridWidth, i);
        createPath(x, y, d1, gridWidth, i);
        if (d1 == 0) y--;
        else if (d1 == 1) x++;
        else if (d1 == 2) y++;
        else if (d1 == 3) x--;
    }
    d0 = paths[i].charAt(j);
    createPath(x, y, d0, gridWidth, i);
    createPath(x, y, 2, gridWidth, i);
}

function drawPaths() {
    for (var i = 0; i < 6; i++) drawPath(i);
}

function showPath(i) {
    $("#path0" + i).css("opacity", 1);
}

function hidePath(i) {
    $("#path0" + i).css("opacity", 0);
}

function clearWalls() {
    for (var i = 0; i < xMax; i++) {
        for (var j = 0; j < yMax; j++) {
            if (i < xMax - 1) wall_v[i][j] = 0;
            if (j < yMax - 1) wall_h[i][j] = 0;
        }
    }

    $(".wall_v").empty();
    $(".wall_h").empty();
}

function clearPaths() {
    for (var i = 0; i < 6; i++) clearPath(i);
}

function clearPath(i) {
    $("#path0" + i).empty();
}

function clearGrids(x, y) {
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            grid[x][y] = 0;
        }
    }
}

function checkWall(x, y, d) {
    if (d == 0 && (y == 0 || wall_h[x][y - 1] == 1)) return false;
    else if (d == 1 && (x == xMax - 1 || wall_v[x][y] == 1)) return false;
    else if (d == 2 && (y == yMax - 1 || wall_h[x][y] == 1)) return false;
    else if (d == 3 && (x == 0 || wall_v[x - 1][y] == 1)) return false;
    else return true;
}

function checkGrid(x, y, d, step, p) {
    p += d;
    if (step > pathStep) return false;
    else if (grid[x][y] == 1) return false;
    else if (x == xMax - 1 && y == yMax - 1) {
        if (step < pathStep) {
            pathCount = 1;
            pathStep = step;
        } else {
            pathCount++;
        }
        if (pathCount < 7) paths[pathCount - 1] = p;
        return true;
    } else {
        grid[x][y] = 1;
        if (d == 0) {
            if (checkWall(x, y, 1)) checkGrid(x + 1, y, 3, step + 1, p);
            if (checkWall(x, y, 2)) checkGrid(x, y + 1, 0, step + 1, p);
            if (checkWall(x, y, 3)) checkGrid(x - 1, y, 1, step + 1, p);
        }
        if (d == 1) {
            if (checkWall(x, y, 0)) checkGrid(x, y - 1, 2, step + 1, p);
            if (checkWall(x, y, 2)) checkGrid(x, y + 1, 0, step + 1, p);
            if (checkWall(x, y, 3)) checkGrid(x - 1, y, 1, step + 1, p);
        }
        if (d == 2) {
            if (checkWall(x, y, 1)) checkGrid(x + 1, y, 3, step + 1, p);
            if (checkWall(x, y, 0)) checkGrid(x, y - 1, 2, step + 1, p);
            if (checkWall(x, y, 3)) checkGrid(x - 1, y, 1, step + 1, p);
        }
        if (d == 3) {
            if (checkWall(x, y, 1)) checkGrid(x + 1, y, 3, step + 1, p);
            if (checkWall(x, y, 2)) checkGrid(x, y + 1, 0, step + 1, p);
            if (checkWall(x, y, 0)) checkGrid(x, y - 1, 2, step + 1, p);
        }
        grid[x][y] = 0;
    }
}