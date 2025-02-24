//Citation: Help from ChatGPT to help me modify, debugging, and understanding the code

let button, wakeUpButton;
let timerText = "8:00"; // Initial time
let moveCount = 0;
let maxMoves = 5;
let canMove = true; // Cooldown control
let initialX, initialY; // Store initial position
let textOpacity = 255; // Text opacity

function setup() {
    createCanvas(400, 400);
    
    button = createButton('Snooze');
    styleButton(button);
    
    // **Set button position initially**
    let startX = width / 2 - 70;
    let startY = height / 2;
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
}

function draw() {
    background(0); // Clear the canvas on each refresh

    // **Draw text**
    textSize(70);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, textOpacity); // Control opacity
    text(timerText, width / 2, height / 2 - 100);
}

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

    let x = random(10, width - buttonWidth - 10);
    let y = random(height / 2, height - buttonHeight - 20);

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
