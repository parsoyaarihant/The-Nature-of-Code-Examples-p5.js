// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// ContactListener to listen for collisions!

function CustomListener() {

  // Collision event functions!
  this.BeginContact = function(contact) {
    // Get both fixtures
    var f1 = contact.GetFixtureA();
    var f2 = contact.GetFixtureB();
    // Get both bodies
    var b1 = f1.GetBody();
    var b2 = f2.GetBody();

    // Get our objects that reference these bodies
    var o1 = b1.GetUserData();
    var o2 = b2.GetUserData();

    if (o1 instanceof ball && o2 instanceof ball) {
      o1.change();
      o2.change();
      o2.ballcollisiondetection();
      o1.ballcollisiondetection();
    }
    else if (o1 instanceof boundary && o2 instanceof ball) {
      o1.change();
      o2.change();
      //o2.ballcollisiondetection();
      //o1.ballcollisiondetection();
    }
    else if (o1 instanceof ball && o2 instanceof boundary) {
      o1.change();
      o1.change();
    //  o1.ballcollisiondetection();
      //o1.ballcollisiondetection();
    }
    else if (o1 instanceof gun && o2 instanceof ball) {
      o2.change();
      o1.change();
      o1.gun_ball_collisiondetection();
      o2.gun_ball_collisiondetection();
    }
    else if (o1 instanceof ball && o2 instanceof gun) {
      o2.change();
      o1.change();
      o1.gun_ball_collisiondetection();
      o2.gun_ball_collisiondetection();
    }

  }

  // Objects stop touching each other
  this.EndContact = function(contact) {
  }

  this.PreSolve = function(contact,manifold) {
  }

  this.PostSolve = function(contact,manifold) {
  }
}
