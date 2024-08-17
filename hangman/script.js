const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const wordDisplay = document.getElementById('wordDisplay');
const message = document.getElementById('message');
const lettersDiv = document.getElementById('letters');
const restartButton = document.getElementById('restartButton');

const words = ['javascript', 'programming', 'hangman', 'developer', 'function'];
let selectedWord, hiddenWord, wrongGuesses;

const initGame = () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = Array(selectedWord.length).fill('_');
    wrongGuesses = 0;
    wordDisplay.innerText = hiddenWord.join(' ');
    message.innerText = '';
    drawHangman();
    generateLetters();
};

const drawHangman = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 4;

    // Base
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 150);
    ctx.stroke();

    // Pole
    ctx.moveTo(100, 150);
    ctx.lineTo(100, 20);
    ctx.lineTo(200, 20);
    ctx.lineTo(200, 40);
    ctx.stroke();

    if (wrongGuesses > 0) { // Head
        ctx.beginPath();
        ctx.arc(200, 50, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (wrongGuesses > 1) { // Body
        ctx.moveTo(200, 60);
        ctx.lineTo(200, 100);
        ctx.stroke();
    }
    if (wrongGuesses > 2) { // Left Arm
        ctx.moveTo(200, 70);
        ctx.lineTo(180, 90);
        ctx.stroke();
    }
    if (wrongGuesses > 3) { // Right Arm
        ctx.moveTo(200, 70);
        ctx.lineTo(220, 90);
        ctx.stroke();
    }
    if (wrongGuesses > 4) { // Left Leg
        ctx.moveTo(200, 100);
        ctx.lineTo(180, 130);
        ctx.stroke();
    }
    if (wrongGuesses > 5) { // Right Leg
        ctx.moveTo(200, 100);
        ctx.lineTo(220, 130);
        ctx.stroke();
    }
};

const generateLetters = () => {
    lettersDiv.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = document.createElement('div');
        letter.classList.add('letter');
        letter.innerText = String.fromCharCode(i);
        letter.addEventListener('click', () => handleGuess(letter.innerText.toLowerCase()));
        lettersDiv.appendChild(letter);
    }
};

const handleGuess = (letter) => {
    let correctGuess = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            hiddenWord[i] = letter;
            correctGuess = true;
        }
    }

    wordDisplay.innerText = hiddenWord.join(' ');

    if (!correctGuess) {
        wrongGuesses++;
        drawHangman();
    }

    checkGameStatus();
};

const checkGameStatus = () => {
    if (!hiddenWord.includes('_')) {
        message.innerText = 'You Win!';
        disableLetters();
    } else if (wrongGuesses === 6) {
        message.innerText = `You Lose! The word was: ${selectedWord}`;
        disableLetters();
    }
};

const disableLetters = () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => letter.removeEventListener('click', handleGuess));
};

restartButton.addEventListener('click', initGame);

canvas.width = 300;
canvas.height = 200;

initGame();
