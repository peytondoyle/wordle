// script.js

const targetWord = "PENIS"; // Example target word
let currentGuess = "";
let attempts = 0;
const maxAttempts = 6; // Maximum attempts allowed

document.addEventListener("keydown", handleKeyPress);
document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", handleClick);
    document.getElementById('resetButton').addEventListener('click', resetGame);

});

function handleKeyPress(event) {
    if (event.key === "Enter") {
        submitGuess();
    } else if (event.key === "Backspace") {
        currentGuess = currentGuess.slice(0, -1);
    } else if (currentGuess.length < targetWord.length && isLetter(event.key)) {
        currentGuess += event.key.toUpperCase();
    }
    updateGuessDisplay();
}

function handleClick(event) {
    const key = event.target.textContent;
    if (key === "ENTER") {
        submitGuess();
    } else if (key === "DEL") {
        currentGuess = currentGuess.slice(0, -1);
    } else if (currentGuess.length < targetWord.length) {
        currentGuess += key;
    }
    updateGuessDisplay();
}

function isLetter(char) {
    return char.length === 1 && char.match(/[a-z]/i);
}

function updateGuessDisplay() {
    const rows = document.querySelectorAll(".guessRow");
    const currentRow = rows[attempts].querySelectorAll(".letterBox");
    currentRow.forEach((box, index) => {
        box.textContent = currentGuess[index] || "";
    });
}

function submitGuess() {
    if (currentGuess.length < targetWord.length) {
        alert("Not enough letters!");
        return;
    }

    const feedback = []; // To store feedback for displayFeedback
    const targetWordArray = targetWord.toUpperCase().split('');

    // First pass: Identify correct and present letters
    for (let i = 0; i < currentGuess.length; i++) {
        const letter = currentGuess[i].toUpperCase();
        if (letter === targetWordArray[i]) {
            feedback.push('correct'); // Correct position
        } else if (targetWord.includes(letter)) {
            feedback.push('present'); // In word, wrong place
        } else {
            feedback.push('absent'); // Not in word
        }
    }

    // Update the keyboard based on feedback
    feedback.forEach((status, index) => {
        const letter = currentGuess[index].toUpperCase();
        const key = document.querySelector(`.key[data-letter="${letter}"]`);

        if (status === 'absent' && key && !key.classList.contains('not-in-word')) {
            key.classList.add('not-in-word');
        } else if (status === 'present' && key && !key.classList.contains('in-word')) {
            key.classList.add('out-of-place');
        } else if (status === 'correct' && key) {
            key.classList.add('in-word');
        }
    });

    displayFeedback(feedback); // Assuming this updates the board correctly

    if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
        alert("Congratulations! You guessed the word!");
        // Optionally reset the game here
        return;
    }

    currentGuess = ''; // Prepare for the next guess
    attempts++;
    if (attempts >= maxAttempts) {
        alert("Game Over! The word was " + targetWord);
        // Optionally reset the game here
    }
}



function getFeedbackForGuess(guess) {
    let feedback = [];
    for (let i = 0; i < targetWord.length; i++) {
        if (guess[i] === targetWord[i]) {
            feedback.push("correct");
        } else if (targetWord.includes(guess[i])) {
            feedback.push("present");
        } else {
            feedback.push("absent");
        }
    }
    return feedback;
}

function displayFeedback(feedback) {
    const rows = document.querySelectorAll(".guessRow");
    const currentRow = rows[attempts].querySelectorAll(".letterBox");
    currentRow.forEach((box, index) => {
        box.classList.add(feedback[index]);
    });
}

function resetGame() {
    // Reset game state variables
    currentGuess = '';
    attempts = 0;

    // Clear the guess rows on the board
    document.querySelectorAll('.guessRow').forEach(row => {
        row.querySelectorAll('.letterBox').forEach(box => {
            box.textContent = ''; // Clear the box content
            box.className = 'letterBox'; // Reset any feedback styling
        });
    });

    // Reset the keyboard keys
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('correct', 'present', 'absent', 'not-in-word', 'in-word', 'out-of-place'); // Adjust based on your CSS classes
    });
}

function resetKeyboard() {
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('not-in-word');
    });
}
