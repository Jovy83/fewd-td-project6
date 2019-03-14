// buttons
const startButton = document.querySelector('.btn__reset');

// divs
const overlayDiv = document.querySelector('#overlay');
const overlayTitle = document.querySelector('.title');
const qwertyDiv = document.querySelector('#qwerty');
const buttons = document.querySelectorAll('button');
const phraseDiv = document.querySelector('#phrase');
const phraseUL = phraseDiv.firstElementChild;
const scoreboardDiv = document.querySelector('#scoreboard');
const scoreboardOL = scoreboardDiv.firstElementChild;

// integers
const maxNumberOfGuesses = 5;
let missedGuesses = 0;

// arrays
const phrases = [
  'A blessing in disguise',
  'A dime a dozen',
  'Beat around the bush',
  'Break a leg',
  'Under the weather'
];

// event listeners
startButton.addEventListener('click', () => {
  // hide the start screen overlay
  setElementDisplay(overlayDiv, 'none');

  // reset game
  resetGame();

  // setup the game
  setupGame();
});

qwertyDiv.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const buttonText = button.textContent;

    // set button's class to 'chosen' so that it can't be pressed again. disable it as well
    button.className = 'chosen';
    button.disabled = true;

    const isGuessCorrect = checkLetter(buttonText);
    if(isGuessCorrect) {
      console.log("Guess is correct");
    } else {
      console.log("Guess is wrong");
      // remove a life
      subtractLife();
    }

    checkWin();
  }
});

// functions
function resetGame() {
  // reset the keyboard
  for(let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.removeAttribute('class');
    button.disabled = false;
  }

  // reset the phrase
  while(phraseUL.lastElementChild) {
    phraseUL.removeChild(phraseUL.lastElementChild);
  }

  // remove all lives
  while(scoreboardOL.lastElementChild) {
    scoreboardOL.removeChild(scoreboardOL.lastElementChild);
  }

  // re-add lives back to 5
  for(let i = 0; i < maxNumberOfGuesses; i++) {
    const life = document.createElement('li');
    life.className = 'tries';

    const lifeImage = document.createElement('img');
    lifeImage.src = 'images/liveHeart.png';
    lifeImage.style.height = '35px';
    lifeImage.style.width = '30px';

    life.appendChild(lifeImage);
    scoreboardOL.appendChild(life);
  }

  // reset number of misses to 0
  missedGuesses = 0;
}

function setupGame() {
  const formattedPhrase = getFormattedPhrase(phrases);
  addPhraseToDisplay(formattedPhrase);
}

function getRandomPhraseFromArray(array) {
  return phrases[getRandomNumber(phrases.length)];
}

function getFormattedPhrase(array){
  // this is the phrase in string format
  const phrase = getRandomPhraseFromArray(array);

  // this is the phrase in array of chars format
  return Array.from(phrase);
}

function addPhraseToDisplay(array){
  // if the character in the array is a letter and not a space, the function should add the class 'letter' to the list item
  for(let i = 0; i < array.length; i++) {
    const li = document.createElement('li');
    li.textContent = array[i];

    if(array[i] !== ' ') {
      // is a character, not a space
      li.className = 'letter';
    } else {
      li.className = 'space';
    }

    phraseUL.appendChild(li);
    console.log(array[i]);
  }
}

function checkLetter(input) {
  const letters = document.querySelectorAll('.letter');
  let isCorrect = false;

  for (let i = 0; i < letters.length; i++) {
    const letterElement = letters[i];

    if(input === letterElement.textContent.toLowerCase()) {
      // guess is correct
      isCorrect = true;
      letterElement.className += ' show';
    }
  }

  if(isCorrect) {
    return input;
  }
  // guess is incorrect
  return null;
}

function subtractLife() {
  missedGuesses++;
  const life = scoreboardOL.lastElementChild;
  scoreboardOL.removeChild(life);
}

function checkWin() {
  const numberOfShownLetters = document.querySelectorAll('.show').length;
  const numberOfLetters = document.querySelectorAll('.letter').length;
  if (numberOfShownLetters === numberOfLetters) {
    // player won
    showGameResults(true);
  } else if (missedGuesses >= maxNumberOfGuesses) {
    // player lost
    showGameResults(false);
  }
}

function showGameResults(didWin) {
  if(didWin) {
    console.log('WON');
    overlayDiv.className = 'win';
    overlayTitle.textContent = 'YOU WON!';
    setElementDisplay(overlayDiv, '');
  } else {
    console.log('LOST');
    overlayDiv.className = 'lose';
    overlayTitle.textContent = 'YOU LOST!';
    setElementDisplay(overlayDiv, '');
  }
}

function setElementDisplay(element, display) {
  element.style.display = display;
}

function getRandomNumber(upper) {
  return Math.floor(Math.random() * upper);
}
