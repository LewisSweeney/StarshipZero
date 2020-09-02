var lifePowerActive = false;
var lifePowerX = 0;
var lifePowerY = 0;
var lifeDimX = 30;
var lifeDimY = 30;

// Draws the life powerup if it is currently active
function draw_Life_Powerup() {
    if (lifePowerY >= 600) {
        lifePowerActive = false;
    }
    if (lifePowerActive == true) {
        ctx.drawImage(lifeImg, lifePowerX, lifePowerY);
        lifePowerY += 2;
    }
}

// Checks if the player has collided with the life powerup. If they have, a random value between 1 and 10 is added to the player's current life
function life_Powerup_Collision() {
    if (playerActive == true & lifePowerActive == true) {

        var playXMax = playerX + playXDim;
        var playYMax = playerY + playYDim;
        var playXMin = playerX;
        var playYMin = playerY;

        var playXHit = false;
        var playYHit = false;

        if (lifePowerX > playXMin && lifePowerX < playXMax) {
            playXHit = true;
        }

        if ((lifePowerX + lifeDimX) <= playXMax && (lifePowerX + lifeDimX) >= playXMin) {
            playXHit = true;
        }

        if ((lifePowerY + lifeDimY) >= playYMin && (lifePowerY + lifeDimY) <= playYMax) {
            playYHit = true;
        }
        if (lifePowerY <= playYMax && lifePowerY >= playYMin) {
            playYHit = true;
        }

        if (playXHit == true && playYHit == true) {

            lifeUpAudio.play();

            score += 20;
            var randomLife = Math.floor((Math.random() * 10) + 1);

            life += randomLife;
            if (life >= 100) {
              life = 100;
            }
            lifePowerActive = false;
        }

    }
}
