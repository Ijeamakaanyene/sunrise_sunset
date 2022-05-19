let margin = 80;
let s = 160;

function setup() {
  // I want it to scale with size of window
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background('#ffffff');
  
  
  
  //let palette = ["#000330", "#f18f15", "#f5e700"];
  
  // setting size of small multiple circles
  let nx = width/s;
  let ny = height/s;
  
  // determining angle of sun
  let h = 20;
  let xm = map(h, 0, 23, 
               width + ((width/8)*6),
               0 - (width/8)*4);
  //let xm = map(h, 0, 23, width, 0);
  let ym = map(h, 0, 23, 0, TWO_PI);
  
  let sunX0 = xm;
  let sunY0 = height/2 + (cos(ym) * height / 4);
  
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      
      // origin of each circle
      let x0 = margin + i*s;
      let y0 = margin + j*s;
      
      const circleRadius = s/2;
      
      // Now small grid around the origin of each circle
      for(let k = x0 - circleRadius; k < x0 + circleRadius; k+=2){
        for(let l = y0 - circleRadius; l < y0 + circleRadius; l+=2){
          
          let smallDist = sqrt(sq(k - x0) + sq(l - y0));
          let largeDist = sqrt(sq(k - sunX0) + sq(l - sunY0));
          
          // if within radius of origin
          if(smallDist < circleRadius){
            
            //if within radius of sun
            if(largeDist < width/8){
              
              let palette = assignPalette(h);
              
              let selColor = colorPalProb(0.10, 
                                          palette[0], 
                                          palette[1], 
                                          palette[2]);
              
              let c2 = color(selColor);
              stroke(c2);
              strokeWeight(2);
              point(k, l);
            } else {
              
              let palette = assignPalette(h);
              let colorProb = assignColorProb(h);
              
              let selColor = colorPalProb(colorProb, 
                                      palette[0], 
                                      palette[1], 
                                      palette[2]);
              let c2 = color(selColor);
              stroke(c2);
              strokeWeight(2);
              point(k, l);
            }
          }
        }
      }
      
    }
  }
  
}


function assignColorProb(h){
  let night_prob = 0.95;
  let sunset_prob = 0.75;
  let day_prob = 0.95;
  let sunrise_prob = 0.75;
  
  if(h < 6){
    return(night_prob);
    
  } else if(h >= 6 && h <= 7){
    return(sunrise_prob);
    
  } else if(h > 7  && h < 19){
    return(day_prob);
    
  } else if(h >= 19 && h <= 20){
    return(sunset_prob);
    
  } else if(h > 20){
    return(night_prob);
  }
}


function assignPalette(h){
  
  let night_palette = ["#000330", "#f18f15", "#f5e700"];
  let day_palette = ["#4572a7", "#f18f15", "#f5e700"];
  
  if(h < 6){
    return(night_palette);
    
  } else if(h >= 6 && h <= 7){
    return(day_palette);
    
  } else if(h > 7  && h < 19){
    return(day_palette);
    
  } else if(h >= 19 && h <= 20){
    return(night_palette);
    
  } else if(h > 20){
    return(night_palette);
    
  }
  
  
}


function colorPalProb(prob, color1, color2, color3){
  let r = random(1);
  let inverseProb = 1 - prob;
  
  if(r >= inverseProb){
    return color1;
  } else {
    return random([color2, color3]);
  }
}
