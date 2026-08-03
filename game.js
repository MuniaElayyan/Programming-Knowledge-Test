const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));

const progressText = document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");

const scoreText = document.querySelector("#score");
const timerText = document.querySelector("#timer");

const questions = [

{
    question:"Which HTML tag creates a hyperlink?",

    choice1:"<link>",
    choice2:"<a>",
    choice3:"<href>",
    choice4:"<url>",

    answer:2
},

{
    question:"Which HTML tag is used to display an image?",

    choice1:"<img>",
    choice2:"<picture>",
    choice3:"<image>",
    choice4:"<src>",

    answer:1
},

{
    question:"Which CSS property changes text color?",

    choice1:"font-color",
    choice2:"text-style",
    choice3:"color",
    choice4:"text-color",

    answer:3
},

{
    question:"Which CSS property makes a Flexbox container?",

    choice1:"display:flex",
    choice2:"position:flex",
    choice3:"flex-container",
    choice4:"display:block",

    answer:1
},

{
    question:"Which JavaScript keyword creates a block-scoped variable?",

    choice1:"var",
    choice2:"const",
    choice3:"let",
    choice4:"value",

    answer:3
},

{
    question:"What does a JavaScript function do?",

    choice1:"Stores images",
    choice2:"Groups reusable code",
    choice3:"Creates CSS",
    choice4:"Creates HTML",

    answer:2
},

{
    question:"Which Bootstrap class creates a primary button?",

    choice1:"button-primary",
    choice2:"primary-btn",
    choice3:"btn-primary",
    choice4:"btn-blue",

    answer:3
},

{
    question:"Tailwind CSS is based on...",

    choice1:"Utility Classes",
    choice2:"Database Queries",
    choice3:"Java Packages",
    choice4:"PHP",

    answer:1
},

{
    question:"Which Git command sends commits to GitHub?",

    choice1:"git upload",
    choice2:"git push",
    choice3:"git commit",
    choice4:"git clone",

    answer:2
},

{
    question:"Which Git command copies a repository?",

    choice1:"git clone",
    choice2:"git fork",
    choice3:"git copy",
    choice4:"git pull",

    answer:1
}];


let currentQuestion = {};

let acceptingAnswers = false;

let score = 0;

let correctAnswers = 0;

let questionCounter = 0;

let availableQuestions = [];

let timer;

let timeLeft = 20;

let totalTime = 0;


const SCORE_POINTS = 100;

const MAX_QUESTIONS = 10;


function startGame() {

    score = 0;
    correctAnswers = 0;
    questionCounter = 0;
    totalTime = 0;

    scoreText.innerText = score;

    availableQuestions = [...questions];

    getNewQuestion();

}


function startTimer() {

    clearInterval(timer);

    timeLeft = 30;

    timerText.innerText = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        totalTime++;

        timerText.innerText = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            acceptingAnswers = false;

            setTimeout(() => {

                getNewQuestion();

            },500);

        }

    },1000);

}


function getNewQuestion() {

    clearInterval(timer);

    if (
        questionCounter >= MAX_QUESTIONS ||
        availableQuestions.length === 0
    ) {

        endGame();

        return;

    }

    questionCounter++;

    progressText.innerText =
    `Question ${questionCounter} / ${MAX_QUESTIONS}`;

    progressBarFull.style.width =
    `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex =
    Math.floor(Math.random() * availableQuestions.length);

    currentQuestion =
    availableQuestions[questionIndex];

    question.innerText =
    currentQuestion.question;

    choices.forEach(choice => {

        const number =
        choice.dataset["number"];

        choice.innerText =
        currentQuestion["choice" + number];

    });

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;

    startTimer();

}


choices.forEach(choice => {

    choice.addEventListener("click", e => {

        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        clearInterval(timer);

        const selectedChoice = e.target;

        const selectedAnswer =
        Number(selectedChoice.dataset["number"]);

        let classToApply = "incorrect";

        if (selectedAnswer === currentQuestion.answer) {

            classToApply = "correct";

            correctAnswers++;

            incrementScore(SCORE_POINTS);

        }

        selectedChoice.parentElement
        .classList.add(classToApply);

        choices.forEach(c => {

            c.parentElement.style.pointerEvents = "none";

        });

        setTimeout(() => {

            selectedChoice.parentElement
            .classList.remove(classToApply);

            choices.forEach(c => {

                c.parentElement.style.pointerEvents = "auto";

            });

            getNewQuestion();

        },1000);

    });

});



function incrementScore(num){

    score += num;

    scoreText.innerText = score;

}



function getLevel(){

    if(correctAnswers === 10){

        return{

            name:"👑 Code Master",

            icon:"👑"

        };

    }

    if(correctAnswers >= 8){

        return{

            name:"💎 Front-End Pro",

            icon:"💎"

        };

    }

    if(correctAnswers >= 6){

        return{

            name:"⭐ Code Explorer",

            icon:"⭐"

        };

    }

    if(correctAnswers >= 4){

        return{

            name:"🌸 Rising Developer",

            icon:"🌸"

        };

    }

    return{

        name:"🌱 Beginner",

        icon:"🌱"

    };

}



function endGame() {

    clearInterval(timer);

    const level = getLevel();

    localStorage.setItem(
        "mostRecentScore",
        score
    );

    localStorage.setItem(
        "correctAnswers",
        correctAnswers
    );

    localStorage.setItem(
        "quizTime",
        totalTime
    );

    localStorage.setItem(
        "playerLevel",
        level.name
    );

    localStorage.setItem(
        "playerIcon",
        level.icon
    );

    window.location.href = "end.html";

}



function savePlayerResult(name){

    const level = getLevel();

    const player = {

        name: name,

        score: score,

        correctAnswers: correctAnswers,

        time: totalTime,

        level: level.name,

        icon: level.icon

    };

    let leaderboard =
    JSON.parse(
        localStorage.getItem("highScores")
    ) || [];

    leaderboard.push(player);

    leaderboard.sort((a,b)=>{

        if(b.correctAnswers !== a.correctAnswers){

            return b.correctAnswers - a.correctAnswers;

        }

        return a.time - b.time;

    });

    leaderboard = leaderboard.slice(0,10);

    localStorage.setItem(

        "highScores",

        JSON.stringify(leaderboard)

    );

}


startGame();