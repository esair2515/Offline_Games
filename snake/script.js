const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 100, y: 100 }];
let direction = { x: gridSize, y: 0 };
let food = { x: 200, y: 200 };
let score = 0;
let gameInterval;

canvas.width = canvasSize;
canvas.height = canvasSize;

const drawSnake = () => {
    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
};

const moveSnake = () => {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
        placeFood();
    } else {
        snake.pop();
    }
};

const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (e.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (e.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (e.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
};

const checkCollision = () => {
    const head = snake[0];
    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert('Game Over');
    }
};

const placeFood = () => {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
};

const drawFood = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
};

const gameLoop = () => {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
};

const startGame = () => {
    snake = [{ x: 100, y: 100 }];
    direction = { x: gridSize, y: 0 };
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    placeFood();
    gameInterval = setInterval(gameLoop, 100);
};

restartButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);

startGame();
