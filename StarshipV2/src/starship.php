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
        <form name="hiscore" method="post" action="http://users.aber.ac.uk/les35/ftw/write.php">
            <input type="hidden" name="name" value="">
            <input type="hidden" name="score" value="">
        </form>
        <div id="menuBanner">
            <div id="title">
                <img src="StarshipZero/Site/starshipSmall.png" style="width:192px;height:64px;">
            </div>
            <ul>
                <li><a href="http://users.aber.ac.uk/les35/ftw/starship.php">Play Game</a></li>
                <br>
                <li><a href="http://users.aber.ac.uk/les35/ftw/about.html">About</a></li>
                <br>
                <li><a href="http://users.aber.ac.uk/les35/ftw/help.html">Help</a></li>
            </ul>
            <br>
            <br>
            <br>
            <ul>
                <li><a href="https://creativecommons.org/licenses/by-sa/3.0/deed.en">Creative Commons</a></li>
                <br>
                <li><a href="https://wiki.creativecommons.org/wiki/Public_domain">Public Domain</a></li>
            </ul>

        </div>

        <canvas id="canvas" width="430" height="600" style="border:1px"></canvas>
        <div id="scorelist">
            <h4>Highscores</h4>
            <br>
            <h4>(Refresh Page to Update)</h4>
            <br>
            <h4>Position | Name   |  Score</h4>
            <br>
            <div id="scorerowleft">
                1.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 0, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 0, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                2.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 1, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 1, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                3.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 2, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 2, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                4.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 3, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 3, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                5.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 4, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 4, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                6.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 5, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 5, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                7.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 6, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 6, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                8.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 7, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 7, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft">
                9.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 8, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 8, score)?>
            </div>
            <br>
            <br>
            <div id="scorerowleft" style="padding-left: 66px">
                10.
            </div>

            <div id="scorerowmiddle">
                <?php echo pg_fetch_result($res, 9, name)?>
            </div>
            <div id="scorerowright">
                <?php echo pg_fetch_result($res, 9, score)?>
            </div>
        </div>
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
        <script src="bombpowerup.js"></script>
        <script src="controls.js"></script>



</body>

</html>
