let recorder; //变量用于接收pathRecorder实例

let pathToggle = true;//显示路径


function setup() {
  createCanvas(800, 800);

  recorder = new p5pathRecorder(); //创建实例path recorder
  recorder.load('myPaths.json') //载入外部文件
  // console.log(recorder.buffer) //查看buffer缓存

}

function draw() {
  background(0);
  stroke(255);

    // recorder.speed = 0.5 //change the playback speed

    let pos = recorder.play() //play back the recording

    // console.log(pos)


  if(mouseIsPressed){
    recorder.recordFrame(mouseX,mouseY) //往buffer区加新的点
  }else{
    //dont draw the ellipse while recording.
    ellipse(pos.x, pos.y, 100, 100)
  }

  if(pathToggle){
    recorder.showPaths(); //show the path of the recording using points
  }
}


function keyPressed(){
  if(key == 'c'){
    //clear
    recorder.clear()
  }

  if(key == 's'){
    recorder.save('myPaths') //save out the paths (you'll need to import them back into the editor and use the load() function to load the json file in the setup or preload
  }

  if(key == 'p'){
    pathToggle = !pathToggle
  }

  if(key == 'r'){
    recorder.startLocation(0)
  }


}
