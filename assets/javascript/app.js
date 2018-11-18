////////////////////////// TO DO

// 1. we want to only call the ajax query ONCE and then loop through the array of questions
// 2. set a timer variable and set up how to go to the answer text upon timeout
// 3. go to answer text upon answering

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
    var roundCounter = 0;
    var arrIndex;

    function setRound() {
        roundCounter++;

        arrIndex = roundCounter - 1;

        // show the question area
        $("#question-area").show();

        // display the question
        $("#question-text").html(result.results[arrIndex].question);

        // set the answer
        var answerNum = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        $("#option-" + answerNum).html(result.results[arrIndex].correct_answer);
        $("#option-" + answerNum).attr("class", "correct");

        console.log(result.results[arrIndex].correct_answer);

        // for incorrect results - move incorrect results to a new array, randomly sort, and then apply to
        // the other answer list elements
        var wrongAnswers = result.results[arrIndex].incorrect_answers;
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
                $("#option-" + i).html(wrongAnswers[i]);

                $("#option-" + i).attr("class", "incorrect");
            }
        }
    }

    // create a function to show the result screen. Status should be correct/incorrect.
    // to update -- will add win/loss counters and gifs
    function showResult(status) {
        if (status === "correct") {
            $("#result").html("Correct!");
        } else {
            $("#result").html("Incorrect :c");
        }
        $("#result-text").html(
            `The answer was ${result.results[arrIndex].correct_answer}!`
        );
    }

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

    var count = 5;

    function nextCount() {
        $("#countdown-display").text(count);

        if (count === 0) {
            viewResult();
        }
        count--;
    }

    function startCount() {
        $("#result-display").text("Never Mind...");
        showCount = setInterval(nextCount, 1000);
    }

    // create a function to say something ended
    function viewResult() {
        clearInterval(showCount);

        $("#result-display").text("Time!");

        count = 5;
        $("#countdown-display").text(count);
        setTimeout(startCount, 3000);
    }

    // This will run the display image function as soon as the page loads.
    //nextCount();
    startCount();

    setRound();
});
