// Select the paragraph element to display score
const para = document.querySelector('p');

// Initialize score variable
let score = 0;

// Initialize lives variable
let life = 3;

// Select the canvas element
const canvas = document.querySelector('canvas');

// Get the 2D context of the canvas
const ctx = canvas.getContext('2d');

// Set canvas width to window inner width
const width = canvas.width = window.innerWidth;

// Set canvas height to window inner height
const height = canvas.height = window.innerHeight;

// Pink color variable
const pinkk = 'rgba(255, 182, 177, 255)'

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};

// Function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Function to clear canvas by drawing black background
function clear() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
}

// Powerpellets blikka function
function togglePowerpelletColor() {
  for (const powerpellet of powerpellets) {
    // If powerpellet exists
    if (powerpellet.exists) {
      // If Color was pink, Color is now yellow.
      // Otherwise, Color is now pink.
      powerpellet.color = powerpellet.color === pinkk ? "black" : pinkk;
    }
  }
}

// Call togglePowerpelletColor every 500ms
setInterval(togglePowerpelletColor, 500);


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Classes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Class Shape
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Class Dot (which *extends* the Shape class)
class Dot extends Shape {
  constructor(x, y, velX, velY) {
    // The properties/methods from the Shape class
    super(x, y, velX, velY);
    this.color = pinkk;
    this.radius = 5;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Method to update the dot's position
  update() {
    // Check if the dot has hit the right→ edge of the canvas
    if ((this.x + this.radius) >= width) {
      this.velX = -(this.velX);
    }
    // Check if the dot has hit the left← edge of the canvas
    if ((this.x - this.radius) <= 0) {
      this.velX = -(this.velX); // Reverse velX to make the dot bounce right →.
    }
    // Check if the dot has hit the bottom↓ edge of the canvas
    if ((this.y + this.radius) >= height) {
      this.velY = -(this.velY); // Reverse velY to make the dot bounce up ↑.
    }
    // Check if the dot has hit the top↑ edge of the canvas
    if ((this.y - this.radius) <= 0) {
      this.velY = -(this.velY); // Reverse velY to make the dot bounce down ↓.
    }
    // Update the dot's position by adding the velocity values to its current coordinates.
    this.x += this.velX;
    this.y += this.velY;
  }
}

// Class Powerpellet (which *extends* the Shape class)
class Powerpellet extends Shape {
  constructor(x, y, velX, velY) {
    super(x, y, velX, velY);
    this.color = pinkk;
    this.radius = 15;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Method to update the powerpellet's position
  update() {
    // Check if the powerpellet has hit the right→ edge of the canvas
    if ((this.x + this.radius) >= width) {
      this.velX = -(this.velX); // Reverse velX to make the powerpellet bounce left ←.
    }
    // Check if the powerpellet has hit the left← edge of the canvas
    if ((this.x - this.radius) <= 0) {
      this.velX = -(this.velX); // Reverse velX to make the powerpellet bounce right →.
    }
    // Check if the powerpellet has hit the bottom↓ edge of the canvas
    if ((this.y + this.radius) >= height) {
      this.velY = -(this.velY); // Reverse velY to make the powerpellet bounce up ↑.
    }
    // Check if the powerpellet has hit the top↑ edge of the canvas
    if ((this.y - this.radius) <= 0) {
      this.velY = -(this.velY); // Reverse velY to make the powerpellet bounce down ↓.
    }
    // Update the powerpellet's position by adding the velocity values to its current coordinates.
    this.x += this.velX;
    this.y += this.velY;
  }
}


// Ghost class extending Shape
class Ghost extends Shape {
  static numColumns = 2;
  static numRows = 1;
  static spriteSize = 0;
  static sprite;

