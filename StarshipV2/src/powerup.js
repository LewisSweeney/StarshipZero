var powerActive = false;
var powerX = 0;
var powerY = 0;
var powerDimX = 30;
var powerDimY = 30;

// Draws the powerup if it is currently active
function draw_Powerup() {
    if (powerY >= 800) {
        powerActive = false;
    }
    if (powerActive == true) {
        ctx.drawImage(powerUpImg, powerX, powerY);
        powerY += 3;
    }
}

// Checks collision with the player ship. If the player collides with the power up and their ship's level is below 2, the ship levels up.
// Higher level ships shoot faster.
// The power up also restores 10 health to the player and adds 50 to their current score
function powerup_Collision() {
    if (playerActive == true & powerActive == true) {

        var playXMax = playerX + playXDim;
        var playYMax = playerY + playYDim;
        var playXMin = playerX;
        var playYMin = playerY;

        var playXHit = false;
        var playYHit = false;

        if (powerX >= playXMin && powerX < playXMax) {
            playXHit = true;
        }

        if ((powerX + powerDimX) <= playXMax && (powerX + powerDimX) >= playXMin) {
            playXHit = true;
        }

        if ((powerY + powerDimY) >= playYMin && (powerY + powerDimY) <= playYMax) {
            playYHit = true;
        }
        if (powerY <= playYMax && powerY >= playYMin) {
            playYHit = true;
        }

        if (playXHit == true && playYHit == true) {

            powerUpAudio.play();

            score += 50;

            if (playerLevel < 2) {
                playerLevel += 1;
                life += 25;
            } else if (playerLevel >= 2 && doubleShotActive == false) {
                doubleShotActive = true;
                life += 25;
            } else {
                life += 75;
            }
            if (life > 100) {
              life = 100;
            }
            powerActive = false;
            powerX = 0;
            powerY = 0;
            powerDimX = 30;
            powerDimY = 30;



        }

    }
}
