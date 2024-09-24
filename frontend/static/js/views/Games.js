import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Games");
    }

    async getHtml() {
        return `
            <button id="pong_play_button" type="button">PLAY PONG</button>
        `;
    }
}