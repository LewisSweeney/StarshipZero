var scores = new Array(3);

function initialiseScores() {
    scores[0] = {
        name: "no name",
        score: "none"
    }
    scores[0].name = "<?php echo pg_fetch_result($res, 0, name) ?>";
    scores[0].score = "<?php echo pg_fetch_result($res, 0, score) ?>";

    alert(scores[0].name + " " + scores[0].score);
}