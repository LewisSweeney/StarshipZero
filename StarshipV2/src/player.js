var deathRegistered = false;
var playXDim = 45;
var playYDim = 45;
var playerActive = true;
var playerShip = new Array(3);
var playerBulletImg = new Array(3);
var playerDeadFrames = 0;
var playerExplode = false;
var playerFrame = 0;
var playerExplosionFrame = 0;
var playerBullets = new Array(16);
var playerBullets2 = new Array(16);
var life = 100;
var score = 0;
var playerLevel = 0;
var doubleShotActive = false;

var bombCounter = 0;
var playerBomb = true;

/* The following variables, as well as the code for moving the player smoothly (located in the move_Player function), are adapted from the code featured here: http://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls
The original code was posted by the Stack Overflow user loktar. As the code was posted on Stack Overflow, the code comes under the Creative Commons license CC BY-SA 3.0*/

var playerX = 180,
    playerY = 490,
    playerVelocity = 0,
    playerSpeed = 4, // Sets the maximum speed that a player can be travelling
    playerFriction = 0.85, // Friction is used to slow the player down. The lower the value, the faster the player slows down.
    keys = []; // Holds the keyCodes for any keys currently being held down

// Initialises the variables used when performing actions upon the player
function initialisePlayer() {
    deathRegistered = false;
    playXDim = 45;
    playYDim = 45;
    playerActive = true;
    playerDeadFrames = 0;
    playerExplode = false;
    playerFrame = 1;
    playerExFrame = 0;
    life = 100;
    score = 0;
    playerLevel = 0;

    playerX = 180;
    playerY = 490;
}



// Checks if the player is dead or not
function player_Check() {

    if (life <= 0 && deathRegistered == false) {
        life = 0;
        playerActive = false;
        gameAudio.pause();
        gameAudio.currentTime = 0;
        gameMusicPlaying = false;
        explosionAudio.play();

        gameAudioPlaying = false;
        deathRegistered = true;
        playerExplode = true;
    }


}

// Initialises the playerBullets array with a new bullet every set interval if the space bar is pressed/held
// Initialises only one bullet per set time period
function player_Bullet_Init() {
    var arrayLength = playerBullets.length;
    var newDate = new Date();
    var newTime = newDate.getTime();
    var bulletSelected = false;
    var timePass = 399; // The period in milliseconds which must pass after the previous bullet is initialised
    if (playerLevel == 1) {
        timePass = 349; // If the player has obtained a power up there is a shorter delay between bullets
    }
    if (playerLevel == 2) {
        timePass = 299; // If the player has obtained two power ups there is an even shorter delay between bullets
    }
    // If the specified time has passed the next free bullet in the player's bullet Array is initialised
    if (newTime > timePass + time) {
        if (doubleShotActive == true) {
            for (var i = 0; i < arrayLength; i++) {
                if (playerBullets[i].yPos <= 0) {
                    playerBullets[i].active = false;

                }
                if (playerBullets2[i].yPos <= 0) {
                    playerBullets2[i].active = false;
                }

                if (playerBullets[i].active == false && playerBullets2[i].active == false && bulletSelected == false) {

                    playerBullets[i].active = true;
                    playerBullets[i].yPos = 490;
                    playerBullets[i].xPos = playerX + 14;

                    playerBullets2[i].active = true;
                    playerBullets2[i].yPos = 490;
                    playerBullets2[i].xPos = playerX + 42;
                    bulletSelected = true;

                    shootAudio.play();
                    break;
                }
            }
            time = newTime;
        } else {
            for (var i = 0; i < arrayLength; i++) {
                if (playerBullets[i].yPos <= 0) {
                    playerBullets[i].active = false;
                }
                if (playerBullets[i].active == false && bulletSelected == false) {

                    shootAudio.play();

                    playerBullets[i].active = true;
                    playerBullets[i].yPos = 490;
                    playerBullets[i].xPos = playerX + 28;
                    bulletSelected = true;
                    break;
                }
            }
            time = newTime;
        }
    }
}

// Draws any of the player's active bullets on the canvas
function player_Bullet_Draw() {
    var arrayLength = playerBullets.length;
    for (i = 0; i < arrayLength; i++) {
        if (playerBullets[i].active == true) {
            var image = playerBulletImg[playerLevel];
            ctx.drawImage(image, playerBullets[i].xPos, playerBullets[i].yPos);
            playerBullets[i].yPos = playerBullets[i].yPos - 5;

        }
        if (playerBullets2[i].active == true) {
            var image = playerBulletImg[playerLevel];
            ctx.drawImage(image, playerBullets2[i].xPos, playerBullets2[i].yPos);
            playerBullets2[i].yPos = playerBullets2[i].yPos - 5;

        }
    }
}


