
let canClick = false;
let startTime = 0;
let timeoutId = null;


const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const backBtnGame = document.getElementById("back-btn-game");
const backBtnResult = document.getElementById("back-btn-result");

const box = document.getElementById("box");
const timeDisplay = document.getElementById("time-display");

// Screen helpers
function showMenu() {
  menuScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
}

function showGame() {
  menuScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
}

function showResult() {
  menuScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

// The Logic of the Game
function startGame() {
  showGame();
  box.style.backgroundColor = "#d32f2f"; 
  box.textContent = "Wait for green";
  canClick = false;

  const delay = 1000 + Math.random() * 3000; 
  timeoutId = setTimeout(turnGreen, delay); 
}

function turnGreen() {
  box.style.backgroundColor = "#2e7d32";
  box.textContent = "Click!";
  canClick = true;
  startTime = performance.now(); 
}

function handleBoxClick() {
  if (!gameScreen.classList.contains("hidden")) {
    if (!canClick) {
      
      clearTimeout(timeoutId);
      box.style.backgroundColor = "#d32f2f";
      box.textContent = "Too early!";
      setTimeout(startGame, 1000); 
    } else {
      const reaction = (performance.now() - startTime) / 1000;
      timeDisplay.textContent = reaction.toFixed(3);
      showResult();
    }
  }
}

// Event wiring of the game
startBtn.addEventListener("click", startGame);          
playAgainBtn.addEventListener("click", startGame);
backBtnGame.addEventListener("click", showMenu);
backBtnResult.addEventListener("click", showMenu);
box.addEventListener("click", handleBoxClick);
