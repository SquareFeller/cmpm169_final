function setup() {
  createCanvas (800, 600);
}

function draw() {
  background(225);    // Set background color           https://p5js.org/reference/#/p5/background
  //fill(255);          // Set color used to fill shapes  https://p5js.org/reference/#/p5/fill
  //noStroke();         // Disable drawing shape outlines https://p5js.org/reference/#/p5/noStroke
  //rectMode(CENTER);   // Draw square based on center point  https://p5js.org/reference/#/p5/rectMode
  //rect(mouseX, mouseY, 50, 50);  // Draw square at mouse location  https://p5js.org/reference/#/p5/rect

  noFill();
  let squareSize = 25;

  for (let a = -(squareSize); a < width + squareSize; a += squareSize){
    for (let b = -(squareSize); b < height + squareSize; b += squareSize){
      let d = dist(mouseX, mouseY, a, b);
      rectMode(CENTER);
      rect(a, b, d * 0.10, d * 0.10);
    }
  }
}

 //SECTION TEAM: Lorraine Torres, Ashley Knapp, and Kellum Inglin