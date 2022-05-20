let steps = 0;
let field_width = 100;
let field = [];
let antLocX = field_width/2;
let antLocY = field_width/2;
let antDir = 0; // 0-up 1-right- 2-down 3-left
let sq_width;

function setup() 
{
  createCanvas(500, 500);
  createField();
  sq_width = width/field_width;
  
  textSize(16);
  textAlign(TOP, LEFT);
  
}

function draw() 
{
  background(220);
  antStep();
  drawSketch();
  //print("Steps: " + steps);
}

function drawSketch()
{
  noStroke();
  for(let i = 0; i < field_width; i++)
  {
    for(let j = 0; j < field_width; j++)
    {
      if(field[j][i] === 0)
        fill(220);
      else
        fill(0);
      
      rect(i*sq_width, j*sq_width, sq_width, sq_width);
    }
  }
  
  fill(217, 20, 33);
  rect(antLocX*sq_width, antLocY*sq_width, sq_width, sq_width);
  
  fill(0);
  text("Steps: "+steps, 10, 20);
  
}

function antStep()
{
  // rotate and flip sq
  if(field[antLocY][antLocX] === 0) // white sq
  {
    antDir = (((antDir+1)%4)+4)%4; // rotate clockwise
    field[antLocY][antLocX] = 1;
  }
  else // black sq
  {
    antDir = (((antDir-1)%4)+4)%4; // rotate cc
    field[antLocY][antLocX] = 0;
  }
  
  // move ant
  switch(antDir)
  {
    case 0:
      antLocY--;
      break;
    case 1:
      antLocX++;
      break;
    case 2:
      antLocY++;
      break;
    case 3:
      antLocX--;
      break;
  }
  
  steps++;
}

function createField()
{
  for(let i = 0; i < field_width; i++)
  {
    let row = [];
    for(let j = 0; j < field_width; j++)
    {
      row.push(0);
    }
    field.push(row);
  }
}
