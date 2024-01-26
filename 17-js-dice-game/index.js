function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

function getDiceImage(diceValue) {
  return `images/dice${diceValue}.png`;
}

function updateDiceImage(diceImage, diceValue) {
    diceImage.setAttribute("src", getDiceImage(diceValue));
}

function updateResultText(resultText, diceValue1, diceValue2) {
  if (diceValue1 === diceValue2) {
    resultText.textContent = "Draw!";
  } else if (diceValue1 > diceValue2) {
    resultText.textContent = "🚩Player 1 Wins!";
  } else {
    resultText.textContent = "Player 2 Wins!🚩";
  }
}

function main() {
    const diceImage1 = document.querySelector(".img1");
    const diceImage2 = document.querySelector(".img2");
    const resultText = document.querySelector("h1");
    
    const diceValue1 = getRandomDiceValue();
    const diceValue2 = getRandomDiceValue();
    
    updateDiceImage(diceImage1, diceValue1);
    updateDiceImage(diceImage2, diceValue2);
    
    updateResultText(resultText, diceValue1, diceValue2);
}

main();