  constructor(color, x, y, velX, velY) {
    super(x, y, velX, velY);
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 21;
    this.exists = true;
    loadImage();
    loadImage()
    {
      // Check for an existing image
      if (!Ghost.sprite) {
        // No image found, create a new element
        Ghost.sprite = new Image();

        // Handle a successful load
        Ghost.sprite.onload = () => {
          // Define the size of a frame
          Ghost.spriteSize = 13;
        };

        // Start loading the image
        Ghost.sprite.src = 'pacmansprites.png';
      }
    }

    this.color = color;
    switch (color) {
      case 'blinky':
        this.clipX = 0;
        this.clipY = 64;
        break;
      case 'pinky':
        this.clipX = 0;
        this.clipY = 80;
        break;
      case 'inky':
        this.clipX = 0;
        this.clipY = 96;
        break;
      case 'clyde':
        this.clipX = 0;
        this.clipY = 112;
        break;
    }
  }


  draw() {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      spriteSheet,
      this.clipX, this.clipY, Ghost.spriteSize, Ghost.spriteSize,
      this.x, this.y, Ghost.spriteSize * 3, Ghost.spriteSize * 3
    );
    // Limit the maximum frame
    let maxFrame = Ghost.numColumns * Ghost.numRows - 1;
    if (this.currentFrame > maxFrame) {
      this.currentFrame = maxFrame;
    }

    // Update rows and columns
    let column = this.currentFrame % Ghost.numColumns;
    let row = Math.floor(this.currentFrame / Ghost.numColumns);

    // Draw the image
    this.context.drawImage(Ghost.sprite,
      column * Ghost.frameWidth, row * Ghost.frameHeight, Ghost.frameWidth, Ghost.frameHeight,
      (this.x - this.radius), (this.y - this.radius)
    - this.radius * 0.4, this.radius * 2,
      this.radius * 2.42);
  }

  handleCollision() {
    // Pick the next frame of the animation
    this.currentFrame++;
  }

  update() {
    // Random speed
    if (this.x + this.velX > canvas.width || this.x + this.velX < 0) {
      this.velX = Math.random() * 10 - 5;
    }
    if (this.y + this.velY > canvas.height || this.y + this.velY < 0) {
      this.velY = Math.random() * 10 - 5;
    }


    // Check if the powerpellet has hit the right→ edge of the canvas
    if ((this.x + this.radius) >= width) {
      this.velX = -(this.velX); // Reverse velX to make the powerpellet bounce left ←.
    }
    // Check if the powerpellet has hit the left← edge of the canvas
    if ((this.x - this.radius) <= 0) {
      this.velX = -(this.velX); // Reverse velX to make the powerpellet bounce right →.
    }
    // Check if the powerpellet has hit the bottom↓ edge of the canvas
    if ((this.y + this.radius) >= height) {
      this.velY = -(this.velY); // Reverse velY to make the powerpellet bounce up ↑.
    }
    // Check if the powerpellet has hit the top↑ edge of the canvas
    if ((this.y - this.radius) <= 0) {
      this.velY = -(this.velY); // Reverse velY to make the powerpellet bounce down ↓.
    }
    // Update the powerpellet's position by adding the velocity values to its current coordinates.
    this.x += this.velX;
    this.y += this.velY;
  }
}

// Pacman class extending Shape
class Pacman {
  constructor({ position }, { velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.color = "yellow";
    this.radius = 25;
    this.angle = 0; // Angle starts at 0
    this.exists = true;

    addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'w': // North ↑
          pacman.velocity.y = -2;
          break;
        case 'a': // West ←
          pacman.velocity.x = -2;
          break;
        case 's': // South ↓
          pacman.velocity.y = 2;
          break;
        case 'd': // East →
          pacman.velocity.x = 2;
          break;
        case 'wa': // Northwest ↖
          pacman.velocity.x = -2;
          pacman.velocity.y = -2;
          break;
        case 'wd': // Northeast ↗
          pacman.velocity.x = 2;
          pacman.velocity.y = -2;
          break;
        case 'sa': // Southwest ↙
          pacman.velocity.x = -2;
          pacman.velocity.y = 2;
          break;
        case 'sd': // Southeast ↘
          pacman.velocity.x = 2;
          pacman.velocity.y = 2;
          break;
        case ' ':
          animate();
          break;
      }
      // Update Pacman's angle based on the velocity
      if (pacman.velocity.x !== 0 || pacman.velocity.y !== 0) {
        pacman.angle = Math.atan2(pacman.velocity.y, pacman.velocity.x);
      }
    });

