var enemyShips = new Array(13);
var enemyShipImages = new Array(4);
var bulletChance = 25;

// Checks if any enemy bullets have hit the player, and reduces the player's health variable if so
function enemy_Bullet_Collision() {
    for (var i = 0; i < enemyShips.length; i++) {
        if (enemyShips[i].bulletActive == true) {
            var bulletX = enemyShips[i].bulletXPos;
            var bulletY = enemyShips[i].bulletYPos;
            var shipXMin = playerX;
            var shipYMin = playerY;
            var shipXMax = playerX + playXDim;
            var shipYMax = playerY + playYDim;

            var xDimHit = false;
            var yDimHit = false;

            if (bulletX >= shipXMin && bulletX <= shipXMax + 15) {
                xDimHit = true;
            }
            if (bulletX + 4 >= shipXMin && bulletX + 4 <= shipXMax) {
                xDimHit = true;
            }

            if (bulletY + 4 >= shipYMin + 18 && bulletY + 4 <= shipYMax) {
                yDimHit = true;
            }
            if (bulletY <= shipYMin + 18 && bulletY >= shipYMax) {
                yDimHit = true;
            }


            if (xDimHit == true && yDimHit == true) {

                playerHitAudio.play();

                life -= 5 * enemyShips[i].type;
                enemyShips[i].bulletActive = false;

            }

        }
        if (enemyShips[i].bullet2Active == true) {
            var bullet2X = enemyShips[i].bullet2XPos;
            var bullet2Y = enemyShips[i].bullet2YPos;
            var shipXMin = playerX;
            var shipYMin = playerY;
            var shipXMax = playerX + playXDim;
            var shipYMax = playerY + playYDim;

            var xDimHit = false;
            var yDimHit = false;

            if (bulletX >= shipXMin && bulletX <= shipXMax + 10) {
                xDimHit = true;
            }
            if (bulletX + 4 >= shipXMin && bulletX + 4 <= shipXMax) {
                xDimHit = true;
            }


            if (bulletY + 4 >= shipYMin + 20 && bulletY + 4 <= shipYMax) {
                yDimHit = true;
            }
            if (bulletY <= shipYMin + 20 && bulletY >= shipYMax) {
                yDimHit = true;
            }


            if (xDimHit == true && yDimHit == true) {

                hitAudio.play();
                life -= 5 * enemyShips[i].type;
                if (enemyShips[i].type == 3) {
                    if (doubleShotActive == true) {
                        doubleShotActive == false;
                    } else if (playerLevel > 0) {
                        playerLevel -= 1;
                    }
                }
                enemyShips[i].bulletActive = false;

            }

        }
    }
}

// Checks if the player and an enemy ship have collided. If so, both the colliding ship and the player have their health reduced
function enemy_Ship_Collision() {
    if (playerActive == true) {
        for (var i = 0; i < enemyShips.length; i++) {
            if (enemyShips[i].active == true) {
                var shipXMin = enemyShips[i].xPos;
                var shipYMin = enemyShips[i].yPos;
                var shipXDim = enemyShips[i].xDim;
                var shipYDim = enemyShips[i].yDim;
                var shipXMax = enemyShips[i].xPos + shipXDim;
                var shipYMax = enemyShips[i].yPos + shipYDim;

                var playXMax = playerX + playXDim;
                var playYMax = playerY + playYDim;
                var playXMin = playerX;
                var playYMin = playerY;

                var playXHit = false;
                var playYHit = false;

                if (shipXMin >= playXMin && shipXMin <= playXMax - 5) {
                    playXHit = true;
                }

                if (shipXMax <= playXMax && shipXMax >= playXMin + 5) {
                    playXHit = true;
                }

                if (shipYMax >= playYMin + 10 && shipYMax <= playYMax) {
                    playYHit = true;
                }
                if (shipYMin <= playYMax && shipYMin >= playYMin) {
                    playYHit = true;
                }

                if (playXHit == true && playYHit == true) {

                    playerHitAudio.play();


                    hitAudio.play();

                    enemyShips[i].health = enemyShips[i].health - 1;
                    life -= 5 * enemyShips[i].type;

                    if (enemyShips[i].type == 2) {
                        if (doubleShotActive == true) {
                            doubleShotActive == false;
                        } else if (playerLevel > 0) {
                            playerLevel -= 1;
                        }
                    }
                }

                if (enemyShips[i].health <= 0 && enemyShips[i].active == true) {
                    enemyShips[i].active = false;
                    enemyShips[i].exploding = true;
                    enemyShips[i].frame = 0;
                    enemyShips[i].exFrame = 0;
                }

            }
        }
    }
}

