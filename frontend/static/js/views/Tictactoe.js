import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("TicTacToe");
    }

    async getHtml() {
        return `
            <div id="tictactoeGameContainer">
                <h1>Tic Tac Toe</h1>
                <div id="tictactoeCellContainer">
                    <div tictactoe_cell_Index="0" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="1" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="2" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="3" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="4" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="5" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="6" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="7" class="tictactoe_cell"></div>
                    <div tictactoe_cell_Index="8" class="tictactoe_cell"></div>
                </div>
                <h2 id="tictactoeStatusText"></h2>
                <button id="tictactoeRestartBtn">Restart</button>
                <button id="tictactoeStartBtn">Start</button>
            </div>
        `;
    }
}
