/** variables declared to manage game */
let currentPlayer = "X";
let playerScore = 0;
let computerScore = 0;
let gameBoard = [];
/** loop to set a gameboard with 9 empty strings */
for (let i = 0; i < 9; i++){
    gameBoard.push("");
}

/** Function to start the game - a for loop  runs and grabs all cells 0-8  and makes sure the cells are empty to start with a clear game board*/
/** */


function runGame() {
    currentPlayer = "X"; 
    gameBoard = ["","","","","","","","",""];

    for (let index = 0; index < 9; index++) {
        let cell = document.querySelector(`[data-cell-index='${index}']`);
        cell.textContent = ''; 
        /**code obtained from my mentor Mitko to assign an onclick event to each cell and then calling the handleCellClick function */
        cell.onclick = function () {handleCellClick(index);};
    }

/**ID selectors to update game scores and messages during game */
    document.getElementById('playerScore').textContent = `Player: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer: ${computerScore}`;
    document.getElementById('messageDisplay').textContent = ''; 
}
runGame();

/** Event listener function to restart game and call runGame */

function setupEventListeners() {
    document.getElementById('restartBtn').addEventListener('click', function() {
        runGame();
    });
}

/** calling event listeners to ensure flow of game */
runGame(); 
setupEventListeners(); 

/** This function uses a condition to check if the selected cell is empty and if the current player is 'X'.
 * once the condition is met the gameboard and that specific cell are updated to reflect players move. Process turn is then called.
 */

function handleCellClick(cellIndex) {
    if (gameBoard[cellIndex] === '' && currentPlayer === 'X') {
        gameBoard[cellIndex] = currentPlayer;
        document.querySelector('[data-cell-index = "' + cellIndex + '"]').textContent = currentPlayer;
        processTurn();
    }
}

/** After checking for a winner and update score the function then runs a series of if statements to determine players turn and switching -  Process the turn after a move is made
 * A setTimeout was also implemented to delay the computers move as it was instantaneous with the players move and was not a smooth experience.
 */

function processTurn() {
const winner = checkWinner();
if (winner) {
    updateScore(winner);
    /**code to switch and determine player provided by mentor Mitko */
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (currentPlayer === 'O') {
            setTimeout(makeComputerMove, 1000); 
        }
    }
}

/** Simulate computer's move -  this function loops through the gameboard and uses an if statement to see if the cell is empty before making it's move 
 * a random cell is then chosen using Math.random and the move is then made by updating the corresponding cell using a query selector
 * processTurn function then called to switch player
*/

function makeComputerMove() {
    let emptyCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            emptyCells.push(i);
    }
}
/**code taken from love maths project to generate a random cell for the computer's move */
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let computerMoveIndex = emptyCells[randomIndex];
        gameBoard[computerMoveIndex] = 'O';
        let selectedCell = document.querySelector('[data-cell-index = "' + computerMoveIndex + '"]');
        selectedCell.textContent = 'O';
        processTurn();
    }
}

/** The winning combinations defines all possible winning scenarios. The function goes through the winning combinations to see if 
 * any of them contain the same values across all three cells and if so, a winner is found. 
 * After this the function then checks to see if there are any empty cells on the board. If there are none then it is a tie. 
 * If there are then the game continues.  
  */

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


runGame(); 
setupEventListeners(); 