// Randomly generates enemy ships, and randomly sets their types (if applicable)
// Different types of ships are initialised differently, with differnent amounts of life and strengths
function enemy_Ship_Gen() {
    var chance = Math.floor((Math.random() * 22) + 1);
    if (chance == 2) {
        var shipChosen = false;
        for (var i = 0; i < enemyShips.length; i++) {
            if (enemyShips[i].active == false && shipChosen == false && enemyShips[i].exploding == false) {
                var chance2 = Math.floor((Math.random() * 12) + 1);
                if (chance2 == 5 /*&& score > 1250*/) {
                    typeThreeExist = false;
                    for (j = 0; j < 13; j++) {
                        if (enemyShips[j].active == true && enemyShips[j].type == 3) {
                            typeThreeExist = true;
                        }
                    }
                    if (typeThreeExist == false) {
                        enemy_Gen(i, 3);
                        shipChosen = enemy_Gen;
                    }

                } else if (score > 750 && chance2 == 4 && shipChosen == false) {
                    enemy_Gen(i, 2);
                    shipChosen = enemy_Gen;
                } else if (shipChosen == false) {
                    enemy_Gen(i, 1);
                    shipChosen = enemy_Gen;
                }
            }
        }
    }
}

// Generates enemy ship according to player type
function enemy_Gen(i, shipType) {
    if (shipType == 1) {
        enemyShips[i].xPos = Math.floor((Math.random() * 381) + 10);
        enemyShips[i].yPos = -45;
        enemyShips[i].xDim = 39;
        enemyShips[i].yDim = 39;
        for (j = 0; j < 13; j++) {
            if (j != i) {
                genYBound = enemyShips[i].yPos + enemyShips[i].yDim;
                genXBound = enemyShips[i].xPos + enemyShips[i].xDim;
                if (genYBound > enemyShips[j].yPos) {
                    if (!(enemyShips[i].xPos > (enemyShips[j].xPos + enemyShips[j].xDim) || genXBound < enemyShips[j].xPos)) {
                        enemyShips[i].xPos = Math.floor((Math.random() * 375) + 10);
                        j = 0;
                    }
                }
            }
        }

        enemyShips[i].speed = 2;
        enemyShips[i].image = enemyShipImages[0];

        enemyShips[i].type = shipType;
        enemyShips[i].score = 10;
        enemyShips[i].health = 1;
        canGen = true;
        for (j = 0; j < 13; j++) {
            checkXPos = enemyShips[j].xPos;
            checkYPos = enemyShips[j].yPos;
            checkXDim = enemyShips[j].xDim;
            checkYDim = enemyShips[j].yDim;

        }

        if (canGen == true) {
            enemyShips[i].active = true;
        }
    } else if (shipType == 2) {

        enemyShips[i].xPos = Math.floor((Math.random() * 375) + 10);
        enemyShips[i].yPos = -45;
        enemyShips[i].xDim = 51;
        enemyShips[i].yDim = 51;
        for (j = 0; j < 13; j++) {
            if (j != i) {
                genYBound = enemyShips[i].yPos + enemyShips[i].yDim;
                genXBound = enemyShips[i].xPos + enemyShips[i].xDim;
                if (genYBound > enemyShips[j].yPos) {
                    if (!(enemyShips[i].xPos > (enemyShips[j].xPos + enemyShips[j].xDim) || genXBound < enemyShips[j].xPos)) {
                        enemyShips[i].xPos = Math.floor((Math.random() * 375) + 10);
                        j = 0;
                    }
                }
            }
        }


        if (score > 1000) {
            enemyShips[i].speed = 7;
        } else {
            enemyShips[i].speed = 5;
        }
        enemyShips[i].image = enemyShipImages[1];
        enemyShips[i].score = 30;
        enemyShips[i].type = 2;
        enemyShips[i].health = 1;
        canGen = true;
        for (j = 0; j < 13; j++) {
            checkXPos = enemyShips[j].xPos;
            checkYPos = enemyShips[j].yPos;
            checkXDim = enemyShips[j].xDim;
            checkYDim = enemyShips[j].yDim;

        }

        if (canGen == true) {
            enemyShips[i].active = true;
        }




    } else if (shipType == 3) {

        enemyShips[i].xPos = Math.floor((Math.random() * 325) + 10);
        enemyShips[i].yPos = -45;
        enemyShips[i].xDim = 105;
        enemyShips[i].yDim = 51;
        for (j = 0; j < 13; j++) {
            if (j != i) {
                genYBound = enemyShips[i].yPos + enemyShips[i].yDim;
                genXBound = enemyShips[i].xPos + enemyShips[i].xDim;
                if (genYBound > enemyShips[j].yPos) {
                    if (!(enemyShips[i].xPos > (enemyShips[j].xPos + enemyShips[j].xDim) || genXBound < enemyShips[j].xPos)) {
                        enemyShips[i].xPos = Math.floor((Math.random() * 375) + 10);
                        j = 0;
                    }
                }
            }
        }
        enemyShips[i].speed = 1;
        enemyShips[i].image = enemyShipImages[2];

        enemyShips[i].score = 100;
        enemyShips[i].type = 3;
        enemyShips[i].health = 3;

        canGen = true;

        if (canGen == true) {
            enemyShips[i].active = true;
        }
    }
    // Default enemy ship
    else {
        enemyShips[i].xPos = Math.floor((Math.random() * 381) + 10);
        enemyShips[i].yPos = -45;
        enemyShips[i].xDim = 39;
        enemyShips[i].yDim = 39;
        for (j = 0; j < 13; j++) {
            if (j != i) {
                genYBound = enemyShips[i].yPos + enemyShips[i].yDim;
                genXBound = enemyShips[i].xPos + enemyShips[i].xDim;
                if (genYBound > enemyShips[j].yPos) {
                    if (!(enemyShips[i].xPos > (enemyShips[j].xPos + enemyShips[j].xDim) || genXBound < enemyShips[j].xPos)) {
                        enemyShips[i].xPos = Math.floor((Math.random() * 375) + 10);
                        j = 0;
                    }
                }
            }
        }

        enemyShips[i].speed = 2;
        enemyShips[i].image = enemyShipImages[0];

        enemyShips[i].type = shipType;
        enemyShips[i].score = 10;
        enemyShips[i].health = 1;

        canGen = true;
        for (j = 0; j < 13; j++) {
            checkXPos = enemyShips[j].xPos;
            checkYPos = enemyShips[j].yPos;
            checkXDim = enemyShips[j].xDim;
            checkYDim = enemyShips[j].yDim;
            if (!(enemyShips[i].yPos + enemyShips[i].yDim) < checkYPos) {
                if (!(enemyShips[i].xPos > checkXPos + checkXDim || enemyShips[i].xPos + enemyShips[i].xDim < checkXPos)) {
                    canGen = false;
                }
            }
        }

        if (canGen == true) {
            enemyShips[i].active = true;
        }
    }
    return true;
}

