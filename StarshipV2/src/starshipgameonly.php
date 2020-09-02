<!DOCTYPE html>

<html>

<head>
    <title>StarshipZero</title>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Play" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="starship.css" />
    <link rel="shortcut icon" href="logo.png" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body onLoad="initialise()">
<?php
// Imports a php file not located in the public_HTML folder, keeping DB credentials secret
require '../../php/config.php';
// Gets the config string from the config file
$conf = get_config();
// Connects to the postgres DB using the config string from config.php
$conn = pg_connect($conf);

// Declares and sets variables for the user's name and score

// A pre written SQL statement, which when performed will insert the player's name and score as a record into the DB
$query = "SELECT * FROM hiscore ORDER BY score DESC LIMIT 10";

// Performs the query on the database
$res = pg_query ($conn, $query);
    // Closes the database connection
    pg_close($conn);

?>


        <canvas id="canvas" width="430" height="600" style="border:1px"></canvas>

        <img src="StarshipZero/Site/starshipSmall.png" style="width:192px;height:64px;">


        <script src="menu.js"></script>
        <script src="game.js"></script>
        <script src="gameover.js"></script>
        <script src="player.js"></script>
        <script src="enemy.js"></script>
        <script src="explosion.js"></script>
        <script src="lifepowerup.js"></script>
        <script src="powerup.js"></script>
        <script src="hiscoreinput.js"></script>
        <script src="hiscore.js"></script>
        <script src="controls.js"></script>
      



</body>

</html>