    addEventListener('keyup', ({ key }) => {
      switch (key) {
        case 'w':
        case 's':
          pacman.velocity.y = 0;
          break;
        case 'a':
        case 'd':
          pacman.velocity.x = 0;
          break;
      }
    });

    // Touch event function
    canvas.addEventListener('touchstart', (event) => {
      const touchX = event.touches[0].clientX; // Get the x-coordinate of the touch
      const touchY = event.touches[0].clientY; // Get the y-coordinate of the touch

      const touchXDiff = touchX - pacman.position.x;
      if (touchXDiff > 0)
        pacman.velocity.x = 2;
      else if (touchXDiff < 0)
        pacman.velocity.x = -2;

      const touchYDiff = touchY - pacman.position.y;
      if (touchYDiff > 0)
        pacman.velocity.y = 2;
      else if (touchYDiff < 0)
        pacman.velocity.y = -2;
    });
    canvas.addEventListener('touchend', (event) => {
      pacman.velocity.y = 0;
      pacman.velocity.x = 0;
    });
  }

  // Method to draw Pacman
  draw() {
    // Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.position.x, this.position.y, this.radius,
      this.angle + Math.PI / 4, // Start angle based on direction
      this.angle - Math.PI / 4, // End angle based on direction
      false
    );
    ctx.lineTo(this.position.x, this.position.y);
    ctx.fill();

    // Eye
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.position.x + 5, this.position.y - 15, 5, 0, Math.PI * 2, true);
    ctx.fill();
  }

  // Method to prevent Pacman leaving canvas bounds
  checkBounds() {
    // Check if the right→ edge of Pacman is beyond the canvas width
    if ((this.position.x + this.radius) >= width) {
      this.position.x -= this.radius; // Move Pacman to the left← to keep it inside the canvas.
    }
    // Check if the left← edge of Pacman is beyond the canvas width
    if ((this.position.x - this.radius) <= 0) {
      this.position.x += this.radius; // Move Pacman to the right→ to keep it inside the canvas.
    }
    // Check if the bottom↓ edge of Pacman is beyond the canvas height
    if ((this.position.y + this.radius) >= height) {
      this.position.y -= this.radius; // Move Pacman upwards↑ to keep it inside the canvas.
    }
    // Check if the top↑ edge of Pacman is beyond the canvas height
    if ((this.position.y - this.radius) <= 0) {
      this.position.y += this.radius; // Move Pacman downwards↓ to keep it inside the canvas.
    }
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Pacman Collision >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Method to detect collision between Pacman and Ghosts
  ghostCollisionDetect() {
    for (const ghost of ghosts) {
      // Only checks if the ghost actually exists
      if (ghost.exists) {
        const dx = this.position.x - ghost.x;
        const dy = this.position.y - ghost.y;
        const distance = Math.sqrt(dx * dx + dy * dy); // √(dx^2 + dy^2)
        if (distance < this.radius + ghost.radius) {
          life--; // Decrease the lives value.
          para.textContent = 'Score: ' + score + ' Lives: ' + life; // Update the stats display.
          if (life < 1)
            this.exists = false;
        }
      }
    }
  }

  // Method to detect collision between Pacman and dots
  dotCollisionDetect() {
    for (const dot of dots) {
      // Only checks if the dot actually exists
      if (dot.exists) {
        const dx = this.position.x - dot.x;
        const dy = this.position.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy); // √(dx^2 + dy^2)

        if (distance < this.radius + dot.radius) {
          dot.exists = false; // Remove the dot from the canvas.
          score++; // Increase the score value.
          para.textContent = 'Score: ' + score + ' Lives: ' + life; // Update the stats display.
        }
      }
    }
  }
  powerpelletCollisionDetect() {
    for (const powerpellet of powerpellets) {
      // Only checks if the powerpellet actually exists
      if (powerpellet.exists) {
        const dx = this.position.x - powerpellet.x;
        const dy = this.position.y - powerpellet.y;
        const distance = Math.sqrt(dx * dx + dy * dy); // √(dx^2 + dy^2)

        if (distance < this.radius + powerpellet.radius) {
          powerpellet.exists = false; // Remove the powerpellet from the canvas.
          // life++; // Increase the lives value.
          // para.textContent = 'Score: ' + score + ' Lives: ' + life; // Update the stats display.
        }
      }
    }
  }

  // Update Pacman. redraw, check bounds, check collision, update position.
  update() {
    pacman.draw();
    pacman.checkBounds();
    pacman.ghostCollisionDetect();
    pacman.dotCollisionDetect();
    pacman.powerpelletCollisionDetect();

    // Adds velocity to Pacman's position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}




// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Logic >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Dots array and population
const dots = [];
while (dots.length < 50) {
  // random radius between 10-20
  const radius = random(10, 20);
  const dot = new Dot(
    // Position
    random(0 + radius, width - radius),
    random(0 + radius, height - radius),
    // Velocity
    random(0, 0),
    random(0, 0),
  );
  dots.push(dot);
}

// Powerpellets array and population
const powerpellets = [];
while (powerpellets.length < 4) {
  // random radius between 10-20
  const radius = random(10, 20);
  const powerpellet = new Powerpellet(
    // Position
    random(0 + radius, width - radius),
    random(0 + radius, height - radius),
    // Velocity
    random(0, 0),
    random(0, 0),
  );
  powerpellets.push(powerpellet);
}

// Ghosts array
const ghosts = [
  new Ghost('blinky', random(0 + this.radius, width - this.radius), random(0 + this.radius, height - this.radius), random(1, 3), random(1, 3)),
  new Ghost('pinky', random(0 + this.radius, width - this.radius), random(0 + this.radius, height - this.radius), random(1, 3), random(1, 3)),
  new Ghost('inky', random(0 + this.radius, width - this.radius), random(0 + this.radius, height - this.radius), random(1, 3), random(1, 3)),
  new Ghost('clyde', random(0 + this.radius, width - this.radius), random(0 + this.radius, height - this.radius), random(1, 3), random(1, 3))
];

// Create Pacman
const pacman = new Pacman({ position: { x: 100, y: 100 } }, { velocity: { x: 0, y: 0 } });

function gameOver() {
  clear;
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Game Over!", 50, 20);
}

function gameWin() {
  clear;
  ctx.font = "30px Arial";
  ctx.fillStyle = "yellow";
  ctx.fillText("You Win!", 50, 20);
}

// Define the number of columns and rows in the sprite
let numColumns = 2;
let numRows = 1;

// Define the size of a frame
let frameWidth = sprite.width / numColumns;;
let frameHeight = sprite.height / numRows;;

// The sprite image frame starts from 0
let currentFrame = 0;



// Main animation loop
function animate() {
  requestAnimationFrame(animate);
  clear();

  // Loop through and update all dots that exist
  dots.forEach(dot => {
    if (dot.exists) {
      dot.draw();
      dot.update();
    }
  });

  // Loop through and update all powerpellets that exist
  powerpellets.forEach(powerpellet => {
    if (powerpellet.exists) {
      powerpellet.draw();
      powerpellet.update();
    }
  });

  // Loop through and update all ghosts
  ghosts.forEach(ghost => {
    ghost.update();
    ghost.draw();
  });


  if (pacman.exists) {
    pacman.update(); // Update Pacman
  }
  // Tapa
  else {
    gameOver();
  }
  // Vinna
  if (score > 49) {
    gameWin();
  }
}


// Only starts animation loop if sprite is rendered
const spriteSheet = new Image();
spriteSheet.addEventListener('load', () => {
  animate(); // Start the animation loop
});
spriteSheet.src = "pacmansprites.png";

window.addEventListener('devicemotion', event => {
  event.accelerationIncludingGravity.x
  event.accelerationIncludingGravity.y
  message = "x: " + event.accelerationIncludingGravity.x + " <br> y: " + event.accelerationIncludingGravity.y + "<br>";
  document.body.innerHTML = message;
})







