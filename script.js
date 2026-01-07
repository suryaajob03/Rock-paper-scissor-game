let userScore = 0;
let computerScore = 0;
let maxPoints = 0;
let soundEnabled = true; // default

function setMaxPoints() {
  let points;

  do {
    points = prompt("Set maximum points to win (1 to 10):");
  } while (points < 1 || points > 10 || isNaN(points));

  maxPoints = parseInt(points);

  document.getElementById("maxPointsDisplay").innerText =
    `Playing up to: ${maxPoints} points`;

  alert(`Game set to ${maxPoints} points. Let's play!`);
}


setMaxPoints();

function play(userChoice) {
 
  if (userScore >= maxPoints || computerScore >= maxPoints) {
    alert("Game over! Please refresh to play again.");
    return;
  }

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let resultText = "";

if (userChoice === computerChoice) {
  resultText = "It's a draw!";
  animateResult("draw");
} 
else if (
  (userChoice === "rock" && computerChoice === "scissors") ||
  (userChoice === "paper" && computerChoice === "rock") ||
  (userChoice === "scissors" && computerChoice === "paper")
) {
  userScore++;
  resultText = "You win this round! 🎉";
  animateResult("win");
  showConfetti();
  playWinSound();
} 
else {
  computerScore++;
  resultText = "Computer wins this round 😢";
  animateResult("lose");
  showBackgroundEmoji("lose");
  playLoseSound();
}

  document.getElementById("userScore").innerText = userScore;
  document.getElementById("computerScore").innerText = computerScore;

  document.getElementById("result").innerText =
    `You chose ${userChoice}, Computer chose ${computerChoice}. ${resultText}`;


  if (userScore === maxPoints) {
    alert("🎉 YOU WON THE GAME!");
    resetGame();
  } 
  else if (computerScore === maxPoints) {
    alert("😢 COMPUTER WON THE GAME!");
    resetGame();
  }
}

function playWinSound() {
  if (!soundEnabled) return;

  const sound = document.getElementById("winSound");
  sound.currentTime = 0;
  sound.play();
}

function playLoseSound() {
  if (!soundEnabled) return;

  const sound = document.getElementById("loseSound");
  sound.currentTime = 0;
  sound.play();
}


function resetGame() {
  userScore = 0;
  computerScore = 0;

  document.getElementById("userScore").innerText = 0;
  document.getElementById("computerScore").innerText = 0;
  document.getElementById("result").innerText = "Game reset. Set points to play again!";

  setMaxPoints();
}
function animateResult(type) {
  const gameBox = document.querySelector(".game");

  gameBox.classList.remove("win", "lose", "draw");
  void gameBox.offsetWidth; // restart animation

  gameBox.classList.add(type);
}
function showBackgroundEmojis(type) {
  const emojiLayer = document.getElementById("emojiLayer");

  const emojis =
    type === "win"
      ? ["🎉", "✨", "🔥", "🥳", "🎊"]
      : ["😢", "💥", "💔", "😞"];

  for (let i = 0; i < 30; i++) {
    const emoji = document.createElement("span");
    emoji.classList.add("bg-emoji");

    if (type === "lose") emoji.classList.add("lose");

    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = Math.random() * 100 + "vh";

    emojiLayer.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 2000);
  }
}
function showConfetti() {
  const layer = document.getElementById("confettiLayer");
  const colors = ["#ff5252", "#ffeb3b", "#4caf50", "#2196f3", "#e91e63"];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti");

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";

    layer.appendChild(piece);

    setTimeout(() => piece.remove(), 3000);
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  updateSoundButton();
}
function updateSoundButton() {
  const btn = document.getElementById("soundToggle");

  if (soundEnabled) {
    btn.innerText = "🔊 Sound ON";
    btn.classList.remove("muted");
  } else {
    btn.innerText = "🔇 Sound OFF";
    btn.classList.add("muted");
  }
}
updateSoundButton();


