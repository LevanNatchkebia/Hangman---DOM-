// // Creating HTML elements in DOM 
const body = document.body;

const modal = document.createElement('div');

modal.classList.add('modal');
body.appendChild(modal);

const modalContent = document.createElement('div');
modalContent.classList.add('content');
modal.appendChild(modalContent);

const modalImage = document.createElement('img');
modalImage.setAttribute("alt", "GIF");
modalContent.appendChild(modalImage);

const modalH4 = document.createElement('h4');
modalContent.appendChild(modalH4);

const modalP = document.createElement('p');
const pbold = document.createElement('b');
modalP.appendChild(pbold);
modalContent.appendChild(modalP);

const playAgainBtn = document.createElement('button');
playAgainBtn.classList.add('play-again');
playAgainBtn.innerText = "Play Again";
modalContent.appendChild(playAgainBtn);

// Create Container

const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

const hangmanBox = document.createElement('div');
hangmanBox.classList.add('.hangman-box');
container.appendChild(hangmanBox);

const hangmanImage = document.createElement('img');
hangmanBox.appendChild(hangmanImage);
hangmanImage.setAttribute("alt", "hangman-image");

const boxheader = document.createElement('h1');
hangmanBox.appendChild(boxheader);
boxheader.innerText = 'Hangman Game';
boxheader.setAttribute("alt", "image");

// Create Game Box

const gameBox = document.createElement('div');
gameBox.classList.add('game-box');
container.appendChild(gameBox);

const wordDisplay = document.createElement('div');
wordDisplay.classList.add('word-display');
gameBox.appendChild(wordDisplay);

const hintH4 = document.createElement('h4');
hintH4.classList.add('hint-text');
gameBox.appendChild(hintH4);
hintH4.innerText = 'Hint: ';

const hintBold = document.createElement('b');
hintH4.appendChild(hintBold);

const guessesText = document.createElement('h4');
guessesText.classList.add('guesses-text');
guessesText.innerText = 'Incorrect guesses: ';
gameBox.appendChild(guessesText);

const guessBold = document.createElement('b');
guessesText.appendChild(guessBold);

const keyboardDiv = document.createElement('div');
keyboardDiv.classList.add('keyboard');
gameBox.appendChild(keyboardDiv)


let currentWord, correctLetters, wrongLetterCounter;
const maxGuesses = 6;

const reset = () => {
    correctLetters = [];
    wrongLetterCounter = 0;
    hangmanImage.src = "./assets/hangman-0.svg";
    guessBold.innerText = `${wrongLetterCounter} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    modal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = test[Math.floor(Math.random() * test.length)];
    currentWord = word; 
    hintBold.innerText = hint;
    reset();
}

const defeat = (isWin) => {
    const modalText = isWin ? `You found the word:` : 'The correct word was:';
    modal.querySelector("img").src = `./assets/${isWin ? 'victory' : 'lost'}.gif`;
    modal.querySelector("h4").innerText = isWin ? 'Congrats!' : 'Game Over!';
    modal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    modal.classList.add("show");
}

const initializeGame = (button, clickedLetter) => {
    if (button) {
        if(currentWord.includes(clickedLetter)) {
            [...currentWord].forEach((letter, index) => {
                if(letter === clickedLetter) {
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll("li")[index].innerText = letter;
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                }
            });
        } else {
            wrongLetterCounter++;
            hangmanImage.src = `./assets/hangman-${wrongLetterCounter}.svg`;
        }
        guessBold.innerText = `${wrongLetterCounter} / ${maxGuesses}`;
    
        if(wrongLetterCounter === maxGuesses) return defeat(false);
        if(correctLetters.length === currentWord.length) return defeat(true);
    }else {
        if(currentWord.includes(clickedLetter.toLowerCase())) {
            [...currentWord].forEach((letter, index) => {
                if(letter === clickedLetter.toLowerCase()) {
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll("li")[index].innerText = letter;
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                }
            });
        } else {
            wrongLetterCounter++;
            hangmanImage.src = `./assets/hangman-${wrongLetterCounter}.svg`;
        }
        if(wrongLetterCounter === maxGuesses) return defeat(false);
        if(correctLetters.length === currentWord.length) return defeat(true);
        guessBold.innerText = `${wrongLetterCounter} / ${maxGuesses}`;
    }
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => {
        initializeGame(e.target, String.fromCharCode(i))
        button.disabled = true;
    });
}

document.addEventListener('keydown', (e) => {
    if(e.keyCode >= 65 && e.keyCode <=90) {
        initializeGame(null, String.fromCharCode(e.keyCode));
    } 
});

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);