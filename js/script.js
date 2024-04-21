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