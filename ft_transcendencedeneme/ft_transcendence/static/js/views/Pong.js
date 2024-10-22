import AbstractView from "./AbstractView.js";
import { translate } from "./../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Pong");
    }

    async getHtml() {
        return `
            <div class="container_pong">
                <canvas id="board"></canvas>
                <button data-translate="PLAY" id="pong_play_button2" type="button">${translate("PLAY")}</button>        
            </div>

            
        `;
    }
}


 