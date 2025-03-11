let drops = [];
let ripples = [];
let flash = false;
let flashTimer = 0;
let flashAlpha = 0;
let scrollProgress = 0;
let targetScrollProgress = 0;

let scrollbarX, scrollbarY, scrollbarHeight, scrollbarWidth = 20, thumbY, thumbHeight = 100;
let dragging = false;

let rainSound, rainDropSound, thunderSound;

function preload() {
  rainSound = loadSound('rainSound.mp3'); 
  rainDropSound = loadSound('rainDrop.mp3'); 
  thunderSound = loadSound('thunderSound.mp3'); // Load thunder sound
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scrollbarX = width - 40;
  scrollbarY = 20;
  scrollbarHeight = height - 40;
  thumbY = scrollbarY;

  for (let i = 0; i < 100; i++) {
    drops.push(new RainDrop());
  }

  // Play the looping rain sound
  rainSound.loop();
  rainSound.setVolume(0.8);
}

function draw() {
  background(0);
  
  // Smooth scroll effect
  scrollProgress = lerp(scrollProgress, targetScrollProgress, 0.1);
  
  // Smooth thumb movement
  thumbY = lerp(thumbY, map(scrollProgress, 0, 1, scrollbarY, scrollbarY + scrollbarHeight - thumbHeight), 0.2);

  // Adjust rain sound volume
  let volume = map(scrollProgress, 0, 1, 1, 0.1); // Reduce volume as user scrolls down
  rainSound.setVolume(constrain(volume, 0, 1));

  // Stop sound when fully scrolled down
  if (scrollProgress >= 1) {
    rainSound.stop();
  } else if (!rainSound.isPlaying()) {
    rainSound.loop(); // Restart if not playing
  }

  for (let drop of drops) {
    drop.fall();
    if (scrollProgress < 1) {
      drop.show();
    }
  }

  // Generate ripples when fully scrolled
  if (scrollProgress > 0.99 && random(1) < 0.02) { 
    let x = random(width);
    let y = random(height);
    ripples.push(new Ripple(x, y));

    // Play raindrop sound when ripple is generated
    rainDropSound.play();
  }

  if (flash) {
    flashAlpha = lerp(flashAlpha, 255, 0.1);
  } else {
    flashAlpha = lerp(flashAlpha, 0, 0.05);
  }
  fill(255, flashAlpha);
  rect(0, 0, width, height);

  if (!flash && random(1) < 0.005) {
  flash = true;
  flashTimer = int(random(3, 8));

  // Play thunder sound when lightning occurs
  thunderSound.setVolume(4);
  thunderSound.play();
  }


  if (flashTimer > 0) {
    flashTimer--;
  } else {
    flash = false;
  }

  if (scrollProgress < 1) {
    fill(0, scrollProgress * 255);
    rect(0, 0, width, height);
  }
  
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].expand();
    ripples[i].show();
    if (ripples[i].alpha <= 0) {
      ripples.splice(i, 1);
    }
  }

  // Draw scrollbar
  fill(200);
  noStroke();
  rect(scrollbarX, scrollbarY, scrollbarWidth, scrollbarHeight, 10);

  // Draw thumb
  fill(0);
  rect(scrollbarX, thumbY, scrollbarWidth, thumbHeight, 10);
}

function mousePressed() {
  if (scrollProgress > 0.99) {
    ripples.push(new Ripple(mouseX, mouseY));

    // Play raindrop sound when manually clicking to create ripples
    rainDropSound.play();
  }
  if (mouseX > scrollbarX && mouseX < scrollbarX + scrollbarWidth &&
      mouseY > thumbY && mouseY < thumbY + thumbHeight) {
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    let newThumbY = constrain(mouseY, scrollbarY, scrollbarY + scrollbarHeight - thumbHeight);
    targetScrollProgress = map(newThumbY, scrollbarY, scrollbarY + scrollbarHeight - thumbHeight, 0, 1);
  }
}

// Smooth scroll wheel movement
function mouseWheel(event) {
  targetScrollProgress = constrain(targetScrollProgress + event.delta * 0.002, 0, 1);
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
