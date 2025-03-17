// DECLARATIONS _______________________________

let currentSketch = 0;

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
let vol_increment = 0.05;

//for sketch 2 _______________
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

//for sketch 3 ________________
let dots = [];
let numDots = 3;
let dotSpeed = 1.5;
let squareSize = 40;
let squareX, squareY;
let dotsInsideSquare = [];

let startTime;
let sceneDuration = 25000; // 25 seconds in milliseconds

//for sketch 4 ________________
let song;
let analyzer;
let mouse_count = 0;

//for sketch 5 ________________
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

//width & height 
let w = 600;
let h = 400;

//sounds
let alarmSound;
let officeAmbience;
let officeStampSound;

// PRE LOAD _____________________________________________
function preload() {
  // for sketch 2
    soundFormats('mp3', 'wav');
    heartbeatSound = loadSound("heartbeat.mp3");
    busSound = loadSound("bus_sound.mp3");
  // for sketch 4
    song = loadSound('105265__carminooch__neighbors(louder).mp3');
  // for sketch 3
    alarmSound = loadSound('alarm-clock.mp3');
    officeAmbience = loadSound('office-ambience.mp3');
    officeStampSound = loadSound('office-stamp.mp3');
  // for sketch 5
    rainSound = loadSound('rainSound.mp3'); 
    rainDropSound = loadSound('rainDrop.mp3'); 
    thunderSound = loadSound('thunderSound.mp3'); // Load thunder sound
}

// SET UP _______________________________________________
function setup() {
if(currentSketch === 0){
  cnv=createCanvas(w,h);
    // print(img.width,img.height);
    newCanvasX = (windowWidth - w)/2;
    newCanvasY = (windowHeight- h)/2;
    cnv.position(newCanvasX,newCanvasY, 'fixed');
    
    // startButton = createButton('Start');
    // //styleButton(button);
    // startButton.size(150, 50);
    // startButton.position(width * 1.15, height * 1.1);
    // startButton.style('font-size', '22px');
    // startButton.mousePressed(() => {
      // currentSketch = 1;
      // startButton.hide();
      // setup();
   // })
}else if (currentSketch === 1){
    // Sketch 1
    cnv=createCanvas(w,h);
    // print(img.width,img.height);
    newCanvasX = (windowWidth - w)/2;
    newCanvasY = (windowHeight- h)/2;
    cnv.position(newCanvasX,newCanvasY);
    
    button = createButton('Snooze');
    styleButton(button);
    
    // **Set button position initially**
    let startX = width / 2 - 70;
    let startY = height / 2;
    button.position((newCanvasX + windowWidth) / 2.9, (newCanvasY + windowWidth) / 5.5 );//(startX, startY);

    // **Store initial position**
    initialX = startX;
    initialY = startY;

    button.mouseOver(moveButton);

    // **Create wake-up button but hide it initially**
    wakeUpButton = createButton('Wake Up');
    styleSmallButton(wakeUpButton);
    wakeUpButton.position((newCanvasX + windowWidth) / 2.85, (newCanvasY + windowWidth) / 4.5 );//(startX + 12, startY + 80);
    wakeUpButton.hide(); // Start hidden

    // button = createButton('Snooze');
    // styleButton(button);
    
    // // **Set button position initially**
    // let startX = (w + newCanvasX) / 2; //- 70;
    // let startY = (h + newCanvasY) / 2;
    // button.position(startX, startY);

    // // **Store initial position**
    // initialX = startX;
    // initialY = startY;

    // button.mouseOver(moveButton);

    // // **Create wake-up button but hide it initially**
    // wakeUpButton = createButton('Wake Up');
    // styleSmallButton(wakeUpButton);
    // wakeUpButton.position(width/2, height/2 - 100); //(w * 1.15, h*1.15);//startY + 100);
    // wakeUpButton.hide(); // Start hidden
    
    wakeUpButton.mousePressed(() => {
    console.log("Wake Up button clicked!");
    currentSketch = 2;
    //remove button
    alarmSound.stop();
    wakeUpButton.remove();
    button.remove();
    setup();
    });

  alarmSound.setVolume(vol_increment);
  alarmSound.loop();
  alarmSound.play();
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

    textAlign(CENTER, CENTER);

    busSound.play();
    busSound.setVolume(busSoundVolume);
    setTimeout(() => {
      fading = true; // Start fading transition
    }, busDuration);

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

    // Play background music
    officeAmbience.loop();

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
    w += 105;
    h += 55;
    cnv=createCanvas(w,h);
    // print(img.width,img.height);
    newCanvasX = (windowWidth - w)/2;
    newCanvasY = (windowHeight- h)/2;
    cnv.position(newCanvasX,newCanvasY);
    
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

  } else {
    console.log("error: currentSketch UNKNOWN");
  }
}

