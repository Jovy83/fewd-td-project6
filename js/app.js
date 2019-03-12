// buttons
const startButton = document.querySelector('.btn__reset');

// divs
const startScreenDiv = document.querySelector('#overlay');
const qwertyDiv = document.querySelector('#qwerty');
const phraseDiv = document.querySelector('#phrase');
const phraseUL = phraseDiv.firstElementChild;

// integers
const maxNumberOfGuesses = 5;
let missed = 0;

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
  setElementDisplay(startScreenDiv, 'none');

  // setup the game
  setupGame();
});

// functions
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

function checkLetter(letter) {

}

function setElementDisplay(element, display) {
  element.style.display = display;
}

function getRandomNumber(upper) {
  return Math.floor(Math.random() * upper);
}
