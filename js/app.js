// inheritance utility function
var inherit = function(subclass, superclass) {
    subclass.prototype = Object.create(superclass.prototype);
    subclass.prototype.constructor = subclass;
};


// =========================================================
// Creature (parent pseudoclass)
// =========================================================
var Creature = function(positionY, sprite) {
    // position on the canvas
    this.x = 0;
    this.y = positionY;

    // The image/sprite for our creatures, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
};

// Draw the creature on the screen, required method for game
Creature.prototype.render = function() {
    var positionX = this.x * (ctx.canvas.width / 5);
    var positionY = this.y * (ctx.canvas.height / 7.3) - 20;
    ctx.drawImage(Resources.get(this.sprite), positionX, positionY);
};


// =========================================================
// Enemy (child class)
// =========================================================
// Enemies our player must avoid
var Enemy = function(positionY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // movement speed
    this.speed = speed;

    Creature.call(this, positionY, 'images/enemy-bug.png');
};

inherit(Enemy, Creature);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};


// =========================================================
// Player (child class)
// =========================================================
var Player = function() {
    Creature.call(this, 0, 'images/char-boy.png');

    this.reset();
};

inherit(Player, Creature);

Player.prototype.update = function() {
    if (this.y == 0) {
        this.reset();
    }
    // detect collision
    // points?
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
}


// =========================================================
// Instance initialization
// =========================================================
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var positionY = Math.round(Math.random() * 2) + 1;
    var speed = Math.random() * 3;
    allEnemies.push(new Enemy(positionY, speed));
}

// Place the player object in a variable called player
var player = new Player();


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