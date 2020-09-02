var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.style.background = 'black';
// Variables for the menu
// The images loaded in are sprites 
var backgroundSlow = new Image(); // This and backgroundFas will hold the two layers of the parallax background
var backgroundFast = new Image();
var menuActive = true;
var buttonsDeactivated = false;
var logo = new Image(); // Logo of the game
var play = new Image(); // Play option of the menu        
var instructions = new Image(); // Instructions option of the menu
var optionsMute = new Image(); // Mute option of the menu - Not displayed if unmute is being displayed
var optionsUnmute = new Image(); // Unmute option of the menu - Not displayed if mute is being displayed
var hiscore = new Image();
var rightArrow = new Image();
var instructionsImage1 = new Image();
var instructionsImage2 = new Image();


var soundStateImage;
var audio = new Audio();
var selectAudio = new Audio();
var menuSelectAudio = new Audio();
var instructionDisplayed = new Boolean();
var optionDisplayed = new Boolean();
var musicPlaying = true;
var yPos = 213;
var optionYPos = 203;
var backgroundSlowYPos = 0;
var backgroundFastYPos = 0;
var backgroundSlow2YPos = 1200;
var backgroundFast2YPos = 2400;
var id;
var instructionId;
var optionId;


// Populates the variables for the entire game using all of the defined initialise functions
function initialise() {

    initialiseBackground();
    initialiseMenu();
    initialiseOptions();
    initialiseInstructions();
    initialiseMainAudio();
    initialiseGame();
    initialiseGameOver();
    initialiseHighScoreInput();
    initialisePlayer();

    instructionDisplayed = false;


    draw_Menu();
}

// Initialises variables used in drawing and scrolling the background
function initialiseBackground() {
    backgroundSlow.src = 'StarshipZero/backgroundSlow.png';
    backgroundFast.src = 'StarshipZero/backgroundFast.png';
}

// Initialises variables used in muting/unmuting the sound
function initialiseOptions() {
    optionsMute.src = 'StarshipZero/Menu/Images/mute.png';
    optionsUnmute.src = 'StarshipZero/Menu/Images/unmute.png';
    soundStateImage = optionsMute;
}

// Initialises any variables used in drawing and using the main menu
function initialiseMenu() {
    logo.src = 'StarshipZero/Menu/Images/starship.png';
    play.src = 'StarshipZero/Menu/Images/play.png';
    hiscore.src = 'StarshipZero/Menu/Images/highscores.png';
    instructions.src = 'StarshipZero/Menu/Images/instructions.png';



    rightArrow.src = 'StarshipZero/Menu/Images/rightArrow.png';

}

// Initialies any variables used in drawing and using the instructions page
function initialiseInstructions() {
    instructionsImage1.src = 'StarshipZero/Instructions/Instructions1.png';
    instructionsImage2.src = 'StarshipZero/Instructions/Instructions2.png';
}

// Initialises the audio for the main menu
function initialiseMainAudio() {
    audio.src = 'StarshipZero/Menu/Audio/gameMenu.wav';
    selectAudio.src = 'StarshipZero/Menu/Audio/select.wav';
    menuSelectAudio.src = 'StarshipZero/Menu/Audio/menuSelect.wav';
}

// Draws the menu until the user selects play and the game starts
function draw_Menu() {
    buttonsDeactivated = false;
    canvas.width = canvas.width;

    if (Boolean(musicPlaying) == true) {
        audio.play();
        audio.loop = true;
    }
    if (Boolean(musicPlaying) == false) {
        audio.pause();
        audio.currentTime = 0;
    }

    // Draws all the images used in scrolling the background
    ctx.drawImage(backgroundSlow, 0, backgroundSlowYPos);
    ctx.drawImage(backgroundFast, 0, backgroundFastYPos);
    ctx.drawImage(backgroundSlow, 0, backgroundSlow2YPos);
    ctx.drawImage(backgroundFast, 0, backgroundFast2YPos);


    ctx.drawImage(logo, 5, 40);

    // Draws the image in the play variable

    ctx.drawImage(play, 80, 220);

    // Draws the image in the instructions variable

    ctx.drawImage(instructions, 80, 280);

    // Draws the image in the sound state variable

    ctx.drawImage(soundStateImage, 80, 340);

    // Draws the image in the rightArrow variable

    ctx.drawImage(rightArrow, 30, yPos);


    backgroundSlowYPos = backgroundSlowYPos - 0.3;
    backgroundFastYPos = backgroundFastYPos - 0.6;
    backgroundSlow2YPos = backgroundSlow2YPos - 0.3;
    backgroundFast2YPos = backgroundFast2YPos - 0.6;
    if (backgroundSlowYPos <= -1200) {
        backgroundSlowYPos = 1200;
    }
    if (backgroundSlow2YPos <= -1200) {
        backgroundSlow2YPos = 1200;
    }
    if (backgroundFastYPos <= -2400) {
        backgroundFastYPos = 2400;
    }
    if (backgroundFast2YPos <= -2400) {
        backgroundFast2YPos = 2400;
    }

    id = requestAnimationFrame(draw_Menu)
    window.id;
}

// Moves the menu selection up
function move_Up() {
    if (yPos <= 213) {


    } else if (yPos >= 213) {
        yPos = yPos - 62;


        selectAudio.play();


    }
}

// Moves the menu selection down
function move_Down() {
    if (yPos >= 337) {


    } else if (yPos <= 337) {
        yPos = yPos + 62;


        selectAudio.play();


    }
}

// Takes the current key being pressed and executes a function based on that keycode
function move_Menu(e) {
    if (menuActive == true && buttonsDeactivated == false) {
        if (gameStarted == false) {
            if (e.keyCode == 13 || e.keyCode == 32) {

                if (instructionDisplayed == true) {

                    menuSelectAudio.play();

                    instructionDisplayed = false;
                    window.cancelAnimationFrame(instructionId);
                    window.cancelAnimationFrame(id);
                    draw_Menu();
                } else {
                    selection();
                }

            } else if ((e.keyCode == 38 || e.keyCode == 87) && menuActive == true) {
                move_Up();
            } else if ((e.keyCode == 40 || e.keyCode == 83) && menuActive == true) {
                move_Down();
            }
        }
    }
}


// Executes a different method/feature depending on the user's menu position
function selection() {
    if (yPos == 213) {

        menuSelectAudio.play();
        menuActive = false;
        buttonsDeactivated = true;
        window.cancelAnimationFrame(id);


        game_Start();




    }
    if (yPos == 275) {

        menuSelectAudio.play();

        instructionsDisplayed = 1;
        show_Instructions();
    }
    if (yPos == 337) {


        musicPlaying = !musicPlaying;
        if (musicPlaying == true) {
            soundStateImage = optionsMute;
        }
        if (musicPlaying == false) {
            soundStateImage = optionsUnmute;
        }
        menuSelectAudio.play();

    }
}

// Draws the instructions on the screen
function show_Instructions() {
    instructionDisplayed = true;
    instructionId = requestAnimationFrame(show_Instructions);
    ctx.globalAlpha = 0.8;
    ctx.rect(0, 0, 430, 600);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.drawImage(instructionsImage1, 75, 200);
    ctx.drawImage(instructionsImage2, 19, 350);

    window.instructionId;
}






document.addEventListener('keydown', move_Menu, true);