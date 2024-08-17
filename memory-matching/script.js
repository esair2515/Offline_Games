const grid = document.querySelector('.grid');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
let cardArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let firstCard = '';
let secondCard = '';
let firstCardElement;
let secondCardElement;
let isFlipping = false;
let matches = 0;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const createBoard = () => {
    cardArray = shuffleArray(cardArray);
    cardArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-value', card);
        cardElement.addEventListener('click', flipCard);
        grid.appendChild(cardElement);
    });
};

const flipCard = (e) => {
    if (isFlipping) return;
    const clickedCard = e.target;

    if (clickedCard === firstCardElement) return;

    clickedCard.innerText = clickedCard.getAttribute('data-value');

    if (!firstCard) {
        firstCard = clickedCard.getAttribute('data-value');
        firstCardElement = clickedCard;
    } else {
        secondCard = clickedCard.getAttribute('data-value');
        secondCardElement = clickedCard;
        checkMatch();
    }
};

const checkMatch = () => {
    if (firstCard === secondCard) {
        firstCardElement.classList.add('matched');
        secondCardElement.classList.add('matched');
        matches++;
        resetTurn();
        if (matches === cardArray.length / 2) {
            message.innerText = 'You Win!';
        }
    } else {
        isFlipping = true;
        setTimeout(() => {
            firstCardElement.innerText = '';
            secondCardElement.innerText = '';
            resetTurn();
        }, 1000);
    }
};

const resetTurn = () => {
    firstCard = '';
    secondCard = '';
    firstCardElement = null;
    secondCardElement = null;
    isFlipping = false;
};

const restartGame = () => {
    grid.innerHTML = '';
    message.innerText = '';
    matches = 0;
    createBoard();
};

restartButton.addEventListener('click', restartGame);

createBoard();
