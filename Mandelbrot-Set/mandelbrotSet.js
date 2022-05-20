let n_iters = 250; 
let cpw = 2.5; //complex plane width

function setup() 
{
  createCanvas(600, 600);
  pixelDensity(1);

  minSlider = createSlider(-cpw, 0, -cpw, 0.01);
  maxSlider = createSlider(0, cpw, cpw, 0.01);

  maxSlider.input(redraw);
  minSlider.input(redraw);

  noLoop();
}

function draw() 
{
  loadPixels();
  for(let x = 0; x < width; x++)
  {
    for(let y = 0; y < height; y++)
    {
      let a = map(x, 0, width, minSlider.value(), maxSlider.value());
      let b = map(y, 0, height, minSlider.value(), maxSlider.value());
      let ca = a;
      let cb = b;

      let iter = 0;

      while(iter < n_iters)
      {
        let a_ = a*a-b*b;
        let b_ = 2*a*b;
        a = a_+ca;
        b = b_+cb;

        if(a+b > 16)
        {
          break;
        }
        
        iter++;
      }

      let bright = map(iter, 0, n_iters, 25, 255); 
      if(iter == n_iters)
      {
        bright = 0;
      }
      
      let idx = (x + y*width) * 4;
      pixels[idx] = bright;
      pixels[idx+1] = bright;
      pixels[idx+2] = bright;
      pixels[idx+3] = 255;
    }
  }
  updatePixels();
  //save("mandelbrot.jpg"); // uncomment this if u want to save as image
}
