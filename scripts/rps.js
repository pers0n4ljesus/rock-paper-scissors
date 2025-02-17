const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let computerMove = '';
let result = '';
let result1 = '';
updateScore();


function isWhat(value) {
  const randomNumber = Math.random();
  if (randomNumber < 1/3) {
    computerMove = 'rock';
    calculateResult (value);
  } else if (randomNumber < 2/3) {
    computerMove = 'paper';
    calculateResult (value);
  } else {
    computerMove = 'scissors';
    calculateResult (value);
  }
}

let isAutoPlaying = false;
let intervalId;

function autoPlay () {
  if (!isAutoPlaying) {
    intervalId = setInterval (function () {
      const randomNumber1 = Math.random();
      const randomNumber2 = Math.random();

      if (randomNumber1 < 1/3) {
        computerMove = 'rock';
      } else if (randomNumber1 < 2/3) {
        computerMove = 'paper';
      } else {
        computerMove = 'scissors';
      }

      if (randomNumber2 < 1/3) {
        calculateResult('rock');
      } else if (randomNumber2 < 2/3) {
        calculateResult('paper');
      } else {
        calculateResult('scissors');
      }

      
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').classList.add('auto-play-on');
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').classList.remove('auto-play-on');
  }
}


function calculateResult (value) {
  if (value=== computerMove) {
    score.ties+=1;
    result1 = 'Tie!';
    result = `<div>
            <p>You</p>
            <img class="move-icon" src="assets/${value}-emoji.png">
          </div>
          <div>
            <p>Computer</p>
            <img class="move-icon" src="assets/${computerMove}-emoji.png">
          </div>`;
  } else if (
    (value === 'rock' && computerMove === 'paper') ||
    (value === 'paper' && computerMove === 'scissors') ||
    (value === 'scissors' && computerMove === 'rock')
  ) {
    score.losses+=1;
    result1 = 'Lose!';
    result = `<div>
            <p>You</p>
            <img class="move-icon" src="assets/${value}-emoji.png">
          </div>
          <div>
            <p>Computer</p>
            <img class="move-icon" src="assets/${computerMove}-emoji.png">
          </div>`;
  } else {
    score.wins+=1;
    result1 = 'Wins!';
    result = `<div>
            <p>You</p>
            <img class="move-icon" src="assets/${value}-emoji.png">
          </div>
          <div>
            <p>Computer</p>
            <img class="move-icon" src="assets/${computerMove}-emoji.png">
          </div>`;
  }
  updateScore();
  localStorage.setItem("score", JSON.stringify(score));
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
  document.querySelector('.js-result')
    .innerHTML = '';
  alert("Score has been reset!");
}

function updateScore() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses : ${score.losses}, Ties: ${score.ties}`;
  document.querySelector('.results-container')
    .innerHTML = result;
  document.querySelector('.js-result')
    .innerHTML = result1;
}