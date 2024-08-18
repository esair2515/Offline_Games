const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 75;
const paddleWidth = 10;
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleY = (canvas.height - paddleHeight) / 2;

let rightPressed = false;
let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    if (y > paddleY && y < paddleY + paddleHeight && x < paddleWidth) {
        dx = -dx;
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 7;
    }
    if (leftPressed && paddleY > 0) {
        paddleY -= 7;
    }

    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        leftPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        rightPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        leftPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        rightPressed = false;
    }
}

draw();
