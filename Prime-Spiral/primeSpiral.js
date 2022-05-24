function setup() {
  createCanvas(500, 500);
  noLoop();
}

function draw() {
  background(51, 255, 238);

  var dir = 0; // 0-left 1-up 2-right 3-down
  var x = width/2;
  var y = height/2;
  var d = 20;
  var repeat = 0;
  var steps = 0;
  var totalSteps = 1;
  var limit = 529;

  noFill();
  beginShape();

  for(var i = 1; i <= limit; i++, steps++) {
    if(steps === totalSteps) {
      steps = 0;
      dir = (dir + 1) % 4;
      if(++repeat % 2 === 0) { totalSteps++; }
    }
    
    vertex(x,y);
    
    if(isPrime(i)) {
      fill(50);
      ellipse(x,y,10,10);
      noFill();
    }

    switch(dir) {
      case 0: // L
        x-=d;
        break; 
      case 1: // U
        y-=d;
        break;
      case 2: // R
        x+=d;
        break;
      case 3: // D
        y+=d;
        break;
    }
  } 

  endShape();

  save("prime-spiral.jpg")
}

function isPrime(num) {
  if(num === 1) {
    return false;
  } else if(num === 2) {
    return true;
  }

  for(var i = 2; i < num; i++) {
    if(num % i === 0) { 
      return false; 
    }
  }
  return true;
}