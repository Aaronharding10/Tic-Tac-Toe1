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
        const cell = document.querySelector(`[data-cell-index='${index}']`);
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

/** function to handle cell click */
function handleCellClick(cellIndex) {
    if (gameBoard[cellIndex] === '' && currentPlayer === 'X') {
        gameBoard[cellIndex] = currentPlayer;
        /** taken from "https://www.turing.com/kb/guide-to-string-concatenation-in-js" */
        document.querySelector(`[data-cell-index='${index}']`).textContent = currentPlayer;
    }
}