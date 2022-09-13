let cX;
let cY; 

let alpha = 0;
let beta = 0;
let radio;
const i = 0.1;
const bg_color = "#EEEAE2"

let points;

function setup(){
    const myCanvas = createCanvas(82, 82);
    myCanvas.parent('lissajous');

    cX = width/2;
    cY = width/2;
    radio = (width/2) - 12;

    points = [];

    // store loop values
    alpha = PI * 1;
    let max = PI * 1 + TWO_PI*3

    while(alpha < max){

        let ty = cX + cos(alpha) *  radio;
        let tx = cY + sin(beta) * radio;
        
        alpha += (i/2);
        beta += (i/3);

        let tmpObject = {x: tx, y: ty};

        points.push(tmpObject);
    }

}

function draw(){
    background(bg_color);

    fill(0,32);
    noStroke();
    for(let n = 0; n< points.length; n++){
        let d = map(n, 0, points.length, 0.5,3.5)
        circle(points[n].x, points[n].y,d);
     }
     
    let nn = points.shift();
    points.push(nn);

    fill('#EC391D');
    stroke(bg_color);
    strokeWeight(2);
    
    // red dot
    circle(points[points.length-1].x, points[points.length-1].y,8);

}