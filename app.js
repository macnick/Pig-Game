/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
 var scores, roundScore, activePlayer, gamePlaying, lastDice, lastDice1, winningScore, winScore;
 var diceDOM = document.querySelector("#dice0");
 var dice1DOM = document.querySelector("#dice1");
 
     
init();

document.querySelector(".btn-roll").addEventListener("click", function (){
    if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    diceDOM.style.display = "block";
    diceDOM.src ="dice-" + dice + ".png";
    var dice1 = Math.floor(Math.random() * 6) + 1;
    dice1DOM.style.display = "block";
    dice1DOM.src ="dice-" + dice1 + ".png";
        
    //document.querySelector("#current-" + activePlayer).textContent = dice;
       // check if we have to 6s in a row
   //     debugger;
   if (dice === dice1) {
       roundScore += ( dice + dice1)* 2;
       document.getElementById("current-" + activePlayer).textContent = roundScore;
       lastDice = dice;
       lastDice1 = dice1;
       } else {
    if (dice !== 1 && dice1 !== 1) {
         if ((dice === 6 && lastDice === 6) || (dice1 === 6 && lastDice1 === 6)) {
             roundScore = 0;
             scores[activePlayer] = 0;
             lastDice = 0;
             lastDice1 = 0;
             document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];
             nextPlayer();
        } else {
            roundScore += dice + dice1;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
            lastDice = dice;
            lastDice1 = dice1;
            }    
    } else {
        roundScore = 0;
        nextPlayer();
        };  
    }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function (){
    if (gamePlaying) {
    scores[activePlayer] += roundScore;
    roundScore = 0;
    lastDice = 0;
    lastDice1 = 0;
    document.getElementById("score-"+ activePlayer).textContent = scores[activePlayer];
// check if player won the game
    if (scores[activePlayer] >= winningScore) {
        gamePlaying = false;
        document.getElementById("name-"+ activePlayer).textContent = "Winner!";
        diceDOM.style.display = "none";
        dice1DOM.style.display = "none";
        document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
        // also I should hide the roll dice button
    } else {
// change player 
    nextPlayer();
    }
}
});

function nextPlayer () {
    document.getElementById("current-" + activePlayer).textContent = "0";
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1; 
    //conditional (ternary) operator 
    // move rool dice button
    activePlayer === 1 ? document.querySelector(".btn-roll").style.left="75%": document.querySelector(".btn-roll").style.left="25%";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    // do not hide dice - diceDOM.style.display = "none";
};

document.querySelector(".btn-new").addEventListener("click", init);

function init() { 
    winScore = document.getElementById("win-score").value;
 if (winScore) {
     winningScore = winScore;
 } else {
     winningScore = 100;
 }
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; 
    lastDice = 0; lastDice1 = 0;
    gamePlaying = true;
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.getElementById("dice0").style.display = "none";
    document.getElementById("dice1").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".btn-roll").style.left="25%";
    
}
