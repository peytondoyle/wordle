function submitGuess() {
    if (currentGuess.length < targetWord.length) {
        alert("Not enough letters!");
        return;
    }

    const feedback = [];
    const targetWordArray = targetWord.toUpperCase().split('');

    // Generate feedback
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

    // Update keyboard
    feedback.forEach((status, index) => {
        const letter = currentGuess[index].toUpperCase();
        const key = document.querySelector(`.key[data-letter="${letter}"]`);

        if (status === 'absent' && key && !key.classList.contains('not-in-word')) {
            key.classList.add('not-in-word');
        } else if (status === 'present' && key && !key.classList.contains('out-of-place')) {
            key.classList.add('out-of-place');
        } else if (status === 'correct' && key) {
            key.classList.add('in-word');
        }
    });

    displayFeedback(feedback);

    // ✅ Check for win after showing feedback
    if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
        setTimeout(showVictoryModal, 300); // Slight delay to allow UI update
        return;
    }

    currentGuess = '';
    attempts++;

    if (attempts >= maxAttempts) {
        alert("Game Over! The word was " + targetWord);
    }
}