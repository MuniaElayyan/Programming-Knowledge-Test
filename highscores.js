const highScoresList =
document.querySelector("#highScoresList");


let highScores =
JSON.parse(localStorage.getItem("highScores")) || [];


highScores.sort((a,b)=>{

    if(b.correctAnswers !== a.correctAnswers){

        return b.correctAnswers - a.correctAnswers;

    }

    return a.time - b.time;

});


highScores = highScores.slice(0,10);


if(highScores.length===0){

    highScoresList.innerHTML=`

    <li class="player-card">

        <div class="player-info">

            <div class="player-name">

                🌸 No Scores Yet

            </div>

            <div class="player-details">

                Be the first Code Quest Champion!

            </div>

        </div>

    </li>

    `;

}


function getBadge(score){

    if(score>=900){

        return "👑 Master";

    }

    if(score>=700){

        return "💎 Pro";

    }

    if(score>=400){

        return "⭐ Explorer";

    }

    return "🌱 Beginner";

}


function getMedal(index){

    switch(index){

        case 0:
            return "👑";

        case 1:
            return "🥈";

        case 2:
            return "🥉";

        default:
            return "#" + (index+1);

    }

}


if(highScores.length>0){

highScoresList.innerHTML=

highScores.map((player,index)=>{

return `

<li class="player-card
${index===0?"first":""}
${index===1?"second":""}
${index===2?"third":""}
">

<div class="rank">

${getMedal(index)}

</div>

<div class="player-info">

<div class="player-name">

${player.icon || "🌸"}

${player.name}

</div>

<div class="player-details">

✅ Correct Answers:

<b>${player.correctAnswers}/10</b>

<br>

⏱ Time:

<b>${player.time}s</b>

<br>

⭐ Level:

<b>${player.level || getBadge(player.score)}</b>

</div>

</div>

<div class="badge">

${player.score}

pts

</div>

</li>

`;

}).join("");

}