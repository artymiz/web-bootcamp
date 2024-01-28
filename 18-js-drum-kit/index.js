// index.js

// setup audio files for different drum sounds
const crash = "sounds/crash.mp3";
const kick = "sounds/kick-bass.mp3";
const snare = "sounds/snare.mp3";
const tom1 = "sounds/tom-1.mp3";
const tom2 = "sounds/tom-2.mp3";
const tom3 = "sounds/tom-3.mp3";
const tom4 = "sounds/tom-4.mp3";

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
    // buttonAudioMapping[buttonText].play();
    new Audio(buttonAudioMapping[buttonText]).play();
    playButtonAnimation(buttonText);
  });
});

Object.entries(buttonAudioMapping).forEach(([key, value]) => {
  addEventListener("keydown", (e) => {
    if (e.key === key) {
      // value.play();
      new Audio(value).play();
      playButtonAnimation(key);
    }
  });
});

