// Moves the player according to the keys being pressed currently (includes shooting bullets)
function move_Player() {
  canvas.width = canvas.width;


  if (bombFrames == 0) {
    if (keys[32] || keys[13]) {
      if (playerActive == true) {
        player_Bullet_Init();
      }
    }
  }

  // Player speed is lower when shooting
  if (keys[32] || keys[13]) {
    playerSpeed = 2;
    // Player speed is faster when not shooting
  } else {
    playerSpeed = 9;
  }

  // Move right
  if (keys[39] || keys[68]) {
    if (playerActive == true) {
      if (playerVelocity < playerSpeed) {
        playerVelocity++;
      }
    }
  }

  // Move left
  if (keys[37] || keys[65]) {
    if (playerActive == true) {
      if (playerVelocity > -playerSpeed) {
        playerVelocity--;
      }
    }
  }

  playerVelocity *= playerFriction;
  playerX += playerVelocity;
  if (playerX >= 365) {
    playerX = 365;

  } else if (playerX <= 5) {
    playerX = 5;

  }


}

// Listens for key presses other than the
window.onkeydown = function(e) {
  var code = e.keyCode ? e.keyCode : e.which;

  if (code === 27 && menuOpen == false) {
    pause();
  }
  if (code === 90 && menuOpen == false) {
    player_Bomb();
  }
};