// Randomly generates and initialises enemy bullets
function enemy_Bullet_Gen() {
    if (score > 500 && score < 1000) {
        bulletChance = 15;
    } else if (score > 1000 && score < 1500) {
        bulletChance = 5;
    } else if (score > 1500) {
        bulletChance = 2;
    }
    var randomShip = Math.floor((Math.random() * enemyShips.length) + 1) - 1;
    if (enemyShips[randomShip].active == true && enemyShips[randomShip].type != 2 && enemyShips[randomShip].bulletActive == false) {
        var randomChance = Math.floor((Math.random() * bulletChance) + 1);
        if (randomChance == 1) {
            if (enemyShips[randomShip].type == 3) {
                enemyShips[randomShip].bulletActive = true;
                enemyShips[randomShip].bulletYPos = enemyShips[randomShip].yPos + enemyShips[randomShip].yDim;
                enemyShips[randomShip].bulletXPos = enemyShips[randomShip].xPos + (enemyShips[randomShip].xDim / 4);
                enemyShips[randomShip].bullet2ActiveActive = true;
                enemyShips[randomShip].bullet2YPos = enemyShips[randomShip].yPos + enemyShips[randomShip].yDim;
                enemyShips[randomShip].bullet2XPos = enemyShips[randomShip].xPos + ((enemyShips[randomShip].xDim / 4) * 3);
            } else {
                enemyShips[randomShip].bulletActive = true;
                enemyShips[randomShip].bulletYPos = enemyShips[randomShip].yPos + enemyShips[randomShip].yDim;
                enemyShips[randomShip].bulletXPos = enemyShips[randomShip].xPos + (enemyShips[randomShip].xDim / 2);
            }
        }
    }
}

