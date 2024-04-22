let currentPlayer = "X";
let playerScore = 0;
let computerScore = 0;
let gameBoard = [];
for (let i = 0; i < 9; i++){
    gameBoard.push("");
}

/** Function to start the game */
/** querySelector obtained from "stack overflow" to select the HTML element and reset it to an empty string */

function runGame() {
    currentPlayer = "X"; 
    gameBoard = ["","","","","","","","",""];

    for (let index = 0; index < 9; index++) {
        let cell = document.querySelector(`[data-cell-index='${index}']`);
        cell.textContent = ''; 
        /**onclick provided by my mentor mitko */
        cell.onclick = function () {handleCellClick(index);};
    }

/**ID selectors to update game scores and messages during game */
    document.getElementById('playerScore').textContent = `Player: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer: ${computerScore}`;
    document.getElementById('messageDisplay').textContent = ''; 
}
runGame();

/** Function to set up all event listeners -  found on "https://www.shecodes.io/athena/102-adding-an-event-listener-to-a-button-click-in-javascript" */

function setupEventListeners() {
    document.getElementById('restartBtn').addEventListener('click', function() {
        runGame();
    });
}

/** calling event listeners to ensure flow of game */
runGame(); 
setupEventListeners(); 

/** Handle cell clicks for game play */

function handleCellClick(cellIndex) {
    if (gameBoard[cellIndex] === '' && currentPlayer === 'X') {
        gameBoard[cellIndex] = currentPlayer;
        /** taken from "https://www.turing.com/kb/guide-to-string-concatenation-in-js" */
        document.querySelector('[data-cell-index = "' + cellIndex + '"]').textContent = currentPlayer;
        processTurn();
    }
}

/** series of if statements to determine players turn and switching -  Process the turn after a move is made */

function processTurn() {
const winner = checkWinner();
if (winner) {
    updateScore(winner);
    /**code to switch and determine player provided by mentor Mitko */
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (currentPlayer === 'O') {
            /**timeout from "https://www.freecodecamp.org/news/javascript-settimeout-js-timer-to-delay-n-seconds/" */
            setTimeout(makeComputerMove, 1000); 
        }
    }
}

/** Simulate computer's move -  this function loops through the gameboard and uses an if statement to see if the cell is empty before making it's move */

function makeComputerMove() {
    let emptyCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            emptyCells.push(i);
    }
}
/**code taken from love maths project to generate a random cell for the computer move */
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let computerMoveIndex = emptyCells[randomIndex];
        gameBoard[computerMoveIndex] = 'O';
        let selectedCell = document.querySelector('[data-cell-index = "' + computerMoveIndex + '"]');
        selectedCell.textContent = 'O';
        processTurn();
    }
}

/** Check for a winner or tie -  code inspired from "https://levelup.gitconnected.com/react-design-tic-tac-toe-game-interview-preparation-23f4c2866825" */

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.every(cell => cell !== '') ? "Tie" : null;
}

/** Update the score and game status based on the winner */
/** a chain of if statements along with score increments to update and reflect score on game */

function updateScore(winner) {
    var messageDisplay = document.getElementById('messageDisplay');
    if (winner === 'X') {
        playerScore +=1;
        messageDisplay.textContent = "CONGRATULATIONS, you have won! Play again?";
    } else if (winner === 'O') {
        computerScore +=1;
        messageDisplay.textContent = "Unlucky, play again?";
    } else if (winner === "Tie") {
        messageDisplay.textContent = "Cat game! Play again?";
    }
}

/** */
runGame(); 
setupEventListeners(); 
