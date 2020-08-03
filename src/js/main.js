// Globals
const words = ['ant', 'baboon', 'badger', 'bat', 'bear', 'beaver', 'camel', 'cat', 'clam', 'cobra', 'cougar', 'coyote', 'crow', 'deer', 'dog', 'donkey', 'duck', 'eagle', 'ferret', 'fox', 'frog', 'goat', 'goose', 'hawk', 'lion', 'lizard', 'llama', 'mole', 'monkey', 'moose', 'mouse', 'mule', 'newt', 'otter', 'owl', 'panda', 'parrot', 'pigeon', 'python', 'rabbit', 'ram', 'rat', 'raven', 'rhino', 'salmon', 'seal', 'shark', 'sheep', 'skunk', 'sloth', 'snake', 'spider', 'stork', 'swan', 'tiger', 'toad', 'trout', 'turkey', 'turtle', 'weasel', 'whale', 'wolf', 'wombat', 'zebra'];
const correctLetters = [];
const wrongLetters = [];
var currentWord = '';
var playable = true;

// Classes

// UI Class: Provides helper functions for accessing and controlling the UI.
// UI.initialize = Initialize the UI and its controls.
// UI.displayWord = Shows the ui for the current word.
// UI.updateWrongLetters = Shows the UI for the wrong guesses.
// UI.showNotification = Shows a message that the current letter has already been guessed.
// UI.keyDown = Handles the key presses on the window.
class UI {
    static initialize() {
        playable = true;

        correctLetters.splice(0);
        wrongLetters.splice(0);

        currentWord = words[Math.floor(Math.random() * words.length)];

        UI.displayWord();

        UI.updateWrongLetters();

        const popup = document.getElementById('popupContainer');
        popup.style.display = 'none';
    }

    static displayWord() {
        const wordDiv = document.querySelector('#word');

        wordDiv.innerHTML = `${currentWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}`;

        const innerWord = wordDiv.innerText.replace(/[ \n]/g, '');

        if (innerWord === currentWord) {
            const finalMessage = document.getElementById('finalMessage');
            finalMessage.innerText = 'Congratulations! You won! 🎉';

            const finalMessageRevealWord = document.getElementById('finalMessageRevealWord');
            finalMessageRevealWord.innerText = `...the word was: ${currentWord}`;

            const popup = document.getElementById('popupContainer');
            popup.style.display = 'flex';
            document.querySelector('#playButton').focus();
    
            playable = false;
        }
    }

    static updateWrongLetters() {
        const wrongLettersDiv = document.getElementById('wrongLetters');

        wrongLettersDiv.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

        const figureParts = document.querySelectorAll('.figurePart');
        figureParts.forEach((part, index) => {
            const errors = wrongLetters.length;
    
            if (index < errors) {
                part.style.display = 'block';
            } else {
                part.style.display = 'none';
            }
        });

        if (wrongLetters.length === figureParts.length) {
            const finalMessage = document.getElementById('finalMessage');
            finalMessage.innerText = 'Unfortunately you lost. 😥';
            
            const finalMessageRevealWord = document.getElementById('finalMessageRevealWord');
            finalMessageRevealWord.innerText = `...the word was: ${currentWord}`;

            const popup = document.getElementById('popupContainer');
            popup.style.display = 'flex';
            document.querySelector('#playButton').focus();
    
            playable = false;
        }
    }

    static showNotification() {
        const notification = document.getElementById('notificationContainer');
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    static keyDown(e) {
        if (playable) {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                const letter = e.key.toLowerCase();
    
                if (currentWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        correctLetters.push(letter);
    
                        UI.displayWord();
                    } else {
                        UI.showNotification();
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        wrongLetters.push(letter);
    
                        UI.updateWrongLetters();
                    } else {
                        UI.showNotification();
                    }
                }
            }
            else {
                if (e.keyCode === 32) {
                    console.log(currentWord);
                }
            }
        }
    }
}

// Events

// Check to see what letter is typed
window.addEventListener('keydown', UI.keyDown);

// Restart the game
document.querySelector('#playButton').addEventListener('click', UI.initialize);

// Initialize the game
document.addEventListener('DOMContentLoaded', UI.initialize);