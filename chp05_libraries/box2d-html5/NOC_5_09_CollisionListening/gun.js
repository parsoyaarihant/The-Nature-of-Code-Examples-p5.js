// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A circular particle

// Constructor
function gun(x,y,r,imageURL) {
  this.guncollision=0;
  this.r = r;
  //this.image=loadImage(imageURL);
  this.img = createImg(imageURL);
  this.img.style(" border-radius: 70%; ");
  this.img.size(50, 50);
  //this.img.hide();
  this.img.position(0,0);
  //this.col = color(0,128,255);

  // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();
  // Fixture holds shape

  // Fixture holds shape
  fd.shape = new box2d.b2CircleShape();
  fd.shape.m_radius = scaleToWorld(this.r);


  //fd.shape = new box2d.b2CircleShape();
  //fd.shape.m_radius = scaleToWorld(this.r);

  // Some physics
  fd.density = 0.5;
  fd.friction = 0.1;
  fd.restitution = 0.3;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  // Some additional stuff
  //this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
  //this.body.SetAngularVelocity(random(-5,5));

    this.body.SetUserData(this);

  // Change color when hit
  this.change = function() {
    this.col = color(255, 0, 0);
  }

  // This function removes the particle from the box2d world
  this.killBody = function() {
    world.DestroyBody(this.body);
  }

  this.position=function(){
    var pos = scaleToPixels(this.body.GetPosition());
     return pos;
  }
  this.move=function(){
    var pos = scaleToPixels(this.body.GetPosition());
    var velocity=new box2d.b2Vec2((mouseX-pos.x)*0.05,(mouseY-pos.y)*0.05);
    this.body.SetLinearVelocity(velocity);
   }

  // Is the particle ready for deletion?
  this.done = function() {

    // Let's find the screen position of the particle
    var pos = scaleToPixels(this.body.GetPosition());

    // Is it off the bottom of the screen?
   if(this.guncollision>1){
      this.killBody();
      return true;
    }
    return false;
  }
  this.gun_ball_collisiondetection=function(){
    this.guncollision = this.guncollision + 1;
  }

  // Drawing the box
  this.update =function(){
    var velocity=new box2d.b2Vec2(0,0);
    this.body.SetLinearVelocity(velocity);
  }

  this.display = function() {
      // Get the body's position
      var pos = scaleToPixels(this.body.GetPosition());
      // Get its angle of rotation
      var a = this.body.GetAngleRadians();

      // Draw it!
      rectMode(CENTER);
      push();
      translate(pos.x,pos.y);
      rotate(atan2(mouseY-pos.y,mouseX-pos.x ));
      fill(this.col);
      stroke(0,0,0);
      strokeWeight(2);
      ellipse(0,0,this.r*2,this.r*2);
    //  this.img.show();
      this.img.position(pos.x-17,pos.y-17);

      //image(this.image,0,0,100,100);
      // Let's add a line so we can see the rotation
      //line(0,0,this.r,0);
      //line(0,0,(this.r+40)*cos(atan2(mouseY-pos.y,mouseX-pos.x )),(this.r+40)*sin(atan2(mouseY-pos.y,mouseX-pos.x )));
      image(gunarrow,10,-25,50,50);
      pop();

      //line(pos.x,pos.y,mouseX,mouseY);
      //strokeWeight(1);

    }
  }



  function ball(x,y,r,v1,v2) {
  this.r = r;
  this.ballcollision=0;
  this.guncollision=0;
  this.boundrycollison=0;
  this.col = color(255);
  // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define a fixture
  var fd = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd.shape = new box2d.b2CircleShape();
  fd.shape.m_radius = scaleToWorld(this.r);

  // Some physics
  fd.density = 1.0;
  fd.friction = 0.1;
  fd.restitution = 0.3;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  // Some additional stuff
  //window.alert(v1);
  var velocity=new box2d.b2Vec2(v1,v2);
  this.body.SetLinearVelocity(velocity);
  this.body.SetAngularVelocity(random(-5,5));

    this.body.SetUserData(this);

  // Change color when hit
  this.change = function() {
    this.col = color(0, 255, 0);
  }

  // This function removes the particle from the box2d world
  this.killBody = function() {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion?
  this.done = function() {

    // Let's find the screen position of the particle
    var pos = scaleToPixels(this.body.GetPosition());

    // Is it off the bottom of the screen?
    if (this.ballcollision >2 ) {
      this.killBody();
      return true;
    }
    else if(this.guncollision>0){
      this.killBody();
      return true;
    }

    return false;
  }
  this.ballcollisiondetection=function(){
    this.ballcollision = this.ballcollision + 1;
  }
  this.gun_ball_collisiondetection=function(){
    this.guncollision = this.guncollision + 1;
  }

  // Drawing the box
  this.display = function() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x,pos.y);
    rotate(a);
    fill(this.col);
    stroke(0);
    strokeWeight(2);
    ellipse(0,0,this.r*2,this.r*2);
    // Let's add a line so we can see the rotation
    image(ballimage,-10,-10,20,20);
    //line(0,0,this.r,0);
    pop();
  }
}
