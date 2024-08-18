const sudokuGrid = document.getElementById('sudoku-grid');
const checkButton = document.getElementById('checkButton');
const restartButton = document.getElementById('restartButton');

const grid = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

function createGrid() {
    sudokuGrid.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (grid[row][col] !== null) {
                cell.textContent = grid[row][col];
                cell.classList.add('fixed');
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/[^1-9]/, '');
                });
                cell.appendChild(input);
            }
            sudokuGrid.appendChild(cell);
        }
    }
}

function checkSolution() {
    let valid = true;
    const inputs = document.querySelectorAll('.cell input');
    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = parseInt(input.value);
        if (!isValid(value, row, col)) {
            valid = false;
            input.style.backgroundColor = 'red';
        } else {
            input.style.backgroundColor = 'white';
        }
    });
    if (valid) {
        alert('Congratulations! The solution is correct.');
    } else {
        alert('There are some mistakes. Please check your solution.');
    }
}

function isValid(value, row, col) {
    // Check if the value already exists in the row
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === value) return false;
    }

    // Check if the value already exists in the column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === value) return false;
    }

    // Check if the value already exists in the 3x3 sub-grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === value) return false;
        }
    }

    return true;
}

function restartGame() {
    createGrid();
}

checkButton.addEventListener('click', checkSolution);
restartButton.addEventListener('click', restartGame);

createGrid();
