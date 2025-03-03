// DECLARATIONS _______________________________

let currentSketch = 1;

//for sketch 1
let button, wakeUpButton;
let timerText = "8:00"; // Initial time
let moveCount = 0;
let maxMoves = 5;
let canMove = true; // Cooldown control
let initialX, initialY; // Store initial position
let textOpacity = 255; // Text opacity
let newCanvasX;
let newCanvasY;
// for sketch 2


//for sketch 3
let dots = [];
let numDots = 3;
let dotSpeed = 1.5;
let squareSize = 40;
let squareX, squareY;
let dotsInsideSquare = [];

//for sketch 4 
let song;
let analyzer;
let mouse_count = 0;
// SET UP _______________________________________________
function setup() {
  if (currentSketch === 1) {
    // Sketch 1
    //createCanvas(400, 400);
  cnv=createCanvas(600,400);
  // print(img.width,img.height);
  newCanvasX = (windowWidth - 600)/2;
  newCanvasY = (windowHeight- 400)/2;
  cnv.position(newCanvasX,newCanvasY)
    
    button = createButton('Snooze');
    styleButton(button);
    
    // **Set button position initially**
    let startX = (width + newCanvasX) / 2 - 70;
    let startY = (height + newCanvasY) / 2;
    button.position(startX, startY);

    // **Store initial position**
    initialX = startX;
    initialY = startY;

    button.mouseOver(moveButton);

    // **Create wake-up button but hide it initially**
    wakeUpButton = createButton('Wake Up');
    styleSmallButton(wakeUpButton);
    wakeUpButton.position(startX + 12, startY + 80);
    wakeUpButton.hide(); // Start hidden
    
    wakeUpButton.mousePressed(() => {
    console.log("Wake Up button clicked!");
    currentSketch = 3;
    //remove button
    wakeUpButton.remove();
    button.remove();
    setup();
    });
  }
  else if (currentSketch === 3) {
    // Sketch 3
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
}
// DRAW __________________________________________________________
function draw() {
  if (currentSketch == 1){
    background(0); // Clear the canvas on each refresh

    // **Draw text**
    textSize(70);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, textOpacity); // Control opacity
    text(timerText, width / 2, height / 2 - 100);
  }
  else if (currentSketch == 3){
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
}

// MOUSE PRESS __________________________________________________
function mousePressed() {
  if (currentSketch == 3){
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
}

// HELPER FUNCTIONS _______________________________________________
function styleButton(btn) {
    btn.style('font-size', '22px');
    btn.style('padding', '15px 30px');
    btn.style('border', 'none');
    btn.style('border-radius', '25px');
    btn.style('background', '#FFAF07');
    btn.style('color', 'white');
    btn.style('font-weight', 'bold');
    btn.style('cursor', 'pointer');
    btn.style('transition', 'opacity 0.3s ease');
}

function styleSmallButton(btn) {
    btn.style('font-size', '18px');
    btn.style('padding', '10px 20px');
    btn.style('border', 'none');
    btn.style('border-radius', '15px');
    btn.style('background', '#ff4747');
    btn.style('color', 'white');
    btn.style('font-weight', 'bold');
    btn.style('cursor', 'pointer');
}

function positionButtonRandomly() {
    let buttonWidth = 130;
    let buttonHeight = 40;

    let x = random(windowWidth - width, width + newCanvasX - buttonWidth - 10);
    let y = random(height / 2, height + newCanvasY- buttonHeight - 20);

    button.position(x, y);
}

function moveButton() {
    if (moveCount < maxMoves && canMove) {
        canMove = false;
        moveCount++;
        
        fadeOutBoth(); // **Fade out both text and button simultaneously**
        
        setTimeout(() => {
            canMove = true;
        }, 1500);
    }
}

function updateTime() {
    let [hours, minutes] = timerText.split(":").map(Number);
    minutes += 5;
    if (minutes >= 60) {
        minutes -= 60;
        hours++;
    }
    timerText = `${hours}:${minutes.toString().padStart(2, "0")}`;
}

// **Text fade-out effect**
function fadeOutText() {
    let fadeOutInterval = setInterval(() => {
        textOpacity -= 25;
        if (textOpacity <= 0) {
            clearInterval(fadeOutInterval);
            textOpacity = 0;
            updateTime();
            fadeOutAndMove();
        }
    }, 50);
}

function fadeOutBoth() {
    let textFadeOut = setInterval(() => {
        textOpacity -= 25;
        if (textOpacity <= 0) {
            clearInterval(textFadeOut);
            textOpacity = 0;
            updateTime();
        }
    }, 50);

    let buttonOpacity = 1;
    let buttonFadeOut = setInterval(() => {
        buttonOpacity -= 0.1;
        button.style('opacity', buttonOpacity);
        if (buttonOpacity <= 0) {
            clearInterval(buttonFadeOut);
            button.style('opacity', 0);

            setTimeout(() => {
                if (moveCount >= maxMoves) {
                    button.position(initialX, initialY);
                    wakeUpButton.show();
                } else {
                    positionButtonRandomly();
                }
                fadeInBoth();
            }, 500);
        }
    }, 50);
}

function fadeInBoth() {
    let textFadeIn = setInterval(() => {
        textOpacity += 25;
        if (textOpacity >= 255) {
            clearInterval(textFadeIn);
            textOpacity = 255;
        }
    }, 50);

    let buttonOpacity = 0;
    button.style('opacity', buttonOpacity);

    let buttonFadeIn = setInterval(() => {
        buttonOpacity += 0.1;
        button.style('opacity', buttonOpacity);
        if (buttonOpacity >= 1) {
            clearInterval(buttonFadeIn);
        }
    }, 50);

    if (moveCount >= maxMoves) {
        wakeUpButton.show();
        let wakeUpOpacity = 0;
        wakeUpButton.style('opacity', wakeUpOpacity);

        let wakeUpFadeIn = setInterval(() => {
            wakeUpOpacity += 0.1;
            wakeUpButton.style('opacity', wakeUpOpacity);
            if (wakeUpOpacity >= 1) {
                clearInterval(wakeUpFadeIn);
            }
        }, 50);
    }
}

