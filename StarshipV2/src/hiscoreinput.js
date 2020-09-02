var alphabet = new Array(26);
var alphabetImage = new Array(26);
var nameImg = new Image();
var scoreImg = new Image();
var pressEnterImg = new Image();
var arrowUp = new Image();
var arrowDown = new Image();
var letter1 = 0;
var letter2 = 0;
var letter3 = 0;
var arrowXPos = 135;
var arrowUpY = 140;
var arrowDownY = 250;
var hiScoreActive = false;
var pressEnterDisplay = true;
var enterDate = new Date();
var enterTime = date.getTime();
var name;


// Initialises variables that are used in taking the high score inputs
function initialiseHighScoreInput() {
    scoreImg.src = 'StarshipZero/HiScore/Images/SCORE.png';
    nameImg.src = 'StarshipZero/HiScore/Images/NAME.png';
    pressEnterImg.src = 'StarshipZero/HiScore/Images/PRESSENTER.png';
    arrowUp.src = 'StarshipZero/HiScore/Images/arrowUp.png';
    arrowDown.src = 'StarshipZero/HiScore/Images/arrowDown.png';

    alphabet[0] = "A";
    alphabet[1] = "B";
    alphabet[2] = "C";
    alphabet[3] = "D";
    alphabet[4] = "E";
    alphabet[5] = "F";
    alphabet[6] = "G";
    alphabet[7] = "H";
    alphabet[8] = "I";
    alphabet[9] = "J";
    alphabet[10] = "K";
    alphabet[11] = "L";
    alphabet[12] = "M";
    alphabet[13] = "N";
    alphabet[14] = "O";
    alphabet[15] = "P";
    alphabet[16] = "Q";
    alphabet[17] = "R";
    alphabet[18] = "S";
    alphabet[19] = "T";
    alphabet[20] = "U";
    alphabet[21] = "V";
    alphabet[22] = "W";
    alphabet[23] = "X";
    alphabet[24] = "Y";
    alphabet[25] = "Z";

    for (var i = 0; i < alphabetImage.length; i++) {
        alphabetImage[i] = {
            letter: alphabet[i],
            image: new Image()
        }
        alphabetImage[i].image.src = 'StarshipZero/HiScore/Images/Alphabet/' + i + '.png';
    }
}

// Draws the Highscore input page
function draw_Highscore_Input_Page() {
    buttonsDeactivated = false;
    hiScoreActive = true;
    canvas.width = canvas.width;
    ctx.drawImage(nameImg, 157, 45);
    ctx.drawImage(scoreImg, 10, 330);
    ctx.font = '24px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.fillText(score, 180, 360);
    var image1 = alphabetImage[letter1].image;
    var image2 = alphabetImage[letter2].image;
    var image3 = alphabetImage[letter3].image;
    ctx.drawImage(image1, 130, 190);
    ctx.drawImage(image2, 190, 190);
    ctx.drawImage(image3, 250, 190);
    ctx.drawImage(arrowUp, arrowXPos, arrowUpY);
    ctx.drawImage(arrowDown, arrowXPos, arrowDownY);
    if (pressEnterDisplay == true) {
        ctx.drawImage(pressEnterImg, 68, 450)
    }
    check_Enter_Display();
    hiId = requestAnimationFrame(draw_Highscore_Input_Page)
    window.hiId;
}


// Takes keyCode e and executes a method based on that keyCode
function move_Score(e) {
    if (hiScoreActive == true && buttonsDeactivated == false) {

        

        if (e.keyCode == 37) {
            move_Score_Left();
        } else if (e.keyCode == 38) {
            move_Score_Up();
        } else if (e.keyCode == 39) {
            move_Score_Right();
        } else if (e.keyCode == 40) {
            move_Score_Down();
        } else if (e.keyCode == 13) {
            buttonsDeactivated = true;
            hiScoreActive = false;
            menuSelectAudio.play();
            window.cancelAnimationFrame(hiId);
            setTimeout(reset, 1000);
        }
    }
}

// Moves the letter selection arrows to the left
function move_Score_Left() {
    selectAudio.play();
    if (arrowXPos == 255) {
        arrowXPos = 195;
    } else if (arrowXPos == 195) {
        arrowXPos = 135;
    } else if (arrowXPos == 135) {
        arrowXPos = 255;
    }

}

// Moves the letter selection arrows to the right
function move_Score_Right() {
    selectAudio.play();
    if (arrowXPos == 255) {
        arrowXPos = 135;
    } else if (arrowXPos == 195) {
        arrowXPos = 255;
    } else if (arrowXPos == 135) {
        arrowXPos = 195;
    }

}

// Changes the current letter to the one previous in the alphabet (A wraps around to Z)
function move_Score_Up() {
    selectAudio.play();
    if (arrowXPos == 255) {
        if (letter3 > 0) {
            letter3--;
        } else if (letter3 == 0) {
            letter3 = 25;
        } else if (letter3 < 25) {
            letter3--;
        }
    } else if (arrowXPos == 195) {
        if (letter2 > 0) {
            letter2--;
        } else if (letter2 == 0) {
            letter2 = 25;
        }
    } else if (arrowXPos == 135) {
        if (letter1 > 0) {
            letter1--;
        } else if (letter1 == 0) {
            letter1 = 25;
        }
    }

}
// Changes the current letter to the one next in the alphabet (Z wraps around to A)
function move_Score_Down() {
    selectAudio.play();
    if (arrowXPos == 255) {
        if (letter3 < 25) {
            letter3++;
        } else if (letter3 == 25) {
            letter3 = 0;
        }
    } else if (arrowXPos == 195) {
        if (letter2 < 25) {
            letter2++;
        } else if (letter2 == 25) {
            letter2 = 0;
        }
    } else if (arrowXPos == 135) {
        if (letter1 < 25) {
            letter1++;
        } else if (letter1 == 25) {
            letter1 = 0;
        }
    }

}

// Checks the state of the image telling the user to press enter to finish
function check_Enter_Display() {
    var newDate = new Date();
    var newTime = newDate.getTime();

    if (newTime > 699 + enterTime) {
        if (pressEnterDisplay == true) {
            pressEnterDisplay = false;
            enterTime = newTime;
        } else if (pressEnterDisplay == false) {
            pressEnterDisplay = true;
            enterTime = newTime;
        }
    }
}

// Resets the game and takes the user back to the main menu
function reset() {
    menuSelectAudio.play();
    name = alphabetImage[letter1].letter + alphabetImage[letter2].letter + alphabetImage[letter3].letter;
    save_Score();
    gameOverAudio.pause();
    buttonsDeactivated = true;
    menuActive = true;
    gameStarted = false;
    //window.location.reload();
}

function save_Score() {
    document.hiscore.name.value = name;
    document.hiscore.score.value = score;
    document.forms["hiscore"].submit();
}
document.addEventListener('keydown', move_Score, true);