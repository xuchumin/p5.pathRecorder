let recordings = [] //store all of the paths!

let pathToggle = true;

function setup() {
  createCanvas(800, 800);

  //create multiple path recordings
  for(let i = 0 ; i <= 4; i ++){
    let recorder = new p5pathRecorder(); //instantiate a new path recorder
    recorder.load('myPaths-'+ i +'.json') //load some existing paths from a file
    // console.log(recorder.buffer) //see the paths buffer
    recordings.push(recorder)
  }

}

function draw() {
  background(0);
  stroke(255);

  if(pathToggle){
    for(let i = 0 ; i < recordings.length; i ++){
        recordings[i].showPaths()
    }
  }

  if(keyIsPressed && mouseIsPressed){
    // console.log(key)
    if(key == 1 || key == 2 || key == 3 || key == 4 || key == 5){

      // console.log(key-1)
      recordings[key-1].recordFrame(mouseX,mouseY)
    }
  }else{
    //dont playback while recording paths


    let zero = recordings[0].play()
    let one = recordings[1].play()
    let two = recordings[2].play()
    let three = recordings[3].play()
    let four = recordings[4].play()

    ellipse(zero.x, zero.y, 100)
    rect(one.x, one.y, 100, 100)
    ellipse(two.x, two.y, 100, 20)
    rect(three.x, three.y, 20, 100)
    ellipse(four.x, four.y, 50)

    // or (only ellipses)

    // for(let i = 0 ; i < recordings.length; i ++){
    //     let pos = recordings[i].play()
    //     ellipse(pos.x,pos.y,50)
    // }

  }
}


function keyPressed(){
  if(key == 'c'){
    //clear them all!
    for(let i = 0 ; i < recordings.length; i ++){
      recordings[i].clear()
    }
  }

  if(key == 'p'){
    pathToggle = !pathToggle
  }

}
