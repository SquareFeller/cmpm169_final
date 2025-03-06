// DECLARATIONS _______________________________

let currentSketch = 1;

//for sketch 1 ________________
let button, wakeUpButton;
let timerText = "8:00"; // Initial time
let moveCount = 0;
let maxMoves = 5;
let canMove = true; // Cooldown control
let initialX, initialY; // Store initial position
let textOpacity = 255; // Text opacity
let newCanvasX;
let newCanvasY;

//for sketch 2 _______________
let busSound;
let volume = 0;
let increasing = true;
let thoughtBubbles = [];
let scene = 0;
let correctBubble;
let fadeAlpha = 0; // Controls the fade effect
let isFading = false; // Indicates if the fade effect is active

// Array of predefined texts for the bubbles
let bubbleTexts = [
  "Go back?", "Oh....", "Bad day", "Hmm...", "No way...", "No!", "Why?", "How?", "What?"
];

//for sketch 3 ________________
let dots = [];
let numDots = 3;
let dotSpeed = 1.5;
let squareSize = 40;
let squareX, squareY;
let dotsInsideSquare = [];

let startTime;
let sceneDuration = 15000; // 15 seconds in milliseconds

//for sketch 4 ________________
let song;
let analyzer;
let mouse_count = 0;

//for sketch 5 ________________
let drops = []; // Array to store raindrops
let ripples = []; // Array to store ripple effects
let flash = false;
let flashTimer = 0;
let flashAlpha = 0;
let blackout = 0; // Smooth transition variable (0 to 255 for fade effect)
let scrollProgress = 0; // Track scroll progress for smooth transition
let rippleTimer = 0; // Timer to control random ripple generation

//width & height 
let w = 600;
let h = 400;

//sounds
let alarmSound;
let thunderSound;
let officeAmbience;
let officeStampSound;

// PRE LOAD _____________________________________________
function preload() {
  // for sketch 2
    soundFormats('mp3', 'wav');
    busSound = loadSound('bus_sound.mp3'); // Replace with actual bus sound file
    song = loadSound('105265__carminooch__neighbors(louder).mp3');
    alarmSound = loadSound('alarm-clock.mp3');
    thunderSound = loadSound('thunder.mp3');
    officeAmbience = loadSound('office-ambience.mp3');
    officeStampSound = loadSound('office-stamp.mp3');
}

