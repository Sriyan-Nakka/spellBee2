const wordDiv = document.getElementById("wordDiv");
const loadingDiv = document.getElementById("loadingDiv");

const wordAudio = document.getElementById("wordAudio");
const spelledSpan = document.getElementById("spelledSpan");
const livesSpan = document.getElementById("livesSpan");

let currentWord = "";
let lives = 3;
let spelledWords = 0;

document
  .getElementById("playButton")
  .addEventListener("click", () => playGame());

document.getElementById("resetButton").addEventListener("click", () => {
  resetGame();
  loadingDiv.style.display = "flex";
  wordDiv.style.display = "none";
  findWord();
});

document.getElementById("continueButton").addEventListener("click", () => {
  document.querySelector("#submitButton").style.display = "none";
  wordInput.style.pointerEvents = "auto";
  document.querySelector("#submitButton").style.display = "inline-block";
  document.querySelector("#continueButton").style.display = "none";

  wordDiv.style.display = "none";
  loadingDiv.style.display = "flex";
  findWord();
});

function playGame() {
  resetGame();
  document.getElementById("playButton").style.display = "none";
  loadingDiv.style.display = "flex";
  findWord();
}

function resetGame() {
  currentWord = "";
  wordAudio.src = "";
  lives = 3;
  livesSpan.textContent = lives;
  spelledWords = 0;
  spelledSpan.textContent = spelledWords;

  document.querySelector("#continueButton").style.display = "none";
  wordInput.style.pointerEvents = "auto";
}

function findWord() {
  fetch("https://random-word-api.vercel.app/api")
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      findAudio(data[0]);
    });
}

function findAudio(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.title) {
        console.log(data);
        if (data[0].phonetics[0] && data[0].phonetics[0].audio) {
          currentWord = data[0].word;
          wordAudio.src = data[0].phonetics[0].audio;
          loadingDiv.style.display = "none";
          wordDiv.style.display = "block";
        } else if (!data[0].phonetics[0] || !data[0].phonetics[0].audio) {
          findWord();
        }
      } else if (data.title) {
        findWord();
      }
    });
}

const wordInput = document.getElementById("wordInput");

document.querySelector("#wordForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit", wordInput.value.toLowerCase());
  console.log(currentWord);
  e.preventDefault();
  if (currentWord === wordInput.value.toLowerCase()) {
    spelledWords++;
    spelledSpan.textContent = spelledWords;

    document.querySelector("#submitButton").style.display = "none";
    wordInput.value = "";
    wordInput.blur();
    wordInput.style.pointerEvents = "none";

    setTimeout(() => {
      if (spelledWords !== 5) {
        document.querySelector("#continueButton").style.display =
          "inline-block";
      } else if (spelledWords === 5) {
        //todo: write this function
      }
    }, 1000);
  } else {
    lives--;
    livesSpan.textContent = lives;
    alert("You lost a life!");
    if (lives === 0) {
      alert("You lost all your lives... Click Play to play again!");
      restartGame();
    }
  }
});

function restartGame() {
  //* function where wordDiv is gone and shows playButton
  //todo: write this function
}
