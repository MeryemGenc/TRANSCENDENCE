import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Games");
    }

    async getHtml() {
        return `
            <button id="pong_play_button" type="button">PLAY PONG</button>
            <button id="pong_3d_play_button" type="button">PLAY PONG 3D</button>
            <button id="tictactoe_play_button" type="button">PLAY TICTACTOE</button>
        `;
    }
}