import AbstractView from "./AbstractView.js";
import { translate } from "../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Pong3D");
    }

    async getHtml() {
        return `
         <div class="container vh-100 d-flex flex-column justify-content-center align-items-center bg_color text-light">
    <div class="row w-100 mb-3">
    	<div class="col-12 d-flex justify-content-center">
        	<button id="pause_button" type="button" class="btn p-0" style="width: 64px; height: 64px; border-radius: 50%;" disabled>
            	<img id="pause_button_img" src="/static/images/pause.png" alt="Button Image" style="width: 100%; height: 100%; border-radius: 50%; pointer-events: none;">
        	</button>
   		</div>
	</div>

    <!-- Oyun Alanı ve Oyuncular -->
    <div class="row justify-content-between align-items-center w-100">
        <!-- Player 1 Profile -->
        <div class="col-2 text-center">
            <div class="card bg-dark text-light p-3 border-light">
                <img src="#" id="pong_img_plyr1" class="rounded-circle mx-auto mb-3" style="width: 100px; height: 100px;">
                <p class="fs-2 text-bold" style="color: cyan" id="pong_t_player1"></p>
                <p class="fs-3 text-bold" id="pong_score_player1">0</p>
            </div>
        </div>

        <!-- Game Area -->
        <div class="col-8 d-flex justify-content-center align-items-center bg-black border-danger rounded" style="height: 650px;">
            <div id="pong_board" class="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                <button data-translate="PLAY" id="pong_game_button" type="button" class="btn btn-info" data-mdb-ripple-init>${translate("PLAY")}</button>
            </div>
        </div>

        <!-- Player 2 Profile -->
        <div class="col-2 text-center">
            <div class="card bg-dark text-light p-3 border-light">
                <img src="#" id="pong_img_plyr2" class="rounded-circle mx-auto mb-3" style="width: 100px; height: 100px;">
                <p class="fs-2 text-bold" style="color: cyan" id="pong_t_player2"></p>
                <p class="fs-3 text-bold" id="pong_score_player2">0</p>
            </div>
        </div>
    </div>
</div>
        `;
    }
}