// Draws all active enemy bullets on the canvas
function enemy_Bullet_Draw() {

    for (var i = 0; i < enemyShips.length; i++) {
        if (enemyShips[i].bulletYPos > 600) {
            enemyShips[i].bulletActive = false;
        }
        if (enemyShips[i].bulletActive == true) {


            ctx.drawImage(enemyBullet, enemyShips[i].bulletXPos, enemyShips[i].bulletYPos);

            if (score > 3000) {
                enemyShips[i].bulletYPos += 7;
            } else {
                enemyShips[i].bulletYPos += 5;
            }


            if (enemyShips[i].type == 3) {
                ctx.drawImage(enemyBullet, enemyShips[i].bullet2XPos, enemyShips[i].bullet2YPos);

                if (score > 3000) {
                    enemyShips[i].bullet2YPos += 7;
                } else {
                    enemyShips[i].bullet2YPos += 5;
                }
            }

        }

    }
}

// Draws all active enemy ships on the canvas
function enemy_Ship_Draw() {
    ctx.globalAlpha = 1;
    for (var i = 0; i < enemyShips.length; i++) {
        if (enemyShips[i].active == true) {
            var image = enemyShips[i].image;
            enemyShips[i].yPos += enemyShips[i].speed;


            ctx.drawImage(image, enemyShips[i].xPos, enemyShips[i].yPos);
            if (enemyShips[i].yPos > 600 && enemyShips[i].active == true) {
                enemyShips[i].active = false;
            }
            if (enemyShips[i].type == 3) {
                if (enemyShips[i].xPos < playerX) {
                    enemyShips[i].xPos++;
                    if (enemyShips[i].xPos > 325) {
                        enemyShips[i].xPos = 325;
                    }
                }
                if (enemyShips[i].xPos > playerX) {
                    enemyShips[i].xPos--;
                    if (enemyShips[i].xPos < 10) {
                        enemyShips[i].xPos = 10;
                    }
                }
            }
            if (enemyShips[i].type == 2 && score > 2500) {
                enemyShips[i].speed = 9;
            }
        }

    }



}

// Checks each enemy ship. If it has any invincible frames (applicable only to type 3 ships) then these are decremented until the frames reach 0, // at which point the enemy can take damage again (ship colour changes when invincible)
function enemy_Check() {
    for (var i = 0; i < enemyShips.length; i++) {
        if (enemyShips[i].type == 3 && enemyShips[i].invincibleFrames > 0) {
            enemyShips[i].invincibleFrames--;
        }
        if (enemyShips[i].type == 3 && enemyShips[i].invincibleFrames == 0) {
            enemyShips[i].image = enemyShipImages[2];
        }
    }
}