// Checks if the player's bullets have collided with an enemy ship. If it has, the ship it collided with has its health decremented by one
// Also checks to make sure the ship it collided with is not currently invincible (applicable only to some ships)
// If the enemy ship has 0 health it is dead and starts exploding. There is also a chance that a powerup or a health pickup may appear
function player_Bullet_Collision() {
    for (var i = 0; i < playerBullets.length; i++) {
        if (playerBullets[i].active == true) {
            var bulletX = playerBullets[i].xPos;
            var bulletY = playerBullets[i].yPos;
            for (var j = 0; j < enemyShips.length; j++) {
                if (enemyShips[j].active == true) {
                    var shipXDim = enemyShips[j].xDim;
                    var shipYDim = enemyShips[j].yDim;
                    var shipXMin = enemyShips[j].xPos;
                    var shipYMin = enemyShips[j].yPos;
                    var shipXMax = enemyShips[j].xPos + shipXDim;
                    var shipYMax = enemyShips[j].yPos + shipYDim;

                    var xDimHit = false;
                    var yDimHit = false;



                    if (bulletX > shipXMin && bulletX < shipXMax) {
                        xDimHit = true;
                    }


                    if (bulletY > shipYMin && bulletY < shipYMax - 18) {
                        yDimHit = true;
                    }

                    var random = Math.floor((Math.random() * 10) + 1);
                    if (xDimHit == true && yDimHit == true) {

                        playerBullets[i].active = false;
                        hitAudio.play();

                        if (enemyShips[j].invincibleFrames == 0) {
                            enemyShips[j].health -= 1;

                        }
                        if (enemyShips[j].type == 3) {
                            random = Math.floor((Math.random() * 6) + 1);
                            if (enemyShips[j].invincibleFrames == 0) {
                                enemyShips[j].invincibleFrames = 30;

                            }
                            enemyShips[j].image = enemyShipImages[3];
                        }



                    }

                    if (enemyShips[j].health <= 0 && enemyShips[j].active == true) {
                        bombCounter -= enemyShips[j].type;
                        if (bombCounter < 0) {
                            bombCounter = 0;
                        }
                        if (random == 3 && lifePowerActive == false) {
                            lifePowerActive = true;
                            lifePowerX = enemyShips[j].xPos;
                            lifePowerY = enemyShips[j].yPos;
                        }
                        if (random == 2 && powerActive == false) {
                            var random2 = Math.floor((Math.random() * 5) + 1);
                            if (random2 == 2) {
                                powerActive = true;
                                powerX = enemyShips[j].xPos;
                                powerY = enemyShips[j].yPos;
                            }
                        }
                        if (random == 4 && bombPowerActive == false) {
                            var random2 = Math.floor((Math.random() * 5) + 1);

                            if (random2 == 3) {
                                bombPowerActive = true;
                                bombPowerX = enemyShips[j].xPos;
                                bombPowerY = enemyShips[j].yPos;
                            }
                        }
                        enemyShips[j].active = false;
                        enemyShips[j].exploding = true;
                        enemyShips[j].frame = 0;
                        enemyShips[j].exFrame = 0;
                        score += enemyShips[j].score;
                    }


                }

            }
        }
        if (playerBullets2[i].active == true) {
            var bulletX = playerBullets2[i].xPos;
            var bulletY = playerBullets2[i].yPos;
            for (var j = 0; j < enemyShips.length; j++) {
                if (enemyShips[j].active == true) {
                    var shipXDim = enemyShips[j].xDim;
                    var shipYDim = enemyShips[j].yDim;
                    var shipXMin = enemyShips[j].xPos;
                    var shipYMin = enemyShips[j].yPos;
                    var shipXMax = enemyShips[j].xPos + shipXDim;
                    var shipYMax = enemyShips[j].yPos + shipYDim;

                    var xDimHit = false;
                    var yDimHit = false;



                    if (bulletX > shipXMin && bulletX < shipXMax) {
                        xDimHit = true;
                    }


                    if (bulletY > shipYMin && bulletY < shipYMax - 18) {
                        yDimHit = true;
                    }

                    var random = Math.floor((Math.random() * 10) + 1);
                    if (xDimHit == true && yDimHit == true) {
                        playerBullets2[i].active = false;

                        hitAudio.play();

                        if (enemyShips[j].invincibleFrames == 0) {
                            enemyShips[j].health -= 1;

                        }
                        if (enemyShips[j].type == 3) {
                            random = Math.floor((Math.random() * 6) + 1);
                            if (enemyShips[j].invincibleFrames == 0) {
                                enemyShips[j].invincibleFrames = 30;
                            }
                            enemyShips[j].image = enemyShipImages[3];
                        }



                    }

                    if (enemyShips[j].health <= 0 && enemyShips[j].active == true) {
                        bombCounter -= enemyShips[j].type;
                        if (bombCounter < 0) {
                            bombCounter = 0;
                        }
                        if (random == 3 && lifePowerActive == false) {
                            lifePowerActive = true;
                            lifePowerX = enemyShips[j].xPos;
                            lifePowerY = enemyShips[j].yPos;
                        }
                        if (random == 1 && powerActive == false) {
                            var random2 = Math.floor((Math.random() * 5) + 1);
                            if (random2 == 2) {
                                powerActive = true;
                                powerX = enemyShips[j].xPos;
                                powerY = enemyShips[j].yPos;
                            }
                        }
                        if (random == 4 && bombPowerActive == false) {
                            var random2 = Math.floor((Math.random() * 5) + 1);

                            if (random2 == 3) {
                                bombPowerActive = true;
                                bombPowerX = enemyShips[j].xPos;
                                bombPowerY = enemyShips[j].yPos;
                            }
                        }
                        enemyShips[j].active = false;
                        enemyShips[j].exploding = true;
                        enemyShips[j].frame = 0;
                        enemyShips[j].exFrame = 0;
                        score += enemyShips[j].score;
                    }


                }
            }
        }
    }

}

// Sets off a bomb if conditions are met
function player_Bomb() {
    if (bombCounter == 0) {
        playerBomb = false;
        plusScore = 0;
        for (i = 0; i < 13; i++) {
            enemyShips[i].health = 0;
            if (enemyShips[i].active == true) {
                plusScore += enemyShips[i].type * 25;
            }
        }
        bombFrames = 60;
        bombCounter = 50;

        score += plusScore;
        bombExplosionAudio.play();
    }
}
