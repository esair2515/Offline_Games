const canvas = document.getElementById('tetrisCanvas');
const ctx = canvas.getContext('2d');

const ROW = 20;
const COL = 10;
const SQ = 20;
const VACANT = 'black';

// Draw a square
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// Create the board
let board = [];
for (r = 0; r < ROW; r++) {
    board[r] = [];
    for (c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// Draw the board
function drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

// Tetrominoes and colors
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

// Generate random piece
function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

// The Object Piece
function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = -2;
}

// Fill function
Piece.prototype.fill = function(color) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino[r].length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// Draw a piece on the board
Piece.prototype.draw = function() {
    this.fill(this.color);
}

// Undraw a piece
Piece.prototype.unDraw = function() {
    this.fill(VACANT);
}

// Move Down the piece
Piece.prototype.moveDown = function() {
    this.unDraw();
    this.y++;
    this.draw();
}

// Drop the piece every second
let p = randomPiece();
setInterval(function() {
    p.moveDown();
}, 1000);
