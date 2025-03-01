// Citation: Help from ChatGPT and Deepseek to modify, debugging, and understanding the code

let drops = []; // Array to store raindrops
let ripples = []; // Array to store ripple effects
let flash = false;
let flashTimer = 0;
let flashAlpha = 0;
let blackout = 0; // Smooth transition variable (0 to 255 for fade effect)
let scrollProgress = 0; // Track scroll progress for smooth transition
let rippleTimer = 0; // Timer to control random ripple generation

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) { // Create 100 raindrops
    drops.push(new RainDrop());
  }
}

function draw() {
  background(0);
  
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
}

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
