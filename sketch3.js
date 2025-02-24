let dots = [];

// Adjust the number of dots and speed here
let numDots = 3;
let dotSpeed = 1.5;

// Square properties
let squareSize = 40;
let squareX, squareY;

// Track which dots are inside the square
let dotsInsideSquare = [];

function setup() {
  createCanvas(600, 400);

  // Create initial positions of dots
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: i * (width / numDots), // Spread dots evenly across the canvas
      y: height / 2,
      color: "black", // Initial color of the dot
    });

    // Track whether each dot is inside the square
    dotsInsideSquare.push(false);
  }

  // Center the square
  squareX = width / 2 - squareSize / 2;
  squareY = height / 2 - squareSize / 2;
}

function draw() {
  background("lightgrey");

  // Loop through all the dots and update their positions
  for (let i = 0; i < dots.length; i++) {
    dots[i].x += dotSpeed;

    // If the dot moves off the canvas, reset its position to the left side
    if (dots[i].x > width) {
      dots[i].x = -10; // Position before the screen to make the loop smooth
      dots[i].color = "black"; // Reset color back to black when the dot resets
      dotsInsideSquare[i] = false; // Reset the inside square status as well
    }

    // If the dot is inside the square and the user clicked, change its color to light grey
    if (dotsInsideSquare[i]) {
      dots[i].color = "lightgrey";
    }

    // Draw the dot
    fill(dots[i].color);
    noStroke();
    ellipse(dots[i].x, dots[i].y, 20, 20); // Draw a circle with a diameter of 20
  }
  
  // Draw the transparent square in the center, above dots
  fill(0, 0, 0, 0); // Transparent fill
  stroke(0); // Black outline
  rect(squareX, squareY, squareSize, squareSize);
}

function mousePressed() {
  // Check if the mouse click is inside the square
  if (
    mouseX > squareX &&
    mouseX < squareX + squareSize &&
    mouseY > squareY &&
    mouseY < squareY + squareSize
  ) {
    // Loop through all the dots to see if any are inside the square
    for (let i = 0; i < dots.length; i++) {
      if (
        dots[i].x > squareX &&
        dots[i].x < squareX + squareSize &&
        dots[i].y > squareY &&
        dots[i].y < squareY + squareSize
      ) {
        dotsInsideSquare[i] = true; // Mark this dot as inside the square after the click
      }
    }
  }
}
