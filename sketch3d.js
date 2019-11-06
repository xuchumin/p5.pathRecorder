//switch to the 2d example in the index.html

let recorder; //make a variable for the path recoder class to exist in

let zDepth = 0;

function setup() {
  createCanvas(400, 400, WEBGL);
    
  recorder = new p5pathrecorder(); //instantiate a new path recorder
  // recorder.load('myPaths.json') //load some existing paths from a file
  // console.log(recorder.buffer) //see the paths buffer
  
  
}

function draw() {
  background(220);
  
    recorder.speed = 0.5 //change the playback speed 
  
    let pos = recorder.play() //play back the recording
  
    // console.log(pos)
  
     
  if(mouseIsPressed){
    
    zDepth = zDepth - 10
    recorder.recordFrame(mouseX,mouseY,zDepth) //record a frame to the buffer
    
  }else{
    zDepth = 0
    //dont draw the box while recording.
    push()
    translate(-height/2,-width/2)
    translate(pos.x,pos.y,pos.z)
    box(100,100,100)
    pop()
  }
  
  push()
    translate(-height/2,-width/2)
    recorder.showPaths(); //show the path of the recording using points
  pop()
}


function keyPressed(){
  
  recorder.save('myPaths') //save out the paths (you'll need to import them back into the editor and use the load() function to load the json file in the setup or preload

  
}