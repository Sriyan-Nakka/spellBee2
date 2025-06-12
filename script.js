const playButton = document.getElementById("playButton");
const wordDiv = document.getElementById("wordDiv");
const loadingDiv = document.getElementById("loadingDiv");

let lives = 3;

playButton.addEventListener("click", () => {
  playGame();
});

function playGame() {
  playButton.style.display = "none";
  loadingDiv.style.display = "flex";
}

function findWord() {}