// DRAW __________________________________________________________
function draw() {
  if(currentSketch == 0){
    background(0);
    textSize(70);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, textOpacity); // Control opacity
    text("In Their Shoes", width / 2, height / 2 - 100);  

    textSize(30);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, textOpacity); // Control opacity
    text("Click to Start", width / 2, height / 2 + 50);
  }else if (currentSketch == 1){
    background(0); // Clear the canvas on each refresh

    // **Draw text**
    textSize(70);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, textOpacity); // Control opacity
    text(timerText, width / 2, height / 2 - 100);background(0); // Clear the canvas on each refresh

    // **Draw text**
    textSize(70);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, textOpacity); // Control opacity
    text(timerText, width / 2, height / 2 - 100);

  } else if (currentSketch == 2){
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
  
      if (frameCount % 40 == 0) {
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
  
      if (frameCount % 600 == 0) {
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

  } else if (currentSketch == 3){
    //Sketch 3

    // Check if 15 seconds have passed
    let elapsedTime = millis() - startTime;
    if (elapsedTime >= sceneDuration) {
      // Stop music and trigger the scene change (this can be replaced with a new scene)
      officeAmbience.stop();
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
    if (dotsInsideSquare[i] && dots[i].color !== "lightgrey") {
      dots[i].color = "lightgrey";
      officeStampSound.play(); // Play sound whenever the color changes to lightgrey
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

    // Smooth scroll effect
    scrollProgress = lerp(scrollProgress, targetScrollProgress, 0.1);
    
    // Smooth thumb movement
    thumbY = lerp(thumbY, map(scrollProgress, 0, 1, scrollbarY, scrollbarY + scrollbarHeight - thumbHeight), 0.2);
  
    // Adjust rain sound volume
    let volume = map(scrollProgress, 0, 1, 1, 0.1); // Reduce volume as user scrolls down
    rainSound.setVolume(constrain(volume, 0, 1));
    thunderSound.setVolume(constrain(volume, 0, 1));
  
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

  } else {
    console.log("error: currentSketch UNKNOWN");
  }
}

// MOUSE PRESS __________________________________________________
function mousePressed() {
  if(currentSketch === 0){
    currentSketch = 1;
    setup();
  }else if (currentSketch === 1) {
    // Sketch 1
  } else if (currentSketch === 2) {
    // Sketch 2
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].isClicked()) {
        if (bubbles[i].isSpecial) {
          console.log("clicked special thought");
          currentSketch = 3;
          heartbeatSound.stop();
          setup();
        }
        bubbles.splice(i, 1);
        break;
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
    if (scrollProgress > 0.99) {
      ripples.push(new Ripple(mouseX, mouseY));
  
      // Play raindrop sound when manually clicking to create ripples
      rainDropSound.play();
    }
    if (mouseX > scrollbarX && mouseX < scrollbarX + scrollbarWidth &&
        mouseY > thumbY && mouseY < thumbY + thumbHeight) {
      dragging = true;
    }
  } else {
    // Not Sketch 1-5
  }
}

// MOUSE OTHER (for sketch 5) __________________________________________________
function mouseReleased() {
  if (currentSketch === 5){
    dragging = false;
  }
}

function mouseDragged() {
  if (currentSketch === 5){
    if (dragging) {
      let newThumbY = constrain(mouseY, scrollbarY, scrollbarY + scrollbarHeight - thumbHeight);
      targetScrollProgress = map(newThumbY, scrollbarY, scrollbarY + scrollbarHeight - thumbHeight, 0, 1);
    }
  }
}

// Smooth scroll wheel movement
function mouseWheel(event) {
  if (currentSketch === 5){
    targetScrollProgress = constrain(targetScrollProgress + event.delta * 0.002, 0, 1);
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

  let x = random(windowWidth - w, w + newCanvasX - buttonWidth - 10) ;
  let y = random(h / 2, h + newCanvasY- buttonHeight - 20) ;

  button.position(x, y);
}

function moveButton() {
  if (moveCount < maxMoves && canMove) {
      moveCount++;
      alarmSound.setVolume(vol_increment += 0.2);
  //  alarmSound.rate(vol_increment);
      fadeOutBoth(); // **Fade out both text and button simultaneously**
      
      setTimeout(() => {
          canMove = true;
      }, 500);
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
console.log("in fade out text");
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
console.log("in fade out both");
  let textFadeOut = setInterval(() => {
      textOpacity -= 25;
      if (textOpacity <= 0) {
          clearInterval(textFadeOut);
          textOpacity = 0;
          updateTime();
      }
  }, 25);

  let buttonOpacity = 1;
  let buttonFadeOut = setInterval(() => {
      buttonOpacity -= 0.3;
      button.style('opacity', buttonOpacity);
      if (buttonOpacity <= 0) {
          clearInterval(buttonFadeOut);
          button.style('opacity', 0);

          setTimeout(() => {
              if (moveCount >= maxMoves) {
                
                  button.position(wakeUpButton.x - 15, wakeUpButton.y - 75);
                  console.log(button.position());
                  wakeUpButton.show();
              } else {
                  positionButtonRandomly();
              }
              fadeInBoth();
          }, 500);
      }
  }, 25);
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
      buttonOpacity += 0.5;
      button.style('opacity', buttonOpacity);
      if (buttonOpacity >= 1) {
          clearInterval(buttonFadeIn);
      }
  }, 50);

  if (moveCount >= maxMoves) {
      wakeUpButton.show();
    button.x = wakeUpButton.x;
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
    let bubbleSize = textWidthValue + padding;
    let maxSize = 200;  // Set a maximum size limit for the bubbles
    return min(bubbleSize, maxSize);
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