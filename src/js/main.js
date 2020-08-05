// Globals

// An array that contains all the words that the game will use
const words = ['ant', 'baboon', 'badger', 'bat', 'bear', 'beaver', 'camel', 'cat', 'clam', 'cobra', 'cougar', 'coyote', 'crow', 'deer', 'dog', 'donkey', 'duck', 'eagle', 'ferret', 'fox', 'frog', 'goat', 'goose', 'hawk', 'lion', 'lizard', 'llama', 'mole', 'monkey', 'moose', 'mouse', 'mule', 'newt', 'otter', 'owl', 'panda', 'parrot', 'pigeon', 'python', 'rabbit', 'ram', 'rat', 'raven', 'rhino', 'salmon', 'seal', 'shark', 'sheep', 'skunk', 'sloth', 'snake', 'spider', 'stork', 'swan', 'tiger', 'toad', 'trout', 'turkey', 'turtle', 'weasel', 'whale', 'wolf', 'wombat', 'zebra'];
// An array to contain all the correctly guessed letters
const correctLetters = [];
// An array to contain all the incorrectly guessed letters
const wrongLetters = [];
// Global string to contain the current word that the player will be guessing
var currentWord = '';
// Global bool to store the games playability state
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
        // Mark the game as being playable
        playable = true;

        // Empty the correct letters array
        correctLetters.splice(0);
        // Empty the incorrect letters array
        wrongLetters.splice(0);

        // Grab a random word from the words array to use for the game
        currentWord = words[Math.floor(Math.random() * words.length)];

        // Display the UI for the word 
        UI.displayWord();

        // Update and show the UI for wrong letters
        UI.updateWrongLetters();

        // Get the win/lose popup
        const popup = document.getElementById('popupContainer');
        // Hide the win/lose popup
        popup.style.display = 'none';
    }

    static displayWord() {
        // Get the div that contains the UI for the word to be guessed
        const wordDiv = document.querySelector('#word');

        // Create the spans that will contain the letters of the word and add any correctly guessed letters
        wordDiv.innerHTML = `${currentWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}`;

        // Get the actual word from the UI
        const innerWord = wordDiv.innerText.replace(/[ \n]/g, '');

        // Check to see if the word guessed matches the current word
        if (innerWord === currentWord) {
            // Get the UI element for the final message display
            const finalMessage = document.getElementById('finalMessage');
            // Set the final message UI to show a win message
            finalMessage.innerText = 'Congratulations! You won! 🎉';

            // Get the UI element to show the word that was to be guessed
            const finalMessageRevealWord = document.getElementById('finalMessageRevealWord');
            // Set the guessed word UI to show what the word was
            finalMessageRevealWord.innerText = `...the word was: ${currentWord}`;

            // Get the UI element for the win/lose popup
            const popup = document.getElementById('popupContainer');
            // Set the win/lose popup display to flex so that it is visible
            popup.style.display = 'flex';
            // Focus the play again button to make it easier for the user to start a new game
            document.querySelector('#playButton').focus();
    
            // Mark the game as unplayble so no more letters can be guessed
            playable = false;
        }
    }

    static updateWrongLetters() {
        // Get the UI element that shows the incorrectly guessed letters
        const wrongLettersDiv = document.getElementById('wrongLetters');

        // Initialize the incorrectly guessed letters UI with a label and the spans that contain all the wrong letters
        wrongLettersDiv.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

        // Get the UI elements that represent the hangman parts
        const figureParts = document.querySelectorAll('.figurePart');
        // Iterate through the hangman parts UI elements
        figureParts.forEach((part, index) => {
            // get the length of the wrongLetters array for comparison
            const errors = wrongLetters.length;
    
            // Check to see if the current index is less than the total number of errors
            if (index < errors) {
                // Set the parts display to block so it is visible
                part.style.display = 'block';
            } else {
                // Set the parts display to none so that it isn't shown
                part.style.display = 'none';
            }
        });

        // Check to see if the number of wrong guesses is equal to the number of hangman parts
        if (wrongLetters.length === figureParts.length) {
            // Get the UI element for the final message display
            const finalMessage = document.getElementById('finalMessage');
            // Set the final message UI to show a lose message
            finalMessage.innerText = 'Unfortunately you lost. 😥';
            
            // Get the UI element to show the word that was to be guessed
            const finalMessageRevealWord = document.getElementById('finalMessageRevealWord');
            // Set the guessed word UI to show what the word was
            finalMessageRevealWord.innerText = `...the word was: ${currentWord}`;

            // Get the UI element for the win/lose popup
            const popup = document.getElementById('popupContainer');
            // Set the win/lose popup display to flex so that it is visible
            popup.style.display = 'flex';
            // Focus the play again button to make it easier for the user to start a new game
            document.querySelector('#playButton').focus();
    
            // Mark the game as unplayable so no more letters can be guessed
            playable = false;
        }
    }

    static showNotification() {
        // Get the UI element for the already guessed notification
        const notification = document.getElementById('notificationContainer');
        // Add the show class to the notification UI so that it is displayed
        notification.classList.add('show');

        // Set a timeout of 2 seconds and then remove the show class from the notification UI
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    static keyDown(e) {
        // Make sure that the game is playable
        if (playable) {
            // Check to see if the key pressed is a valid letter between a and z or A and Z
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                // Get the letter pressed in lowercase
                const letter = e.key.toLowerCase();
    
                // Check to see if the current word string contains the letter pressed
                if (currentWord.includes(letter)) {
                    // Check to see if the letter was already guessed
                    if (!correctLetters.includes(letter)) {
                        // Add the letter to the correct letters array
                        correctLetters.push(letter);
    
                        // Update the correct letters UI
                        UI.displayWord();
                    } else {
                        // Show a notification that the letter has already been guessed
                        UI.showNotification();
                    }
                } else {
                    // Check to see if the letters is already in the incorrect letters array
                    if (!wrongLetters.includes(letter)) {
                        // Add the letter to the incorrect letters array
                        wrongLetters.push(letter);
    
                        // Update the wrong letters UI
                        UI.updateWrongLetters();
                    } else {
                        // Show a notification that the letter has already been guessed
                        UI.showNotification();
                    }
                }
            }
            else {
                // Check to see if the user pressed the space bar
                if (e.keyCode === 32) {
                    // Output the word to the console for testing
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