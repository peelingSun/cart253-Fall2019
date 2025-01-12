// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

/////////////////////////
// ~10 ERRORS IN HERE
/////////////////////////
//////////////// FIXED #1: Fixed typo in class name
class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
//////////////// FIXED #2: Fixed typo in constructor argument (why -> y)
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
//////////////// FIXED #3: Fixed typo in speed variable
    this.speed = speed;
    // Time properties for noise() function
//////////////// FIXED #9: Faulty max value in tx = random(). random(0, 0) -> random(0, 1000)
    this.tx = random(0, width); // To make x and y noise different
//////////////// FIXED #10: Faulty max value in tx = random(). random(0, 0) -> random(0, 1000)
    this.ty = random(0, height); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
//////////////// FIXED #5: Removed 'r' in function name (mover() -> move() )
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    console.log(this.x);
    console.log(this.y);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
//////////////// FIXED #6: Fixed typo in handleWrapping function call
    this.handleWrapping();

//////////////// FIXED #4: Added } to close the mover() function.
  }
    // handleWrapping
    //
    // Checks if the prey has gone off the canvas and
    // wraps it to the other side if so
    handleWrapping() {
      // Off the left or right
//////////////// FIXED #11: Faulty direction > for leftside wrapping.
      if (this.x < 0) {
        this.x += width;
      }
      else if (this.x > width) {
        this.x -= width;
      }
      // Off the top or bottom
      if (this.y < 0) {
        this.y += height;
      }
      else if (this.y > height) {
//////////////// FIXED #7: Corrected typo in variable height. hight -> height
        this.y -= height;
      }
    }

    // display
    //
    // Draw the prey as an ellipse on the canvas
    // with a radius the same size as its current health.
    display() {
      push();
      noStroke();
      fill(this.fillColor);
      this.radius = this.health;
//////////////// FIXED #8: this.radius * "two" -> this.radius * 2
      ellipse(this.x, this.y, this.radius * 2);
      pop();
    }

    // reset
    //
    // Set the position to a random location and reset health
    // and radius back to default
    reset() {
      // Random position
      this.x = random(0, width);
      this.y = random(0, height);
      // Default health
      this.health = this.maxHealth;
      // Default radius
      this.radius = this.health;
    }
  }
