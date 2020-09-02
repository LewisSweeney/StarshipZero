var bombPowerActive = false;
var bombPowerX = 0;
var bombPowerY = 0;
var bombPowerDimX = 30;
var bombPowerDimY = 30;

// Draws the powerup if it is currently active
function draw_BombPowerup() {
    if (bombPowerY >= 600) {
        powerActive = false;
    }
    if (bombPowerActive == true) {
        ctx.drawImage(bombPowerUpImg, bombPowerX, bombPowerY);
        bombPowerY += 3;
    }
}

// Checks collision with the player ship. If the player collides with the power up and their ship's level is below 2, the ship levels up.
// Higher level ships shoot faster. 
// The power up also restores 10 health to the player and adds 50 to their current score
function bombPowerup_Collision() {
    if (playerActive == true & bombPowerActive == true) {

        var playXMax = playerX + playXDim;
        var playYMax = playerY + playYDim;
        var playXMin = playerX;
        var playYMin = playerY;

        var playXHit = false;
        var playYHit = false;

        if (bombPowerX >= playXMin && powerX < playXMax) {
            playXHit = true;
        }

        if ((bombPowerX + bombPowerDimX) <= playXMax && (bombPowerX + bombPowerDimX) >= playXMin) {
            playXHit = true;
        }

        if ((bombPowerY + bombPowerDimY) >= playYMin && (bombPowerY + bombPowerDimY) <= playYMax) {
            playYHit = true;
        }
        if (bombPowerY <= playYMax && bombPowerY >= playYMin) {
            playYHit = true;
        }

        if (playXHit == true && playYHit == true) {
            powerUpAudio.play();
            score += 50;
            bombCounter = 0;
            bombPowerActive = false;
        }

    }
}