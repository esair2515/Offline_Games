const colors = ['green', 'red', 'yellow', 'blue'];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

const startButton = document.getElementById('startButton');
const levelTitle = document.getElementById('level-title');
const simonButtons = document.querySelectorAll('.simon-button');

function nextSequence() {
    userPattern = [];
    level++;
    levelTitle.textContent = `Level ${level}`;

    const randomColor = colors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    gamePattern.forEach((color, index) => {
        setTimeout(() => {
            animatePress(color);
            playSound(color);
        }, (index + 1) * 600);
    });
}

function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function animatePress(color) {
    const button = document.getElementById(color);
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 200);
}

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        levelTitle.textContent = 'Game Over, Press Start to Restart';
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

simonButtons.forEach(button => {
    button.addEventListener('click', function() {
        const userChosenColor = this.id;
        userPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userPattern.length - 1);
    });
});

startButton.addEventListener('click', function() {
    if (!started) {
        started = true;
        levelTitle.textContent = `Level ${level}`;
        nextSequence();
    }
});
