 let currentPlayer = "O";
 let gameState = ["", "", "", "", "", "", "", "", ""];
 const statusDisplay = document.querySelector(".gameStatus");

 function winningMessage() {
     return `Player ${currentPlayer} won the game`;
 }

 function drawMessage() {
     return `Game ended in a draw`;
 }

 function currentPlayerTurn() {
     return `It's player ${currentPlayer}'s turn`;
 }
 statusDisplay.innerHTML = currentPlayerTurn();

 let gameActive = true;

 document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", clickBox));

 function clickBox(clickedBoxEvent) {
     const clickedBox = clickedBoxEvent.target;
     const clickedBoxIndex = parseInt(clickedBox.getAttribute("data-cell-index"));
     if (!gameActive || gameState[clickedBoxIndex] !== "") {
         return;
     }
     showClick(clickedBox, clickedBoxIndex);
     validateClick();
 }

 function showClick(clickedBox, clickedBoxIndex) {
     gameState[clickedBoxIndex] = currentPlayer;
     clickedBox.innerHTML = currentPlayer;
 }

 const winningConditions = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
 ]

 function validateClick() {
     let gameWon = false;
     for (let i = 0; i <= 7; ++i) {
         const validateConditions = winningConditions[i];
         let cond1 = gameState[validateConditions[0]];
         let cond2 = gameState[validateConditions[1]];
         let cond3 = gameState[validateConditions[2]];
         if (cond1 === "" || cond2 === "" || cond3 === "") {
             continue;
         }
         if (cond1 === cond2 && cond1 === cond3) {
             gameWon = true;
             break
         }
     }
     if (gameWon) {
         statusDisplay.innerHTML = winningMessage();
         gameActive = false;
         return;
     }
     if (!gameState.includes("")) {
         statusDisplay.innerHTML = drawMessage();
         gameActive = false;
         return;
     }
     changeTurn();
 }

 function changeTurn() {
     if (currentPlayer === "X") {
         currentPlayer = "O";
         statusDisplay.innerHTML = currentPlayerTurn();
     } else {
         currentPlayer = "X";
         statusDisplay.innerHTML = currentPlayerTurn();
     }
 }
 document.querySelector(".gameRestart").addEventListener("click", restart);

 function restart() {
     gameActive = true;
     gameState = ["", "", "", "", "", "", "", "", ""];
     currentPlayer = "O";
     statusDisplay.innerHTML = currentPlayerTurn();
     document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
 }