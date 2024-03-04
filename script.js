const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const notificationEl = document.getElementById('notification');
const finalMessageEl = document.getElementById('final-message');
const playButton = document.getElementById('play-button');

const words = ['javascript', 'hangman', 'developer', 'coding', 'programming', 'game', 'seattle', 'school', 'academy'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : '_'}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessageEl.innerText = 'Congratulations! You won!';
    finalMessageEl.style.display = 'block';
    playButton.style.display = 'block';
  }
}

function showNotification() {
  notificationEl.classList.add('show');

  setTimeout(() => {
    notificationEl.classList.remove('show');
  }, 2000);
}

function updateWrongLettersEl(letter) {
    console.log("wrong ",  letter, wrongLetters)
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong Letters:</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  document.querySelectorAll('.figure-part').forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === 1) {
    document.getElementById("head").style.visibility="visible"
  }

  if(wrongLetters.length === 2) {
    document.getElementById('body').style.visibility="visible"
  }

  if(wrongLetters.length === 3) {
    document.getElementById('left-arm').style.visibility="visible"
  }

  if(wrongLetters.length === 4) {
    document.getElementById('right-arm').style.visibility="visible"
  }

  if(wrongLetters.length === 5) {
    document.getElementById('left-leg').style.visibility="visible"
  }

  if(wrongLetters.length === 6) {
    document.getElementById('right-leg').style.visibility="visible"
  }
}

function checkLetter(letter) {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      console.log("correct ", correctLetters)
      displayWord();
    } else {
      showNotification();
    }
  } else {
    console.log("letter was wrong checking ", letter, wrongLetters)
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongLettersEl(letter)
    } else {
      showNotification();
    }
  }
}

window.addEventListener('keydown', e => {
    //console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();
    console.log(letter, selectedWord)
    if (selectedWord.includes(letter)) {
        console.log("checking")
      checkLetter(letter);
    } else {
        checkLetter(letter);
      showNotification();
    }
  }
});

playButton.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  finalMessageEl.innerText = '';
  finalMessageEl.style.display = 'none';

  playButton.style.display = 'none';
});

displayWord();
