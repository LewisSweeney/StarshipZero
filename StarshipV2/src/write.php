<?php
// Imports a php file not located in the public_HTML folder, keeping DB credentials secret
require '../../php/config.php';
// Gets the config string from the config file
$conf = get_config();
// Connects to the postgres DB using the config string from config.php
$conn = pg_connect($conf);

// Declares and sets variables for the user's name and score
$n = $_POST["name"];
$s = $_POST["score"];

// A pre written SQL statement, which when performed will insert the player's name and score as a record into the DB
$query2 = "INSERT INTO hiscore (id,name,score) VALUES (default,'" . $n . "',$s)";

// Performs the query on the database
$res2 = pg_query ($conn, $query2);
    // Closes the database connection
    pg_close($conn);

?>
    <!DOCTYPE html>
    <html>

    <head>
        <title>StarshipZero</title>
        <link rel="shortcut icon" href="StarshipZero/Game/Images/playerShip2.png" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>

    <body onload="back()">
        <script type="text/javascript">
            // Returns the user to the previous page after the page is loaded to allow the user to continue playing the game
            function back() {
                window.history.go(-1);
            }
        </script>



    </body>
