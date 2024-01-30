const BUTTON_COLOURS = ["red", "blue", "green", "yellow"];
const AUDIO_FILES = {
  red: "sounds/red.mp3",
  blue: "sounds/blue.mp3",
  green: "sounds/green.mp3",
  yellow: "sounds/yellow.mp3",
  wrong: "sounds/wrong.mp3",
};
const ANIMATION_DURATION = 150;
const WAIT_DURATION = 600;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
const LEVEL_REPEAT = 4;
var STARTING_SEQUENCE_LENGTH = 4;
var sequenceLength = STARTING_SEQUENCE_LENGTH;

function playSound(fileName) {
  if (fileName in AUDIO_FILES) {
    new Audio(AUDIO_FILES[fileName]).play();
  } else {
    console.log(`${fileName}: unrecognized file name`);
  }
}

function playNextGamePattern(length) {
  let gamePattern = Array.from({ length: length }, () => {
    let randomNumber = Math.floor(Math.random() * 4);
    return BUTTON_COLOURS[randomNumber];
  });

  gamePattern.forEach((colour, index) => {
    setTimeout(() => {
      playSound(colour);
      $(`#${colour}`).fadeOut(ANIMATION_DURATION).fadeIn(ANIMATION_DURATION);
    }, (index+1) * WAIT_DURATION);
  });

  return gamePattern;
}

function animatePress(colour) {
  $(`#${colour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${colour}`).removeClass("pressed");
  }, ANIMATION_DURATION);
}

function handleUserClick(colour) {
  playSound(colour);
  animatePress(colour);
  userClickedPattern.push(colour);
}

function checkAnswer() {
  userChoiceIndex = userClickedPattern.length - 1;
  if (userClickedPattern[userChoiceIndex] !== gamePattern[userChoiceIndex]) {
    gameOver();
  } else if (userClickedPattern.length === gamePattern.length) {
    level++;
    playRound();
  }
}

$(".btn").on("click", function () {
  handleUserClick(this.id);
  if (gameStarted) {
    checkAnswer();
  }
});

// ==========
// Game Logic
// ==========
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text(`Game Over on level ${level}, Press Any Key to Restart`);
  level = 0;
  gameStarted = false;
}

function updateLevel() {
  $("#level-title").text(`Level ${level}`);
  sequenceLength = STARTING_SEQUENCE_LENGTH + Math.floor(level / LEVEL_REPEAT);
}

function playRound() {
  updateLevel();
  gamePattern = playNextGamePattern(sequenceLength);
  userClickedPattern = [];
}

$(document).on("keydown", function () {
  if (!gameStarted) {
    gameStarted = true;
    playRound();
  }
});

