let scene = "bus";

let bubbles = [];
let specialBubble;  // Declare it globally so it can be accessed in mousePressed
let heartbeatSound;

let busSound;
let volume = 0;
let increasing = true;

let img;
let flashActive = false;

function preload(){
  heartbeatSound = loadSound('heartbeat.mp3');
  busSound = loadSound("bus_sound.mp3");
  
  // Load an image before setup
  img = loadImage('bus-drawn.jpg'); // Replace with your image path
}


function setup() {
  createCanvas(600, 600);  // Larger canvas
  textAlign(CENTER, CENTER);
  
  if (scene == "bus"){
    // Set up bus sound
    busSound.loop();
    busSound.setVolume(0);
    // Place image
    image(img, 0, 0, width, height);
  }
  else{
  // Play sound
  heartbeatSound.loop();
  }
}

function draw() {
  if (scene == "bus"){
    // Play sound
    manageBusSound();
    
    // Apply blur filter with a specific level
    filter(BLUR, 1.8);

    if (flashActive) {
      applyTransition(); // Call white flash effect
    }
  }else{
    background('white');

    // Create new regular bubbles more frequently (every 40 frames)
    if (frameCount % 50 == 0) {
      let sentences = [
        "When will the next one get here?",
        "Will they be mad at me?",
        "Not again!",
        "Should I wait for the next one?",
        "I can't be late again?",
        "I ran all the way here for nothing!",
        "I'm going to be late",
        "Why does this always happen to me!",
        "What do I do now?"
      ];

      // Create 2-3 new bubbles at once for more bubbles on the screen
      let numberOfBubbles = int(random(2, 2));  // Randomly generate 2 to 3 bubbles at once
      for (let i = 0; i < numberOfBubbles; i++) {
        let newBubble = new ThoughtBubble(random(width), height, random(sentences), false);
        bubbles.push(newBubble);
      }
    }

    // Create a special bubble every 100 frames, and update the global specialBubble
    if (frameCount % 500 == 0) {
      let specialSentence = "I should just walk...";
      specialBubble = new ThoughtBubble(random(width), height, specialSentence, true);
      bubbles.push(specialBubble);
    }

    // Update and display all bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
      bubbles[i].update();
      bubbles[i].display();

      // Remove the bubble when it goes off-screen
      if (bubbles[i].y < 0) {
        bubbles.splice(i, 1);
      }
    }
  }
}

class ThoughtBubble {
  constructor(x, y, text, isSpecial) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.isSpecial = isSpecial;  // Flag to check if it's a special bubble
    this.size = this.calculateBubbleSize();
    this.speed = random(1, 2);  // Slower rising bubbles
    this.alpha = 255;
  }

  update() {
    this.y -= this.speed; // Move bubble upwards
    this.alpha -= 0.5;  // Gradually fade out the bubble
    if (this.alpha < 0) this.alpha = 0; // Prevent negative alpha values
  }

  calculateBubbleSize() {
    // Calculate the bubble size based on the text width
    let padding = 15;  // Smaller padding for smaller bubbles
    let textWidthValue = textWidth(this.text);
    return max(textWidthValue + padding, 80); // Ensure the bubble is at least 80px wide
  }

  display() {
    // Draw the bubble
    if (this.isSpecial) {
      fill('gray');  // Blue color for special bubble
    } else {
      fill(255, 255, 255, this.alpha);  // Regular bubble color (white)
      stroke(0);  // Regular bubble border (black)
    }
    
    ellipse(this.x, this.y, this.size, this.size / 2); // Make the bubble slightly oval for variety

    // Draw the text inside the bubble
    fill(0, this.alpha);  // Text color (black with fading effect)
    textSize(12);  // Smaller text size
    text(this.text, this.x, this.y); // Display the sentence
  }

  // Check if the mouse clicks inside the bubble
  isClicked() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    return distance < this.size / 2;
  }
}

function applyTransition() {
  // Set a white rectangle to simulate the flash
  fill(255, 255, 255, 50); // White color with some transparency
  noStroke();
  rect(0, 0, width, height); // Flash effect covering the entire canvas
  
  //set scene to thoughts
  scene = "thoughts";
  setup();
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

// Handle mouse clicks
function mousePressed() {
  
  if(scene == "bus"){
      // Start the transition when a key is pressed (for example)
      flashActive = true;
  } else{
    // Loop through all bubbles and check if one was clicked
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].isClicked()) {
        // If it's the special bubble, output to the console
        if (bubbles[i].isSpecial) {
          console.log("clicked special thought");
        }
        // Remove the clicked bubble from the array
        bubbles.splice(i, 1);
        break;  // Exit the loop after removing the clicked bubble
      }
    }
  }
  
}