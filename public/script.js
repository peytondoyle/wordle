// script.js

const targetWord = "PLUSH"; // Example target word
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

    const feedback = [];
    const targetWordArray = targetWord.toUpperCase().split('');

    for (let i = 0; i < currentGuess.length; i++) {
        const letter = currentGuess[i].toUpperCase();
        if (letter === targetWordArray[i]) {
            feedback.push('correct');
        } else if (targetWord.includes(letter)) {
            feedback.push('present');
        } else {
            feedback.push('absent');
        }
    }

    displayFeedback(feedback);

    feedback.forEach((status, index) => {
        const letter = currentGuess[index].toUpperCase();
        const key = document.querySelector(`.key[data-letter="${letter}"]`);
        if (!key) return;

        if (status === 'absent' && !key.classList.contains('not-in-word')) {
            key.classList.add('not-in-word');
        } else if (status === 'present' && !key.classList.contains('out-of-place')) {
            key.classList.add('out-of-place');
        } else if (status === 'correct') {
            key.classList.add('in-word');
        }
    });

    // Delay win modal slightly to show feedback first
    if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
        setTimeout(showVictoryModal, 400);
        return;
    }

    currentGuess = '';
    attempts++;

    if (attempts >= maxAttempts) {
        alert("Game Over! The word was " + targetWord);
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

// Modal logic
const modal = document.getElementById("victoryModal");
const closeButton = document.querySelector(".close-button");

function showVictoryModal() {
    modal.style.display = "block";
}

closeButton.onclick = function () {
    modal.style.display = "none";
    // Optional: stop the video by resetting the iframe
    const iframe = modal.querySelector("iframe");
    iframe.src = iframe.src;
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        const iframe = modal.querySelector("iframe");
        iframe.src = iframe.src;
    }
};

function resetKeyboard() {
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('not-in-word');
    });
}
