import AbstractView from "./AbstractView.js";
import { translate } from "./../LanguageManager.js";

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
                    <button data-translate="PLAY" id="pong_3d_play_button2" type="button">${translate("PLAY")}</button>
                </div>
            </div>
        `;
    }
}
