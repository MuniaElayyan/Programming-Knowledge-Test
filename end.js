const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");

const finalScore = document.querySelector("#finalScore");
const correct = document.querySelector("#correct");
const time = document.querySelector("#time");

const badge = document.querySelector("#badge");
const rankIcon = document.querySelector("#rankIcon");


const mostRecentScore =
Number(localStorage.getItem("mostRecentScore")) || 0;

const correctAnswers =
Number(localStorage.getItem("correctAnswers")) || 0;

const quizTime =
Number(localStorage.getItem("quizTime")) || 0;

const playerLevel =
localStorage.getItem("playerLevel") || "🌱 Beginner";

const playerIcon =
localStorage.getItem("playerIcon") || "🌱";


finalScore.innerText = mostRecentScore;

correct.innerText = `${correctAnswers} / 10`;

time.innerText = `${quizTime} s`;

badge.innerText = playerLevel;

rankIcon.innerText = playerIcon;


username.addEventListener("input", () => {

    saveScoreBtn.disabled =
    username.value.trim() === "";

});


saveScoreBtn.addEventListener("click", saveHighScore);

function saveHighScore(){

    if(username.value.trim()===""){

        alert("Please enter your name.");

        return;

    }

    let highScores =
    JSON.parse(localStorage.getItem("highScores")) || [];

    const player={

        name:username.value.trim(),

        score:mostRecentScore,

        correctAnswers:correctAnswers,

        time:quizTime,

        level:playerLevel,

        icon:playerIcon

    };

    highScores.push(player);


    highScores.sort((a,b)=>{

        if(b.correctAnswers!==a.correctAnswers){

            return b.correctAnswers-a.correctAnswers;

        }

        return a.time-b.time;

    });


    highScores=highScores.slice(0,10);

    localStorage.setItem(

        "highScores",

        JSON.stringify(highScores)

    );

    saveScoreBtn.disabled=true;

    window.location.href="highscores.html";

}