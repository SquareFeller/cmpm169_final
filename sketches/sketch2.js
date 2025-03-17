let bubbles = [];
let specialBubble;
let heartbeatSound, busSound;
let scene = "bus"; // Start with bus scene
let busDuration = 5000; // Bus sound lasts 5 seconds
let fadeAlpha = 0; // For fading transition
let fading = false; // Track if fading is happening
let busSoundVolume = 1; // Volume of the bus sound

// Rectangle (Bus) properties
let busX = -600; // Start further off-screen
let busSpeed = 4; // Speed of the bus
let busWidth = 800; // Increased width
let busHeight = 240; // Increased height

function preload() {
  heartbeatSound = loadSound("heartbeat.mp3");
  busSound = loadSound("bus_sound.mp3");
}

function setup() {
  createCanvas(655, 455); // Larger canvas to fit bigger bus
  textAlign(CENTER, CENTER);

  busSound.play();
  busSound.setVolume(busSoundVolume);
  setTimeout(() => {
    fading = true; // Start fading transition
  }, busDuration);
}

function draw() {
  if (scene === "bus") {
    background(0);

    // Move the rectangle (bus)
    if (busX < width + busWidth) {
      busX += busSpeed;
    }

    // Draw the moving rectangle (bus)
    fill(219, 219, 219); //color for the bus
    noStroke();
    rect(busX, 220, busWidth, busHeight, 20); // Even bigger bus with rounded edges

    // Bus windows
    fill(155, 186, 213);
    rect(busX + 70, 250, 120, 90, 5);
    rect(busX + 220, 250, 120, 90, 5);
    rect(busX + 370, 250, 120, 90, 5);
    rect(busX + 520, 250, 120, 90, 5);
    rect(busX + 670, 250, 130, 90, 5);


    // Wheels
    fill(50);
    ellipse(busX + 200, 450, 150, 150);
    ellipse(busX + 620, 450, 150, 150);
    
    fill(105, 105, 105);
    ellipse(busX + 200, 450, 100, 100);
    ellipse(busX + 620, 450, 100, 100);
    
    //light
    fill(255, 255, 188);
    rect(busX + 760, 350, 40, 40);
    
    /*engine
    fill(192, 192, 190);
    rect(busX + 40, 455, 180, 130, 5);*/
    
    //tail light
    fill(182, 101, 101);
    rect(busX, 330, 20, 70, 5);
    
    //ad
    fill(148, 182, 109);
    rect(busX + 290, 370, 230, 60, 5);

    // Gradual fade to white after bus leaves
    if (fading) {
      fadeAlpha += 5;
      busSoundVolume -= 0.02; // Reduce the volume gradually
      busSound.setVolume(busSoundVolume);

      if (fadeAlpha >= 255 || busSoundVolume <= 0) {
        fadeAlpha = 255;
        busSoundVolume = 0;
        busSound.stop();
        fading = false;
        scene = "bubbles";
        heartbeatSound.loop();
      }
      fill(255, fadeAlpha);
      rect(0, 0, width, height);
    }
  } else if (scene === "bubbles") {
    background("white");

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
        "What do I do now?",
      ];

      let numberOfBubbles = int(random(2, 3));
      for (let i = 0; i < numberOfBubbles; i++) {
        let newBubble = new ThoughtBubble(random(width), height, random(sentences), false);
        bubbles.push(newBubble);
      }
    }

    if (frameCount % 500 == 0) {
      let specialSentence = "I should just walk...";
      specialBubble = new ThoughtBubble(random(width), height, specialSentence, true);
      bubbles.push(specialBubble);
    }

    for (let i = bubbles.length - 1; i >= 0; i--) {
      bubbles[i].update();
      bubbles[i].display();
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
    this.isSpecial = isSpecial;
    this.size = this.calculateBubbleSize();
    this.speed = random(1, 2);
    this.alpha = 255;
  }

  update() {
    this.y -= this.speed;
    this.alpha -= 0.5;
    if (this.alpha < 0) this.alpha = 0;
  }

  calculateBubbleSize() {
    let padding = 15;
    let textWidthValue = textWidth(this.text);
    return max(textWidthValue + padding, 80);
  }

  display() {
    if (this.isSpecial) {
      fill("gray");
    } else {
      fill(255, 255, 255, this.alpha);
      stroke(0);
    }
    ellipse(this.x, this.y, this.size, this.size / 2);
    fill(0, this.alpha);
    textSize(12);
    text(this.text, this.x, this.y);
  }

  isClicked() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    return distance < this.size / 2;
  }
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].isClicked()) {
      if (bubbles[i].isSpecial) {
        console.log("clicked special thought");
      }
      bubbles.splice(i, 1);
      break;
    }
  }
}