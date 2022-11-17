// origin of pendulum
let ox = 250;
let oy = 100;

// initial conditions and constants
let m1 = 1;
let m2 = 1;
let l1 = 100;
let l2 = 120;
let t1 = 3.14/2;
let t2 = 3.14/5;
let g = 9.81;
let dt = 0.1;
let r = 20;

let t1_ = 0;
let t2_ = 0;
let t1__ = 0;
let t2__ = 0;

let buffer;
let px2;
let py2;

function setup() {
  createCanvas(500, 400);
  buffer = createGraphics(width, height);
  buffer.background(200);
  buffer.translate(ox, oy);
}

function draw() {
  pixelDensity(1);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  let x1 = l1*sin(t1);
  let y1 = l1*cos(t1);
  let x2 = x1 + l2*sin(t2);
  let y2 = y1 + l2*cos(t2); 

  translate(ox, oy);
  stroke(0);
  strokeWeight(2);
  fill(0);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  circle(x1, y1, r);
  circle(x2, y2, r);

  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2;
  py2 = y2;

  calculate();
}

function calculate() {
  calculate_acc1();
  calculate_acc2();

  t1_ += t1__*dt;
  t2_ += t2__*dt;
  t1 += t1_*dt;
  t2 += t2_*dt;
}

function calculate_acc1() {
  let n1 = -g*(2*m1+m2)*sin(t1);
  let n2 = -m2*g*sin(t1-2*t2);
  let n3 = -2*sin(t1-t2)*m2*(t2_*t2_*l2+t1_*t1_*l1*cos(t1-t2));
  let d = l1*(2*m1+m2-m2*cos(2*t1-2*t2));

  t1__ = (n1+n2+n3)/d;
}

function calculate_acc2() {
  let n1 = 2*sin(t1-t2);
  let n2 = t1_*t1_*l1*(m1+m2);
  let n3 = g*(m1+m2)*cos(t1);
  let n4 = t2_*t2_*l2*m2*cos(t1-t2);
  let d = l2*(2*m1+m2-m2*cos(2*t1-2*t2));

  t2__ = (n1*(n2+n3+n4))/d;
}