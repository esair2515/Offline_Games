const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

const rows = 6;
const cols = 7;
let currentPlayer = 1;
let boardState = [];

const createBoard = () => {
    boardState = Array(rows).fill().map(() => Array(cols).fill(0));
    board.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', r);
            cell.setAttribute('data-col', c);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
};

const handleCellClick = (e) => {
    const col = parseInt(e.target.getAttribute('data-col'));
    for (let r = rows - 1; r >= 0; r--) {
        if (boardState[r][col] === 0) {
            boardState[r][col] = currentPlayer;
            const cell = board.querySelector(`[data-row='${r}'][data-col='${col}']`);
            cell.classList.add(`player${currentPlayer}`);
            if (checkWin(r, col)) {
                message.innerText = `Player ${currentPlayer} wins!`;
                board.removeEventListener('click', handleCellClick);
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
            }
            break;
        }
    }
};

const checkWin = (row, col) => {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal /
           checkDirection(row, col, 1, -1);  // Diagonal \
};

const checkDirection = (row, col, rowInc, colInc) => {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowInc;
        const c = col + i * colInc;
        if (r >= 0 && r < rows && c >= 0 && c < cols && boardState[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
};

const restartGame = () => {
    currentPlayer = 1;
    message.innerText = '';
    createBoard();
};

restartButton.addEventListener('click', restartGame);

createBoard();
