var ready = new Image();
var lifeImg = new Image();
var powerUpImg = new Image();
var bombPowerUpImg = new Image();

var enemyBullet = new Image();
var gameAudio = new Audio();
var readyAudio = new Audio();
var shootAudio = new Audio();
var explosionAudio = new Audio();
var bombExplosionAudio = new Audio();
var hitAudio = new Audio();
var lifeUpAudio = new Audio();
var powerUpAudio = new Audio();
var playerHitAudio = new Audio();
var gameMusicPlaying;
var menuOpen = true;



var gameStarted = new Boolean();


var date = new Date();
var time = date.getTime();



var fillOpacity = 0;
var warningOpacity = 0;
var bombOpacity = 0;
var chargeOpacity = 0;

var bombFrames = 0;

var opacityDown = false;


var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

var isPaused = false;


// Initialises all variables used when playing the game
function initialiseGame() {
  gameStarted = false;
  fillOpacity = 0;
  warningOpacity = 0;
  bombOpacity = 0;
  chargeOpacity = 0;
  opacityDown = false;
  gameMusicPlaying = musicPlaying;

  ready.src = 'StarshipZero/Game/Images/ready.png';
  lifeImg.src = 'StarshipZero/Game/Images/life.png';
  powerUpImg.src = 'StarshipZero/Game/Images/powerup.png';
  bombPowerUpImg.src = 'StarshipZero/Game/Images/bombpowerup.png';
  enemyBullet.src = 'StarshipZero/Game/Images/bullet3.png';

  gameAudio.src = 'StarshipZero/Game/Audio/GameMusic.wav';
  readyAudio.src = 'StarshipZero/Game/Audio/ready.wav';
  shootAudio.src = 'StarshipZero/Game/Audio/Shoot.wav';
  shootAudio.src = 'StarshipZero/Game/Audio/Shoot.wav';
  explosionAudio.src = 'StarshipZero/Game/Audio/Explosion.wav';
  bombExplosionAudio.src = 'StarshipZero/Game/Audio/bombExplosion.wav';
  hitAudio.src = 'StarshipZero/Game/Audio/Hit.wav';
  lifeUpAudio.src = 'StarshipZero/Game/Audio/LifeUp.wav';
  powerUpAudio.src = 'StarshipZero/Game/Audio/Powerup.wav';
  playerHitAudio.src = 'StarshipZero/Game/Audio/playerHit.wav';


  playerShip[0] = new Image();
  playerShip[0].src = 'StarshipZero/Game/Images/playership0.png';
  playerShip[1] = new Image();
  playerShip[1].src = 'StarshipZero/Game/Images/playership1.png';
  playerShip[2] = new Image();
  playerShip[2].src = 'StarshipZero/Game/Images/playership2.png';

  playerBulletImg[0] = new Image();
  playerBulletImg[0].src = 'StarshipZero/Game/Images/bullet0.png';
  playerBulletImg[1] = new Image();
  playerBulletImg[1].src = 'StarshipZero/Game/Images/bullet1.png';
  playerBulletImg[2] = new Image();
  playerBulletImg[2].src = 'StarshipZero/Game/Images/bullet2.png';


  enemyShipImages[0] = new Image();
  enemyShipImages[0].src = 'StarshipZero/Game/Images/enemyShip1.png';
  enemyShipImages[1] = new Image();
  enemyShipImages[1].src = 'StarshipZero/Game/Images/enemyShip2.png';
  enemyShipImages[2] = new Image();
  enemyShipImages[2].src = 'StarshipZero/Game/Images/enemyShip3.png';
  enemyShipImages[3] = new Image();
  enemyShipImages[3].src = 'StarshipZero/Game/Images/enemyShip3Hit.png';




  for (var i = 0; i < playerBullets.length; i++) {

    playerBullets[i] = {
      xPos: 0,
      yPos: 0,
      active: false
    };
    playerBullets2[i] = {
      xPos: 0,
      yPos: 0,
      active: false
    };
  }

  for (var i = 0; i < enemyShips.length; i++) {
    enemyShips[i] = {
      xPos: 0,
      yPos: -45,
      active: false,
      exploding: false,
      image: enemyShipImages[0],
      type: 1,
      speed: 2,
      health: 1,
      xDim: 39,
      yDim: 39,
      score: 10,
      frame: 1,
      exFrame: 0,
      bulletActive: false,
      bulletYPos: 0,
      bulletXPos: 0,
      bullet2Active: false,
      bullet2YPos: 0,
      bullet2XPos: 0,
      invincibleFrames: 0,
      sound: new Audio()
    };
    enemyShips[i].sound.src = hitAudio.src;
  }

  for (var i = 0; i < explosionImages.length; i++) {
    explosionImages[i] = new Image();
    explosionImages[i].src = 'StarshipZero/Game/Images/Explosion/explosion0' + i + '.png';
  }

}

// Starts the main game
function game_Start() {

  buttonsDeactivated = true;

  backgroundSlowYPos = 0;
  backgroundFastYPos = 0;
  backgroundSlow2YPos = 1200;
  backgroundFast2YPos = 2400;
  gameStarted = true;
  gameMusicPlaying = musicPlaying;
  audio.pause();
  audio.currentTime = 0;

  canvas.width = canvas.width;
  readyAudio.play();

  ctx.drawImage(ready, 115, 280);
  setTimeout(game_Draw, 2500);




}

