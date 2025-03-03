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

function preload() {
  soundFormats('mp3', 'wav');
  busSound = loadSound('bus_sound.mp3'); // Replace with actual bus sound file
}

function setup() {
  createCanvas(800, 600);
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
}

function draw() {
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
      }
    }
    fill(255, fadeAlpha); // White with increasing alpha
    noStroke();
    rect(0, 0, width, height); // Cover the entire canvas
  }
}

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

function mousePressed() {
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
}
