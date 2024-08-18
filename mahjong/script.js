// Mahjong Game

const gameBoard = document.getElementById('game-board');
const tileImages = ['tile1.png', 'tile2.png', 'tile3.png', 'tile4.png', 'tile5.png']; // Add paths to your tile images
let tiles = [];

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the game board
function createBoard() {
    let tileSet = [];
    for (let i = 0; i < 36; i++) { // 18 pairs of tiles
        let img = tileImages[i % tileImages.length];
        tileSet.push({ id: i, img: img });
        tileSet.push({ id: i, img: img });
    }

    tileSet = shuffle(tileSet);
    tiles = tileSet;

    tileSet.forEach(tile => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.dataset.id = tile.id;
        tileDiv.innerHTML = `<img src="${tile.img}" alt="Tile">`;
        gameBoard.appendChild(tileDiv);

        tileDiv.addEventListener('click', () => {
            tileDiv.classList.add('selected');
            checkMatch();
        });
    });
}

let selectedTiles = [];

// Check for matching tiles
function checkMatch() {
    selectedTiles = document.querySelectorAll('.tile.selected');

    if (selectedTiles.length === 2) {
        const id1 = selectedTiles[0].dataset.id;
        const id2 = selectedTiles[1].dataset.id;

        if (id1 === id2) {
            selectedTiles.forEach(tile => tile.classList.add('matched'));
        }

        selectedTiles.forEach(tile => tile.classList.remove('selected'));
    }
}

createBoard();
