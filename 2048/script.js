const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
let tiles = [];

function initGame() {
    gameBoard.innerHTML = '';
    tiles = Array.from({ length: 4 }, () => Array(4).fill(null));
    addNewTile();
    addNewTile();
    updateBoard();
}

function addNewTile() {
    const emptyTiles = [];
    tiles.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            if (!tile) {
                emptyTiles.push({ row: rowIndex, col: colIndex });
            }
        });
    });

    if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        tiles[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    gameBoard.innerHTML = '';
    tiles.forEach(row => {
        row.forEach(tile => {
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            if (tile) {
                tileDiv.textContent = tile;
                tileDiv.classList.add(`tile-${tile}`);
            }
            gameBoard.appendChild(tileDiv);
        });
    });
}

function slide(row) {
 
