# Frogger Clone

## How to run the game
Just open the index.html file in your browser.

Alternatively you can also use
  - node's `http-server` or
  - Python's SimpleHTTPServer, like so: `python -m SimpleHTTPServer 8080`

## How to play

### Goal
Get the player across all lanes and reach the water without getting hit by an enemy (bug).

### Controls
Use the arrow keys on your keyboard to move the player.

### Points
You get a point for every time the water is reached. The players position resets when this happens.

If the player gets hit by an enemy, it will turn back to the starting position, but also lose all accumulated points. The enemies will get resetted as well in that case.