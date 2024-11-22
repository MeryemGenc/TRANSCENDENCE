import AbstractView from "./AbstractView.js";
import { translate } from "../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Pong Turnuva");
    }

    async getHtml() {
        return `
		<canvas id="canvas_confetti"></canvas>
            <div class="container vh-100 d-flex justify-content-center align-items-center bg_color text-light">
        		<div class="row justify-content-between align-items-center w-100">
        		    <!-- Player 1 Profile -->
        		    <div class="col-2 text-center">
        		        <div class="card bg-dark text-light p-3 border-light">
        		            <img src="#" id= "img_plyr1" class="rounded-circle mx-auto mb-3" style="width: 100px; height: 100px;">
        		            <p class="fs-2 text-bold" style="color: cyan" id="t_player1"> </p>
        		            <p class="fs-3 text-bold" id="score_player1" >0</p>
        		        </div>
        		    </div>

        		    <!-- Game Area -->
        		    <div class="col-8 d-flex justify-content-center align-items-center bg-black border-danger rounded" style="height: 650px;">
        		        <div id="board_3d" class=" d-flex flex-column justify-content-center align-items-center flex-grow-1">
        		            <button data-translate="PLAY" id="tournament_game_button" type="button" class="btn btn-info" data-mdb-ripple-init>${translate("PLAY")}</button>
        		        </div>
        		    </div>

        		    <!-- Player 2 Profile -->
        		    <div class="col-2 text-center">
        		        <div class="card bg-dark text-light p-3 border-light">
        		            <img src="#" id="img_plyr2" class="rounded-circle mx-auto mb-3" style="width: 100px; height: 100px;">
        		            <p class="fs-2 text-bold" style="color: cyan" id="t_player2"> </p>
        		            <p class="fs-3 text-bold" id="score_player2" >0</p>
        		        </div>
        		    </div>
        		</div>
    		</div>

        `;
    }
}


 