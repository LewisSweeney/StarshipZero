var gameOverAudio = new Audio();
var alphabet = new Array();
var gameOverImage = new Image();

// Initialises variables used on thee game over screen
function initialiseGameOver() {
    gameOverImage.src = 'StarshipZero/GameOver/Images/GameOver.png';
    gameOverAudio.src = 'StarshipZero/GameOver/Audio/GameOver.wav';
}

// Draws the game over screen
function draw_GameOver() {
    canvas.width = canvas.width;
    if (musicPlaying == true) {
        gameOverAudio.play();
    }
    ctx.drawImage(gameOverImage, 93, 267);
    hiScoreActive = true;
    setTimeout(draw_Highscore_Input_Page, 2500);

}