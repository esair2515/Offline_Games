const choices = ['rock', 'paper', 'scissors'];
const resultDiv = document.getElementById('result');
const restartButton = document.getElementById('restartButton');
let playerScore = 0;
let computerScore = 0;

const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return 'It\'s a draw!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        return 'You win!';
    } else {
        computerScore++;
        return 'You lose!';
    }
};

const handleChoiceClick = (e) => {
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    resultDiv.innerText = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}
    \nPlayer Score: ${playerScore}, Computer Score: ${computerScore}`;
};

const restartGame = () => {
    playerScore = 0;
    computerScore = 0;
    resultDiv.innerText = '';
};

document.querySelectorAll('.choice').forEach(choice => {
    choice.addEventListener('click', handleChoiceClick);
});

restartButton.addEventListener('click', restartGame);
