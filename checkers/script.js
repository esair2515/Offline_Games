// Checkers Game

const gameBoard = document.querySelector('.game-board');

// Create the game board
function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
            square.dataset.row = row;
            square.dataset.col = col;
            gameBoard.appendChild(square);

            // Place pieces on the board
            if (row < 3 && (row + col) % 2 !== 0) {
                const piece = document.createElement('div');
                piece.classList.add('piece', 'black');
                square.appendChild(piece);
            } else if (row > 4 && (row + col) % 2 !== 0) {
                const piece = document.createElement('div');
                piece.classList.add('piece', 'red');
                square.appendChild(piece);
            }
        }
    }
}

createBoard();
