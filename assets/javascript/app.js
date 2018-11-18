////////////////////////// TO DO
function playGame() {
    var queryUrl =
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(result) {
        console.log(result);

        // create a function for showing the answer

        // round counter stays OUTSIDE -- this increments up every time you switch to the new round

        // this defines what round we are on/what section of the array we should
        // var roundCounter = 0;
        // var arrIndex;

        // var correctAnswers = 0;
        // var incorrectAnswers = 0;
        // var timeOutAnswers = 0;
        var roundCounter;
        var arrIndex;
        var correctAnswers;
        var incorrectAnswers;
        var timeOutAnswers;
        var wrongAnswers;

        // this is the seconds counter for each round
        var count = 5;

        // create a function to restart the entire game
        function restartGame() {
            roundCounter = 0;
            arrIndex = 0;
            wrongAnswers = [];
            correctAnswers = 0;
            incorrectAnswers = 0;
            timeOutAnswers = 0;
            startCount();
        }

        // this creates the question, the answer, and wrong answers
        function setRound() {
            roundCounter++;

            arrIndex = roundCounter - 1;

            console.log(arrIndex);

            // display what question you're on
            $("#question-number").html(`Question ${roundCounter}`);

            // show the question area and hide the result area
            $("#question-area").show();
            $("#result-area").hide();

            // display the question
            $("#question-text").html(result.results[arrIndex].question);

            // set the answer and assign to a random option
            var answerNum = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            $("#option-" + answerNum).html(
                result.results[arrIndex].correct_answer
            );
            $("#option-" + answerNum).attr("class", "correct");

            console.log(result.results[arrIndex].correct_answer);

            // for incorrect results - create a new array, randomly sort, and then apply to
            // the other answer list elements
            for (
                var i = 0;
                i < result.results[arrIndex].incorrect_answers.length;
                i++
            ) {
                wrongAnswers.push(
                    result.results[arrIndex].incorrect_answers[i]
                );
            }

            console.log(wrongAnswers);

            for (var i = 0; i < 3; i++) {
                var nindex = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                var temp = wrongAnswers[i];
                wrongAnswers[i] = wrongAnswers[nindex];
                wrongAnswers[nindex] = temp;
            }
            console.log(wrongAnswers);

            for (var i = 0; i <= 3; i++) {
                if (i != answerNum) {
                    var wrongAnswer = wrongAnswers.pop();
                    $("#option-" + i).html(wrongAnswer);

                    $("#option-" + i).attr("class", "incorrect");
                }
            }
        }

        // create a function to show the result screen. Status should be correct/incorrect/time.
        function showResult(status) {
            if (status === "correct") {
                $("#result").html("Correct!");
                correctAnswers++;
                $("#result-image").attr("src", "./assets/images/success.png");
                $("#result-image").attr("alt", "success!");
            } else if (status === "incorrect") {
                $("#result").html("Incorrect :c");
                incorrectAnswers++;
                $("#result-image").attr("src", "./assets/images/failure.gif");
                $("#result-image").attr("alt", "failure!");
            } else {
                $("#result").html("Time's up!");
                timeOutAnswers++;
                $("#result-image").attr("src", "./assets/images/failure.gif");
                $("#result-image").attr("alt", "failure!");
            }

            // show the question area and hide the result area
            $("#question-area").hide();
            $("#result-area").show();
            $("#end-of-game").hide();

            $("#result-text").html(
                `The answer was ${result.results[arrIndex].correct_answer}!`
            );

            clearInterval(showCount);

            if (roundCounter < 10) {
                count = 5;
                $("#countdown-display").text(count);
                setTimeout(startCount, 1000);
            } else {
                setTimeout(endOfGame, 1000);
            }
        }

        // this displays the results and the reset game button
        function endOfGame() {
            $("#end-of-game").show();
            $("#question-area").hide();
            $("#result-area").hide();

            $("#final-wins").html(`Correct Answers: ${correctAnswers}`);
            $("#final-losses").html(`Incorrect Answers: ${incorrectAnswers}`);
            $("#final-timeout").html(`No Answer: ${timeOutAnswers}`);
        }

        // this creates the counter counting down at the top of the screen, and switches to the end of round
        // screen for time out after 30 seconds
        function nextCount() {
            $("#countdown-display").text(`Time remaining: ${count} seconds`);

            if (count === 0) {
                showResult("time");
            }
            count--;
        }

        function startCount() {
            $("#question-area").show();
            $("#result-area").hide();
            $("#end-of-game").hide();

            setRound();

            showCount = setInterval(nextCount, 1000);
        }

        // this pulls up the results if an option is chosen
        $("li").on("click", function(event) {
            //alert($(this).attr("class"));

            if ($(this).attr("class") === "correct") {
                // alert("Correct!");
                showResult("correct");
            } else {
                // alert("Incorrect.");
                showResult("incorrect");
            }
        });

        // initialize game
        restartGame();
    });
}

playGame();

$("#reset-game").on("click", function(event) {
    playGame();
});
