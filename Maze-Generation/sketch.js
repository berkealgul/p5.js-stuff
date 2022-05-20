var wall = 0;
var path = 1;
var wallColor;
var pathColor;
var startColor;
var endColor;
var currentColor;
var rows = 20;
var cols = 30;
var cellWidth = 20;
var start = [0,0];
var end = [19,29];
var current = undefined;
var visited = [];
var stack = [];
var grid = createGrid();
var imageSaved = false;

function setup() {
  createCanvas(600, 400);
  wallColor = color(56, 56, 56);
  pathColor = color(212, 212, 212);
  currentColor = color(245, 126, 22);
  startColor = color(5, 38, 250);
  endColor = color(9, 250, 5);
  visited.push(start);
  stack.push(start);
}

function draw() {
  if(stack.length == 0) {
    if(!imageSaved) {
      imageSaved = true;
      saveCanvas('maze', 'jpg');
    }
    return;
  }
    

  drawGrid();

  current = stack.pop();
  var neighbors = findNeighbors(current);

  // mark as path
  grid[current[0]][current[1]][0] = path;

  if(neighbors.length > 0) {
    var i = Math.floor(Math.random() * (neighbors.length));
    var chosen = neighbors[i];
    
    // remove walls
    if(current[0] - chosen[0] == -1) { // north and south
      grid[current[0]][current[1]][4] = path;
      grid[chosen[0]][chosen[1]][2] = path;
    } 

    if(current[0] - chosen[0] == 1) { 
      grid[current[0]][current[1]][2] = path;
      grid[chosen[0]][chosen[1]][4] = path;
    } 

    if(current[1] - chosen[1] == -1) { // east and west
      grid[current[0]][current[1]][1] = path;
      grid[chosen[0]][chosen[1]][3] = path;
    } 

    if(current[1] - chosen[1] == 1) { 
      grid[current[0]][current[1]][3] = path;
      grid[chosen[0]][chosen[1]][1] = path;
    } 

    stack.push(current);
    visited.push(chosen);
    stack.push(chosen);
    
  }

}

function findNeighbors(pos) {
  var r = pos[0];
  var c = pos[1];
  var neighbors = []

  if(isValidLoc(r+1, c)) { neighbors.push([r+1,c]) };
  if(isValidLoc(r, c+1)) { neighbors.push([r,c+1]) };
  if(isValidLoc(r-1, c)) { neighbors.push([r-1,c]) };
  if(isValidLoc(r, c-1)) { neighbors.push([r,c-1]) };

  return neighbors;
}

function isValidLoc(r, c) {
  if(r >= 0 && r < rows && c >= 0 && c < cols) {
    for(var i = 0; i < visited.length; i++) {
      if(equals(visited[i], [r,c])) { return false; }
    };
    return true;
  } else {
    return false;
  }
}

function drawGrid() {
  for(var i = 0; i < rows; i++) {
    for(var j = 0; j < cols; j++) {
      
      if(equals([i, j], start)) {
        var c = startColor;
      } else if(equals([i, j], end)) {
        var c = endColor;
      } else if(equals([i, j], current)) {
        var c = currentColor;
      } else {
        switch(grid[i][j][0]) {
          case wall:
            var c = wallColor;
            break;
          case path:
            var c = pathColor;
            break;
        }
      }

      noStroke();
      fill(c);
      rect(j*cellWidth, i*cellWidth, cellWidth, cellWidth);
      
      // wall lines
      stroke(0);
      if(grid[i][j][1] == wall) { // east
        line((j+1)*cellWidth, i*cellWidth, (j+1)*cellWidth, (i+1)*cellWidth);
      }

      if(grid[i][j][2] == wall) { // north
        line(j*cellWidth, i*cellWidth, (j+1)*cellWidth, i*cellWidth);
      }

      if(grid[i][j][3] == wall) { // west
        line(j*cellWidth, i*cellWidth, j*cellWidth, (i+1)*cellWidth);
      }

      if(grid[i][j][4] == wall) { // south
        line(j*cellWidth, (i+1)*cellWidth, (j+1)*cellWidth, (i+1)*cellWidth);
      }

    }
  }
}

function equals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

function createGrid() {
  var grid = [];

  for(var i = 0; i < rows; i++) {
    grid.push([]);
    for(var j = 0; j < cols; j++) {
      // first element is its cell information wheter it is path or not
      // the other four are walls surroundng the area
      // [path/wall, east wall, north, west, south]
      grid[i].push([wall,wall,wall,wall,wall]); // e n w s
    }
  }

  return grid;
}
