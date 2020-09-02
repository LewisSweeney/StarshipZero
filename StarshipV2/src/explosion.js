var explosionImages = new Array(10);

/* Draws explosions for all entities which currently have their respective "exploding" boolean set to true. If an entity has finished exploding
(explosions last for 30 frames) then the boolean is set to false*/
function explosion_Draw() {
    for (var i = 0; i < enemyShips.length; i++) {
        if (enemyShips[i].exploding == true) {
            if (enemyShips[i].frame <= 3) {
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 3 && enemyShips[i].frame <= 6) {
                enemyShips[i].exFrame = 1;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 6 && enemyShips[i].frame <= 9) {
                enemyShips[i].exFrame = 2;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 9 && enemyShips[i].frame <= 12) {
                enemyShips[i].exFrame = 3;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 12 && enemyShips[i].frame <= 15) {
                enemyShips[i].exFrame = 4;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 15 && enemyShips[i].frame <= 18) {
                enemyShips[i].exFrame = 5;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 18 && enemyShips[i].frame <= 21) {
                enemyShips[i].exFrame = 6;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 21 && enemyShips[i].frame <= 24) {
                enemyShips[i].exFrame = 7;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 24 && enemyShips[i].frame <= 27) {
                enemyShips[i].exFrame = 8;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            if (enemyShips[i].frame > 27 && enemyShips[i].frame <= 30) {
                enemyShips[i].exFrame = 9;
                var explosionFrame = enemyShips[i].exFrame;
                var explosionX = enemyShips[i].xPos;
                var explosionY = enemyShips[i].yPos;
                ctx.drawImage(explosionImages[explosionFrame], explosionX, explosionY);
                enemyShips[i].yPos += enemyShips[i].speed;
            }
            enemyShips[i].frame++;
            if (enemyShips[i].frame >= 30) {
                enemyShips[i].exploding = false;
            }
        }

    }

    if (playerExplode == true) {
        if (playerFrame <= 3) {
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);

        }
        if (playerFrame > 3 && playerFrame <= 6) {
            playerExFrame = 1;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);

        }
        if (playerFrame > 6 && playerFrame <= 9) {
            playerExFrame = 2;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);

        }
        if (playerFrame > 9 && playerFrame <= 12) {
            playerExFrame = 3;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);

        }
        if (playerFrame > 12 && playerFrame <= 15) {
            playerExFrame = 4;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);
        }
        if (playerFrame > 15 && playerFrame <= 18) {
            playerExFrame = 5;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);
        }
        if (playerFrame > 18 && playerFrame <= 21) {
            playerExFrame = 6;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);
        }
        if (playerFrame > 21 && playerFrame <= 24) {
            playerExFrame = 7;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);
        }
        if (playerFrame > 24 && playerFrame <= 27) {
            playerExFrame = 8;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);
        }
        if (playerFrame > 27 && playerFrame <= 30) {
            playerExFrame = 9;
            ctx.drawImage(explosionImages[playerExFrame], playerX + 7, playerY);
        }
        playerFrame++;
        if (playerFrame >= 30) {
            playerExplode = false;
        }
    }
}