// Redraws the game canvas every frame until the player dies
function game_Draw() {
  menuOpen = false;
  if (isPaused == false) {
    if (gameMusicPlaying == true) {
      gameAudio.play();
    }
    canvas.width = canvas.width;


    player_Check();
    enemy_Check();
    move_Player();


    draw_Background();

    draw_Move_Characters();

    collision_Checks();

    explosion_Draw();
    draw_Life_Powerup();
    draw_Powerup();
    draw_BombPowerup();


    if (deathRegistered == true) {
      life = 0;
      playerDeadFrames++;
    }

    if (deathRegistered == false) {
      ctx.drawImage(playerShip[playerLevel], playerX, playerY);
    }
    draw_UI();
    bomb_Check();

  }
  player_LifeChecks();
}

// Draws and scrolls the background
function draw_Background() {
  ctx.drawImage(backgroundSlow, 0, backgroundSlowYPos);
  ctx.drawImage(backgroundFast, 0, backgroundFastYPos);
  ctx.drawImage(backgroundSlow, 0, backgroundSlow2YPos);
  ctx.drawImage(backgroundFast, 0, backgroundFast2YPos);
  backgroundSlowYPos = backgroundSlowYPos + 0.6;
  backgroundFastYPos = backgroundFastYPos + 1.2;
  backgroundSlow2YPos = backgroundSlow2YPos + 0.6;
  backgroundFast2YPos = backgroundFast2YPos + 1.2;
  if (backgroundSlowYPos >= 1200) {
    backgroundSlowYPos = -1200;
  }
  if (backgroundSlow2YPos >= 1200) {
    backgroundSlow2YPos = -1200;
  }
  if (backgroundFastYPos >= 2400) {
    backgroundFastYPos = -2400;
  }
  if (backgroundFast2YPos >= 2400) {
    backgroundFast2YPos = -2400;
  }
}

// Checks for any collisions happening in the game
function collision_Checks() {
  life_Powerup_Collision();
  powerup_Collision();
  bombPowerup_Collision();
  enemy_Ship_Collision();
  player_Bullet_Collision();
  enemy_Bullet_Collision();
}

// Checks the player's death frames
function player_LifeChecks() {
  // Starts fading the game screen once the player has been dead for 40 frames
  if (playerDeadFrames > 40) {
    fillOpacity += 0.01;
    ctx.globalAlpha = fillOpacity;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 430, 600);
    ctx.globalAlpha = 1.0;
  }
  // If the player has been dead for 140 frames the game over screen is drawn.
  if (playerDeadFrames == 140) {
    draw_GameOver();
  }
  // If the player hasn't yet been dead for 140 frames the game screen is redrawn until the player has been dead for 140 frames
  if (playerDeadFrames != 140) {
    gameID = window.requestAnimationFrame(game_Draw);
    window.gameID;
  }
}

// If the player is at or below 25% health then the screen flashes red slowly until either the player dies or has health above 25%
function warning_Check() {
  if (life <= 25 && !deathRegistered) {
    if (warningOpacity >= 0.2) {
      opacityDown = true;
    }
    if (warningOpacity <= 0) {
      opacityDown = false;
    }
    if (opacityDown == false) {
      warningOpacity += 0.004;
    }
    if (opacityDown == true) {
      warningOpacity -= 0.004;
    }
    ctx.globalAlpha = warningOpacity;
    ctx.fillStyle = "red";
    ctx.rect(0, 0, 430, 600);
    ctx.fill();
  }
}

function bomb_Check() {
  if (bombFrames > 0) {

    if (bombOpacity >= 0.2) {
      opacityDown = true;
    }
    if (bombOpacity <= 0) {
      opacityDown = false;
    }
    if (opacityDown == false) {
      bombOpacity += 0.05;
    }
    if (opacityDown == true) {
      bombOpacity -= 0.05;
    }

    ctx.globalAlpha = 0.2;
    if (bombOpacity >= 0.1) {
      ctx.fillStyle = "red";
    }
    if (bombOpacity < 0.1) {
      ctx.fillStyle = "yellow";
    }

    ctx.rect(0, 0, 430, 600);
    ctx.fill();

  }
}

function charge_Check() {
  if (bombCounter == 0) {
    if (chargeOpacity >= 0.2) {
      opacityDown = true;
    }
    if (chargeOpacity <= 0) {
      opacityDown = false;
    }
    if (opacityDown == false) {
      chargeOpacity += 0.04;
    }
    if (opacityDown == true) {
      chargeOpacity -= 0.04;
    }
    if (chargeOpacity >= 0.1) {
      ctx.fillStyle = "green";
    }
    if (chargeOpacity < 0.1) {
      ctx.fillStyle = "white";
    }
  }
}

function pause() {
  if (isPaused == true) {
    isPaused = false;
    gameAudio.play();

  } else if (isPaused == false) {
    isPaused = true;
    gameAudio.pause();
    ctx.globalAlpha = .5;
    ctx.fillStyle = "black";
    ctx.rect(0, 0, 430, 600);
    ctx.fill();
  }

  powerUpAudio.play();




}

// Moves any characters (ships and bullets) around the screen by calling on their respective methods
function draw_Move_Characters() {
  if (bombFrames == 0) {
    enemy_Ship_Gen();
    enemy_Ship_Draw();
    enemy_Bullet_Gen();

  } else {
    bombFrames--;
  }
  player_Bullet_Draw();
  enemy_Bullet_Draw();
}

// Draws the player's score and remaining life
function draw_UI() {
  var lifeYPos = 560;
  var lifeXPos = 310;

  ctx.font = '12px "Press Start 2P"';
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 570);
  ctx.fillText("Shield: " + life + "%", 280, 590);
  ctx.fillStyle = "green";
  if (bombCounter > 0) {
    ctx.fillText("Bomb Charge: ", 10, 590);
  }
  if (bombCounter == 0) {
    ctx.fillText("Bomb Ready!  ", 10, 590);
    charge_Check();
  }


  ctx.fillRect(160, 578, (50 - bombCounter) * 2, 10);
  warning_Check();

}



document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});
