let serial;
let latestData = "waiting for data";

var fft, peakDetect;
var ellipseWidth = 10;

let drums;
let synth;
let bass;

let synth2;
let soundLoop;
//let notePattern = [85, 78, 87, 85, 90, 80, 82];
let notePattern = [70, 68, 75, 66, 63, 66, 75, 68];

function preload(){
  drums = loadSound('arduino_drums2.wav')
  bass = loadSound('arduino_bass.wav');
}
function setup() {

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();

  let intervalInSeconds = 0.07;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  synth2 = new p5.MonoSynth(); //will be series of notes
  setBPM(100, 0);

  synth = new p5.PolySynth(); //"solo" note
  //env = new p5.Envelope();
  //env.setADSR(.3, .1, .1, .1);
 //background(200);

 serial = new p5.SerialPort();

 serial.list();
 serial.open('COM4');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);//trim removes white spaces
 if (!currentString) return;
 //console.log(currentString);
 latestData = currentString.split(',');
 console.log(latestData);

}

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex]);
  synth2.play(note, 0.15, timeFromNow);
  //background(noteIndex * 360 / notePattern.length, 50, 100);
}
function draw() {

  createCanvas(windowWidth,windowHeight);
  background(30);
  	let freqs = fft.analyze();

  	push();
  	noStroke();
  	  fill(0,110,200); // spectrum is green
  	  for (let i = 0; i< freqs.length; i++){
  	    let x = map(i, 0, freqs.length, 0, width);
  	    let h = -height + map(freqs[i], 0, 255, height, 0);
  	    rect(x, height, width / freqs.length, h )
  	  }
  	  pop();

  if (latestData[0] == 1){ //1st button, synth
    playSynth();
  }

  if (latestData[1] == 1){ //2nd button, drums

    if (drums.isPlaying()){
      drums.stop();
    }
    else{
      drums.loop(.05);
  }
}
  if (latestData[2] == 1){ //3rd button, bass

    if (bass.isPlaying()){
      bass.stop();
    }
    else{
      bass.loop(.05);
    }
  }

  if(latestData[3] == 1) {
    // ensure audio is enabled
    userStartAudio();

    if (soundLoop.isPlaying) {
      soundLoop.stop();
    } else {
      // start the loop
      soundLoop.start();
    }
  }

 //background(255,255,255);
 fill(120, 20, 50);
 ellipse(20, 30, latestData[0]*50, 50);
 ellipse(50, 30, latestData[1]*50, 50);
 ellipse(80, 30, latestData[2]*50, 50);
 ellipse(110, 30, latestData[3]*50, 50);
}
 function writeSerial(writeOut){
 	serial.write(writeOut);
 }
 function playSynth(){
let notes = ["F#4", "D#4", "C#4"];
   synth.play(random(notes), 0.2, 0.2, 0.1);
 }
