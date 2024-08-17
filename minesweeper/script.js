const grid = document.getElementById('grid');
const restartButton = document.getElementById('restartButton');

const width = 10;
const height = 10;
const mineCount = 10;
const cells = [];
let gameOver = false;

function createGrid() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.dataset.mine = false;
            cell.dataset.revealed = false;
            grid.appendChild(cell);
            cells.push(cell);
        }
    }
    placeMines();
}

function placeMines() {
    let placedMines = 0;
    while (placedMines < mineCount) {
        const index = Math.floor(Math.random() * cells.length);
        const cell = cells[index];
        if (cell.dataset.mine === 'false') {
            cell.dataset.mine = true;
            placedMines++;
        }
    }
}

function revealCell(cell) {
    if (gameOver || cell.dataset.revealed === 'true') return;
    cell.dataset.revealed = true;
    cell.classList.add('revealed');

    if (cell.dataset.mine === 'true') {
        cell.classList.add('mine');
        endGame(false);
    } else {
        const adjacentMines = countAdjacentMines(cell);
        if (adjacentMines > 0) {
            cell.textContent = adjacentMines;
        } else {
            revealAdjacentCells(cell);
        }
        checkWin();
    }
}

function countAdjacentMines(cell) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    let mineCount = 0;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const adjacentCell = getCell(x + dx, y + dy);
            if (adjacentCell && adjacentCell.dataset.mine === 'true') {
                mineCount++;
            }
        }
    }
    return mineCount;
}

function revealAdjacentCells(cell) {
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const adjacentCell = getCell(x + dx, y + dy);
            if (adjacentCell && adjacentCell.dataset.revealed === 'false') {
                revealCell(adjacentCell);
            }
        }
    }
}

function getCell(x, y) {
    return cells.find(cell => cell.dataset.x == x && cell.dataset.y == y);
}

function endGame(won) {
    gameOver = true;
    cells.forEach(cell => {
        if (cell.dataset.mine === 'true') {
            cell.classList.add('mine');
        }
    });
    setTimeout(() => alert(won ? 'You win!' : 'Game Over!'), 100);
}

function checkWin() {
    const unrevealedCells = cells.filter(cell => cell.dataset.revealed === 'false');
    if (unrevealedCells.length === mineCount) {
        endGame(true);
    }
}

function restartGame() {
    grid.innerHTML = '';
    cells.length = 0;
    gameOver = false;
    createGrid();
}

grid.addEventListener('click', e => {
    if (e.target.classList.contains('cell')) {
        revealCell(e.target);
    }
});

restartButton.addEventListener('click', restartGame);

createGrid();
