# Frogger Clone

## Run the game
The latest version of this game can be tried out [here](https://donboli.github.io/frogger_clone/).
Otherwise copy the project and open the index.html file in your browser.
Alternatively, you can also use the following commands on the project's directory:
  - node's `http-server` or
  - Python's SimpleHTTPServer, like so: `python -m SimpleHTTPServer 8080`

## How to play

### Goal
Get the player across all lanes and reach the water without getting hit by an enemy (bug).

### Controls
Use the arrow keys on your keyboard to move the player.

### Points
You get a point for every time the water is reached. The players position resets when this happens.
If the player gets hit by an enemy, he will turn back to the starting position, but also lose all accumulated points. The enemies will get resetted as well in that case.

### Lives
A heart will appear every 10 seconds at a random position on the grass rows. If the player grabs it, he will get an additional life. Every time a heart appears, it will be available for 5 seconds before disappearing. When the player gets hit by an enemy he loses a life and returns to the starting position. If there are no lives left, the game resets and all points are lost.