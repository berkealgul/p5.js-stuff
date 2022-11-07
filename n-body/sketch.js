class Body {
  static r = 15;
  static dt = .1;
  static G = 2;

  constructor() {
    this.m = 5;
    this.x = createVector(width/2, height/2).add(p5.Vector.random2D().setMag(random(200,300)));
    this.v = createVector(random(-1.0, 1.0), random(-1.0, 1.0)).mult(random(10.0,15.0));
  }

  attract(other) {
    let f = p5.Vector.sub(other.x, this.x);
    let ds = constrain(f.magSq(), 50, 500);
    let a = (Body.G * (this.m * other.m)) / ds;
    f.setMag(a);
    this.v.add(f.div(this.m));
  }  

  move() {
    this.x.add(this.v.copy().mult(Body.dt));

    if(this.x.x < 0 || this.x.x > width) {
      this.v.x *= -1;
    
    } 
    if(this.x.y < 0 || this.x.y > height) {
      this.v.y *= -1;
    } 
  }

  show() {
    strokeWeight(2);
    stroke(255);
    fill(30);
    circle(this.x.x, this.x.y, Body.r);
  }
}


const N = 150;
let bodies = new Array();

function setup() {
  createCanvas(800, 800);
  for(let i = 0; i < N; i++) {
    bodies.push(new Body());
  }  

}

function draw() {
  background(10);
  bodies.forEach((body) => {
    body.show();
    
    bodies.forEach((other_body) => {
      if(other_body != body) {
        body.attract(other_body);
      }
    })
    body.move();
  });
}
