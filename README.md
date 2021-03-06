# p5.pathRecorder
![p5.pathRecorder](p5.pathRecorder.png)
#### record, save, and recall animation paths for your p5.js sketches!

p5.pathRecorder offers various methods to interact, recall, store, and save paths of animation. This library's goal is to make gesture based and irregular animations easier and quicker to develop, use, and replicate. The library is designed to work in both 2d and 3d (WEBGL) modes of [p5.js](http://p5js.org)

This library is very happy when used with gestural inputs such as mouse position, camera tracking, drawing tablets, touch controls, [p5.bots](https://github.com/sarahgp/p5bots) sensor data, etc.

[How to add a library to p5.js](https://p5js.org/libraries/)

## Interactive examples
<!-- ##### 2d coordinate example    -->
+ [2d basics](https://bmoren.github.io/p5.pathRecorder/examples/2dbasic)  
+ [3d basics](https://bmoren.github.io/p5.pathRecorder/examples/3dbasic)  
+ [multiple paths](https://bmoren.github.io/p5.pathRecorder/examples/multipath)  
+ [random animations from a bank of saved animations](https://bmoren.github.io/p5.pathRecorder/examples/randombank)
+ [building a scene of animation with images](https://bmoren.github.io/p5.pathRecorder/examples/imagescene)
+ [playback modes & speed](https://bmoren.github.io/p5.pathRecorder/examples/playback_modes)


![p5.pathRecorder capability as an animation: drawings by Sara Fowler](birds.gif)     
Drawings by [Sara Fowler](http://saradellefowler.com)


---
## Reference

#### Table of Contents
##### Core
  + [p5pathRecorder class](#p5pathRecorder)
  + [.recordFrame()](#recordFrame)
  + [.play()](#play)

##### Utility
  + [.onEnded()](#onEnded)  
  + [.buffer](#buffer)
  + [.speed](#speed)
  + [.clear()](#clear)
  + [.startLocation()](#startLocation)
  + [.showPaths()](#showPaths)

##### Save & Recall
+ [.save()](#save)
+ [.load()](#load)

---

#### p5pathRecorder class
###### p5pathRecorder()
实例化一个新的path recorder
```javascript
let recorder;

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
}
```
#### .recordFrame()
###### .recordFrame(x,y,[z])
将一帧位置数据记录到内部缓冲区
```javascript
let recorder;

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
}

function draw(){
  if(mouseIsPressed){ //only record then the mouse is being pressed
    recorder.recordFrame(mouseX, mouseY); // capture this frames mouse position
  }
}
```

#### .play([mode])
plays back the buffer and return the value of the current frame. Returns an [p5vector](https://p5js.org/reference/#/p5.Vector) object with recorded x,y,[z] coordinates from the current location in the internal buffer. Returns an object containing x,y,z keys with values of 0 if the buffer is not filled. It's important to only call play() once in the draw function otherwise each additional call will double the speed. Because of this, it's best assigned to a variable and used from that variable throughout the sketch. play() takes an optional string to define the playback mode. The default is `forward` if no string is passed into play().


##### playback modes
`forward` : plays back through the buffer forwards, as it was recorded (default).\
`reverse` : plays back through the buffer in reverse, backwards from how it was recorded.\
`alternate` : alternates the playback in a palindrome fashion. Bounces back and forth between forward and reverse in a back-to-back infinite loop.  


```javascript
let recorder;

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
}

function draw(){

  let pos = recorder.play() //play back the recording
  // let pos = recorder.play('alternate') //play recording in alternating mode!

  if(mouseIsPressed){
    recorder.recordFrame(mouseX,mouseY) //record a frame to the buffer
  }else{
    //dont draw the ellipse while recording.
    ellipse(pos.x, pos.y, 100, 100)
  }
}
```

#### .onEnded()
###### .onEnded(function(){ //callback })
fires a callback function when the animation loop has ended
```javascript
let recorder; //make a variable for the path recorder class to exist in

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
  recorder.load('myPaths.json') //load some existing paths from a file
  // console.log(recorder.buffer) //see the paths buffer
}
function draw(){
  let pos = recorder.play()

  //listen for the end of the animation loop
  recorder.onEnded(function(){
    console.log('the animation loop has ended!')
  })
}
```

#### .buffer
an internal variable containing the animation buffer (an array)
```javascript
let recorder;

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
  console.log(recorder.buffer); //see the contents of the buffer
}
```

#### .speed
an internal variable which sets the playback speed (default: 1)
```javascript
let recorder;

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
  recorder.speed = 0.5 ; //set playback to half speed
}
```

#### .clear()
clears the internal buffer
```javascript
let recorder;

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
}

function keyPressed(){
  recorder.clear() // clear the buffer
}
```

#### .startLocation()
###### .startLocation(position)
starts the buffer playback at a specific location (cannot exceed the size of the buffer)
```javascript
let recorder;

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
}

function keyPressed(){
  recorder.startLocation(30) //re-start the buffer at the 30th frame
}
```

#### .showPaths()
Visual display of the path of the animation, useful for debugging and feedback
```javascript
let recorder;
function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
}
function draw(){
  recorder.showPaths(); //show the path of the recording using points
}
```

#### .save()
###### .save('filename')
Save the paths out to an external JSON file for later recall and archiving.
```javascript
function keyPressed(){
  if(key == 's'){
    recorder.save('myPaths') //save out the paths to an external json file
  }
}
```

#### .load()
###### .load('path/to/data.json')
Load paths which were previously saved into the internal buffer
```javascript
let recorder; //make a variable for the path recorder class to exist in

function setup() {
  recorder = new p5pathRecorder(); //instantiate a new path recorder
  recorder.load('myPaths.json') //load some existing paths from a file
  // console.log(recorder.buffer) //see the paths buffer
}
```
