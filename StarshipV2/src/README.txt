LEWIS SWEENEY (les35) CS25320 ASSIGNMENT README FILE

CONTENTS

1. THE GAME
2. HOW TO PLAY
3. REFERENCES
4. PLAY THE GAME ONLINE

---       1. THE GAME       ---


The game I have created for this assignment is called Starship Zero. The game
is a space-based, top-down shoot 'em up game. The game is made to look and feel
like it would've fit in with the 8-bit arcade games back when they came into existence.

The aim of the game is simple: Shoot enemy ships and get the highest score you can,
while avoiding being shot or crashed into by the enemies. 


---     2. HOW TO PLAY      ---


Menu:

Arrow Keys - Move Menu Option
Enter: Select Menu Option

Game: 

Arrow Keys - Move Player Ship
Space: Shoot (can be held to repeatedly shoot)

Highscore Input:

Arrow Keys - Move Letter Selection/Change Letter Selection
Enter: Back to Menu


---      3. REFERENCES      ---

The PHP file "config.php" which contains all of the credentials for connection to the PostgreSQL database
is a modified version of a file called "get_cs25320_db_handle.php", which was made available by Edel
Sherratt (eds) for use by students on the module.

The smooth player movement in my game is a heavily modified version of the code found at this web page: http://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls 
The code was originally written by Stack Overflow user loktar and all code uploaded on Stack Overflow 
is usable under the Creative Commons license most commonly known as "CC BY-SA 3.0".

Most text assets in my game were created using a tool at this web page: https://textcraft.net/ 
Permission is not required by the site, and it’s not necessary to reference/attribute the page, 
but as it was a very useful tool in creating the assets for my game I decided that attribution was only fair.

The font ('Press Start 2P') used to display the score during the game and on the high score screen, 
as well as being used on this site for titles and links, can be found here: 
https://fonts.google.com/specimen/Press+Start+2P 
The other font on this site ('Play') can be found here: 
https://fonts.google.com/specimen/Play 
These Google fonts are freely available to be used by anyone.

The sound that plays when the player dies in the game can be found here: 
http://opengameart.org/content/8-bit-explosions-1 
This sound effect was created by Jesús Lastra and is usable under the Creative Commons license.

The sounds that play when a player or enemy is hit by a bullet or each other can be found here: 
http://opengameart.org/content/8-bit-sound-effects-library 
These sounds were created by Little Robot Sound Factory, whose site can be found here: 
www.littlerobotsoundfactory.com 
These sounds are usable under the Creative Commons license.

The sound when the bomb is activated can be found here:
https://opengameart.org/content/boom-pack-1
This sound is usable under the Creative Commons license.

All other assets were created by myself.


--- 4. PLAY THE GAME ONLINE ---

The game has PHP features built in, taking a player's name and score and storing it in a
PostgreSQL database. These score are read when the website is loaded/refreshed and then
displayed as a highscore leader board. This feature cannot be accessed playing a local copy
of the game. If you would like to play the game with leaderboard active, it can be found here:

http://users.aber.ac.uk/les35/ftw/starship.php
