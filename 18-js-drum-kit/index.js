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
  w: crash,
  a: kick,
  s: snare,
  d: tom1,
  j: tom2,
  k: tom3,
  l: tom4,
};

// setup event listeners for each drum button
document.querySelectorAll(`[class*="drum"]`).forEach((button) => {
  button.addEventListener("click", function () {
    const buttonText = this.innerHTML;
    buttonAudioMapping[buttonText].play();
  });
});

Object.entries(buttonAudioMapping).forEach(([key, value]) => {
  addEventListener("keydown", (e) => {
    if (e.key === key) {
      value.play();
    }
  });
});

