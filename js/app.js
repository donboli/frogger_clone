// inheritance utility function
var inherit = function(subclass, superclass) {
    subclass.prototype = Object.create(superclass.prototype);
    subclass.prototype.constructor = subclass;
};


// =========================================================
// Entity (parent pseudoclass)
// =========================================================
var Entity = function(positionY, sprite) {
    // position on the canvas
    this.x = 0;
    this.y = positionY;

    // The image/sprite for our entities, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    var positionX = this.x * (ctx.canvas.width / 5);
    var positionY = this.y * (ctx.canvas.height / 7.3) - 20;
    ctx.drawImage(Resources.get(this.sprite), positionX, positionY);

    // uncomment the line below to visualize collision rectangles
    // ctx.strokeRect(positionX + 10, positionY, 70, 70);
};


// =========================================================
// Collectible (class)
// =========================================================
var Collectible = function() {
    Entity.call(this, 0, 'images/Heart.png');

    this.reset();
};

inherit(Collectible, Entity);

Collectible.prototype.update = function(dt) {
    this.time -= dt;

    if (this.time < 0) {
        this.placed = !this.placed;
        if (this.placed) {
            this.time = 5; // collectible will be available for 5 seconds
        } else {
            this.time = 10; // collectible will be off for 10 seconds
        }
    }
};

Collectible.prototype.render = function() {
    if (this.placed) {
        // use the parent's render method
        Entity.prototype.render.call(this);
    }
};

// set initial values
Collectible.prototype.reset = function() {
    // time (in seconds) to switch the placed flag
    this.time = 10;
    // determines if the collectible should be available on the game field
    this.placed = false;
    // randomly set a position
    this.x = Math.round(Math.random() * 4);
    this.y = Math.round(Math.random() * 2) + 1;
};


// =========================================================
// Enemy (child class)
// =========================================================
// Enemies our player must avoid
var Enemy = function() {
    // inherit parent attributes
    Entity.call(this, 0, 'images/enemy-bug.png');

    // set initial values
    this.reset();
};

inherit(Enemy, Entity);

// set initial values
// y-axis position and speed are random
Enemy.prototype.reset = function(dt) {
    // position values
    this.x = -2;
    this.y = Math.round(Math.random() * 2) + 1;

    // movement speed
    this.speed = Math.random() * 2.5 + 1;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 5) {
        this.reset();
    }
};


// =========================================================
// Player (child class)
// =========================================================
var Player = function() {
    Entity.call(this, 0, 'images/char-boy.png');

    this.points = 0;

    // number of tries left until the points are set to 0
    this.lives = 0;
    this.reset();
};

inherit(Player, Entity);

// reset player and add point after reaching the final row (water)
Player.prototype.update = function() {
    if (this.y == 0) {
        this.reset();
        this.points += 1;
    }
};

// respond to keyboard events
Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 0) {
        this.x--;
    } else if (key == 'right' && this.x < 4) {
        this.x++;
    } else if (key == 'up' && this.y > 0) {
        this.y--;
    } else if (key == 'down' && this.y < 5) {
        this.y++;
    }
};

// set initial values for player
Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5;
};


// =========================================================
// Instance initialization
// =========================================================
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy();

    enemy.reset();

    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();

// initialize collectible
var collectible = new Collectible();


// =========================================================
// Keyboard event listener
// =========================================================
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});