// SET UP _______________________________________________
function setup() {
if (currentSketch === 1){
    // Sketch 1
    console.log("This is sketch 1");
    //createCanvas(400, 400);
    cnv=createCanvas(w,h);
    // print(img.width,img.height);
    newCanvasX = (windowWidth - w)/2;
    newCanvasY = (windowHeight- h)/2;
    cnv.position(newCanvasX,newCanvasY);
    
    button = createButton('Snooze');
    styleButton(button);
    
    // **Set button position initially**
    let startX = (width + newCanvasX) / 2; //- 70;
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
    currentSketch = 2;
    //remove button
    wakeUpButton.remove();
    button.remove();
    setup();
    });

  } else if (currentSketch === 2){
    //Sketch 2
    console.log("This is sketch 2");

    w+=55;
    h += 55;

    //createCanvas(600, 400);
    cnv=createCanvas(w,h);
    // print(img.width,img.height);
    newCanvasX = (windowWidth - w)/2;
    newCanvasY = (windowHeight- h)/2;
    cnv.position(newCanvasX,newCanvasY);

    busSound.loop();
    busSound.setVolume(0);

    // Create bubbles with even horizontal distribution
    let cols = 7; // Number of columns for the grid
    let spacingX = width / (cols + 1); // Horizontal spacing

    for (let i = 0; i < cols; i++) {
      let x = spacingX * (i + 1); // Calculate x position
      let y = height; // Start at the bottom of the canvas

      // Create two bubbles per column
      for (let j = 0; j < 2; j++) {
        let randomText = random(bubbleTexts); // Pick a random text from the array
        let offsetY = j * 20; // Add a small vertical offset for the second bubble
        thoughtBubbles.push(new ThoughtBubble(x, y + offsetY, randomText));
      }
    }

    // Randomly select one bubble as the correct one
    correctBubble = random(thoughtBubbles);
    correctBubble.text = "Click Me!"; // Set the correct bubble's text

  } else if (currentSketch === 3){
    // Sketch 3
    console.log("This is sketch 3");
    w+=55;
    h += 55;
     //createCanvas(windowWidth, windowHeight);
     cnv=createCanvas(w,h);
     // print(img.width,img.height);
     newCanvasX = (windowWidth - w)/2;
     newCanvasY = (windowHeight- h)/2;
     cnv.position(newCanvasX,newCanvasY);

    // Initialize the timer
    startTime = millis();

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
  } else if (currentSketch === 4){
    // Sketch 4
    console.log("This is sketch 4");
    //createCanvas(windowWidth, windowHeight);
    w+=55;
    h += 55;
    cnv=createCanvas(w,h);
     // print(img.width,img.height);
     newCanvasX = (windowWidth - w)/2;
     newCanvasY = (windowHeight- h)/2;
     cnv.position(newCanvasX,newCanvasY);
    song.loop();
    song.setVolume(0.3);
    song.play();
    fft = new p5.FFT(0.9);
    cnv.mouseOut(outmsg);

  } else if (currentSketch === 5){
    // Sketch 5
    console.log("This is sketch 5");

    //createCanvas(windowWidth, windowHeight);
    w+=105;
    h += 55;
    cnv=createCanvas(w,h);
    // print(img.width,img.height);
    newCanvasX = (windowWidth - w)/2;
    newCanvasY = (windowHeight- h)/2;
    cnv.position(newCanvasX,newCanvasY);
    
    for (let i = 0; i < 100; i++) { // Create 100 raindrops
      drops.push(new RainDrop());
    }
  } else {
    console.log("error: currentSketch UNKNOWN");
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
  } else if (currentSketch == 2){
    //Sketch 2
    background(0); // Set background to black

  if (scene === 0) {
    manageBusSound();
  } else if (scene === 1) {
    for (let bubble of thoughtBubbles) {
      bubble.update();
      bubble.display();
    }
  } else if (scene === 2) {
    // Fade to white effect
    if (isFading) {
      fadeAlpha += 2; // Increase the fade level
      if (fadeAlpha >= 255) {
        fadeAlpha = 255; // Clamp the fade level to 255
        isFading = false; // Stop the fade effect
        // Optionally, transition to another scene or perform other actions here
        currentSketch = 3;
        setup();
      }
    }
    fill(255, fadeAlpha); // White with increasing alpha
    noStroke();
    rect(0, 0, width, height); // Cover the entire canvas
  }

  } else if (currentSketch == 3){
    //Sketch 3

    // Check if 15 seconds have passed
    let elapsedTime = millis() - startTime;
    if (elapsedTime >= sceneDuration) {
      // Trigger the scene change (this can be replaced with a new scene)
      currentSketch = 4;
      setup();
    }

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
      officeStampSound.play();
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

  } else if (currentSketch == 4){
    //Sketch 4
    background(10);
    let spectrum = fft.analyze();
    stroke(255,0,0);
    fill(255, 0, 0);
  
    for (let i = 0; i < spectrum.length; i++) {
      let amp = spectrum[i];
      let y = map(amp, 0, 256, height, 0);
      line(i, height, i, y);
    }
    
     if(mouseY > height/2){
         console.log("vol up");
         song.setVolume(1.25);
       fft.smooth(0.01);
        
       }else{
         console.log("vol reset");
         song.setVolume(0.3);
         fft.smooth(0.9);
       }

  } else if (currentSketch == 5){
    //Sketch 5
    background(0);

    //orbitControl();
  
    // Always update raindrops, but only show them if scroll isn't complete
    for (let drop of drops) {
      drop.fall();
      if (scrollProgress < 1) {
        drop.show();
      }
    }

    // Draw and update ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].expand();
      ripples[i].show();
      if (ripples[i].alpha <= 0) {
        ripples.splice(i, 1); // Remove faded ripples
      }
    }

    // Randomly generate ripples on the blank canvas
    if (scrollProgress >= 1 && random(1) < 0.02) { // Adjust probability for ripple generation
      let x = random(width);
      let y = random(height);
      ripples.push(new Ripple(x, y));
      //console.log("Random ripple created at:", x, y); // Debugging
    }

    // Handle lightning effect with fade in/out
    if (flash) {
      flashAlpha = lerp(flashAlpha, 255, 0.1);
    } else {
      flashAlpha = lerp(flashAlpha, 0, 0.05);
    }
    fill(255, flashAlpha);
    rect(0, 0, width, height);

    // Random chance of lightning (reduced frequency)
    if (!flash && random(1) < 0.005) { // Lower probability for less frequent lightning
      flash = true;
      flashTimer = int(random(3, 8)); // Duration of flash effect
    }

    // Stop flash effect after timer expires
    if (flashTimer > 0) {
      flashTimer--;
    } else {
      flash = false;
    }
    
    // Apply blackout fade effect based on scrollProgress
    if (scrollProgress < 1) {
      fill(0, scrollProgress * 255);
      rect(0, 0, width, height);
    }
  } else {
    console.log("error: currentSketch UNKNOWN");
  }
}

