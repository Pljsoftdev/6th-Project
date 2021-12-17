// js global variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.querySelector('#overlay');
const button = document.querySelectorAll('button');
let image = document.getElementsByClassName('.tries');
let startGameButton = document.querySelector('.btn__reset');
let missed = 0;

// random tv and movie quotes
const phrases = [ 
    "may the force be with you", // starwars
    "you got it dude", // full house
    "you cant handle the truth", // major payne
    "say hello to my little friend", // scaarface
    "im gonna make him an offer he cant refuse" // the godfather
];

// returns a random quote from phrases array
const getRandomPhraseAsArray = arr => {
    // randomly choose a phrase index
    const randomNumber = Math.floor(Math.random() * arr.length);
    let phraseArray = arr[randomNumber].split('');
    return phraseArray;
}

// adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        // for each character, create li, put character in li, append to #phrase ul
        let li = document.createElement('li');
        let ul = phrase.firstElementChild;
        li.textContent = arr[i];
        ul.appendChild(li);
        if (li.textContent !== ' ') {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
    }
}

// check if a letter is in the phrase
const checkLetter = button => {

    let phraseLetters = document.querySelectorAll('li');
    let match = null;

    for (let i = 0; i < phraseLetters.length; i++) {

        if (button === phraseLetters[i].textContent.toLocaleLowerCase()) {
            phraseLetters[i].classList.add('show');
            match = true;
        } 
    }
    return match;
}

// check if the game has been won or lost
const checkWin = () => {
    
    const letterLi = document.querySelectorAll('.letter');
    const showLi = document.querySelectorAll('.show');
    const overlay = document.querySelector('#overlay');

    if (letterLi.length === showLi.length) {
        overlay.classList.add('win');
        overlay.firstElementChild.textContent = "Congratulations You've won!";
        overlay.style.display = 'flex';
        phrase.style.display = 'none';

    } else if (missed > 4) {
        overlay.classList.add('lose');
        overlay.firstElementChild.textContent = "Sorry you've lost.";
        overlay.style.display = 'flex';
        phrase.style.display = 'none';
    }
    startGameButton.textContent = "Play Again?";
}

// listen for the start game button to be pressed
startGameButton.addEventListener('click', () => {
    phrase.style.display = 'revert';
    missed = 0;

    for (let i = 0; 1 < image.length; i++) {
        image[i].src = 'images/liveHeart.png';
    }
    phrase.firstElementChild.innerHTML = '';

    let usedKeys = document.querySelectorAll('.chosen');
    for (let p = 0; p < usedKeys.length; p++) {
        usedKeys[p].removeAttribute('disabled');
    }
    for (let y = 0; y < usedKeys.length; y++) {
        usedKeys[y].classList.remove('chosen');
    }
    overlay.style.display = 'none';
    let phraseArray = getRandomPhraseAsArray(phrases);

    getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    
        if (e.target.tagName === 'BUTTON') {
            e.target.className = 'chosen';
            e.target.disabled = true;
            let match = checkLetter(e.target.textContent.toLocaleLowerCase());

            
            if (match === null) {
                missed++;
                let heartsLeft = document.querySelectorAll('.tries img');
                heartsLeft[missed - 1].src = "images/lostHeart.png";
            }
            checkWin();
        }
});
