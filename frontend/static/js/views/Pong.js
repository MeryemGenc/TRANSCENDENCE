import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Pong");
    }

    async getHtml() {
        return `
            <div class="container_pong">
                <canvas id="board"></canvas>
                <button id="pong_play_button2" type="button">PLAY</button>
            </div>
        `;
    }
}
