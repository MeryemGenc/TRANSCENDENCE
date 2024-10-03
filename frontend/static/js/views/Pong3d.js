import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Pong3D");
    }

    async getHtml() {
        return `
            <div class="container_pong_3d">
                <div class="wrap_pong_3d">
                    <div id="board_3d"></div>
                    <button id="pong_3d_play_button2" type="button">PLAY 3D</button>
                </div>
            </div>
        `;
    }
}
