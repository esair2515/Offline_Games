const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

let score = 0;
let moleTimer;

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function showMole() {
    const mole = document.createElement('div');
    mole.classList.add('mole');
    const hole = randomHole();
    hole.appendChild(mole);
    mole.style.display = 'block';

    mole.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        mole.remove();
    });

    setTimeout(() => {
        mole.remove();
    }, 800);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    moleTimer = setInterval(showMole, 1000);

    setTimeout(() => {
        clearInterval(moleTimer);
        alert(`Game Over! Your score is ${score}`);
    }, 30000);
}

startButton.addEventListener('click', startGame);
