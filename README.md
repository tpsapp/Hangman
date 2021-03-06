# Hangman
A site that allows you to play hangman.

The main.js has comments for what each function does but below is a list of each class and what it's functions are for.

Live Demo: https://www.thomassapp.com/Hangman

## Classes

### UI Class

Provides helper functions for accessing and controlling the UI.

* UI.initialize = Initialize the UI and its controls.
* UI.displayWord = Shows the UI for the current word.
* UI.updateWrongLetters = Shows the UI for the wrong guesses.
* UI.showNotification = Shows a message that the current letter has already been guessed.
* UI.keyDown = Handles the key presses on the window.

## Events

* Check to see what letter is typed
    window.addEventListener('keydown', UI.keyDown);

* Restart the game
    document.querySelector('#playButton').addEventListener('click', UI.initialize);

* Initialize the game
    document.addEventListener('DOMContentLoaded', UI.initialize);