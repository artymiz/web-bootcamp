const BUTTON_COLOURS = ["red", "blue", "green", "yellow"];
const AUDIO_FILES = {
  red: "sounds/red.mp3",
  blue: "sounds/blue.mp3",
  green: "sounds/green.mp3",
  yellow: "sounds/yellow.mp3",
  wrong: "sounds/wrong.mp3",
};
const ANIMATION_DURATION = 100;
const WAIT_DURATION = 500;

function playSound(fileName) {
  if (fileName in AUDIO_FILES) {
    new Audio(AUDIO_FILES[fileName]).play();
  } else {
    console.log(`${fileName}: unrecognized file name`);
  }
}

function nextSequence(length) {
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

var userClickedPattern = [];

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
});


// ==========
// Game Logic
// ==========
var level = 0;
var roundStarted = false;

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text(`Game Over on level ${level}, Press Any Key to Restart`);
}

var arrayEqual = (a, b) => a.length === b.length && a.every((v,i)=> v === b[i]);

function playRound() {
  roundStarted = true;
  $("#level-title").text(`Level ${level}`);
  let gamePattern = nextSequence(level);
  userClickedPattern = [];

  if (arrayEqual(gamePattern, userClickedPattern)) {
    level++;
  } else {
    gameOver();
  }
  roundStarted = false;
}

$(document).on("keydown", function () {
  if (!roundStarted) {
    playRound();
  }
});

