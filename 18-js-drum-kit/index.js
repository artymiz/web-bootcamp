// index.js

// setup audio files for different drum sounds
const crash = new Audio("sounds/crash.mp3");
const kick = new Audio("sounds/kick-bass.mp3");
const snare = new Audio("sounds/snare.mp3");
const tom1 = new Audio("sounds/tom-1.mp3");
const tom2 = new Audio("sounds/tom-2.mp3");
const tom3 = new Audio("sounds/tom-3.mp3");
const tom4 = new Audio("sounds/tom-4.mp3");

// setup event listeners for each drum button
const buttonAudioMapping = {
  w: tom1,
  a: tom2,
  s: tom3,
  d: tom4,
  j: snare,
  k: crash,
  l: kick,
};

function playButtonAnimation(buttonText) {
  const activeButton = document.querySelector(`.${buttonText}`);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
}

// setup event listeners for each drum button
document.querySelectorAll(`[class*="drum"]`).forEach((button) => {
  button.addEventListener("click", function () {
    const buttonText = this.innerHTML;
    buttonAudioMapping[buttonText].play();
    playButtonAnimation(buttonText);
  });
});

Object.entries(buttonAudioMapping).forEach(([key, value]) => {
  addEventListener("keydown", (e) => {
    if (e.key === key) {
      value.play();
      playButtonAnimation(key);
    }
  });
});

