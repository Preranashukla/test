// Create a variable to store the results and question
var questionList = [{
        question: "Commonly used data types DO Not include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correctAnsIndex: 2
    },
    {
        question: "The condition in an if / else statement is enclosed with _________:",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnsIndex: 2
    },
    {
        question: "Arrays in Javascript can be used to store __________:",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnsIndex: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal/bash", "for loops", "console.log"],
        correctAnsIndex: 3
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnsIndex: 2
    },
    {
        question: "Which are primitive data types in Javascript?",
        options: ["string", "boolean", "undefined", "all of the above"],
        correctAnsIndex: 3
    }
];


var quizStart = document.querySelector("#startButton");
var timeEl = document.getElementById("timer");
var highScore = document.getElementById("toScoreboard");
var upper = document.getElementById("upperBody");
var lower = document.getElementById("lowerBody");
var timeLeft;
var timeInterval;
var currentScore;
var currentQuestion;
var questionCount;


//start the quiz
function gameStart() {
    currentScore = 0;
    questionCount = 0;
    setTimer();
    displayQuestion();
}

// function to set timer
function setTimer() {
    timeLeft = 100;
    timer.textContent = "Time: " + timeLeft;

    timeInterval = setInterval(function() {
        timeLeft--;

        timer.textContent = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);

            window.alert("Times Up!");
            showResult();
        }
    }, 1000);
}

function displayQuestion() {

    upper.textContent = '';
    lower.textContent = '';
    var currentQuestion = questionList[questionCount];

    var question = document.createElement('h1');
    question.textContent = currentQuestion.question;
    upper.appendChild(question);

    var option = document.createElement('ul');
    console.log(currentQuestion.options);
    //option.textContent = currentQuestion.options;
    //lower.appendChild(option)

    currentSelection = currentQuestion.options;

    var select;
    for (let i = 0; i < currentSelection.length; i++) {
        select = document.createElement("button");
        select.textContent = (i + 1) + ". " + currentSelection[i];
        select.setAttribute("id", i);
        select.setAttribute("class", "selection");

        select.addEventListener("click", function(event) {
            if (i === currentQuestion.correctAnsIndex) {
                window.alert("Correct!");
                currentScore++;
            } else {
                window.alert("Wrong!");
                timeLeft -= 10;
            }
            nextQuestion();
        });

        var li = document.createElement("li");
        li.appendChild(select);
        option.appendChild(li);
    }
    lower.appendChild(option);
}


function nextQuestion() {
    if (questionCount === questionList.length - 1) {
        clearInterval(timeInterval);
        timer.textContent = "Time: 0"
        showResult();
    } else {
        questionCount++;
        displayQuestion();
    }
}


// function to show result page after quiz
function showResult() {
    upper.textContent = "";
    lower.textContent = "";

    var title = document.createElement("h1");
    title.textContent = "All done!";
    upper.appendChild(title);

    var score = document.createElement("p");
    score.textContent = "Your final score is " + currentScore;
    upper.appendChild(score);

    var label = document.createElement("label");
    label.textContent = "Enter initials: ";
    lower.appendChild(label);

    var form = document.createElement("input");
    form.setAttribute("type", "text");
    form.setAttribute("id", "initial");
    lower.appendChild(form);

    var submit = document.createElement("button");
    submit.setAttribute("id", "submit");
    submit.textContent = "submit";
    lower.appendChild(submit);

    submit.addEventListener("click", function(event) {
        localStorage.setItem(form.value, currentScore);
        scoreboard();
    });

}

// function to show scoreboard page
function scoreboard() {
    clearInterval(timeInterval);
    timer.textContent = "Time: 0"

    var title = document.createElement("h1");
    title.textContent = "Scoreboard";

    upper.textContent = "";
    upper.appendChild(title);

    var board = getScoreBoard();
    board.setAttribute("id", "board");
    upper.appendChild(board);

    lower.textContent = "";
    var goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    lower.appendChild(goBack);

    var clearBoard = document.createElement("button");
    clearBoard.textContent = "Clear Scoreboard";
    lower.appendChild(clearBoard);

    // "Go Back" button in scoreboard page
    goBack.addEventListener("click", function(event) {
        window.location.reload();
    });

    // "Clear Board" button
    clearBoard.addEventListener("click", function(event) {
        localStorage.clear();
        scoreboard();
    })
}

// function to create scoreboard table with data from local storage
function getScoreBoard() {
    var board = document.createElement("ul");
    var element = document.createElement("li");
    var name;
    var score;

    for (let i = 0; i < localStorage.length; i++) {
        name = localStorage.key(i);
        score = localStorage.getItem(name);
        element.textContent = name + " - " + score;

        board.appendChild(element.cloneNode(true));
    }

    return board;
}

// scoreboard button in front page
highScore.addEventListener("click", function(event) {
    event.preventDefault();
    scoreboard();
});

// start button in front page
quizStart.addEventListener("click", function(event) {
    event.preventDefault();
    gameStart();
});



/*Create variables to store the quiz questions

Use mouse-click events to start the quiz

Write for loops to cycle through quiz questions

Use key-press events to receive user input in the form of answers to quiz questions

Create a time limit for the game using time functions

Write conditional statements to determine wrong and right answers

Use client-side storage to store high scores

Use GitHub Pages to publish the page to the web*/