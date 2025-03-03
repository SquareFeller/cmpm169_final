let song;
let analyzer;
let mouse_count = 0;

function preload(){
  song = loadSound('105265__carminooch__neighbors(louder).mp3')
}

function setup() {
  canv = createCanvas(400, 400);
  song.loop();
  song.setVolume(0.3);
  song.play();
  fft = new p5.FFT(0.9);
  canv.mouseOut(outmsg);
}

function outmsg(){
  console.log("mouse is out");
  mouse_count++;
  if(mouse_count == 5){
    console.log("go to next scene");
  }
}

function draw() {
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
}
  