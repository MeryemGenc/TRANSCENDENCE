import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Pong Turnuva");
    }

    async getHtml() {
        return `
            <div class="container_pong">
                <canvas id="board"></canvas>
                <button id="pong_play_button2" type="button">PLAY</button>
            </div>

            
            <script type="module" src="/static/js/games/pong/pong.js"></script> 
        `;
    }
}


 