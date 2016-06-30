
var world;
var gun1, gun2;
var wall1, wall2, wall3;
var bullet = [] ;
var tank = [];
var tankpositon;
var wall=[];
var gunarrow;
var ballimage;
var canvas;
var background1;
var gunupdate;
function setup() {
  canvas=createCanvas(window.innerWidth,window.innerHeight);
  //text.class("lemon"); // assign a class to be used by the CSS sheet
  gunarrow=loadImage("arrow.png");
  ballimage=loadImage("ball.png");
  world = createWorld();///...changed the gravity inside  box2d-helper js
  world.SetContactListener(new CustomListener());
  tank.push(new gun(width/4,height/2,30,'arihant.jpg'));
  tank.push(new gun(width*3/4, height/2,30,'photo.jpg'));
  wall.push(new boundary(width/2, height-5, width, 10));
  wall.push(new boundary(0, height/2, 10, height));
  wall.push(new boundary(width, height/2, 10, height));
  wall.push(new boundary(width/2, height/2, 5, height/2));
  wall.push(new boundary(width/2, 0 , width, 5));
  background1=loadImage("back.jpg");
  frameRate(100);
  gunupdate=0
}

function draw() {
  background(background1);
  // We must always step through time!

  var timeStep = 1.0/40;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);


  // Look at all particles
  for (var i = bullet.length-1; i >= 0; i--) {
    bullet[i].display();
    if (bullet[i].done()) {
      bullet.splice(i,1);
    }
  }
  for (var i = tank.length-1; i >= 0; i--) {//........display all tanks
    tank[i].display();
    //if (tank[i].done()) {//......deleting the tank
      //bullet.splice(i,1);
    //}
  }
  for (var i = wall.length-1; i >= 0; i--) {//........display all tanks
    wall[i].display();
    //if (tank[i].done()) {//......deleting the tank
      //bullet.splice(i,1);
    //}
  }

  if(gunupdate%30===0){
    for (var i = tank.length-1; i >= 0; i--) {
      tank[i].update();
    }
    gunupdate=0;
  }
  gunupdate++;
  tankposition=tank[0].position();
}
function mousePressed(){
    bullet.push( new ball(tankposition.x + (45*cos(atan2(mouseY-tankposition.y,mouseX-tankposition.x ))),
                  tankposition.y + (45*sin(atan2(mouseY-tankposition.y,mouseX-tankposition.x ))),
                  10,mouseX-tankposition.x,mouseY-tankposition.y));
  }

function keyPressed() {
    if (keyCode === 65) {
      tank[0].move();///the tank for the current user
  }
}