// MOUSE PRESS __________________________________________________
function mousePressed() {
  if (currentSketch === 1) {
    // Sketch 1
  } else if (currentSketch === 2) {
    // Sketch 2
    if (scene === 1) {
      for (let i = 0; i < thoughtBubbles.length; i++) {
        let bubble = thoughtBubbles[i];
        if (bubble.isHovered()) {
          if (bubble === correctBubble) {
            scene = 2;
            isFading = true; // Start the fade effect
            console.log("correct button");
          }
          thoughtBubbles.splice(i, 1); // Remove the clicked bubble
          break;
        }
      }
    } 
  } else if (currentSketch === 3) {
    // Sketch 3
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
  } else if (currentSketch === 4) {
    // Sketch 4
  } else if (currentSketch === 5) {
    // Sketch 5
  } else {
    // Not Sketch 1-5
  }
}

// HELPER FUNCTIONS _______________________________________________

// For sketch 1 ___________________________________
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

// For sketch 2 ___________________________________
function manageBusSound() {
  if (increasing) {
    volume += 0.01;
    if (volume >= 1) increasing = false;
  } else {
    volume -= 0.01;
    if (volume <= 0) {
      busSound.stop();
      scene = 1;
    }
  }
  busSound.setVolume(constrain(volume, 0, 1));
}

class ThoughtBubble {
  constructor(x, y, text) {
    this.size = random(80, 100); // Random size between 80 and 100
    this.x = x;
    this.y = y;
    this.text = text;
    this.speed = random(1, 3);
  }

  update() {
    this.y -= this.speed; // Move the bubble upward
    if (this.y < -this.size) {
      this.y = height; // Reset to the bottom if the bubble goes off the top
    }
  }

  display() {
    fill(255); // White fill for bubbles
    stroke(200); // Light gray stroke for bubbles
    ellipse(this.x, this.y, this.size, this.size); // Use the random size

    // Adjust text size based on bubble size
    let textSizeValue = map(this.size, 80, 100, 14, 18); // Map size to text size
    textSize(textSizeValue);

    fill(0); // Black text for visibility
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y);
  }

  isHovered() {
    // Check if the mouse is within the bubble's radius
    return dist(mouseX, mouseY, this.x, this.y) < this.size / 2;
  }
}

// For sketch 4 ____________________________________
function outmsg(){
  console.log("mouse is out");
  mouse_count++;
  if(mouse_count == 4){
    console.log("go to next scene");
    currentSketch = 5;
    song.stop();
    setup();
  }
}

// For sketch 5 ____________________________________
class RainDrop {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.z = random(2, 8);
    this.len = map(this.z, 2, 8, 10, 20);
    this.yspeed = map(this.z, 2, 8, 2, 10);
  }

  fall() {
    this.y += this.yspeed;
    let grav = map(this.z, 2, 8, 0.02, 0.1);
    this.yspeed += grav;

    if (this.y > height) {
      if (scrollProgress >= 0.99) { // Loosen the condition
      }
      this.y = random(-20, 0);
      this.yspeed = map(this.z, 2, 8, 2, 10);
    }
  }

  show() {
    stroke(255);
    strokeWeight(map(this.z, 2, 8, 1, 2));
    line(this.x, this.y, this.x, this.y + this.len);
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.alpha = 255;
  }

  expand() {
    this.radius += 2;
    this.alpha -= 5;
  }

  show() {
    noFill();
    stroke(255, this.alpha);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

function mouseWheel(event) {
  scrollProgress = constrain(scrollProgress + event.delta * 0.001, 0, 1); // Smooth scroll effect
  console.log(scrollProgress);
}