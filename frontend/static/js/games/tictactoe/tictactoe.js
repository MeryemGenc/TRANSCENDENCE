import { ttt_setGameRunning, ttt_getGameRunning}  from "../../index.js" // duruma göre burdki "running" silinebilir


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;


let cells;
let tictactoeStatusText;
let tictactoeRestartBtn;

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#tictactoeStartBtn")) { 
            e.target.style.display = 'none'
            initializeGame();
        }
    });
});

function initializeGame(){
    cells = document.querySelectorAll(".tictactoe_cell");
    tictactoeStatusText = document.querySelector("#tictactoeStatusText");
    tictactoeRestartBtn = document.querySelector("#tictactoeRestartBtn");

    cells.forEach(cell => {
        cell.style.color = "white"; // Hücre metinlerini beyaz yap
        cell.style.borderColor = "white"; // Hücre kenarlıklarını beyaz yap
    });
    
    tictactoeStatusText.style.color = "white"; // Oyun durumu yazısını beyaz yap
    tictactoeRestartBtn.style.color = "white"; // Yeniden başlat butonunun yazı rengi beyaz
    tictactoeRestartBtn.style.borderColor = "white"; // Butonun kenarlıklarını beyaz yap
    
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    tictactoeRestartBtn.addEventListener("click", ttt_restartGame);
    tictactoeStatusText.textContent = `${currentPlayer}'s turn`;
    ttt_setGameRunning(true);
    running = true;
}

function cellClicked(){
    const tictactoe_cell_Index = this.getAttribute("tictactoe_cell_Index");

    if(options[tictactoe_cell_Index] != "" || !running){
        return;
    }

    updateCell(this, tictactoe_cell_Index);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    tictactoeStatusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        tictactoeStatusText.textContent = `${currentPlayer} wins!`;
        ttt_setGameRunning(false);
        running = false;
    }
    else if(!options.includes("")){
        tictactoeStatusText.textContent = `Draw!`;
        ttt_setGameRunning(false);
        running = false;
    }
    else{
        changePlayer();
    }
}

function ttt_restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    tictactoeStatusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    ttt_setGameRunning(true);
    running = true;
}

export function ttt_stopGame(){
    if (ttt_getGameRunning)
        ttt_setGameRunning(false);
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    tictactoeStatusText.textContent = `Game is Done`;
    cells.forEach(cell => cell.textContent = "");
    
    // cells.forEach(cell => cell.addEventListener("click", cellClicked)); // sorun olacaksa kaldır.
    // tictactoeRestartBtn.addEventListener("click", ttt_restartGame);

    document.getElementById("tictactoeStartBtn").style.display = 'block';
    running = false;
}

